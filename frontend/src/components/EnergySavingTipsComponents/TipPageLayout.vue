<script setup>
const emit = defineEmits(['back'])
defineProps({
  title: String,
  subtitle: String,
  badge: String,
  heroImage: String,
  heroImageAlt: String,
  sectionTitle: String,
  sectionSubtitle: String,
})
</script>

<template>
  <div>
    <!-- Back button -->
    <button
      @click="emit('back')"
      class="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors group"
    >
      <span
        class="material-symbols-outlined text-base transition-transform group-hover:-translate-x-1"
        >arrow_back</span
      >
      Back to All Tips
    </button>

    <!-- Hero -->
    <div class="relative rounded-2xl overflow-hidden mb-10 h-64 md:h-80">
      <img class="w-full h-full object-cover object-center" :src="heroImage" :alt="heroImageAlt" />
      <!-- Bottom-up gradient for legible text -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/5"></div>
      <!-- Left accent gradient -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>

      <!-- Content anchored to bottom -->
      <div class="absolute inset-0 flex flex-col justify-end px-8 md:px-12 pb-8 md:pb-10">
        <span
          class="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 w-fit"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          {{ badge }}
        </span>
        <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
          {{ title }}
        </h1>
        <p class="text-white/80 text-sm md:text-base max-w-xl leading-relaxed">{{ subtitle }}</p>
      </div>
    </div>

    <!-- Section header -->
    <div class="mb-8 flex items-center gap-3">
      <div class="w-1 h-7 bg-blue-600 rounded-full flex-shrink-0"></div>
      <div>
        <h2 class="text-xl font-bold text-on-background leading-tight">{{ sectionTitle }}</h2>
        <p class="text-on-surface-variant text-sm mt-0.5">{{ sectionSubtitle }}</p>
      </div>
    </div>

    <!-- Tips grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <slot></slot>
    </div>
  </div>
</template>
