<template>
  <div class="min-h-screen bg-[#F8F8F8]">
    <!-- Temporary Navbar -->
    <nav class="bg-[#41438A] text-white p-4 flex justify-center space-x-4 fixed top-0 left-0 right-0 z-50 shadow-md">
      <router-link to="/" class="hover:text-[#6D6FB0]">Home</router-link>
      <router-link to="/onboarding" class="hover:text-[#6D6FB0]">Onboarding</router-link>
      <router-link to="/dashboard" class="hover:text-[#6D6FB0]">Dashboard</router-link>
      <router-link to="/main-menu" class="hover:text-[#6D6FB0]">Main Menu</router-link>
      <router-link to="/achievements" class="hover:text-[#6D6FB0]">Achievements</router-link>
      <router-link to="/simulation" class="hover:text-[#6D6FB0]">Simulation</router-link>
      <router-link to="/simulation2" class="hover:text-[#6D6FB0]">Simulation2</router-link>
      <router-link to="/simulation3" class="hover:text-[#6D6FB0]">Simulation3</router-link>
      <router-link to="/simulation4" class="hover:text-[#6D6FB0]">Simulation4</router-link>
      <router-link to="/simulation5" class="hover:text-[#6D6FB0]">Simulation5</router-link>
    </nav>

    <!-- Page Content Wrapper -->
    <div class="pt-16">
      <router-view />
    </div>
  </div>
</template>

<script setup>
// No additional scripts required here
</script>

<style scoped>
/* Add custom styles if needed */
</style>
