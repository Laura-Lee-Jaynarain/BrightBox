<script setup>

import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import SideBar from '../components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
import { useLeaderboardStore } from '@/stores/leaderboard'
import { useAuthStore } from '@/stores/authStore'
import { useUserPrefsStore } from '@/stores/userPrefs'

const store = useLeaderboardStore() 
const { leaderboard, myRank, streakHistory, recentMonths, streak, streakLabel, loading, fetchError } = storeToRefs(store)

const auth = useAuthStore()
const prefs = useUserPrefsStore()
const currentUserId = auth.userId || null
const currentUserPostalCode = parseInt(auth.postalcode) || null
const viewMode = ref('global')

function avatarFor(entry) {
  if (!entry) return ''
  if (entry.householdId === currentUserId) return prefs.avatarUrl
  return entry.profileImageUrl || ''
}

function initialsFor(entry) {
  return (entry?.userName || '?').slice(0, 2).toUpperCase()
}

function isCurrentUser(entry) {
  return entry?.householdId === currentUserId
}

function retryFetch() {
  store.retryFetch(viewMode.value, currentUserPostalCode)
}

async function setViewMode(mode) {
  viewMode.value = mode
  await store.fetchLeaderboard(mode, currentUserPostalCode)
}

onMounted(() => {
  const fetches = [store.fetchLeaderboard('global', currentUserPostalCode)]
  if (currentUserId) fetches.push(store.fetchUserData(currentUserId))
  Promise.all(fetches)
})
</script>

