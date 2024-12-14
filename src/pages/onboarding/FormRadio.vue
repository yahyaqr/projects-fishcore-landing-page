<template>
    <div class="space-y-1">
        <label class="text-sm font-medium text-[#41438A]">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>
        <div class="space-y-2">
            <div v-for="option in options" :key="option" class="flex items-center space-x-2 cursor-pointer">
                <input :id="`${id}-${option}`" type="radio" :value="option" :checked="modelValue === option"
                    @change="updateValue(option)" :required="required"
                    class="form-radio text-[#41438A] focus:ring-[#41438A]" />
                <label :for="`${id}-${option}`" class="text-sm text-[#353535]">
                    {{ option }}
                </label>
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
        default: () => `radio-${Math.random().toString(36).substr(2, 9)}`
    }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (value) => {
    emit('update:modelValue', value)
}
</script>
