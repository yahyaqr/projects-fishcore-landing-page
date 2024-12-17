<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-[#F8F8F8] rounded-lg p-6 max-w-md w-full">
            <h2 class="text-2xl font-bold text-[#41438A] mb-4">Fish Sampling</h2>
            <form @submit.prevent="submitSampling">
                <div class="mb-4">
                    <label for="sampleSize" class="block text-sm font-medium text-[#353535] mb-1">Sample Size</label>
                    <input id="sampleSize" v-model.number="sampleSize" type="number" min="1" required
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#41438A]">
                </div>
                <div class="mb-4">
                    <label for="averageWeight" class="block text-sm font-medium text-[#353535] mb-1">Average Weight
                        (g)</label>
                    <input id="averageWeight" v-model.number="averageWeight" type="number" min="0" step="0.1" required
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#41438A]">
                </div>
                <div class="mb-4">
                    <label for="averageLength" class="block text-sm font-medium text-[#353535] mb-1">Average Length
                        (cm)</label>
                    <input id="averageLength" v-model.number="averageLength" type="number" min="0" step="0.1" required
                        class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#41438A]">
                </div>
                <div class="flex justify-end space-x-4">
                    <button type="button" @click="close"
                        class="bg-gray-300 text-[#353535] p-2 rounded hover:bg-gray-400 transition-colors duration-300">
                        Cancel
                    </button>
                    <button type="submit"
                        class="bg-[#0080FF] text-[#F8F8F8] p-2 rounded hover:bg-[#41438A] transition-colors duration-300">
                        Submit Sampling
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'update-fish-stats'])

const sampleSize = ref(10)
const averageWeight = ref(0)
const averageLength = ref(0)

const submitSampling = () => {
    const totalFishCount = 1000 // This should be dynamically set based on the current simulation state
    const totalBiomass = (totalFishCount * averageWeight.value) / 1000 // Convert to kg

    emit('update-fish-stats', {
        count: totalFishCount,
        biomass: totalBiomass.toFixed(2),
        averageSize: averageLength.value.toFixed(1)
    })

    close()
}

const close = () => {
    emit('close')
}
</script>