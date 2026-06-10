<script setup>
    import {ref, computed} from 'vue'
    import axios from 'axios'
    import SolarForecastChart from './SolarForecastChart.vue'
    import ToggleButton from 'primevue/togglebutton';
    import { useAuthStore } from '@/stores/authStore'
    const auth = useAuthStore()

    const x = ref([])
    const y = ref([])
    const time = ref([])
    const date = ref([])
    const day = ref([])

    const x_24h = ref([])
    const y_24h = ref([])
    const time_24h = ref([])

    const dayview = ref(true)

    const postalcode = auth.postalcode
    let url;
    if (postalcode === null) {
        const latitude = -29
        const longitude = 24
        url = `http://localhost:9876/predict?latitude=${latitude}&longitude=${longitude}`
    } else {
        url = `http://localhost:9876/predict/postal?postalcode=${postalcode}`
    }
    
    async function fetchData() {
        try {
            await axios({
                method: "get",
                url: url
            })
            .then(function (response) {
                x.value = response.data.x
                y.value = response.data.y
                time.value = response.data.time
                date.value = response.data.date
                day.value = response.data.day
                
                x_24h.value = x.value.filter((_, i) => day.value[i])
                y_24h.value = y.value.filter((_, i) => day.value[i])
                time_24h.value = time.value.filter((_, i) => day.value[i])
            })
            .catch(function (error) {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        } 
    }

    fetchData().then(() => console.log("data fetched"))
</script>

<template>
    <!--<div class="md:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
        <h2 class="text-lg font-bold text-on-surface mb-4">Solar Forecast</h2>
        <div class="grid grid-cols-4 gap-4">
            <SolarForecastField
            />
        </div>
    </div>-->
    <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold text-on-surface mb-4">Solar Forecast</h2>
        <div>
            <span> Timerange: </span>
            <ToggleButton v-model="dayview" offLabel="next 7 days" onLabel="next 24h"/>
        </div>
    </div>
    <div v-if="x.length > 0">
        
        <SolarForecastChart
            v-if="dayview"
            :x="x_24h"
            :y="y_24h"
            :labels="time_24h"
        />
        <SolarForecastChart
            v-else
            :x="x"
            :y="y"
            :labels="date"
        />
        </div>
    <div v-else>
        loading...
    </div>
    
</template>

<style scoped>
    .p-togglebutton.p-togglebutton-checked {
        --tw-bg-opacity: 1;
        background-color: var(--color-primary);
        color: var(--color-on-primary);
    }
    .p-togglebutotn {
        --tw-bg-opacity: 1;
        background-color: var(--color-primary);
        color: var(--color-on-primary);
    }
</style>