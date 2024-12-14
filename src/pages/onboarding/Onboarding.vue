<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#41438A] to-[#2D2E6B] p-6">
        <div class="bg-[#F8F8F8] rounded-lg shadow-xl overflow-hidden w-full max-w-2xl">
            <div class="p-8">
                <h1 class="text-4xl font-bold text-[#41438A] mb-6 text-center">Fishcore Onboarding</h1>

                <!-- Progress bar -->
                <div class="mb-6">
                    <div class="w-full bg-[#f1f1f2] rounded-full h-2">
                        <div class="bg-[#41438A] h-2 rounded-full transition-all duration-300 ease-in-out"
                            :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
                    </div>
                    <div class="text-right text-sm text-[#6D6FB0] mt-2">
                        Step {{ currentStep }} of {{ totalSteps }}
                    </div>
                </div>

                <!-- Form steps -->
                <form @submit.prevent="handleSubmit">
                    <div v-if="currentStep === 1">
                        <h2 class="text-2xl font-semibold text-[#41438A] mb-4">Personal Information</h2>
                        <div class="space-y-4">
                            <FormInput v-model="formData.fullName" label="Full Name" required />
                            <FormInput v-model="formData.email" label="Email Address" type="email" required />
                            <FormInput v-model="formData.phone" label="Phone Number" type="tel" />
                            <FormInput v-model="formData.password" label="Password" type="password" required />
                            <FormInput v-model="formData.confirmPassword" label="Confirm Password" type="password"
                                required />
                        </div>
                    </div>

                    <div v-if="currentStep === 2">
                        <h2 class="text-2xl font-semibold text-[#41438A] mb-4">Profile Information</h2>
                        <div class="space-y-4">
                            <FormSelect v-model="formData.userType" label="User Type"
                                :options="['Beginner Biofloc Farmer', 'Fish Crew', 'Student']" required />
                            <FormSelect v-model="formData.ageRange" label="Age Range"
                                :options="['<18', '18-24', '25-34', '35+']" required />
                            <FormSelect v-model="formData.educationLevel" label="Education Level"
                                :options="['High School', 'Undergraduate', 'Graduate', 'Other']" />
                            <FormSelect v-model="formData.primaryRole" label="Primary Role in Aquaculture"
                                :options="['Tank Maintenance', 'Feeding', 'Data Monitoring', 'Other']" />
                        </div>
                    </div>

                    <div v-if="currentStep === 3">
                        <h2 class="text-2xl font-semibold text-[#41438A] mb-4">Aquaculture Background</h2>
                        <div class="space-y-4">
                            <FormSelect v-model="formData.experienceLevel"
                                label="Experience Level in Biofloc Aquaculture"
                                :options="['None', 'Less than 6 months', '1-2 years', '2+ years']" required />
                            <FormMultiSelect v-model="formData.motivation" label="Key Motivation for Joining Fishcore"
                                :options="['Learn Biofloc basics', 'Improve efficiency in operations', 'Train for certification', 'Explore career opportunities']"
                                required />
                            <FormRadio v-model="formData.hasBioflocAccess"
                                label="Do you currently have access to a Biofloc system?" :options="['Yes', 'No']" />
                            <FormInput v-if="formData.hasBioflocAccess === 'Yes'" v-model="formData.tankCount"
                                label="How many tanks are you managing?" type="number" />
                        </div>
                    </div>

                    <div v-if="currentStep === 4">
                        <h2 class="text-2xl font-semibold text-[#41438A] mb-4">Location Information</h2>
                        <div class="space-y-4">
                            <FormSelect v-model="formData.country" label="Country"
                                :options="['United States', 'Canada', 'United Kingdom', 'Australia', 'Other']"
                                required />
                            <FormInput v-model="formData.region" label="Region/State/Province" />
                        </div>
                    </div>

                    <div v-if="currentStep === 5">
                        <h2 class="text-2xl font-semibold text-[#41438A] mb-4">Communication Preferences</h2>
                        <div class="space-y-4">
                            <FormMultiSelect v-model="formData.communicationChannels"
                                label="Preferred Communication Channels"
                                :options="['Email', 'WhatsApp/SMS', 'Phone Call']" />
                            <FormMultiSelect v-model="formData.topicsOfInterest" label="Topics of Interest"
                                :options="['Biofloc Best Practices', 'Technical Troubleshooting', 'Sustainable Aquaculture', 'Certifications and Courses']" />
                        </div>
                    </div>

                    <div v-if="currentStep === 6">
                        <h2 class="text-2xl font-semibold text-[#41438A] mb-4">Optional Survey</h2>
                        <div class="space-y-4">
                            <FormTextarea v-model="formData.challenges"
                                label="What challenges do you face in aquaculture?" />
                            <FormMultiSelect v-model="formData.learningGoals"
                                label="What is your primary learning goal?"
                                :options="['Operational mastery', 'Problem-solving', 'Certification', 'Career advancement']" />
                            <FormSelect v-model="formData.referralSource" label="How did you hear about Fishcore?"
                                :options="['Online Search', 'Social Media', 'Friends/Colleagues', 'Other']" />
                        </div>
                    </div>

                    <div class="mt-6 flex justify-between">
                        <button v-if="currentStep > 1" @click="prevStep" type="button"
                            class="px-4 py-2 bg-[#f1f1f2] text-[#41438A] rounded-lg hover:bg-[#ede9ff] transition-colors duration-300 ease-in-out">
                            Previous
                        </button>
                        <button v-if="currentStep < totalSteps" @click="nextStep" type="button"
                            class="px-4 py-2 bg-[#41438A] text-white rounded-lg hover:bg-[#0080FF] transition-colors duration-300 ease-in-out">
                            Next
                        </button>
                        <button v-if="currentStep === totalSteps" type="submit"
                            class="px-4 py-2 bg-[#41438A] text-white rounded-lg hover:bg-[#0080FF] transition-colors duration-300 ease-in-out">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormMultiSelect from './FormMultiSelect.vue'
import FormRadio from './FormRadio.vue'
import FormTextarea from './FormTextarea.vue'

const currentStep = ref(1)
const totalSteps = 6

const formData = ref({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: '',
    ageRange: '',
    educationLevel: '',
    primaryRole: '',
    experienceLevel: '',
    motivation: [],
    hasBioflocAccess: '',
    tankCount: '',
    country: '',
    region: '',
    communicationChannels: [],
    topicsOfInterest: [],
    challenges: '',
    learningGoals: [],
    referralSource: ''
})

const nextStep = () => {
    if (currentStep.value < totalSteps) {
        currentStep.value++
    }
}

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--
    }
}

const handleSubmit = () => {
    // Implement form submission logic here
    console.log('Form submitted:', formData.value)
}
</script>