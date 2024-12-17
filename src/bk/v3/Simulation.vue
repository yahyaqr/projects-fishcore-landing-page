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
            <!-- Left Sidebar Button -->
            <button @click="openMetricsModal"
                class="w-1/4 bg-[#F8F8F8] rounded-lg p-4 mr-4 hover:bg-[#E0E0E0] transition-colors duration-300">
                Open Metrics & Graphs
            </button>

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
                    <button @click="openFishSamplingModal"
                        class="absolute bottom-4 right-4 bg-[#41438A] text-[#F8F8F8] p-2 rounded-full hover:bg-[#0080FF] transition-colors duration-300">
                        <ScaleIcon size="24" />
                    </button>
                    <button v-if="hasRandomEvent" @click="openRandomEventModal"
                        class="absolute top-4 right-4 bg-[#FF4136] text-[#F8F8F8] p-2 rounded-full animate-pulse">
                        <AlertTriangleIcon size="24" />
                    </button>
                </div>

                <!-- Event Log and Timeline -->
                <div class="bg-[#F8F8F8] rounded-lg p-4">
                    <h2 class="text-xl font-bold text-[#41438A] mb-2 flex justify-between items-center">
                        Event Log
                        <button @click="toggleEventLog" class="text-sm text-[#41438A] hover:text-[#0080FF]">
                            {{ eventLogExpanded ? 'Collapse' : 'Expand' }}
                        </button>
                    </h2>
                    <div :class="{ 'h-32': !eventLogExpanded, 'h-64': eventLogExpanded }"
                        class="overflow-y-auto transition-all duration-300">
                        <table class="w-full text-sm">
                            <thead>
                                <tr>
                                    <th class="text-left">Date</th>
                                    <th class="text-left">Event</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(event, index) in eventLog" :key="index">
                                    <td>{{ event.date }}</td>
                                    <td>{{ event.description }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex items-center mt-4">
                        <span class="mr-2 text-sm">Day 1</span>
                        <input type="range" min="1" :max="totalDays" v-model="currentDay" class="flex-1" />
                        <span class="ml-2 text-sm">Day {{ totalDays }}</span>
                    </div>
                </div>
            </div>

            <!-- Right Sidebar Button -->
            <button @click="openActionsModal"
                class="w-1/4 bg-[#F8F8F8] rounded-lg p-4 ml-4 hover:bg-[#E0E0E0] transition-colors duration-300">
                Open Actions & Inventory
            </button>
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
                class="bg-[#41438A] text-[#F8F8F8] p-2 rounded-full hover:bg-[#0080FF] transition-colors duration-300">
                <HelpCircleIcon size="24" />
            </button>
        </div>
        <KnowledgeBaseSidebar v-if="showKnowledgeBase" @close="toggleKnowledgeBase" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { DollarSign, Fish, Weight, Activity, Package, AlertTriangle, Scale, HelpCircle } from 'lucide-vue-next'
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
const fishCount = ref(1000)
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
</script>

<style scoped>
/* Add any additional styles here */
</style>