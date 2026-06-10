<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY || import.meta.env.VITE_GEMINI_API_KEY || ''
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

const prefs = useUserPrefsStore()

// ── Network state ─────────────────────────────────────────────────────────────
const isOnline  = ref(navigator.onLine)
const hasApiKey = computed(() => Boolean(GEMINI_KEY))

const mode = computed(() => {
  if (!isOnline.value) return 'offline'
  if (!hasApiKey.value) return 'local'
  return 'hybrid'
})

const statusLabel = computed(() => ({
  offline: 'Offline · local knowledge active',
  local:   'No API key · local knowledge active',
  hybrid:  'Online · Hybrid AI active',
}[mode.value]))

const statusDot = computed(() => ({
  offline: '#f87171',
  local:   '#fbbf24',
  hybrid:  '#4ade80',
}[mode.value]))

const onlineHandler  = () => { isOnline.value = true  }
const offlineHandler = () => { isOnline.value = false }
onMounted(() => {
  window.addEventListener('online',  onlineHandler)
  window.addEventListener('offline', offlineHandler)

  hasSpeechInput.value  = !!(window.MediaRecorder && navigator.mediaDevices?.getUserMedia)
  hasSpeechOutput.value = !!window.speechSynthesis
})
onUnmounted(() => {
  window.removeEventListener('online',  onlineHandler)
  window.removeEventListener('offline', offlineHandler)
  window.speechSynthesis?.cancel()
})

// ── Speech ────────────────────────────────────────────────────────────────────
// Checked inside onMounted — MediaRecorder and getUserMedia availability
const hasSpeechInput  = ref(false)
const hasSpeechOutput = ref(false)

// ── UI state ──────────────────────────────────────────────────────────────────
const open       = ref(false)
const loading    = ref(false)
const listening  = ref(false)
const ttsOn      = ref(false)
const isSpeaking = ref(false)
const input      = ref('')
const msgEl      = ref(null)

// ── Live app context (reads live store values — always accurate) ───────────────
const ctx = computed(() => {
  const pr = prefs.profile  || {}
  const en = prefs.energy   || {}
  const no = prefs.notif    || {}
  const fe = prefs.features || {}
  return {
    name:        pr.displayName    || 'there',
    location:    pr.location       || 'South Africa',
    currency:    prefs.currency    || 'ZAR',
    unit:        prefs.energyUnit  || 'kWh',
    offPeak:     `${prefs.peakStart || '22:00'}–${prefs.peakEnd || '06:00'}`,
    hasEV:       !!en.ev,
    smart:       !!en.smart,
    autoOffset:  !!en.autoOffset,
    comShare:    !!en.community,
    priceAlerts: !!no.priceAlerts,
    push:        !!no.push,
    maintTips:   !!no.maintenanceTips,
    leaderboard: fe.leaderboard !== false,
    energyTips:  fe.energyTips  !== false,
    streak:      fe.streak      !== false,
    theme:       prefs.themeMode  || 'system',
    twoFa:       !!prefs.twoFactor,
  }
})


