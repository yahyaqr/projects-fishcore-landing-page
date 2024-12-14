<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <!-- Top Bar -->
        <div class="flex justify-between items-center mb-8 px-4">
            <div class="flex items-center gap-4">
                <div class="bg-white rounded-full h-12 px-6 shadow-lg flex items-center gap-8">
                    <div class="text-center">
                        <div class="text-sm text-gray-500 h-4">Day</div>
                        <div class="text-xl font-bold text-gray-800 h-6">{{ day }}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-sm text-gray-500 h-4">Fish</div>
                        <div class="text-xl font-bold text-gray-800 h-6">{{ fishCount }}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-sm text-gray-500 h-4">Biomass</div>
                        <div class="text-xl font-bold text-gray-800 h-6">{{ biomass.toFixed(1) }}kg</div>
                    </div>
                </div>
                <button @click="advanceDay"
                    class="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-full shadow hover:scale-105 transition-all duration-200 flex items-center justify-center"
                    title="Advance Day">
                    <FastForward class="w-5 h-5" />
                </button>
            </div>

            <button
                class="bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-full h-12 px-6 shadow-lg flex items-center gap-2 transition-all">
                <ShoppingBag class="w-5 h-5" />
                Inventory
            </button>
        </div>

        <div class="relative flex justify-center items-center min-h-[calc(100vh-12rem)]">
            <!-- Left Controls -->
            <div class="absolute left-8 top-1/2 -translate-y-1/2 space-y-8">
                <button v-for="action in leftActions" :key="action.name" @click="action.handler"
                    class="group relative bg-white w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all duration-200 flex items-center justify-center"
                    :class="action.colorClass">
                    <component :is="action.icon" class="w-6 h-6" />
                    <div
                        class="opacity-0 group-hover:opacity-100 absolute left-full ml-3 bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-opacity z-10">
                        {{ action.name }}
                    </div>
                </button>
            </div>

            <!-- Main Pond -->
            <div class="relative w-[500px] h-[500px]">
                <div
                    class="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-2xl overflow-hidden">
                    <!-- Water Effect -->
                    <div class="absolute inset-0 opacity-30">
                        <div v-for="i in 3" :key="i" class="absolute inset-0 animate-wave"
                            :style="{ animationDelay: `${i * 0.5}s` }">
                        </div>
                    </div>

                    <!-- Fish -->
                    <div v-for="fish in fishPositions" :key="fish.id" class="absolute transition-all" :style="{
                            left: `${fish.x}%`,
                            top: `${fish.y}%`,
                            transform: `translate(-50%, -50%) scaleX(${fish.speedX > 0 ? 1 : -1}) rotate(${fish.rotation}deg)`,
                            transition: 'transform 0.5s, left 1s ease, top 1s ease'
                        }">
                        <Fish class="w-6 h-6 text-slate-900" />
                    </div>
                </div>
            </div>

            <!-- Right Sidebar Buttons -->
            <div class="absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
                <button @click="openWaterQualityModal"
                    class="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200">
                    <Droplet class="w-6 h-6 text-blue-500" />
                </button>
                <button @click="openFishStatusModal"
                    class="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200">
                    <Fish class="w-6 h-6 text-green-500" />
                </button>
                <button @click="openGrowthGraphModal"
                    class="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200">
                    <TrendingUp class="w-6 h-6 text-purple-500" />
                </button>
                <button @click="openWaterQualityGraphModal"
                    class="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200">
                    <BarChart class="w-6 h-6 text-orange-500" />
                </button>
            </div>

            <!-- Right Health Panel Toggle -->
            <div class="absolute right-8 top-1/2 -translate-y-1/2">
                <button @click="toggleHealth"
                    class="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200">
                    <Activity class="w-6 h-6 text-blue-500" />
                </button>
            </div>

            <!-- Floating Health Panel -->
            <div v-if="showHealth"
                class="absolute right-24 top-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-lg space-y-4 w-72 transform transition-all duration-300"
                :class="showHealth ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'">
                <h2 class="text-gray-800 font-semibold flex items-center gap-2">
                    <Activity class="w-5 h-5 text-blue-500" />
                    Pond Health
                </h2>
                <div v-for="metric in metrics" :key="metric.name" class="space-y-1">
                    <div class="flex justify-between text-sm text-gray-600">
                        <span class="flex items-center gap-1">
                            <component :is="metric.icon" class="w-4 h-4" />
                            {{ metric.name }}
                        </span>
                        <span>{{ metric.value }}{{ metric.unit }}</span>
                    </div>
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div class="h-full transition-all duration-500" :class="metric.colorClass"
                            :style="{ width: `${metric.percentage}%` }">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Controls -->
        <div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <!-- Random Event -->
            <div v-if="currentEvent" class="bg-yellow-400 rounded-xl p-4 shadow-lg transform transition-all max-w-md"
                :class="{ 'animate-bounce': isNewEvent }">
                <h3 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <AlertTriangle class="w-5 h-5" />
                    Random Event!
                </h3>
                <p class="text-gray-700">{{ currentEvent }}</p>
                <button @click="handleEvent"
                    class="mt-3 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                    Handle Event
                </button>
            </div>
        </div>

        <!-- Modals -->
        <RandomEventModal v-if="showRandomEventModal" @close="closeRandomEventModal" :event="currentRandomEvent" />
        <SupplyManagementModal v-if="showSupplyManagementModal" @close="closeSupplyManagementModal"
            :inventory="inventory" @update-inventory="updateInventory" />
        <FishSamplingModal v-if="showFishSamplingModal" @close="closeFishSamplingModal"
            @update-fish-stats="updateFishStats" />
        <ActionsModal v-if="showActionsModal" @close="closeActionsModal" :inventory="inventory" :dailyTasks="dailyTasks"
            @open-supply-management="openSupplyManagementModal" @analyze-pond="analyzePond"
            @open-fish-sampling="openFishSamplingModal" @advance-day="advanceDay" />

        <!-- New Modals -->
        <WaterQualityModal v-if="showWaterQualityModal" @close="closeWaterQualityModal"
            :metrics="waterQualityMetrics" />
        <FishStatusModal v-if="showFishStatusModal" @close="closeFishStatusModal" :metrics="fishStatusMetrics" />
        <GrowthGraphModal v-if="showGrowthGraphModal" @close="closeGrowthGraphModal" :data="growthData" />
        <WaterQualityGraphModal v-if="showWaterQualityGraphModal" @close="closeWaterQualityGraphModal"
            :data="waterQualityData" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FastForward, ShoppingBag, Activity, AlertTriangle, Fish, Thermometer, Droplet, Zap, TrendingUp, BarChart } from 'lucide-vue-next'
