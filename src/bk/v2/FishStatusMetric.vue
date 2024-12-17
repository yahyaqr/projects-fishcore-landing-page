<template>
    <div class="mb-4">
        <div class="flex justify-between items-center mb-1">
            <span class="text-sm font-medium text-[#353535]">{{ label }}</span>
        </div>
        <div class="bg-[#41438A] text-[#F8F8F8] rounded-lg p-2 flex justify-between items-center">
            <span class="text-xl font-bold">{{ value }}</span>
            <span class="text-sm">{{ unit }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: [Number, String],
        required: true
    },
    unit: {
        type: String,
        default: ''
    }
})
</script>