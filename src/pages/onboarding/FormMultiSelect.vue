<template>
    <div class="space-y-1">
        <label :for="id" class="text-sm font-medium text-[#41438A]">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <div tabindex="0"
            class="w-full border rounded-lg focus:ring-2 focus:ring-[#41438A] focus:outline-none transition-all duration-300 bg-white text-[#353535] border-[#d1d5db] shadow-sm relative">
            <div class="flex items-center justify-between px-4 py-2 cursor-pointer" @click="toggleDropdown">
                <span>
                    {{ selectedOptions.length > 0
            ? selectedOptions.join(', ')
            : `Select ${label}` }}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <div v-show="dropdownOpen"
                class="absolute left-0 right-0 bg-white border border-[#d1d5db] rounded-lg shadow-md z-10">
                <ul class="max-h-40 overflow-auto">
                    <li v-for="option in options" :key="option"
                        class="px-4 py-2 hover:bg-[#ede9ff] cursor-pointer flex items-center space-x-2"
                        @click="toggleOption(option)">
                        <input type="checkbox" class="form-checkbox" :checked="modelValue.includes(option)" />
                        <span>{{ option }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: Array,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: () => `multi-select-${Math.random().toString(36).substr(2, 9)}`
    }
})

const emit = defineEmits(['update:modelValue'])

const dropdownOpen = ref(false)

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value
}

const toggleOption = (option) => {
    const selected = [...props.modelValue]
    const index = selected.indexOf(option)
    if (index === -1) {
        selected.push(option)
    } else {
        selected.splice(index, 1)
    }
    emit('update:modelValue', selected)
}

const selectedOptions = computed(() => props.modelValue)
</script>
