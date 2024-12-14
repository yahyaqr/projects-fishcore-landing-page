<template>
    <div class="bg-[#F8F8F8] rounded-lg p-3 flex items-center">
        <component :is="icon" class="text-[#41438A] mr-2" size="24" />
        <div>
            <div class="text-xl font-bold text-[#41438A]">{{ value }}</div>
            <div class="text-sm text-[#353535]">{{ label }}</div>
        </div>
    </div>
</template>

<script setup>
import { DollarSign, Fish, Weight, Activity } from 'lucide-vue-next'

const props = defineProps({
    icon: {
        type: String,
        required: true,
        validator: (value) => ['dollar-sign', 'fish', 'weight', 'activity'].includes(value)
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

const iconComponents = {
    'dollar-sign': DollarSign,
    'fish': Fish,
    'weight': Weight,
    'activity': Activity
}

const icon = iconComponents[props.icon]
</script>