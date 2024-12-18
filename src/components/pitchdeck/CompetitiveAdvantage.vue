<template>
    <section id="competitive" class="py-20 bg-[#ffffff] text-[#353535]">
        <div class="container mx-auto px-4">
            <!-- Combined Header and Toggle Buttons Row -->
            <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
                <!-- Header -->
                <h2 class="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-4 sm:mb-0">
                    Why {{ currentTable === 'fishedu' ? 'Fishedu' : 'Fishcam' }} Stands Out
                </h2>

                <!-- Toggle Buttons -->
                <div class="flex space-x-4">
                    <button @click="switchTable('fishedu')"
                        :class="['px-4 py-2 rounded-lg font-semibold', currentTable === 'fishedu' ? 'bg-[#41438A] text-white' : 'bg-gray-200']">
                        Fishedu
                    </button>
                    <button @click="switchTable('fishcam')"
                        :class="['px-4 py-2 rounded-lg font-semibold', currentTable === 'fishcam' ? 'bg-[#41438A] text-white' : 'bg-gray-200']">
                        Fishcam
                    </button>
                </div>
            </div>

            <!-- Dynamic Table -->
            <div class="overflow-x-auto">
                <table class="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead>
                        <tr class="bg-[#41438A] text-white">
                            <th class="py-4 px-6 text-left">Service</th>
                            <th class="py-4 px-6 text-center" v-for="(column, index) in displayedColumns" :key="index">
                                {{ column }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(feature, index) in displayedFeatures" :key="index" :class="[
                        feature.isHighlight ? 'bg-[#E8F4FD] font-bold text-[#41438A]' : 'hover:bg-gray-100',
                    ]">
                            <td class="py-4 px-6">{{ feature.title }}</td>
                            <td class="py-4 px-6 text-center" v-for="(check, idx) in feature.checks" :key="idx">
                                {{ check }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';

// Updated Columns
const fisheduColumns = ["Practicality", "Training Value", "Depth of Knowledge", "Personalization", "Cost/5 yrs"];
const fishcamColumns = ["Availability", "Certainty", "Operator Dependency", "Scope", "Cost/5 yrs"];

// Fishedu Table Data
const fisheduFeatures = [
    {
        title: "Fishedu",
        isHighlight: true,
        checks: ["Online; Anytime", "Comprehensive theory and practice", "Comprehensive", "General", "$80"]
    },
    {
        title: "Workshops",
        isHighlight: false,
        checks: ["Offline; Eventual", "Time-restricted", "Partial", "General", "$250"]
    },
    {
        title: "Online Source",
        isHighlight: false,
        checks: ["Online; Anytime", "Free but partial", "Partial", "General", "$0"]
    },
    {
        title: "Farm Consultant",
        isHighlight: false,
        checks: ["Offline; Anytime", "Personalized insights", "Comprehensive", "Tailored", "$7705"]
    },
];

// Fishcam Table Data
const fishcamFeatures = [
    {
        title: "Fishcam",
        isHighlight: true,
        checks: ["24/7", "All issues", "No operator", "Full scope", "$250"]
    },
    {
        title: "Farm Consultant",
        isHighlight: false,
        checks: ["If needed", "All issues", "Requires operator", "Full scope", "$7705"]
    },
    {
        title: "Fish Farm Crew",
        isHighlight: false,
        checks: ["3x a day", "Require guidance", "Requires operator", "Limited scope", "$7705"]
    },
    {
        title: "CCTV",
        isHighlight: false,
        checks: ["24/7", "Need operator; Visual only", "Requires operator", "Limited scope", "$256"]
    },
    {
        title: "Electricity Alarm",
        isHighlight: false,
        checks: ["24/7", "Often unheard", "No operator", "Electricity only", "$32"]
    },
    {
        title: "Generator",
        isHighlight: false,
        checks: ["If needed", "Need operator", "Requires operator", "Electricity only", "$386"]
    },
    {
        title: "ATS Generator",
        isHighlight: false,
        checks: ["24/7", "Electricity only", "No operator", "Limited scope", "$800"]
    },
];

// Switch Table Logic
const currentTable = ref("fishedu");
const switchTable = (table) => (currentTable.value = table);

// Dynamically Displayed Table and Columns
const displayedFeatures = computed(() =>
    currentTable.value === "fishedu" ? fisheduFeatures : fishcamFeatures
);
const displayedColumns = computed(() =>
    currentTable.value === "fishedu" ? fisheduColumns : fishcamColumns
);
</script>
