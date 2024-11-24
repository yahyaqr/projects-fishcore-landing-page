<template>
    <nav class="bg-white shadow-md fixed w-full z-10 transition-all duration-300"
        :class="{ 'shadow-glow-sm': scrolled }">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 class="text-2xl font-bold text-[#41438A]">Fishcore</h1>
            <div class="relative">
                <!-- Display current active link -->
                <button @click="toggleDropdown"
                    class="text-sm font-medium tracking-wide text-gray-600 uppercase focus:outline-none">
                    {{ getActiveLinkName }}
                </button>
                <div v-if="dropdownOpen"
                    class="absolute right-0 mt-2 w-48 bg-white text-gray-600 rounded-md shadow-lg z-20">
                    <div v-for="item in sections" :key="item.id">
                        <a :href="`#${item.id}`"
                            :class="['block px-4 py-2 text-sm hover:text-[#41438A] hover:bg-gray-100 transition-colors relative group', { 'text-[#41438A]': activeId === item.id }]"
                            @click="setActive(item.id); closeDropdown">
                            {{ item.title }}
                            <span
                                class="absolute left-0 right-0 bottom-0 h-0.5 bg-[#41438A] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                                :class="{ 'scale-x-100': activeId === item.id }"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// Define sections (same as provided in the original Fishcore example)
const sections = ref([
    { id: 'home', title: 'Home' },
    { id: 'problem', title: 'Problem' },
    { id: 'solution', title: 'Solution' },
    { id: 'features', title: 'Features' },
    { id: 'segmentation', title: 'Segmentation' },
    { id: 'business', title: 'Business Model' },
    { id: 'competitive', title: 'Competitive Adv.' },
    { id: 'market', title: 'Market' },
    { id: 'timeline', title: 'Timeline' },
]);

// Reactive state
const activeId = ref('home'); // Default active section
const dropdownOpen = ref(false);

// Toggle dropdown
const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

// Close dropdown
const closeDropdown = () => {
    dropdownOpen.value = false;
};

// Get the name of the active link
const getActiveLinkName = computed(() => {
    const activeItem = sections.value.find(item => item.id === activeId.value);
    return activeItem ? activeItem.title : 'Menu'; // Fallback to 'Menu'
});

// Set active link
const setActive = (id) => {
    activeId.value = id;
    closeDropdown();
};

// Check which section is in view
const checkActiveSection = () => {
    sections.value.forEach(item => {
        const section = document.getElementById(item.id);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                activeId.value = item.id;
            }
        }
    });
};

// Lifecycle hooks
onMounted(() => {
    window.addEventListener('scroll', checkActiveSection);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', checkActiveSection);
});
</script>

<style scoped>
.shadow-glow-sm {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.2);
    /* Blue shadow */
}

.group-hover .scale-x-100 {
    transition-transform: scaleX(1);
}
</style>
