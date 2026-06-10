<script setup>
    import { defineProps } from 'vue';
    const props = defineProps(['symbol', 'description', 'link'])
</script>

<template>
    <router-link :to=link>
        <button class="w-10 h-10 flex items-center justify-center rounded-md hover:bg-primary/10 transition-colors md:flex hidden" 
        :title="description">
            <span class="material-symbols-outlined text-on-surface">{{symbol}}</span>
        </button>
    </router-link>
</template>