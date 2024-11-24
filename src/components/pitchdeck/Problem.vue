<template>
  <section id="problem" class="py-16 sm:py-20 bg-gradient-to-b bg-[#ffffff] text-[#353535]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Title -->
      <h3 class="text-2xl sm:text-3xl font-bold text-center mb-12">
        The Biofloc Aquaculture Challenge
      </h3>

      <!-- Problem Carousel -->
      <div class="relative overflow-hidden select-none" @touchstart="onTouchStart" @touchmove="onTouchMove"
        @touchend="onTouchEnd" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"
        @mouseleave="onMouseUp">
        <div class="flex items-center justify-between">
          <!-- Previous Button -->
          <button @click="prevSlide"
            class="hidden sm:flex bg-[#353535] text-white p-3 rounded-full shadow-md hover:bg-black transition-colors duration-300 mr-4"
            aria-label="Previous Slide">
            <ChevronLeftIcon class="w-6 h-6" />
          </button>

          <!-- Carousel Content -->
          <div class="flex-grow cursor-grab active:cursor-grabbing" draggable="false">
            <div class="bg-[#f1f1f2] p-6 sm:p-8 rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
              :style="dragging ? { transform: `translateX(${dragOffset}px)` } : {}">
              <!-- Problem Icon and Title -->
              <div class="flex items-center mb-4 sm:mb-6 text-[#41438A]">
                <component :is="problems[currentSlide].icon" class="w-12 sm:w-16 h-12 sm:h-16 mr-4" />
                <h3 class="text-xl sm:text-3xl font-semibold">
                  {{ problems[currentSlide].title }}
                </h3>
              </div>

              <!-- Problem Description -->
              <p class="text-base sm:text-xl mb-4 sm:mb-6">
                {{ problems[currentSlide].fullDescription }}
              </p>

              <!-- Problem Impacts -->
              <h4 class="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4 text-[#41438A]">
                Impact:
              </h4>
              <ul class="list-disc pl-6 space-y-1 sm:space-y-2">
                <li v-for="(impact, impactIndex) in problems[currentSlide].impacts" :key="impactIndex">
                  {{ impact }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Next Button -->
          <button @click="nextSlide"
            class="hidden sm:flex bg-[#353535] text-white p-3 rounded-full shadow-md hover:bg-black transition-colors duration-300 ml-4"
            aria-label="Next Slide">
            <ChevronRightIcon class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Carousel Indicators -->
      <div class="flex justify-center mt-6 space-x-2">
        <button v-for="(_, index) in problems" :key="index" @click="goToSlide(index)"
          class="w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-colors duration-300"
          :class="currentSlide === index ? 'bg-[#353535]' : 'bg-gray-300'"
          aria-label="Go to Slide {{ index + 1 }}"></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import {
  BookOpenIcon,
  PuzzleIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-vue-next';

const problems = [
  {
    icon: BookOpenIcon,
    title: 'The Education Barrier',
    fullDescription:
      'In the world of biofloc aquaculture, a critical challenge emerges: the struggle to effectively transfer knowledge. Experienced farmers, armed with years of practical wisdom, find themselves unable to bridge the gap between their expertise and the eager minds of beginners and fish crew members. This communication breakdown hinders the growth of sustainable practices and leaves newcomers ill-equipped to navigate the complexities of biofloc systems.',
    impacts: [
      'Sustainable practices are adopted at a frustratingly slow pace',
      'Novice farmers face a higher risk of costly mistakes in farm management',
      "The industry's growth is stunted by a shortage of well-trained personnel",
    ],
  },
  {
    icon: PuzzleIcon,
    title: 'The Complexity Conundrum',
    fullDescription:
      'Biofloc technology stands as a beacon of sustainability in aquaculture, promising efficient and environmentally friendly farming. However, its intricate biological processes form a labyrinth that many find daunting to navigate. Without hands-on experience, mastering this technology becomes an uphill battle, discouraging many from embracing its full potential.',
    impacts: [
      'New farmers face a dauntingly steep learning curve',
      'Initial attempts at biofloc systems often end in discouraging failures',
      'The perceived difficulty leads to hesitation in adopting this sustainable technology',
    ],
  },
  {
    icon: UsersIcon,
    title: 'The Generational Divide',
    fullDescription:
      'A chasm is widening in the world of aquaculture. On one side stand the seasoned farmers, their hands calloused by years of experience and their minds rich with traditional knowledge. On the other, a younger generation full of innovative ideas but lacking exposure to sustainable practices. This disconnect threatens the very future of aquaculture, as valuable expertise risks being lost in the gap between generations.',
    impacts: [
      'Precious traditional knowledge and expertise are at risk of being lost forever',
      'Young people are turning away from careers in aquaculture, seeing it as outdated',
      "The sector's technological advancement slows, trapped between tradition and innovation",
    ],
  },
];

const currentSlide = ref(0);
let startX = 0;
let dragOffset = ref(0);
let dragging = ref(false);

const onTouchStart = (e) => {
  startX = e.touches[0].clientX;
  dragging.value = true;
};

const onTouchMove = (e) => {
  if (dragging.value) {
    dragOffset.value = e.touches[0].clientX - startX;
  }
};

const onTouchEnd = () => {
  finishDrag();
};

const onMouseDown = (e) => {
  startX = e.clientX;
  dragging.value = true;
};

const onMouseMove = (e) => {
  if (dragging.value) {
    dragOffset.value = e.clientX - startX;
  }
};

const onMouseUp = () => {
  finishDrag();
};

const finishDrag = () => {
  dragging.value = false;
  if (dragOffset.value > 50) {
    prevSlide();
  } else if (dragOffset.value < -50) {
    nextSlide();
  }
  dragOffset.value = 0;
};

// Carousel controls
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % problems.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + problems.length) % problems.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};
</script>
