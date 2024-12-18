<template>
    <nav class="fixed w-full z-10 transition-all duration-300 flex items-center justify-between px-4" :class="{
        'bg-white text-gray-600 shadow-md py-2': scrolled,
        'bg-white/5 text-white py-4': !scrolled,
    }" @mouseleave="closeDropdown">
        <!-- Logo -->
        <img src="../assets/Logo Fishcore.png" alt="Fishcore Logo" class="h-8 transition-all duration-300" :class="{
        'filter brightness-0 invert': !scrolled,
        'filter-none': scrolled,
        'h-6': scrolled,
    }" />

        <!-- Dropdown -->
        <div class="relative">
            <button @click="toggleDropdown" class="text-sm font-medium tracking-wide uppercase focus:outline-none">
                {{ getActiveLinkName }}
            </button>
            <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white text-gray-600 rounded-md shadow-lg z-20"
                @mouseleave="closeDropdown">
                <div v-for="item in sections" :key="item.id">
                    <a :href="`#${item.id}`" :class="[
        'block px-4 py-2 text-sm hover:text-[#41438A] hover:bg-gray-100 transition-colors relative group',
        { 'text-[#41438A]': activeId === item.id },
    ]" @click="setActive(item.id); closeDropdown">
                        {{ item.title }}
                        <span
                            class="absolute left-0 right-0 bottom-0 h-0.5 bg-[#41438A] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                            :class="{ 'scale-x-100': activeId === item.id }"></span>
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const sections = ref([
    { id: 'home', title: 'Home' },
    { id: 'problem', title: 'Problem' },
    { id: 'solution', title: 'Solution' },
    { id: 'features', title: 'Features' },
    { id: 'segmentation', title: 'Segmentation' },
    { id: 'competitive', title: 'Competitive Adv.' },
]);

const activeId = ref('home');
const dropdownOpen = ref(false);
const scrolled = ref(false);

// Toggle dropdown
const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

// Close dropdown
const closeDropdown = () => {
    dropdownOpen.value = false;
};

// Get the active link name
const getActiveLinkName = computed(() => {
    const activeItem = sections.value.find((item) => item.id === activeId.value);
    return activeItem ? activeItem.title : 'Menu';
});

// Set active link
const setActive = (id) => {
    activeId.value = id;
    closeDropdown();
};

// Check which section is in view
const checkActiveSection = () => {
    sections.value.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                activeId.value = item.id;
            }
        }
    });
};

// Handle scroll to toggle navbar style and height
const handleScroll = () => {
    scrolled.value = window.scrollY > 50;
};

onMounted(() => {
    window.addEventListener('scroll', checkActiveSection);
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', checkActiveSection);
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.filter.brightness-0.invert {
    filter: brightness(0) invert(1);
}

.filter-none {
    filter: none;
}
</style>