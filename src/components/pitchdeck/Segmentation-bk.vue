<template>
    <section id="segmentation" class="py-12 sm:py-20 bg-gradient-to-b bg-[#ffffff] text-[#353535]">
        <div class="container mx-auto px-4">
            <h3 class="text-2xl sm:text-3xl font-bold text-center mb-6">
                Empowering Indonesia's Aspiring Aquaculture Enthusiasts
            </h3>

            <div class="flex flex-col lg:flex-row gap-6">
                <!-- Mobile View: Tiny Buttons -->
                <div class="grid grid-cols-3 gap-2 sm:hidden">
                    <button v-for="(audience, index) in audiences" :key="index" @click="selectAudience(index)"
                        class="p-2 rounded-lg flex justify-center items-center transition-all duration-300 bg-[#f1f1f2] w-full"
                        :class="selectedAudience === index ? 'shadow-md' : 'hover:bg-gray-100'">
                        <component :is="audience.icon" class="w-6 h-6 text-[#41438A]" />
                    </button>
                </div>

                <!-- Tablet View: Dropdown -->
                <div class="hidden sm:block lg:hidden relative">
                    <button @click="toggleDropdown"
                        class="w-full bg-[#f1f1f2] p-4 rounded-lg flex justify-between items-center shadow-md">
                        <span class="font-semibold">
                            {{ audiences[selectedAudience].title }}
                        </span>
                        <ChevronDownIcon class="w-5 h-5 text-gray-500" />
                    </button>
                    <div v-if="isDropdownOpen"
                        class="absolute z-10 bg-white w-full shadow-lg rounded-lg mt-2 overflow-hidden">
                        <button v-for="(audience, index) in audiences" :key="index"
                            @click="selectAudienceFromDropdown(index)"
                            class="w-full p-4 flex items-center hover:bg-gray-100 transition-all">
                            <component :is="audience.icon" class="w-6 h-6 text-[#41438A] mr-4" />
                            <span class="font-semibold">{{ audience.title }}</span>
                        </button>
                    </div>
                </div>

                <!-- Desktop View: Vertical Buttons -->
                <div class="hidden lg:flex lg:flex-col lg:gap-4">
                    <button v-for="(audience, index) in audiences" :key="index" @click="selectAudience(index)"
                        class="p-4 rounded-lg flex items-center transition-all duration-300 bg-[#f1f1f2]"
                        :class="selectedAudience === index ? 'shadow-md' : 'hover:bg-gray-100'">
                        <div class="flex items-center justify-center w-10 h-10 mr-4">
                            <component :is="audience.icon" class="w-8 h-8 text-[#41438A]" />
                        </div>
                        <span class="font-semibold text-sm sm:text-base">{{ audience.title }}</span>
                    </button>
                </div>

                <!-- Audience Content -->
                <div class="w-full">
                    <transition name="fade" mode="out-in">
                        <div v-if="selectedAudience !== null"
                            class="bg-[#f1f1f2] p-6 sm:p-8 rounded-lg shadow-lg h-full flex flex-col items-center justify-center">
                            <div class="flex flex-col w-full">
                                <h4 class="text-xl sm:text-2xl font-semibold mb-4">
                                    {{ audiences[selectedAudience].title }}
                                </h4>
                                <p class="text-sm sm:text-base text-gray-600 mb-4">
                                    {{ audiences[selectedAudience].description }}
                                </p>
                            </div>
                            <PlaceholderFull />
                        </div>
                        <div v-else
                            class="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full h-full flex items-center justify-center">
                            <p class="text-base sm:text-xl">Select an audience to view details</p>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import {
    UsersIcon,
    GraduationCapIcon,
    UserPlusIcon,
    ChevronDownIcon,
} from "lucide-vue-next";
import PlaceholderFull from "../../assets/PlaceholderFull.vue";

const audiences = [
    {
        icon: GraduationCapIcon,
        title: "Students",
        description:
            "Educational institutions and aspiring learners in the field of aquaculture.",
    },
    {
        icon: UserPlusIcon,
        title: "Beginners",
        description:
            "Individuals starting aquaculture side businesses or exploring the field.",
    },
    {
        icon: UsersIcon,
        title: "Fish Crew",
        description:
            "Experienced professionals in traditional aquaculture looking to upskill.",
    },
];

const selectedAudience = ref(0);
const isDropdownOpen = ref(false);

const selectAudience = (index) => {
    selectedAudience.value = index;
    isDropdownOpen.value = false; // Close dropdown on selection
};

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const selectAudienceFromDropdown = (index) => {
    selectAudience(index);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>