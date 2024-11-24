<template>
    <section id="education" class="py-20 bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-12 text-blue-800">
                Revolutionizing Aquaculture Education
            </h2>

            <div class="grid md:grid-cols-3 gap-8 mb-12">
                <div v-for="(feature, index) in educationalFeatures" :key="index"
                    class="bg-white p-6 rounded-lg shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
                    <component :is="feature.icon" class="w-16 h-16 text-blue-600 mb-4" />
                    <h3 class="text-2xl font-semibold mb-2 text-blue-700">{{ feature.title }}</h3>
                    <p class="text-gray-600 mb-4">{{ feature.description }}</p>
                    <button @click="openModal(index)" class="text-blue-600 hover:text-blue-800 font-semibold">
                        Learn More
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <transition name="fade">
            <div v-if="selectedFeature !== null"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative">
                    <button @click="closeModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        <XIcon class="w-6 h-6" />
                    </button>
                    <h3 class="text-3xl font-bold mb-4 text-blue-800">{{ educationalFeatures[selectedFeature].title }}
                    </h3>
                    <p class="text-gray-600 mb-6">{{ educationalFeatures[selectedFeature].fullDescription }}</p>
                    <div v-if="educationalFeatures[selectedFeature].component" class="mt-6">
                        <component :is="educationalFeatures[selectedFeature].component" />
                    </div>
                </div>
            </div>
        </transition>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { UserIcon, AwardIcon, LeafIcon, CheckCircleIcon, XIcon } from 'lucide-vue-next'

const selectedFeature = ref(null)

const educationalFeatures = [
    {
        icon: UserIcon,
        title: "Instructor-Led Training",
        description: "Expert-guided learning for schools and government programs.",
        fullDescription: "Our instructor-led training programs are designed to provide a comprehensive and interactive learning experience. Led by industry experts, these programs cater to both educational institutions and government training initiatives, ensuring that learners receive the most up-to-date and relevant information in biofloc aquaculture.",
        component: {
            template: `
          <div>
            <h4 class="text-xl font-semibold mb-4 text-blue-700">Upcoming Webinars</h4>
            <ul class="space-y-2">
              <li v-for="webinar in webinars" :key="webinar.id" class="flex justify-between items-center">
                <span>{{ webinar.title }}</span>
                <button class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition duration-300">
                  Register
                </button>
              </li>
            </ul>
          </div>
        `,
            setup() {
                const webinars = [
                    { id: 1, title: "Introduction to Biofloc Systems" },
                    { id: 2, title: "Advanced Water Quality Management" },
                    { id: 3, title: "Sustainable Feed Practices in Aquaculture" }
                ]
                return { webinars }
            }
        }
    },
    {
        icon: AwardIcon,
        title: "Certification Opportunities",
        description: "Validate skills for students and professionals.",
        fullDescription: "Our certification program offers a way for both students and professionals to validate their biofloc aquaculture knowledge and skills. These industry-recognized certifications demonstrate expertise and can enhance career prospects in the rapidly growing field of sustainable aquaculture.",
        component: {
            template: `
          <div>
            <h4 class="text-xl font-semibold mb-4 text-blue-700">Available Certifications</h4>
            <div class="space-y-4">
              <div v-for="cert in certifications" :key="cert.id" class="border p-4 rounded-lg">
                <h5 class="font-semibold">{{ cert.title }}</h5>
                <p class="text-sm text-gray-600">{{ cert.description }}</p>
                <button class="mt-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700 transition duration-300">
                  Enroll
                </button>
              </div>
            </div>
          </div>
        `,
            setup() {
                const certifications = [
                    { id: 1, title: "Biofloc Technician", description: "Entry-level certification for biofloc system operators" },
                    { id: 2, title: "Advanced Biofloc Manager", description: "For experienced professionals managing large-scale operations" },
                    { id: 3, title: "Sustainable Aquaculture Specialist", description: "Focused on environmental best practices in biofloc farming" }
                ]
                return { certifications }
            }
        }
    },
    {
        icon: LeafIcon,
        title: "Sustainability Focus",
        description: "Learn eco-friendly aquaculture practices.",
        fullDescription: "Our curriculum places a strong emphasis on sustainability, teaching students how to implement environmentally friendly practices in biofloc aquaculture. Learn about water conservation, waste reduction, and energy-efficient systems that contribute to a more sustainable future in food production.",
        component: {
            template: `
          <div>
            <h4 class="text-xl font-semibold mb-4 text-blue-700">Sustainability Metrics</h4>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="metric in sustainabilityMetrics" :key="metric.id" class="text-center">
                <div class="text-3xl font-bold text-green-600">{{ metric.value }}</div>
                <div class="text-sm text-gray-600">{{ metric.label }}</div>
              </div>
            </div>
          </div>
        `,
            setup() {
                const sustainabilityMetrics = [
                    { id: 1, value: "90%", label: "Water Conservation" },
                    { id: 2, value: "70%", label: "Reduced Land Use" },
                    { id: 3, value: "60%", label: "Energy Efficiency" },
                    { id: 4, value: "80%", label: "Waste Reduction" }
                ]
                return { sustainabilityMetrics }
            }
        }
    }
]

const virtualClassroomFeatures = [
    "Live interactive sessions with industry experts",
    "Real-time collaboration tools for group projects",
    "Virtual biofloc system simulations",
    "24/7 access to recorded lectures and resources"
]

const openModal = (index) => {
    selectedFeature.value = index
}

const closeModal = () => {
    selectedFeature.value = null
}

const launchDemo = () => {
    // Implement demo launch logic here
    console.log("Launching virtual classroom demo")
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