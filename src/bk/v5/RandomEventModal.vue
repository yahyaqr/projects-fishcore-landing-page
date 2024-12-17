<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-[#F8F8F8] rounded-lg p-6 max-w-md w-full">
            <h2 class="text-2xl font-bold text-[#41438A] mb-4">{{ event.title }}</h2>
            <p class="text-[#353535] mb-6">{{ event.description }}</p>
            <div class="space-y-4">
                <button v-for="(option, index) in event.options" :key="index" @click="selectOption(index)"
                    class="w-full bg-[#41438A] text-[#F8F8F8] p-2 rounded hover:bg-[#0080FF] transition-colors duration-300">
                    {{ option.text }}
                </button>
            </div>
            <div v-if="selectedOption !== null" class="mt-4 p-4 bg-[#ede9ff] rounded-lg">
                <p class="text-[#353535]"><strong>Effect:</strong> {{ event.options[selectedOption].effect }}</p>
            </div>
            <button @click="close"
                class="mt-6 w-full bg-[#0080FF] text-[#F8F8F8] p-2 rounded hover:bg-[#41438A] transition-colors duration-300">
                Close
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    event: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['close'])

const selectedOption = ref(null)

const selectOption = (index) => {
    selectedOption.value = index
}

const close = () => {
    emit('close')
}
</script>