<template>
    <div class="space-y-1">
        <label :for="id" class="text-sm font-medium text-[#41438A]">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <select :id="id" :value="modelValue" @change="updateValue($event.target.value)" :required="required"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#41438A] focus:outline-none transition-all duration-300 bg-white text-[#353535] border-[#d1d5db] shadow-sm">
            <option value="" disabled>Select {{ label }}</option>
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
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