const KB = [
  // App navigation
  { k: ['dashboard', 'home', 'overview'],
    r: c => `Your Dashboard is BrightBox's live energy command centre, ${c.name}. It shows real-time production vs consumption, battery status, your green energy mix, and a 24-hour usage chart — all updating automatically.` },

  { k: ['upload', 'meter', 'reading', 'submit', 'log reading'],
    r: () => `To upload a meter reading, tap the ⬆️ icon in the sidebar or the meter icon in the top bar. Type the value manually or photograph your meter. Readings sync to your account and update your usage charts. Works offline too — syncs when you reconnect.` },

  { k: ['leaderboard', 'rank', 'ranking'],
    r: c => c.leaderboard
      ? `The Leaderboard ranks your community by renewable energy percentage. Your position improves when your green usage rises. ${c.comShare ? 'Your metrics are currently shared with neighbours.' : 'Turn on Community Sharing in Settings → Energy to contribute.'}`
      : `The Leaderboard is currently hidden. Go to Settings → App Features and enable it.` },

  { k: ['energy tips', 'tips page', 'advice page'],
    r: c => c.energyTips
      ? `The Energy Tips page has personalised recommendations for your usage patterns, ${c.name}. Find it in the sidebar under "Energy Tips".`
      : `Energy Tips is currently disabled. Go to Settings → App Features → Energy Tips and toggle it on.` },

  { k: ['support', 'help', 'contact', 'problem', 'bug'],
    r: () => `For help, visit the Support page (sidebar bottom-left). It has searchable articles, FAQ, and a contact form. We respond within 24 hours on business days (4 hours for urgent issues). Email: support@brightbox.app.` },

  { k: ['navigation', 'menu', 'sidebar', 'find', 'where is', 'how do i get'],
    r: () => `BrightBox navigation:\n• 🏠 Dashboard — live overview\n• 🏆 Leaderboard — community rankings\n• ⬆️ Upload Meter — log readings\n• 💡 Energy Tips — saving advice\n• ⚙️ Settings — all preferences\n• ❓ Support — help & contact\n\nOn mobile, tap ☰ in the top-left to open the sidebar.` },

  // Energy tips
  { k: ['save energy', 'reduce', 'lower bill', 'cut cost', 'save electricity'],
    r: c => `Top 5 ways to save, ${c.name}:\n\n1. 🌙 Shift heavy loads (geyser, dishwasher) to off-peak: ${c.offPeak}\n2. 💡 Replace incandescent bulbs with LEDs — saves up to 80%\n3. 🔌 Unplug standby devices — ~10% of bills\n4. 🌡️ Set your geyser to 55°C\n5. ☀️ Run appliances during solar peak: 10:00–14:00` },

  { k: ['peak', 'tariff', 'rate', 'eskom', 'off-peak', 'tou', 'time of use', 'pricing'],
    r: c => `Eskom Time-of-Use pricing:\n\n🔴 Peak (most expensive): 07:00–10:00 and 17:00–20:00 weekdays\n🟢 Off-Peak (cheapest): ${c.offPeak} and all weekends\n\n${c.priceAlerts ? '✅ Price alerts are on — 30-min heads-up before peak windows.' : '💡 Enable Price Alerts in Settings → Notifications.'}` },

  { k: ['geyser', 'water heater', 'hot water', 'boiler'],
    r: c => `Your geyser uses 30–40% of total electricity. Key steps:\n• Set thermostat to 55°C\n• Use a timer to heat only during off-peak: ${c.offPeak}\n• Insulate the geyser and first 1m of pipes\n• Fix dripping taps — they waste 15 L/day of heated water` },

  { k: ['solar', 'panel', 'pv', 'generation', 'output', 'photovoltaic'],
    r: c => `Maximising solar output:\n• Clean panels every 6–8 weeks (dust reduces output by 20%)\n• South-facing at 25–30° tilt is optimal in ${c.location}\n• Run heavy appliances at midday solar peak (10:00–14:00)\n${c.autoOffset ? '✅ Auto-Offset is on — surplus feeds back to the grid.' : '💡 Enable Auto-Offset in Settings → Energy.'}` },

  { k: ['battery', 'storage', 'backup', 'load shedding', 'loadshedding'],
    r: () => `Battery best practices:\n• Charge during off-peak or from solar midday\n• Keep charge between 20–90% for longevity\n• During load-shedding prioritise: fridge, lights, router\n• Check Dashboard → Battery card for live level and runtime` },

  { k: ['appliance', 'fridge', 'washing', 'dishwasher', 'dryer', 'oven', 'kettle'],
    r: c => `Appliances by energy draw:\n1. 🔥 Geyser: 2–4 kW → schedule for ${c.offPeak}\n2. 🧺 Tumble dryer: 2–2.5 kW → line-dry when possible\n3. 🍳 Oven: 1.5–2.5 kW → use air fryer for small meals\n4. 🧽 Dishwasher: 1.2–1.8 kW → eco mode overnight\n5. 💡 Switch to LED bulbs immediately` },

  { k: ['ev', 'electric vehicle', 'car charg'],
    r: c => `EV charging strategy:\n• Charge during off-peak (${c.offPeak}) — lowest rates\n• A 7.4 kW home charger adds ~40 km/hour\n• Keep charge between 20–80% for battery health\n${c.hasEV ? '✅ EV Off-Peak Charging is enabled in your settings.' : '💡 Enable EV Off-Peak Charging in Settings → Energy.'}` },

  { k: ['maintenance', 'maintain', 'clean panel', 'service', 'inspect'],
    r: c => `Maintenance schedule:\n📅 Monthly: Clean panels, check inverter codes\n📅 Every 6 months: Test battery, inspect geyser element\n📅 Annually: Professional solar + electrical inspection\n\n${c.maintTips ? '✅ Maintenance Tips are on — automatic reminders are set.' : '💡 Enable Maintenance Tips in Settings → Notifications.'}` },

  { k: ['inverter', 'fault', 'error', 'trip', 'breaker', 'no power'],
    r: () => `Common inverter fixes:\n• Red/amber light: note the code, check your manual\n• No output: check AC isolator AND DC breaker — both must be ON\n• Overheating: ensure 30cm clearance, out of direct sun\n• Grid fault: wait ~5 min — inverter reconnects automatically\n• Monitoring offline: restart the Wi-Fi adapter\n\nAlways call a qualified electrician for internal faults.` },

  // Settings
  { k: ['theme', 'dark mode', 'light mode', 'colour', 'color', 'accent', 'appearance'],
    r: c => `BrightBox has Light, Dark, and System modes (currently ${c.theme === 'dark' ? '🌙 Dark' : c.theme === 'light' ? '☀️ Light' : '⚙️ System'}), plus 8 accent colour palettes. Go to Settings → Appearance — changes apply instantly.` },

  { k: ['notification', 'alert', 'push', 'digest'],
    r: c => `Your notification status:\n${c.push ? '✅' : '❌'} Push notifications\n${c.priceAlerts ? '✅' : '❌'} Price alerts\n${c.maintTips ? '✅' : '❌'} Maintenance tips\n\nManage in Settings → Notifications. You can send test alerts from there.` },

  { k: ['profile', 'avatar', 'photo', 'display name', 'update profile'],
    r: c => `Go to Settings → Profile to update your name, photo, email, bio, location, and pronouns, ${c.name}. Your photo syncs instantly to the sidebar and top bar when saved.` },

  { k: ['privacy', 'data', 'gdpr', 'popia', 'delete', 'download data'],
    r: c => `BrightBox is POPIA and GDPR compliant:\n📥 Download your data (JSON) from Settings → Privacy & Data\n🗑️ Request deletion — processed within 21 business days\n🔒 Community sharing: ${c.comShare ? 'ON' : 'OFF'}\n\nRead the full Privacy Policy via Settings → Privacy & Data.` },

  { k: ['security', '2fa', 'two factor', 'password', 'authenticator'],
    r: c => `${c.twoFa ? '🔐 2FA is ENABLED on your account ✅' : '⚠️ 2FA is NOT enabled — strongly recommended.'}\n\nTo set up 2FA: Settings → Security. Scan a QR code with Google Authenticator or Authy, verify a code, and save 8 backup codes. Takes 2 minutes.` },

  { k: ['features', 'enable', 'disable', 'hide', 'show page'],
    r: c => `Your app features:\n${c.leaderboard ? '✅' : '❌'} Leaderboard\n${c.energyTips ? '✅' : '❌'} Energy Tips\n${c.streak ? '✅' : '❌'} Streak tracker\n✅ Dashboard & Upload Meter (always on)\n\nToggle features in Settings → App Features — changes apply immediately.` },

  { k: ['smart scheduling', 'automation', 'automate', 'schedule appliance'],
    r: c => `${c.smart ? '✅ Smart Scheduling is enabled — optimisation suggestions appear on the Dashboard.' : '💡 Enable Smart Scheduling in Settings → Energy.'}\n\nGolden rule: shift any non-urgent high-draw task to your off-peak window: ${c.offPeak}.` },
]


