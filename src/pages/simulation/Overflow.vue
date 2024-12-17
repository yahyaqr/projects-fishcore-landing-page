<template>
    <div class="hoverable-image absolute" style="top: 233.98px; left: 480.56px;" @click="$emit('click', 'Overflow')">
        <img src="../../assets/Overflow.png" alt="Overflow"
            class="max-w-[168.92px] max-h-[245.36px] object-contain hoverable-group" />
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
