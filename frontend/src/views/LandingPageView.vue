<template>
  <div class="bg-background text-on-surface min-h-screen">
    
    <nav class="fixed top-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center px-6 h-16 font-['Inter'] antialiased">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-primary text-2xl">bolt</span>
        <span class="text-xl font-bold text-blue-700 dark:text-blue-400">BrightBlock</span>
      </div>

      

      <div class="flex items-center gap-4">
        <router-link
          to="/login"
          class="px-6 py-2.5 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95"
        >
          Sign In
        </router-link>
      </div>
    </nav>

    <main class="pt-16">
      
      <section class="relative min-h-[819px] flex items-center overflow-hidden bg-primary">
        <div class="absolute inset-0 opacity-20">
          <img
            class="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmfpoXIB1atDwRnn2oRtz2ATgQt6wCM_5MT7ReVo_hEFrpqhAht9FfsPVIn3sce-KBnS_BaVJOWPuubvmHy74thoddzSrhFYg7l6Jon9SlHG3v204J5nSJBsUT2wJRv8Wc7ijMEYBFiz4ONU_DtmMH1qkFzIIspQ7UPAE3A5MheifRlCQlteW1Tkl6f_Wdktip3a6QVH_gyo7TA-XOcLyKpYTzONmCntB8AyX9trUeCS8sDZFN65m70qXl_HKVE9B9GbtYlKlxjEb6"
          />
        </div>

        <div class="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div class="text-white">
            <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Empowering a <span class="text-secondary-container">Sustainable</span> Future
            </h1>
            <p class="text-xl text-blue-100 mb-8 max-w-lg leading-relaxed">
              Join thousands of community members dedicated to reducing their carbon footprint through smart energy education and real-time monitoring.
            </p>
            <div class="flex flex-wrap gap-4">
              <router-link
                to="/register"
                class="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all active:scale-95"
              >
                Get Started
              </router-link>
              
              <button
                @click="showVideoModal = true"
                class="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Watch Vision
              </button>
            </div>
          </div>

          <!-- Weather Forecast -->
          <div class="hidden md:block">
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
              <div class="flex items-center justify-between mb-6">
                <span class="text-white font-bold">Local Energy Forecast</span>
                <span class="bg-emerald-400 text-slate-900 text-xs font-bold px-2 py-1 rounded animate-pulse">LIVE</span>
              </div>

              <div v-if="weather" class="space-y-4">
                <div class="flex items-center gap-4">
                  <img :src="`https://openweathermap.org/img/wn/${weather.icon}@2x.png`" class="w-16 h-16" alt="weather icon" />
                  <div>
                    <p class="text-4xl font-bold text-white">{{ weather.temp }}°C</p>
                    <p class="text-blue-200 capitalize">{{ weather.description }}</p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 pt-2">
                  <div class="bg-white/5 p-4 rounded-lg">
                    <span class="block text-xl font-bold text-white">{{ weather.city }}</span>
                    <span class="text-xs text-blue-200">Location</span>
                  </div>
                  <div class="bg-white/5 p-4 rounded-lg">
                    <span class="block text-xl font-bold text-white">{{ weather.wind }} m/s</span>
                    <span class="text-xs text-blue-200">Wind Speed</span>
                  </div>
                  <div class="bg-white/5 p-4 rounded-lg">
                    <span class="block text-xl font-bold text-white">{{ weather.humidity }}%</span>
                    <span class="text-xs text-blue-200">Humidity</span>
                  </div>
                  <div class="bg-white/5 p-4 rounded-lg">
                    <span class="block text-xl font-bold text-white">{{ weather.solarTip }}</span>
                    <span class="text-xs text-blue-200">Solar Potential</span>
                  </div>
                </div>
              </div>

              <div v-else-if="weatherError" class="text-blue-200 text-sm">
                {{ weatherError }}
              </div>

              <div v-else class="space-y-3">
                <div class="h-12 bg-white/10 rounded-lg animate-pulse"></div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="h-16 bg-white/10 rounded-lg animate-pulse"></div>
                  <div class="h-16 bg-white/10 rounded-lg animate-pulse"></div>
                  <div class="h-16 bg-white/10 rounded-lg animate-pulse"></div>
                  <div class="h-16 bg-white/10 rounded-lg animate-pulse"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

     
      <section class="py-24 bg-surface">
        <div class="container mx-auto px-6">
          <div class="max-w-3xl mb-16">
            <h2 class="text-3xl md:text-4xl font-extrabold text-on-surface mb-4">Smart Alerts &amp; Monitoring</h2>
            <p class="text-on-surface-variant text-lg">Intelligent systems that keep you informed about your energy usage and local grid health in real-time.</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span class="material-symbols-outlined">notification_important</span>
              </div>
              <h3 class="text-xl font-bold mb-3">Peak Load Alerts</h3>
              <p class="text-on-surface-variant leading-relaxed">
                Get notified the moment local demand spikes so you can shift heavy usage — like laundry or charging — to off-peak windows and cut your bill.
              </p>
            </div>
            <div class="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span class="material-symbols-outlined">monitoring</span>
              </div>
              <h3 class="text-xl font-bold mb-3">Usage Analytics</h3>
              <p class="text-on-surface-variant leading-relaxed">
                See exactly where your energy goes — by room, by hour, by device — with personalised tips that actually move the needle on your monthly spend.
              </p>
            </div>
            <div class="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 hover:border-primary transition-all group">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span class="material-symbols-outlined">energy_savings_leaf</span>
              </div>
              <h3 class="text-xl font-bold mb-3">Appliance Health</h3>
              <p class="text-on-surface-variant leading-relaxed">
                Spot appliances silently draining power or running inefficiently before they cost you more — our detection flags anomalies so you can act early.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section class="py-24 bg-primary relative overflow-hidden">
        <div class="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h2 class="text-4xl md:text-5xl font-extrabold text-white mb-8">Ready to Join the Green Movement?</h2>
          <p class="text-blue-100 text-xl mb-12 leading-relaxed">Join over 50,000 households already making a difference. Start your journey toward energy independence today.</p>
          <router-link
            to="/register"
            class="inline-block bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all active:scale-95"
          >
            Join the Community
          </router-link>
        </div>
      </section>
    </main>

    
    <footer class="bg-surface-container-highest py-12 border-t border-outline-variant/30">
      <div class="container mx-auto px-6 flex justify-center items-start gap-0">
        <!-- BrightBlock column -->
        <div class="flex flex-col items-start max-w-[220px]">
          <div class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-primary text-2xl">bolt</span>
            <span class="text-xl font-bold text-blue-700">BrightBlock</span>
          </div>
          <p class="text-on-surface-variant text-sm leading-relaxed">Leading the community-driven transition to sustainable energy through education and smart technology.</p>
        </div>

        <!-- Vertical divider -->
        <div class="self-stretch w-px bg-outline-variant/40 mx-10 mt-1"></div>

        <!-- Support column -->
        <div class="flex flex-col items-start">
          <h4 class="font-bold mb-4 text-sm uppercase tracking-widest text-on-surface-variant">Support</h4>
          <ul class="space-y-2 text-sm text-on-surface-variant">
            <li>
              <button @click="showHelpModal = true" class="hover:text-primary transition-colors">Help Center</button>
            </li>
            <li>
              <router-link class="hover:text-primary transition-colors" to="/privacy">Privacy Policy</router-link>
            </li>
            <li>
              <router-link class="hover:text-primary transition-colors" to="/terms">Terms of Service</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="container mx-auto px-6 mt-12 pt-8 border-t border-outline-variant/30 text-center text-xs text-on-surface-variant">
        © 2025 BrightBlock Community Initiative. All rights reserved.
      </div>
    </footer>

    
    <Transition name="modal">
      <div
        v-if="showHelpModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click.self="showHelpModal = false"
      >
        <div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
         
          <div class="flex items-center justify-between px-8 py-5 border-b border-slate-200 dark:border-slate-700">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary">help</span>
              <h2 class="text-xl font-bold text-on-surface">Help Center</h2>
            </div>
            <button
              @click="showHelpModal = false"
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full p-1"
              aria-label="Close"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div class="overflow-y-auto px-8 py-6 space-y-4">
            <div
              v-for="(item, i) in faqItems"
              :key="i"
              class="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
            >
              <button
                class="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-on-surface hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                @click="openFaq = openFaq === i ? null : i"
              >
                <span>{{ item.q }}</span>
                <span class="material-symbols-outlined text-primary transition-transform duration-200" :class="{ 'rotate-180': openFaq === i }">expand_more</span>
              </button>
              <Transition name="faq">
                <div v-if="openFaq === i" class="px-5 pb-4 text-on-surface-variant text-sm leading-relaxed">
                  {{ item.a }}
                </div>
              </Transition>
            </div>
          </div>
          
          <div class="px-8 py-4 border-t border-slate-200 dark:border-slate-700 text-xs text-on-surface-variant text-center">
            Still stuck? Email us at <a href="mailto:support@brightblock.app" class="text-primary hover:underline">support@brightblock.app</a>
          </div>
        </div>
      </div>
    </Transition>

    
    <Transition name="modal">
      <div
        v-if="showVideoModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click.self="showVideoModal = false"
      >
        <div class="relative w-full max-w-3xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
          <button
            @click="showVideoModal = false"
            class="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors bg-black/40 rounded-full p-1"
            aria-label="Close video"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
          <div class="aspect-video w-full">
            <iframe
              v-if="showVideoModal"
              class="w-full h-full"
              src="https://drive.google.com/file/d/1DMDfhfsmnWiO__zXMQE_-U4YYj-MmpBl/preview"
              title="BrightBlock Vision"
              frameborder="0"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showVideoModal = ref(false)
