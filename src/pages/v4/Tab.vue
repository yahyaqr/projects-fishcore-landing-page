<template>
    <button :class="{ 'tab-selected': isSelected }" role="tab" :aria-selected="isSelected" @click="selectTab">
        <slot></slot>
    </button>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
    index: {
        type: Number,
        required: true
    }
})

const selectedIndex = inject('selectedIndex')
const setSelectedIndex = inject('setSelectedIndex')

const isSelected = computed(() => selectedIndex.value === props.index)

const selectTab = () => {
    setSelectedIndex(props.index)
}
</script>

<style scoped>
.tab-selected {
    /* Add your selected tab styles here */
    background-color: #0080FF;
    color: #F8F8F8;
}
</style>