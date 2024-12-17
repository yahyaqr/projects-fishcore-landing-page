<template>
    <div class="space-y-1">
        <label :for="id" class="text-sm font-medium text-[#333333]">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <div class="relative">
            <select :id="id" :value="modelValue" @change="updateValue($event.target.value)" :required="required"
                class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#41438A] focus:outline-none transition-all duration-300 bg-white text-[#353535] border-[#d1d5db] shadow-sm appearance-none pr-10">
                <option value="" disabled>Select {{ label }}</option>
                <option v-for="option in options" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
            <!-- Custom dropdown icon -->
            <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: String,
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
        default: () => `select-${Math.random().toString(36).substr(2, 9)}`
    }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (value) => {
    emit('update:modelValue', value)
}
</script>
