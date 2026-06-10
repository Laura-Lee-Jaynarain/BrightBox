<script setup>
const props = defineProps(["image"])
</script>

<template>
    <div class="relative mb-4">
        <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 p-1">
        <img class="w-full h-full object-cover rounded-full" 
        data-alt="profile picture" 
        :src="image"/>
        </div>
    </div>
</template>