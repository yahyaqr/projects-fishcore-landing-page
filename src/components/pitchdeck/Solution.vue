<template>
  <section id="solution" class="py-20 bg-[#F8F8F8] border-y text-[#353535]">
    <div class="container mx-auto px-4">
      <h3 class="text-2xl sm:text-3xl font-bold text-center mb-12">
        The First In-Depth Biofloc Simulation
      </h3>
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="relative group h-full">
          <PlaceholderFull />
          <div
            class="absolute inset-0 bg-[#41438A] bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button @click="playDemo"
              class="bg-white px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition duration-300">
              Play Demo
            </button>
          </div>
        </div>
        <div>
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-semibold">
              {{ showPossibleState ? 'Possible State' : 'As-Is State' }}
            </h3>
            <div @click="showPossibleState = !showPossibleState"
              class="flex bg-gray-200 rounded-full p-1 cursor-pointer">
              <!-- "Possible" Tab -->
              <div :class="{
              'bg-[#41438A] text-white': showPossibleState,
              'text-gray-600': !showPossibleState
            }" class="flex-1 text-center px-6 py-2 rounded-full font-medium transition">
                Possible
              </div>
              <!-- "As-Is" Tab -->
              <div :class="{
              'bg-[#41438A] text-white': !showPossibleState,
              'text-gray-600': showPossibleState
            }" class="flex-1 text-center px-6 py-2 rounded-full font-medium transition">
                As-Is
              </div>
            </div>
          </div>
          <ul class="space-y-6">
            <li v-for="(feature, index) in currentFeatures" :key="index"
              class="flex items-start bg-white hover:shadow-md p-4 rounded-lg transition-all duration-300">
              <component :is="feature.icon" class="w-8 h-8 mr-4 flex-shrink-0"
                :class="showPossibleState ? 'text-green-500' : 'text-red-500'" />
              <div>
                <h4 class="font-semibold text-lg" :class="showPossibleState ? 'text-green-700' : 'text-red-700'">
                  {{ feature.title }}
                </h4>
                <p>{{ feature.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { BookOpenIcon, ClockIcon, BrainIcon } from 'lucide-vue-next';
import PlaceholderFull from '../../assets/PlaceholderFull.vue';

const showPossibleState = ref(true);

const possibleFeatures = [
  {
    icon: BookOpenIcon,
    title: 'Hands-on Learning Experience',
    description: 'Immersive simulation for beginners, students, and fish crew.',
  },
  {
    icon: ClockIcon,
    title: 'Accelerated Learning',
    description: 'Simplifies complex Biofloc routines into an engaging, fast-paced simulation.',
  },
  {
    icon: BrainIcon,
    title: 'Enhanced Decision Making',
    description: 'Designed to train muscle memory and decision-making 100x faster than real-world farming.',
  },
];

const asIsFeatures = [
  {
    icon: BookOpenIcon,
    title: 'Limited Practical Experience',
    description: 'Traditional learning methods lack hands-on experience for beginners.',
  },
  {
    icon: ClockIcon,
    title: 'Time-Consuming Learning Process',
    description: 'Learning biofloc farming traditionally takes months or years.',
  },
  {
    icon: BrainIcon,
    title: 'Basic Decision-Making Skills',
    description: 'Traditional methods provide limited opportunities to develop complex decision-making skills.',
  },
];

const currentFeatures = computed(() =>
  showPossibleState.value ? possibleFeatures : asIsFeatures
);

const playDemo = () => {
  console.log('Playing demo...');
};
</script>
