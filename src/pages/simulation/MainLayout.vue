<template>
    <div class="relative h-screen bg-gray-50 overflow-hidden">
        <!-- Background -->
        <Background class="z-0" />

        <!-- Centered Component -->
        <CenteredComponent class="z-10" @click="openModal" />

        <!-- Button Layouts (Top Bar, Sidebars, Bottom Section) -->
        <ButtonLayouts class="z-20" @click="openModal" />

        <!-- Modals -->
        <Modal v-if="showModal" :content="modalContent" @close="closeModal" class="z-30" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Components
import Background from './Background.vue';
import ButtonLayouts from './ButtonLayouts.vue';
import CenteredComponent from './CenteredComponent.vue';
import Modal from './Modal.vue';

// Modal State Management
const showModal = ref(false);
const modalContent = ref("");

// Close the modal
const closeModal = () => {
    showModal.value = false;
    modalContent.value = "";
};

// Open the modal with content
const openModal = (content) => {
    modalContent.value = `${content}`;
    showModal.value = true;
};
</script>
