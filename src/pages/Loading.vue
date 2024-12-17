<template>
    <div class="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <!-- Banner Image Container -->
        <div class="w-full max-w-3xl mb-8 relative">
            <div class="fish-pond relative overflow-hidden rounded-lg border border-[#41438A]/20 flex items-center justify-center"
                style="aspect-ratio: 16 / 5">
                <!-- Pond Background -->
                <div class="absolute inset-0 bg-gradient animate-gradient-flow"></div>

                <!-- Loading Text -->
                <div class="absolute inset-0 flex items-center justify-center">
                    <p class="loading-text text-white text-4xl font-bold">{{ loadingText }}</p>
                </div>

                <!-- Waves -->
                <div class="wave-container">
                    <svg v-for="(wave, index) in waves" :key="index" class="wave" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512" :style="{
                        top: wave.yPosition + 'px',
                        transform: `translateX(${wave.initialXOffset}%)`,
                        animationDelay: wave.delay + 's',
                    }">
                        <g>
                            <path d="M471,79.483c-12.212-6.551-22.696-15.974-30.534-27.339l-13.796-20l-13.797,20
                                               c-7.839,11.365-18.33,20.788-30.542,27.339c-12.212,6.56-26.11,10.271-41,10.28c-14.89-0.009-28.78-3.72-41-10.28
                                               c-12.204-6.551-22.694-15.974-30.534-27.339l-13.796-20l-13.797,20c-7.839,11.365-18.33,20.788-30.533,27.339
                                               c-12.22,6.56-26.11,10.271-41,10.28c-14.89-0.009-28.788-3.72-41-10.28c-12.212-6.551-22.703-15.974-30.543-27.339
                                               l-13.796-20l-13.796,20C63.694,63.509,53.212,72.932,41,79.483c-12.212,6.56-26.11,10.271-41,10.28v33.517
                                               c20.509,0.009,39.94-5.161,56.864-14.263c10.534-5.66,20.119-12.839,28.466-21.236c8.356,8.398,17.932,15.576,28.466,21.236
                                               c16.932,9.102,36.356,14.272,56.873,14.263c20.508,0.009,39.932-5.161,56.864-14.263c10.534-5.66,20.119-12.839,28.466-21.236
                                               c8.347,8.398,17.932,15.576,28.466,21.236c16.932,9.102,36.355,14.272,56.864,14.263c20.517,0.009,39.94-5.161,56.873-14.263
                                               c10.534-5.66,20.11-12.839,28.466-21.236c8.347,8.398,17.932,15.576,28.466,21.236c16.924,9.102,36.355,14.272,56.864,14.263
                                               V89.763C497.11,89.754,483.212,86.043,471,79.483z"
                                style="opacity: 0.2;" />
                        </g>
                    </svg>
                </div>

            </div>
            <div class="w-full max-w-3xl text-center px-4 mt-8">
                <p class="text-[#353535] text-lg leading-relaxed max-w-2xl mx-auto font-medium">
                    {{ currentTip }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const loadingText = ref('Loading 0%'); // Dynamic loading text
const waves = ref([]);

// Generate multiple waves with random Y positions and delays
const generateWaves = () => {
    const predefinedPositions = [-30, 10, 70, 120, 170, 220]; // Hard-coded Y positions
    waves.value = predefinedPositions.map((yPosition, index) => ({
        yPosition, // Normal Y positions within the pond
        initialXOffset: 600 + index * 50, // Start off-screen horizontally, staggered
        delay: Math.random() * 10, // Add staggered animation delay for smooth entry
    }));
};

// Animate loading progress
let intervalId;

const animateLoading = () => {
    let progress = 0;
    intervalId = setInterval(() => {
        if (progress >= 100) {
            clearInterval(intervalId);
        } else if (progress >= 60 && progress <= 70) {
            progress += 0.25; // Slow down progress between 60% and 70%
        } else {
            progress += 1; // Normal speed for other ranges
        }
        loadingText.value = `Loading ${Math.floor(progress)}%`;
    }, 50);
};

const tips = [
    'Water quality management tip: Maintain a C/N ratio of 15:1 in biofloc systems.',
    'Feeding tip: Feed your fish three times a day at consistent times for stable growth.',
    'Aeration is needed 24/7. Keep dissolved oxygen levels above 4 mg/L.',
    'Maintain a water temperature of around 28°C. Regularly check your thermometer.',
    'Ideal floc color is brownish. Watch out if it turns green.',
    'Keep pH levels between 7.0 and 8.0 to optimize bacterial activity.',
    'It takes about two weeks for bacteria to establish in a new tank.',
    'The proper solid content level is 30-50 ml/L. Manage it by adjusting your inlet.',
];

const currentTip = ref('');

const updateTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    currentTip.value = tips[randomIndex];
};

let tipInterval;

onMounted(() => {
    updateTip(); // Show the first random tip
    tipInterval = setInterval(updateTip, 5000); // Change the tip every 5 seconds
    generateWaves();
    animateLoading();
});

onUnmounted(() => {
    clearInterval(tipInterval); // Clear interval to avoid memory leaks
    clearInterval(intervalId);
});
</script>

<style scoped>
.loading-text {
    position: absolute;
    text-align: center;
    font-size: 3rem;
    color: white;
    font-weight: bold;
    z-index: 10;
}

/* Animated Gradient */
@keyframes gradient-flow {
    0% {
        background-position: 100% 50%;
        /* Start outside right */
    }

    100% {
        background-position: 0% 50%;
        /* End outside left */
    }
}

.bg-gradient {
    background: linear-gradient(to right,
            #94B8ED,
            /* Base color */
            #7FAAE6,
            /* Slightly darker */
            #6396D9,
            /* Darker contrast */
            #7FAAE6,
            /* Slightly darker */
            #94B8ED
            /* Back to base color */
        );
    background-size: 300% 100%;
    /* Extend gradient width for smoothness */
}

.animate-gradient-flow {
    animation: gradient-flow 10s linear infinite;
    /* Smooth, slow transition */
}

/* Waves */
.wave-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
}

.wave {
    position: absolute;
    width: 20%;
    height: auto;
    animation: wave-move 6s linear infinite;
    fill: #000000;
    opacity: 0.2;
}

@keyframes wave-move {
    0% {
        transform: translateX(400%);
    }

    100% {
        transform: translateX(-100%);
    }
}

.fish-pond {
    position: relative;
    cursor: url('path-to-your-image.png'), auto;
    /* Use your custom PNG */
}

.fish-pond:hover {
    cursor: url('path-to-your-image.png'), auto;
    /* Ensure it activates on hover */
}
</style>
