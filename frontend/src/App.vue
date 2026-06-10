<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
import TopBar  from '@/components/TopBar.vue'
import ChatBot from '@/components/Chatbot.vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const prefs = useUserPrefsStore()
const auth = useAuthStore()

const isPublicRoute = computed(() => {
  const publicPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/complete-profile', '/privacy', '/terms']
  return publicPaths.includes(route.path)
})

const mobileSidebarOpen = ref(false)
</script>

<template>
  <router-view v-if="isPublicRoute" />

  <div v-else :key="auth.userId" class="flex h-screen overflow-hidden">
    <SideBar :mobile-open="mobileSidebarOpen" @close="mobileSidebarOpen = false" />

    
    <div class="flex-1 flex flex-col overflow-hidden md:pl-[17rem] min-w-0">
      <TopBar @toggle-sidebar="mobileSidebarOpen = !mobileSidebarOpen" />
      <main class="flex-1 overflow-auto w-full">
        <div class="px-4 sm:px-6 xl:px-8 pt-6 pb-12 w-full">
          <router-view />
        </div>
      </main>
    </div>
  </div>

  <ChatBot v-if="!isPublicRoute && prefs.features.chatbot" :key="auth.userId"/>
</template>
