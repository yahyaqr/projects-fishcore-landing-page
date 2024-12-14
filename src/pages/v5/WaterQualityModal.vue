<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Water Quality Metrics</h2>
            <div class="space-y-4">
                <WaterQualityMetric v-for="metric in metrics" :key="metric.label" v-bind="metric" />
            </div>
            <button @click="$emit('close')"
                class="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300">
                Close
            </button>
        </div>
    </div>
</template>

<script setup>
import WaterQualityMetric from './WaterQualityMetric.vue'

defineProps({
    metrics: Array
})
</script>