<template>
    <div class="mb-2">
        <div class="flex justify-between">
            <span>{{ label }}</span>
            <span>{{ value }} {{ unit }}</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    value: [Number, String],
    unit: String
})
</script>