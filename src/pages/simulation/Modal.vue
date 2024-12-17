<template>
    <div class="fixed inset-0 bg-black/30 flex items-center justify-center z-40" @click.self="$emit('close')">
        <div class="bg-white p-8 rounded-lg shadow-md w-1/3">
            <!-- Modal Title -->
            <h2 class="text-2xl text-center font-bold mb-4">{{ content }}</h2>
        </div>
    </div>
</template>

<script setup>
defineProps({
    content: {
        type: String,
        required: true,
    },
});
</script>
