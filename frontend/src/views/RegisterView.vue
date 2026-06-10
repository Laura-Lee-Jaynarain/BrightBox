<template>
  <div class="bg-background text-on-background min-h-screen flex flex-col">

    
    <header class="fixed top-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-50">
      <div class="flex justify-between items-center px-4 h-16 w-full">
        <div class="text-xl font-bold text-blue-800 dark:text-blue-300 font-['Inter']">BrightBlock</div>
      </div>
    </header>

    <main class="flex-grow flex items-center justify-center px-4 pt-20 pb-12">
      <div class="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden min-h-[600px]">

        
        <div class="hidden md:block relative overflow-hidden bg-primary">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtAtG84CNb-rG_3eGg3hR3L8_FFt9Zew-C-dunmb4b44o3RX8vgy9uVF1jDb6hQkgFr1i6SSa9-zv6K6kzZcFr3npkYkHfGSyKEX2FELClukOItRDWmUFPNPkMg0PsyrMkkBxCJyNmhkPDHeH8lN7NAcsjhNhkjOmP3asbOXdHg1YTfawrg6gjLV66QEVSCUiZhB9Y6xTljH6yP7XVZs_y5Ig152NH-sVauqJ2X3y-bDG870DZKFpuy-KTN5uK-cVCrQLg2M_K0AAI"
            alt="Renewable Energy Landscape"
            class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
          />
          <div class="absolute inset-0 bg-gradient-to-br from-primary/60 to-primary-container/40 p-12 flex flex-col justify-end text-white">
            <h2 class="text-4xl font-extrabold mb-4 leading-tight">Powering a sustainable future for everyone.</h2>
            <p class="text-lg opacity-90 max-w-md">Join the movement towards cleaner, more efficient energy for our local communities.</p>
          </div>
        </div>

        
        <div class="p-8 md:p-16 flex flex-col justify-center">
          <div class="mb-8">
            <h1 class="text-3xl font-extrabold text-on-surface mb-2">Create Account</h1>
            <p class="text-on-surface-variant">Start your journey with BrightBlock today.</p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-5">
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-on-surface-variant" for="full_name">Full Name</label>
              <input v-model="form.fullName" id="full_name" type="text" placeholder="John Doe"
                class="form-input w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" required />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-on-surface-variant" for="email">Email Address</label>
              <input v-model="form.email" id="email" type="email" placeholder="name@example.com"
                class="form-input w-full px-4 py-3 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" required />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-on-surface-variant" for="password">Password</label>
              <div class="relative">
                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" id="password"
                  placeholder="Enter your password"
                  class="form-input w-full px-4 py-3 pr-10 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" required />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute right-3 inset-y-0 flex items-center text-on-surface-variant">
                  <span class="material-symbols-outlined" style="font-size: 18px;">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-on-surface-variant" for="confirm_password">Confirm Password</label>
              <div class="relative">
                <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" id="confirm_password"
                  placeholder="Re-enter your password"
                  class="form-input w-full px-4 py-3 pr-10 bg-surface-container border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" required />
                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 inset-y-0 flex items-center text-on-surface-variant">
                  <span class="material-symbols-outlined" style="font-size: 18px;">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
            </div>

            <p v-if="success" class="text-green-600 dark:text-green-400 text-sm font-medium">{{ success }}</p>
            <p v-if="error" class="text-error text-sm">{{ error }}</p>

            <button type="submit" :disabled="isLoading"
              class="w-full py-4 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 uppercase tracking-wide disabled:opacity-70">
              {{ isLoading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>

          <div class="relative my-8">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t border-outline-variant"></span>
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-surface-container-lowest px-4 text-on-surface-variant font-medium">Or sign up with</span>
            </div>
          </div>

          <div class="flex justify-center">
            <div id="google-register-btn" class="w-full"></div>
          </div>

          <p v-if="googleError" class="text-error text-sm mt-2 text-center">{{ googleError }}</p>

          <div class="mt-8 text-center">
            <p class="text-on-surface-variant">
              Already have an account?
              <router-link to="/login" class="text-primary font-bold hover:underline">Sign In</router-link>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const auth = useAuthStore()

const form = ref({ fullName: '', email: '', password: '', confirmPassword: '' })
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const error = ref('')
const success = ref('')
const googleError = ref('')

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: '491184789863-045kii4su8urcvvrtt8n13s8u2u3v5bh.apps.googleusercontent.com',
    callback: handleGoogleRegister
  })

  window.google.accounts.id.renderButton(
    document.getElementById('google-register-btn'),
    { theme: 'outline', size: 'large', width: '100%', text: 'signup_with' }
  )
})

const handleGoogleRegister = async (response) => {
  googleError.value = ''
  try {
    const res = await axios.post('https://localhost:7126/api/auth/google-login', {
      credential: response.credential
    })

    auth.userId = res.data.userId
    auth.token = res.data.token
    auth.fullName = res.data.fullName
    auth.email = res.data.email
    sessionStorage.setItem('userId', auth.userId)
    sessionStorage.setItem('token', auth.token)
    sessionStorage.setItem('fullName', auth.fullName)
    sessionStorage.setItem('email', auth.email)
    sessionStorage.setItem('reload', true)
    

    // Google login goes straight to dashboard (may be existing account)
    router.push('/dashboard')
  } catch (err) {
    googleError.value = err.response?.data?.message || 'Google sign up failed. Please try again.'
  }
}

const handleRegister = async () => {
  error.value = ''
  success.value = ''

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  if (form.value.password.length < 8) {
    error.value = 'Password must be at least 8 characters'
    return
  }

  isLoading.value = true

  try {
    const res = await axios.post('https://localhost:7126/api/auth/register', {
      fullName: form.value.fullName,
      email: form.value.email,
      password: form.value.password
    })

    // Store auth data returned from registration
    auth.userId = res.data.userId
    auth.token = res.data.token
    auth.fullName = res.data.fullName
    auth.email = res.data.email
    sessionStorage.setItem('userId', auth.userId)
    sessionStorage.setItem('token', auth.token)
    sessionStorage.setItem('fullName', auth.fullName)
    sessionStorage.setItem('email', auth.email)
    // Flag so router allows access to /complete-profile
    sessionStorage.setItem('isNewUser', 'true')

    sessionStorage.setItem('reload', true)

    success.value = 'Account created! Setting up your profile...'
    setTimeout(() => router.push('/complete-profile'), 800)

  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>