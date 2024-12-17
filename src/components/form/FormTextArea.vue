<template>
    <div class="space-y-1">
        <label :for="id" class="text-sm font-medium text-[#333333]">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <textarea :id="id" :placeholder="placeholder" :required="required" :value="modelValue"
            @input="updateValue($event.target.value)" rows="4"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#41438A] focus:outline-none transition-all duration-300 bg-white text-[#353535] border-[#d1d5db] shadow-sm"></textarea>
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
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        default: () => `textarea-${Math.random().toString(36).substr(2, 9)}`
    }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (value) => {
    emit('update:modelValue', value)
}
</script>
