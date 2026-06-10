<script setup>
import { ref, computed } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

const prefs = useUserPrefsStore()

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''
const FORMSPREE_URL    = import.meta.env.VITE_FORMSPREE_ENDPOINT  || ''


const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || 'support@brightbox.app'

// ── Help categories with full article content ─────────────────────────────────
const categories = [
  {
    id: 'getting-started',
    icon: 'rocket_launch',
    title: 'Getting Started',
    desc: 'Set up your account, upload your first meter reading, and understand your dashboard.',
    articles: [
      {
        title: 'How to create your account and complete your profile',
        content: 'Navigate to Settings → Profile. Fill in your display name, email, phone, bio, and location. Upload a profile photo — it syncs to the sidebar and top bar instantly. Save your profile when done.',
        route: '/settings',
      },
      {
        title: 'Uploading your first electricity meter reading',
        content: 'Tap the ⚡ Upload Meter icon in the sidebar or top bar. Enter your meter reading manually or photograph your meter display. Submit — your reading will appear in your usage charts immediately.',
        route: '/upload',
      },
      {
        title: 'Understanding your energy dashboard and charts',
        content: 'Your Dashboard shows real-time energy production vs consumption, battery storage level, green energy mix percentage, and a 24-hour usage chart. Data updates automatically — no refresh needed.',
        route: '/dashboard',
      },
      {
        title: 'Setting up your region and tariff preferences',
        content: 'Go to Settings → Language & Region to set your timezone, currency, and unit system. Go to Settings → Energy to configure your off-peak window and EV charging preferences.',
        route: '/settings',
      },
    ],
  },
  {
    id: 'meter-readings',
    icon: 'electric_meter',
    title: 'Meter Readings',
    desc: 'Everything about submitting, correcting, and tracking your meter readings.',
    articles: [
      {
        title: 'How to photograph and upload a meter reading',
        content: 'Open Upload Meter from the sidebar. Select "Photo" mode, point your camera at the meter display ensuring all digits are visible, and tap capture. Review the reading, correct any OCR errors, then submit.',
        route: '/upload',
      },
      {
        title: 'What to do if your reading was rejected',
        content: 'A reading may be rejected if the value is significantly lower than your previous reading (possible meter rollover) or if the photo was unclear. Re-upload with a clearer photo or contact support if the issue persists.',
        route: null,
      },
      {
        title: 'Editing or correcting a previous reading',
        content: 'Navigate to your reading history on the Dashboard. Tap any reading to expand it, then select "Edit". Corrections are logged with an audit timestamp for transparency.',
        route: '/dashboard',
      },
      {
        title: 'Understanding your reading history',
        content: 'Your reading history is displayed as a timeline on the Dashboard. Each entry shows the reading value, date, usage since last reading, and estimated cost based on your configured tariff.',
        route: '/dashboard',
      },
    ],
  },
  {
    id: 'billing',
    icon: 'receipt_long',
    title: 'Tariffs & Billing',
    desc: 'Understand energy tariffs, pricing tiers, and how costs are calculated.',
    articles: [
      {
        title: 'How Eskom tariff tiers work',
        content: 'Eskom uses a Time-of-Use (TOU) tariff with three pricing windows: Peak (07:00–10:00 and 17:00–20:00 weekdays), Standard (remaining weekday hours), and Off-Peak (nights and weekends). Configure your off-peak window in Settings → Energy.',
        route: '/settings',
      },
      {
        title: 'Understanding off-peak vs peak pricing',
        content: 'Off-peak electricity is typically 60–70% cheaper than peak rates. Shift heavy loads — geyser, washing machine, dishwasher — to your off-peak window. Enable Price Alerts in Settings → Notifications to get a 30-minute warning before peak windows begin.',
        route: '/settings',
      },
      {
        title: 'Why your bill changed this month',
        content: 'Bill changes can be caused by: seasonal usage patterns (more heating/cooling), Eskom tariff adjustments (usually announced annually), changes in household occupancy, or appliance faults. Check your Dashboard usage chart to identify the cause.',
        route: '/dashboard',
      },
      {
        title: 'Setting up cost alerts and thresholds',
        content: 'Enable Price Alerts in Settings → Notifications → Tariff Price Alerts. You can also enable Push Notifications to receive browser alerts before peak pricing windows begin.',
        route: '/settings',
      },
    ],
  },
  {
    id: 'app-features',
    icon: 'apps',
    title: 'App Features',
    desc: 'Explore all features: leaderboard, energy tips, community, notifications, and more.',
    articles: [
      {
        title: 'Using the community leaderboard',
        content: 'The Leaderboard ranks neighbours by renewable energy percentage. Enable it in Settings → App Features → Leaderboard. Toggle public display of your name in Settings → Privacy & Data → Public Leaderboard. Enable Community Sharing in Settings → Energy to contribute your live data.',
        route: '/leaderboard',
      },
      {
        title: 'Customising your notification preferences',
        content: 'Go to Settings → Notifications. You can control email digests, push alerts, price alerts, and maintenance reminders independently. Send test alerts from the settings page to confirm they work on your device.',
        route: '/settings',
      },
      {
        title: 'Enabling and disabling app features in Settings',
        content: 'Open Settings → App Features. Toggle the Leaderboard, Energy Tips, Community Feed, Streak Tracker, and AI Chatbot on or off. Disabled features disappear from navigation immediately. Your data is preserved — re-enable at any time.',
        route: '/settings',
      },
      {
        title: 'Using the AI Energy Assistant (SolarBuddy)',
        content: 'SolarBuddy is the floating chat button in the bottom-right corner. It works offline with a built-in energy knowledge base and can read your live settings to give personalised answers. For full AI, add a Gemini API key to your .env.local file.',
        route: null,
      },
    ],
  },
  {
    id: 'account',
    icon: 'manage_accounts',
    title: 'Account & Security',
    desc: 'Manage your profile, password, privacy settings, and account data.',
    articles: [
      {
        title: 'Changing your password',
        content: 'Go to Settings → Security → Change Password. Enter your current password, then your new password twice. The strength meter will guide you — aim for "Strong" or "Very Strong". Your new password takes effect immediately.',
        route: '/settings',
      },
      {
        title: 'Enabling two-factor authentication',
        content: 'Open Settings → Security → Two-Factor Authentication and toggle it on. Scan the QR code with Google Authenticator or Authy, enter the 6-digit code to verify, then save your 8 backup codes somewhere safe.',
        route: '/settings',
      },
      {
        title: 'Downloading your personal data',
        content: 'Go to Settings → Privacy & Data → Download My Data. A JSON file containing your account info, meter readings, and preferences will download immediately. This is your POPIA/GDPR data export right.',
        route: '/settings',
      },
      {
        title: 'Deleting your account',
        content: 'Go to Settings → Privacy & Data → Request Data Deletion, or Settings → Danger Zone → Delete Account. You will need to confirm by typing your email and "DELETE MY ACCOUNT". Deletion is processed within 21 business days per POPIA requirements.',
        route: '/settings',
      },
    ],
  },
  {
    id: 'technical',
    icon: 'build_circle',
    title: 'Technical Issues',
    desc: 'Troubleshooting errors, connection problems, and browser compatibility.',
    articles: [
      {
        title: 'App not loading or showing a blank page',
        content: 'Try: 1) Hard refresh (Ctrl+Shift+R or Cmd+Shift+R). 2) Clear browser cache and cookies. 3) Try an incognito/private window. 4) Check if JavaScript is enabled. 5) Try a different browser (Chrome or Edge recommended).',
        route: null,
      },
      {
        title: 'Push notifications not appearing on mobile',
        content: 'Ensure: 1) Browser notifications are allowed for this site in your device settings. 2) Do Not Disturb mode is off. 3) Battery saver mode is not blocking background activity. On iOS, use Safari and add the app to your home screen for push support.',
        route: '/settings',
      },
      {
        title: 'Data not syncing correctly',
        content: 'Data syncs when you have an active internet connection. If readings are not appearing, check your connection, then try pulling down to refresh the Dashboard. If the issue persists after 10 minutes, contact support with your account email.',
        route: null,
      },
      {
        title: 'Browser and device compatibility',
        content: 'BrightBox works best on Chrome 100+, Edge 100+, Firefox 100+, and Safari 15+. On mobile, Chrome for Android and Safari for iOS are fully supported. Internet Explorer is not supported. Minimum screen width is 320px.',
        route: null,
      },
    ],
  },
]

