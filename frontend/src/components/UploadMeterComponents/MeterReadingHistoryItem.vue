<script setup>
const props = defineProps(["date", "value", "status", "fade"])
</script>

<template>
    <div 
        class="card border border-outline-variant p-4 rounded flex items-center justify-between item-hover row"
        v-bind:class = "(fade === true)?'opacity-60':''"
    >
        <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded bg-surface-container flex items-center justify-center">
                <span class="material-symbols-outlined text-primary text-xl">bolt</span>
            </div>
            <div>
                <h4 class="font-bold text-sm">{{date.toDateString()}} {{ date.toLocaleTimeString() }}</h4>
                <p class="text-[11px] text-on-surface-variant"> {{value}} kWh </p>
            </div>
        </div>
        <div class="flex flex-col items-end gap-1">
            <span v-if="status === 1" class="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-black uppercase tracking-tighter rounded">Verified</span>
            <span v-if="status === 0"  class="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant text-[9px] font-black uppercase tracking-tighter rounded">Pending</span>
            <span v-if="status === -1" class="rejected px-2 py-0.5 text-on-surface-variant text-[9px] font-black uppercase tracking-tighter rounded">Rejected</span>
        </div>
    </div>
</template>

<style scoped>
    .rejected {
        background : rgb(255, 83, 83);
    }
    .row {
        margin : 4pt 0;
    }
</style>