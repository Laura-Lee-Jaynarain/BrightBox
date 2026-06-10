<script setup>
import { ref, watch } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

defineEmits(['saved'])
const prefs = useUserPrefsStore()

const language   = ref(prefs.language)
const timezone   = ref(prefs.timezone)
const currency   = ref(prefs.currency)
const unitSystem = ref(prefs.unitSystem)

watch(language,   v => prefs.setLanguage(v))
watch(timezone,   v => prefs.setTimezone(v))
watch(currency,   v => prefs.setCurrency(v))
watch(unitSystem, v => prefs.setUnitSystem(v))

const languages = [
  { value: 'en', label: 'English',    flag: '🇬🇧', dir: 'ltr' },
  { value: 'af', label: 'Afrikaans',  flag: '🇿🇦', dir: 'ltr' },
  { value: 'fr', label: 'Français',   flag: '🇫🇷', dir: 'ltr' },
  { value: 'de', label: 'Deutsch',    flag: '🇩🇪', dir: 'ltr' },
  { value: 'es', label: 'Español',    flag: '🇪🇸', dir: 'ltr' },
  { value: 'ar', label: 'العربية',    flag: '🇸🇦', dir: 'rtl' },
]

const timezones = [
  { value: 'Africa/Johannesburg', label: 'SAST (UTC+2) — Johannesburg' },
  { value: 'Africa/Cairo',        label: 'EET  (UTC+2) — Cairo'        },
  { value: 'Africa/Lagos',        label: 'WAT  (UTC+1) — Lagos'        },
  { value: 'Europe/London',       label: 'GMT  (UTC+0) — London'       },
  { value: 'Europe/Paris',        label: 'CET  (UTC+1) — Paris'        },
  { value: 'America/New_York',    label: 'EST  (UTC−5) — New York'     },
  { value: 'America/Los_Angeles', label: 'PST  (UTC−8) — Los Angeles'  },
  { value: 'Asia/Dubai',          label: 'GST  (UTC+4) — Dubai'        },
  { value: 'Asia/Tokyo',          label: 'JST  (UTC+9) — Tokyo'        },
  { value: 'Australia/Sydney',    label: 'AEST (UTC+10) — Sydney'      },
]

const currencies = [
  { value: 'ZAR', label: 'ZAR — South African Rand' },
  { value: 'USD', label: 'USD — US Dollar'           },
  { value: 'EUR', label: 'EUR — Euro'                },
  { value: 'GBP', label: 'GBP — British Pound'      },
  { value: 'NGN', label: 'NGN — Nigerian Naira'      },
  { value: 'KES', label: 'KES — Kenyan Shilling'     },
  { value: 'AED', label: 'AED — UAE Dirham'          },
]

const isRtlSelected = ref(['ar', 'he', 'fa', 'ur'].includes(language.value))
watch(language, v => { isRtlSelected.value = ['ar', 'he', 'fa', 'ur'].includes(v) })
</script>

<template>
  <section class="card">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-2 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">language</span>
      {{ prefs.t.languageRegion }}
    </h2>
    <p class="text-xs sm:text-sm text-on-surface-variant mb-5">{{ prefs.t.regionNote }}</p>

    <!-- Language grid -->
    <div class="mb-6">
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
        {{ prefs.t.language }}
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button
          v-for="l in languages" :key="l.value"
          class="flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs sm:text-sm
                 transition-all text-left min-h-[44px] font-medium
                 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          :class="language === l.value
            ? 'border-primary bg-primary/8 text-primary'
            : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/30'"
          :lang="l.value"
          :aria-pressed="String(language === l.value)"
          @click="language = l.value"
        >
          <span class="text-sm leading-none shrink-0">{{ l.flag }}</span>
          <span class="truncate">{{ l.label }}</span>
          <span v-if="l.dir === 'rtl'" class="text-[9px] font-bold opacity-50 ml-auto shrink-0">RTL</span>
          <span v-if="language === l.value" class="material-symbols-outlined text-[13px] ml-auto shrink-0">check</span>
        </button>
      </div>

      <!-- Live language feedback -->
      <div class="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-primary bg-primary/6 px-3 py-2.5 rounded-xl border border-primary/10">
        <span class="material-symbols-outlined text-[14px]">translate</span>
        <span>{{ prefs.t.languageLive }}</span>
        <strong>{{ languages.find(l => l.value === language)?.label }}</strong>
        <span v-if="isRtlSelected" class="opacity-60">{{ prefs.t.rtlActive }}</span>
      </div>
    </div>

    <!-- Timezone + Currency + Unit system -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div class="space-y-1.5">
        <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block"
               for="tz">{{ prefs.t.timeZone }}</label>
        <select id="tz" v-model="timezone"
          class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-2.5
                 text-sm text-on-surface focus:ring-2 focus:ring-primary/40 min-h-[44px]">
          <option v-for="tz in timezones" :key="tz.value" :value="tz.value">{{ tz.label }}</option>
        </select>
      </div>

      <div class="space-y-1.5">
        <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block"
               for="curr">{{ prefs.t.currency }}</label>
        <select id="curr" v-model="currency"
          class="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-2.5
                 text-sm text-on-surface focus:ring-2 focus:ring-primary/40 min-h-[44px]">
          <option v-for="c in currencies" :key="c.value" :value="c.value">{{ c.label }}</option>
        </select>
      </div>

      <div class="sm:col-span-2 space-y-1.5">
        <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">
          {{ prefs.t.unitSystem }}
        </p>
        <div class="flex gap-2 flex-wrap">
          <label v-for="u in [
              { v:'metric',   l: prefs.t.metric   },
              { v:'imperial', l: prefs.t.imperial  },
            ]"
            :key="u.v"
            class="flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer
                   transition-all text-sm font-medium min-h-[44px]"
            :class="unitSystem === u.v
              ? 'border-primary bg-primary/8 text-primary'
              : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/30'">
            <input type="radio" :value="u.v" v-model="unitSystem" class="sr-only" />
            {{ u.l }}
          </label>
        </div>
      </div>
    </div>
  </section>
</template>