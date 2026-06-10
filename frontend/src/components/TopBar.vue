<script setup>

import Logo         from './Logo.vue'
import GlobalSearch from './GlobalSearch.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useNotificationStore } from '@/stores/notifications'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
const auth = useAuthStore()

const prefs  = useUserPrefsStore()
const notifs = useNotificationStore()
const router = useRouter()
defineEmits(['toggle-sidebar'])

// ── Notification dropdown ─────────────────────────────────────────────────────
async function GetNotifs() {
  const userID = auth.userId
  try {
    await axios({
      method: "get",
      url: 'https://localhost:7126/api/Notification/of/'+userID
    })
    .then(function (response) {
      notifs.items = response.data
    })
    .catch(function (error) {
      console.log(error)
    })
  } catch (error) {
    console.log(error)
  }
}


onMounted(() => {
  GetNotifs().then(() => console.log("notifs fetched")).then(() => console.log(notifs.items))
})


const notifOpen   = ref(false)
const notifBtn    = ref(null)
const notifPanel  = ref(null)
const searchQuery = ref('')

function toggleNotif() { notifOpen.value = !notifOpen.value }
function handleOutside(e) {
  if (notifOpen.value && notifPanel.value && !notifPanel.value.contains(e.target) && !notifBtn.value?.contains(e.target))
    notifOpen.value = false
}


const unreadCount = computed(() => notifs.unreadCount)

// avatarUrl is a computed in the store — reactively updates when setAvatar() is called
const avatar = computed(() => prefs.avatarUrl)

const notifIconMap = {
  price: 'price_change', maintenance: 'build', system: 'notifications',
  info: 'info', success: 'check_circle', warning: 'warning', alert: 'error',
}
const notifColorMap = {
  price: 'text-amber-500', maintenance: 'text-blue-500', system: 'text-primary',
  info: 'text-primary', success: 'text-emerald-500', warning: 'text-amber-500', alert: 'text-red-500',
}
const notifBgMap = {
  price: 'bg-amber-500/10', maintenance: 'bg-blue-500/10', system: 'bg-primary/10',
  info: 'bg-primary/10', success: 'bg-emerald-500/10', warning: 'bg-amber-500/10', alert: 'bg-red-500/10',
}

function timeAgo(ms) {
    console.log(ms)
    if (!(ms instanceof Date)) {
      ms = new Date(ms)
      console.log(ms)
    }
    const s = Math.floor((Date.now() - ms) / 1000)
    if (s < 60) return 'Just now'
    if (s < 3600) return `${Math.floor(s/60)}m ago`
    if (s < 86400) return `${Math.floor(s/3600)}h ago`
    return `${Math.floor(s/86400)}d ago`
  }



onMounted(() => document.addEventListener('mousedown', handleOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleOutside))
// MARKER: TOPBAR-END

</script>

