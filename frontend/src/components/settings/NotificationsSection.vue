<script setup>
import { ref, computed } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useNotificationStore } from '@/stores/notifications'
import ToggleSwitch from 'primevue/toggleswitch'

defineEmits(['saved'])
const prefs  = useUserPrefsStore()
const notifs = useNotificationStore()

const emailDisabled = computed(() => !prefs.notif.emailMaster)

const emailItems = [
  { key: 'emailAlerts',    icon: 'security',     titleKey: 'emailAlerts',    descKey: 'emailAlertsDesc',    canDisable: false },
  { key: 'weeklyDigest',   icon: 'summarize',    titleKey: 'weeklyDigest',   descKey: 'weeklyDigestDesc',   canDisable: true  },
  { key: 'monthlyReport',  icon: 'bar_chart',    titleKey: 'monthlyReport',  descKey: 'monthlyReportDesc',  canDisable: true  },
  { key: 'communityEmail', icon: 'group',        titleKey: 'communityEmail', descKey: 'communityEmailDesc', canDisable: true  },
  { key: 'productUpdates', icon: 'new_releases', titleKey: 'productUpdates', descKey: 'productUpdatesDesc', canDisable: true  },
  { key: 'marketingEmail', icon: 'local_offer',  titleKey: 'marketingEmail', descKey: 'marketingEmailDesc', canDisable: true  },
]

function unsubscribeAll() {
  prefs.notif.emailMaster    = false
  prefs.notif.weeklyDigest   = false
  prefs.notif.monthlyReport  = false
  prefs.notif.communityEmail = false
  prefs.notif.productUpdates = false
  prefs.notif.marketingEmail = false
}

// ── Push notification permission ─────────────────────────────────────────────
const pushStatus = computed(() => notifs.pushPermission)
const pushStatusLabel = computed(() => ({
  granted: 'Enabled',
  denied:  'Blocked by browser',
  default: 'Not yet enabled',
}[pushStatus.value] || 'Not supported'))

const pushStatusColor = computed(() => ({
  granted: 'text-emerald-500',
  denied:  'text-red-500',
  default: 'text-amber-500',
}[pushStatus.value] || 'text-on-surface-variant'))

async function enablePush() {
  const result = await notifs.requestPushPermission()
  if (result.ok) {
    prefs.notif.push = true
    notifs.add({ type: 'success', title: 'Push Notifications Enabled', body: 'You\'ll now receive real-time alerts for price changes and maintenance tips.' })
  }
}

// ── Demo alert triggers ───────────────────────────────────────────────────────
const priceAlertCooldown = ref(false)
const maintenanceCooldown = ref(false)

function testPriceAlert() {
  notifs.firePriceAlert()
  priceAlertCooldown.value = true
  setTimeout(() => { priceAlertCooldown.value = false }, 5000)
}

function testMaintenanceTip() {
  notifs.fireMaintenanceTip()
  maintenanceCooldown.value = true
  setTimeout(() => { maintenanceCooldown.value = false }, 5000)
}
</script>

