<script setup>
/**
 * ImpactReport.vue — Impact Report modal + Print/Save as PDF
 *
 * Uses window.print() with a dedicated @media print stylesheet.
 * Zero CDN dependencies — no html2canvas, no jsPDF.
 * No color-mix() / CSS variable parsing errors.
 * All colours are literal hex values so print output is always accurate.
 *
 * Usage:
 *   <ImpactReport ref="reportModal" />
 *   reportModal.value.openReport()
 */
import { ref, computed } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

const prefs = useUserPrefsStore()

const open     = ref(false)
const printing = ref(false)

defineExpose({ openReport })
function openReport() { open.value = true }

// ── Badges (inline — no external composable needed) ───────────────────────────
const BADGE_DEFS = [
  { id: 'first-reading', emoji: '⬆️', label: 'First Reading'  },
  { id: 'week-streak',   emoji: '🔥', label: 'Week Streak'    },
  { id: 'green-25',      emoji: '🌿', label: 'Green 25%'      },
  { id: 'green-50',      emoji: '🌱', label: 'Green 50%'      },
  { id: 'saver',         emoji: '💰', label: 'Energy Saver'   },
  { id: 'community',     emoji: '👥', label: 'Community Hero' },
  { id: 'top-50',        emoji: '🏆', label: 'Top 50'         },
  { id: 'challenger',    emoji: '🎯', label: 'Challenger'     },
]

function earnedBadgeIds(stats) {
  const e = new Set()
  if (stats.readings   >= 1)   e.add('first-reading')
  if (stats.streak     >= 7)   e.add('week-streak')
  if (stats.greenPct   >= 25)  e.add('green-25')
  if (stats.greenPct   >= 50)  e.add('green-50')
  if (stats.kwhSaved   >= 100) e.add('saver')
  if (stats.posts      >= 5)   e.add('community')
  if (stats.rank       <= 50)  e.add('top-50')
  if (stats.challenges >= 2)   e.add('challenger')
  return e
}

// ── Report data ───────────────────────────────────────────────────────────────
const D = computed(() => {
  const kwhSaved   = 612.8
  const kwhTotal   = 789.4
  const greenPct   = Math.round((kwhSaved / kwhTotal) * 100)
  const co2Saved   = (kwhSaved * 0.92).toFixed(1)
  const moneySaved = (kwhSaved * 2.48).toFixed(2)
  const streak     = 7
  const rank       = 42
  const readings   = 18
  const challenges = 2
  const posts      = 3

  const stats    = { kwhSaved, greenPct, streak, readings, challenges, posts, rank }
  const earnedIds = earnedBadgeIds(stats)

  const monthly = [
    { month: 'Jul', kwh: 98.2  },
    { month: 'Aug', kwh: 104.1 },
    { month: 'Sep', kwh: 91.7  },
    { month: 'Oct', kwh: 112.4 },
    { month: 'Nov', kwh: 108.6 },
    { month: 'Dec', kwh: 97.8  },
  ]

  return {
    generatedAt: new Date().toLocaleString('en-ZA', { dateStyle: 'long', timeStyle: 'short' }),
    period: 'July 2024 – December 2024',
    profile: {
      name:     prefs.profile?.displayName || 'Energy Hero',
      email:    prefs.profile?.email       || '—',
      location: prefs.profile?.location    || 'South Africa',
    },
    kwhSaved, kwhTotal, greenPct, co2Saved, moneySaved,
    moneySavedNum: Number(moneySaved),
    streak, rank, readings, challenges, posts,
    earnedIds,
    monthly,
    maxKwh:     Math.max(...monthly.map(m => m.kwh)),
    treesEquiv: Math.round(Number(co2Saved) / 21.77),
  }
})

function barH(kwh, max) { return Math.max(6, Math.round((kwh / max) * 100)) }

// ── Print ─────────────────────────────────────────────────────────────────────
function printReport() {
  printing.value = true

  const id = 'bb-print-style'
  let s = document.getElementById(id)
  if (!s) { s = document.createElement('style'); s.id = id; document.head.appendChild(s) }

  s.textContent = `
@media print {
  body > *:not(#bb-report-print) { display: none !important; }
  #bb-report-print {
    display: block !important; position: static !important;
    background: transparent !important; padding: 0 !important;
  }
  .modal-overlay {
    position: static !important; background: transparent !important;
    backdrop-filter: none !important; padding: 0 !important;
  }
  .modal-inner { max-width: 100% !important; width: 100% !important; gap: 0 !important; }
  .no-print    { display: none !important; }
  .bb-report-card {
    box-shadow: none !important; border-radius: 0 !important;
    width: 100% !important; margin: 0 !important;
  }
  section { page-break-inside: avoid; break-inside: avoid; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  @page { margin: 10mm; size: A4 portrait; }
}`

  setTimeout(() => { window.print(); printing.value = false }, 120)
}
</script>

