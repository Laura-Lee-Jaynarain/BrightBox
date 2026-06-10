<script setup>
import { ref, computed } from 'vue'
import UploadMeterForm from '@/components/UploadMeterComponents/UploadMeterForm.vue'

const props = defineProps({
  timeFrom: { type: String, default: '08:00' },
  timeTo:   { type: String, default: '22:00' },
})

const emit = defineEmits(['back', 'navigate'])
const currentView = ref('main')

const loading = ref(true)
const error   = ref(false)
const data    = ref(null)

const startTime = ref(props.timeFrom)
const endTime   = ref(props.timeTo)

const impactConfig = {
  high:   { label: 'High Impact',   classes: 'bg-red-100 text-red-700' },
  medium: { label: 'Medium Impact', classes: 'bg-primary-container/60 text-primary' },
  low:    { label: 'Low Impact',    classes: 'bg-surface-container-high text-on-surface-variant' },
}

const categoryIcons = {
  Cooling:     'ac_unit',
  Heating:     'local_fire_department',
  Laundry:     'local_laundry_service',
  Kitchen:     'microwave',
  Water:       'water_drop',
  Solar:       'solar_power',
  Electricity: 'bolt',
}


const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}


const selectionSegments = computed(() => {
  const s = (toMinutes(startTime.value) / 1440) * 100
  const e = (toMinutes(endTime.value)   / 1440) * 100
  if (s <= e) return [{ left: s, width: e - s }]
  return [{ left: s, width: 100 - s }, { left: 0, width: e }]
})

const selectionLabel = computed(() => {
  const fmt = (t) => {
    const [h, m] = t.split(':').map(Number)
    const suffix = h < 12 ? 'AM' : 'PM'
    const hour   = h % 12 || 12
    return `${hour}:${String(m).padStart(2, '0')} ${suffix}`
  }
  return `${fmt(startTime.value)} - ${fmt(endTime.value)}`
})