function localLookup(userText) {
  const t = userText.toLowerCase()
  const c = ctx.value

  // 1. Direct keyword match (most specific wins)
  const directHit = KB.find(e => e.k.some(k => t.includes(k)))
  if (directHit) {
    return { found: true, text: directHit.r(c) }
  }

  // 2. Partial word match (each keyword word ≥ 4 chars)
  const partialHit = KB.find(e =>
    e.k.some(k =>
      k.split(' ').some(w => w.length >= 4 && t.includes(w))
    )
  )
  if (partialHit) {
    return { found: true, text: partialHit.r(c) }
  }

  // 3. Conversational shortcuts (not energy-specific, always found)
  if (/\b(hi|hello|hey|howzit|hiya)\b/.test(t)) {
    return { found: true, text: `Hi ${c.name}! 👋 I'm SolarBuddy. Ask me about energy saving tips, your BrightBox settings, or anything about the app.` }
  }
  if (/\bthank/.test(t)) {
    return { found: true, text: `You're very welcome, ${c.name}! 😊 Let me know if you have any other questions.` }
  }
  if (/who are you|what are you|your name/.test(t)) {
    return { found: true, text: `I'm SolarBuddy 🌱 — BrightBox's built-in energy assistant. I know your live app settings and can help with energy saving, app navigation, and features. I also have Gemini AI as backup for anything outside my knowledge base.` }
  }

  // 4. No match found
  return { found: false, text: '' }
}

