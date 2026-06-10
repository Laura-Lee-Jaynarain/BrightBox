<script setup>
import TipPageLayout from './TipPageLayout.vue'
const emit = defineEmits(['back'])
</script>

<template>
  <TipPageLayout
    title="Save Energy in the Kitchen"
    subtitle="Small changes lead to significant savings. Follow our curated expert tips to reduce your monthly energy bill by up to 30%."
    badge="Featured Guide"
    heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDMy0PhlxobZcJ_4g4Mf9SeMLlF-_DkNtY2SyB6FAWUZHT69Udt45Qsbzuz0ny5-lhDO8unmQcOl3R5vlohm9-yrUTfbhqqfJZyGmYcb45mgqtckZLcMiFAquIe9meoXQbicAKqGdmfXbvUR-oxLoBlywqw2E9uMyMWXpjVv7N6sB6TPmeYssnSGvnVFtzIUabwt393gKzyxnEfJEONPvz-Rpq9bNX9ZvceMD4KN8Q56KHtxXqLKHNXXKHlvDXGzhHKi0MFlg0w59vY"
    heroImageAlt="High-end modern induction cooktop in a luxury kitchen"
    sectionTitle="Expert Kitchen Tips"
    sectionSubtitle="Expert-verified ways to reduce your energy consumption and lower your utility bills."
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
        <span class="material-symbols-outlined text-xl">dishwasher</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Full Dishwasher Loads
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Wait until the dishwasher is completely full before running a cycle to maximize water and
        energy efficiency per dish.
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
        class="w-11 h-11 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">kitchen</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Refrigerator Maintenance
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Clean condenser coils every six months and ensure door seals are airtight to prevent cold
        air leakage and motor overwork.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$30/yr saved</span>
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
        <span class="material-symbols-outlined text-xl">cooking</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Efficient Cooking Habits
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Use lids on pots to retain heat, match pan size to burner size, and utilize smaller
        appliances like air fryers when possible.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$25/yr saved</span>
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
        <span class="material-symbols-outlined text-xl">severe_cold</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Smart Thawing
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Thaw frozen foods in the refrigerator rather than using the microwave or running water. It
        helps cool the fridge while saving energy.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$15/yr saved</span>
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
        <span class="material-symbols-outlined text-xl">oven_gen</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Convection Cooking
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Use the convection setting on your oven to circulate hot air, allowing for lower
        temperatures and faster cooking times.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$35/yr saved</span>
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
        <span class="material-symbols-outlined text-xl">faucet</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Low-Flow Aerators
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Install high-efficiency aerators on your kitchen faucet to reduce hot water consumption
        without sacrificing water pressure.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$20/yr saved</span>
      </div>
    </div>
  </TipPageLayout>
</template>
