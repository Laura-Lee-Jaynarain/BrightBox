import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', () => {
    const token      = ref(sessionStorage.getItem('token') || '')
    const userId     = ref(sessionStorage.getItem('userId') || '')
    const fullName   = ref(sessionStorage.getItem('fullName') || '')
    const email      = ref(sessionStorage.getItem('email') || '')
    const postalcode = ref(sessionStorage.getItem('postalcode') || '')

    return {token, userId, fullName, email, postalcode}
})