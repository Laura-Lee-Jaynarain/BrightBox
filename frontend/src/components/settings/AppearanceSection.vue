<script setup>
import { ref, watch, computed } from 'vue'
import { useUserPrefsStore, ACCENT_PALETTES } from '@/stores/userPrefs'

defineEmits(['saved'])
const prefs = useUserPrefsStore()

const themeMode    = ref(prefs.themeMode)
const accentKey    = ref(prefs.accentKey)
const fontSize     = ref(prefs.fontSize)
const highContrast = ref(prefs.highContrast)
const reduceMotion = ref(prefs.reduceMotion)
const compactMode  = ref(prefs.compactMode)

watch(themeMode,    v => prefs.setThemeMode(v))
watch(accentKey,    v => prefs.setAccent(v))
watch(fontSize,     v => prefs.setFontSize(v))
watch(highContrast, v => prefs.setHighContrast(v))
watch(reduceMotion, v => prefs.setReduceMotion(v))
watch(compactMode,  v => prefs.setCompactMode(v))

const modeOptions = [
  {
    id: 'light', labelKey: 'light', icon: 'light_mode',
    previewBg: '#f6f8fc', previewCard: '#ffffff', previewText: '#0d1117', previewAccent: '#2563eb',
    desc: 'Clean, bright interface',
  },
  {
    id: 'dark', labelKey: 'dark', icon: 'dark_mode',
    previewBg: '##121212', previewCard: '#192734', previewText: '#2C2C2C', previewAccent: '#1A1A1A',
    desc: 'Easy on the eyes at night',
  },
  {
    id: 'system', labelKey: 'system', icon: 'brightness_auto',
    previewBg: 'linear-gradient(135deg, #f6f8fc 50%, #0d111a 50%)',
    previewCard: 'linear-gradient(135deg, #fff 50%, #111827 50%)',
    previewText: '#2563eb', previewAccent: '#2563eb',
    desc: 'Follows device preference',
  },
]

const fontSizeOptions = [
  { labelKey: 'small',  value: 13, ex: '11px' },
  { labelKey: 'medium', value: 15, ex: '13px' },
  { labelKey: 'large',  value: 17, ex: '15px' },
  { labelKey: 'xlarge', value: 19, ex: '17px' },
]

// Group palettes by category
const paletteGroups = computed(() => {
  const groups = {}
  Object.entries(ACCENT_PALETTES).forEach(([key, palette]) => {
    const g = palette.group || 'Other'
    if (!groups[g]) groups[g] = []
    groups[g].push({ key, ...palette })
  })
  return groups
})

const currentPalette = computed(() => ACCENT_PALETTES[accentKey.value] || ACCENT_PALETTES.ocean)
</script>