import RandomEventModal from './RandomEventModal.vue'
import SupplyManagementModal from './SupplyManagementModal.vue'
import FishSamplingModal from './FishSamplingModal.vue'
import ActionsModal from './ActionsModal.vue'
import WaterQualityModal from './WaterQualityModal.vue'
import FishStatusModal from './FishStatusModal.vue'
import GrowthGraphModal from './GrowthGraphModal.vue'
import WaterQualityGraphModal from './WaterQualityGraphModal.vue'
import GameMetric from './GameMetric.vue'
import Notification from './Notification.vue'
import KnowledgeBaseSidebar from './KnowledgeBaseSidebar.vue'


// State
const day = ref(1)
const fishCount = ref(5)
const biomass = ref(50)
const showHealth = ref(false)
const currentEvent = ref(null)
const isNewEvent = ref(false)

// Fish positions
const fishPositions = ref([])

// Metrics
const metrics = ref([
    { name: 'Temperature', value: 25, unit: '°C', percentage: 70, icon: Thermometer, colorClass: 'bg-green-500' },
    { name: 'Oxygen', value: 7.5, unit: 'mg/L', percentage: 85, icon: Droplet, colorClass: 'bg-blue-500' },
    { name: 'pH', value: 7.2, unit: '', percentage: 90, icon: Zap, colorClass: 'bg-yellow-500' },
])

