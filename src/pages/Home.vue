<template>
    <div class="min-h-screen bg-blue-50">
        <!-- Header -->
        <Header />

        <!-- Hero Section -->
        <Hero />

        <!-- Problem Section -->
        <Problem />

        <!-- Solution Section -->
        <Solution />

        <!-- Features Section -->
        <Features />

        <!-- Target Audience Section -->
        <Segmentation />

        <!-- Business Model Section -->
        <!-- <BusinessModel /> -->

        <!-- Competitive Advantage Section -->
        <CompetitiveAdvantage />

        <!-- Market Opportunity Section -->
        <!-- <MarketOpportunity /> -->

        <!-- Traction & Milestones Section -->
        <!-- <Timeline /> -->

        <!-- Call to Action Section -->
        <CTA />

        <!-- Footer -->
        <Footer />
    </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Hero from '../components/pitchdeck/Hero.vue';
import Problem from '../components/pitchdeck/Problem.vue';
import Solution from '../components/pitchdeck/Solution.vue';
import Segmentation from '../components/pitchdeck/Segmentation.vue';
import Features from '../components/pitchdeck/Features.vue';
// import BusinessModel from '../components/pitchdeck/BusinessModel.vue';
import CompetitiveAdvantage from '../components/pitchdeck/CompetitiveAdvantage.vue';
// import MarketOpportunity from '../components/pitchdeck/MarketOpportunity.vue';
// import Timeline from '../components/pitchdeck/Timeline.vue';
import CTA from '../components/pitchdeck/CTA.vue';
</script>

<style scoped>
/* Add any additional custom styles here */
</style>