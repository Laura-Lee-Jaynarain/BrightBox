<script setup>

import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useLeaderboardStore } from '@/stores/leaderboard'
import { useAuthStore } from '@/stores/authStore'
import { BADGE_DEFS, earnedBadges } from '@/composables/badges'
import topbar from '@/components/TopBar.vue'
import sidebar from '@/components/SideBar.vue'

const prefs   = useUserPrefsStore()
const router  = useRouter()
const lbStore = useLeaderboardStore()
const auth    = useAuthStore()

const { leaderboard, myRank: storeMyRank, recentMonths, streak: currentStreak, streakLabel } = storeToRefs(lbStore)

// ── Leaderboard data ──────────────────────────────────────────────────────────

function rankBadge(rank) {
  //windows key + . for emojis
  if (rank === 1) return '🏆'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  if (rank <= 10) return '⚡'
  return '🌱'
}

// ── Theme integration ─────────────────────────────────────────────────────────
onMounted(() => {
  if (typeof prefs.applyViewTheme === 'function') prefs.applyViewTheme('community')
  const fetches = [lbStore.fetchLeaderboard('global', null)]
  if (auth.userId) fetches.push(lbStore.fetchUserData(auth.userId))
  Promise.all(fetches)
})
onUnmounted(() => {
  const html = document.documentElement
  ;['--view-bg','--view-border','--view-text','--view-card-bg','--view-card-border']
    .forEach(v => html.style.removeProperty(v))
})

function cardStyle(extra = {}) {
  return {
    backgroundColor: 'var(--view-card-bg, var(--color-surface-container-lowest))',
    borderColor:     'var(--view-card-border, color-mix(in srgb, var(--color-outline-variant) 60%, transparent))',
    color:           'var(--view-text, var(--color-on-surface))',
    ...extra,
  }
}
function viewBgStyle() {
  return {
    backgroundColor: 'var(--view-bg, transparent)',
    color:           'var(--view-text, var(--color-on-surface))',
    minHeight: '100%',
  }
}

// ── WhatsApp groups ────────────────────────────────────────────────────────────
// ⚙️  Replace `waLink` values with your real group invite URLs
const WHATSAPP_GROUPS = [
  {
    id: 'energy-save',
    icon: 'bolt',
    label: 'Energy Saving',
    description: 'Daily tips, off-peak schedules and smart appliance tricks',
    members: 142,
    colour: 'from-emerald-500/20 to-emerald-500/5',
    iconColour: 'text-emerald-500',
    badgeColour: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    waLink: 'https://chat.whatsapp.com/REPLACE_ENERGY_SAVING',
  },
  {
    id: 'solar-talk',
    icon: 'solar_power',
    label: 'Solar Talk',
    description: 'Inverter issues, panel brands, net metering & installer reviews',
    members: 287,
    colour: 'from-amber-500/20 to-amber-500/5',
    iconColour: 'text-amber-500',
    badgeColour: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
    waLink: 'https://chat.whatsapp.com/REPLACE_SOLAR_TALK',
  },
  {
    id: 'help',
    icon: 'support_agent',
    label: 'Help & Advice',
    description: 'Ask anything about your system, billing or the EcoSave app',
    members: 98,
    colour: 'from-blue-500/20 to-blue-500/5',
    iconColour: 'text-blue-500',
    badgeColour: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
    waLink: 'https://chat.whatsapp.com/REPLACE_HELP',
  },
  {
    id: 'announcements',
    icon: 'campaign',
    label: 'Announcements',
    description: 'Official EcoSave updates, new features and Eskom news',
    members: 512,
    colour: 'from-primary/20 to-primary/5',
    iconColour: 'text-primary',
    badgeColour: 'bg-primary/10 text-primary',
    waLink: 'https://chat.whatsapp.com/REPLACE_ANNOUNCEMENTS',
  },
  {
    id: 'trading',
    icon: 'currency_exchange',
    label: 'Energy Trading',
    description: 'Peer-to-peer surplus sharing, buy/sell kWh with neighbours',
    members: 64,
    colour: 'from-purple-500/20 to-purple-500/5',
    iconColour: 'text-purple-500',
    badgeColour: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
    waLink: 'https://chat.whatsapp.com/REPLACE_TRADING',
  },
  {
    id: 'challenges',
    icon: 'emoji_events',
    label: 'Challenges',
    description: 'Weekly green challenges, leaderboard competitions and rewards',
    members: 203,
    colour: 'from-rose-500/20 to-rose-500/5',
    iconColour: 'text-rose-500',
    badgeColour: 'bg-rose-500/10 text-rose-700 dark:text-rose-400',
    waLink: 'https://chat.whatsapp.com/REPLACE_CHALLENGES',
  },
]

