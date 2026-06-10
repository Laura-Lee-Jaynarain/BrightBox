<script setup>
import SideBar from '../components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
import { ref, onMounted} from 'vue'
import EnergyLineChart from '@/components/EnergyLineChart.vue'
import SolarForecast from '@/components/SolarForecast/SolarForecast.vue'
import { useLeaderboardStore } from '@/stores/leaderboard.js'
import { storeToRefs } from 'pinia'

const userTrendData = ref([])
const communityTrendData = ref([])

const leaderboardStore = useLeaderboardStore()
const myRank= storeToRefs(leaderboardStore.myRank)

if (sessionStorage.getItem('reload') == true) {
  sessionStorage.setItem('reload', false)
  const test = ref(0)
  test.value += 1
  window.location.reload()
  window.location.href = '/dashboard'
}

const greenStats = ref({
  community: { percentage: 0, solar: 0, wind: 0, hydro: 0, totalGreen: 0, total: 0 },
  user: { percentage: 0, greenKWh: 0, totalKWh: 0, rank: 0, totalUsers: 0, badge: '', badgeIcon: '' }
})

const loadGreenEnergyData = async () => {
  try {
    const response = await fetch('/api/GreenEnergy/stats')
    if (response.ok) {
      const data = await response.json()
      greenStats.value = data  // Store the real data
      updateGreenUI(data)
      updatePersonalUI(data)
    } else {
      console.error('Failed to load green stats')
    }
  } catch (error) {
    console.error('API error:', error)
  }
}

const updateGreenUI = (data) => {
  const communityEl = document.getElementById('communityPercentage')
  if (communityEl) communityEl.textContent = data.community.percentage + '%'

  const communityBar = document.getElementById('communityBar')
  if (communityBar) communityBar.style.width = data.community.percentage + '%'

  const solarEl = document.getElementById('solarPercent')
  if (solarEl) solarEl.textContent = data.community.solar + '%'

  const windEl = document.getElementById('windPercent')
  if (windEl) windEl.textContent = data.community.wind + '%'

  const hydroEl = document.getElementById('hydroPercent')
  if (hydroEl) hydroEl.textContent = data.community.hydro + '%'

  const communityTotal = document.getElementById('communityTotal')
  if (communityTotal) {
    communityTotal.textContent = `Total: ${data.community.totalGreen.toLocaleString()} kWh green out of ${data.community.total.toLocaleString()} kWh`
  }

  const userPercent = document.getElementById('userPercentage')
  if (userPercent) userPercent.textContent = data.user.percentage + '%'

  const userBar = document.getElementById('userBar')
  if (userBar) userBar.style.width = data.user.percentage + '%'

  const userGreen = document.getElementById('userGreenKWh')
  if (userGreen) userGreen.textContent = data.user.greenKWh + ' kWh'

  const userTotal = document.getElementById('userTotalKWh')
  if (userTotal) userTotal.textContent = data.user.totalKWh + ' kWh'

  const userRank = document.getElementById('userRank')
  if (userRank) userRank.textContent = '#5' //+ myRank.rank //data.user.rank

  const totalUsers = document.getElementById('totalUsers')
  if (totalUsers) totalUsers.textContent = `out of ${data.user.totalUsers} users`

  const badgeIcon = document.getElementById('userBadgeIcon')
  if (badgeIcon) badgeIcon.textContent = data.user.badgeIcon

  const badgeText = document.getElementById('userBadgeText')
  if (badgeText) badgeText.textContent = data.user.badge

  const difference = data.user.percentage - data.community.percentage
  let messageColor, icon, messageText, subtext

  if (difference >= 10) {
    messageColor = 'bg-primary-container/50'
    icon = '🏆'
    messageText = `Incredible! You're leading the community by ${difference.toFixed(1)}%!`
    subtext = `You're in the top 10% of all users!`
  } else if (difference >= 5) {
    messageColor = 'bg-primary-container/40'
    icon = '📈'
    messageText = `Great job! You're ${difference.toFixed(1)}% above community average!`
    subtext = `Keep up the excellent work!`
  } else if (difference >= -5) {
    messageColor = 'bg-surface-container-high'
    icon = '🌱'
    messageText = `You're keeping pace with the community!`
    subtext = `${Math.abs(difference).toFixed(1)}% from community average`
  } else {
    messageColor = 'bg-surface-container'
    icon = '📉'
    messageText = `Room for improvement! You're ${Math.abs(difference).toFixed(1)}% below average.`
    subtext = `Check the tips below to increase your green score!`
  }

  const messageDiv = document.getElementById('comparisonMessage')
  if (messageDiv) messageDiv.className = `mt-4 p-4 rounded-lg ${messageColor}`

  const comparisonIcon = document.getElementById('comparisonIcon')
  if (comparisonIcon) comparisonIcon.textContent = icon

  const comparisonText = document.getElementById('comparisonText')
  if (comparisonText) comparisonText.textContent = messageText

  const comparisonSubtext = document.getElementById('comparisonSubtext')
  if (comparisonSubtext) comparisonSubtext.textContent = subtext

  const userCard = document.getElementById('userStatsCard')
  if (userCard) {
    if (difference >= 5) {
      userCard.className = 'rounded-lg p-4 bg-primary-container/20 border border-outline-variant'
    } else {
      userCard.className = 'rounded-lg p-4 bg-surface-container border border-outline-variant'
    }
  }
}

