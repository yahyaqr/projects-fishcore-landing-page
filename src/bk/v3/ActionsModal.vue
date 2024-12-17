<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-[#F8F8F8] rounded-lg p-6 max-w-2xl w-full overflow-y-auto max-h-[90vh]">
            <h2 class="text-2xl font-bold text-[#41438A] mb-4">Actions & Inventory</h2>
            <TabGroup>
                <TabList class="flex mb-4">
                    <Tab class="flex-1 py-2 px-4 text-center bg-[#41438A] text-[#F8F8F8] rounded-tl-lg rounded-tr-lg"
                        :class="{ 'bg-[#0080FF]': activeTab === 'actions' }" @click="activeTab = 'actions'">Actions
                    </Tab>
                    <Tab class="flex-1 py-2 px-4 text-center bg-[#41438A] text-[#F8F8F8] rounded-tl-lg rounded-tr-lg"
                        :class="{ 'bg-[#0080FF]': activeTab === 'inventory' }" @click="activeTab = 'inventory'">
                        Inventory</Tab>
                </TabList>
                <TabPanel v-if="activeTab === 'actions'">
                    <button @click="$emit('open-supply-management')"
                        class="w-full bg-[#41438A] text-[#F8F8F8] p-2 rounded mb-4 hover:bg-[#0080FF] transition-colors duration-300">Add
                        Supplies</button>
                    <button @click="$emit('analyze-pond')"
                        class="w-full bg-[#41438A] text-[#F8F8F8] p-2 rounded mb-4 hover:bg-[#0080FF] transition-colors duration-300">Analyze
                        Pond</button>
                    <button @click="$emit('open-fish-sampling')"
                        class="w-full bg-[#41438A] text-[#F8F8F8] p-2 rounded mb-4 hover:bg-[#0080FF] transition-colors duration-300">Fish
                        Sampling</button>

                    <div class="mb-4">
                        <h3 class="text-lg font-bold text-[#41438A] mb-2">Daily Tasks</h3>
                        <ul>
                            <li v-for="(task, index) in dailyTasks" :key="index" class="flex items-center mb-2">
                                <input type="checkbox" v-model="task.completed" class="mr-2" />
                                <span :class="{ 'line-through': task.completed }">{{ task.name }}</span>
                            </li>
                        </ul>
                    </div>

                    <button @click="$emit('advance-day')"
                        class="w-full bg-[#0080FF] text-[#F8F8F8] p-2 rounded hover:bg-[#41438A] transition-colors duration-300">Advance
                        Day</button>
                </TabPanel>
                <TabPanel v-if="activeTab === 'inventory'">
                    <h3 class="text-lg font-bold text-[#41438A] mb-2">Inventory</h3>
                    <table class="w-full text-sm">
                        <thead>
                            <tr>
                                <th class="text-left">Item</th>
                                <th class="text-right">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in inventory" :key="item.name">
                                <td>{{ item.name }}</td>
                                <td class="text-right">{{ item.quantity }} {{ item.unit }}</td>
                            </tr>
                        </tbody>
                    </table>
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

const props = defineProps({
    inventory: Array,
    dailyTasks: Array
})

const activeTab = ref('actions')
</script>