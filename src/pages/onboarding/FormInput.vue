<template>
    <div class="space-y-1">
        <label :for="id" class="text-sm font-medium text-[#41438A]">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <input :id="id" :type="type" :value="modelValue" @input="updateValue($event.target.value)"
            :placeholder="placeholder" :required="required"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#41438A] focus:outline-none transition-all duration-300 bg-white text-[#353535] border-[#d1d5db] shadow-sm" />
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: [String, Number],
        required: true
    },
    label: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text'
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
        default: () => `input-${Math.random().toString(36).substr(2, 9)}`
    }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (value) => {
    emit('update:modelValue', value)
}
</script>
