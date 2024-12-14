<template>
    <div class="bg-[#41438A] text-[#F8F8F8] p-4 rounded-lg shadow-lg mb-4 flex items-center justify-between">
        <p>{{ notification.message }}</p>
        <button @click="close" class="ml-4 text-[#F8F8F8] hover:text-[#0080FF] transition-colors duration-300">
            <XIcon size="20" />
        </button>
    </div>
</template>

<script setup>
import { XIcon } from 'lucide-vue-next'

const props = defineProps({
    notification: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close'])

const close = () => {
    emit('close')
}
</script>