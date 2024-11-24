<template>
    <svg viewBox="0 0 800 400" class="w-full h-full">
        <!-- Simplified Indonesia map outline -->
        <path d="M100,200 Q200,100 400,200 T700,200" fill="none" stroke="#4299e1" stroke-width="2" />

        <!-- Regions (simplified for illustration) -->
        <circle v-for="(value, region, index) in regionData" :key="region" :cx="100 + index * 150" :cy="200" :r="value"
            :fill="`rgba(66, 153, 225, ${value / 100})`" @click="$emit('region-click', region)"
            class="cursor-pointer hover:stroke-2 hover:stroke-blue-600 transition-all duration-300" />

        <!-- Region labels -->
        <text v-for="(value, region, index) in regionData" :key="`label-${region}`" :x="100 + index * 150" :y="250"
            text-anchor="middle" fill="#2d3748" font-size="12">
            {{ region }}
        </text>
    </svg>
</template>

<script setup>
defineProps({
    regionData: {
        type: Object,
        required: true
    }
})

defineEmits(['region-click'])
</script>