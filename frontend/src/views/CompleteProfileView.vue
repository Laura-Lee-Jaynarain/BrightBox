<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-dim">
    <main class="flex flex-col md:flex-row w-full max-w-5xl min-h-[580px] bg-surface-container-lowest shadow-2xl overflow-hidden rounded-2xl">

      <!-- Left panel -->
      <div class="hidden md:flex md:w-5/12 relative overflow-hidden bg-primary">
        <img
          alt="Renewable Energy Future"
          class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuApX5b9aiIA_wCHd4wg6bEOrMgtlbRVXT_KNRkmviI-ubUqpcqJIdTJwtCrmPhC4XGBGQREeVT20r-16qPVcmXT-iJMGshunCEaMbrBJuHKLwI6uX_FegahYAi5NhyW1DmQ7lfBqlABYsO2Ka0yIbrp6UtWjYliLml5Xbf4FSieoSP0WprWudma8fGf8pAsPGJ2GdQpPY3dQkj2ILnYsoq1KQvAg9WrGjUcnKGshmlh5nE3gJYYsUx1sTh6WnFrRPLVIvjjZAjcWnfM"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-primary/60 to-primary-container/40 p-12 flex flex-col justify-end text-white">
          <h2 class="text-4xl font-extrabold mb-4 leading-tight">Empowering your local grid.</h2>
          <p class="text-lg opacity-90 max-w-md">Join thousands of households contributing to a cleaner, more efficient energy future through smart community sharing.</p>
        </div>
      </div>

      <!-- Right panel -->
      <div class="w-full md:w-7/12 flex items-center justify-center bg-surface-container-lowest p-8 md:p-12">
        <div class="w-full max-w-sm">

          <div class="mb-8">
            <h2 class="text-2xl font-extrabold text-on-surface mb-1">Complete Your Profile</h2>
            <p class="text-on-surface-variant text-sm">Help us tailor your energy savings based on your location and household.</p>
          </div>

          <!-- Progress bar -->
          <div class="flex gap-1.5 mb-8">
            <div class="h-1.5 flex-1 bg-primary rounded-full"></div>
            <div class="h-1.5 flex-1 bg-primary rounded-full"></div>
            <div class="h-1.5 flex-1 bg-surface-container-highest rounded-full"></div>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">

            <!-- Postal Code -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-on-surface-variant ml-1" for="postal_code">Postal Code / Area</label>
              <div class="relative flex items-center">
                <svg class="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
                <input
                  v-model="form.postalCode"
                  id="postal_code"
                  type="number"
                  placeholder="e.g. 2000"
                  class="w-full pl-9 pr-4 py-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface text-sm"
                  required
                />
              </div>
            </div>

            <!-- Household Size -->
            <div class="space-y-1.5">
              <label class="block text-sm font-medium text-on-surface-variant ml-1" for="household_size">Household Size</label>
              <div class="relative flex items-center">
                <svg class="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-1a4 4 0 00-5.447-3.724M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8v-1a4 4 0 014-4h6a4 4 0 014 4v1H5z"/>
                </svg>
                <select
                  v-model="form.householdSize"
                  id="household_size"
                  class="w-full pl-9 pr-8 py-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none text-on-surface text-sm"
                  required
                >
                  <option disabled value="">Select number of people</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5 People</option>
                  <option value="6">6+ People</option>
                </select>
                <svg class="absolute right-3 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>

            <p v-if="error" class="text-error text-sm">{{ error }}</p>
            <p v-if="success" class="text-green-600 text-sm font-medium">{{ success }}</p>

            <div class="pt-2">
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold text-base hover:opacity-90 transition-all shadow-md active:scale-[0.98] duration-150 disabled:opacity-70"
              >
                {{ isLoading ? 'Saving...' : 'Continue' }}
              </button>
            </div>

          </form>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
const auth = useAuthStore()

const router = useRouter()

const form = ref({
  postalCode: '',
  householdSize: ''
})

const isLoading = ref(false)
const error = ref('')
const success = ref('')

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
  isLoading.value = true

  try {
    const userId = auth.userId
    const token = auth.token

    await axios.post(
      'https://localhost:7126/api/auth/update-profile',
      {
        userId: userId,
        postalCode: parseInt(form.value.postalCode),
        houseHoldSize: parseInt(form.value.householdSize)
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    success.value = 'Profile saved! Redirecting to dashboard...'
    setTimeout(() => router.push('/dashboard'), 1000)

  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save profile. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>