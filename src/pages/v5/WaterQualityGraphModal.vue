<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Water Quality Trends</h2>
            <GraphComponent :data="data" />
            <button @click="$emit('close')"
                class="mt-6 w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition-colors duration-300">
                Close
            </button>
        </div>
    </div>
</template>

<script setup>
import GraphComponent from './GraphComponent.vue'

defineProps({
    data: Object
})
</script>