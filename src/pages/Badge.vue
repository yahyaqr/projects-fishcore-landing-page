<template>
    <div
        class="bg-[#FFFFFF] rounded-lg shadow-md p-6 flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:bg-[#ede9ff]">
        <component :is="iconComponent" class="w-12 h-12 text-[#41438A] mb-4" />
        <h3 class="text-xl font-bold mb-2 text-[#41438A] text-center">{{ badge.title }}</h3>
        <p class="text-sm text-[#353535] text-center">{{ badge.description }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps({
    badge: {
        type: Object,
        required: true
    }
})

const iconComponent = computed(() => {
    return LucideIcons[props.badge.icon] || LucideIcons.HelpCircle
})
</script>