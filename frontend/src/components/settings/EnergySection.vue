<script setup>
import { useUserPrefsStore } from '@/stores/userPrefs'
import ToggleSwitch from 'primevue/toggleswitch'

defineEmits(['saved'])
const prefs = useUserPrefsStore()

const energyItems = [
  { key: 'autoOffset', icon: 'solar_power',  titleKey: 'autoOffsetSurplus', descKey: 'autoOffsetSurplusDesc' },
  { key: 'community',  icon: 'share',        titleKey: 'communitySharing',  descKey: 'communitySharingDesc'  },
  { key: 'smart',      icon: 'schedule',     titleKey: 'smartScheduling',   descKey: 'smartSchedulingDesc'   },
  { key: 'ev',         icon: 'electric_car', titleKey: 'evCharging',        descKey: 'evChargingDesc'        },
]

const unitOptions = [
  { value: 'kWh', label: 'kWh' },
  { value: 'MWh', label: 'MWh' },
  { value: 'BTU', label: 'BTU' },
]
</script>

<template>
  <section class="card">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-5 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">bolt</span>
      {{ prefs.t.energyPrefs }}
    </h2>

    <!-- Toggles -->
    <div class="space-y-2 mb-6">
      <div v-for="item in energyItems" :key="item.key" class="toggle-row">
        <div class="flex items-center gap-3 min-w-0">
          <span class="material-symbols-outlined text-primary text-[18px] shrink-0">{{ item.icon }}</span>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-on-surface truncate">{{ prefs.t[item.titleKey] }}</p>
            <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t[item.descKey] }}</p>
          </div>
        </div>
        <ToggleSwitch v-model="prefs.energy[item.key]" :aria-label="prefs.t[item.titleKey]" />
      </div>
    </div>

    <!-- Off-peak window -->
    <div class="mb-5 pb-5 border-b border-outline-variant/15">
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
        {{ prefs.t.offPeakWindow }}
      </p>
      <div class="flex items-end gap-3 flex-wrap">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-on-surface-variant" for="peak-s">{{ prefs.t.start }}</label>
          <input id="peak-s" type="time" v-model="prefs.peakStart"
            class="bg-surface-container border border-outline-variant/30 rounded-xl px-3 py-2
                   text-sm text-on-surface focus:ring-2 focus:ring-primary/40 min-h-[44px]" />
        </div>
        <span class="text-on-surface-variant mb-2.5 text-lg">→</span>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-on-surface-variant" for="peak-e">{{ prefs.t.end }}</label>
          <input id="peak-e" type="time" v-model="prefs.peakEnd"
            class="bg-surface-container border border-outline-variant/30 rounded-xl px-3 py-2
                   text-sm text-on-surface focus:ring-2 focus:ring-primary/40 min-h-[44px]" />
        </div>
      </div>
    </div>

    <!-- Energy unit -->
    <div>
      <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
        {{ prefs.t.energyUnit }}
      </p>
      <div class="flex gap-2 flex-wrap">
        <label v-for="u in unitOptions" :key="u.value"
          class="flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer
                 transition-all text-sm font-medium min-h-[44px]"
          :class="prefs.energyUnit === u.value
            ? 'border-primary bg-primary/8 text-primary'
            : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/30'">
          <input type="radio" :value="u.value" v-model="prefs.energyUnit"
            class="sr-only" @change="prefs.setEnergyUnit(u.value)" />
          {{ u.label }}
        </label>
      </div>
    </div>
  </section>
</template>
