<template>
    <section id="impact" class="py-20">
        <div class="container mx-auto px-4">
            <h3 class="text-3xl font-bold text-center mb-12">Fostering a Sustainable Future in Aquaculture</h3>
            <div class="grid md:grid-cols-3 gap-8 mb-12">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <LeafIcon class="w-12 h-12 text-green-600 mb-4" />
                    <h4 class="text-xl font-semibold mb-2">Eco-Friendly Practices</h4>
                    <p>Promotes environmentally friendly farming techniques.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <TrendingDownIcon class="w-12 h-12 text-green-600 mb-4" />
                    <h4 class="text-xl font-semibold mb-2">Reduced Risks</h4>
                    <p>Lowers real-world learning costs and environmental risks.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <UsersIcon class="w-12 h-12 text-green-600 mb-4" />
                    <h4 class="text-xl font-semibold mb-2">Youth Awareness</h4>
                    <p>Builds awareness among younger generations about sustainable aquaculture.</p>
                </div>
            </div>
            <div>
                <img src="../../assets/placeholder.svg" alt="Environmental Benefits Infographic"
                    class="mx-auto rounded-lg shadow-md" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { UsersIcon, LeafIcon, TrendingDownIcon } from 'lucide-vue-next'
</script>

<style scoped></style>