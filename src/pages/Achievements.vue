<template>
    <div class="min-h-screen text-[#353535] flex flex-col">
        <!-- Header -->
        <header class="bg-[#41438A] p-4 flex justify-between items-center">
            <div class="flex items-center space-x-4">
                <!-- <img src="/placeholder.svg?height=48&width=48" alt="Fishcore Logo" class="h-12 w-auto" /> -->
                <h1 class="text-3xl font-bold text-[#F8F8F8]">Fishcore</h1>
            </div>
            <button @click="goBack" class="text-[#F8F8F8] hover:text-[#0080FF] transition duration-300">
                <ArrowLeft class="h-6 w-6" />
            </button>
        </header>

        <!-- Main Content -->
        <main class="flex-1 p-8 bg-[#F8F8F8] overflow-y-auto">
            <h2 class="text-4xl font-bold mb-8 text-center text-[#41438A]">Achievements</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Badge v-for="badge in badges" :key="badge.title" :badge="badge" />
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import Badge from './Badge.vue'

const badges = ref([
    {
        title: "Freshwater Pioneer",
        description: "For exploring the potential of freshwater fisheries in Indonesia.",
        icon: "Droplet"
    },
    {
        title: "Fish Lover",
        description: "Achieved after learning about Indonesia's fish consumption growth trends.",
        icon: "Heart"
    },
    {
        title: "Species Expert",
        description: "Identified all popular freshwater aquaculture species.",
        icon: "Fish"
    },
    {
        title: "Aquaculture Advocate",
        description: "For understanding the principles of sustainable aquaculture.",
        icon: "Leaf"
    },
    {
        title: "Pond Planner",
        description: "Set up the first aquaculture pond using correct types and materials.",
        icon: "PenTool"
    },
    {
        title: "RAS Rookie",
        description: "Completed your first Recirculating Aquaculture System (RAS) setup.",
        icon: "Recycle"
    },
    {
        title: "Biofloc Beginner",
        description: "Successfully set up your first biofloc pond.",
        icon: "Bacteria"
    },
    {
        title: "Floc Formation Expert",
        description: "Mastered the principles of biofloc technology.",
        icon: "Zap"
    },
    {
        title: "Seed Specialist",
        description: "Acclimatized your first batch of high-quality fish seeds.",
        icon: "Seedling"
    },
    {
        title: "Optimal Oxygenator",
        description: "Maintained ideal dissolved oxygen levels in your pond.",
        icon: "Wind"
    },
    {
        title: "Feed Strategist",
        description: "Implemented an efficient feeding strategy for fish growth.",
        icon: "Utensils"
    },
    {
        title: "Waste Warrior",
        description: "Effectively managed pond wastewater and effluents.",
        icon: "Trash2"
    },
    {
        title: "Floc Whisperer",
        description: "Balanced floc concentration to achieve optimal conditions.",
        icon: "Feather"
    },
    {
        title: "Stocking Specialist",
        description: "Achieved the recommended stocking density for fish farming.",
        icon: "Users"
    },
    {
        title: "Growth Tracker",
        description: "Monitored fish growth and survival rates consistently.",
        icon: "TrendingUp"
    },
    {
        title: "Harvest Hero",
        description: "Successfully harvested premium-quality fish with minimal losses.",
        icon: "Award"
    },
    {
        title: "Feed Conversion Pro",
        description: "Maintained a low Feed Conversion Ratio (FCR) across simulations.",
        icon: "BarChart2"
    },
    {
        title: "Eco-Economist",
        description: "Balanced environmental sustainability with economic profitability.",
        icon: "DollarSign"
    },
    {
        title: "Market Master",
        description: "Explored all marketing strategies to sell harvested fish.",
        icon: "ShoppingCart"
    },
    {
        title: "Certified Aquaculturist",
        description: "Completed all tutorials and passed final certification quizzes.",
        icon: "Award"
    }
])

const goBack = () => {
    // Implement navigation back to the main menu
    console.log('Navigating back to the main menu')
}
</script>

<style scoped>
/* Add any additional styles here */
</style>