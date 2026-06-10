import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

import LandingPageView         from '../views/LandingPageView.vue'
import LoginView               from '../views/LoginView.vue'
import RegisterView            from '../views/RegisterView.vue'
import CompleteProfileView     from '../views/CompleteProfileView.vue'
import DashboardView           from '@/views/DashboardView.vue'
import UploadMeterView         from '@/views/UploadMeterView.vue'
import EnergyTipsView          from '@/views/EnergyTipsView.vue'
import ForgotPasswordView      from '@/views/ForgotPasswordView.vue'
import ResetPasswordView       from '@/views/ResetPasswordView.vue'
import LeaderboardPersonalView from '@/views/LeaderboardPersonalView.vue'
import SettingsView            from '../views/SettingsView.vue'
import SupportView             from '@/views/SupportView.vue'
import CommunityView           from '@/views/CommunityView.vue'
import PrivacyPolicyView       from '@/views/PrivacyPolicyView.vue'
import TermsOfServiceView      from '@/views/TermsOfServiceView.vue'
import ImpactReportView        from '@/views/ImpactReportView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return new Promise(resolve => {
        setTimeout(() => {
          const el = document.querySelector(to.hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            el.classList.add('ring-2', 'ring-primary', 'ring-offset-2')
            setTimeout(() => el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2'), 1800)
          }
          resolve({ el: to.hash, behavior: 'smooth' })
        }, 120)
      })
    }

    if (savedPosition) return savedPosition

    return { top: 0, behavior: 'smooth' }
  },

  routes: [
    // Public
    { path: '/',                 name: 'landing',         component: LandingPageView        , meta: { requiresAuth: false }},
    { path: '/login',            name: 'login',           component: LoginView              , meta: { requiresAuth: false }},
    { path: '/register',         name: 'register',        component: RegisterView           , meta: { requiresAuth: false }},
    { path: '/forgot-password',  name: 'forgot-password', component: ForgotPasswordView     , meta: { requiresAuth: false }},
    { path: '/reset-password',   name: 'reset-password',  component: ResetPasswordView      , meta: { requiresAuth: false }},
    { path: '/complete-profile', name: 'complete-profile',component: CompleteProfileView    , meta: { requiresAuth: false }},
    { path: '/privacy',          name: 'privacy',         component: PrivacyPolicyView      , meta: { requiresAuth: false }},
    { path: '/terms',            name: 'terms',           component: TermsOfServiceView     , meta: { requiresAuth: false }},
    // Protected
    { path: '/dashboard',        name: 'dashboard',       component: DashboardView          , meta: { requiresAuth: true }},
    { path: '/leaderboard',      name: 'leaderboard',     component: LeaderboardPersonalView, meta: { requiresAuth: true }},
    { path: '/upload',           name: 'upload-meter',    component: UploadMeterView        , meta: { requiresAuth: true }},
    { path: '/energy-tips',      name: 'energy-tips',     component: EnergyTipsView         , meta: { requiresAuth: true }},
    { path: '/impact-report',    name: 'impact-report',   component: ImpactReportView      , meta: { requiresAuth: true }},
    { path: '/settings',         name: 'settings',        component: SettingsView           , meta: { requiresAuth: true }},
    { path: '/support',          name: 'support',         component: SupportView            , meta: { requiresAuth: true }},
    { path: '/community',        name: 'community',       component: CommunityView          , meta: { requiresAuth: true }},

    // Catch-all
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to, from) => {
  
  const auth = useAuthStore()
  const token     = auth.token
  const isNewUser = sessionStorage.getItem('isNewUser') === 'true'

  if (to.meta.requiresAuth && !auth.token) {
    return { path: '/'}
  }

  if (to.name === 'complete-profile' && !isNewUser) {
    return token ? { name: 'dashboard' } : { name: 'login' }
  }

  if (from.name === 'complete-profile') {
    sessionStorage.removeItem('isNewUser')
  }
})

export default router