<template>
  <section class="card card-elevated">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-1 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">palette</span>
      {{ prefs.t.appearance }}
    </h2>
    <p class="text-xs text-on-surface-variant mb-6">Customise how BrightBox looks and feels — changes apply instantly.</p>

    <!-- ── Color Mode ──────────────────────────────────────────────────────── -->
    <div class="mb-8">
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">{{ prefs.t.colorMode }}</p>
      <div class="grid grid-cols-3 gap-3">
        <button
          v-for="m in modeOptions" :key="m.id"
          class="group relative flex flex-col rounded-2xl border-2 overflow-hidden transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          :class="themeMode === m.id
            ? 'border-primary shadow-lg shadow-primary/10'
            : 'border-outline-variant/40 hover:border-primary/40'"
          :aria-pressed="String(themeMode === m.id)"
          @click="themeMode = m.id"
        >
          <!-- Mini preview -->
          <div class="h-16 sm:h-20 w-full relative overflow-hidden"
               :style="{ background: m.previewBg }">
            <!-- Fake UI elements in preview -->
            <div class="absolute top-2 left-2 right-2 h-2.5 rounded-full opacity-40"
                 :style="{ background: m.previewCard }"></div>
            <div class="absolute top-6 left-2 w-1/2 h-1.5 rounded-full opacity-30"
                 :style="{ background: m.previewText }"></div>
            <div class="absolute top-6 right-2 w-5 h-1.5 rounded-full"
                 :style="{ background: m.previewAccent }"></div>
            <div class="absolute bottom-2 left-2 right-2 h-5 rounded-xl opacity-30"
                 :style="{ background: m.previewCard }"></div>
          </div>

          <!-- Label -->
          <div class="p-2.5 text-center" :class="themeMode === m.id ? 'bg-primary/5' : ''">
            <div class="flex items-center justify-center gap-1.5 mb-0.5">
              <span class="material-symbols-outlined text-[14px]"
                    :class="themeMode === m.id ? 'text-primary' : 'text-on-surface-variant'">
                {{ m.icon }}
              </span>
              <span class="text-xs font-bold"
                    :class="themeMode === m.id ? 'text-primary' : 'text-on-surface'">
                {{ prefs.t[m.labelKey] }}
              </span>
            </div>
            <p class="text-[10px] text-on-surface-variant/70 hidden sm:block">{{ m.desc }}</p>
          </div>

          <!-- Selected checkmark -->
          <div v-if="themeMode === m.id"
               class="absolute top-1.5 right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined text-on-primary text-[12px]">check</span>
          </div>
        </button>
      </div>
    </div>

    <!-- ── Accent Color Palette ────────────────────────────────────────────── -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-3">
        <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">{{ prefs.t.accentColor }}</p>
        <!-- Current selection label -->
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full" :style="{ background: currentPalette.hex }"></span>
          <span class="text-xs font-semibold text-on-surface">{{ currentPalette.label }}</span>
        </div>
      </div>

      <!-- Grouped swatches -->
      <div class="space-y-4">
        <div v-for="(palettes, groupName) in paletteGroups" :key="groupName">
          <p class="text-[10px] text-on-surface-variant/60 font-medium mb-2 uppercase tracking-wider">{{ groupName }}</p>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="p in palettes" :key="p.key"
              class="group relative flex flex-col items-center gap-1.5 p-1.5 rounded-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              :class="accentKey === p.key ? 'bg-surface-container-high' : 'hover:bg-surface-container'"
              :aria-pressed="String(accentKey === p.key)"
              :aria-label="p.label"
              :title="p.label"
              @click="accentKey = p.key"
            >
              <!-- Multi-tone palette strip -->
              <div class="relative w-10 h-10 rounded-full shadow-sm transition-transform group-hover:scale-110"
                   :class="accentKey === p.key ? 'scale-110 ring-3 ring-offset-2 ring-offset-surface' : ''"
                   :style="{
                     background: p.hex,
                     boxShadow: accentKey === p.key ? `0 0 0 2px var(--color-surface), 0 0 0 4px ${p.hex}` : '',
                   }">
                <!-- Check -->
                <span v-if="accentKey === p.key"
                  class="absolute inset-0 flex items-center justify-center text-white">
                  <span class="material-symbols-outlined text-[16px]" style="font-variation-settings:'FILL' 1,'wght' 600">check</span>
                </span>
              </div>
              <span class="text-[9px] font-semibold text-on-surface-variant leading-tight text-center max-w-[3rem]">{{ p.label.split(' ')[0] }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Live preview chip -->
      <div class="mt-4 flex items-center gap-3 p-3 rounded-xl bg-surface-container border border-outline-variant/20">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center"
             :style="{ background: currentPalette.hex }">
          <span class="material-symbols-outlined text-white text-[16px]">bolt</span>
        </div>
        <div>
          <p class="text-xs font-bold text-on-surface">{{ currentPalette.label }}</p>
          <p class="text-[10px] text-on-surface-variant">Applied to buttons, links, badges, and interactive elements across BrightBox</p>
        </div>
      </div>
    </div>

    <!-- ── Text Size ───────────────────────────────────────────────────────── -->
    <div class="mb-8">
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">{{ prefs.t.textSize }}</p>
      <div class="grid grid-cols-4 gap-2">
        <button
          v-for="f in fontSizeOptions" :key="f.value"
          class="flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          :class="fontSize === f.value
            ? 'border-primary bg-primary/8 text-primary'
            : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/40'"
          :aria-pressed="String(fontSize === f.value)"
          @click="fontSize = f.value"
        >
          <span class="font-bold leading-none" :style="{ fontSize: f.ex }">Aa</span>
          <span class="text-[10px] font-semibold">{{ prefs.t[f.labelKey] }}</span>
        </button>
      </div>
    </div>

    <!-- ── Accessibility ───────────────────────────────────────────────────── -->
    <div>
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">{{ prefs.t.accessibility }}</p>
      <div class="space-y-2">
        <div class="toggle-row">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-on-surface-variant text-[18px]">contrast</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-on-surface">{{ prefs.t.highContrast }}</p>
              <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.highContrastDesc }}</p>
            </div>
          </div>
          <ToggleSwitch v-model="highContrast" :aria-label="prefs.t.highContrast" />
        </div>

        <div class="toggle-row">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-on-surface-variant text-[18px]">motion_photos_off</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-on-surface">{{ prefs.t.reduceMotion }}</p>
              <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.reduceMotionDesc }}</p>
            </div>
          </div>
          <ToggleSwitch v-model="reduceMotion" :aria-label="prefs.t.reduceMotion" />
        </div>

        <div class="toggle-row">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
              <span class="material-symbols-outlined text-on-surface-variant text-[18px]">density_small</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-on-surface">{{ prefs.t.compactMode }}</p>
              <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.compactModeDesc }}</p>
            </div>
          </div>
          <ToggleSwitch v-model="compactMode" :aria-label="prefs.t.compactMode" />
        </div>
      </div>
    </div>
  </section>
</template>