<template>
  <!-- Daily Streak Section (Bento Highlight) -->
  <section class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
    <div
      class="lg:col-span-2 bg-surface-container-lowest p-8 rounded-md relative overflow-hidden flex flex-col md:flex-row items-center gap-8 group border border-outline-variant/10"
    >
      <!-- Abstract Bio-pattern background -->
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-colors duration-500"
      ></div>
      <div class="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
        <span
          class="bg-primary-container text-on-primary-container px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
          >Current Status</span
        >
        <h3 class="text-4xl font-extrabold text-on-surface font-headline mb-2 leading-tight">
          {{ streakLabel }}
        </h3>
        <p class="text-on-surface-variant max-w-md leading-relaxed">
          Stars are earned by keeping your household energy consumption below the community average
          for 24 hours.
        </p>
      </div>
      <p v-if="myRank" class="mt-3 text-sm font-semibold text-on-surface">
        Your rank: #{{ myRank.rank }} —
        <span :class="myRank.isBelowCommunityAverage ? 'text-primary' : 'text-error'">
          {{
            myRank.isBelowCommunityAverage
              ? 'Using less energy than the community average ✓'
              : 'Using more energy than the community average'
          }}
        </span>
      </p>
      <div class="relative z-10 flex flex-col gap-4 w-full md:w-auto ml-auto">
        <div class="flex items-center justify-between md:justify-end gap-3 px-2">
          <p
            class="text-sm font-bold font-headline text-on-surface-variant uppercase tracking-tighter"
          >
            Last 6 Months
          </p>
        </div>
        <div class="flex gap-2">
          <div
            v-for="month in recentMonths"
            :key="month.key"
            class="flex flex-col items-center gap-2"
          >
            <!-- Goal met -->
            <template v-if="month.goalMet">
              <div
                class="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20"
                :class="{ 'ring-2 ring-primary/30': month.isThisMonth }"
              >
                <span
                  class="material-symbols-outlined text-primary"
                  style="font-variation-settings: 'FILL' 1"
                  >star</span
                >
              </div>
              <span class="text-[10px] font-bold text-primary">{{ month.monthAbbr }}</span>
            </template>
            <!-- Goal missed -->
            <template v-else-if="month.hasData && !month.goalMet">
              <div
                class="w-12 h-12 rounded-md bg-error-container/10 flex items-center justify-center border border-error/20"
                :class="{ 'ring-2 ring-error/30': month.isThisMonth }"
              >
                <span class="material-symbols-outlined text-error">close</span>
              </div>
              <span class="text-[10px] font-bold text-error">{{ month.monthAbbr }}</span>
            </template>
            <!-- Future or no data yet -->
            <template v-else>
              <div
                class="w-12 h-12 rounded-md bg-surface-container-high flex items-center justify-center border border-transparent"
              >
                <span class="material-symbols-outlined text-on-surface-variant/30">pending</span>
              </div>
              <span class="text-[10px] font-bold text-on-surface-variant/40">{{
                month.monthAbbr
              }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-primary text-white p-8 rounded-md flex flex-col justify-between solar-glow">
      <div>
        <h4 class="text-lg font-bold font-headline mb-2">Power Goal</h4>
        <p class="text-white/80 text-sm leading-relaxed">
          Reduce by 15% this weekend to unlock the "Eco-Legend" badge.
        </p>
      </div>
      <div class="mt-6">
        <div class="flex justify-between text-xs font-bold mb-2">
          <span>PROGRESS</span>
          <span>65%</span>
        </div>
        <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div class="h-full bg-white rounded-full w-[65%] shadow-sm"></div>
        </div>
      </div>
    </div>
  </section>
  <!-- Top 3 Ranking Section (Asymmetric Layout) -->
  <!-- Skeleton shown while leaderboard data is loading -->
  <template v-if="loading">
    <h3 class="text-2xl font-black font-headline text-on-surface mb-8">Top Energy Savers</h3>
    <div class="flex flex-col lg:flex-row items-end justify-center gap-6 mb-16 px-4">
      <div v-for="i in 3" :key="i" class="w-full lg:w-1/4 flex flex-col items-center">
        <div class="w-24 h-24 rounded-full bg-surface-container-high animate-pulse mb-6"></div>
        <div class="w-full bg-surface-container-low pt-8 pb-6 px-4 rounded-t-lg space-y-3">
          <div class="h-4 bg-surface-container-high rounded-full animate-pulse w-3/4 mx-auto"></div>
          <div class="h-6 bg-surface-container-high rounded-full animate-pulse w-1/2 mx-auto"></div>
        </div>
      </div>
    </div>
    <section class="bg-surface-container-low rounded-md p-6 md:p-10 border border-outline-variant/10">
      <div class="h-7 bg-surface-container-high rounded-full animate-pulse w-1/3 mb-10"></div>
      <div class="space-y-3">
        <div
          v-for="i in 8"
          :key="i"
          class="flex items-center bg-surface-container-lowest p-4 rounded-md gap-4"
        >
          <div class="w-8 h-4 bg-surface-container-high rounded-full animate-pulse shrink-0"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-surface-container-high rounded-full animate-pulse w-1/3"></div>
            <div class="h-3 bg-surface-container-high rounded-full animate-pulse w-1/4"></div>
          </div>
          <div class="h-4 bg-surface-container-high rounded-full animate-pulse w-24"></div>
        </div>
      </div>
    </section>
  </template>

  <template v-else-if="fetchError">
    <div class="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <span class="material-symbols-outlined text-error" style="font-size:3rem">wifi_off</span>
      <p class="text-on-surface font-bold text-lg">Could not load leaderboard</p>
      <p class="text-on-surface-variant text-sm max-w-sm">
        The server may still be starting up. Wait a moment and try again.
      </p>
      <button
        @click="retryFetch"
        class="mt-2 px-6 py-2 bg-primary text-white rounded-md text-sm font-bold hover:opacity-90 transition-opacity"
      >
        Try Again
      </button>
    </div>
  </template>

  <template v-else>
  <h3 class="text-2xl font-black font-headline text-on-surface mb-8">Top Energy Saviors</h3>
  <div class="flex flex-col lg:flex-row items-end justify-center gap-6 mb-16 px-4">
    <!-- Rank 2 -->
    <div class="w-full lg:w-1/4 flex flex-col items-center order-2 lg:order-1">
      <div class="relative mb-6">
        <div
          class="w-24 h-24 rounded-full border-4 overflow-hidden p-1 bg-surface-container-lowest"
          :class="isCurrentUser(leaderboard[1]) ? 'border-primary ring-4 ring-primary/20' : 'border-outline-variant'"
        >
          <img
            v-if="avatarFor(leaderboard[1])"
            class="w-full h-full object-cover rounded-full"
            :src="avatarFor(leaderboard[1])"
            :alt="leaderboard[1]?.userName"
          />
          <div
            v-else
            class="w-full h-full rounded-full bg-surface-container-high flex items-center justify-center text-on-surface font-bold text-lg"
          >{{ initialsFor(leaderboard[1]) }}</div>
        </div>
        <div
          class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-outline-variant text-on-surface px-3 py-0.5 rounded-full text-xs font-bold shadow-md"
        >
          {{ isCurrentUser(leaderboard[1]) ? 'You 2nd' : '2nd' }}
        </div>
      </div>
      <div
        class="text-center bg-surface-container-low w-full pt-8 pb-6 px-4 rounded-t-lg border-b-4 border-outline-variant"
      >
        <p class="font-bold text-on-surface font-headline">
          {{ leaderboard[1]?.userName }}
          <span v-if="isCurrentUser(leaderboard[1])" class="text-primary text-xs ml-1">(You)</span>
        </p>
        <p class="text-primary font-black text-xl">{{ leaderboard[1]?.energyPerPerson }} kWh</p>
        <p class="text-[10px] uppercase tracking-widest text-on-surface-variant mt-2">
          Monthly Usage
        </p>
      </div>
    </div>
    <!-- Rank 1 (Featured) -->
    <div class="w-full lg:w-1/3 flex flex-col items-center order-1 lg:order-2 z-10">
      <div class="relative mb-8 scale-110">
        <div class="absolute -top-6 left-1/2 -translate-x-1/2">
          <span
            class="material-symbols-outlined text-primary text-4xl"
            style="font-variation-settings: 'FILL' 1"
            >workspace_premium</span
          >
        </div>
        <div
          class="w-32 h-32 rounded-full border-4 border-primary p-1 bg-surface-container-lowest ring-8"
          :class="isCurrentUser(leaderboard[0]) ? 'ring-primary/30' : 'ring-primary/10'"
        >
          <img
            v-if="avatarFor(leaderboard[0])"
            class="w-full h-full object-cover rounded-full"
            :src="avatarFor(leaderboard[0])"
            :alt="leaderboard[0]?.userName"
          />
          <div
            v-else
            class="w-full h-full rounded-full bg-surface-container-high flex items-center justify-center text-on-surface font-bold text-2xl"
          >{{ initialsFor(leaderboard[0]) }}</div>
        </div>
        <div
          class="absolute -bottom-3 left-1/2 -translate-x-1/2 solar-glow text-white px-5 py-1 rounded-full text-sm font-bold shadow-lg"
        >
          {{ isCurrentUser(leaderboard[0]) ? 'You' : '1st' }}
        </div>
      </div>
      <div
        class="text-center bg-surface-container-highest w-full pt-10 pb-8 px-6 rounded-t-lg shadow-xl relative"
      >
        <p class="font-extrabold text-on-surface font-headline text-lg">
          {{ leaderboard[0]?.userName }}
          <span v-if="isCurrentUser(leaderboard[0])" class="text-primary text-sm ml-1">(You)</span>
        </p>
        <p class="text-primary font-black text-3xl">{{ leaderboard[0]?.energyPerPerson }} kWh</p>
        <p class="text-xs uppercase tracking-widest text-on-surface-variant mt-2 font-bold">
          Community Leader
        </p>
      </div>
    </div>
    <!-- Rank 3 -->
    <div class="w-full lg:w-1/4 flex flex-col items-center order-3">
      <div class="relative mb-6">
        <div
          class="w-24 h-24 rounded-full border-4 overflow-hidden p-1 bg-surface-container-lowest"
          :class="isCurrentUser(leaderboard[2]) ? 'border-primary ring-4 ring-primary/20' : 'border-primary-fixed-dim'"
        >
          <img
            v-if="avatarFor(leaderboard[2])"
            class="w-full h-full object-cover rounded-full"
            :src="avatarFor(leaderboard[2])"
            :alt="leaderboard[2]?.userName"
          />
          <div
            v-else
            class="w-full h-full rounded-full bg-surface-container-high flex items-center justify-center text-on-surface font-bold text-lg"
          >{{ initialsFor(leaderboard[2]) }}</div>
        </div>
        <div
          class="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary-fixed-dim text-on-primary-fixed px-3 py-0.5 rounded-full text-xs font-bold shadow-md"
        >
          {{ isCurrentUser(leaderboard[2]) ? 'You 3rd' : '3rd' }}
        </div>
      </div>
      <div
        class="text-center bg-surface-container-low w-full pt-8 pb-6 px-4 rounded-t-lg border-b-4 border-primary-fixed-dim"
      >
        <p class="font-bold text-on-surface font-headline">
          {{ leaderboard[2]?.userName }}
          <span v-if="isCurrentUser(leaderboard[2])" class="text-primary text-xs ml-1">(You)</span>
        </p>
        <p class="text-primary font-black text-xl">{{ leaderboard[2]?.energyPerPerson }} kWh</p>
        <p class="text-[10px] uppercase tracking-widest text-on-surface-variant mt-2">
          Monthly Usage
        </p>
      </div>
    </div>
  </div>
  <!-- Monthly Rankings Table -->
  <section class="bg-surface-container-low rounded-md p-6 md:p-10 border border-outline-variant/10">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h3 class="text-2xl font-bold font-headline text-on-surface">Monthly Rankings</h3>
        <p class="text-on-surface-variant text-sm">
          <template v-if="viewMode === 'district'">
            Top energy savers in district {{ currentUserPostalCode }}
          </template>
          <template v-else> Top energy savers globally </template>
        </p>
      </div>
      <div class="flex gap-2">
        <button
          @click="setViewMode('district')"
          :class="
            viewMode === 'district'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-surface-container-highest text-on-surface border border-outline-variant/20 hover:bg-surface-dim'
          "
          class="px-4 py-2 rounded-md text-sm font-bold transition-colors"
          :disabled="!currentUserPostalCode"
        >
          District
        </button>
        <button
          @click="setViewMode('global')"
          :class="
            viewMode === 'global'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-surface-container-highest text-on-surface border border-outline-variant/20 hover:bg-surface-dim'
          "
          class="px-4 py-2 rounded-md text-sm font-bold transition-colors"
        >
          Global
        </button>
      </div>
    </div>
    <div class="space-y-3">
      <div
        v-for="entry in leaderboard.slice(3)"
        :key="entry.householdId"
        class="flex items-center bg-surface-container-lowest p-4 rounded-md"
        :class="
          entry.householdId === currentUserId
            ? 'bg-primary-container border-2 border-primary'
            : 'hover:bg-white'
        "
      >
        <span class="w-8 text-center font-black">{{ entry.rank }}</span>
        <div class="flex-1">
          <p class="font-bold text-on-surface">
            {{ entry.userName }}
            <span v-if="entry.householdId === currentUserId"> (You)</span>
          </p>
          <p class="text-xs text-on-surface-variant">Postal: {{ entry.postalCode }}</p>
        </div>
        <div class="text-right">
          <p class="font-black text-on-surface">{{ entry.energyPerPerson }} kWh/person</p>
        </div>
      </div>
    </div>
    <div class="mt-8 flex justify-center"></div>
  </section>
  </template>
</template>