<template>
  <Teleport to="body">
    <div id="bb-report-print">
      <Transition name="modal">
        <div v-if="open"
          class="modal-overlay fixed inset-0 z-[600] flex items-start justify-center overflow-y-auto py-6 px-4"
          style="background:rgba(0,0,0,0.65); backdrop-filter:blur(6px);"
          @click.self="open = false">

          <div class="modal-inner w-full max-w-3xl flex flex-col gap-4">

            <!-- Action bar -->
            <div class="no-print flex items-center justify-between flex-wrap gap-3 px-1">
              <h2 class="text-white font-bold text-lg flex items-center gap-2">
                <span class="material-symbols-outlined text-[22px]"
                  style="font-variation-settings:'FILL' 1">description</span>
                Impact Report Preview
              </h2>
              <div class="flex gap-2">
                <button
                  class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border min-h-[44px]"
                  style="background:rgba(255,255,255,0.15); color:white; border-color:rgba(255,255,255,0.25);"
                  @click="open = false">
                  <span class="material-symbols-outlined text-[18px]">close</span> Close
                </button>
                <button
                  class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold min-h-[44px]"
                  style="background:var(--color-primary); color:#fff;"
                  :style="printing ? 'opacity:0.7;cursor:not-allowed' : ''"
                  :disabled="printing"
                  @click="printReport">
                  <span class="material-symbols-outlined text-[18px]">print</span>
                  {{ printing ? 'Opening…' : 'Print / Save as PDF' }}
                </button>
              </div>
            </div>

            <!-- Hint -->
            <p class="no-print text-center text-white/60 text-xs">
              In the print dialog, set Destination to
              <strong class="text-white/80">Save as PDF</strong> to download a PDF.
            </p>

            <!-- REPORT CARD — all colours are literal hex, never CSS vars or color-mix() -->
            <div class="bb-report-card bg-white rounded-2xl overflow-hidden shadow-2xl"
              style="font-family:'Plus Jakarta Sans',system-ui,sans-serif; color:#111;">

              <!-- Header gradient -->
              <div class="relative overflow-hidden px-10 py-10"
                style="background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);">
                <div class="absolute -top-12 -right-12 w-48 h-48 rounded-full"
                  style="background:rgba(255,255,255,0.07)"></div>
                <div class="absolute -bottom-16 -left-8 w-64 h-64 rounded-full"
                  style="background:rgba(255,255,255,0.05)"></div>

                <div class="relative z-10 flex justify-between items-start flex-wrap gap-6">
                  <div>
                    <div class="flex items-center gap-2 mb-4">
                      <span class="material-symbols-outlined"
                        style="font-size:22px;color:rgba(255,255,255,0.9);font-variation-settings:'FILL' 1">bolt</span>
                      <span class="font-black text-xl tracking-tight" style="color:white">BrightBox</span>
                    </div>
                    <h1 class="font-black text-4xl tracking-tight mb-1" style="color:white">Impact Report</h1>
                    <p style="color:rgba(255,255,255,0.75)">{{ D.period }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-xl" style="color:white">{{ D.profile.name }}</p>
                    <p class="text-sm" style="color:rgba(255,255,255,0.70)">{{ D.profile.email }}</p>
                    <p class="text-sm" style="color:rgba(255,255,255,0.70)">{{ D.profile.location }}</p>
                    <p class="text-xs mt-3" style="color:rgba(255,255,255,0.50)">Generated {{ D.generatedAt }}</p>
                  </div>
                </div>

                <!-- KPI strip -->
                <div class="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div v-for="k in [
                    { val: D.kwhSaved + ' kWh', label:'Energy Saved'   },
                    { val: D.co2Saved + ' kg',  label:'CO₂ Offset'    },
                    { val: 'R ' + D.moneySaved, label:'Est. Savings'   },
                    { val: '#' + D.rank,         label:'Community Rank' },
                  ]" :key="k.label"
                  class="rounded-xl px-4 py-3 text-center" style="background:rgba(255,255,255,0.15)">
                    <p class="font-black text-xl leading-tight" style="color:white">{{ k.val }}</p>
                    <p class="text-[10px] uppercase tracking-wider mt-0.5" style="color:rgba(255,255,255,0.65)">{{ k.label }}</p>
                  </div>
                </div>
              </div>

              <!-- Body -->
              <div class="px-10 py-8 space-y-10" style="background:#fff">

                <!-- 01 Energy Summary -->
                <section>
                  <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2"
                    style="color:#2563eb;border-bottom:2px solid #2563eb">01 — Energy Summary</h2>
                  <div class="grid grid-cols-3 gap-4 mb-6">
                    <div v-for="s in [
                      { val: D.kwhSaved,       label:'kWh Saved'    },
                      { val: D.greenPct + '%', label:'Green Energy'  },
                      { val: D.kwhTotal,       label:'kWh Total Used'},
                    ]" :key="s.label"
                    class="rounded-xl p-4 text-center" style="background:#f8fafc;border:1px solid #e2e8f0">
                      <p class="text-3xl font-black" style="color:#2563eb">{{ s.val }}</p>
                      <p class="text-xs font-semibold uppercase tracking-wider mt-1" style="color:#64748b">{{ s.label }}</p>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-xs mb-1.5" style="color:#94a3b8">
                      <span>Green energy portion</span><span>{{ D.greenPct }}%</span>
                    </div>
                    <div class="w-full h-4 rounded-full overflow-hidden" style="background:#e2e8f0">
                      <div class="h-full rounded-full" :style="{ width: D.greenPct+'%', background:'#2563eb' }"/>
                    </div>
                    <div class="flex justify-between text-xs mt-1" style="color:#cbd5e1">
                      <span>0 kWh</span><span>{{ D.kwhTotal }} kWh</span>
                    </div>
                  </div>
                </section>

                <!-- 02 Monthly Trend -->
                <section style="page-break-inside:avoid">
                  <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2"
                    style="color:#2563eb;border-bottom:2px solid #2563eb">02 — Monthly Energy Trend</h2>
                  <div class="flex items-end justify-between gap-2" style="height:120px">
                    <div v-for="m in D.monthly" :key="m.month" class="flex-1 flex flex-col items-center gap-1">
                      <span class="text-[9px] font-bold" style="color:#2563eb">{{ m.kwh }}</span>
                      <div class="w-full rounded-t-md"
                        :style="{ height: barH(m.kwh, D.maxKwh)+'%', background:'#2563eb', minHeight:'8px' }"/>
                      <span class="text-[9px] font-medium" style="color:#94a3b8">{{ m.month }}</span>
                    </div>
                  </div>
                  <p class="text-[10px] mt-2 text-right" style="color:#94a3b8">kWh per month</p>
                </section>

                <!-- 03 Environmental Impact -->
                <section>
                  <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2"
                    style="color:#2563eb;border-bottom:2px solid #2563eb">03 — Environmental Impact</h2>
                  <div class="grid grid-cols-2 gap-4">
                    <div v-for="s in [
                      { emoji:'🌿', val:D.co2Saved+' kg',      label:'CO₂ Offset',     sub:'vs. SA grid average'   },
                      { emoji:'🌳', val:D.treesEquiv+' trees', label:'Tree Equivalent', sub:'annual CO₂ absorption' },
                      { emoji:'💧', val:'18 400 L',            label:'Water Saved',     sub:'via shorter showers'   },
                      { emoji:'🔥', val:D.streak+'-day streak',label:'Consistency',     sub:'daily green habit'     },
                    ]" :key="s.label"
                    class="flex items-start gap-3 rounded-xl p-4" style="background:#f8fafc;border:1px solid #e2e8f0">
                      <span class="text-2xl shrink-0">{{ s.emoji }}</span>
                      <div>
                        <p class="text-xl font-black" style="color:#2563eb">{{ s.val }}</p>
                        <p class="text-xs font-semibold" style="color:#334155">{{ s.label }}</p>
                        <p class="text-[10px] mt-0.5" style="color:#94a3b8">{{ s.sub }}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <!-- 04 Financial Savings -->
                <section style="page-break-inside:avoid">
                  <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2"
                    style="color:#2563eb;border-bottom:2px solid #2563eb">04 — Financial Savings</h2>
                  <div class="grid grid-cols-3 gap-4">
                    <div v-for="f in [
                      { label:'Estimated Savings', sub:'at R2.48/kWh',           val:'R '+D.moneySaved },
                      { label:'Projected Annual',  sub:'based on current rate',  val:'R '+(D.moneySavedNum*2).toFixed(2) },
                      { label:'5-Year Projection', sub:'at current consumption', val:'R '+(D.moneySavedNum*10).toFixed(0) },
                    ]" :key="f.label"
                    class="rounded-xl p-4 text-center" style="background:#f0fdf4;border:1px solid #bbf7d0">
                      <p class="text-lg font-black" style="color:#15803d">{{ f.val }}</p>
                      <p class="text-xs font-semibold mt-1" style="color:#475569">{{ f.label }}</p>
                      <p class="text-[10px] mt-0.5" style="color:#94a3b8">{{ f.sub }}</p>
                    </div>
                  </div>
                  <p class="text-[10px] mt-3 italic" style="color:#94a3b8">
                    * Estimates based on Eskom's published Schedule of Tariffs. Actual savings may vary.
                  </p>
                </section>

                <!-- 05 Community Standing -->
                <section>
                  <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2"
                    style="color:#2563eb;border-bottom:2px solid #2563eb">05 — Community Standing</h2>
                  <div class="grid grid-cols-4 gap-3 mb-5">
                    <div v-for="s in [
                      { val:'#'+D.rank,    label:'Rank'       },
                      { val:D.readings,    label:'Readings'   },
                      { val:D.challenges,  label:'Challenges' },
                      { val:D.posts,       label:'Posts'      },
                    ]" :key="s.label"
                    class="rounded-xl p-3 text-center" style="background:#f8fafc;border:1px solid #e2e8f0">
                      <p class="text-2xl font-black" style="color:#2563eb">{{ s.val }}</p>
                      <p class="text-[9px] font-semibold uppercase tracking-wider mt-1" style="color:#64748b">{{ s.label }}</p>
                    </div>
                  </div>
                  <p class="text-xs font-semibold uppercase tracking-wider mb-3" style="color:#64748b">
                    Earned Badges ({{ D.earnedIds.size }}/{{ BADGE_DEFS.length }})
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <div v-for="b in BADGE_DEFS" :key="b.id"
                      class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
                      :style="D.earnedIds.has(b.id)
                        ? 'background:#dbeafe;color:#1d4ed8;border:1px solid #93c5fd'
                        : 'background:#f1f5f9;color:#94a3b8;border:1px solid #e2e8f0'">
                      <span :style="D.earnedIds.has(b.id) ? '' : 'filter:grayscale(1);opacity:0.4'">{{ b.emoji }}</span>
                      {{ b.label }}
                    </div>
                  </div>
                </section>

                <!-- 06 Recommendations -->
                <section>
                  <h2 class="text-sm font-bold uppercase tracking-widest mb-4 pb-2"
                    style="color:#2563eb;border-bottom:2px solid #2563eb">06 — Personalised Recommendations</h2>
                  <div class="space-y-3">
                    <div v-for="rec in [
                      { icon:'bolt',         tip:'Run your geyser, dishwasher and washing machine before 5 PM to avoid Eskom peak-hour tariffs and reduce grid strain.' },
                      { icon:'solar_power',  tip:'Solar generation peaks 10 AM–3 PM. Schedule high-wattage appliances in this window for maximum self-consumption.' },
                      { icon:'local_fire_department', tip:`Your ${D.streak}-day streak is great. Aim for 30 days to unlock the Hot Streak badge and climb the leaderboard.` },
                      { icon:'upload_file',  tip:'Submitting meter readings twice a week improves data accuracy and earns 10 extra leaderboard points per week.' },
                    ]" :key="rec.icon"
                    class="flex items-start gap-3 rounded-xl p-3" style="background:#f8fafc;border:1px solid #e2e8f0">
                      <span class="material-symbols-outlined shrink-0 mt-0.5"
                        style="font-size:18px;color:#2563eb">{{ rec.icon }}</span>
                      <p class="text-xs leading-relaxed" style="color:#475569">{{ rec.tip }}</p>
                    </div>
                  </div>
                </section>

                <!-- Footer -->
                <footer class="flex items-center justify-between flex-wrap gap-3 pt-6"
                  style="border-top:1px solid #e2e8f0">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined"
                      style="font-size:18px;color:#2563eb;font-variation-settings:'FILL' 1">bolt</span>
                    <span class="font-bold" style="color:#334155">BrightBox</span>
                    <span class="text-xs" style="color:#94a3b8">· Empowering sustainable homes</span>
                  </div>
                  <p class="text-[10px]" style="color:#94a3b8">
                    Confidential · {{ D.profile.name }} · {{ D.generatedAt }}
                  </p>
                </footer>

              </div>
            </div>
            <!-- END REPORT CARD -->

          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-enter-active { transition: all 0.25s cubic-bezier(0.34,1.4,0.64,1); }
.modal-leave-active { transition: all 0.18s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.97) translateY(10px); }
</style>