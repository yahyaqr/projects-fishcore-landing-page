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
    title: 'Lack of Effective Knowledge Transfer',
    fullDescription:
      'Experienced farmers struggle to pass on practical biofloc knowledge to beginners, leading to slow adoption and unprepared new farmers.',
    impacts: [
      'Sustainable practices take longer to adopt',
      'New farmers make costly mistakes',
      'Lack of trained personnel slows industry growth',
    ],
  },
  {
    icon: PuzzleIcon,
    title: 'Biofloc Technology is Hard to Learn',
    fullDescription:
      'Biofloc technology, while sustainable, is complicated. Without hands-on experience, beginners struggle to understand and implement it successfully.',
    impacts: [
      'New farmers face a steep learning curve',
      'Early failures discourage adoption',
      'The complexity slows widespread use of the technology',
    ],
  },
  {
    icon: UsersIcon,
    title: 'Disconnect Between Generations',
    fullDescription:
      'There is a gap between seasoned farmers with traditional expertise and younger generations who lack exposure to sustainable aquaculture practices.',
    impacts: [
      'Traditional knowledge risks being lost',
      'Fewer young people pursue careers in aquaculture',
      'Innovation is stalled by the disconnect between old and new approaches',
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
