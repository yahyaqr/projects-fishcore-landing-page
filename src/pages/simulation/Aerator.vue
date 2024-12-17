<template>
    <div class="hoverable-image absolute" style="top: 0.2px; left: 416.19px;" @click="$emit('click', 'Aerator')">
        <img src="../../assets/Aerator.png" alt="Aerator"
            class="max-w-[123.03px] max-h-[214.35px] object-contain hoverable-group" />
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