// ─────────────────────────────────────────────────────────────────────────────
// GEMINI API
// Only called when: mode === 'hybrid' AND local KB returned found: false
// ─────────────────────────────────────────────────────────────────────────────
async function callGemini(userMessage) {
  const c = ctx.value

  // Only send last 6 messages as context to keep requests small
  const recentHistory = messages.value.slice(-6).map(m => ({
    role:  m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const systemPrompt = `You are SolarBuddy, the BrightBox energy assistant.

Rules:
- ALWAYS write complete sentences — never end mid-sentence or mid-word
- Be concise and friendly
- Keep answers to 2–3 short paragraphs maximum
- Always finish your final sentence with a full stop before stopping
- Include one practical, actionable tip per response
- Focus on energy efficiency and sustainability
- You may answer general conversational questions
- Personalise answers using the user context provided

User context: Name=${c.name}, Location=${c.location}, Off-peak=${c.offPeak}, EV=${c.hasEV}, Smart scheduling=${c.smart}, Currency=${c.currency}`

  const body = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: [
      ...recentHistory,
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ],
    generationConfig: {
      temperature:      0.7,
      maxOutputTokens:  800,
    },
  }

  const res = await fetch(GEMINI_URL, {
    method:  'POST',
    headers: {
      'Content-Type':   'application/json',
      'X-goog-api-key': GEMINI_KEY,         // header auth — matches working project
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`)

  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) throw new Error('Gemini returned an empty response')

  return text
}


async function send(text) {
  const msg = (text || input.value).trim()
  if (!msg || loading.value) return

  input.value = ''
  messages.value.push({ role: 'user', content: msg, time: nowStr() })
  loading.value = true
  await nextTick()
  scrollDown()

  const kb = localLookup(msg)

  if (mode.value === 'offline') {
    // No internet — local KB only
    await sleep(260)
    if (kb.found) {
      pushBot(kb.text)
    } else {
      pushBot(`I'm offline right now and don't have a local answer for that, ${ctx.value.name}. Try asking about energy saving tips, your settings, or app navigation — those all work offline.`)
    }

  } else if (mode.value === 'local') {
    // Online but no API key — KB only, with helpful hint
    await sleep(180)
    if (kb.found) {
      pushBot(kb.text)
    } else {
      pushBot(`I don't have a built-in answer for that. To unlock full AI responses on any topic, add your free Gemini API key to the app's \`.env.local\` file as \`VITE_GEMINI_KEY\`. Get one at aistudio.google.com.`)
    }

  } else {
    // Hybrid mode — KB first, Gemini as fallback
    if (kb.found) {
      // Serve from local KB instantly — no API call, no cost
      await sleep(140)
      pushBot(kb.text)
    } else {
      // Not in KB → ask Gemini
      try {
        const geminiReply = await callGemini(msg)
        pushBot(geminiReply)
      } catch (err) {
        console.error('Gemini failed:', err)
        // Graceful degradation — explain clearly
        pushBot(`⚠️ Gemini AI is temporarily unavailable. Here's what I know from my local knowledge base:\n\nTry asking about energy saving tips, peak hours, solar, battery, or your app settings — I can answer those without internet.`)
      }
    }
  }

  loading.value = false
  rotateSuggestions()
  await nextTick()
  scrollDown()
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function pushBot(text) {
  messages.value.push({ role: 'assistant', content: text, time: nowStr() })
  if (ttsOn.value && hasSpeechOutput.value) {
    nextTick(() => setTimeout(() => speak(text), 80))
  }
}

function scrollDown() {
  if (msgEl.value) msgEl.value.scrollTop = msgEl.value.scrollHeight
}

function nowStr() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

// ── Greeting ──────────────────────────────────────────────────────────────────
function buildGreeting() {
  const c    = ctx.value
  const hour = new Date().getHours()
  const tod  = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'

  const modeNote = {
    offline: `I'm running offline — I have your BrightBox settings and a full energy knowledge base ready.`,
    local:   `I'm using built-in knowledge. Add a free Gemini API key for full AI on any topic.`,
    hybrid:  `I'll use my built-in knowledge first, then Gemini AI for anything more complex.`,
  }[mode.value]

  return `Good ${tod}, ${c.name}! ⚡ I'm SolarBuddy — your BrightBox energy assistant.\n\n${modeNote}\n\nTap a suggestion or ask me anything!`
}

const messages = ref([{ role: 'assistant', content: buildGreeting(), time: nowStr() }])

function clearChat() {
  messages.value = [{ role: 'assistant', content: buildGreeting(), time: nowStr() }]
  suggestionOffset.value = 0
}

// ── Rotating suggestions ──────────────────────────────────────────────────────
const suggestionPool = computed(() => {
  const c = ctx.value
  return [
    { label: 'Save energy tips',                text: 'Give me quick energy saving tips'              },
    { label: 'My peak hours',                   text: 'When are peak hours and how do I avoid them?'  },
    { label: `Off-peak: ${c.offPeak}`,           text: 'What is my configured off-peak window?'       },
    { label: 'Geyser efficiency',               text: 'How do I save energy on my geyser?'            },
    { label: 'Solar tips',                      text: 'How do I maximise my solar output?'            },
    { label: 'Appliance energy rankings',       text: 'Which appliances use the most electricity?'    },
    { label: 'Battery tips',                    text: 'How do I manage my battery storage?'           },
    { label: 'Upload a reading',                text: 'How do I upload a meter reading?'              },
    { label: 'App navigation',                  text: 'Where do I find each section in the app?'      },
    { label: c.leaderboard ? 'Leaderboard'
                           : 'Enable leaderboard',
      text:  c.leaderboard ? 'How does the leaderboard work?'
                           : 'How do I enable the leaderboard?'                                       },
    { label: c.push ? 'My notifications'
                    : 'Enable push alerts',
      text:  c.push ? 'What are my current notification settings?'
                    : 'How do I enable push notifications?'                                           },
    { label: c.twoFa ? '2FA enabled ✅'
                     : 'Set up 2FA',
      text:  c.twoFa ? 'My account has 2FA — how does it work?'
                     : 'How do I set up two-factor authentication?'                                   },
    { label: 'Privacy & data',                  text: 'What data does BrightBox store about me?'      },
    { label: 'Change theme',                    text: 'How do I switch to dark mode?'                 },
    { label: 'Maintenance schedule',            text: 'What maintenance should I do and when?'        },
    { label: 'Inverter fault help',             text: 'My inverter has a fault — what do I do?'       },
    { label: 'EV charging tips',                text: 'How should I charge my EV efficiently?'        },
    { label: 'Get support',                     text: 'How do I contact BrightBox support?'           },
  ]
})

const suggestionOffset = ref(0)

const suggestions = computed(() => {
  const pool  = suggestionPool.value
  const start = suggestionOffset.value % pool.length
  return [0, 1, 2].map(i => pool[(start + i) % pool.length])
})

function rotateSuggestions() {
  suggestionOffset.value = (suggestionOffset.value + 3) % suggestionPool.value.length
}

// ── Text-to-speech ────────────────────────────────────────────────────────────
function speak(text) {
  if (!hasSpeechOutput || !text?.trim()) return
  const clean = text.replace(/[^\x00-\x7F]/g, '').replace(/\n+/g, '. ')
  window.speechSynthesis.cancel()
  const utt   = new SpeechSynthesisUtterance(clean)
  utt.rate    = 0.92
  utt.pitch   = 1.0
  utt.lang    = 'en-US'
  const voices = window.speechSynthesis.getVoices()
  const best   = voices.find(v =>
    v.name.toLowerCase().includes('google') ||
    (v.lang === 'en-US' && !v.name.toLowerCase().includes('espeak'))
  )
  if (best) utt.voice = best
  utt.onstart = () => { isSpeaking.value = true  }
  utt.onend   = () => { isSpeaking.value = false }
  utt.onerror = () => { isSpeaking.value = false }
  window.speechSynthesis.speak(utt)
}

function toggleTts() {
  ttsOn.value = !ttsOn.value
  if (!ttsOn.value) { window.speechSynthesis?.cancel(); isSpeaking.value = false }
}


let mediaRecorder  = null
let audioChunks    = []

async function transcribeWithGemini(audioBlob) {
  // Convert blob to base64
  const arrayBuffer = await audioBlob.arrayBuffer()
  const bytes       = new Uint8Array(arrayBuffer)
  let   binary      = ''
  bytes.forEach(b => { binary += String.fromCharCode(b) })
  const base64Audio = btoa(binary)

  // Detect MIME type — prefer webm (Chrome/Edge/Firefox), fallback to mp4 (Safari)
  const mimeType = audioBlob.type || 'audio/webm'

  const body = {
    contents: [{
      parts: [
        {
          inline_data: {
            mime_type: mimeType,
            data:      base64Audio,
          }
        },
        {
          text: 'Please transcribe the speech in this audio clip exactly as spoken. Return only the transcribed text with no extra commentary, punctuation corrections, or formatting.'
        }
      ]
    }],
    generationConfig: {
      temperature:     0,
      maxOutputTokens: 200,
    }
  }

  const res = await fetch(GEMINI_URL, {
    method:  'POST',
    headers: {
      'Content-Type':   'application/json',
      'X-goog-api-key': GEMINI_KEY,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) throw new Error(`Transcription API error: ${res.status}`)

  const data       = await res.json()
  const transcript = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

  if (!transcript) throw new Error('Empty transcription response')

  return transcript
}

async function toggleVoice() {
  // ── Already recording → stop ───────────────────────────────────────────────
  if (listening.value) {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop() // triggers onstop which handles the rest
    } else {
      listening.value = false
    }
    return
  }

  // ── Check MediaRecorder support ────────────────────────────────────────────
  if (!window.MediaRecorder) {
    pushBot('Voice input is not supported in your browser. Try Chrome, Edge, or Firefox.')
    return
  }

  // ── Request microphone ─────────────────────────────────────────────────────
  let stream
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  } catch (err) {
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      pushBot('🔒 Microphone access was denied.\n\nClick the 🔒 lock icon in your browser address bar → Microphone → Allow, then try again.')
    } else if (err.name === 'NotFoundError') {
      pushBot('🎤 No microphone found. Please connect a microphone and try again.')
    } else {
      pushBot(`Could not access microphone: ${err.message}`)
    }
    return
  }

  // ── Pick best supported MIME type ─────────────────────────────────────────
  const preferredTypes = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/mp4',
  ]
  const mimeType = preferredTypes.find(t => MediaRecorder.isTypeSupported(t)) || ''

  // ── Start recording ────────────────────────────────────────────────────────
  audioChunks  = []
  mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : {})

  mediaRecorder.ondataavailable = e => {
    if (e.data && e.data.size > 0) audioChunks.push(e.data)
  }

  mediaRecorder.onstop = async () => {
    // Stop all mic tracks to release the mic indicator in browser
    stream.getTracks().forEach(t => t.stop())

    listening.value = false

    if (audioChunks.length === 0) return

    const audioBlob = new Blob(audioChunks, { type: mimeType || 'audio/webm' })

    // Need API key to transcribe
    if (!hasApiKey.value) {
      pushBot('Voice transcription needs a Gemini API key. Add VITE_GEMINI_KEY to your .env.local file, or type your message instead.')
      return
    }

    // Show a transcribing indicator
    loading.value = true
    await nextTick()

    try {
      const transcript = await transcribeWithGemini(audioBlob)
      loading.value    = false
      if (transcript) {
        send(transcript)  // send directly — no input.value needed
      }
    } catch (err) {
      loading.value = false
      console.error('Transcription error:', err)
      pushBot('Could not transcribe audio. Please check your API key and try again, or type your message.')
    }
  }

  mediaRecorder.onerror = err => {
    stream.getTracks().forEach(t => t.stop())
    listening.value = false
    pushBot(`Recording error: ${err.error?.message || 'unknown'}. Please try again.`)
  }

  mediaRecorder.start()
  listening.value = true
}
</script>

