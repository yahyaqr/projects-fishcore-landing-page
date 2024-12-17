<template>
    <div class="mb-2">
        <div class="flex justify-between">
            <span>{{ label }}</span>
            <span :class="statusColor">{{ value }} {{ unit }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="h-2.5 rounded-full" :class="statusColor" :style="{ width: `${percentage}%` }"></div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    label: String,
    value: Number,
    unit: String,
    status: String
})

const statusColor = computed(() => {
    switch (props.status) {
        case 'optimal':
            return 'text-green-500 bg-green-500'
        case 'warning':
            return 'text-yellow-500 bg-yellow-500'
        case 'critical':
            return 'text-red-500 bg-red-500'
        default:
            return 'text-gray-500 bg-gray-500'
    }
})

const percentage = computed(() => {
    // This is a simplified calculation. Adjust based on your specific requirements.
    return Math.min(Math.max((props.value / 100) * 100, 0), 100)
})
</script>