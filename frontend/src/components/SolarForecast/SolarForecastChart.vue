<script setup>
    import {ref, computed} from 'vue'
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale
    } from 'chart.js'
    import { Bar } from 'vue-chartjs'
    import { useUserPrefsStore, ACCENT_PALETTES } from '@/stores/userPrefs'

    const prefs = useUserPrefsStore()

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale
    )

    const props = defineProps(["x", "y", "labels"])

    
    let chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales : {
            y : {
                title : {
                    display: true,
                    text: "Generated Energy [kW]"
                }
            },
            x : {
                ticks: {
                    autoSkip : false
                }
            }
        }
    }

    const data = ref({
        labels: [],
        datasets: []
    })

    data.value = {
        labels: props.labels,
        datasets: [
            {
                data : props.y,
                backgroundColor: ACCENT_PALETTES[prefs.accentKey]['--color-primary'],
                barPercentage: 1.0,
                categoryPercentage: 1.0
            }
        ]
    }

</script>

<template>
    <Bar :data="data" :options="chartOptions" style="height: 400px;"/>
</template>