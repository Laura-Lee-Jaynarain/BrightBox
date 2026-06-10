<script setup>
import { ref } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import ToggleSwitch from 'primevue/toggleswitch'

defineEmits(['saved'])
const prefs = useUserPrefsStore()

const downloading      = ref(false)
const downloaded       = ref(false)
const deletionRequested = ref(false)
const showDeletionFlow  = ref(false)
const deletionEmail     = ref('')
const deletionReason    = ref('')
const deletionConfirm   = ref('')

const privacyItems = [
  {
    key: 'shareMetrics',
    icon: 'analytics',
    color: 'text-primary',
    bg: 'bg-primary/10',
    titleKey: 'shareMetrics',
    descKey: 'shareMetricsDesc',
    impact: 'Helps energy researchers improve grid efficiency. Data is always anonymised.',
  },
  {
    key: 'publicLeader',
    icon: 'leaderboard',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    titleKey: 'publicLeaderboard',
    descKey: 'publicLeaderboardDesc',
    impact: 'Your display name appears on the community leaderboard page.',
  },
  {
    key: 'analytics',
    icon: 'bar_chart',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    titleKey: 'analyticsOptIn',
    descKey: 'analyticsOptInDesc',
    impact: 'Sends anonymised usage events (page views, feature clicks) to improve the app.',
  },
]

