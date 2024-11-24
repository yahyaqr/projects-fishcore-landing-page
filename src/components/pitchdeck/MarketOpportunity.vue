<template>
    <section id="market" class="py-20 bg-[#F8F8F8] border-y text-[#353535]">
        <div class="container mx-auto px-4">
            <h3 class="text-2xl sm:text-3xl  font-bold text-center mb-8">Thriving Aquaculture
                Ecosystem</h3>

            <div class="grid grid-cols-3 gap-4 md:gap-8 text-center mb-4">
                <div v-for="(stat, index) in marketStats" :key="index"
                    class="bg-white p-4 md:p-6 rounded-lg hover:shadow-md">
                    <div class="text-xl md:text-3xl font-bold">
                        {{ typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value }}
                    </div>
                    <span class="text-sm md:text-base">{{ stat.title }}</span>
                </div>
            </div>

            <div class="bg-white hover:shadow-md rounded-lg p-6 cursor-pointer" @click="showOpportunities = true"
                title="Click here to learn more">
                <Placeholder />
            </div>
        </div>

        <!-- Market Opportunities Modal -->
        <transition name="fade">
            <div v-if="showOpportunities"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 relative">
                    <button @click="showOpportunities = false"
                        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">X
                    </button>
                    <h3 class="text-2xl font-bold mb-6">Market Opportunities in Indonesian Aquaculture
                    </h3>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div v-for="(opportunity, index) in marketOpportunities" :key="index"
                            class="bg-[#f1f1f2] p-4 rounded-lg">
                            <h4 class="text-xl font-semibold mb-2">{{ opportunity.title }}</h4>
                            <p>{{ opportunity.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import Placeholder from "../../assets/PlaceholderFull.vue";

const showOpportunities = ref(false)

const marketStats = [
    {
        title: "Market Size",
        value: "$17.5B"
    },
    {
        title: "Growth Rate",
        value: "8.9%"
    },
    {
        title: "Employment",
        value: 3200000
    }
]

const marketOpportunities = [
    {
        title: "Sustainable Feed Solutions",
        description: "Develop and market eco-friendly aquafeed alternatives to reduce environmental impact and improve fish health."
    },
    {
        title: "IoT-Enabled Monitoring",
        description: "Create smart monitoring systems for water quality and fish behavior, enabling data-driven farm management."
    },
    {
        title: "Export Market Expansion",
        description: "Tap into growing international demand for sustainably farmed seafood from Indonesia."
    },
    {
        title: "Vertical Integration",
        description: "Establish partnerships across the value chain, from hatcheries to processing and distribution."
    }
]
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