function openWhatsApp(group) {
  window.open(group.waLink, '_blank', 'noopener,noreferrer')
}

// ── Community stats ────────────────────────────────────────────────────────────
const communityStats = ref({
  totalMembers: 1247,
  activeLast7d:  314,
  totalKwhSaved: 2_840_500,
  co2Offset:     1_420,
  avgRank:        42,
  challenges:      7,
})


const leaderboardPreview = computed(() =>
  leaderboard.value.slice(0, 5).map(h => ({
    rank:     h.rank,
    name:     h.userName,
    avatar:   h.profileImageUrl || '',
    kwh:      h.energyPerPerson,
    badge:    rankBadge(h.rank),
    location: String(h.postalCode),
  }))
)


const myRank = computed(() => storeMyRank.value?.rank ?? null)
const myKwh  = computed(() => storeMyRank.value?.energyPerPerson ?? null)


const myStats = { kwhSaved: 612.8, streak: 7, readings: 18, posts: 4,
                  challenges: 2, zeroPeakDays: 5, rank: 42 }

const PERKS = computed(() =>
  BADGE_DEFS.map(b => ({
    icon:     b.emoji,
    label:    b.label,
    desc:     b.desc,
    achieved: b.condition(myStats),
  }))
)

// ── Community feed ─────────────────────────────────────────────────────────────
const LS_POSTS_KEY = 'ep-community-posts'

const SEED_POSTS = [
  {
    id: 'p1', author: 'Thabo M.', avatar: '', location: 'Sandton',
    time: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    category: 'solar-talk',
    body: 'Just pushed 18 kWh back to the grid today — best day yet! The new Fronius inverter settings really made a difference. Happy to share my config if anyone needs it.',
    likes: 24, liked: false, comments: [],
  },
  {
    id: 'p2', author: 'Priya S.', avatar: '', location: 'Cape Town',
    time: new Date(Date.now() - 1000 * 60 * 47).toISOString(),
    category: 'energy-save',
    body: 'Tip: I shifted our dishwasher and geyser to run at 11 AM when solar production peaks. Cut our grid draw by ~40% on sunny days. Worth testing if you have a programmable timer!',
    likes: 41, liked: false, comments: [
      { id: 'c1', author: 'Johan V.', body: 'Game changer! Did this last month — totally agree.', time: new Date(Date.now() - 1000 * 60 * 30).toISOString() }
    ],
  },
  {
    id: 'p3', author: 'EcoSave Team', avatar: '', location: 'Official',
    time: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    category: 'announcements',
    body: '🎉 Community milestone: together we have offset 1 420 tons of CO₂ this year! Thank you to all 1 247 members. Keep pushing — our next target is 2 000 tons by year-end.',
    likes: 187, liked: false, comments: [],
  },
]

function loadPosts() {
  try {
    const stored = JSON.parse(localStorage.getItem(LS_POSTS_KEY) || 'null')
    return stored || SEED_POSTS
  } catch { return SEED_POSTS }
}
function savePosts(posts) {
  localStorage.setItem(LS_POSTS_KEY, JSON.stringify(posts))
}

const posts    = ref(loadPosts())
const feedFilter = ref('all')

const FEED_FILTERS = [
  { key: 'all',           label: 'All'           },
  { key: 'solar-talk',    label: 'Solar Talk'    },
  { key: 'energy-save',   label: 'Energy Saving' },
  { key: 'announcements', label: 'Announcements' },
  { key: 'challenges',    label: 'Challenges'    },
]

const filteredPosts = computed(() => {
  const f = feedFilter.value
  const list = f === 'all' ? posts.value : posts.value.filter(p => p.category === f)
  return [...list].sort((a, b) => new Date(b.time) - new Date(a.time))
})

