<script setup>
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useRouter } from 'vue-router'
import ToggleSwitch from 'primevue/toggleswitch'

defineEmits(['saved'])
const prefs  = useUserPrefsStore()
const router = useRouter()

const featureItems = [
  {
    key: 'chatbot',
    icon: 'smart_toy',
    titleKey: 'chatbotFeature',
    descKey: 'chatbotFeatureDesc',
    route: null,
    badge: 'AI',
    badgeColor: 'bg-violet-500/10 text-violet-500',
  },
  {
    key: 'leaderboard',
    icon: 'leaderboard',
    titleKey: 'leaderboardFeature',
    descKey: 'leaderboardFeatureDesc',
    route: '/leaderboard',
    badge: 'Page',
    badgeColor: 'bg-primary/10 text-primary',
  },
  {
    key: 'energyTips',
    icon: 'lightbulb',
    titleKey: 'energyTipsFeature',
    descKey: 'energyTipsFeatureDesc',
    route: '/energy-tips',
    badge: 'Page',
    badgeColor: 'bg-primary/10 text-primary',
  },
  {
    key: 'community',
    icon: 'solar_power',
    titleKey: 'communityFeature',
    descKey: 'communityFeatureDesc',
    route: '/community',
    badge: 'Page',
    badgeColor: 'bg-primary/10 text-primary',
  },
  {
    key: 'streak',
    icon: 'local_fire_department',
    titleKey: 'streakFeature',
    descKey: 'streakFeatureDesc',
    route: null,
    badge: 'Widget',
    badgeColor: 'bg-rose-500/10 text-rose-500',
  },
]

function goToPage(route) {
  if (route && route !== '#') router.push(route)
}
</script>

<template>
  <section class="card">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-2 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">tune</span>
      {{ prefs.t.featuresTitle }}
    </h2>
    <p class="text-xs sm:text-sm text-on-surface-variant mb-5">{{ prefs.t.featuresDesc }}</p>

    <div class="space-y-2">
      <div v-for="item in featureItems" :key="item.key"
        class="toggle-row group"
        :class="!prefs.features[item.key] ? 'opacity-70' : ''">
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-opacity"
            :class="prefs.features[item.key] ? 'opacity-100' : 'opacity-40'">
            <span class="material-symbols-outlined text-primary text-[20px]">{{ item.icon }}</span>
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="text-sm font-semibold text-on-surface">{{ prefs.t[item.titleKey] }}</p>
              <span class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0"
                :class="item.badgeColor">{{ item.badge }}</span>
            </div>
            <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t[item.descKey] }}</p>
            <!-- Link to page if applicable -->
            <button v-if="item.route && item.route !== '#' && prefs.features[item.key]"
              class="mt-1 text-[10px] font-semibold text-primary hover:opacity-70 transition-opacity flex items-center gap-1"
              @click="goToPage(item.route)">
              <span class="material-symbols-outlined text-[12px]">open_in_new</span>
              Go to page
            </button>
            <span v-else-if="!prefs.features[item.key]"
              class="mt-1 text-[10px] font-medium text-on-surface-variant/50 flex items-center gap-1">
              <span class="material-symbols-outlined text-[12px]">visibility_off</span>
              Hidden from navigation and content
            </span>
          </div>
        </div>
        <ToggleSwitch v-model="prefs.features[item.key]" :aria-label="prefs.t[item.titleKey]" />
      </div>
    </div>

    <!-- Info note -->
    <div class="mt-5 flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
      <span class="material-symbols-outlined text-primary text-[16px] mt-0.5 shrink-0">info</span>
      <p class="text-xs text-on-surface-variant">
        Disabling a feature removes it from the sidebar and hides its page throughout the app. Your data is preserved — re-enable at any time to restore it instantly.
      </p>
    </div>
  </section>
</template>
