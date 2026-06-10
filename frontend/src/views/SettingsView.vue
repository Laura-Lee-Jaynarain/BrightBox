<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserPrefsStore } from '@/stores/userPrefs'

import ProfileSection      from '@/components/settings/ProfileSection.vue'
import AppearanceSection   from '@/components/settings/AppearanceSection.vue'
import NotificationsSection from '@/components/settings/NotificationsSection.vue'
import PrivacySection      from '@/components/settings/PrivacySection.vue'
import SecuritySection     from '@/components/settings/SecuritySection.vue'
import FeaturesSection     from '@/components/settings/FeaturesSection.vue'
import RegionSection       from '@/components/settings/RegionSection.vue'
import EnergySection       from '@/components/settings/EnergySection.vue'
import DangerSection       from '@/components/settings/DangerSection.vue'

const prefs  = useUserPrefsStore()
const route  = useRoute()
const router = useRouter()

const tabs = [
  { id: 'profile',       label: 'Profile',          icon: 'person',        component: ProfileSection      },
  { id: 'appearance',    label: 'Appearance',        icon: 'palette',       component: AppearanceSection   },
  { id: 'notifications', label: 'Notifications',     icon: 'notifications', component: NotificationsSection },
  { id: 'privacy',       label: 'Privacy & Data',    icon: 'shield',        component: PrivacySection      },
  { id: 'security',      label: 'Security',          icon: 'lock',          component: SecuritySection     },
  { id: 'features',      label: 'App Features',      icon: 'tune',          component: FeaturesSection     },
  { id: 'region',        label: 'Language & Region', icon: 'language',      component: RegionSection       },
  { id: 'energy',        label: 'Energy',            icon: 'bolt',          component: EnergySection       },
  { id: 'danger',        label: 'Danger Zone',       icon: 'warning',       component: DangerSection       },
]

// Support deep-linking via hash: /settings#sec-notifications
const activeTab = ref('profile')
watch(() => route.hash, h => {
  const map = { '#sec-notifications': 'notifications', '#sec-privacy': 'privacy', '#sec-security': 'security' }
  if (map[h]) activeTab.value = map[h]
}, { immediate: true })

function setTab(id) {
  activeTab.value = id
  router.replace({ hash: '' })
  // Smooth scroll to top of content on mobile
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const activeComponent = computed(() => tabs.find(t => t.id === activeTab.value)?.component)
const activeLabel     = computed(() => tabs.find(t => t.id === activeTab.value)?.label)
</script>

<template>
  <div class="min-h-[calc(100vh-5rem)]">
    <!-- Page header -->
    <div class="mb-6">
      <h1 class="font-display text-3xl sm:text-4xl font-normal text-on-surface leading-tight">
        {{ prefs.t.settingsTitle }}
      </h1>
      <p class="text-sm text-on-surface-variant mt-1">{{ prefs.t.settingsSubtitle }}</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
      <!-- ── Sidebar nav (desktop) / horizontal scroll (tablet) ─────────── -->
      <nav
        class="lg:w-[13rem] xl:w-[14rem] shrink-0"
        aria-label="Settings sections"
      >
        <!-- Desktop: vertical list -->
        <div class="hidden lg:flex flex-col gap-0.5 sticky top-20">
          <button
            v-for="tab in tabs" :key="tab.id"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left
                   transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full"
            :class="activeTab === tab.id
              ? 'bg-primary/10 text-primary shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'"
            :aria-current="activeTab === tab.id ? 'page' : undefined"
            @click="setTab(tab.id)"
          >
            <span class="material-symbols-outlined text-[18px] shrink-0"
                  :style="activeTab === tab.id ? 'font-variation-settings:\'FILL\' 1' : ''">
              {{ tab.icon }}
            </span>
            <span class="flex-1">{{ tab.label }}</span>
            <span v-if="activeTab === tab.id" class="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
          </button>
        </div>

        <!-- Mobile/tablet: horizontal pill scroll -->
        <div class="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div class="flex gap-2 pb-2 min-w-max">
            <button
              v-for="tab in tabs" :key="tab.id"
              class="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold
                     whitespace-nowrap transition-all min-h-[44px] focus-visible:outline-none
                     focus-visible:ring-2 focus-visible:ring-primary border-2"
              :class="activeTab === tab.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/30 bg-surface-container-lowest'"
              @click="setTab(tab.id)"
            >
              <span class="material-symbols-outlined text-[16px]"
                    :style="activeTab === tab.id ? 'font-variation-settings:\'FILL\' 1' : ''">
                {{ tab.icon }}
              </span>
              {{ tab.label }}
            </button>
          </div>
        </div>
      </nav>

      <!-- ── Content area ─────────────────────────────────────────────────── -->
      <div class="flex-1 min-w-0">
        <!-- Breadcrumb (mobile) -->
        <div class="lg:hidden mb-4">
          <div class="flex items-center gap-2 text-sm text-on-surface-variant">
            <span class="font-semibold">Settings</span>
            <span class="material-symbols-outlined text-[14px]">chevron_right</span>
            <span class="font-bold text-primary">{{ activeLabel }}</span>
          </div>
        </div>

        <!-- Section component with transition -->
        <Transition name="section-fade" mode="out-in">
          <component :is="activeComponent" :key="activeTab" @saved="() => {}" />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-fade-enter-active { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
.section-fade-leave-active { transition: all 0.12s cubic-bezier(0.4, 0, 1, 1); }
.section-fade-enter-from   { opacity: 0; transform: translateY(6px); }
.section-fade-leave-to     { opacity: 0; transform: translateY(-4px); }
</style>
