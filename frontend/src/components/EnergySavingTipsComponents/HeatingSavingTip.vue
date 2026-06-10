<script setup>
import TipPageLayout from './TipPageLayout.vue'
const emit = defineEmits(['back'])
</script>

<template>
  <TipPageLayout
    title="Heating Efficiency Tips"
    subtitle="Maximize your comfort while minimizing your environmental footprint and utility costs this season."
    badge="Winter Efficiency Guide"
    heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBjhLHZbdX_il1lydLfYaztp3hmg5jMfaaX_Qbb0HnNyPKm55i2ALDK72ZzzqmTv0r0ssunoJZTFgEZXHFRyOnXj5R5C05W1vgWIO2EeJht9vBFcDZRhwpkrZ6MsPhKrqkU2q9xxXgEZQMUED9Xk1nJj9rT0GrWUHq3oTLMwM-G9pdnEqhpUgT7oaLgasOOJumjkuE5RTLVbksns_UXtH3RDmA-j15oK4-1Jp3InIVLIfs5OBvOK2U7kQgqFGeqJDg3PpFglzRuSWeu"
    heroImageAlt="Abstract warm orange and blue heat wave gradients"
    sectionTitle="Expert Heating Tips"
    sectionSubtitle="Curated ways to keep your home warm and your bills low."
    @back="$emit('back')"
  >
    <!-- Tip 1 -->
    <div
      class="bg-white rounded-xl border border-slate-100 p-5 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group relative"
    >
      <label class="absolute top-4 right-4 cursor-pointer">
        <input type="checkbox" class="peer sr-only" />
        <div
          class="w-6 h-6 rounded-md border-2 border-slate-200 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
        >
          <svg
            class="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
      <div
        class="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">nest_thermostat_gen_3</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Smart Thermostat
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Automate your home's temperature based on your schedule to avoid heating an empty house.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$180/yr saved</span>
      </div>
    </div>

    <!-- Tip 2 -->
    <div
      class="bg-white rounded-xl border border-slate-100 p-5 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group relative"
    >
      <label class="absolute top-4 right-4 cursor-pointer">
        <input type="checkbox" class="peer sr-only" />
        <div
          class="w-6 h-6 rounded-md border-2 border-slate-200 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
        >
          <svg
            class="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
      <div
        class="w-11 h-11 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">air</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Seal Air Leaks
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Seal leaks around windows and doors with weatherstripping to keep warm air from escaping.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$110/yr saved</span>
      </div>
    </div>

    <!-- Tip 3 -->
    <div
      class="bg-white rounded-xl border border-slate-100 p-5 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group relative"
    >
      <label class="absolute top-4 right-4 cursor-pointer">
        <input type="checkbox" class="peer sr-only" />
        <div
          class="w-6 h-6 rounded-md border-2 border-slate-200 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
        >
          <svg
            class="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
      <div
        class="w-11 h-11 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">wb_sunny</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Harness Sunlight
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Open south-facing curtains during the day to let the sun naturally heat your living spaces.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$45/yr saved</span>
      </div>
    </div>

    <!-- Tip 4 -->
    <div
      class="bg-white rounded-xl border border-slate-100 p-5 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group relative"
    >
      <label class="absolute top-4 right-4 cursor-pointer">
        <input type="checkbox" class="peer sr-only" />
        <div
          class="w-6 h-6 rounded-md border-2 border-slate-200 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
        >
          <svg
            class="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
      <div
        class="w-11 h-11 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">build</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Filter Maintenance
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Replace furnace filters monthly. Clean systems run more efficiently and consume less fuel.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$60/yr saved</span>
      </div>
    </div>

    <!-- Tip 5 -->
    <div
      class="bg-white rounded-xl border border-slate-100 p-5 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group relative"
    >
      <label class="absolute top-4 right-4 cursor-pointer">
        <input type="checkbox" class="peer sr-only" />
        <div
          class="w-6 h-6 rounded-md border-2 border-slate-200 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
        >
          <svg
            class="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
      <div
        class="w-11 h-11 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">checkroom</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Layer Up
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Lower the thermostat by 2 degrees and wear a sweater. It significantly reduces heating load.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$95/yr saved</span>
      </div>
    </div>

    <!-- Tip 6 -->
    <div
      class="bg-white rounded-xl border border-slate-100 p-5 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group relative"
    >
      <label class="absolute top-4 right-4 cursor-pointer">
        <input type="checkbox" class="peer sr-only" />
        <div
          class="w-6 h-6 rounded-md border-2 border-slate-200 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
        >
          <svg
            class="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
      <div
        class="w-11 h-11 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-rose-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">settings_suggest</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Water Heater Temp
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Lower your water heater setting to 120°F (49°C) to prevent standby heat loss.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$30/yr saved</span>
      </div>
    </div>

    <!-- Tip 7 -->
    <div
      class="bg-white rounded-xl border border-slate-100 p-5 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group relative"
    >
      <label class="absolute top-4 right-4 cursor-pointer">
        <input type="checkbox" class="peer sr-only" />
        <div
          class="w-6 h-6 rounded-md border-2 border-slate-200 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
        >
          <svg
            class="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
      <div
        class="w-11 h-11 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">mode_fan</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Reverse Fans
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Run ceiling fans in reverse (clockwise) at low speed to push warm air back down.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$15/yr saved</span>
      </div>
    </div>

    <!-- Tip 8 -->
    <div
      class="bg-white rounded-xl border border-slate-100 p-5 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group relative"
    >
      <label class="absolute top-4 right-4 cursor-pointer">
        <input type="checkbox" class="peer sr-only" />
        <div
          class="w-6 h-6 rounded-md border-2 border-slate-200 bg-white peer-checked:bg-blue-600 peer-checked:border-blue-600 hover:border-blue-400 transition-all duration-200 flex items-center justify-center"
        >
          <svg
            class="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </label>
      <div
        class="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">blanket</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Insulate Attic
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Adding proper insulation to your attic can prevent massive heat loss through the roof.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$220/yr saved</span>
      </div>
    </div>
  </TipPageLayout>
</template>