const showHelpModal = ref(false)
const openFaq = ref(null)

const weather = ref(null)
const weatherError = ref('')

const faqItems = [
  {
    q: 'How does BrightBlock track my energy usage?',
    a: 'BrightBlock connects to your smart meter or home energy monitor via our secure integration. Once linked, we pull consumption data every 15 minutes so your dashboard always reflects your real usage. No hardware installation is needed if your utility already provides smart meter access.'
  },
  {
    q: 'Is my energy data shared with anyone?',
    a: 'Never. Your data belongs to you. We use it solely to generate your personal insights and community-level aggregate stats (which are always anonymised). We do not sell, rent, or share individual data with third parties. See our Privacy Policy for full details.'
  },
  {
    q: 'How are the community impact numbers calculated?',
    a: 'The kWh saved and CO₂ offset figures are aggregated across all active BrightBlock households in your region. kWh savings are calculated by comparing actual usage against each household\'s baseline (the 90-day average before joining). CO₂ is derived using the local grid\'s average emissions intensity factor.'
  },
  {
    q: 'What do I do during a Peak Load Alert?',
    a: 'When the grid is under stress, we send you a push notification. Simple actions help: delay running the dishwasher, washing machine, or EV charger for 1–2 hours. You\'ll see exactly how much you saved and your contribution to stabilising the community grid in your activity feed.'
  },
  {
    q: 'Can I use BrightBlock without a smart meter?',
    a: 'Yes — you can manually log your monthly meter readings and we\'ll still generate trend insights and saving tips. Smart meter integration unlocks real-time features, but the core experience works without it.'
  },
  {
    q: 'How do I delete my account?',
    a: 'Go to Profile → Settings → Delete Account. Your data is permanently removed within 30 days. If you\'re having trouble, email support@brightblock.app and we\'ll sort it for you.'
  },
]

const API_KEY = 'baab83f6fdd3d76e96087e3f6e850afb' // Replace with your OpenWeatherMap API key

async function fetchWeather(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
    const data = await res.json()
    weather.value = {
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
      humidity: data.main.humidity,
      wind: data.wind.speed.toFixed(1),
      solarTip: data.clouds.all < 30 ? 'High' : data.clouds.all < 70 ? 'Medium' : 'Low'
    }
  } catch {
    weatherError.value = 'Unable to load forecast.'
  }
}

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => {
        // User denied location — fall back to Johannesburg
        fetchWeather(-26.2041, 28.0473)
      }
    )
  } else {
    fetchWeather(-26.2041, 28.0473)
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.faq-enter-active,
.faq-leave-active {
  transition: opacity 0.2s ease, max-height 0.25s ease;
  max-height: 300px;
  overflow: hidden;
}
.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>