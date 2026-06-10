<script setup>
import TipPageLayout from './TipPageLayout.vue'
const emit = defineEmits(['back'])
</script>

<template>
  <TipPageLayout
    title="Get the Most Out of Your Solar Panels"
    subtitle="Small changes lead to significant savings. Follow our curated expert tips to reduce your monthly energy bill by up to 30%."
    badge="Featured Guide"
    heroImage="https://lh3.googleusercontent.com/aida-public/AB6AXuC_t0LazH9tTWFhJf0OamJnaPhTE20HMRvoYyiHW4ovkvW8Obf7iqYb2FG2me5J0v5HsFi7e97ChynQX2wQZ0PRYHm_Cdwo-nbV8zNdwy2GEnYe6BmyBC1DPzLbTB98VyChVIHGAak7WY_NRtz4VLl6gPqE1aOkHw64-jAmN217gekRN2mk3jtK77cK9RJWsTEOK523_JQvwlJ_ScxAwONO1DwTtQANhS07eHuu4Ftl9AlZcyp4bL87ckS5TttmR-bJm0zMhaemM_Jh"
    heroImageAlt="Solar panels on a residential roof reflecting a bright blue sky"
    sectionTitle="Expert Solar Tips"
    sectionSubtitle="Expert-verified ways to maximize your solar energy output and reduce your carbon footprint."
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
        <span class="material-symbols-outlined text-xl">cleaning_services</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Panel Cleaning
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Dust, pollen, and bird droppings can reduce output by up to 25%. Schedule a soft-water wash
        every 6 months.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$120/yr saved</span>
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
        <span class="material-symbols-outlined text-xl">content_cut</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Shade Management
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Trim overhanging branches that may cast shadows during peak sun hours (10 AM - 2 PM).
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$85/yr saved</span>
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
        class="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">battery_charging_full</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Peak Shaving
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Run heavy appliances during peak generation hours to reduce grid dependency and maximize
        self-consumption.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$240/yr saved</span>
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
        class="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">router</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Inverter Update
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Ensure your inverter firmware is up to date to access better MPPT algorithms and efficiency
        improvements.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$45/yr saved</span>
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
        class="w-11 h-11 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">nest_thermostat</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Smart Export
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Install a smart controller to export excess energy when grid prices are highest (if your
        utility plan allows).
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$310/yr saved</span>
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
        class="w-11 h-11 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-100 group-hover:scale-105 transition-all duration-200"
      >
        <span class="material-symbols-outlined text-xl">monitoring</span>
      </div>
      <h4
        class="font-bold text-slate-800 mb-1.5 pr-8 group-hover:text-blue-700 transition-colors leading-snug"
      >
        Daily Monitoring
      </h4>
      <p class="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
        Review your app weekly to spot unusual dips in production that could indicate a technical
        fault.
      </p>
      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >Annual Impact</span
        >
        <span class="text-blue-600 font-bold text-sm">$155/yr saved</span>
      </div>
    </div>
  </TipPageLayout>
</template>
