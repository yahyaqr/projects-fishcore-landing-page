<template>
    <section id="timeline" class="py-20 bg-[#ffffff] text-[#353535]">
        <div class="container mx-auto px-4">
            <h2 class="text-2xl sm:text-3xl font-bold text-center mb-12">
                Our Journey to Impactful Learning
            </h2>

            <!-- Desktop Timeline -->
            <div class="hidden md:block relative">
                <div class="absolute h-full w-1 bg-[#6D6FB0] left-1/2 transform -translate-x-1/2"></div>
                <div class="space-y-16">
                    <div v-for="(milestone, index) in milestones" :key="milestone.id"
                        class="flex items-center justify-between group"
                        :class="{ 'flex-row-reverse': index % 2 !== 0 }">
                        <!-- Milestone Card -->
                        <div @click="openModal(milestone.id)" :class="[
                        'w-5/12 bg-[#41438A] hover:scale-105 transition relative p-6 rounded-lg cursor-pointer',
                        index % 2 === 0 ? 'text-right pr-8' : 'pl-8'
                    ]">
                            <h3 class="text-xl font-semibold mb-1 text-[#ffffff]">{{ milestone.title }}</h3>
                            <p class="text-sm font-medium text-[#f1f1f2] mb-2">{{ milestone.date }}</p>
                            <p class="text-gray-600 mb-2">{{ milestone.description }}</p>
                            <!-- Pointy Side -->
                            <div :class="[
                        'absolute w-0 h-0 border-solid border-transparent',
                        index % 2 === 0
                            ? 'border-t-[15px] border-b-[15px] border-l-[15px] border-l-[#41438A] right-[-15px] top-1/2 transform -translate-y-1/2'
                            : 'border-t-[15px] border-b-[15px] border-r-[15px] border-r-[#41438A] left-[-15px] top-1/2 transform -translate-y-1/2'
                    ]"></div>
                        </div>

                        <!-- Timeline Circle -->
                        <div class="w-2/12 flex flex-col items-center">
                            <div
                                class="w-12 h-12 bg-[#41438A] rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-300 transform">
                                {{ index + 1 }}
                            </div>
                        </div>

                        <!-- Empty Space -->
                        <div class="w-5/12"></div>
                    </div>
                </div>
            </div>

            <!-- Mobile Timeline -->
            <div class="block md:hidden">
                <div class="space-y-4">
                    <div v-for="(milestone, index) in milestones" :key="milestone.id"
                        class="bg-[#F8F8F8] text-white p-2 rounded-lg cursor-pointer hover:bg-[#f1f1f2] transition"
                        @click="openModal(milestone.id)">
                        <div class="flex flex-row items-center">
                            <div
                                class="bg-[#41438A] rounded-full flex items-center justify-center text-white font-bold py-4 px-6 text-sm mr-4">
                                {{ milestone.date }}
                            </div>
                            <h3 class="text-lg text-[#353535] font-semibold">{{ milestone.title }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <transition name="fade">
            <div v-if="selectedMilestone"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                @click.self="closeModal">
                <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative">
                    <h3 class="text-2xl font-bold mb-4 text-[#353535]">{{ selectedMilestone.title }}</h3>
                    <p class="text-gray-600 mb-6">{{ selectedMilestone.fullDescription }}</p>
                    <ul class="list-disc pl-6 space-y-2">
                        <li v-for="(detail, index) in selectedMilestone.details" :key="index" class="text-gray-600">
                            {{ detail }}
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </section>
</template>

<script setup>
import { ref } from "vue";
import { XIcon } from "lucide-vue-next";

const milestones = [
    {
        id: 1,
        title: "Concept Development",
        date: "Jan 2021",
        fullDescription:
            "We collaborated with leading Biofloc farmers to develop a comprehensive and practical curriculum.",
        details: [
            "Conducted in-depth interviews with 20+ experienced Biofloc farmers",
            "Identified key challenges and knowledge gaps in current training methods",
            "Developed initial concept for interactive, simulation-based learning platform",
        ],
    },
    {
        id: 2,
        title: "Partnerships Initiated",
        date: "Jun 2021",
        fullDescription:
            "We've established strategic partnerships to ensure wide-reaching impact and adoption of our platform.",
        details: [
            "Signed MoUs with 5 vocational schools in West Java",
            "Collaborated with the Ministry of Marine Affairs and Fisheries for curriculum alignment",
            "Initiated discussions with 3 major universities for research partnerships",
        ],
    },
    {
        id: 3,
        title: "Prototype Development",
        date: "Dec 2021",
        fullDescription:
            "Our team has developed a fully functional prototype, showcasing the core features of the Biofloc Academy.",
        details: [
            "Created high-fidelity mockups and user flow diagrams",
            "Developed interactive simulations for key Biofloc processes",
            "Conducted usability testing with a focus group of 50 potential users",
        ],
    },
    {
        id: 4,
        title: "Pilot Program",
        date: "Apr 2022",
        fullDescription:
            "We're preparing for our first large-scale deployment, focusing on West Java as our initial target region.",
        details: [
            "Selected 10 partner farms for initial deployment",
            "Developed comprehensive onboarding and training materials",
            "Established metrics for measuring learning outcomes and farm productivity improvements",
        ],
    },
];

const selectedMilestone = ref(null);

const openModal = (id) => {
    selectedMilestone.value = milestones.find((m) => m.id === id);
};

const closeModal = () => {
    selectedMilestone.value = null;
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