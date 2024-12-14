<template>
    <div class="mb-4">
        <div class="flex justify-between items-center mb-1">
            <span class="text-sm font-medium text-[#353535]">{{ label }}</span>
            <span :class="statusClass" class="text-sm font-medium">{{ status }}</span>
        </div>
        <div class="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div class="h-2.5 rounded-full" :class="barColorClass" :style="{ width: `${percentage}%` }"></div>
        </div>
        <div class="flex justify-between items-center mt-1">
            <span class="text-xs text-[#353535]">{{ value }} {{ unit }}</span>
            <span class="text-xs text-[#353535]">{{ optimalRange }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        required: true,
        validator: (value) => ['optimal', 'warning', 'critical'].includes(value)
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    optimalMin: {
        type: Number,
        required: true
    },
    optimalMax: {
        type: Number,
        required: true
    }
})

const percentage = computed(() => {
    return ((props.value - props.min) / (props.max - props.min)) * 100
})

const statusClass = computed(() => {
    switch (props.status) {
        case 'optimal':
            return 'text-green-600'
        case 'warning':
            return 'text-yellow-600'
        case 'critical':
            return 'text-red-600'
        default:
            return ''
    }
})

const barColorClass = computed(() => {
    switch (props.status) {
        case 'optimal':
            return 'bg-green-600'
        case 'warning':
            return 'bg-yellow-600'
        case 'critical':
            return 'bg-red-600'
        default:
            return 'bg-blue-600'
    }
})

const optimalRange = computed(() => {
    return `${props.optimalMin} - ${props.optimalMax} ${props.unit}`
})
</script>