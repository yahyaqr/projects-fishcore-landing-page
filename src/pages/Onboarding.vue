<template>
    <div class="min-h-screen flex">
        <div class="w-3/5 bg-gradient-to-br from-[#41438A] to-[#2D2E6B] p-12 flex flex-col justify-center">
            <div class="max-w-lg">
                <h1 class="text-5xl font-bold text-white mb-6">Welcome to Fishcore</h1>
                <p class="text-xl text-gray-300">
                    Start your aquaculture journey with advanced biofloc management techniques and real-time monitoring.
                </p>
            </div>
        </div>
        <div class="w-2/5 bg-white p-12 flex items-center justify-center">
            <div class="w-full flex items-center justify-center">
                <div class="max-w-lg w-full">
                    <div class="p-8">
                        <div class="mb-6">
                            <div class="w-full bg-[#f1f1f2] rounded-full h-2">
                                <div class="bg-[#41438A] h-2 rounded-full transition-all duration-300 ease-in-out"
                                    :style="{ width: `${(currentStep / visibleSteps) * 100}%` }"></div>
                            </div>
                            <div class="text-right text-sm text-[#6D6FB0] mt-2">
                                Question {{ currentStep }} of {{ visibleSteps }}
                            </div>
                        </div>

                        <!-- Form Steps -->
                        <form @submit.prevent="handleSubmit">
                            <div v-if="currentStep === 1">
                                <FormSelect v-model="formData.ageRange" label="Age Range"
                                    :options="['<18', '18-24', '25-34', '35+']" required />
                            </div>

                            <div v-if="currentStep === 2">
                                <FormInput v-model="formData.region" label="Region/State/Province" />
                            </div>

                            <div v-if="currentStep === 3">
                                <FormSelect v-model="formData.experienceLevel" label="Experience Level in Aquaculture"
                                    :options="['None', 'Less than 6 months', '1-2 years', '2+ years']" required />
                            </div>

                            <div v-if="currentStep === 4">
                                <FormRadio v-model="formData.hasBioflocAccess"
                                    label="Do you currently have a Biofloc fish pond?" :options="['Yes', 'No']" />
                            </div>

                            <div v-if="currentStep === 5 && formData.hasBioflocAccess === 'Yes'">
                                <FormInput v-model="formData.tankCount" label="How many ponds are you managing?"
                                    type="number" />
                            </div>

                            <div v-if="currentStep === 6 && formData.hasBioflocAccess === 'Yes'">
                                <FormTextarea v-model="formData.challenges"
                                    label="What challenges do you face in aquaculture?" />
                            </div>

                            <div class="mt-6 flex">
                                <button v-if="currentStep > 1" @click="prevStep" type="button"
                                    class="px-4 py-2 bg-[#f1f1f2] text-[#41438A] rounded-lg hover:bg-[#ede9ff] transition-colors duration-300 ease-in-out mr-auto">
                                    Previous
                                </button>
                                <button v-if="currentStep < visibleSteps" @click="nextStep" type="button"
                                    class="px-4 py-2 bg-[#41438A] text-white rounded-lg hover:bg-[#0080FF] transition-colors duration-300 ease-in-out ml-auto">
                                    Next
                                </button>
                                <button v-if="currentStep === visibleSteps" type="submit"
                                    class="px-4 py-2 bg-[#41438A] text-white rounded-lg hover:bg-[#0080FF] transition-colors duration-300 ease-in-out ml-auto">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FormInput from '../components/form/FormInput.vue';
import FormSelect from '../components/form/FormSelect.vue';
import FormRadio from '../components/form/FormRadio.vue';
import FormTextarea from '../components/form/FormTextarea.vue';

// Current step state
const currentStep = ref(1);

// Form data state
const formData = ref({
    ageRange: '',
    region: '',
    experienceLevel: '',
    hasBioflocAccess: '',
    tankCount: '',
    challenges: '',
});

// Dynamically determine visible steps based on Biofloc access
const visibleSteps = computed(() => {
    if (formData.value.hasBioflocAccess === 'Yes') {
        return 6; // Include steps 5 and 6
    }
    return 4; // Only steps 1 through 4
});

// Navigate to the next step
const nextStep = () => {
    if (currentStep.value < visibleSteps.value) {
        currentStep.value++;
    }
};

// Navigate to the previous step
const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

// Handle form submission
const handleSubmit = () => {
    console.log('Form submitted:', formData.value);
};
</script>
