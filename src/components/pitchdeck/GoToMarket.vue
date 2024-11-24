<template>
    <section id="strategy" class="py-20 bg-[#F8F8F8] border-y text-[#353535]">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-12 text-[#41438A]">Innovative Outreach for Maximum Impact</h2>

            <div class="grid md:grid-cols-3 gap-8 mb-12">
                <div v-for="(strategy, index) in strategies" :key="index"
                    class="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                    <component :is="strategy.icon" class="w-16 h-16 text-blue-600 mb-4" />
                    <h3 class="text-2xl font-semibold mb-2 text-blue-700">{{ strategy.title }}</h3>
                    <p class="text-gray-600 mb-4">{{ strategy.description }}</p>
                    <button @click="openModal(index)" class="text-blue-600 hover:text-[#41438A] font-semibold">
                        Learn More
                    </button>
                </div>
            </div>

            <div class="bg-white p-8 rounded-lg shadow-lg">
                <h3 class="text-2xl font-semibold mb-6 text-[#41438A]">Marketing Strategy Roadmap</h3>
                <MarketingRoadmap :milestones="roadmapMilestones" />
            </div>
        </div>

        <!-- Strategy Modal -->
        <transition name="fade">
            <div v-if="selectedStrategy !== null"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative">
                    <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        <XIcon class="w-6 h-6" />
                    </button>
                    <h3 class="text-3xl font-bold mb-4 text-[#41438A]">{{ strategies[selectedStrategy].title }}</h3>
                    <p class="text-gray-600 mb-6">{{ strategies[selectedStrategy].fullDescription }}</p>
                    <ul class="list-disc pl-6 space-y-2">
                        <li v-for="(point, index) in strategies[selectedStrategy].keyPoints" :key="index"
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
import { ref } from 'vue'
import { InstagramIcon, SendIcon, CalendarIcon, XIcon } from 'lucide-vue-next'
import MarketingRoadmap from './MarketingRoadmap.vue'

const selectedStrategy = ref(null)

const strategies = [
    {
        icon: InstagramIcon,
        title: "Digital Marketing",
        description: "Instagram campaigns highlighting game features and sustainability.",
        fullDescription: "Our digital marketing strategy focuses on creating engaging content that showcases the unique features of Biofloc Academy while emphasizing the importance of sustainable aquaculture practices.",
        keyPoints: [
            "Develop a content calendar featuring daily tips, success stories, and mini-tutorials",
            "Collaborate with influencers in the aquaculture and sustainability spaces",
            "Run targeted ads to reach potential students and institutions in Indonesia",
            "Utilize Instagram's interactive features like polls and quizzes to boost engagement"
        ]
    },
    {
        icon: SendIcon,
        title: "Direct Outreach",
        description: "Targeted communication with key educational and governmental stakeholders.",
        fullDescription: "Our direct outreach program aims to build strong relationships with schools, training centers, and government agencies to integrate Biofloc Academy into existing educational frameworks.",
        keyPoints: [
            "Develop tailored presentations for different types of institutions",
            "Offer free trial periods for institutions to experience the platform",
            "Provide comprehensive onboarding support and training for educators",
            "Establish a dedicated support team for institutional partners"
        ]
    },
    {
        icon: CalendarIcon,
        title: "Event Participation",
        description: "Active presence at aquaculture expos and sustainability workshops.",
        fullDescription: "We strategically participate in key industry events to showcase Biofloc Academy, network with potential partners, and stay updated on the latest trends in aquaculture and education.",
        keyPoints: [
            "Set up interactive demo booths at major aquaculture expos in Indonesia",
            "Host workshops on sustainable aquaculture practices at environmental conferences",
            "Sponsor student competitions focused on innovative aquaculture solutions",
            "Organize webinars featuring success stories from Biofloc Academy users"
        ]
    }
]

const roadmapMilestones = [
    { phase: "Launch", activities: ["Beta testing", "Influencer partnerships", "Initial school outreach"] },
    { phase: "Growth", activities: ["Expand digital presence", "Increase direct sales efforts", "Participate in major expos"] },
    { phase: "Expansion", activities: ["Enter new regions", "Develop advanced courses", "Establish industry partnerships"] },
    { phase: "Consolidation", activities: ["Optimize user acquisition", "Enhance retention strategies", "Explore international markets"] }
]

const engagementMetrics = [
    { value: "50K+", label: "Social Media Followers" },
    { value: "80%", label: "Student Completion Rate" },
    { value: "100+", label: "Institutional Partners" },
    { value: "4.8/5", label: "User Satisfaction Score" }
]

const openModal = (index) => {
    selectedStrategy.value = index
}

const closeModal = () => {
    selectedStrategy.value = null
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