const updatePersonalUI = (data) => {
  const personalPercent = document.getElementById('personalPercentage')
  if (personalPercent) personalPercent.textContent = data.user.percentage + '%'

  const personalBar = document.getElementById('personalBar')
  if (personalBar) personalBar.style.width = data.user.percentage + '%'

  const personalGreen = document.getElementById('personalGreenKWh')
  if (personalGreen) personalGreen.textContent = data.user.greenKWh + ' kWh'

  const personalTotal = document.getElementById('personalTotalKWh')
  if (personalTotal) personalTotal.textContent = data.user.totalKWh + ' kWh'

  const nonGreen = data.user.totalKWh - data.user.greenKWh
  const nonGreenEl = document.getElementById('nonGreenKWh')
  if (nonGreenEl) nonGreenEl.textContent = nonGreen.toFixed(1) + ' kWh'

  const solarContribution = (data.user.greenKWh * data.community.solar / 100).toFixed(1)
  const windContribution = (data.user.greenKWh * data.community.wind / 100).toFixed(1)
  const hydroContribution = (data.user.greenKWh * data.community.hydro / 100).toFixed(1)

  const solarBreakdown = document.getElementById('personalSolar')
  if (solarBreakdown) solarBreakdown.textContent = solarContribution + ' kWh'

  const windBreakdown = document.getElementById('personalWind')
  if (windBreakdown) windBreakdown.textContent = windContribution + ' kWh'

  const hydroBreakdown = document.getElementById('personalHydro')
  if (hydroBreakdown) hydroBreakdown.textContent = hydroContribution + ' kWh'
}

const showTip = (tipNumber) => {
  const tips = {
    1: '💡 Tip: Run appliances during peak solar hours (10 AM - 3 PM)',
    2: '💡 Tip: Join community solar programs',
    3: '💡 Tip: Schedule EV charging during high renewable generation',
    4: '💡 Tip: Track daily usage patterns'
  }

  const toast = document.createElement('div')
  toast.className = 'fixed bottom-24 right-6 bg-primary text-white px-4 py-3 rounded-lg shadow-lg z-50 max-w-md'
  toast.innerHTML = tips[tipNumber]
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 4000)
}

const userLabels = ref([])
const userValues = ref([])

const communityLabels = ref([])
const communityValues = ref([])

const loadChartData = async () => {
  try {
    const response = await fetch('/api/EnergyTrend/trends')
    const data = await response.json()
    console.log('API Response:', data) 

    userLabels.value = data.userUsage.map(x => x.day)
    userValues.value = data.userUsage.map(x => Number(x.kWh))

    communityLabels.value = data.communityUsage.map(x => x.day)
    communityValues.value = data.communityUsage.map(x => Number(x.kWh))

    console.log(userLabels.value)
    console.log(userValues.value)
    console.log(communityLabels.value)
    console.log(communityValues.value)
  } catch (error) {
    console.error('Chart API failed:', error)
  }
}
const animateChartRefresh = () => {
  const chartElements = document.querySelectorAll('.chart-container')
  chartElements.forEach(el => {
    el.style.transform = 'scale(1.01)'
    setTimeout(() => {
      el.style.transform = 'scale(1)'
    }, 200)
  })
}

