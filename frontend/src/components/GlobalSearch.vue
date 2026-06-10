<script setup>

import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore, TYPE_META } from '@/stores/search'
import { useUserPrefsStore } from '@/stores/userPrefs'

const router = useRouter()
const search = useSearchStore()
const prefs  = useUserPrefsStore()

const inputRef    = ref(null)
const panelRef    = ref(null)
const activeIndex = ref(-1)

// Flat ordered list of visible results for keyboard navigation
const flatResults = computed(() => {
  if (search.query.trim().length > 0) return search.results
  return search.recentSearches.length > 0 ? search.recentSearches : []
})

// ── Input handlers ────────────────────────────────────────────────────────────
function onInput(e) {
  search.search(e.target.value)
  activeIndex.value = -1
}

function onFocus() {
  search.focused = true
  search.open = search.query.trim().length > 0 || search.recentSearches.length > 0
}

function onBlur() {
  setTimeout(() => {
    if (!panelRef.value?.contains(document.activeElement)) {
      search.open = false
      search.focused = false
    }
  }, 180)
}

// ── Keyboard navigation ───────────────────────────────────────────────────────
function onKeydown(e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, flatResults.value.length - 1)
    scrollActive()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
    scrollActive()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const rec = flatResults.value[activeIndex.value] ?? flatResults.value[0]
    if (rec) navigate(rec)
  } else if (e.key === 'Escape') {
    search.clear()
    inputRef.value?.blur()
  }
}

function scrollActive() {
  nextTick(() => {
    panelRef.value?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  })
}

// ── Navigation ────────────────────────────────────────────────────────────────
function navigate(record) {
  const rec = search.pick(record)
  if (rec.action === 'dark-mode')  { prefs.setDarkMode(true);  return }
  if (rec.action === 'light-mode') { prefs.setDarkMode(false); return }
  if (rec.route) {
    if (rec.hash) router.push({ path: rec.route, hash: rec.hash })
    else          router.push(rec.route)
  }
}

// ── Global keyboard shortcut / or Ctrl+K ─────────────────────────────────────
function handleGlobalKey(e) {
  const tag = document.activeElement?.tagName
  if (
    (e.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(tag)) ||
    ((e.ctrlKey || e.metaKey) && e.key === 'k')
  ) {
    e.preventDefault()
    inputRef.value?.focus()
  }
}

// ── Click outside ──────────────────────────────────────────────────────────────
function handleClickOutside(e) {
  if (!e.target.closest('#global-search-root')) search.clear()
}

onMounted(() => {
  document.addEventListener('keydown', handleGlobalKey)
  document.addEventListener('click', handleClickOutside, true)
})
onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKey)
  document.removeEventListener('click', handleClickOutside, true)
})

watch(() => search.results.length, () => { activeIndex.value = -1 })

// Panel visibility helpers
const showRecent  = computed(() => search.query.trim().length === 0 && search.recentSearches.length > 0 && search.open)
const showResults = computed(() => search.query.trim().length > 0 && search.open && search.results.length > 0)
const showEmpty   = computed(() => search.query.trim().length > 0 && search.open && search.results.length === 0)
const showHints   = computed(() => search.open && search.query.trim().length === 0 && search.recentSearches.length === 0)

const GROUP_ORDER   = ['action', 'page', 'setting', 'tip', 'help']
const orderedGroups = computed(() => GROUP_ORDER.filter(t => search.groupedResults[t]?.length > 0))
// MARKER: GLOBAL-SEARCH-SCRIPT-END
</script>

