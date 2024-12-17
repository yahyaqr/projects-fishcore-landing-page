<template>
    <div class="min-h-screen flex">
        <!-- Left Side -->
        <div class="w-3/5 bg-gradient-to-br from-[#41438A] to-[#2D2E6B] p-12 flex flex-col justify-center">
            <div class="max-w-lg">
                <h1 class="text-5xl font-bold text-white mb-6">Welcome to Fishcore</h1>
                <p class="text-xl text-gray-300">Start your aquaculture journey with advanced biofloc management
                    techniques and real-time monitoring.</p>
            </div>
        </div>

        <!-- Right Side -->
        <div class="w-2/5 bg-white p-12 flex justify-center">
            <div class="w-full max-w-md mt-24">
                <h2 class="text-4xl font-bold text-[#333333] mb-8">Get started</h2>

                <div class="flex flex-row space-x-4">
                    <button @click="activeTab = 'login'"
                        class="w-full h-12 bg-[#f1f1f2] text-[#333333] rounded-lg hover:bg-[#e2e2e2] transition-colors duration-300 ease-in-out text-lg font-medium">
                        Log in
                    </button>
                    <button @click="activeTab = 'register'"
                        class="w-full h-12 bg-[#f1f1f2] text-[#333333] rounded-lg hover:bg-[#e2e2e2] transition-colors duration-300 ease-in-out text-lg font-medium">
                        Sign up
                    </button>
                </div>
                <div class="border border-[#d1d5db] rounded-lg p-4 mt-4">
                    <transition name="fade" mode="out-in">
                        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
                            <div class="relative">
                                <input v-model="loginEmail" type="email" placeholder="Email"
                                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#41438A] focus:outline-none transition-all duration-300 bg-white text-[#353535] border-[#d1d5db] shadow-sm" />
                                <MailIcon class="absolute right-3 top-2 text-gray-400" />
                            </div>
                            <div class="relative">
                                <input v-model="loginPassword" :type="showLoginPassword ? 'text' : 'password'"
                                    placeholder="Password"
                                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#41438A] focus:outline-none transition-all duration-300 bg-white text-[#353535] border-[#d1d5db] shadow-sm" />
                                <button @click="showLoginPassword = !showLoginPassword" type="button"
                                    class="absolute right-3 top-2 text-gray-400 focus:outline-none">
                                    <EyeIcon v-if="!showLoginPassword" />
                                    <EyeOffIcon v-else />
                                </button>
                            </div>
                            <button type="submit"
                                class="w-full bg-[#41438A] text-white py-3 rounded-lg hover:bg-[#6D6FB0] transition-colors duration-300 ease-in-out">
                                Login
                            </button>
                        </form>

                        <form v-else @submit.prevent="handleRegister" class="space-y-4">
                            <div class="relative">
                                <input v-model="registerName" type="text" placeholder="Full Name"
                                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#41438A] focus:outline-none transition-all duration-300 bg-white text-[#353535] border-[#d1d5db] shadow-sm" />
                                <UserIcon class="absolute right-3 top-2 text-gray-400" />
                            </div>
                            <div class="relative">
                                <input v-model="registerEmail" type="email" placeholder="Email"
                                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#41438A] focus:outline-none transition-all duration-300 bg-white text-[#353535] border-[#d1d5db] shadow-sm" />
                                <MailIcon class="absolute right-3 top-2 text-gray-400" />
                            </div>
                            <div class="relative">
                                <input v-model="registerPassword" :type="showRegisterPassword ? 'text' : 'password'"
                                    placeholder="Password"
                                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#41438A] focus:outline-none transition-all duration-300 bg-white text-[#353535] border-[#d1d5db] shadow-sm" />
                                <button @click="showRegisterPassword = !showRegisterPassword" type="button"
                                    class="absolute right-3 top-2 text-gray-400 focus:outline-none">
                                    <EyeIcon v-if="!showRegisterPassword" />
                                    <EyeOffIcon v-else />
                                </button>
                            </div>
                            <button type="submit"
                                class="w-full bg-[#41438A] text-white py-3 rounded-lg hover:bg-[#6D6FB0] transition-colors duration-300 ease-in-out">
                                Register
                            </button>
                        </form>
                    </transition>
                </div>

                <div class="mt-6 text-center">
                    <a href="#" class="text-[#e2e2e2] hover:text-[#d1d5db]">Forgot password?</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { MailIcon, EyeIcon, EyeOffIcon, UserIcon } from 'lucide-vue-next'

const activeTab = ref('login')
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)

const loginEmail = ref('')
const loginPassword = ref('')
const registerName = ref('')
const registerEmail = ref('')
const registerPassword = ref('')

const handleLogin = () => {
    // Implement login logic here
    console.log('Login:', { email: loginEmail.value, password: loginPassword.value })
}

const handleRegister = () => {
    // Implement registration logic here
    console.log('Register:', { name: registerName.value, email: registerEmail.value, password: registerPassword.value })
}
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