onMounted(() => {
  loadGreenEnergyData()
  loadChartData()
  
  setInterval(() => {
    loadChartData()
    animateChartRefresh()
  }, 3000)
})
</script>

<template>
  <div class="mb-8">
    <h1 class="text-3xl font-extrabold tracking-tight text-on-surface mb-1">Energy Hub</h1>
    <p class="text-on-surface-variant">Live system overview for your sustainable home.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

    <!-- ROW 1: GREEN ENERGY MIX + MY GREEN ENERGY -->
    <div class="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- GREEN ENERGY MIX -->
      <div class="bg-surface-container-low border border-outline-variant rounded-xl p-6 shadow-lg">
        <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 class="text-2xl font-bold flex items-center gap-2">
              <span class="text-3xl">🌿</span>
              Green Energy Mix
            </h2>
            <p class="text-on-surface-variant text-sm mt-1">Community vs Your green energy</p>
          </div>

          <div class="text-right bg-surface-container-lowest rounded-lg px-4 py-2">
            <div class="text-xs text-on-surface-variant">Your Rank</div>
           <div class="text-2xl font-bold text-primary" id="userRank">
  #{{ myRank.rank }} <!--greenStats.user.rank-->
</div>
           <div class="text-xs text-on-surface-variant" id="totalUsers">
  out of {{ greenStats.user.totalUsers }} users