async function downloadData() {
  downloading.value = true
  await new Promise(r => setTimeout(r, 1800))
  // Create a demo JSON blob
  const data = {
    exportDate: new Date().toISOString(),
    account: {
      displayName: prefs.profile.displayName,
      email: prefs.profile.email,
      location: prefs.profile.location,
      joinDate: '2024-01-15',
    },
    preferences: {
      theme: prefs.themeMode,
      accent: prefs.accentKey,
      language: prefs.language,
      currency: prefs.currency,
      notifications: { ...prefs.notif },
      privacy: { ...prefs.privacy },
      features: { ...prefs.features },
    },
    meterReadings: [
      { date: '2025-03-01', reading: 14520, unit: 'kWh' },
      { date: '2025-04-01', reading: 14892, unit: 'kWh' },
      { date: '2025-05-01', reading: 15211, unit: 'kWh' },
    ],
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `brightbox-data-export-${new Date().toISOString().slice(0,10)}.json`
  a.click()
  URL.revokeObjectURL(url)
  downloading.value = false
  downloaded.value  = true
  setTimeout(() => { downloaded.value = false }, 5000)
}

async function submitDeletionRequest() {
  if (deletionConfirm.value !== 'DELETE') return
  deletionRequested.value = true
  showDeletionFlow.value  = false
}

const canSubmitDeletion = () =>
  deletionEmail.value === prefs.profile.email && deletionConfirm.value === 'DELETE'
</script>

<template>
  <section class="card card-elevated">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-1 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">shield</span>
      {{ prefs.t.privacyData }}
    </h2>
    <p class="text-xs text-on-surface-variant mb-6">{{ prefs.t.privacyControl }}</p>

    <!-- ── Data sharing controls ─────────────────────────────────────────── -->
    <div class="mb-7 pb-7 border-b border-outline-variant/15">
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">Data Sharing Preferences</p>
      <div class="space-y-2">
        <div v-for="item in privacyItems" :key="item.key" class="toggle-row group">
          <div class="flex items-start gap-3 min-w-0 flex-1">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" :class="item.bg">
              <span class="material-symbols-outlined text-[18px]" :class="item.color">{{ item.icon }}</span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-on-surface">{{ prefs.t[item.titleKey] }}</p>
              <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t[item.descKey] }}</p>
              <!-- Impact note, shown on hover -->
              <p class="text-[11px] text-on-surface-variant/60 mt-1 hidden group-hover:block transition-all">
                <span class="material-symbols-outlined text-[12px] align-middle">info</span>
                {{ item.impact }}
              </p>
            </div>
          </div>
          <ToggleSwitch v-model="prefs.privacy[item.key]" :aria-label="prefs.t[item.titleKey]" />
        </div>
      </div>
    </div>

    <!-- ── Your data rights ──────────────────────────────────────────────── -->
    <div class="mb-7 pb-7 border-b border-outline-variant/15">
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">Your Data Rights (POPIA / GDPR)</p>
      <p class="text-xs text-on-surface-variant mb-4">
        Under the Protection of Personal Information Act (POPIA) and GDPR, you have the right to access, export, and request deletion of your personal data.
      </p>

      <!-- Download data -->
      <div class="flex items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container border border-outline-variant/20 mb-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-primary text-[20px]">download</span>
          </div>
          <div class="min-w-0">
            <p class="text-sm font-bold text-on-surface">{{ prefs.t.downloadMyData }}</p>
            <p class="text-xs text-on-surface-variant">Export a JSON file with all your BrightBox data</p>
          </div>
        </div>
        <button
          class="shrink-0 px-4 py-2 rounded-xl text-sm font-bold min-h-[44px] flex items-center gap-2 transition-all"
          :class="downloaded ? 'bg-emerald-500/10 text-emerald-600' : 'solar-glow'"
          :disabled="downloading"
          @click="downloadData"
        >
          <svg v-if="downloading" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15"/>
          </svg>
          <span class="material-symbols-outlined text-[16px]" v-else-if="downloaded">check_circle</span>
          <span class="material-symbols-outlined text-[16px]" v-else>download</span>
          {{ downloading ? 'Preparing…' : downloaded ? 'Downloaded!' : 'Export' }}
        </button>
      </div>

      <!-- Privacy policy link -->
      <a href="/privacy-policy.md" target="_blank" rel="noopener"
        class="flex items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container border border-outline-variant/20 mb-3 group hover:border-primary/30 transition-all">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-primary text-[20px]">gavel</span>
          </div>
          <div>
            <p class="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{{ prefs.t.privacyPolicy }}</p>
            <p class="text-xs text-on-surface-variant">Read how BrightBox collects and uses your data</p>
          </div>
        </div>
        <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[18px]">open_in_new</span>
      </a>

      <!-- Cookie & tracker notice -->
      <div class="p-3 rounded-xl bg-surface-container border border-outline-variant/15">
        <p class="text-xs text-on-surface-variant">
          <strong class="text-on-surface">Cookie & Tracking Policy:</strong> BrightBox uses essential session cookies only. We do not use advertising trackers or third-party analytics cookies. Usage analytics (if opted in above) are sent to our own servers and never shared with advertisers.
        </p>
      </div>
    </div>

    <!-- ── Data deletion ─────────────────────────────────────────────────── -->
    <div>
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">Account & Data Deletion</p>

      <div v-if="deletionRequested"
        class="p-4 rounded-2xl bg-emerald-500/8 border border-emerald-500/20 flex items-start gap-3">
        <span class="material-symbols-outlined text-emerald-500 text-[22px] shrink-0 mt-0.5">check_circle</span>
        <div>
          <p class="text-sm font-bold text-on-surface">Deletion request received</p>
          <p class="text-xs text-on-surface-variant mt-1">
            Your data deletion request has been submitted. Under POPIA, we'll process this within <strong>21 business days</strong> and send a confirmation to {{ prefs.profile.email }}.
          </p>
        </div>
      </div>

      <div v-else>
        <div class="p-4 rounded-2xl bg-red-500/5 border border-red-500/15 mb-4">
          <p class="text-xs text-on-surface-variant mb-3">
            <strong class="text-on-surface">Requesting data deletion</strong> will permanently erase your account, meter readings, settings, and all personal information. This cannot be undone.
          </p>
          <button v-if="!showDeletionFlow"
            class="px-4 py-2.5 rounded-xl text-sm font-bold border border-red-500/40 text-red-500 hover:bg-red-500/10 transition-colors min-h-[44px] flex items-center gap-2"
            @click="showDeletionFlow = true">
            <span class="material-symbols-outlined text-[16px]">delete_forever</span>
            {{ prefs.t.deleteMyData }}
          </button>
        </div>

        <!-- Deletion confirmation form -->
        <Transition name="slide-down">
          <div v-if="showDeletionFlow" class="p-5 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-4">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-red-500 text-[20px]">warning</span>
              <h3 class="font-bold text-sm text-red-600 dark:text-red-400">Confirm account deletion</h3>
            </div>

            <div class="space-y-1.5">
              <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block">
                Your account email address
              </label>
              <input v-model="deletionEmail" type="email" :placeholder="prefs.profile.email"
                class="form-input border border-red-500/30" />
            </div>

            <div class="space-y-1.5">
              <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block">
                Reason for leaving (optional)
              </label>
              <select v-model="deletionReason" class="form-input">
                <option value="">Select a reason…</option>
                <option>I no longer need the service</option>
                <option>Privacy concerns</option>
                <option>Switching to another app</option>
                <option>Too many notifications</option>
                <option>Other</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block">
                Type <strong>DELETE</strong> to confirm
              </label>
              <input v-model="deletionConfirm" type="text" placeholder="DELETE"
                class="form-input font-mono border border-red-500/30" />
            </div>

            <div class="flex gap-2 flex-wrap">
              <button
                class="px-5 py-2.5 rounded-xl text-sm font-bold min-h-[44px] transition-all"
                :class="canSubmitDeletion() ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-surface-container text-on-surface-variant/50 cursor-not-allowed'"
                :disabled="!canSubmitDeletion()"
                @click="submitDeletionRequest">
                Submit Deletion Request
              </button>
              <button class="px-5 py-2.5 rounded-xl text-sm font-semibold min-h-[44px] bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
                @click="showDeletionFlow = false">Cancel</button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
