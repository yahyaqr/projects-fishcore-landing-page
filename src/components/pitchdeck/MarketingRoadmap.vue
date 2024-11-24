<template>
    <div class="relative">
        <div class="absolute h-1 w-full bg-blue-200 top-1/2 transform -translate-y-1/2"></div>
        <div class="relative flex justify-between">
            <div v-for="(milestone, index) in milestones" :key="index" class="text-center">
                <div
                    class="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2 relative z-10 flex items-center justify-center text-white font-bold">
                    {{ index + 1 }}
                </div>
                <h4 class="text-lg font-semibold mb-2 text-blue-800">{{ milestone.phase }}</h4>
                <ul class="text-sm text-gray-600">
                    <li v-for="(activity, actIndex) in milestone.activities" :key="actIndex" class="mb-1">
                        {{ activity }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    milestones: {
        type: Array,
        required: true
    }
})
</script>