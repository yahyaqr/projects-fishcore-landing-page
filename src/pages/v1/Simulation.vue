<template>
    <div class="min-h-screen bg-gradient-to-br from-[#41438A] to-[#2D2E6B] text-[#353535] flex flex-col p-4">
        <!-- Top Area (Status Bar) -->
        <div class="mb-4 text-center">
            <h1 class="text-2xl font-bold text-[#F8F8F8] mb-2">{{ pondName }}</h1>
            <div class="flex justify-center space-x-4">
                <GameMetric icon="dollar-sign" :value="budget" label="Budget" />
                <GameMetric icon="fish" :value="fishCount" label="Fish Count" />
                <GameMetric icon="weight" :value="biomassTotal" label="Biomass" />
                <GameMetric icon="activity" :value="pondHealth" label="Pond Health" />
            </div>
        </div>

        <div class="flex-1 flex">
            <!-- Left Sidebar (Quick Metrics) -->
            <div class="w-1/4 bg-[#F8F8F8] rounded-lg p-4 mr-4">
                <h2 class="text-xl font-bold text-[#41438A] mb-4">Water Quality</h2>
                <WaterQualityMetric label="pH" :value="waterQuality.pH"
                    :status="getMetricStatus(waterQuality.pH, 6.5, 8)" />
                <WaterQualityMetric label="DO" :value="waterQuality.do" unit="mg/L"
                    :status="getMetricStatus(waterQuality.do, 5, 7)" />
                <WaterQualityMetric label="Temperature" :value="waterQuality.temperature" unit="°C"
                    :status="getMetricStatus(waterQuality.temperature, 25, 30)" />
                <WaterQualityMetric label="TDS" :value="waterQuality.tds" unit="ppm"
                    :status="getMetricStatus(waterQuality.tds, 100, 1000)" />
                <WaterQualityMetric label="Floc Volume" :value="waterQuality.flocVolume" unit="mL/L"
                    :status="getMetricStatus(waterQuality.flocVolume, 5, 50)" />

                <h2 class="text-xl font-bold text-[#41438A] mt-6 mb-4">Fish Status</h2>
                <FishStatusMetric label="Average Size" :value="fishStatus.averageSize" unit="cm" />
                <FishStatusMetric label="Survival Rate" :value="fishStatus.survivalRate" unit="%" />
                <FishStatusMetric label="Dead Fish" :value="fishStatus.deadFish" />
            </div>

            <!-- Central Area -->
            <div class="flex-1 flex flex-col">
                <!-- Pond Visualization -->
                <div class="relative flex-1 bg-[#6D6FB0] rounded-full mb-4">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-[#F8F8F8] text-2xl font-bold">{{ fishCount }} fish</span>
                    </div>
                    <!-- Floating Buttons -->
                    <button @click="checkPondCondition"
                        class="absolute bottom-4 left-4 bg-[#41438A] text-[#F8F8F8] p-2 rounded-full hover:bg-[#0080FF] transition-colors duration-300">
                        <ActivityIcon size="24" />
                    </button>
                    <button @click="manageInventory"
                        class="absolute bottom-4 right-4 bg-[#41438A] text-[#F8F8F8] p-2 rounded-full hover:bg-[#0080FF] transition-colors duration-300">
                        <PackageIcon size="24" />
                    </button>
                    <button v-if="hasRandomEvent" @click="handleRandomEvent"
                        class="absolute top-4 right-4 bg-[#FF4136] text-[#F8F8F8] p-2 rounded-full animate-pulse">
                        <AlertTriangleIcon size="24" />
                    </button>
                </div>

                <!-- Event Log and Timeline -->
                <div class="bg-[#F8F8F8] rounded-lg p-4">
                    <h2 class="text-xl font-bold text-[#41438A] mb-2">Event Log</h2>
                    <ul class="mb-4 h-32 overflow-y-auto">
                        <li v-for="(event, index) in eventLog" :key="index" class="text-sm mb-1">{{ event }}</li>
                    </ul>
                    <div class="flex items-center">
                        <span class="mr-2 text-sm">Day 1</span>
                        <input type="range" min="1" :max="totalDays" v-model="currentDay" class="flex-1" />
                        <span class="ml-2 text-sm">Day {{ totalDays }}</span>
                    </div>
                </div>
            </div>

            <!-- Right Sidebar (Actions Menu) -->
            <div class="w-1/4 bg-[#F8F8F8] rounded-lg p-4 ml-4 flex flex-col">
                <button @click="addSupplies"
                    class="bg-[#41438A] text-[#F8F8F8] p-2 rounded mb-4 hover:bg-[#0080FF] transition-colors duration-300">Add
                    Supplies</button>
                <button @click="analyzePond"
                    class="bg-[#41438A] text-[#F8F8F8] p-2 rounded mb-4 hover:bg-[#0080FF] transition-colors duration-300">Analyze
                    Pond</button>
                <button @click="fishSampling"
                    class="bg-[#41438A] text-[#F8F8F8] p-2 rounded mb-4 hover:bg-[#0080FF] transition-colors duration-300">Fish
                    Sampling</button>

                <div class="flex-1">
                    <h3 class="text-lg font-bold text-[#41438A] mb-2">Daily Tasks</h3>
                    <ul>
                        <li v-for="(task, index) in dailyTasks" :key="index" class="flex items-center mb-2">
                            <input type="checkbox" v-model="task.completed" class="mr-2" />
                            <span :class="{ 'line-through': task.completed }">{{ task.name }}</span>
                        </li>
                    </ul>
                </div>

                <button @click="advanceDay"
                    class="bg-[#0080FF] text-[#F8F8F8] p-2 rounded hover:bg-[#41438A] transition-colors duration-300">Advance
                    Day</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { DollarSign, Fish, Weight, Activity, Package, AlertTriangle } from 'lucide-vue-next'
import GameMetric from './GameMetric.vue'
import WaterQualityMetric from './WaterQualityMetric.vue'
import FishStatusMetric from './FishStatusMetric.vue'

const pondName = ref('Pond A - Day 25')
const budget = ref(10000)
const fishCount = ref(1000)
const biomassTotal = ref('500 kg')
const pondHealth = ref('Optimal')

const waterQuality = ref({
    pH: 7.2,
    do: 6.5,
    temperature: 28,
    tds: 500,
    flocVolume: 30
})

const fishStatus = ref({
    averageSize: 12,
    survivalRate: 95,
    deadFish: 50
})

const eventLog = ref([
    'Added 50g probiotics to Pond A.',
    '1 fish died due to low oxygen levels.',
    'Completed daily feeding routine.'
])

const totalDays = ref(120)
const currentDay = ref(25)

const dailyTasks = ref([
    { name: 'Check aerator', completed: true },
    { name: 'Morning feeding', completed: true },
    { name: 'Water treatment', completed: false },
    { name: 'Evening feeding', completed: false }
])

const hasRandomEvent = ref(true)

const getMetricStatus = (value, min, max) => {
    if (value < min || value > max) return 'critical'
    if (value < min + (max - min) * 0.2 || value > max - (max - min) * 0.2) return 'warning'
    return 'optimal'
}

const checkPondCondition = () => {
    console.log('Checking pond condition')
    // Implement pond condition check logic
}

const manageInventory = () => {
    console.log('Managing inventory')
    // Implement inventory management logic
}

const handleRandomEvent = () => {
    console.log('Handling random event')
    // Implement random event handling logic
}

const addSupplies = () => {
    console.log('Adding supplies')
    // Implement add supplies logic
}

const analyzePond = () => {
    console.log('Analyzing pond')
    // Implement pond analysis logic
}

const fishSampling = () => {
    console.log('Performing fish sampling')
    // Implement fish sampling logic
}

const advanceDay = () => {
    console.log('Advancing to next day')
    // Implement day advancement logic
}
</script>

<style scoped>
/* Add any additional styles here */
</style>