// ── Flatten all articles for search ──────────────────────────────────────────
const allArticles = computed(() =>
  categories.flatMap(cat =>
    cat.articles.map(a => ({ ...a, categoryTitle: cat.title, categoryId: cat.id, categoryIcon: cat.icon }))
  )
)

// ── Search ────────────────────────────────────────────────────────────────────
const searchQuery    = ref('')
const searchFocused  = ref(false)
const expandedArticle = ref(null) 

const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q || q.length < 2) return []
  return allArticles.value.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.content.toLowerCase().includes(q) ||
    a.categoryTitle.toLowerCase().includes(q)
  ).slice(0, 8)
})

const showSearchResults = computed(() =>
  searchFocused.value && searchQuery.value.trim().length >= 2
)

function openArticle(article) {
  expandedArticle.value = expandedArticle.value?.title === article.title ? null : article
  searchQuery.value = ''
}

function clearSearch() {
  searchQuery.value = ''
  expandedArticle.value = null
}

// ── FAQs ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'How often should I upload meter readings?',
    a: 'We recommend uploading your meter reading once a month, preferably on the same date each month. This gives you the most accurate monthly usage and cost comparisons.',
  },
  {
    q: 'Why is my estimated bill different from my actual bill?',
    a: 'Our estimates are based on your tariff tier and usage patterns. Actual bills may differ due to municipality surcharges, VAT, and meter reading accuracy. Always use your official utility bill for payment.',
  },
  {
    q: 'Can I connect multiple meters or properties?',
    a: 'Multi-property support is on our roadmap. Currently the app supports one meter per account. We will notify you when multi-meter accounts become available.',
  },
  {
    q: 'Is my energy data shared with anyone?',
    a: 'Your data is private by default. You control sharing via Settings → Privacy & Data. Community leaderboard uses anonymous aggregates unless you opt into public display.',
  },
  {
    q: 'How do I reset my app preferences to default?',
    a: 'Go to Settings → Danger Zone → Reset Settings. This restores all appearance, notification, and feature preferences without deleting your account or meter history.',
  },
  {
    q: 'Does BrightBox work without an internet connection?',
    a: 'Most of BrightBox requires internet. However, meter readings can be logged offline and will sync when you reconnect. The SolarBuddy chatbot also works fully offline using its built-in knowledge base.',
  },
]
const openFaq = ref(null)
function toggleFaq(i) { openFaq.value = openFaq.value === i ? null : i }

