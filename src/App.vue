<template>
  <div class="min-h-screen bg-[#F8F8F8]">
    <!-- Temporary Navbar -->
    <nav class="bg-[#41438A] text-white p-4 flex justify-center space-x-4 z-50 shadow-md">
      <router-link to="/" class="hover:text-[#6D6FB0]">Home</router-link>
      <router-link to="/login" class="hover:text-[#6D6FB0]">Login</router-link>
      <router-link to="/onboarding" class="hover:text-[#6D6FB0]">Onboarding</router-link>
      <router-link to="/loading" class="hover:text-[#6D6FB0]">Loading</router-link>
      <router-link to="/main-menu" class="hover:text-[#6D6FB0]">Main Menu</router-link>
      <router-link to="/simulation" class="hover:text-[#6D6FB0]">Simulation</router-link>
      <!-- <router-link to="/dashboard" class="hover:text-[#6D6FB0]">Dashboard</router-link> -->
      <!-- <router-link to="/achievements" class="hover:text-[#6D6FB0]">Achievements</router-link> -->

      <!-- Dropdown for Simulation -->
      <div class="relative">
        <button @click="toggleDropdown" class="text-[#494c98] hover:text-[#6D6FB0] flex items-center space-x-1">
          <span>Backup</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="isDropdownOpen" class="absolute left-0 mt-2 w-48 bg-white text-[#41438A] shadow-lg rounded-md">
          <router-link to="/bk" class="block px-4 py-2 hover:bg-gray-100">Simulation</router-link>
          <router-link to="/bk2" class="block px-4 py-2 hover:bg-gray-100">Simulation2</router-link>
          <router-link to="/bk3" class="block px-4 py-2 hover:bg-gray-100">Simulation3</router-link>
          <router-link to="/bk4" class="block px-4 py-2 hover:bg-gray-100">Simulation4</router-link>
          <router-link to="/bk5" class="block px-4 py-2 hover:bg-gray-100">Simulation5</router-link>
        </div>
      </div>
    </nav>

    <!-- Page Content Wrapper -->
    <div class="overflow-hidden">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dropdown state
const isDropdownOpen = ref(false);

// Toggle dropdown function
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