async function fetchTips() {
  loading.value = true
  error.value   = false
  try {
    const res = await fetch('https://localhost:7126/api/tips/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timeFrom: props.timeFrom, timeTo: props.timeTo }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    data.value = await res.json()
  } catch (e) {
    console.error(e)
    error.value = true
  } finally {
    loading.value = false
  }
}

fetchTips()
</script>

<template>
  <!-- Back button -->
  <div class="mb-8">
    <button
      class="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-6"
      @click="emit('back')"
    >
      <span class="material-symbols-outlined text-base">arrow_back</span>
      Back to all tips
    </button>

    <!-- ── Timeline card ─────────────────────────────────────── -->
    <div class="bg-inverse-surface rounded-xl p-6 border border-surface/10 mb-8">

      <!-- Header row -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary-fixed-dim">schedule</span>
          <h2 class="text-base font-bold text-surface">Peak Hour Tracker</h2>
        </div>
        <div class="flex flex-wrap gap-4 text-xs text-surface/60">
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-sm bg-red-500 inline-block"></span>Peak
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-sm bg-orange-400 inline-block"></span>Standard
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-sm inline-block" style="background:#22c55e"></span>Off-peak
          </span>
        </div>
      </div>


      <!-- timeline  --> 
      <div class="relative">
          <br>
        <!-- Colour zones for timeline -->
        <div class="relative h-12 rounded-xl overflow-hidden flex">
          <div class="" style="width:25%;background:#16a34a"  title="00:00–06:00 Off-peak"></div>
          <div class="bg-orange-500" style="width:4.17%"  title="06:00–07:00 Standard"></div>
          <div class="bg-red-600"    style="width:12.5%"  title="07:00–10:00 Peak"></div>
          <div class="bg-orange-500" style="width:8.33%"  title="10:00–12:00 Standard"></div>
          <div class="" style="width:12.5%;background:#16a34a" title="12:00–15:00 Off-peak"></div>
          <div class="bg-orange-500" style="width:8.33%"  title="15:00–17:00 Standard"></div>
          <div class="bg-red-600"    style="width:16.67%" title="17:00–21:00 Peak"></div>
          <div class="bg-orange-500" style="width:8.33%"  title="21:00–23:00 Standard"></div>
          <div class="" style="width:4.17%;background:#16a34a"  title="23:00–24:00 Off-peak"></div>
        </div>

        <!-- cool glass effect over timeline --> 
        <div
          v-for="(seg, i) in selectionSegments"
          :key="i"
          class="absolute top-6 h-12 rounded-xl border-2 border-on-primary/60 bg-on-primary/20 backdrop-blur-sm transition-all duration-300 pointer-events-none"
          :style="{ left: seg.left + '%', width: seg.width + '%' }"
        ></div>

        <!-- users'time selected shown above timeline -->
        <div
          class="absolute top-0 text-[11px] font-bold text-surface bg-surface/20 backdrop-blur-sm px-4 py-0.5 rounded-md whitespace-nowrap transition-all duration-300"
          :style="{ left: selectionSegments[0].left + '%', transform: 'translateX(-10%)' }"
        >
          {{ selectionLabel }}
        </div>

        <!-- Hour markers at bottom of timeline -->
        <div class="flex justify-between mt-2 px-0.5">
          <span class="text-[10px] text-surface/60">0:00</span>
          <span class="text-[10px] text-surface/60">6:00</span>
          <span class="text-[10px] text-surface/60">12:00</span>
          <span class="text-[10px] text-surface/60">18:00</span>
          <span class="text-[10px] text-surface/60">24:00</span>
        </div>
      </div>

    </div>
    <!--Timeline card -->

    <h1 class="text-3xl font-extrabold text-on-background tracking-tight">Your Personalised Tips</h1>
    <p v-if="data" class="text-on-surface-variant text-sm mt-1">
      Based on your active hours:
      <span class="font-bold text-primary">{{ data.scheduleSummary }}</span>
    </p>
  </div>

  <!-- Loading -->
  <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-4">
    <div class="w-12 h-12 border-4 border-primary-container border-t-primary rounded-full animate-spin"></div>
    <p class="text-on-surface-variant font-medium">Generating your personalised tips…</p>
  </div>

  <!-- Error -->
  <div v-else-if="error" class="flex flex-col items-center justify-center py-24 gap-4 text-center">
    <span class="material-symbols-outlined text-5xl text-red-400">error_outline</span>
    <p class="text-lg font-bold text-on-surface">Could not connect to the server</p>
    <button
      class="mt-2 px-6 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold hover:opacity-90"
      @click="fetchTips"
    >
      Retry
    </button>
  </div>

  <!-- Cards -->
  <template v-else-if="data">
    <div class="flex flex-wrap gap-4 mb-8">
      <div class="bg-primary-container/40 border border-outline-variant rounded-xl px-6 py-4 text-center">
        <p class="text-xs font-bold text-primary uppercase tracking-wider mb-1">Potential Saving</p>
        <p class="text-2xl font-black text-primary">{{ data.potentialSaving }}</p>
      </div>
      <div class="bg-surface-container border border-outline-variant rounded-xl px-6 py-4 text-center">
        <p class="text-xs font-bold text-primary uppercase tracking-wider mb-1">Tips Generated</p>
        <p class="text-2xl font-black text-on-surface">{{ data.tipCount }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="tip in data.tips"
        :key="tip.title"
        class="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
      >
        <div class="flex items-start gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-primary flex-shrink-0 group-hover:opacity-80 transition-opacity">
            <span class="material-symbols-outlined text-2xl">
              {{ categoryIcons[tip.category] ?? 'lightbulb' }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap gap-1.5 mb-2">
              <span
                class="px-2 py-0.5 text-[10px] font-bold uppercase rounded tracking-wider"
                :class="impactConfig[tip.impact]?.classes ?? 'bg-surface-container text-on-surface-variant'"
              >
                {{ impactConfig[tip.impact]?.label ?? tip.impact }}
              </span>
              <span
                v-if="tip.timeLabel"
                class="px-2 py-0.5 bg-primary-container text-on-primary-container text-[10px] font-bold uppercase rounded tracking-wider"
              >
                {{ tip.timeLabel }}
              </span>
            </div>
            <h4 class="text-base font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
              {{ tip.title }}
            </h4>
          </div>
        </div>

        <p class="text-sm text-on-surface-variant leading-relaxed flex-1">{{ tip.description }}</p>

        <div class="mt-4 pt-4 border-t border-outline-variant/40 flex items-center justify-between">
          <span class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">{{ tip.category }}</span>
          <span v-if="tip.saving" class="text-xs font-bold text-primary">{{ tip.saving }}</span>
        </div>
      </div>
    </div>

  
  </template>

</template>