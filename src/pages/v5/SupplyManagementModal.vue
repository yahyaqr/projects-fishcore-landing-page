<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-[#F8F8F8] rounded-lg p-6 max-w-2xl w-full">
            <h2 class="text-2xl font-bold text-[#41438A] mb-4">Supply Management</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div v-for="item in inventory" :key="item.name" class="bg-white p-4 rounded-lg shadow">
                    <h3 class="text-lg font-semibold text-[#41438A] mb-2">{{ item.name }}</h3>
                    <div class="flex justify-between items-center">
                        <span class="text-[#353535]">Current: {{ item.quantity }} {{ item.unit }}</span>
                        <div class="flex items-center">
                            <button @click="decreaseQuantity(item)"
                                class="bg-[#41438A] text-white w-8 h-8 rounded-l">-</button>
                            <input v-model="item.newQuantity" type="number"
                                class="w-16 text-center border-t border-b border-[#41438A]" min="0">
                            <button @click="increaseQuantity(item)"
                                class="bg-[#41438A] text-white w-8 h-8 rounded-r">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end space-x-4">
                <button @click="close"
                    class="bg-gray-300 text-[#353535] p-2 rounded hover:bg-gray-400 transition-colors duration-300">
                    Cancel
                </button>
                <button @click="saveChanges"
                    class="bg-[#0080FF] text-[#F8F8F8] p-2 rounded hover:bg-[#41438A] transition-colors duration-300">
                    Save Changes
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    inventory: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['close', 'update-inventory'])

const localInventory = ref([])

onMounted(() => {
    localInventory.value = props.inventory.map(item => ({
        ...item,
        newQuantity: item.quantity
    }))
})

const decreaseQuantity = (item) => {
    if (item.newQuantity > 0) {
        item.newQuantity--
    }
}

const increaseQuantity = (item) => {
    item.newQuantity++
}

const saveChanges = () => {
    const updatedInventory = localInventory.value.map(item => ({
        ...item,
        quantity: item.newQuantity
    }))
    emit('update-inventory', updatedInventory)
    close()
}

const close = () => {
    emit('close')
}
</script>