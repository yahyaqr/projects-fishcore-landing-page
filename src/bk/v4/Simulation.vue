<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <!-- Top Bar -->
        <div class="flex justify-between items-center mb-8 px-4">
            <div class="flex items-center gap-4">
                <div class="bg-white rounded-full h-12 px-6 shadow-lg flex items-center gap-8">
                    <div class="text-center">
                        <div class="text-sm text-gray-500 h-4">Day</div>
                        <div class="text-xl font-bold text-gray-800 h-6">{{ currentDay }}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-sm text-gray-500 h-4">Fish</div>
                        <div class="text-xl font-bold text-gray-800 h-6">{{ fishCount }}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-sm text-gray-500 h-4">Biomass</div>
                        <div class="text-xl font-bold text-gray-800 h-6">{{ biomassTotal }}</div>
                    </div>
                </div>
                <button @click="advanceDay"
                    class="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 rounded-full shadow hover:scale-105 transition-all duration-200 flex items-center justify-center"
                    title="Advance Day">
                    <FastForward class="w-5 h-5" />
                </button>
            </div>

            <button @click="openActionsModal"
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
                    <!-- <div v-for="fish in fishPositions" :key="fish.id" class="absolute transition-all" :style="{
                            left: `${fish.x}%`,
                            top: `${fish.y}%`,
                            transform: `translate(-50%, -50%) scaleX(${fish.speedX > 0 ? 1 : -1}) rotate(${fish.rotation}deg)`,
                            transition: 'transform 0.5s, left 1s ease, top 1s ease'
                        }">
                        <Fish class="w-6 h-6 text-slate-900" />
                    </div> -->
                </div>
            </div>

            <!-- Right Health Panel Toggle -->
            <div class="absolute right-8 top-1/2 -translate-y-1/2">
                <button @click="openMetricsModal"
                    class="bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200">
                    <Activity class="w-6 h-6 text-blue-500" />
                </button>
            </div>
        </div>

        <!-- Bottom Controls -->
        <div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <!-- Event Log -->
            <div class="bg-white rounded-xl p-4 shadow-lg max-w-md w-full">
                <h2 class="text-xl font-bold text-gray-800 mb-2 flex justify-between items-center">
                    Event Log
                    <button @click="toggleEventLog" class="text-sm text-blue-500 hover:text-blue-600">
                        {{ eventLogExpanded ? 'Collapse' : 'Expand' }}
                    </button>
                </h2>
                <div :class="{ 'h-32': !eventLogExpanded, 'h-64': eventLogExpanded }"
                    class="overflow-y-auto transition-all duration-300">
                    <table class="w-full text-sm">
                        <tbody>
                            <tr v-for="(event, index) in eventLog" :key="index">
                                <td class="py-1 pr-2 text-gray-500">{{ event.date }}</td>
                                <td class="py-1">{{ event.description }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex items-center mt-4">
                    <span class="mr-2 text-sm text-gray-600">Day 1</span>
                    <input type="range" min="1" :max="totalDays" v-model="currentDay" class="flex-1" />
                    <span class="ml-2 text-sm text-gray-600">Day {{ totalDays }}</span>
                </div>
            </div>

            <!-- Random Event -->
            <div v-if="hasRandomEvent"
                class="bg-yellow-400 rounded-xl p-4 shadow-lg transform transition-all max-w-md w-full animate-bounce">
                <h3 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <AlertTriangle class="w-5 h-5" />
                    Random Event!
                </h3>
                <p class="text-gray-700">A sudden event has occurred in your pond!</p>
                <button @click="openRandomEventModal"
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
        <MetricsModal v-if="showMetricsModal" @close="closeMetricsModal" :waterQualityMetrics="waterQualityMetrics"
            :fishStatusMetrics="fishStatusMetrics" :growthData="growthData" :waterQualityData="waterQualityData" />
        <ActionsModal v-if="showActionsModal" @close="closeActionsModal" :inventory="inventory" :dailyTasks="dailyTasks"
            @open-supply-management="openSupplyManagementModal" @analyze-pond="analyzePond"
            @open-fish-sampling="openFishSamplingModal" @advance-day="advanceDay" />

        <!-- Notification System -->
        <div class="fixed top-4 right-4 z-50">
            <Notification v-for="notification in notifications" :key="notification.id" :notification="notification"
                @close="removeNotification(notification.id)" />
        </div>

        <!-- Knowledge Base Sidebar -->
        <div class="fixed bottom-4 right-4 z-40">
            <button @click="toggleKnowledgeBase"
                class="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300">
                <HelpCircle class="w-6 h-6" />
            </button>
        </div>
        <KnowledgeBaseSidebar v-if="showKnowledgeBase" @close="toggleKnowledgeBase" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { FastForward, ShoppingBag, Activity, AlertTriangle, Fish, HelpCircle } from 'lucide-vue-next'
import GameMetric from './GameMetric.vue'
import RandomEventModal from './RandomEventModal.vue'
import SupplyManagementModal from './SupplyManagementModal.vue'
import FishSamplingModal from './FishSamplingModal.vue'
import Notification from './Notification.vue'
import KnowledgeBaseSidebar from './KnowledgeBaseSidebar.vue'
import MetricsModal from './MetricsModal.vue'
import ActionsModal from './ActionsModal.vue'

const pondName = ref('Pond A - Day 25')
const budget = ref(10000)
const fishCount = ref(5)
const biomassTotal = ref('500 kg')
const pondHealth = ref('Optimal')

const waterQualityMetrics = ref([
    { label: 'pH', value: 7.2, unit: '', status: 'optimal' },
    { label: 'DO', value: 6.5, unit: 'mg/L', status: 'optimal' },
    { label: 'Temperature', value: 28, unit: '°C', status: 'optimal' },
    { label: 'TDS', value: 500, unit: 'ppm', status: 'warning' },
    { label: 'Floc Volume', value: 30, unit: 'mL/L', status: 'optimal' }
])

const fishStatusMetrics = ref([
    { label: 'Average Size', value: 12, unit: 'cm' },
    { label: 'Survival Rate', value: 95, unit: '%' },
    { label: 'Dead Fish', value: 50, unit: '' }
])

const eventLog = ref([
    { date: '2023-05-01', description: 'Added 50g probiotics to Pond A.' },
    { date: '2023-05-02', description: '1 fish died due to low oxygen levels.' },
    { date: '2023-05-03', description: 'Completed daily feeding routine.' }
])

const totalDays = ref(120)
const currentDay = ref(25)

const dailyTasks = ref([
    { name: 'Check aerator', completed: true },
    { name: 'Morning feeding', completed: true },
    { name: 'Water treatment', completed: false },
    { name: 'Evening feeding', completed: false }
])

const inventory = ref([
    { name: 'Fish Feed', quantity: 50, unit: 'kg' },
    { name: 'Probiotics', quantity: 5, unit: 'L' },
    { name: 'Salt', quantity: 20, unit: 'kg' },
    { name: 'Lime', quantity: 10, unit: 'kg' }
])

const hasRandomEvent = ref(true)
const showRandomEventModal = ref(false)
const showSupplyManagementModal = ref(false)
const showFishSamplingModal = ref(false)
const showMetricsModal = ref(false)
const showActionsModal = ref(false)
const currentRandomEvent = ref(null)

const eventLogExpanded = ref(false)

const notifications = ref([])
const showKnowledgeBase = ref(false)

const growthData = ref({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
        {
            label: 'Fish Growth',
            data: [2, 4, 7, 12],
            borderColor: '#41438A',
            backgroundColor: 'rgba(65, 67, 138, 0.2)',
        }
    ]
})

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

