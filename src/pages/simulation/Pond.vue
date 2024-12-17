<template>
    <div class="hoverable-image absolute" style="top: 131.14px; left: 0.46px;" @click="$emit('click', 'Pond')">
        <img src="../../assets/Pond2.png" alt="Pond"
            class="max-w-[572.08px] max-h-[382.76px] object-contain hoverable-group" />
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
