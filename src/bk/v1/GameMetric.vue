<template>
    <div class="flex flex-col items-center">
        <component :is="icon" class="text-[#F8F8F8] mb-1" size="24" />
        <span class="text-[#F8F8F8] font-bold">{{ value }}</span>
        <span class="text-[#F8F8F8] text-xs">{{ label }}</span>
    </div>
</template>

<script setup>
import { DollarSign, Fish, Weight, Activity } from 'lucide-vue-next'

const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    value: {
        type: [String, Number],
        required: true
    },
    label: {
        type: String,
        required: true
    }
})

const icon = {
    'dollar-sign': DollarSign,
    'fish': Fish,
    'weight': Weight,
    'activity': Activity
}[props.icon]
</script>