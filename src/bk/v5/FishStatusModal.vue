<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Fish Status Metrics</h2>
            <div class="space-y-4">
                <FishStatusMetric v-for="metric in metrics" :key="metric.label" v-bind="metric" />
            </div>
            <button @click="$emit('close')"
                class="mt-6 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-300">
                Close
            </button>
        </div>
    </div>
</template>

<script setup>
import FishStatusMetric from './FishStatusMetric.vue'

defineProps({
    metrics: Array
})
</script>