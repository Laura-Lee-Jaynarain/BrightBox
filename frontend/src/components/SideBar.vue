<script setup>
import { computed } from 'vue'
import SideBarItem from './SideBarItem.vue'
import Logo from './Logo.vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { isNullOrUndef } from 'chart.js/helpers'
import { useLeaderboardStore } from '@/stores/leaderboard'

const props = defineProps({ mobileOpen: { type: Boolean, default: false } })
defineEmits(['close'])

const prefs  = useUserPrefsStore()
const auth = useAuthStore()
const router = useRouter()
const leaderboardStore = useLeaderboardStore()
const isRtl = computed(() => ['ar', 'he', 'fa', 'ur'].includes(prefs.language))

// Navigation items — only show feature-flagged routes if enabled
const navItems = computed(() =>
  [
    { key: 'dashboard', icon: 'grid_view', link: '/dashboard', always: true },
    { key: 'leaderboard', icon: 'leaderboard', link: '/leaderboard', feat: 'leaderboard' },
    { key: 'uploadMeter', icon: 'upload', link: '/upload', always: true },
    { key: 'energyTips', icon: 'lightbulb', link: '/energy-tips', feat: 'energyTips' },
    { key: 'community', icon: 'group', link: '/community', feat: 'community' },
    { key: 'settings', icon: 'settings', link: '/settings', always: true },
  ].filter((item) => item.always || prefs.features[item.feat]),
)

const sidebarTranslate = computed(() => {
  if (props.mobileOpen) return 'translate-x-0'
  return isRtl.value ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0'
})

const sidebarPosition = computed(() =>
  isRtl.value ? 'right-0 left-auto border-l' : 'left-0 right-auto border-r',
)

function logout() {
  auth.userId = null
  auth.token = null
  auth.fullName = null
  auth.email = null
  auth.postalcode = 0
  sessionStorage.removeItem('userId')
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('fullName')
  sessionStorage.removeItem('email')
  sessionStorage.removeItem('postalcode')
  router.push('/')
}
</script>

<template>
  <aside
    style="background-color: color-mix(in srgb, var(--color-surface-container-low) 97%, transparent); border-right: 1px solid var(--color-outline-variant);"
    :class="[
      'fixed top-0 h-screen w-[17rem] z-40 flex flex-col',
      'bg-surface border-outline-variant/20 transition-transform duration-300 ease-in-out',
      sidebarPosition,
      sidebarTranslate,
    ]"
    :aria-label="prefs.t.navMenu"
    role="navigation"
  >
    <!-- Logo -->
    <div class="px-5 pt-6 pb-4 hidden md:block border-b border-outline-variant/10">
      <Logo />
    </div>

    <!-- Mobile header -->
    <div
      class="md:hidden flex justify-between items-center px-5 pt-5 pb-4 border-b border-outline-variant/10"
    >
      <Logo />
      <button
        class="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
        :aria-label="prefs.t.close"
        @click="$emit('close')"
      >
        <span class="material-symbols-outlined text-[22px]">close</span>
      </button>
    </div>

    <!-- User card -->
    <div class="flex items-center gap-3 mx-4 mt-5 mb-3 p-3 rounded-2xl bg-surface-container">
      <div class="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20 shrink-0">
        <img
          :src="prefs.avatarUrl"
          :alt="prefs.profile.displayName"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="min-w-0 flex-1">
        <p class="font-semibold text-sm text-on-surface truncate leading-tight">
          {{ prefs.profile.displayName }}
        </p>
        <p v-if="prefs.features.streak" class="text-xs text-primary font-medium leading-tight">
         {{ leaderboardStore.streakLabel }} 
        </p>
      </div>
    </div>

    <!-- Nav items -->
    <nav class="flex-1 px-2 space-y-0.5 overflow-y-auto">
      <SideBarItem
        v-for="item in navItems"
        :key="item.key"
        :text="prefs.t[item.key]"
        :symbol="item.icon"
        :link="item.link"
        @click="$emit('close')"
      />
    </nav>

    <!-- Bottom actions -->
    <div class="px-4 pb-6 pt-3 mt-auto border-t border-outline-variant/10 space-y-1">
      <router-link to="/impact-report">
        <button
          class="solar-glow w-full py-2.5 px-4 rounded-xl font-semibold text-sm shadow-sm active:scale-95 transition-transform"
        >
          {{ prefs.t.viewImpactReport }}
        </button>
      </router-link>
      <a
        href="/support"
        class="flex items-center gap-2.5 py-2.5 px-3 text-sm font-medium text-on-surface-variant/70 hover:text-primary hover:bg-surface-container rounded-xl transition-colors"
      >
        <span class="material-symbols-outlined text-[18px]">help</span>
        {{ prefs.t.support }}
      </a>
      <a
        href="/login"
        class="flex items-center gap-2.5 py-2.5 px-3 text-sm font-medium text-on-surface-variant/70 hover:text-primary hover:bg-surface-container rounded-xl transition-colors"
      >
        <span class="material-symbols-outlined text-[18px]">logout</span>
        {{ prefs.t.logout }}
      </a>
    </div>
  </aside>
</template>