function toggleLike(post) {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
  savePosts(posts.value)
}

function formatTime(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (diff < 60)   return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

// Group pill colour
function groupColour(id) {
  return WHATSAPP_GROUPS.find(g => g.id === id)?.badgeColour ?? 'bg-surface-container text-on-surface-variant'
}
function groupLabel(id) {
  return WHATSAPP_GROUPS.find(g => g.id === id)?.label ?? id
}
function groupIcon(id) {
  return WHATSAPP_GROUPS.find(g => g.id === id)?.icon ?? 'chat'
}

// ── New post composer ──────────────────────────────────────────────────────────
const composerOpen = ref(false)
const newPost = ref({ body: '', category: 'solar-talk' })
const POST_CATEGORIES = WHATSAPP_GROUPS.map(g => ({ key: g.id, label: g.label }))

function submitPost() {
  if (!newPost.value.body.trim()) return
  const post = {
    id:       'p' + Date.now(),
    author:   prefs.profile.displayName || 'You',
    avatar:   prefs.profile.avatar || '',
    location: prefs.profile.location || 'South Africa',
    time:     new Date().toISOString(),
    category: newPost.value.category,
    body:     newPost.value.body.trim(),
    likes: 0, liked: false, comments: [],
  }
  posts.value.unshift(post)
  savePosts(posts.value)
  newPost.value = { body: '', category: 'solar-talk' }
  composerOpen.value = false
}

// ── Comment composer ───────────────────────────────────────────────────────────
const openCommentPost = ref(null)
const commentText     = ref('')

function submitComment(post) {
  if (!commentText.value.trim()) return
  if (!post.comments) post.comments = []
  post.comments.push({
    id:     'c' + Date.now(),
    author: prefs.profile.displayName || 'You',
    body:   commentText.value.trim(),
    time:   new Date().toISOString(),
  })
  commentText.value = ''
  savePosts(posts.value)
}

// ── Expand/collapse post body ─────────────────────────────────────────────────
const expandedPosts = ref(new Set())
function toggleExpand(id) {
  if (expandedPosts.value.has(id)) expandedPosts.value.delete(id)
  else expandedPosts.value.add(id)
}

// ── kWh formatting ────────────────────────────────────────────────────────────
function fmtKwh(v) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + ' GWh'
  if (v >= 1_000)     return (v / 1_000).toFixed(1) + ' MWh'
  return v.toLocaleString() + ' kWh'
}

// ── Avatar placeholder ────────────────────────────────────────────────────────
function initials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}
function avatarBg(name) {
  const colours = ['bg-primary/20','bg-emerald-500/20','bg-amber-500/20','bg-purple-500/20','bg-rose-500/20','bg-blue-500/20']
  return colours[name.charCodeAt(0) % colours.length]
}
function avatarText(name) {
  const colours = ['text-primary','text-emerald-600','text-amber-600','text-purple-600','text-rose-600','text-blue-600']
  return colours[name.charCodeAt(0) % colours.length]
}
// MARKER: COMMUNITY-VIEW-SCRIPT-END
</script>

