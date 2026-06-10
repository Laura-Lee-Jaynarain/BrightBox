<template>
  <div class="bg-white p-4 rounded-2xl shadow h-[300px]">
    <Line :data="chartData" :options="chartOptions" />

    <div class="mt-3 text-sm">
      <p><strong>Total:</strong> {{ total }} kWh</p>
      <p><strong>Peak:</strong> {{ peakDay }} ({{ peakValue }} kWh)</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { Line } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
)

const props = defineProps({
  labels: {
    type: Array,
    default: () => []
  },
  values: {
    type: Array,
    default: () => []
  },
  total: Number,
  peakDay: String,
  peakValue: Number
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Energy Usage',
      data: props.values,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.2)',
      tension: 0.4,
      fill: true
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>