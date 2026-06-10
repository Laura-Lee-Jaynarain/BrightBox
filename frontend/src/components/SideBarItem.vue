<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  text:   { type: String, required: true },
  symbol: { type: String, required: true },
  link:   { type: String, default: '/' },
})

const route  = useRoute()
const isActive = computed(() => {
  if (props.link === '#') return false
  return route.path === props.link || route.path.startsWith(props.link + '/')
})
</script>

<template>
  <router-link
    v-if="link !== '#'"
    :to="link"
    class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all
           min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    :class="isActive
      ? 'sidebar-item-active shadow-sm'
      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'"
    role="listitem"
  >
    <span
      class="material-symbols-outlined text-[20px] shrink-0 transition-all"
      :style="isActive ? 'font-variation-settings:\'FILL\' 1,\'wght\' 500' : ''"
    >{{ symbol }}</span>

    <span class="truncate">{{ text }}</span>

    <span
      v-if="isActive"
      class="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0"
    ></span>
  </router-link>

  <span
    v-else
    class="flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm
           text-on-surface-variant/50 cursor-not-allowed opacity-60 min-h-[44px]"
    role="listitem"
    :aria-label="`${text} (coming soon)`"
  >
    <span class="material-symbols-outlined text-[20px] shrink-0">
      {{ symbol }}
    </span>

    <span class="truncate">{{ text }}</span>

    <span
      class="ml-auto text-[9px] font-black uppercase tracking-wider
             bg-surface-container px-1.5 py-0.5 rounded-full
             text-on-surface-variant/60"
    >
      Soon
    </span>
  </span>
</template>