<template>
  <div class="fixed bottom-[4.5rem] md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-3">

    <!-- ── Chat window ──────────────────────────────────────────────────────── -->
    <Transition name="chat-slide">
      <div
        v-if="open"
        class="flex flex-col rounded-[18px] overflow-hidden"
        style="width: min(88vw, 360px); background: var(--surf-card); border: 1px solid var(--border); box-shadow: 0 8px 36px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08);"
        role="dialog"
        aria-label="SolarBuddy chat assistant"
        aria-modal="true"
      >

        <!-- Header -->
        <div
          class="flex items-center gap-2 px-3.5 py-2.5 flex-shrink-0"
          style="background: linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%);"
        >
          <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style="background: rgba(255,255,255,0.18);">
            <span class="material-symbols-outlined"
              style="font-size:18px; color:white; font-variation-settings:'FILL' 1,'wght' 400;">
              energy_savings_leaf
            </span>
          </div>

          <div class="flex-1 min-w-0">
            <p class="text-white font-bold text-[13.5px] leading-none tracking-tight">SolarBuddy</p>
            <div class="flex items-center gap-1.5 mt-1">
              <span class="w-1.5 h-1.5 rounded-full flex-shrink-0"
                :style="{ background: statusDot }"></span>
              <span class="text-[10.5px] truncate" style="color: rgba(255,255,255,0.80);">
                {{ statusLabel }}
              </span>
            </div>
          </div>

          <!-- TTS -->
          <button v-if="hasSpeechOutput"
            class="w-7 h-7 rounded-lg flex items-center justify-center transition-all flex-shrink-0"
            :style="ttsOn ? 'background:rgba(255,255,255,0.30);' : 'background:rgba(255,255,255,0.12);'"
            @click="toggleTts"
            :aria-pressed="ttsOn"
            :title="ttsOn ? 'Read aloud ON' : 'Read aloud OFF'"
          >
            <span class="material-symbols-outlined" style="font-size:14px; color:white;"
              :style="ttsOn ? 'font-variation-settings:\'FILL\' 1' : ''">
              {{ ttsOn ? 'volume_up' : 'volume_off' }}
            </span>
          </button>

          <!-- Clear -->
          <button class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style="background: rgba(255,255,255,0.12);"
            @click="clearChat" aria-label="Clear conversation" title="Clear chat">
            <span class="material-symbols-outlined" style="font-size:13px; color:white;">refresh</span>
          </button>

          <!-- Close -->
          <button class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style="background: rgba(255,255,255,0.12);"
            @click="open = false" aria-label="Close SolarBuddy">
            <span class="material-symbols-outlined" style="font-size:13px; color:white;">close</span>
          </button>
        </div>

        <!-- Messages -->
        <div
          ref="msgEl"
          class="flex flex-col gap-2.5 px-3.5 py-3 overflow-y-auto flex-1"
          style="min-height: 180px; max-height: min(260px, 45dvh);"
          aria-live="polite"
          role="log"
          aria-label="Chat messages"
        >
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="flex flex-col chat-msg"
            :class="msg.role === 'user' ? 'items-end' : 'items-start'"
          >
            <!-- Bot bubble -->
            <div v-if="msg.role === 'assistant'" class="flex items-end gap-1.5 max-w-[92%]">
              <div class="w-5 h-5 rounded-full flex-shrink-0 mb-0.5 flex items-center justify-center"
                style="background: var(--pri-mid);">
                <span class="material-symbols-outlined"
                  style="font-size:11px; color:white; font-variation-settings:'FILL' 1;">
                  energy_savings_leaf
                </span>
              </div>
              <div
                class="px-3 py-2 rounded-[13px] rounded-tl-[4px] text-[12.5px] leading-relaxed whitespace-pre-wrap"
                style="background: var(--surf-2); color: var(--text); border: 1px solid var(--border);"
              >{{ msg.content }}</div>
            </div>

            <!-- User bubble -->
            <div v-else
              class="px-3 py-2 rounded-[13px] rounded-tr-[4px] text-[12.5px] leading-relaxed max-w-[86%] whitespace-pre-wrap"
              style="background: var(--pri-mid); color: #fff;"
            >{{ msg.content }}</div>

            <span class="text-[9.5px] mt-0.5 px-1" style="color: var(--text-muted);">
              {{ msg.role === 'user' ? 'You' : 'SolarBuddy' }} · {{ msg.time }}
            </span>
          </div>

          <!-- Typing indicator -->
          <div v-if="loading" class="flex items-end gap-1.5 chat-msg">
            <div class="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
              style="background: var(--pri-mid);">
              <span class="material-symbols-outlined"
                style="font-size:11px; color:white; font-variation-settings:'FILL' 1;">
                energy_savings_leaf
              </span>
            </div>
            <div class="px-3.5 py-2.5 rounded-[13px] rounded-tl-[4px]"
              style="background: var(--surf-2); border: 1px solid var(--border);"
              role="status" aria-label="SolarBuddy is typing">
              <div class="flex gap-1 items-center h-3">
                <span
                  v-for="n in 3" :key="n"
                  class="w-1.5 h-1.5 rounded-full"
                  :style="{ background: 'var(--text-muted)', animation: `bounce-dot 1.2s ease-in-out ${(n-1)*0.2}s infinite` }"
                ></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Suggestions -->
        <div
          class="flex gap-1.5 overflow-x-auto px-3.5 py-2 flex-shrink-0"
          style="scrollbar-width: none; -webkit-overflow-scrolling: touch; border-top: 1px solid var(--border);"
          role="group"
          aria-label="Quick suggestions"
        >
          <button
            v-for="s in suggestions"
            :key="s.label"
            class="flex-shrink-0 text-[11px] font-semibold px-2.5 py-1.5 rounded-full transition-all active:scale-95 whitespace-nowrap"
            :style="{ background: 'var(--surf-2)', border: '1px solid var(--border)', color: 'var(--pri)', minHeight: '30px' }"
            @click="send(s.text)"
          >{{ s.label }}</button>

          <button
            class="flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-full transition-all active:scale-95 whitespace-nowrap"
            :style="{ background: 'var(--surf-2)', border: '1px dashed var(--border)', color: 'var(--text-muted)', minHeight: '30px' }"
            @click="rotateSuggestions"
            aria-label="Show more suggestions"
            title="More suggestions"
          >
            <span class="material-symbols-outlined" style="font-size:13px;">refresh</span>
            More
          </button>
        </div>

        <!-- Input row -->
        <div
          class="flex items-center gap-2 px-3 py-2.5 flex-shrink-0"
          style="border-top: 1px solid var(--border);"
        >
          <!-- Mic -->
          <button
            class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all"
            :style="listening
              ? 'background: var(--pri-mid);'
              : hasSpeechInput
                ? 'background: var(--surf-2); border: 1px solid var(--border);'
                : 'background: var(--surf-2); border: 1px solid var(--border); opacity: 0.35; cursor: not-allowed;'"
            @click="toggleVoice"
            :disabled="!hasSpeechInput"
            :aria-label="listening ? 'Stop recording' : 'Voice input'"
            :aria-pressed="listening"
          >
            <span class="material-symbols-outlined" style="font-size: 17px;"
              :style="listening ? 'color:white; font-variation-settings:\'FILL\' 1' : 'color: var(--text-muted);'">
              {{ listening ? 'mic' : 'mic_none' }}
            </span>
          </button>

          <!-- Listening pill -->
          <div v-if="listening" class="flex-1 flex items-center gap-2 px-3.5 py-1.5 rounded-full"
            style="background: var(--pri-light); color: var(--pri);" aria-live="assertive">
            <span class="w-1.5 h-1.5 rounded-full"
              style="background: var(--pri-mid); animation: bounce-dot 0.8s ease-in-out infinite;"></span>
            <span class="text-[12px] font-semibold">Listening…</span>
          </div>

          <!-- Text input -->
          <input
            v-else
            v-model="input"
            type="text"
            :placeholder="mode === 'offline' ? 'Ask anything (offline)…' : 'Ask SolarBuddy anything…'"
            class="flex-1 rounded-full px-3.5 py-1.5 text-[12.5px] outline-none border transition-all"
            style="min-height: 36px; background: var(--surf-2); border-color: var(--border); color: var(--text);"
            aria-label="Message SolarBuddy"
            @keydown.enter="send()"
          />

          <!-- Send -->
          <button
            class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center transition-all active:scale-95"
            :style="{ background: 'var(--pri-mid)', opacity: (input.trim() && !loading && !listening) ? '1' : '0.3' }"
            :disabled="loading || !input.trim() || listening"
            @click="send()"
            aria-label="Send message"
          >
            <span class="material-symbols-outlined" style="font-size:16px; color:white;">send</span>
          </button>
        </div>

      </div>
    </Transition>

    <!-- ── FAB ─────────────────────────────────────────────────────────────── -->
    <div class="relative flex-shrink-0">
      <span v-if="!isOnline"
        class="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 z-10"
        style="background: #f87171; border-color: var(--surf);"
        aria-hidden="true" title="Offline"></span>

      <button
        class="rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95"
        style="width:52px; height:52px; background: linear-gradient(135deg, var(--pri) 0%, var(--pri-mid) 100%); box-shadow: 0 4px 18px rgba(25,120,229,0.38);"
        @click="open = !open"
        :aria-expanded="open"
        :aria-label="open ? 'Close SolarBuddy' : 'Open SolarBuddy energy assistant'"
      >
        <Transition name="fab-icon" mode="out-in">
          <span
            :key="open ? 'c' : 'o'"
            class="material-symbols-outlined"
            style="font-size:22px; color:white; font-variation-settings:'FILL' 1,'wght' 400;"
          >{{ open ? 'close' : 'energy_savings_leaf' }}</span>
        </Transition>
      </button>
    </div>

  </div>
</template>

<style scoped>
.chat-slide-enter-active { transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.34,1.4,0.64,1); }
.chat-slide-leave-active { transition: opacity 0.14s ease, transform 0.14s ease; }
.chat-slide-enter-from   { opacity: 0; transform: translateY(12px) scale(0.96); }
.chat-slide-leave-to     { opacity: 0; transform: translateY(6px)  scale(0.98); }

.chat-msg { animation: msgIn 0.18s ease; }
@keyframes msgIn {
  from { opacity: 0; transform: translateY(5px); }
  to   { opacity: 1; transform: translateY(0);   }
}

@keyframes bounce-dot {
  0%, 80%, 100% { transform: translateY(0);    opacity: 0.45; }
  40%           { transform: translateY(-4px); opacity: 1;    }
}

.fab-icon-enter-active, .fab-icon-leave-active { transition: all 0.16s ease; }
.fab-icon-enter-from { opacity: 0; transform: scale(0.5) rotate(-25deg); }
.fab-icon-leave-to   { opacity: 0; transform: scale(0.5) rotate(25deg);  }

div[aria-label="Quick suggestions"]::-webkit-scrollbar { display: none; }
</style>
