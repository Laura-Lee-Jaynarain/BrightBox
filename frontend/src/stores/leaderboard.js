import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const cachedDataLifeTime = 5 * 60 * 1000
const streakKey = 'ep-streak-history-monthly'

export function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(streakKey) || '{}')
  } catch {
    return {}
  }
}

export const useLeaderboardStore = defineStore('leaderboard', () => {
  const leaderboard = ref([])
  const communityAverage = ref(0)
  const myRank = ref(null)
  const streakHistory = ref(loadHistory())
  const loading = ref(false)
  const fetchError = ref(false)

  const boardCache = ref({ global: null, district: null })
  const boardFetchedAt = ref({ global: 0, district: 0 })
  const userFetchedAt = ref(0)

  async function fetchLeaderboard(mode, postalCode = null) {
    if (Date.now() - (boardFetchedAt.value[mode] ?? 0) < cachedDataLifeTime) {
      leaderboard.value = boardCache.value[mode].data
      communityAverage.value = boardCache.value[mode].avg
      return
    }

    loading.value = true
    fetchError.value = false
    try {
      const url =
        mode === 'district' && postalCode
          ? `/api/leaderboard?postalCode=${postalCode}`
          : '/api/leaderboard'
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
    
      const raw = data.TopHouseholds ?? data.topHouseholds ?? []
      leaderboard.value = raw.map(h => ({
        householdId:     h.HouseholdId     ?? h.householdId,
        userName:        h.UserName        ?? h.userName,
        postalCode:      h.PostalCode      ?? h.postalCode,
        value:           h.Value           ?? h.value,
        householdSize:   h.HouseholdSize   ?? h.householdSize,
        energyPerPerson: h.EnergyPerPerson ?? h.energyPerPerson,
        rank:            h.Rank            ?? h.rank,
        profileImageUrl: h.ProfileImageUrl ?? h.profileImageUrl ?? '',
      }))
      communityAverage.value = data.CommunityAverage ?? data.communityAverage ?? 0
      boardCache.value = { ...boardCache.value, [mode]: { data: leaderboard.value, avg: communityAverage.value } }
      boardFetchedAt.value = { ...boardFetchedAt.value, [mode]: Date.now() }
    } catch {
      fetchError.value = true
    } finally {
      loading.value = false
    }
  }

  async function retryFetch(mode, postalCode = null) {
    boardFetchedAt.value = { ...boardFetchedAt.value, [mode]: 0 }
    await fetchLeaderboard(mode, postalCode)
  }

  async function fetchUserData(userId) {
    if (Date.now() - userFetchedAt.value < cachedDataLifeTime) return

    try {
      const [userRes, streakRes] = await Promise.all([
        fetch(`/api/leaderboard/user/${userId}`),
        fetch(`/api/leaderboard/streak/${userId}`),
      ])

      if (userRes.ok) {
        const userData = await userRes.json()
       
        myRank.value = {
          rank: userData.Rank ?? userData.rank,
          isBelowCommunityAverage: userData.IsBelowCommunityAverage ?? userData.isBelowCommunityAverage,
          energyPerPerson: userData.EnergyPerPerson ?? userData.energyPerPerson,
          communityAverage: userData.CommunityAverage ?? userData.communityAverage,
        }
      }

      if (streakRes.ok) {
        const backendHistory = await streakRes.json()
        const thisMonth = monthKey(new Date())
        if (!(thisMonth in backendHistory) && myRank.value) {
          backendHistory[thisMonth] = !!myRank.value.isBelowCommunityAverage
        }
        streakHistory.value = backendHistory
        localStorage.setItem(streakKey, JSON.stringify(streakHistory.value))
      }

      userFetchedAt.value = Date.now()
    } catch {
     
    }
  }

  const recentMonths = computed(() => {
    const now = new Date()
    const thisKey = monthKey(now)
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
      const key = monthKey(d)
      const abbr = d.toLocaleString('default', { month: 'short' }).toUpperCase()
      return {
        monthAbbr:   abbr,
        key,
        hasData:     key in streakHistory.value,
        goalMet:     streakHistory.value[key] === true,
        isThisMonth: key === thisKey,
        isFuture:    key > thisKey,
      }
    })
  })

  const streak = computed(() => {
    let count = 0
    const now = new Date()
    for (let i = 0; i < 24; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = monthKey(d)
      if (streakHistory.value[key] === true) count++
      else break
    }
    return count
  })

  const streakLabel = computed(() =>
    streak.value > 0 ? `${streak.value} Month Streak! 🔥` : 'No Active Streak'
  )

  return {
    leaderboard,
    communityAverage,
    myRank,
    streakHistory,
    recentMonths,
    streak,
    streakLabel,
    loading,
    fetchError,
    fetchLeaderboard,
    retryFetch,
    fetchUserData,
  }
})