<template>
  <!-- MARKER: TOPBAR-TEMPLATE-START -->
  <header
    class="sticky top-0 z-50 flex items-center justify-between
           px-4 sm:px-6 h-16 min-h-[64px] shrink-0
           border-b border-outline-variant/20"
    style="background-color: color-mix(in srgb, var(--color-background) 88%, transparent);
           backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);"
    role="banner"
  >
    <!-- Left: hamburger + logo (mobile) -->
    <div class="flex items-center gap-2">
      <button
        class="md:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high
               transition-colors btn-icon"
        :aria-label="prefs.t.navMenu"
        @click="$emit('toggle-sidebar')"
      >
        <span class="material-symbols-outlined text-[22px]">menu</span>
      </button>
      <div class="md:hidden"><Logo /></div>
    </div>

    <!-- ★ Centre: GlobalSearch replaces the dead input -->
    <GlobalSearch />

    <!-- Right: actions -->
    <div class="flex items-center gap-1 sm:gap-2">

      <!-- Dark / light toggle -->
      <button
        class="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high
               transition-colors btn-icon"
        :aria-label="prefs.isDark ? prefs.t.light : prefs.t.dark"
        :title="prefs.isDark ? prefs.t.light : prefs.t.dark"
        @click="prefs.toggleTheme()"
      >
        <span class="material-symbols-outlined text-[22px]">
          {{ prefs.isDark ? 'light_mode' : 'dark_mode' }}
        </span>
      </button>

      <!-- Upload shortcut -->
      <router-link
        to="/upload"
        class="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high
               transition-colors btn-icon"
        :aria-label="prefs.t.uploadMeter"
        :title="prefs.t.uploadMeter"
      >
        <span class="material-symbols-outlined text-[22px]">upload</span>
      </router-link>

      <!-- Notification bell + dropdown -->
      <div id="notif-dropdown-root" class="relative">
        <button
          class="relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high
                 transition-colors btn-icon"
          :aria-label="prefs.t.notifications"
          :aria-expanded="String(notifOpen)"
          aria-haspopup="true"
          @click.stop="toggleNotif"
        >
          <span class="material-symbols-outlined text-[22px]">notifications</span>
          <span
            v-if="unreadCount > 0"
            class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-surface"
            aria-hidden="true"
          />
        </button>

        <Transition name="notif-panel">
          <div
            v-if="notifOpen"
            ref="notifPanel"
            class="notif-panel absolute right-0 top-[calc(100%+8px)] w-80 sm:w-96 rounded-2xl overflow-hidden z-[200]"
            role="dialog"
            aria-label="Notifications"
          >
            <!-- Header -->
            <div class="flex items-center justify-between px-4 py-3 border-b border-outline-variant/20">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-[18px]">notifications</span>
                <span class="font-bold text-sm text-on-surface">{{ prefs.t.notifications }}</span>
                <span v-if="unreadCount > 0"
                  class="text-[10px] font-black bg-primary text-on-primary rounded-full px-1.5 py-0.5 leading-none">
                  {{ unreadCount }}
                </span>
              </div>
              <button v-if="unreadCount > 0"
                class="text-[11px] font-bold text-primary hover:opacity-70 transition-opacity"
                @click="notifs.markAllRead()">
                Mark all read
              </button>
            </div>

            <!-- List -->
            <div class="max-h-[340px] overflow-y-auto">
              <div v-if="notifs.items.length === 0"
                class="flex flex-col items-center justify-center py-12 gap-2">
                <span class="material-symbols-outlined text-on-surface-variant/30 text-[44px]">notifications_off</span>
                <p class="text-sm text-on-surface-variant/50 font-medium">No notifications</p>
              </div>

              <div v-for="n in notifs.items" :key="n.id"
                class="group flex items-start gap-3 px-4 py-3.5 border-b border-outline-variant/10
                       hover:bg-surface-container cursor-pointer transition-colors"
                :class="!n.read ? 'bg-primary/[0.025]' : ''"
                @click="notifs.markRead(n.id)"
              >
                <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                     :class="notifBgMap[n.type] || 'bg-primary/10'">
                  <span class="material-symbols-outlined text-[15px]"
                        :class="notifColorMap[n.type] || 'text-primary'">
                    {{ notifIconMap[n.type] || 'notifications' }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <p class="text-[13px] font-bold text-on-surface leading-snug">{{ n.title }}</p>
                    <div class="flex items-center gap-1 shrink-0">
                      <span v-if="!n.read" class="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                      <button
                        class="opacity-0 group-hover:opacity-100 p-0.5 rounded-lg text-on-surface-variant/50 hover:text-on-surface hover:bg-surface-container-high transition-all"
                        @click.stop="notifs.remove(n.id)"
                        aria-label="Dismiss"
                      >
                        <span class="material-symbols-outlined text-[13px]">close</span>
                      </button>
                    </div>
                  </div>
                  <p class="text-xs text-on-surface-variant mt-0.5 line-clamp-2 leading-relaxed">{{ n.body }}</p>
                  <p class="text-[10px] text-on-surface-variant/50 mt-1 font-medium">{{ timeAgo(n.date) }}</p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-4 py-2.5 border-t border-outline-variant/15">
              <router-link
                to="/settings"
                class="text-[11px] font-bold text-primary hover:opacity-70 transition-opacity"
                @click="notifOpen = false"
              >
                Manage notification preferences →
              </router-link>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Avatar / settings -->
      <router-link
        to="/settings"
        class="flex items-center gap-2 rounded-xl p-1 hover:bg-surface-container-high
               transition-colors focus-visible:ring-2 focus-visible:ring-primary
               focus-visible:outline-none ml-1"
        :aria-label="prefs.t.settings"
      >
        <div class="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primary/25 shrink-0">
          <img :src="prefs.avatarUrl" :alt="prefs.profile.displayName" class="w-full h-full object-cover" />
        </div>
        <span class="hidden lg:block text-sm font-medium text-on-surface truncate max-w-[120px]">
          {{ prefs.profile.displayName }}
        </span>
      </router-link>
    </div>
  </header>
  <!-- MARKER: TOPBAR-TEMPLATE-END -->
</template>