<template>
  <!-- MARKER: GLOBAL-SEARCH-TEMPLATE-START -->
  <div id="global-search-root" class="relative flex-1 max-w-sm mx-4 hidden sm:block">

    <!-- ── Search input ─────────────────────────────────────────────────── -->
    <div class="relative">
      <span
        class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2
               text-[18px] pointer-events-none transition-colors duration-150
               flex items-center leading-none"
        style="line-height:0; transform:translateY(-50%)"
        :class="search.open ? 'text-primary' : 'text-on-surface-variant'"
        aria-hidden="true"
      >search</span>

      <input
        ref="inputRef"
        :value="search.query"
        class="w-full bg-surface-container border rounded-xl py-2 pl-9 pr-10
               text-sm text-on-surface placeholder:text-on-surface-variant/50
               outline-none transition-all duration-150"
        :class="search.open
          ? 'border-primary/50 ring-2 ring-primary/20'
          : 'border-outline-variant/30 hover:border-outline-variant/60'"
        :placeholder="prefs.t.search || 'Search…'"
        type="search"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        role="combobox"
        aria-label="Global search"
        aria-haspopup="listbox"
        :aria-expanded="search.open"
        :aria-activedescendant="activeIndex >= 0 ? `sr-${flatResults[activeIndex]?.id}` : undefined"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      />

      <!-- Clear button / keyboard hint -->
      <div class="absolute right-2.5 flex items-center gap-1" style="top:50%; transform:translateY(-50%); line-height:0">
        <button
          v-if="search.query.length > 0"
          class="w-5 h-5 rounded-full bg-outline-variant/30 flex items-center justify-center
                 hover:bg-outline-variant/60 transition-colors"
          aria-label="Clear search"
          @mousedown.prevent="search.clear(); inputRef?.focus()"
        >
          <span class="material-symbols-outlined text-[12px] text-on-surface-variant">close</span>
        </button>
        <kbd
          v-else
          class="hidden md:flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono
                 font-semibold text-on-surface-variant/40 border border-outline-variant/25
                 bg-surface-container-high leading-none select-none"
        >/</kbd>
      </div>
    </div>

    <!-- ── Results / Recent panel ───────────────────────────────────────── -->
    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 scale-[0.98] -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-[0.98] -translate-y-1"
    >
      <div
        v-if="search.open"
        ref="panelRef"
        class="absolute top-full left-0 right-0 mt-2 w-[420px] max-w-[calc(100vw-2rem)]
               rounded-2xl border border-outline-variant/20 shadow-2xl overflow-hidden
               z-[300] max-h-[72vh] overflow-y-auto bg-surface-container-lowest"
        role="listbox"
        aria-label="Search results"
      >

        <!-- ══ RECENT SEARCHES ══════════════════════════════════════════ -->
        <div v-if="showRecent">
          <div class="flex items-center justify-between px-4 pt-3 pb-1">
            <p class="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant/60">
              Recent
            </p>
            <button
              class="text-[10px] text-on-surface-variant/50 hover:text-red-500 transition-colors"
              @mousedown.prevent="search.clearRecent()"
            >Clear</button>
          </div>
          <div class="pb-2">
            <button
              v-for="(rec, i) in search.recentSearches"
              :id="`sr-${rec.id}`"
              :key="rec.id"
              role="option"
              :aria-selected="activeIndex === i"
              :data-active="activeIndex === i"
              class="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
              :class="activeIndex === i ? 'bg-primary/6' : 'hover:bg-surface-container'"
              @mousedown.prevent="navigate(rec)"
              @mousemove="activeIndex = i"
            >
              <span class="material-symbols-outlined text-[15px] text-on-surface-variant/50 shrink-0">
                history
              </span>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-on-surface truncate">{{ rec.title }}</p>
              </div>
              <span
                class="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full shrink-0"
                :class="TYPE_META[rec.type]?.colour ?? 'text-on-surface-variant bg-surface-container'"
              >{{ TYPE_META[rec.type]?.label ?? rec.type }}</span>
            </button>
          </div>
        </div>

        <!-- ══ SEARCH RESULTS ═══════════════════════════════════════════ -->
        <div v-if="showResults">
          <template v-for="type in orderedGroups" :key="type">
            <!-- Group label -->
            <div class="flex items-center gap-2 px-4 pt-3 pb-1">
              <p
                class="text-[10px] font-semibold uppercase tracking-widest"
                :class="TYPE_META[type]?.colour?.split(' ')[0] ?? 'text-on-surface-variant/60'"
              >{{ TYPE_META[type]?.label ?? type }}</p>
              <div class="flex-1 h-px bg-outline-variant/15" />
            </div>

            <!-- Result rows -->
            <div class="pb-1">
              <button
                v-for="rec in search.groupedResults[type]"
                :id="`sr-${rec.id}`"
                :key="rec.id"
                role="option"
                :data-active="flatResults.indexOf(rec) === activeIndex"
                class="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                :class="flatResults.indexOf(rec) === activeIndex
                  ? 'bg-primary/8'
                  : 'hover:bg-surface-container'"
                @mousedown.prevent="navigate(rec)"
                @mousemove="activeIndex = flatResults.indexOf(rec)"
              >
                <!-- Icon bubble -->
                <div
                  class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                  :class="flatResults.indexOf(rec) === activeIndex
                    ? 'bg-primary/15'
                    : 'bg-surface-container'"
                >
                  <span
                    class="material-symbols-outlined text-[16px]"
                    :class="flatResults.indexOf(rec) === activeIndex
                      ? 'text-primary'
                      : 'text-on-surface-variant'"
                  >{{ rec.icon }}</span>
                </div>

                <!-- Labels -->
                <div class="min-w-0 flex-1">
                  <p
                    class="text-sm font-semibold truncate"
                    :class="flatResults.indexOf(rec) === activeIndex ? 'text-primary' : 'text-on-surface'"
                  >{{ rec.title }}</p>
                  <p class="text-xs text-on-surface-variant truncate mt-0.5 leading-snug">
                    {{ rec.description }}
                  </p>
                </div>

                <!-- Destination hint -->
                <div class="flex flex-col items-end gap-0.5 shrink-0 min-w-0">
                  <span class="material-symbols-outlined text-[14px] text-on-surface-variant/35">
                    {{ rec.action ? 'bolt' : rec.hash ? 'link' : 'arrow_forward' }}
                  </span>
                  <span
                    v-if="rec.route && !rec.action"
                    class="text-[9px] text-on-surface-variant/40 font-mono truncate max-w-[80px]"
                  >{{ rec.hash ? rec.hash.replace('#sec-','') : rec.route.replace('/','') }}</span>
                </div>
              </button>
            </div>
          </template>

          <!-- Footer -->
          <div class="px-4 py-2.5 border-t border-outline-variant/10 flex items-center justify-between
                      bg-surface-container-low/60">
            <p class="text-[10px] text-on-surface-variant/50">
              {{ search.results.length }} result{{ search.results.length === 1 ? '' : 's' }}
            </p>
            <p class="text-[10px] text-on-surface-variant/35 hidden md:block">
              ↑↓ navigate · Enter select · Esc close
            </p>
          </div>
        </div>

        <!-- ══ NO RESULTS ════════════════════════════════════════════════ -->
        <div v-if="showEmpty" class="px-4 py-8 text-center">
          <span class="material-symbols-outlined text-[40px] text-on-surface-variant/25 block mb-3">
            search_off
          </span>
          <p class="text-sm font-semibold text-on-surface">
            No results for "<span class="text-primary">{{ search.query }}</span>"
          </p>
          <p class="text-xs text-on-surface-variant mt-1 mb-5">Try a different word or browse a section.</p>
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              v-for="sug in [
                { title: 'Dashboard',    route: '/dashboard',   icon: 'grid_view'  },
                { title: 'Energy Tips',  route: '/energy-tips', icon: 'lightbulb'  },
                { title: 'Settings',     route: '/settings',    icon: 'settings'   },
                { title: 'Support',      route: '/support',     icon: 'help'       },
              ]"
              :key="sug.route"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold
                     bg-primary/8 text-primary hover:bg-primary/15 transition-colors"
              @mousedown.prevent="navigate(sug)"
            >
              <span class="material-symbols-outlined text-[13px]">{{ sug.icon }}</span>
              {{ sug.title }}
            </button>
          </div>
        </div>

        <!-- ══ EMPTY — focused, no query, no recents ══════════════════════ -->
        <div v-if="showHints" class="px-4 py-5">
          <p class="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant/55 mb-3">
            Try searching for
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="s in ['dark mode', 'meter reading', 'solar tips', 'notifications', 'password', 'export data']"
              :key="s"
              class="px-3 py-1.5 rounded-xl text-xs font-medium border border-outline-variant/30
                     text-on-surface-variant hover:border-primary/40 hover:text-primary
                     hover:bg-primary/5 transition-all"
              @mousedown.prevent="search.search(s); $nextTick(() => inputRef?.focus())"
            >{{ s }}</button>
          </div>
        </div>

      </div>
    </Transition>
  </div>
  <!-- MARKER: GLOBAL-SEARCH-TEMPLATE-END -->
</template>
