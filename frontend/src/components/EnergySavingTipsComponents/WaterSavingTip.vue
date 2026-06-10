<script setup>
import TipPageLayout from './TipPageLayout.vue'
const emit = defineEmits(['back'])
</script>

<template>
  <TipPageLayout
    title="Water Conservation Tips"
    subtitle="Optimize your household water usage with these practical, high-impact strategies designed to reduce waste and lower your utility bills."
    badge="Water Sustainability"
    heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDpBtkfmSaARmg-sBOTD6qVlu6062LiHHzRFi1bpC_C4kLgUbjyl_fY1IjjR-VI8L79hKdfWFcg8n4zgnmFALkE6nJXj0nbBNnOC_wB_QSz0IfBdUruDd1QlIUN0uZ9qkFjFN3evEO496ihHDViazgVHLK-9UD_frPKAJOcNJ7QzXsYZ-XRmNPgqdt6083DXeiDjIaZfQ65X7AGvp7t3Ht5rejIgwsLeVmymnwi4Bu5S9s0d5Vti5If5RVVh_FpFkftPoXkVncUYbjp"
    heroImageAlt="Abstract close-up of water droplets on a blue surface"
    sectionTitle="Expert Water Saving Tips"
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
        class="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">shower</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Low-Flow Showerheads
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Replace standard showerheads with high-efficiency models to reduce flow rates from 2.5 gpm
        to 1.5 gpm or less without losing pressure.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$45/yr saved</span>
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
        class="w-11 h-11 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">plumbing</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Fix Leaks
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        A single leaky faucet dripping one drop per second can waste over 3,000 gallons per year.
        Check toilets, faucets, and pipe joints regularly.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$60/yr saved</span>
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
        class="w-11 h-11 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">laundry</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Full Load Optimization
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Wait until you have a full load before running the dishwasher or washing machine. Modern
        appliances use the same water for partial loads.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$30/yr saved</span>
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
        class="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">yard</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Smart Irrigation
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Water your lawn in the early morning or late evening to prevent evaporation. Install soil
        moisture sensors to skip unnecessary watering.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$120/yr saved</span>
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
        class="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">water_voc</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Dual-Flush Toilets
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Upgrade to dual-flush toilets or install a displacement bag in your existing tank to reduce
        the volume of water used per flush.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$85/yr saved</span>
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
        class="w-11 h-11 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">kitchen</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Faucet Aerators
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Install low-cost aerators on kitchen and bathroom faucets to mix air into the stream,
        reducing water flow while maintaining pressure.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$25/yr saved</span>
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
        class="w-11 h-11 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sky-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">water_drop</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Collect Rainwater
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Collecting rainwater for gardening and outdoor cleaning can reduce your municipal water
        demand by up to 40%. Start with a basic rain barrel system.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$85/yr saved</span>
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
        class="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">timer</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        5-Minute Showers
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Taking shorter showers can significantly reduce your water usage and lower your utility
        bills.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$85/yr saved</span>
      </div>
    </div>
  </TipPageLayout>
</template>
