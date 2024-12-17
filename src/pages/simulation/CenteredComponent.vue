<template>
    <div class="absolute inset-0 flex items-center justify-center">
        <div class="relative  w-[650px] h-[513.99px]">
            <Pond class="z-20" @click="handleClick" />
            <Aerator class="z-10" @click="handleClick" />
            <Overflow class="z-10" @click="handleClick" />
            <SOP class="z-30" @click="handleClick" />
        </div>
    </div>
</template>

<script setup>
import Pond from "./Pond.vue";
import Aerator from "./Aerator.vue";
import Overflow from "./Overflow.vue";
import SOP from "./SOP.vue";

const emit = defineEmits(["click"]);

const handleClick = (content) => {
    emit("click", content);
};
</script>

<style scoped>
/* Modal styles */
.fixed {
    position: fixed;
}

.bg-black {
    background-color: black;
}

.bg-opacity-50 {
    opacity: 0.5;
}
</style>
