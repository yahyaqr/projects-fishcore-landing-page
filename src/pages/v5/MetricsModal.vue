<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-[#F8F8F8] rounded-lg p-6 max-w-2xl w-full overflow-y-auto max-h-[90vh]">
            <h2 class="text-2xl font-bold text-[#41438A] mb-4">Metrics & Graphs</h2>
            <TabGroup>
                <TabList class="flex mb-4">
                    <Tab class="flex-1 py-2 px-4 text-center bg-[#41438A] text-[#F8F8F8] rounded-tl-lg rounded-tr-lg"
                        :class="{ 'bg-[#0080FF]': activeTab === 'metrics' }" @click="activeTab = 'metrics'">Metrics
                    </Tab>
                    <Tab class="flex-1 py-2 px-4 text-center bg-[#41438A] text-[#F8F8F8] rounded-tl-lg rounded-tr-lg"
                        :class="{ 'bg-[#0080FF]': activeTab === 'graphs' }" @click="activeTab = 'graphs'">Graphs</Tab>
                </TabList>
                <TabPanel v-if="activeTab === 'metrics'">
                    <h3 class="text-xl font-bold text-[#41438A] mb-4">Water Quality</h3>
                    <WaterQualityMetric v-for="metric in waterQualityMetrics" :key="metric.label" v-bind="metric" />

                    <h3 class="text-xl font-bold text-[#41438A] mt-6 mb-4">Fish Status</h3>
                    <FishStatusMetric v-for="metric in fishStatusMetrics" :key="metric.label" v-bind="metric" />
                </TabPanel>
                <TabPanel v-if="activeTab === 'graphs'">
                    <h3 class="text-xl font-bold text-[#41438A] mb-4">Growth Trends</h3>
                    <GraphComponent :data="growthData" />
                    <h3 class="text-xl font-bold text-[#41438A] mt-6 mb-4">Water Quality Trends</h3>
                    <GraphComponent :data="waterQualityData" />
                </TabPanel>
            </TabGroup>
            <button @click="$emit('close')"
                class="mt-6 w-full bg-[#0080FF] text-[#F8F8F8] p-2 rounded hover:bg-[#41438A] transition-colors duration-300">
                Close
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import TabGroup from './TabGroup.vue'
import TabList from './TabList.vue'
import Tab from './Tab.vue'
import TabPanel from './TabPanel.vue'
import WaterQualityMetric from './WaterQualityMetric.vue'
import FishStatusMetric from './FishStatusMetric.vue'
import GraphComponent from './GraphComponent.vue'

const props = defineProps({
    waterQualityMetrics: Array,
    fishStatusMetrics: Array,
    growthData: Object,
    waterQualityData: Object
})

const activeTab = ref('metrics')
</script>