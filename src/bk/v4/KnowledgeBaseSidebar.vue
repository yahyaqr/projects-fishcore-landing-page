<template>
    <div class="fixed right-0 top-0 h-full w-80 bg-[#F8F8F8] shadow-lg p-6 overflow-y-auto z-40">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-[#41438A]">Knowledge Base</h2>
            <button @click="close" class="text-[#353535] hover:text-[#0080FF]">
                <XIcon size="24" />
            </button>
        </div>
        <input v-model="searchQuery" type="text" placeholder="Search..."
            class="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#41438A]">
        <ul class="space-y-4">
            <li v-for="item in filteredItems" :key="item.id">
                <h3 @click="toggleItem(item)"
                    class="text-lg font-semibold text-[#41438A] cursor-pointer hover:text-[#0080FF]">
                    {{ item.title }}
                </h3>
                <p v-if="item.expanded" class="mt-2 text-[#353535]">{{ item.content }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XIcon } from 'lucide-vue-next'

const emit = defineEmits(['close'])

const searchQuery = ref('')

const knowledgeBaseItems = [
    { id: 1, title: 'Water Quality Management', content: 'Maintaining good water quality is crucial for fish health...', expanded: false },
    { id: 2, title: 'Feeding Techniques', content: 'Proper feeding techniques ensure optimal growth and health...', expanded: false },
    { id: 3, title: 'Disease Prevention', content: 'Preventing diseases is easier and more cost-effective than treating them...', expanded: false },
    // Add more items as needed
]

const filteredItems = computed(() => {
    return knowledgeBaseItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const toggleItem = (item) => {
    item.expanded = !item.expanded
}

const close = () => {
    emit('close')
}
</script>