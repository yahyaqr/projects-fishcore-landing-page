<template>
    <div class="bg-gray-100 p-4 rounded-lg h-full flex flex-col">
        <h4 class="text-xl font-semibold mb-4 text-blue-800">Biofloc System Simulation</h4>
        <div class="flex-grow relative">
            <div class="absolute inset-0 bg-blue-200 rounded-lg overflow-hidden">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-3/4 h-3/4 bg-blue-300 rounded-full relative overflow-hidden">
                        <div class="absolute inset-x-0 bottom-0 bg-blue-500 transition-all duration-1000 ease-in-out"
                            :style="{ height: `${waterLevel}%` }"></div>
                        <div v-for="(fish, index) in fishes" :key="index"
                            class="absolute w-4 h-2 bg-gray-800 rounded-full transition-all duration-500"
                            :style="{ left: `${fish.x}%`, top: `${fish.y}%` }"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-4">
            <div>
                <h5 class="font-semibold mb-2">System Controls</h5>
                <button @click="addFish"
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 w-full mb-2">
                    Add Fish
                </button>
                <button @click="changeWaterLevel"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full">
                    Change Water Level
                </button>
            </div>
            <div>
                <h5 class="font-semibold mb-2">System Status</h5>
                <p>Fish Count: {{ fishes.length }}</p>
                <p>Water Level: {{ Math.round(waterLevel) }}%</p>
                <p>System Health: {{ systemHealth }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const waterLevel = ref(50)
const fishes = ref([])

const addFish = () => {
    if (fishes.value.length < 10) {
        fishes.value.push({
            x: Math.random() * 100,
            y: Math.random() * 100
        })
    }
}

const changeWaterLevel = () => {
    waterLevel.value = Math.random() * 100
}

const systemHealth = computed(() => {
    const idealFishCount = 5
    const idealWaterLevel = 70

    const fishScore = 100 - Math.abs(fishes.value.length - idealFishCount) * 10
    const waterScore = 100 - Math.abs(waterLevel.value - idealWaterLevel)

    const overallScore = (fishScore + waterScore) / 2

    if (overallScore > 80) return 'Excellent'
    if (overallScore > 60) return 'Good'
    if (overallScore > 40) return 'Fair'
    return 'Poor'
})
</script>