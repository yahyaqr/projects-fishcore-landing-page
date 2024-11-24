<template>
  <section id="business" class="py-16 px-4 bg-[#F8F8F8] border-y">
    <div class="container mx-auto">
      <h3 class="text-2xl sm:text-3xl font-bold text-[#353535] mb-8 text-center">How We Raise Money</h3>

      <!-- Pill Tabs -->
      <div class="mb-8">
        <!-- Mobile Dropdown -->
        <div class="block sm:hidden">
          <select v-model="activeTab"
            class="w-full px-4 py-2 border border-[#41438A] rounded-lg text-[#41438A] bg-white focus:outline-none">
            <option v-for="(option, index) in partnershipOptions" :key="index" :value="index">
              {{ option.title }}
            </option>
          </select>
        </div>

        <!-- Desktop Pill Tabs -->
        <div class="hidden sm:flex justify-center space-x-4">
          <button v-for="(option, index) in partnershipOptions" :key="index" @click="activeTab = index" :class="[
            'px-6 py-2 rounded-full font-medium transition-all duration-300',
            activeTab === index ? 'bg-[#41438A] text-white' : 'bg-white text-[#41438A] border border-[#41438A]'
          ]">
            {{ option.title }}
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="bg-white shadow-lg rounded-lg p-6 cursor-pointer" @click="openModal(activeTab)"
        title="Click here to learn more">
        <Placeholder />
      </div>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div v-if="selectedFeature !== null"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
        <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative">
          <h3 class="text-2xl font-bold mb-4">
            {{ partnershipOptions[selectedFeature].title }}
          </h3>
          <p class="text-gray-600 mb-6">{{ partnershipOptions[selectedFeature].description }}</p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { XIcon } from "lucide-vue-next";
import Placeholder from "../../assets/PlaceholderFull.vue";

const activeTab = ref(0); // Tracks the currently active tab
const selectedFeature = ref(null);

const partnershipOptions = [
  {
    title: "Free for End Users",
    description: "Access to basic features and learning materials",
  },
  {
    title: "B2B Monetization",
    description: "Custom solutions for businesses and institutions",
  },
  {
    title: "Customization Options",
    description: "Tailored features for specific needs",
  },
];

const openModal = (index) => {
  selectedFeature.value = index;
};

const closeModal = () => {
  selectedFeature.value = null;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