// ── Contact form ──────────────────────────────────────────────────────────────
const form = ref({
  name:     prefs.profile?.displayName || '',
  email:    prefs.profile?.email       || '',
  subject:  '',
  priority: 'normal',
  message:  '',
})
const sending    = ref(false)
const sent       = ref(false)
const sendError  = ref('')
const sendMethod = ref('') // 'emailjs' | 'formspree' | 'mailto' fallback arrangement

const subjectOptions = [
  'Technical issue / bug report',
  'Meter reading problem',
  'Billing or tariff question',
  'Account access / login',
  'Feature request',
  'Data privacy inquiry',
  'Other',
]
const priorityOptions = [
  { value: 'low',    label: 'General',  icon: 'help',    color: 'text-on-surface-variant' },
  { value: 'normal', label: 'Normal',   icon: 'info',    color: 'text-primary'            },
  { value: 'high',   label: 'High',     icon: 'warning', color: 'text-amber-500'          },
  { value: 'urgent', label: 'Urgent',   icon: 'error',   color: 'text-red-500'            },
]

const formValid = computed(() =>
  form.value.name.trim().length > 1 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) &&
  form.value.subject.length > 0 &&
  form.value.message.trim().length >= 20
)

const charCount    = computed(() => form.value.message.length)
const charWarning  = computed(() => charCount.value > 0 && charCount.value < 20)

