<template>
    <div>
        <!-- Top Bar -->
        <div class="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-20">
            <!-- Left Section -->
            <div class="flex items-center gap-2">
                <!-- Original Component -->
                <div class="flex items-center gap-4 bg-white border-2 border-gray-400 rounded-lg px-4 py-2 shadow-sm">
                    <Settings class="w-6 h-6" />
                    <div class="flex items-center gap-2">
                        <Sun class="w-6 h-6 text-yellow-500" />
                        <div class="w-px h-6 bg-gray-400"></div>
                        <span class="font-medium">SENIN 13.00 WIB</span>
                    </div>
                </div>

                <!-- New Button -->
                <button @click="$emit('click', 'fastForward')"
                    class="flex items-center gap-2 bg-white border-2 border-gray-400 rounded-lg px-4 py-2 shadow-sm hover:bg-gray-100 transition">
                    <FastForward class="w-6 h-6 text-blue-500" />
                </button>
            </div>

            <!-- Right Section -->
            <div class="flex gap-4">
                <button @click="$emit('click', 'topRightButton1')"
                    class="w-24 h-16 bg-white border-2 border-gray-400 shadow-sm rounded-lg hover:bg-gray-100">
                    BUTTON
                </button>
                <button @click="$emit('click', 'topRightButton2')"
                    class="w-24 h-16 bg-white border-2 border-gray-400 shadow-sm rounded-lg hover:bg-gray-100">
                    BUTTON
                </button>
                <button @click="$emit('click', 'topRightButton3')"
                    class="w-24 h-16 bg-white border-2 border-gray-400 shadow-sm rounded-lg hover:bg-gray-100">
                    BUTTON
                </button>
            </div>
        </div>

        <!-- Left Sidebar -->
        <div class="absolute left-4 -mt-16 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
            <button @click="$emit('click', 'leftSidebarButton1')"
                class="w-24 h-24 bg-white border-2 border-gray-400 shadow-sm rounded-lg hover:bg-gray-100">
                BUTTON
            </button>
            <button @click="$emit('click', 'leftSidebarButton2')"
                class="w-24 h-24 bg-white border-2 border-gray-400 shadow-sm rounded-lg hover:bg-gray-100">
                BUTTON
            </button>
            <button @click="$emit('click', 'leftSidebarButton3')"
                class="w-24 h-24 bg-white border-2 border-gray-400 shadow-sm rounded-lg hover:bg-gray-100">
                BUTTON
            </button>
        </div>

        <!-- Right Sidebar -->
        <div class="absolute right-4 -mt-16 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
            <button @click="$emit('click', 'rightSidebarButton1')"
                class="w-24 h-24 bg-white border-2 border-gray-400 shadow-sm rounded-lg hover:bg-gray-100">
                BUTTON
            </button>
            <button @click="$emit('click', 'rightSidebarButton2')"
                class="w-24 h-24 bg-white border-2 border-gray-400 shadow-sm rounded-lg hover:bg-gray-100">
                BUTTON
            </button>
            <button @click="$emit('click', 'rightSidebarButton3')"
                class="w-24 h-24 bg-white border-2 border-gray-400 shadow-sm rounded-lg hover:bg-gray-100">
                BUTTON
            </button>
        </div>

        <!-- Bottom Section -->
        <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
            <!-- Notification Card -->
            <div class="bg-white border-2 border-gray-400 shadow-sm rounded-lg p-4 w-96 max-w-[calc(100%-16rem)]">
                <h2 class="font-bold mb-2">NOTIFICATION</h2>
                <div class="text-gray-600 space-y-1 max-h-40 overflow-y-auto">
                    <p v-for="i in 3" :key="i">CONTENT CONTENT CONTENT CONTENT</p>
                </div>
            </div>

            <!-- Bottom Right Section -->
            <div class="flex flex-col gap-2">
                <div
                    class="w-32 bg-white border-2 border-gray-400 shadow-sm rounded-lg px-6 py-2 text-center font-medium">
                    DAY 1/120
                </div>
                <button @click="$emit('click', 'bottomRightButton')"
                    class="w-32 h-32 bg-white border-2 border-gray-400 shadow-sm rounded-lg hover:bg-gray-100 font-bold">
                    BUTTON
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Settings, Sun, FastForward } from 'lucide-vue-next';

defineEmits(["click"]);
</script>

<style scoped>
button {
    transition: all 0.2s ease-in-out;
}

button:hover {
    transform: translateY(-1px);
}

button:active {
    transform: translateY(1px);
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .w-24 {
        width: 4rem;
    }

    .h-24 {
        height: 4rem;
    }

    .w-20 {
        width: 3rem;
    }

    .h-16 {
        height: 2.5rem;
    }

    .w-32 {
        width: 6rem;
    }

    .h-32 {
        height: 6rem;
    }
}

@media (max-height: 600px) {
    .top-1\/2 {
        top: 40%;
    }
}
</style>