<template>
  <!-- MARKER: COMMUNITY-VIEW-TEMPLATE-START -->
  <div :style="viewBgStyle()">

    <!-- ══ 1. HERO BANNER ═══════════════════════════════════════════════════ -->
    <section class="relative rounded-2xl overflow-hidden mb-8 bg-primary"
             style="background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dim) 100%);">
      <!-- Decorative solar circles -->
      <div class="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none"></div>
      <div class="absolute -bottom-16 -left-8 w-64 h-64 rounded-full bg-white/5 pointer-events-none"></div>

      <div class="relative z-10 p-6 sm:p-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="material-symbols-outlined text-on-primary/80 text-[20px]">solar_power</span>
              <span class="text-on-primary/80 text-sm font-semibold uppercase tracking-widest">
                Solar Community Hub
              </span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-bold text-on-primary tracking-tight mb-2">
              Welcome, {{ prefs.profile.displayName || 'Solar Hero' }} 👋
            </h1>
            <p class="text-on-primary/75 text-sm sm:text-base max-w-lg">
              Connect, share knowledge and challenge your neighbours to save more energy.
              {{ communityStats.totalMembers.toLocaleString() }} members · {{ fmtKwh(communityStats.totalKwhSaved) }} saved together.
            </p>
          </div>

          <!-- User stats pill -->
          <div class="flex gap-3 flex-wrap">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-center min-w-[80px]">
              <p class="text-2xl font-black text-on-primary">{{ myRank != null ? '#' + myRank : '—' }}</p>
              <p class="text-[10px] text-on-primary/70 uppercase tracking-wider mt-0.5">My Rank</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-center min-w-[80px]">
              <p class="text-2xl font-black text-on-primary">{{ myKwh != null ? myKwh : '—' }}</p>
              <p class="text-[10px] text-on-primary/70 uppercase tracking-wider mt-0.5">My kWh</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-center min-w-[80px]">
              <p class="text-2xl font-black text-on-primary">{{ currentStreak }}🔥</p>
              <p class="text-[10px] text-on-primary/70 uppercase tracking-wider mt-0.5">Streak</p>
            </div>
          </div>
        </div>

        <!-- Stats row -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div v-for="stat in [
            { icon: 'group',      val: communityStats.totalMembers.toLocaleString(),          label: 'Members'       },
            { icon: 'eco',        val: communityStats.co2Offset.toLocaleString() + ' t',      label: 'CO₂ Offset'   },
            { icon: 'bolt',       val: fmtKwh(communityStats.totalKwhSaved),                  label: 'Energy Saved'  },
            { icon: 'emoji_events', val: communityStats.challenges + ' Active',               label: 'Challenges'    },
          ]" :key="stat.label"
          class="bg-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <span class="material-symbols-outlined text-on-primary/70 text-[18px]">{{ stat.icon }}</span>
            <div>
              <p class="text-sm font-bold text-on-primary leading-tight">{{ stat.val }}</p>
              <p class="text-[10px] text-on-primary/60">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ MAIN GRID ═══════════════════════════════════════════════════════ -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

      <!-- ── LEFT COLUMN (2/3) ──────────────────────────────────────────── -->
      <div class="xl:col-span-2 space-y-6">

        <!-- ══ 2. WHATSAPP GROUPS ══════════════════════════════════════════ -->
        <!-- MARKER: COMMUNITY-WHATSAPP-SECTION -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-bold text-on-surface flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[20px]">chat</span>
              WhatsApp Groups
            </h2>
            <span class="text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">
              {{ WHATSAPP_GROUPS.length }} groups
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <button
              v-for="group in WHATSAPP_GROUPS"
              :key="group.id"
              class="text-left rounded-2xl border p-4 hover:scale-[1.02] active:scale-[0.98]
                     transition-all group focus-visible:ring-2 focus-visible:ring-primary
                     focus-visible:outline-none"
              :style="cardStyle()"
              @click="openWhatsApp(group)"
            >
              <!-- Icon + members -->
              <div class="flex items-start justify-between mb-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center"
                     :class="`bg-gradient-to-br ${group.colour}`">
                  <span class="material-symbols-outlined text-[20px]"
                        :class="group.iconColour">{{ group.icon }}</span>
                </div>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full" :class="group.badgeColour">
                  {{ group.members }} members
                </span>
              </div>
              <!-- Label -->
              <p class="text-sm font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                {{ group.label }}
              </p>
              <p class="text-xs text-on-surface-variant leading-relaxed">{{ group.description }}</p>
              <!-- Join CTA -->
              <div class="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0
                          group-hover:opacity-100 transition-opacity">
                <span class="material-symbols-outlined text-[14px]">open_in_new</span>
                Join on WhatsApp
              </div>
            </button>
          </div>

          <!-- WhatsApp note -->
          <div class="mt-3 flex items-start gap-2 p-3 rounded-xl bg-surface-container-low border
                      border-outline-variant/20">
            <span class="material-symbols-outlined text-on-surface-variant text-[15px] mt-0.5 shrink-0">info</span>
            <p class="text-[11px] text-on-surface-variant leading-relaxed">
              Groups are moderated by the EcoSave community team. Please read the group rules pinned by the admin before posting. Links require WhatsApp to be installed on your device.
            </p>
          </div>
        </section>

        <!-- ══ 3. COMMUNITY FEED ════════════════════════════════════════════ -->
        <!-- MARKER: COMMUNITY-FEED-SECTION -->
        <section>
          <!-- Feed header + new post button -->
          <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 class="text-base font-bold text-on-surface flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[20px]">dynamic_feed</span>
              Community Feed
            </h2>
            <button
              class="solar-glow flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold
                     hover:scale-[1.02] active:scale-[0.98] transition-all"
              @click="composerOpen = !composerOpen"
            >
              <span class="material-symbols-outlined text-[17px]">add</span>
              New Post
            </button>
          </div>

          <!-- New post composer (collapsible) -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <!-- MARKER: COMMUNITY-COMPOSER -->
            <div v-if="composerOpen" class="mb-4 rounded-2xl border p-4 space-y-3" :style="cardStyle()">
              <div class="flex items-center gap-3">
                <!-- My avatar -->
                <div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                     :class="[avatarBg(prefs.profile.displayName || 'Me'), avatarText(prefs.profile.displayName || 'Me')]">
                  {{ initials(prefs.profile.displayName || 'Me') }}
                </div>
                <select
                  v-model="newPost.category"
                  class="text-xs font-semibold px-2 py-1.5 rounded-lg border border-outline-variant/40
                         bg-surface-container-low text-on-surface focus:outline-none focus:ring-2
                         focus:ring-primary/40 transition-all"
                >
                  <option v-for="cat in POST_CATEGORIES" :key="cat.key" :value="cat.key">
                    {{ cat.label }}
                  </option>
                </select>
              </div>
              <textarea
                v-model="newPost.body"
                rows="3"
                placeholder="Share a tip, question or milestone with the community…"
                class="w-full text-sm text-on-surface px-3 py-2.5 rounded-xl border border-outline-variant/40
                       bg-surface-container-low resize-none placeholder:text-on-surface-variant/50
                       focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              ></textarea>
              <div class="flex items-center justify-between gap-3">
                <span class="text-[10px] text-on-surface-variant">{{ newPost.body.length }}/500 chars</span>
                <div class="flex gap-2">
                  <button
                    class="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant
                           hover:bg-surface-container transition-colors"
                    @click="composerOpen = false; newPost.body = ''"
                  >Cancel</button>
                  <button
                    class="solar-glow px-5 py-2 rounded-xl text-xs font-semibold
                           disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                    :disabled="!newPost.body.trim()"
                    @click="submitPost"
                  >Post</button>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Category filter pills -->
          <div class="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
            <button
              v-for="filter in FEED_FILTERS"
              :key="filter.key"
              class="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all
                     min-h-[32px] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              :class="feedFilter === filter.key
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'"
              @click="feedFilter = filter.key"
            >{{ filter.label }}</button>
          </div>

          <!-- Post cards -->
          <!-- MARKER: COMMUNITY-POSTS -->
          <div class="space-y-3">
            <div
              v-for="post in filteredPosts"
              :key="post.id"
              class="rounded-2xl border p-4 transition-all"
              :style="cardStyle()"
            >
              <!-- Post header -->
              <div class="flex items-start gap-3 mb-3">
                <!-- Avatar -->
                <div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                     :class="[avatarBg(post.author), avatarText(post.author)]">
                  {{ initials(post.author) }}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <p class="text-sm font-semibold text-on-surface">{{ post.author }}</p>
                    <span class="text-[10px] text-on-surface-variant">·</span>
                    <span class="text-[10px] text-on-surface-variant">{{ formatTime(post.time) }}</span>
                    <span v-if="post.location" class="text-[10px] text-on-surface-variant flex items-center gap-0.5">
                      <span class="material-symbols-outlined text-[11px]">location_on</span>{{ post.location }}
                    </span>
                    <!-- Category badge -->
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                          :class="groupColour(post.category)">
                      <span class="material-symbols-outlined text-[11px]">{{ groupIcon(post.category) }}</span>
                      {{ groupLabel(post.category) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Post body -->
              <p class="text-sm text-on-surface leading-relaxed mb-3"
                 :class="!expandedPosts.has(post.id) && post.body.length > 200 ? 'line-clamp-3' : ''">
                {{ post.body }}
              </p>
              <button
                v-if="post.body.length > 200"
                class="text-xs text-primary font-medium mb-3 hover:opacity-70 transition-opacity"
                @click="toggleExpand(post.id)"
              >{{ expandedPosts.has(post.id) ? 'Show less' : 'Read more' }}</button>

              <!-- Actions row -->
              <div class="flex items-center gap-1 pt-2 border-t border-outline-variant/15">
                <!-- Like -->
                <button
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                         transition-all hover:bg-surface-container min-h-[36px]"
                  :class="post.liked ? 'text-primary' : 'text-on-surface-variant'"
                  @click="toggleLike(post)"
                >
                  <span class="material-symbols-outlined text-[16px]"
                        :style="post.liked ? 'font-variation-settings: FILL 1' : ''">
                    favorite
                  </span>
                  {{ post.likes }}
                </button>
                <!-- Comment -->
                <button
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                         text-on-surface-variant hover:bg-surface-container transition-all min-h-[36px]"
                  @click="openCommentPost = openCommentPost === post.id ? null : post.id"
                >
                  <span class="material-symbols-outlined text-[16px]">chat_bubble_outline</span>
                  {{ post.comments?.length || 0 }}
                </button>
                <!-- Share -->
                <button
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                         text-on-surface-variant hover:bg-surface-container transition-all min-h-[36px] ml-auto"
                >
                  <span class="material-symbols-outlined text-[16px]">share</span>
                  Share
                </button>
              </div>

              <!-- Comments thread -->
              <div v-if="post.comments?.length || openCommentPost === post.id" class="mt-3 space-y-2">
                <div
                  v-for="c in post.comments"
                  :key="c.id"
                  class="flex gap-2 bg-surface-container-low rounded-xl px-3 py-2"
                >
                  <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                       :class="[avatarBg(c.author), avatarText(c.author)]">
                    {{ initials(c.author) }}
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-semibold text-on-surface">{{ c.author }}</span>
                      <span class="text-[10px] text-on-surface-variant">{{ formatTime(c.time) }}</span>
                    </div>
                    <p class="text-xs text-on-surface-variant mt-0.5 leading-snug">{{ c.body }}</p>
                  </div>
                </div>

                <!-- Comment input -->
                <div v-if="openCommentPost === post.id" class="flex gap-2 mt-2">
                  <div class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                       :class="[avatarBg(prefs.profile.displayName || 'Me'), avatarText(prefs.profile.displayName || 'Me')]">
                    {{ initials(prefs.profile.displayName || 'Me') }}
                  </div>
                  <div class="flex-1 flex gap-2">
                    <input
                      v-model="commentText"
                      type="text"
                      placeholder="Add a comment…"
                      class="flex-1 text-xs px-3 py-2 rounded-xl border border-outline-variant/40
                             bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50
                             focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                      @keydown.enter.prevent="submitComment(post)"
                    />
                    <button
                      class="px-3 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold
                             hover:opacity-90 transition-opacity disabled:opacity-50"
                      :disabled="!commentText.trim()"
                      @click="submitComment(post)"
                    >
                      <span class="material-symbols-outlined text-[14px]">send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty state -->
            <div v-if="filteredPosts.length === 0"
                 class="text-center py-12 text-on-surface-variant rounded-2xl border" :style="cardStyle()">
              <span class="material-symbols-outlined text-[40px] block mb-2 opacity-30">forum</span>
              <p class="text-sm font-medium">No posts in this category yet</p>
              <p class="text-xs mt-1 opacity-70">Be the first to share something!</p>
            </div>
          </div>
        </section>
      </div>

      <!-- ── RIGHT COLUMN (1/3) ─────────────────────────────────────────── -->
      <div class="space-y-5">

        <!-- STREAK CARD -->
        <section class="rounded-2xl border p-5" :style="cardStyle()">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-bold text-on-surface flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[18px]">local_fire_department</span>
              Monthly Streak
            </h2>
          </div>
          <p class="text-2xl font-extrabold text-on-surface font-headline mb-1">{{ streakLabel }}</p>
          <p class="text-[11px] text-on-surface-variant mb-4 leading-relaxed">
            Stay below the community average each month to grow your streak.
          </p>
          <!-- Weekly day blocks -->
          <div class="flex gap-1.5 justify-between">
            <div v-for="month in recentMonths" :key="month.key" class="flex flex-col items-center gap-1.5 flex-1">
              <!-- Goal met -->
              <template v-if="month.goalMet">
                <div class="w-full aspect-square rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center"
                     :class="{ 'ring-2 ring-primary/30 ring-offset-1': month.isThisMonth }">
                  <span class="material-symbols-outlined text-primary text-[16px]"
                        style="font-variation-settings: 'FILL' 1;">star</span>
                </div>
                <span class="text-[9px] font-bold text-primary">{{ month.monthAbbr }}</span>
              </template>
              <!-- Goal missed -->
              <template v-else-if="month.hasData">
                <div class="w-full aspect-square rounded-xl bg-error-container/10 border border-error/20 flex items-center justify-center"
                     :class="{ 'ring-2 ring-error/30 ring-offset-1': month.isThisMonth }">
                  <span class="material-symbols-outlined text-error text-[16px]">close</span>
                </div>
                <span class="text-[9px] font-bold text-error">{{ month.monthAbbr }}</span>
              </template>
              <!-- No data yet -->
              <template v-else>
                <div class="w-full aspect-square rounded-xl bg-surface-container-high border border-transparent flex items-center justify-center">
                  <span class="material-symbols-outlined text-on-surface-variant/30 text-[16px]">pending</span>
                </div>
                <span class="text-[9px] font-bold text-on-surface-variant/40">{{ month.monthAbbr }}</span>
              </template>
            </div>
          </div>
        </section>

        <!-- ══ 4. LEADERBOARD PREVIEW ════════════════════════════════════ -->
        <!-- MARKER: COMMUNITY-LEADERBOARD -->
        <section class="rounded-2xl border p-5" :style="cardStyle()">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-sm font-bold text-on-surface flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[18px]">leaderboard</span>
              Top Members
            </h2>
            <button
              class="text-xs text-primary font-semibold hover:opacity-70 transition-opacity"
              @click="router.push('/leaderboard')"
            >View all →</button>
          </div>

          <div class="space-y-2">
            <div
              v-for="member in leaderboardPreview"
              :key="member.rank"
              class="flex items-center gap-3 p-2.5 rounded-xl transition-colors hover:bg-surface-container"
              :class="member.rank <= 3 ? 'bg-primary/4' : ''"
            >
              <!-- Rank -->
              <span class="text-lg shrink-0 w-6 text-center">{{ member.badge }}</span>
              <!-- Avatar -->
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                   :class="[avatarBg(member.name), avatarText(member.name)]">
                {{ initials(member.name) }}
              </div>
              <!-- Info -->
              <div class="min-w-0 flex-1">
                <p class="text-xs font-semibold text-on-surface truncate">{{ member.name }}</p>
                <p class="text-[10px] text-on-surface-variant">{{ member.location }}</p>
              </div>
              <!-- kWh -->
              <div class="text-right shrink-0">
                <p class="text-xs font-bold text-primary">{{ member.kwh }}</p>
                <p class="text-[10px] text-on-surface-variant">kWh</p>
              </div>
            </div>

            <!-- My rank divider -->
            <div class="border-t border-outline-variant/20 my-2 pt-3">
              <div class="flex items-center gap-3 p-2.5 rounded-xl bg-primary/8">
                <span class="text-sm shrink-0 w-6 text-center font-bold text-primary">{{ myRank != null ? '#' + myRank : '—' }}</span>
                <div class="w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <img v-if="prefs.avatarUrl" :src="prefs.avatarUrl" class="w-full h-full object-cover" :alt="prefs.profile.displayName"/>
                  <div v-else class="w-full h-full flex items-center justify-center text-xs font-bold"
                       :class="[avatarBg(prefs.profile.displayName || 'Me'), avatarText(prefs.profile.displayName || 'Me')]">
                    {{ initials(prefs.profile.displayName || 'Me') }}
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-xs font-semibold text-primary truncate">{{ prefs.profile.displayName }} (you)</p>
                  <p class="text-[10px] text-on-surface-variant">{{ prefs.profile.location || 'South Africa' }}</p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-xs font-bold text-primary">{{ myKwh ?? '—' }}</p>
                  <p class="text-[10px] text-on-surface-variant">kWh</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ══ 5. BADGES & PERKS ═══════════════════════════════════════════ -->
        <!-- MARKER: COMMUNITY-PERKS -->
        <section class="rounded-2xl border p-5" :style="cardStyle()">
          <h2 class="text-sm font-bold text-on-surface flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-[18px]">workspace_premium</span>
            Your Badges
          </h2>
          <div class="grid grid-cols-3 gap-2">
            <div
              v-for="perk in PERKS"
              :key="perk.label"
              class="flex flex-col items-center text-center p-2.5 rounded-xl border transition-all"
              :class="perk.achieved
                ? 'border-primary/20 bg-primary/5'
                : 'border-outline-variant/20 bg-surface-container-low opacity-50'"
              :title="perk.desc"
            >
              <span class="text-2xl mb-1" :class="perk.achieved ? '' : 'grayscale'">{{ perk.icon }}</span>
              <p class="text-[10px] font-semibold text-on-surface leading-tight">{{ perk.label }}</p>
              <p class="text-[9px] text-on-surface-variant mt-0.5 leading-tight">{{ perk.desc }}</p>
            </div>
          </div>
          <p class="text-[10px] text-on-surface-variant mt-3 text-center">
            {{ PERKS.filter(p => p.achieved).length }}/{{ PERKS.length }} badges earned
          </p>
        </section>

        <!-- ══ 6. ACTIVE CHALLENGE ═══════════════════════════════════════ -->
        <!-- MARKER: COMMUNITY-CHALLENGE -->
        <section class="rounded-2xl border p-5 bg-gradient-to-br from-amber-500/10 to-amber-500/5"
                 :style="{ borderColor: 'var(--view-card-border, rgba(245,158,11,0.3))' }">
          <div class="flex items-center gap-2 mb-3">
            <span class="material-symbols-outlined text-amber-500 text-[20px]">emoji_events</span>
            <h2 class="text-sm font-bold text-on-surface">Weekly Challenge</h2>
            <span class="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400">
              3d left
            </span>
          </div>
          <p class="text-sm font-semibold text-on-surface mb-1">Zero Peak-Hour Draw</p>
          <p class="text-xs text-on-surface-variant mb-3">
            Avoid drawing from the grid during peak hours (5–9 PM) for 5 consecutive days. 
            Top 10 finishers earn a Solar Hero badge.
          </p>
          <!-- Progress bar -->
          <div class="mb-2">
            <div class="flex justify-between text-[10px] text-on-surface-variant mb-1">
              <span>Your progress</span><span>3/5 days</span>
            </div>
            <div class="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div class="h-full rounded-full bg-amber-500 transition-all" style="width: 60%"/>
            </div>
          </div>
          <p class="text-[10px] text-on-surface-variant">241 members participating</p>
        </section>

        <!-- ══ 7. QUICK LINKS ════════════════════════════════════════════ -->
        <section class="rounded-2xl border p-5" :style="cardStyle()">
          <h2 class="text-sm font-bold text-on-surface mb-3 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[18px]">quick_reference</span>
            Quick Links
          </h2>
          <div class="space-y-1">
            <router-link
              v-for="link in [
                { to: '/leaderboard', icon: 'leaderboard',    label: 'Full Leaderboard'  },
                { to: '/energy-tips', icon: 'lightbulb',      label: 'Energy Tips'        },
                { to: '/upload',      icon: 'upload_file',    label: 'Upload Meter'       },
                { to: '/support',     icon: 'help',           label: 'Community Help'     },
                { to: '/settings',    icon: 'settings',       label: 'Privacy Settings'   },
              ]"
              :key="link.to"
              :to="link.to"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-on-surface-variant
                     hover:text-primary hover:bg-surface-container transition-all min-h-[44px] group"
            >
              <span class="material-symbols-outlined text-[17px] group-hover:text-primary transition-colors">
                {{ link.icon }}
              </span>
              {{ link.label }}
              <span class="material-symbols-outlined text-[13px] ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                arrow_forward
              </span>
            </router-link>
          </div>
        </section>

      </div>
    </div>
  </div>
  <!-- MARKER: COMMUNITY-VIEW-TEMPLATE-END -->
</template>

<style scoped>
/* MARKER: COMMUNITY-VIEW-STYLES */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