async function submitForm() {
  if (!formValid.value || sending.value) return
  sending.value = true
  sendError.value = ''

  const payload = {
    from_name:    form.value.name,
    from_email:   form.value.email,
    subject:      `[BrightBox Support] ${form.value.subject}`,
    priority:     form.value.priority,
    message:      form.value.message,
    app_version:  'BrightBox v3',
    sent_at:      new Date().toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' }),
  }

 
  if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_KEY) {
    try {
      
      const emailjs = await import('@emailjs/browser')
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, payload, EMAILJS_KEY)
      sendMethod.value = 'emailjs'
      onSuccess()
      return
    } catch (err) {
      console.warn('EmailJS failed, trying Formspree:', err)
    }
  }

  
  if (FORMSPREE_URL) {
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:    payload.from_name,
          email:   payload.from_email,
          subject: payload.subject,
          message: `Priority: ${payload.priority}\n\n${payload.message}\n\nSent: ${payload.sent_at}`,
        }),
      })
      if (res.ok) {
        sendMethod.value = 'formspree'
        onSuccess()
        return
      }
      throw new Error(`Formspree error ${res.status}`)
    } catch (err) {
      console.warn('Formspree failed, falling back to mailto:', err)
    }
  }

  // ── Method 3: mailto fallback (always works — opens email client) ─────────
  const body = encodeURIComponent(
    `Name: ${payload.from_name}\n` +
    `Email: ${payload.from_email}\n` +
    `Priority: ${payload.priority}\n` +
    `Sent: ${payload.sent_at}\n\n` +
    `${payload.message}`
  )
  const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(payload.subject)}&body=${body}`
  window.open(mailtoLink, '_blank')
  sendMethod.value = 'mailto'
  onSuccess()
}

function onSuccess() {
  sending.value = false
  sent.value    = true
 
  form.value.message = ''
  form.value.subject = ''
}

function resetForm() {
  sent.value       = false
  sendError.value  = ''
  sendMethod.value = ''
}

// ── System status ─────────────────────────────────────────────────────────────
const systemStatus = {
  label: 'All Systems Operational',
  color: 'text-emerald-600 dark:text-emerald-400',
  bg:    'bg-emerald-500/10',
}
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8">

    <!-- ── Hero ──────────────────────────────────────────────────────────────── -->
    <header class="text-center py-8 sm:py-10">
      <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <span class="material-symbols-outlined text-primary text-[32px]" style="font-variation-settings:'FILL' 1">support_agent</span>
      </div>
      <h1 class="font-display text-3xl sm:text-4xl text-on-surface mb-2">Help & Support</h1>
      <p class="text-on-surface-variant max-w-lg mx-auto text-sm sm:text-base">
        Find answers, browse guides, or reach the BrightBox support team. We're here to help.
      </p>
      <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full" :class="systemStatus.bg">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-sm font-semibold" :class="systemStatus.color">{{ systemStatus.label }}</span>
      </div>
    </header>

    <!-- ── Search ────────────────────────────────────────────────────────────── -->
    <div class="relative max-w-xl mx-auto">
    
      <div class="relative flex items-center">
      
        <span
          class="material-symbols-outlined absolute left-3.5 z-10
                 text-on-surface-variant/60 text-[18px] pointer-events-none select-none
                 flex items-center leading-none"
          style="top:50%; transform:translateY(-50%); line-height:0"
        >search</span>

        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search articles, FAQs, features…"
          class="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-2xl
                 py-3 pl-10 pr-10 text-sm text-on-surface
                 placeholder:text-on-surface-variant/50
                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50
                 transition-all shadow-sm"
          aria-label="Search help articles"
          @focus="searchFocused = true"
          @blur="setTimeout(() => { searchFocused = false }, 180)"
          @keydown.escape="clearSearch"
        />

        <!-- Clear button — appears when there's a query -->
        <button
          v-if="searchQuery.length > 0"
          class="absolute right-3 w-5 h-5 rounded-full
                 bg-on-surface-variant/15 hover:bg-on-surface-variant/25 transition-colors
                 flex items-center justify-center"
          style="top:50%; transform:translateY(-50%)"
          @click="clearSearch"
          aria-label="Clear search"
        >
          <span class="material-symbols-outlined text-on-surface-variant text-[13px]">close</span>
        </button>
      </div>

      <!-- Search results dropdown ──────────────────────────────────────────── -->
      <Transition name="dropdown">
        <div
          v-if="showSearchResults"
          class="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-outline-variant/30
                 bg-surface-container-lowest shadow-xl z-30 overflow-hidden"
        >
          <!-- No results -->
          <div v-if="searchResults.length === 0" class="flex items-center gap-3 px-4 py-4 text-sm text-on-surface-variant">
            <span class="material-symbols-outlined text-[20px] text-on-surface-variant/40">search_off</span>
            No articles found for "<strong class="text-on-surface">{{ searchQuery }}</strong>"
          </div>

          <!-- Results list -->
          <div v-else>
            <p class="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">
              {{ searchResults.length }} result{{ searchResults.length !== 1 ? 's' : '' }}
            </p>
            <button
              v-for="result in searchResults"
              :key="result.title"
              class="w-full flex items-start gap-3 px-4 py-3 hover:bg-surface-container
                     transition-colors text-left border-t border-outline-variant/15 first:border-t-0"
              @mousedown.prevent="openArticle(result)"
            >
              <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">article</span>
              <div class="min-w-0">
                <p class="text-sm font-semibold text-on-surface leading-tight">{{ result.title }}</p>
                <p class="text-xs text-on-surface-variant mt-0.5">{{ result.categoryTitle }}</p>
              </div>
            </button>
          </div>
        </div>
      </Transition>
    </div>

    <!-- ── Expanded article (from search result) ─────────────────────────────── -->
    <Transition name="article-expand">
      <div v-if="expandedArticle" class="card border-primary/20 bg-primary/[0.02]">
        <div class="flex items-start justify-between gap-4 mb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[18px]">article</span>
            <p class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">
              {{ expandedArticle.categoryTitle }}
            </p>
          </div>
          <button
            class="text-on-surface-variant/50 hover:text-on-surface transition-colors shrink-0"
            @click="expandedArticle = null"
            aria-label="Close article"
          >
            <span class="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <h3 class="font-bold text-base text-on-surface mb-2">{{ expandedArticle.title }}</h3>
        <p class="text-sm text-on-surface-variant leading-relaxed">{{ expandedArticle.content }}</p>
        <div v-if="expandedArticle.route" class="mt-4">
          <router-link
            :to="expandedArticle.route"
            class="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:opacity-75 transition-opacity"
          >
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            Go to {{ expandedArticle.route === '/settings' ? 'Settings' : expandedArticle.route === '/dashboard' ? 'Dashboard' : expandedArticle.route === '/upload' ? 'Upload Meter' : 'page' }}
          </router-link>
        </div>
      </div>
    </Transition>

    <!-- ── Help categories ────────────────────────────────────────────────────── -->
    <section>
      <h2 class="font-display text-xl text-on-surface mb-4">Browse by Topic</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="card group hover:border-primary/25 hover:shadow-md transition-all"
        >
          <div class="flex items-start gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0
                        group-hover:bg-primary/15 transition-colors">
              <span class="material-symbols-outlined text-primary text-[20px]" style="font-variation-settings:'FILL' 1">{{ cat.icon }}</span>
            </div>
            <div>
              <h3 class="font-bold text-sm text-on-surface">{{ cat.title }}</h3>
              <p class="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{{ cat.desc }}</p>
            </div>
          </div>

          <ul class="space-y-1 border-t border-outline-variant/15 pt-3">
            <li
              v-for="article in cat.articles"
              :key="article.title"
            >
              <button
                class="w-full flex items-start gap-2 text-left py-1.5 px-2 -mx-2 rounded-lg
                       text-xs text-on-surface-variant hover:text-primary hover:bg-primary/5
                       transition-colors group/art"
                @click="openArticle({ ...article, categoryTitle: cat.title, categoryIcon: cat.icon })"
              >
                <span class="material-symbols-outlined text-[13px] text-on-surface-variant/40
                             group-hover/art:text-primary transition-colors shrink-0 mt-0.5">
                  article
                </span>
                <span class="leading-snug">{{ article.title }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ── FAQ ───────────────────────────────────────────────────────────────── -->
    <section>
      <h2 class="font-display text-xl text-on-surface mb-4">Frequently Asked Questions</h2>
      <div class="space-y-2">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="card cursor-pointer hover:border-primary/20 transition-all"
          :class="openFaq === i ? 'border-primary/30' : ''"
          @click="toggleFaq(i)"
        >
          <div class="flex items-center justify-between gap-4">
            <p class="font-semibold text-sm text-on-surface leading-snug">{{ faq.q }}</p>
            <span
              class="material-symbols-outlined text-[20px] shrink-0 transition-transform"
              :class="openFaq === i ? 'rotate-180 text-primary' : 'text-on-surface-variant'"
            >expand_more</span>
          </div>
          <Transition name="faq">
            <p v-if="openFaq === i" class="text-sm text-on-surface-variant mt-3 pt-3 border-t border-outline-variant/15 leading-relaxed">
              {{ faq.a }}
            </p>
          </Transition>
        </div>
      </div>
    </section>

    <!-- ── Contact form + sidebar ─────────────────────────────────────────────── -->
    <section class="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8" id="contact">
      <!-- Form -->
      <div class="lg:col-span-3 card card-elevated">
        <h2 class="font-display text-xl text-on-surface mb-1 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[22px]" style="font-variation-settings:'FILL' 1">mail</span>
          Contact Support
        </h2>
        <p class="text-sm text-on-surface-variant mb-6">
          Our team responds within 24 hours on business days (4 hours for urgent issues).
        </p>

        <!-- ── Success state ─────────────────────────────────────────────────── -->
        <Transition name="success-fade">
          <div v-if="sent" class="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-emerald-500 text-[32px]" style="font-variation-settings:'FILL' 1">check_circle</span>
            </div>
            <h3 class="font-bold text-lg text-on-surface">Message Sent!</h3>
            <p class="text-sm text-on-surface-variant max-w-xs leading-relaxed">
              <span v-if="sendMethod === 'emailjs' || sendMethod === 'formspree'">
                Your message has been delivered to our team. We'll reply to
                <strong>{{ form.email }}</strong> within 24 hours.
              </span>
              <span v-else>
                Your email client has opened with your message ready to send to
                <strong>{{ SUPPORT_EMAIL }}</strong>. Please click Send in your email app.
              </span>
            </p>
            <!-- Method badge -->
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-xs text-on-surface-variant">
              <span class="material-symbols-outlined text-[14px]">{{ sendMethod === 'mailto' ? 'open_in_new' : 'cloud_done' }}</span>
              {{ sendMethod === 'emailjs' ? 'Sent via EmailJS' : sendMethod === 'formspree' ? 'Sent via Formspree' : 'Opened in your email app' }}
            </div>
            <button
              class="mt-1 text-sm font-semibold text-primary hover:opacity-70 transition-opacity"
              @click="resetForm"
            >
              Send another message
            </button>
          </div>
        </Transition>

        <!-- ── Form fields ───────────────────────────────────────────────────── -->
        <div v-if="!sent" class="space-y-4">

          <!-- Name + Email -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="sup-name">
                Your Name <span class="text-red-500 normal-case tracking-normal text-xs font-normal">*</span>
              </label>
              <input
                id="sup-name"
                v-model="form.name"
                type="text"
                placeholder="Display name"
                autocomplete="name"
                class="form-input"
              />
            </div>
            <div class="space-y-1.5">
              <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="sup-email">
                Email Address <span class="text-red-500 normal-case tracking-normal text-xs font-normal">*</span>
              </label>
              <input
                id="sup-email"
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                autocomplete="email"
                class="form-input"
                :class="form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'border-red-500/50' : ''"
              />
            </div>
          </div>

          <!-- Subject -->
          <div class="space-y-1.5">
            <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="sup-subject">
              Subject <span class="text-red-500 normal-case tracking-normal text-xs font-normal">*</span>
            </label>
            <select id="sup-subject" v-model="form.subject" class="form-input">
              <option value="" disabled>Select a subject…</option>
              <option v-for="opt in subjectOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>

          <!-- Priority -->
          <div class="space-y-1.5">
            <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block">Priority</label>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="p in priorityOptions"
                :key="p.value"
                type="button"
                class="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-xl border-2 text-xs font-semibold
                       transition-all min-h-[60px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                :class="form.priority === p.value
                  ? 'border-primary bg-primary/8 text-primary'
                  : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/30'"
                :aria-pressed="form.priority === p.value"
                @click="form.priority = p.value"
              >
                <span
                  class="material-symbols-outlined text-[18px] transition-colors"
                  :class="form.priority === p.value ? 'text-primary' : p.color"
                  style="font-variation-settings:'FILL' 1"
                >{{ p.icon }}</span>
                {{ p.label }}
              </button>
            </div>
          </div>

          <!-- Message -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="sup-message">
                Message <span class="text-red-500 normal-case tracking-normal text-xs font-normal">*</span>
              </label>
              <span
                class="text-[10px] font-semibold transition-colors"
                :class="charWarning ? 'text-amber-500' : charCount >= 20 ? 'text-emerald-500' : 'text-on-surface-variant/50'"
              >
                {{ charCount }}/20 min
                <span v-if="charCount >= 20">✓</span>
              </span>
            </div>
            <textarea
              id="sup-message"
              v-model="form.message"
              rows="5"
              placeholder="Describe your issue or question in detail. Include steps to reproduce any bugs, your browser/device, and any error messages you saw."
              class="form-input resize-none"
              :class="charWarning ? 'border-amber-500/40' : ''"
            ></textarea>
            <p v-if="charWarning" class="text-[10px] text-amber-500 font-medium">
              Please write at least 20 characters so we can help you effectively.
            </p>
          </div>

          <!-- Send error -->
          <div v-if="sendError" class="flex items-center gap-2 p-3 rounded-xl bg-red-500/8 border border-red-500/20 text-sm text-red-600">
            <span class="material-symbols-outlined text-[16px]">error</span>
            {{ sendError }}
          </div>

          <!-- Submit button -->
          <button
            class="w-full py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 min-h-[48px]"
            :class="formValid
              ? 'solar-glow shadow-md hover:scale-[1.01] active:scale-[0.99]'
              : 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed'"
            :disabled="!formValid || sending"
            :aria-disabled="!formValid || sending"
            @click="submitForm"
          >
            <template v-if="sending">
              <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15" />
              </svg>
              Sending…
            </template>
            <template v-else>
              <span class="material-symbols-outlined text-[18px]" style="font-variation-settings:'FILL' 1">send</span>
              Send Message
            </template>
          </button>

          <!-- Setup note (shown when no email service is configured) -->
          <div v-if="!EMAILJS_SERVICE && !FORMSPREE_URL"
            class="flex items-start gap-2 p-3 rounded-xl bg-amber-500/8 border border-amber-500/15 text-xs text-on-surface-variant">
            <span class="material-symbols-outlined text-amber-500 text-[15px] shrink-0 mt-0.5">info</span>
            <span>
              No email service configured. Clicking Send will open your email app with the message pre-filled.
              To enable direct sending, add <code class="bg-surface-container px-1 rounded text-[11px]">VITE_EMAILJS_SERVICE_ID</code> or
              <code class="bg-surface-container px-1 rounded text-[11px]">VITE_FORMSPREE_ENDPOINT</code> to your <code class="bg-surface-container px-1 rounded text-[11px]">.env.local</code> file.
            </span>
          </div>
        </div>
      </div>

      <!-- ── Info sidebar ────────────────────────────────────────────────────── -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Response times -->
        <div class="card">
          <h3 class="font-bold text-sm text-on-surface mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[18px]">schedule</span>
            Response Times
          </h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-on-surface-variant">Email support</span>
              <span class="font-bold text-on-surface">Within 24h</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-on-surface-variant">Urgent issues</span>
              <span class="font-bold text-emerald-500">Within 4h</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-on-surface-variant">Business hours</span>
              <span class="font-bold text-on-surface">Mon–Fri 8–17 SAST</span>
            </div>
          </div>
        </div>

        <!-- Contact channels -->
        <div class="card">
          <h3 class="font-bold text-sm text-on-surface mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[18px]">contact_support</span>
            Direct Contact
          </h3>
          <div class="space-y-2">
            <a
              :href="`mailto:${SUPPORT_EMAIL}`"
              class="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container transition-colors group"
            >
              <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-primary text-[18px]" style="font-variation-settings:'FILL' 1">mail</span>
              </div>
              <div>
                <p class="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{{ SUPPORT_EMAIL }}</p>
                <p class="text-xs text-on-surface-variant">General support</p>
              </div>
            </a>
            <a
              href="mailto:privacy@brightbox.app"
              class="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container transition-colors group"
            >
              <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-primary text-[18px]" style="font-variation-settings:'FILL' 1">shield</span>
              </div>
              <div>
                <p class="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">privacy@brightbox.app</p>
                <p class="text-xs text-on-surface-variant">Data & privacy requests</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Tips -->
        <div class="card" style="background: color-mix(in srgb, var(--color-primary) 4%, transparent);">
          <h3 class="font-bold text-sm text-on-surface mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[18px]">tips_and_updates</span>
            Tips for Faster Help
          </h3>
          <ul class="space-y-2 text-xs text-on-surface-variant">
            <li v-for="tip in [
              'Include your account email address',
              'Describe the exact steps that caused the issue',
              'Mention your browser and device type',
              'Attach a screenshot if you see an error',
            ]" :key="tip" class="flex items-start gap-2">
              <span class="material-symbols-outlined text-primary text-[13px] mt-0.5 shrink-0" style="font-variation-settings:'FILL' 1">check_circle</span>
              {{ tip }}
            </li>
          </ul>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* Search dropdown */
.dropdown-enter-active { transition: opacity 0.15s ease, transform 0.15s cubic-bezier(0.34,1.3,0.64,1); }
.dropdown-leave-active { transition: opacity 0.12s ease, transform 0.12s ease; }
.dropdown-enter-from   { opacity: 0; transform: translateY(-6px) scale(0.98); }
.dropdown-leave-to     { opacity: 0; transform: translateY(-4px) scale(0.99); }

/* Article expand */
.article-expand-enter-active { transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1); }
.article-expand-leave-active { transition: all 0.15s ease; }
.article-expand-enter-from   { opacity: 0; transform: translateY(-8px); }
.article-expand-leave-to     { opacity: 0; transform: translateY(-4px); }

/* FAQ accordion */
.faq-enter-active, .faq-leave-active { transition: all 0.2s ease; overflow: hidden; }
.faq-enter-from, .faq-leave-to { opacity: 0; max-height: 0; margin-top: 0; }
.faq-enter-to, .faq-leave-from { opacity: 1; max-height: 200px; }

/* Success fade */
.success-fade-enter-active { transition: all 0.25s cubic-bezier(0.34,1.3,0.64,1); }
.success-fade-enter-from   { opacity: 0; transform: scale(0.96); }
</style>
