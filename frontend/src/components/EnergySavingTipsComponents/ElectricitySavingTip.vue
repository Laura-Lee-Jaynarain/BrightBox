<script setup>
import TipPageLayout from './TipPageLayout.vue'
const emit = defineEmits(['back'])
</script>

<template>
  <TipPageLayout
    title="Electricity Saving Tips"
    subtitle="Optimize your electricity usage to save energy, reduce utility bills, and extend the life of your appliances."
    badge="Sustainable Electricity Guide"
    heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuBjhLHZbdX_il1lydLfYaztp3hmg5jMfaaX_Qbb0HnNyPKm55i2ALDK72ZzzqmTv0r0ssunoJZTFgEZXHFRyOnXj5R5C05W1vgWIO2EeJht9vBFcDZRhwpkrZ6MsPhKrqkU2q9xxXgEZQMUED9Xk1nJj9rT0GrWUHq3oTLMwM-G9pdnEqhpUgT7oaLgasOOJumjkuE5RTLVbksns_UXtH3RDmA-j15oK4-1Jp3InIVLIfs5OBvOK2U7kQgqFGeqJDg3PpFglzRuSWeu"
    heroImageAlt="Modern home with energy-efficient appliances"
    sectionTitle="Expert Electricity Tips"
    sectionSubtitle="Expert-verified ways to lower your carbon footprint and costs."
    @back="emit('back')"
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
        class="w-11 h-11 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-yellow-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">lightbulb</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        LED Lighting Upgrade
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Replace old incandescent bulbs with energy-efficient LED alternatives across your home.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$150/yr saved</span>
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
        class="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">thermostat</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Smart Thermostat Installation
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Automate your home temperature based on occupancy to slash heating and cooling costs.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$220/yr saved</span>
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
        <span class="material-symbols-outlined text-xl">power_off</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Unplug Phantom Electronics
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Devices like chargers and TVs draw power even when off. Use smart power strips to cut it.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$75/yr saved</span>
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
        class="w-11 h-11 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">water_drop</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Use Cold Water for Laundry
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Heating water accounts for 90% of washing machine energy. Cold water is just as effective.
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
        class="w-11 h-11 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">window</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Seal Air Leaks &amp; Insulation
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Keep the conditioned air inside by sealing gaps in windows and doors with weatherstripping.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$180/yr saved</span>
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
        class="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">filter_alt</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Clean AC/Heater Filters
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Dirty filters restrict airflow, making your HVAC system work harder and use more energy.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$45/yr saved</span>
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
        class="w-11 h-11 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">schedule</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Off-Peak Appliance Use
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Run dishwashers and dryers during off-peak hours when electricity rates are lower.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$90/yr saved</span>
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
        class="w-11 h-11 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-rose-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">wb_sunny</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Natural Light Optimization
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Open blinds during the day to heat your home naturally and reduce the need for lights.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$30/yr saved</span>
      </div>
    </div>
  </TipPageLayout>
</template>
