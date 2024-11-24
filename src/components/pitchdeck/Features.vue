<template>
    <section id="features" class="py-8 bg-[#F8F8F8] text-[#353535] border-y">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-8">
                <div v-for="(feature, index) in features" :key="index"
                    class="p-4 sm:p-6 border-[#353535] rounded-lg cursor-pointer flex flex-col items-center justify-center text-center text-[#41438A]"
                    @click="toggleFeature(index)" @mouseover="hoveredIndex = index" @mouseleave="hoveredIndex = null">
                    <component :is="feature.icon" class="w-12 h-12 mb-2 sm:mb-4 transition-colors duration-300"
                        :class="{ 'text-[#2D2E6B]': hoveredIndex === index }" />
                    <h4 class="font-bold sm:mb-2 transition-colors duration-300"
                        :class="{ 'text-[#2D2E6B]': hoveredIndex === index }">
                        {{ feature.title }}
                    </h4>
                    <p class="text-[#353535]">{{ feature.description }}</p>
                </div>
            </div>

            <transition name="fade">
                <div v-if="selectedFeature !== null"
                    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    @click.self="closeFeature">
                    <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative">
                        <h3 class="text-3xl font-bold mb-4">{{ features[selectedFeature].title }}</h3>
                        <p class="text-gray-600 mb-6">{{ features[selectedFeature].description }}</p>
                        <div class="space-y-4">
                            <h4 class="text-xl font-semibold">Key Benefits:</h4>
                            <ul class="list-disc pl-6 space-y-2">
                                <li v-for="(benefit, index) in features[selectedFeature].benefits" :key="index">
                                    {{ benefit }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </transition>

        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { BookOpenIcon, ActivityIcon, ClockIcon, TrophyIcon, XIcon } from 'lucide-vue-next'

const selectedFeature = ref(null)
const hoveredIndex = ref(null);

const features = [
    {
        icon: ActivityIcon,
        title: "Complete Workflow Simulation",
        description: "From setup to harvest, covering daily and emergency routines.",
        benefits: [
            "Experience the entire biofloc farming cycle",
            "Learn to handle both routine tasks and unexpected challenges",
            "Develop a holistic understanding of biofloc system management"
        ],
    },
    {
        icon: ClockIcon,
        title: "Time-Accelerated Training",
        description: "Train for months' worth of experience in hours.",
        benefits: [
            "Compress learning time significantly",
            "Observe long-term effects of decisions in a short period",
            "Iterate and improve strategies rapidly"
        ],
    },
    {
        icon: BookOpenIcon,
        title: "Formal Learning Modules",
        description: "Step-by-step tutorials, quizzes, and instructor-led certifications.",
        benefits: [
            "Structured learning path for comprehensive understanding",
            "Interactive quizzes to reinforce knowledge",
            "Earn certifications to validate your skills"
        ],
    },
    {
        icon: TrophyIcon,
        title: "Gamified Challenges",
        description: "Achievements for sustainability and efficiency practices.",
        benefits: [
            "Stay motivated with rewarding gameplay elements",
            "Track your progress through various challenges",
            "Compete with peers and showcase your achievements"
        ],
    }
];

const toggleFeature = (index) => {
    selectedFeature.value = index
}

const closeFeature = () => {
    selectedFeature.value = null
}
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