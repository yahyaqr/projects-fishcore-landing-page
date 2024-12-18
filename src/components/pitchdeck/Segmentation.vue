<template>
    <section id="segmentation" class="py-12 sm:py-20 bg-gradient-to-b bg-[#ffffff] text-[#353535]">
        <div class="container mx-auto px-4">
            <!-- Section Title -->
            <h3 class="text-2xl sm:text-3xl font-bold text-center mb-6">
                Empowering Indonesia's Aspiring Aquaculture Enthusiasts
            </h3>

            <!-- Card with Placeholder Components -->
            <div class="bg-[#f1f1f2] p-6 sm:p-8 rounded-lg shadow-lg">
                <!-- Three Columns of Placeholders -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 min-h-[400px]">
                    <PlaceholderFull />
                    <PlaceholderFull />
                    <PlaceholderFull />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import PlaceholderFull from "../../assets/PlaceholderFull.vue";
</script>