<template>
    <div class="min-h-screen bg-[#F8F8F8] text-[#353535]">
        <!-- Header -->
        <header class="bg-[#41438A] text-white p-4 flex justify-between items-center">
            <div class="flex items-center space-x-4">
                <img src="" alt="Fishcore Logo" class="h-8 w-auto" />
                <h1 class="text-2xl font-bold">Fishcore</h1>
            </div>
            <div class="flex items-center space-x-4">
                <input type="search" placeholder="Search..."
                    class="px-4 py-2 rounded-full bg-[#2D2E6B] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6D6FB0]" />
                <button class="relative" @click="toggleNotifications">
                    <BellIcon class="h-6 w-6" />
                    <span v-if="unreadNotifications"
                        class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <div class="relative">
                    <button @click="toggleProfileMenu" class="flex items-center space-x-2">
                        <img src="" alt="User Avatar" class="h-8 w-8 rounded-full" />
                        <ChevronDownIcon class="h-4 w-4" />
                    </button>
                    <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                    </div>
                </div>
            </div>
        </header>

        <div class="flex">
            <!-- Sidebar -->
            <aside class="bg-[#f1f1f2] w-64 p-4 hidden md:block">
                <nav>
                    <ul class="space-y-2">
                        <li>
                            <a href="#"
                                class="flex items-center space-x-2 text-[#41438A] font-medium p-2 rounded-md bg-[#ede9ff]">
                                <HomeIcon class="h-5 w-5" />
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center space-x-2 text-[#353535] hover:bg-[#ede9ff] p-2 rounded-md transition duration-200">
                                <BeakerIcon class="h-5 w-5" />
                                <span>Simulations</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center space-x-2 text-[#353535] hover:bg-[#ede9ff] p-2 rounded-md transition duration-200">
                                <BookOpenIcon class="h-5 w-5" />
                                <span>Knowledge Base</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                                class="flex items-center space-x-2 text-[#353535] hover:bg-[#ede9ff] p-2 rounded-md transition duration-200">
                                <CogIcon class="h-5 w-5" />
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 p-6">
                <h2 class="text-3xl font-bold text-[#41438A] mb-6">Welcome back, John!</h2>

                <!-- Progress Overview Card -->
                <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 class="text-xl font-semibold text-[#41438A] mb-4">Current Progress</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h4 class="text-sm font-medium text-[#6D6FB0]">Simulation Status</h4>
                            <p class="text-2xl font-bold">Month 1, Day 15</p>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-[#6D6FB0]">Fish Growth</h4>
                            <p class="text-2xl font-bold">2.5 cm</p>
                        </div>
                        <div>
                            <h4 class="text-sm font-medium text-[#6D6FB0]">Survival Rate</h4>
                            <p class="text-2xl font-bold">98%</p>
                        </div>
                    </div>
                    <div class="mt-4">
                        <h4 class="text-sm font-medium text-[#6D6FB0] mb-2">Recent Achievements</h4>
                        <div class="flex space-x-2">
                            <span class="bg-[#ede9ff] text-[#41438A] px-2 py-1 rounded-full text-sm">First Tank
                                Setup</span>
                            <span class="bg-[#ede9ff] text-[#41438A] px-2 py-1 rounded-full text-sm">Optimal pH (4/7
                                days)</span>
                        </div>
                    </div>
                    <a href="#" class="text-[#41438A] hover:underline mt-4 inline-block">View detailed insights</a>
                </div>

                <!-- Quick Links -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                        <PlayIcon class="h-12 w-12 text-[#41438A] mb-4" />
                        <h3 class="text-xl font-semibold text-[#41438A] mb-2">Continue Learning</h3>
                        <p class="text-[#353535] mb-4">Resume your journey with our latest tutorials.</p>
                        <a href="#" class="text-[#41438A] hover:underline">Explore tutorials</a>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                        <BeakerIcon class="h-12 w-12 text-[#41438A] mb-4" />
                        <h3 class="text-xl font-semibold text-[#41438A] mb-2">Simulations</h3>
                        <p class="text-[#353535] mb-4">Resume your active simulation or start a new one.</p>
                        <a href="#"
                            class="bg-[#41438A] text-white px-4 py-2 rounded-md hover:bg-[#0080FF] transition duration-200">Resume
                            Simulation</a>
                    </div>
                    <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200">
                        <BookOpenIcon class="h-12 w-12 text-[#41438A] mb-4" />
                        <h3 class="text-xl font-semibold text-[#41438A] mb-2">Knowledge Base</h3>
                        <p class="text-[#353535] mb-4">Explore our comprehensive aquaculture resources.</p>
                        <a href="#" class="text-[#41438A] hover:underline">Browse articles</a>
                    </div>
                </div>

                <!-- Notifications Feed -->
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h3 class="text-xl font-semibold text-[#41438A] mb-4">Recent Notifications</h3>
                    <ul class="space-y-4">
                        <li v-for="notification in notifications" :key="notification.id"
                            class="flex items-start space-x-4">
                            <div class="flex-shrink-0">
                                <component :is="notification.icon" class="h-6 w-6 text-[#41438A]" />
                            </div>
                            <div class="flex-1">
                                <p class="font-medium">{{ notification.title }}</p>
                                <p class="text-sm text-[#6D6FB0]">{{ notification.description }}</p>
                            </div>
                            <button @click="dismissNotification(notification.id)"
                                class="text-[#6D6FB0] hover:text-[#41438A]">
                                <XIcon class="h-5 w-5" />
                            </button>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    Bell as BellIcon,
    ChevronDown as ChevronDownIcon,
    Home as HomeIcon,
    FlaskRound as BeakerIcon,
    BookOpen as BookOpenIcon,
    Settings as CogIcon,
    Play as PlayIcon,
    X as XIcon,
    Lightbulb as LightBulbIcon,
    Info as InformationCircleIcon
} from 'lucide-vue-next';

const showProfileMenu = ref(false)
const unreadNotifications = ref(true)

const toggleProfileMenu = () => {
    showProfileMenu.value = !showProfileMenu.value
}

const toggleNotifications = () => {
    unreadNotifications.value = false
    // TODO: Implement notification dropdown
}

const notifications = ref([
    {
        id: 1,
        icon: LightBulbIcon,
        title: 'New Tutorial Available',
        description: 'Learn about advanced biofloc management techniques.'
    },
    {
        id: 2,
        icon: InformationCircleIcon,
        title: 'Simulation Tip',
        description: 'Remember to monitor dissolved oxygen levels regularly.'
    },
    {
        id: 3,
        icon: BeakerIcon,
        title: 'Simulation Update',
        description: 'Your fish have grown by 0.5cm in the last 24 hours!'
    }
])

const dismissNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
}
</script>

<style scoped>
/* Add any additional styles here */
</style>