<template>
  <section class="card">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-2 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">notifications</span>
      {{ prefs.t.notifications }}
    </h2>
    <p class="text-xs sm:text-sm text-on-surface-variant mb-6">{{ prefs.t.notifTitle }}</p>

    <!-- ── Email notifications ───────────────────────────────────────────────── -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-1">
        <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">{{ prefs.t.emailNotifs }}</p>
        <ToggleSwitch v-model="prefs.notif.emailMaster" :aria-label="prefs.t.emailNotifs" />
      </div>
      <p class="text-xs text-on-surface-variant/70 mb-4">{{ prefs.t.emailNotifsDesc }}</p>

      <div class="space-y-1.5 border-l-2 pl-4 ml-2 transition-opacity"
        :class="emailDisabled ? 'border-outline-variant/20 opacity-50' : 'border-primary/20'">
        <div v-for="item in emailItems" :key="item.key" class="toggle-row"
          :class="emailDisabled ? 'pointer-events-none' : ''">
          <div class="flex items-center gap-3 min-w-0">
            <span class="material-symbols-outlined text-[18px] shrink-0"
              :class="emailDisabled ? 'text-on-surface-variant/40' : 'text-primary'">{{ item.icon }}</span>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <p class="text-sm font-semibold text-on-surface truncate">{{ prefs.t[item.titleKey] }}</p>
                <span v-if="!item.canDisable"
                  class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                  Required
                </span>
              </div>
              <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t[item.descKey] }}</p>
            </div>
          </div>
          <ToggleSwitch
            :model-value="item.canDisable ? prefs.notif[item.key] : true"
            :disabled="!item.canDisable || emailDisabled"
            :aria-label="prefs.t[item.titleKey]"
            @update:model-value="v => item.canDisable && (prefs.notif[item.key] = v)"
          />
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-outline-variant/15">
        <button class="text-xs font-semibold text-on-surface-variant/70 hover:text-red-500 underline underline-offset-2 transition-colors"
          @click="unsubscribeAll">{{ prefs.t.unsubAll }}</button>
        <p class="text-[10px] text-on-surface-variant/50 mt-1">
          You will still receive critical security alerts — these are required by law.
        </p>
      </div>
    </div>

    <!-- ── Browser Push Notifications ───────────────────────────────────────── -->
    <div class="mb-6">
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
        {{ prefs.t.pushNotifs }}
      </p>

      <!-- Permission card -->
      <div class="p-4 rounded-2xl border border-outline-variant/20 bg-surface-container mb-4">
        <div class="flex items-center justify-between gap-4 flex-wrap">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-primary text-[20px]">notifications_active</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-on-surface">Browser Push Alerts</p>
              <p class="text-xs mt-0.5" :class="pushStatusColor">{{ pushStatusLabel }}</p>
            </div>
          </div>
          <button v-if="pushStatus !== 'granted' && pushStatus !== 'denied'"
            class="solar-glow px-4 py-2 rounded-xl text-sm font-semibold shrink-0"
            @click="enablePush">
            Enable Push
          </button>
          <span v-else-if="pushStatus === 'denied'"
            class="text-xs text-on-surface-variant bg-surface-container-high px-3 py-2 rounded-xl">
            Enable in browser settings
          </span>
          <span v-else class="flex items-center gap-1.5 text-xs text-emerald-500 font-semibold">
            <span class="material-symbols-outlined text-[16px]">check_circle</span> Active
          </span>
        </div>
        <p class="text-xs text-on-surface-variant/70 mt-3">
          Push notifications allow real-time tariff alerts and maintenance reminders even when you're not actively browsing.
        </p>
      </div>

      <!-- Push preference toggles -->
      <div class="space-y-1.5">
        <!-- Push master -->
        <div class="toggle-row">
          <div class="flex items-center gap-3 min-w-0">
            <span class="material-symbols-outlined text-primary text-[18px] shrink-0">notifications</span>
            <div class="min-w-0">
              <p class="text-sm font-semibold text-on-surface">{{ prefs.t.pushNotifs }}</p>
              <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.pushNotifsDesc }}</p>
            </div>
          </div>
          <ToggleSwitch v-model="prefs.notif.push" :aria-label="prefs.t.pushNotifs" />
        </div>

        <!-- Price alerts -->
        <div class="toggle-row" :class="!prefs.notif.push ? 'opacity-50 pointer-events-none' : ''">
          <div class="flex items-center gap-3 min-w-0">
            <span class="material-symbols-outlined text-amber-500 text-[18px] shrink-0">price_change</span>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-on-surface">{{ prefs.t.priceAlerts }}</p>
              <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.priceAlertsDesc }}</p>
              <!-- Demo trigger -->
              <button v-if="prefs.notif.priceAlerts && prefs.notif.push"
                class="mt-1.5 text-[10px] font-semibold text-primary hover:opacity-70 transition-opacity flex items-center gap-1"
                :disabled="priceAlertCooldown"
                @click="testPriceAlert">
                <span class="material-symbols-outlined text-[12px]">send</span>
                {{ priceAlertCooldown ? 'Alert sent!' : 'Send test alert' }}
              </button>
            </div>
          </div>
          <ToggleSwitch v-model="prefs.notif.priceAlerts" :aria-label="prefs.t.priceAlerts" />
        </div>

        <!-- Maintenance tips -->
        <div class="toggle-row" :class="!prefs.notif.push ? 'opacity-50 pointer-events-none' : ''">
          <div class="flex items-center gap-3 min-w-0">
            <span class="material-symbols-outlined text-blue-500 text-[18px] shrink-0">build</span>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-on-surface">{{ prefs.t.maintenanceTips }}</p>
              <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.maintenanceTipsDesc }}</p>
              <button v-if="prefs.notif.maintenanceTips && prefs.notif.push"
                class="mt-1.5 text-[10px] font-semibold text-primary hover:opacity-70 transition-opacity flex items-center gap-1"
                :disabled="maintenanceCooldown"
                @click="testMaintenanceTip">
                <span class="material-symbols-outlined text-[12px]">send</span>
                {{ maintenanceCooldown ? 'Tip sent!' : 'Send test tip' }}
              </button>
            </div>
          </div>
          <ToggleSwitch v-model="prefs.notif.maintenanceTips" :aria-label="prefs.t.maintenanceTips" />
        </div>
      </div>

      <!-- Tariff info note -->
      <div class="mt-4 p-3 rounded-xl bg-amber-500/8 border border-amber-500/15 flex items-start gap-2">
        <span class="material-symbols-outlined text-amber-500 text-[16px] mt-0.5 shrink-0">info</span>
        <p class="text-xs text-on-surface-variant">
          <strong class="text-on-surface">Price alerts</strong> are based on Eskom's published tariff schedules and load-shedding stage changes for your configured region. Alerts are sent when off-peak rates begin or when peak pricing starts within 30 minutes.
        </p>
      </div>
    </div>
  </section>
</template>
