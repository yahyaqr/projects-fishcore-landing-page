<template>
    <section id="competitive" class="py-20 bg-[#ffffff] text-[#353535]">
        <div class="container mx-auto px-4">
            <h2 class="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12">Why Fishcore Stands Out</h2>
            <div class="overflow-x-auto">
                <table class="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead>
                        <tr class="bg-[#41438A] text-white">
                            <th class="py-4 px-6 text-left">Feature</th>
                            <th class="py-4 px-6 text-center">Fishcore</th>
                            <th class="py-4 px-6 text-center">Competitors</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(feature, index) in features" :key="index"
                            class="border-b border-gray-200 hover:bg-[#ede9ff] transition-colors duration-200"
                            @click="selectFeature(index)">
                            <td class="py-4 px-6 cursor-pointer">
                                <div class="font-semibold text-[#41438A]">{{ feature.title }}</div>
                                <div class="text-sm text-gray-600">{{ feature.description }}</div>
                            </td>
                            <td class="py-4 px-6 text-center">
                                <CheckIcon class="w-6 h-6 text-green-500 mx-auto" />
                            </td>
                            <td class="py-4 px-6 text-center">
                                <XIcon class="w-6 h-6 text-red-500 mx-auto" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Feature Modal -->
        <transition name="fade">
            <div v-if="selectedFeature !== null"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative">
                    <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        <XIcon class="w-6 h-6" />
                    </button>
                    <h3 class="text-3xl font-bold mb-4 text-[#41438A]">{{ features[selectedFeature].title }}</h3>
                    <p class="text-gray-600 mb-6">{{ features[selectedFeature].fullDescription }}</p>
                    <ul class="list-disc pl-6 space-y-2">
                        <li v-for="(point, index) in features[selectedFeature].points" :key="index"
                            class="text-gray-600">
                            {{ point }}
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </section>
</template>

<script setup>
import { ref } from "vue";
import { CheckIcon, XIcon } from "lucide-vue-next";

const selectedFeature = ref(null);

const features = [
    {
        title: "Focused on Biofloc Technology",
        description: "Specialized curriculum for biofloc aquaculture",
        fullDescription:
            "Our platform is entirely dedicated to biofloc technology, providing in-depth knowledge and practical skills that are directly applicable to modern sustainable aquaculture practices.",
        points: [
            "Comprehensive coverage of biofloc system setup and management",
            "In-depth exploration of microbial communities and their roles",
            "Practical guidance on water quality management in biofloc systems",
            "Strategies for optimizing feed conversion and waste reduction",
        ],
    },
    {
        title: "Time-accelerated Simulation",
        description: "Experience months of farming in hours",
        fullDescription:
            "Our advanced simulation technology compresses time, allowing learners to observe and manage long-term processes in a fraction of the time, accelerating the learning curve dramatically.",
        points: [
            "Observe full growth cycles of aquaculture species in compressed timeframes",
            "Experiment with different management strategies and see results quickly",
            "Learn to handle seasonal variations and long-term challenges efficiently",
            "Gain years of experience in a matter of weeks",
        ],
    },
    {
        title: "Deep Educational Integration",
        description: "Seamlessly integrated with education systems",
        fullDescription:
            "We work closely with educational institutions to ensure our platform aligns with curriculum standards, offering certifications that are recognized and valued in the industry.",
        points: [
            "Curriculum aligned with international aquaculture education standards",
            "Modular course structure that fits into existing academic programs",
            "Industry-recognized certifications upon course completion",
            "Continuous updates to reflect the latest research and best practices",
        ],
    },
    {
        title: "Designed for Indonesian Learners",
        description: "Culturally relevant and localized content",
        fullDescription:
            "Our platform is specifically tailored to the Indonesian context, considering local species, environmental conditions, and cultural nuances to provide a truly relevant learning experience.",
        points: [
            "Content focused on fish species popular in Indonesian aquaculture",
            "Consideration of local climate patterns and environmental challenges",
            "Integration of traditional knowledge with modern scientific approaches",
            "User interface and learning materials available in Bahasa Indonesia",
        ],
    },
];

const selectFeature = (index) => {
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