<template>
    <div class="hoverable-image absolute" style="top: 319.7px; left: 231.82px;" @click="$emit('click', 'SOP')">
        <img src="../../assets/SOP.png" alt="SOP"
            class="max-w-[109.36px] max-h-[77.28px] object-contain hoverable-group" />
    </div>
</template>

<script setup>
defineEmits(["click"]);
</script>

<style scoped>
.hoverable-group {
    pointer-events: visiblePainted;
    cursor: pointer;
    transition: filter 0.3s ease-in-out;
}

.hoverable-group:hover {
    filter: drop-shadow(0 0 15px rgba(59, 130, 246, 1));
}
</style>
