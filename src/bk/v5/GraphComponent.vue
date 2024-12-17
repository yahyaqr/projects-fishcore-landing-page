<template>
    <div class="bg-[#F8F8F8] rounded-lg p-4 mb-4">
        <canvas ref="chartRef"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const chartRef = ref(null)
let chart = null

onMounted(() => {
    createChart()
})

watch(() => props.data, () => {
    if (chart) {
        chart.data = props.data
        chart.update()
    }
}, { deep: true })

const createChart = () => {
    const ctx = chartRef.value.getContext('2d')
    chart = new Chart(ctx, {
        type: 'line',
        data: props.data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
}
</script>