</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-surface-container-lowest rounded-lg p-4 border border-outline-variant/30">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">🌍 Community Average</span>
              <span class="text-2xl font-bold text-primary" id="communityPercentage">68.5%</span>
            </div>

            <div class="w-full bg-surface-container-highest rounded-full h-4 mb-3">
              <div class="bg-primary h-4 rounded-full transition-all" id="communityBar" style="width: 68.5%"></div>
            </div>

            <div class="grid grid-cols-3 gap-2 text-center text-sm mt-3">
              <div>
                <div class="text-amber-500">☀️ Solar</div>
                <div class="font-semibold" id="solarPercent">45.2%</div>
              </div>
              <div>
                <div class="text-primary">💨 Wind</div>
                <div class="font-semibold" id="windPercent">15.3%</div>
              </div>
              <div>
                <div class="text-primary/70">💧 Hydro</div>
                <div class="font-semibold" id="hydroPercent">8.0%</div>
              </div>
            </div>

            <div class="text-xs text-on-surface-variant mt-3" id="communityTotal">
              Total: 34,250 kWh green out of 50,000 kWh
            </div>
          </div>

          <div class="rounded-lg p-4" id="userStatsCard">
            <div class="flex justify-between items-center mb-2">
              <span class="font-semibold">👤 Your Green Usage</span>
              <span class="text-2xl font-bold text-primary" id="userPercentage">72.3%</span>
            </div>

            <div class="w-full bg-surface-container-highest rounded-full h-4 mb-3">
              <div class="bg-primary h-4 rounded-full transition-all" id="userBar" style="width: 72.3%"></div>
            </div>

            <div class="flex justify-between text-sm mb-2">
              <span>Green Energy Used</span>
              <span class="font-semibold" id="userGreenKWh">425.5 kWh</span>
            </div>

            <div class="flex justify-between text-sm">
              <span>Total Energy Used</span>
              <span class="font-semibold" id="userTotalKWh">612.8 kWh</span>
            </div>

            <div class="mt-3 pt-2 border-t">
              <div class="flex items-center gap-2">
                <span class="text-2xl" id="userBadgeIcon">⭐</span>
                <span class="text-sm font-medium" id="userBadgeText">Green Leader</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 p-4 rounded-lg" id="comparisonMessage">
          <div class="flex items-center gap-3">
            <span class="text-3xl" id="comparisonIcon">📈</span>
            <div>
              <p class="font-semibold" id="comparisonText">Great job! You're 3.8% above community average!</p>
              <p class="text-sm text-on-surface-variant" id="comparisonSubtext">
                You're doing better than 65% of your community
              </p>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <span>💡</span>
            Tips to Improve
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="flex items-start gap-2 text-sm p-2 hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer" @click="showTip(1)">
              <span class="text-primary">💡</span>
              <span>Run appliances during peak solar hours</span>
            </div>

            <div class="flex items-start gap-2 text-sm p-2 hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer" @click="showTip(2)">
              <span class="text-primary">💡</span>
              <span>Join community solar programs</span>
            </div>

            <div class="flex items-start gap-2 text-sm p-2 hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer" @click="showTip(3)">
              <span class="text-primary">💡</span>
              <span>Schedule EV charging during high renewable generation</span>
            </div>

            <div class="flex items-start gap-2 text-sm p-2 hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer" @click="showTip(4)">
              <span class="text-primary">💡</span>
              <span>Track daily usage patterns</span>
            </div>
          </div>
        </div>
      </div>

      <!-- MY GREEN ENERGY -->
      <div class="bg-surface-container-low border border-outline-variant rounded-xl p-6 shadow-lg">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-3xl">🔋</span>
          <h2 class="text-2xl font-bold">My Green Energy</h2>
        </div>

        <p class="text-on-surface-variant text-sm mb-4">Your personal renewable energy breakdown</p>

        <div class="text-center mb-4">
          <div class="text-5xl font-black text-primary" id="personalPercentage">72.3%</div>
          <div class="text-sm text-on-surface-variant">Green Energy</div>

          <div class="w-full bg-surface-container-highest rounded-full h-3 mt-2">
            <div class="bg-primary h-3 rounded-full transition-all" id="personalBar" style="width: 72.3%"></div>
          </div>
        </div>

        <div class="space-y-3 mb-4">
          <div class="flex justify-between items-center p-2 bg-surface-container-lowest rounded-lg">
            <span><span class="text-amber-500">☀️</span> Solar</span>
            <span class="font-semibold" id="personalSolar">210.0 kWh</span>
          </div>

          <div class="flex justify-between items-center p-2 bg-surface-container-lowest rounded-lg">
            <span><span class="text-primary">💨</span> Wind</span>
            <span class="font-semibold" id="personalWind">71.0 kWh</span>
          </div>

          <div class="flex justify-between items-center p-2 bg-surface-container-lowest rounded-lg">
            <span><span class="text-primary/70">💧</span> Hydro</span>
            <span class="font-semibold" id="personalHydro">37.0 kWh</span>
          </div>

          <div class="flex justify-between items-center p-2 bg-surface-container-lowest rounded-lg">
            <span><span class="text-on-surface-variant">🔥</span> Non-green</span>
            <span class="font-semibold" id="nonGreenKWh">187.3 kWh</span>
          </div>
        </div>

        <div class="border-t pt-3 mt-2">
          <div class="flex justify-between text-sm">
            <span>Total Green:</span>
            <span class="font-bold text-primary" id="personalGreenKWh">425.5 kWh</span>
          </div>

          <div class="flex justify-between text-sm">
            <span>Total Energy:</span>
            <span class="font-bold" id="personalTotalKWh">612.8 kWh</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ROW 2: SOLAR FORECAST -->
    <div class="md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm overflow-hidden relative">
      <SolarForecast />
    </div>

    <!-- ROW 4: CHARTS -->
    <div class="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="chart-container bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.02]">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-2xl">📈</span>
          <h2 class="text-xl font-bold">My Energy Trend</h2>
        </div>

        <EnergyLineChart
          :labels="userLabels"
          :values="userValues"
          :total="userValues.reduce((a, b) => a + b, 0)"
          peakDay="Wednesday"
          :peakValue="userValues.length ? Math.max(...userValues) : 0"
        />
      </div>

      <div class="chart-container bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-lg transition-all duration-300 hover:scale-[1.02]">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-2xl">📊</span>
          <h2 class="text-xl font-bold">Community Energy Trend</h2>
        </div>

        <EnergyLineChart
          :labels="communityLabels"
          :values="communityValues"
          :total="communityValues.reduce((a, b) => a + b, 0)"
          peakDay="Wednesday"
          :peakValue="communityValues.length ? Math.max(...communityValues) : 0"
        />
      </div>
    </div>
  </div>
</template>