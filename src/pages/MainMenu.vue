<template>
    <div class="min-h-screen text-[#353535] relative bg-[#F8F8F8]">
        <!-- Header -->
        <header class="absolute top-0 left-0 w-full p-4 flex justify-end items-center z-10">
            <div class="flex items-center space-x-4">
                <div class="flex items-center bg-[#6D6FB0]/50 rounded-full px-3 py-1">
                    <CoinIcon class="h-5 w-5 text-[#FFFFFF] mr-2" />
                    <span class="font-semibold text-[#FFFFFF]">1,250</span>
                </div>
                <div class="flex items-center bg-[#6D6FB0]/50 rounded-full px-3 py-1">
                    <TrophyIcon class="h-5 w-5 text-[#FFFFFF] mr-2" />
                    <span class="font-semibold text-[#FFFFFF]">Level 5</span>
                </div>
                <button @click="toggleProfileMenu" class="relative">
                    <!-- Add accessible icon for profile or placeholder -->
                    <span
                        class="bg-[#6D6FB0] hover:bg-[#41438A] text-[#FFFFFF] h-10 w-10 flex items-center justify-center rounded-full">
                        <ChevronDownIcon class="h-5 w-5" />
                    </span>
                </button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="min-h-screen flex-1 flex flex-col items-start justify-center pl-32">
            <div class="bg-[#FFFFFF]/50 rounded-lg p-8 w-96">
                <div class="space-y-4">
                    <button @click="startNewGame"
                        class="w-full bg-[#6D6FB0] hover:bg-[#41438A] text-[#FFFFFF] font-bold py-3 px-4 rounded transition duration-300">
                        New Game
                    </button>
                    <button @click="showLoadGames"
                        class="w-full bg-[#6D6FB0] hover:bg-[#41438A] text-[#FFFFFF] font-bold py-3 px-4 rounded transition duration-300">
                        Load Games
                    </button>
                    <button @click="showTutorials"
                        class="w-full bg-[#6D6FB0] hover:bg-[#41438A] text-[#FFFFFF] font-bold py-3 px-4 rounded transition duration-300">
                        Tutorials
                    </button>
                    <button @click="showKnowledgeBase"
                        class="w-full bg-[#6D6FB0] hover:bg-[#41438A] text-[#FFFFFF] font-bold py-3 px-4 rounded transition duration-300">
                        Knowledge Base
                    </button>
                    <button @click="showSettings"
                        class="w-full bg-[#6D6FB0] hover:bg-[#41438A] text-[#FFFFFF] font-bold py-3 px-4 rounded transition duration-300">
                        Settings
                    </button>
                </div>
            </div>
        </main>

        <!-- Load Games Modal -->
        <div v-if="showLoadGamesModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click.self="closeLoadGames">
            <div class="bg-[#FFFFFF] rounded-lg shadow-2xl p-8 w-[80%] max-w-4xl">
                <h2 class="text-2xl font-bold mb-6 text-[#41438A]">Load Games</h2>
                <div class="grid grid-cols-3 gap-4">
                    <div v-for="i in 9" :key="i"
                        class="bg-[#f1f1f2] rounded-lg p-4 cursor-pointer hover:bg-[#ede9ff] transition duration-300">
                        <h3 class="font-bold mb-2 text-[#41438A]">Simulation {{ i }}</h3>
                        <p class="text-sm text-[#353535]">Last played: {{ new Date().toLocaleDateString() }}</p>
                        <p class="text-sm text-[#353535]">Fish Growth: 2.{{ i }}cm</p>
                        <p class="text-sm text-[#353535]">Survival Rate: 9{{ i }}%</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Profile Menu Modal -->
        <div v-if="showProfileMenu" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            @click.self="closeProfileMenu">
            <div class="bg-[#FFFFFF] rounded-lg shadow-2xl p-6 w-96">
                <ul class="space-y-2">
                    <li>
                        <button @click="viewProfile"
                            class="w-full text-center py-4 px-4 hover:bg-[#ede9ff] rounded transition duration-300 text-[#353535]">
                            View Profile
                        </button>
                    </li>
                    <li>
                        <button @click="showAchievements"
                            class="w-full text-center py-4 px-4 hover:bg-[#ede9ff] rounded transition duration-300 text-[#353535]">
                            Achievements
                        </button>
                    </li>
                    <li>
                        <button @click="logout"
                            class="w-full text-center py-4 px-4 hover:bg-[#ede9ff] rounded transition duration-300 text-[#353535]">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    CircleDollarSign as CoinIcon,
    Trophy as TrophyIcon,
} from 'lucide-vue-next'
import Placeholder from "../assets/PlaceholderFull.vue";

const showLoadGamesModal = ref(false)
const showProfileMenu = ref(false)

const startNewGame = () => {
    console.log('Starting a new game')
    // Implement new game logic
}

const showLoadGames = () => {
    showLoadGamesModal.value = true
}

const closeLoadGames = () => {
    showLoadGamesModal.value = false
}

const showTutorials = () => {
    console.log('Showing tutorials')
    // Implement tutorials page navigation
}

const showKnowledgeBase = () => {
    console.log('Showing knowledge base')
    // Implement knowledge base page navigation
}

const showSettings = () => {
    console.log('Showing settings')
    // Implement settings page navigation
}

const toggleProfileMenu = () => {
    showProfileMenu.value = !showProfileMenu.value
}

const closeProfileMenu = () => {
    showProfileMenu.value = false
}

const viewProfile = () => {
    console.log('Viewing profile')
    // Implement profile view logic
    closeProfileMenu()
}

const showAchievements = () => {
    console.log('Showing achievements')
    // Implement achievements view logic
    closeProfileMenu()
}

const logout = () => {
    console.log('Logging out')
    // Implement logout logic
    closeProfileMenu()
}
</script>

<style scoped>
/* Add any additional styles here */
</style>