// Left actions
const leftActions = [
    { name: 'Feed Fish', icon: Fish, colorClass: 'text-orange-500', handler: () => console.log('Feeding fish') },
    { name: 'Check Water', icon: Droplet, colorClass: 'text-blue-500', handler: () => console.log('Checking water') },
    { name: 'Manage Pond', icon: Activity, colorClass: 'text-green-500', handler: () => console.log('Managing pond') },
]

// Methods
const advanceDay = () => {
    day.value++
    updateFishPositions()
    if (Math.random() < 0.2) {
        triggerRandomEvent()
    }
}

const toggleHealth = () => {
    showHealth.value = !showHealth.value
}

const handleEvent = () => {
    console.log('Handling event:', currentEvent.value)
    currentEvent.value = null
}

const triggerRandomEvent = () => {
    const events = [
        'Sudden temperature drop!',
        'Algae bloom detected!',
        'Fish showing unusual behavior.',
        'Water pump malfunction!',
    ]
    currentEvent.value = events[Math.floor(Math.random() * events.length)]
    isNewEvent.value = true
    setTimeout(() => {
        isNewEvent.value = false
    }, 1000)
}

const updateFishPositions = () => {
    fishPositions.value = Array.from({ length: fishCount.value }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
    }))
}

const waterQualityData = ref({
    labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25'],
    datasets: [
        {
            label: 'pH',
            data: [7.0, 7.2, 7.1, 7.3, 7.2, 7.2],
            borderColor: '#41438A',
            backgroundColor: 'rgba(65, 67, 138, 0.2)',
        },
        {
            label: 'Dissolved Oxygen',
            data: [5.5, 6.0, 6.2, 6.5, 6.3, 6.5],
            borderColor: '#0080FF',
            backgroundColor: 'rgba(0, 128, 255, 0.2)',
        }
    ]
})

// Lifecycle hooks
onMounted(() => {
    updateFishPositions()
    const interval = setInterval(updateFishPositions, 5000)
    onUnmounted(() => clearInterval(interval))
})

// New modal states
const showRandomEventModal = ref(false)
const showSupplyManagementModal = ref(false)
const showFishSamplingModal = ref(false)
const showActionsModal = ref(false)
const showWaterQualityModal = ref(false)
const showFishStatusModal = ref(false)
const showGrowthGraphModal = ref(false)
const showWaterQualityGraphModal = ref(false)

const openRandomEventModal = () => {
    currentRandomEvent.value = {
        title: 'Sudden pH Drop',
        description: 'The pH levels in your pond have suddenly dropped. Quick action is required!',
        options: [
            { text: 'Add lime to increase pH', effect: `This will stabilize pH but may stress the fish.` },
            {
                text: 'Increase aeration', effect: `This may help but won't directly address the pH issue.`
            },
            { text: 'Do nothing and monitor', effect: `This is risky and may lead to fish deaths if pH doesn't stabilize.` }
        ]
    }
    showRandomEventModal.value = true
}

const closeRandomEventModal = () => {
    showRandomEventModal.value = false
    hasRandomEvent.value = false
}

const openSupplyManagementModal = () => {
    showSupplyManagementModal.value = true
}

const closeSupplyManagementModal = () => {
    showSupplyManagementModal.value = false
}

const openFishSamplingModal = () => {
    showFishSamplingModal.value = true
}

const closeFishSamplingModal = () => {
    showFishSamplingModal.value = false
}

const closeActionsModal = () => {
    showActionsModal.value = false
}

// New modal open/close functions
const openWaterQualityModal = () => {
    showWaterQualityModal.value = true
}

const closeWaterQualityModal = () => {
    showWaterQualityModal.value = false
}

const openFishStatusModal = () => {
    showFishStatusModal.value = true
}

const closeFishStatusModal = () => {
    showFishStatusModal.value = false
}

const openGrowthGraphModal = () => {
    showGrowthGraphModal.value = true
}

const closeGrowthGraphModal = () => {
    showGrowthGraphModal.value = false
}

const openWaterQualityGraphModal = () => {
    showWaterQualityGraphModal.value = true
}

const closeWaterQualityGraphModal = () => {
    showWaterQualityGraphModal.value = false
}

</script>

<style scoped>
@keyframes wave {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animate-wave {
    animation: wave 3s ease-in-out infinite;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
}
</style>