// Fish positions
const fishPositions = ref([])

const checkPondCondition = () => {
    console.log('Checking pond condition')
    addNotification('Pond condition check completed. pH levels are optimal.')
}

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

const openMetricsModal = () => {
    showMetricsModal.value = true
}

const closeMetricsModal = () => {
    showMetricsModal.value = false
}

const openActionsModal = () => {
    showActionsModal.value = true
}

const closeActionsModal = () => {
    showActionsModal.value = false
}

const analyzePond = () => {
    console.log('Analyzing pond')
    addNotification('Pond analysis complete. Water quality is within acceptable parameters.')
}

const advanceDay = () => {
    console.log('Advancing to next day')
    currentDay.value++
    if (currentDay.value > totalDays.value) {
        addNotification(`Simulation complete! You've reached the end of the cycle.`)
    } else {
        addNotification(`Advanced to Day ${currentDay.value}`)
    }
    updateFishPositions()
    if (Math.random() < 0.2) {
        triggerRandomEvent()
    }
}

const toggleEventLog = () => {
    eventLogExpanded.value = !eventLogExpanded.value
}

const updateInventory = (newInventory) => {
    inventory.value = newInventory
}

const updateFishStats = (newStats) => {
    fishCount.value = newStats.count
    biomassTotal.value = `${newStats.biomass} kg`
    fishStatusMetrics.value[0].value = newStats.averageSize
}

const addNotification = (message) => {
    const id = Date.now()
    notifications.value.push({ id, message })
    setTimeout(() => removeNotification(id), 5000)
}

const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
}

const toggleKnowledgeBase = () => {
    showKnowledgeBase.value = !showKnowledgeBase.value
}

const triggerRandomEvent = () => {
    hasRandomEvent.value = true
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

// Left actions
const leftActions = [
    { name: 'Feed Fish', icon: Fish, colorClass: 'text-orange-500', handler: () => console.log('Feeding fish') },
    { name: 'Check Water', icon: Activity, colorClass: 'text-blue-500', handler: checkPondCondition },
    { name: 'Manage Pond', icon: ShoppingBag, colorClass: 'text-green-500', handler: openActionsModal },
]

// Lifecycle hooks
onMounted(() => {
    updateFishPositions()
    const interval = setInterval(updateFishPositions, 5000)
    onUnmounted(() => clearInterval(interval))
})
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