
<script setup>

  import { useUserPrefsStore } from '@/stores/userPrefs'
  import { useNotificationStore } from '@/stores/notifications'

    import ElectricitySavingTip from '@/components/EnergySavingTipsComponents/ElectricitySavingTip.vue'
    import HeatingSavingTip from '@/components/EnergySavingTipsComponents/HeatingSavingTip.vue'
    import KitchenSavingTip from '@/components/EnergySavingTipsComponents/KitchenSavingTip.vue'
    import LaundrySavingTip from '@/components/EnergySavingTipsComponents/LaundrySavingTip.vue'
    import ScheduledTip from '@/components/EnergySavingTipsComponents/ScheduledTip.vue'
    import SolarSavingTip from '@/components/EnergySavingTipsComponents/SolarSavingTip.vue'
    import WaterSavingTip from '@/components/EnergySavingTipsComponents/WaterSavingTip.vue'

    import {ref, computed} from 'vue'
  
    const prefs  = useUserPrefsStore()
    const notifs = useNotificationStore()

  const currentView = ref('main')
    const timeFrom = ref('16:00')
    const timeTo = ref('22:00')

// REQUEST CUSTOM ADVICE — modal with form

const FORMSPREE = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''
const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL || 'support@brightbox.app'

const showAdviceModal = ref(false)
const adviceForm = ref({
  name:        prefs.profile?.displayName || '',
  email:       prefs.profile?.email       || '',
  homeType:    '',
  occupants:   '',
  primaryCost: '',
  budget:      '',
  goals:       [],
  extra:       '',
})
const adviceSending = ref(false)
const adviceSent    = ref(false)
const adviceError   = ref('')

const HOME_TYPES   = ['Apartment / Flat', 'Townhouse', 'Freestanding house', 'Small-holding / Farm', 'Commercial']
const COST_AREAS   = ['Electricity', 'Water & heating', 'Cooling / Air conditioning', 'Appliances', 'Not sure']
const BUDGET_OPTS  = ['Under R500/month', 'R500–R2 000/month', 'R2 000–R5 000/month', 'R5 000+/month', 'Prefer not to say']
const GOAL_OPTS    = ['Lower monthly bill', 'Reduce carbon footprint', 'Solar independence', 'Load-shedding resilience', 'Water saving', 'EV optimisation']

const adviceValid = computed(() =>
  adviceForm.value.name.trim().length > 1 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adviceForm.value.email) &&
  adviceForm.value.homeType &&
  adviceForm.value.occupants
)

function toggleGoal(g) {
  const idx = adviceForm.value.goals.indexOf(g)
  if (idx === -1) adviceForm.value.goals.push(g)
  else            adviceForm.value.goals.splice(idx, 1)
}

async function submitAdvice() {
  if (!adviceValid.value || adviceSending.value) return
  adviceSending.value = true
  adviceError.value   = ''

  const f = adviceForm.value
  const body = `Custom Energy Audit Request

Name: ${f.name}
Email: ${f.email}
Home type: ${f.homeType}
Occupants: ${f.occupants}
Primary cost area: ${f.primaryCost}
Budget: ${f.budget}
Goals: ${f.goals.join(', ') || 'Not specified'}
Additional info: ${f.extra || 'None'}

Sent from BrightBox Energy Tips`

  if (FORMSPREE) {
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: f.name, email: f.email,
          subject: `[BrightBox Custom Audit] ${f.name} – ${f.homeType}`,
          message: body,
        }),
      })
      if (res.ok) { onAdviceSent(); return }
    } catch { /* fall through */ }
  }

  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`[BrightBox Custom Audit] ${f.name} – ${f.homeType}`)}&body=${encodeURIComponent(body)}`
  window.open(mailto, '_blank')
  onAdviceSent()
}

function onAdviceSent() {
  adviceSending.value = false
  adviceSent.value    = true
  notifs.add({
    type: 'success',
    title: 'Advice Request Sent',
    body: `We received your custom audit request, ${adviceForm.value.name}. Expect a response within 2 business days.`,
  })
}

function closeAdviceModal() {
  showAdviceModal.value = false
  setTimeout(() => { adviceSent.value = false; adviceError.value = '' }, 400)
}
</script>

<template>

      <div v-if="currentView === 'main'">
            
      <!-- Header Section -->
          <section class="mb-12">
          <h1 class="text-4xl font-extrabold text-on-background tracking-tight mb-2">Your Personal Energy Advisor</h1>
          <p class="text-on-surface-variant max-w-2xl text-lg">We analyze your energy patterns to provide tailored tips that fit your lifestyle and help you save on your next bill.</p>
          </section>
          <!-- Personalization Hub & Filter Combined Bento -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <!-- Set Your Schedule Card -->
          <div class="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
          <div class="flex items-center space-x-2 mb-4">
          <span class="material-symbols-outlined text-blue-700" style="font-variation-settings: 'FILL' 1;">timer</span>
          <h3 class="text-xl font-bold text-on-background">Set Your Schedule</h3>
          </div>
          <p class="text-sm text-on-surface-variant mb-6">Tell us when you are most active at home to receive time-sensitive saving opportunities.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
          <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Time From</label>
          <input class="w-full rounded border-slate-200 bg-slate-50 px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500" type="time" v-model="timeFrom"/>
          </div>
          <div>
          <label class="block text-xs font-bold text-slate-500 uppercase mb-2">Time To</label>
          <input class="w-full rounded border-slate-200 bg-slate-50 px-4 py-2.5 focus:ring-blue-500 focus:border-blue-500" type="time" v-model="timeTo"/>
          </div>
          </div>
          </div>
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center space-x-3">
          </div>
          <button class="w-full sm:w-auto px-6 py-2.5 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2" @click="currentView = 'schedule'">
          <span>Get Tailored Tips</span>
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          </div>
          </div>
          <!-- Stats/Category Quick Info Card -->
          <div class="bg-blue-700 rounded-lg p-6 text-white shadow-lg relative overflow-hidden">
          <div class="relative z-10">
          <h3 class="text-lg font-bold mb-1">Impact Overview</h3>
          <p class="text-blue-100 text-sm mb-6">Following your personalized tips could save you up to:</p>
          <div class="text-5xl font-black mb-2">$42<span class="text-xl font-normal">/mo</span></div>
          <div class="w-full bg-blue-800 h-2 rounded-full mt-6 overflow-hidden">
          <div class="bg-white h-full" style="width: 100%;"></div>
          </div>
          <p class="text-xs text-blue-200 mt-2">65% of potential savings achieved this week</p>
          </div>
          <!-- Decorative background icon -->
          <span class="material-symbols-outlined absolute -bottom-6 -right-6 text-blue-600 opacity-30 text-[120px]" style="font-variation-settings: 'FILL' 1;">insights</span>
          </div>
          </div>
          <!-- Filtering & Search Section -->
          <div class="mb-8">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="flex flex-wrap gap-2">
          <button class="px-4 py-1.5 rounded-full bg-blue-700 text-white text-sm font-medium">All Tips</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'electricity'">Electricity</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'water'">Water</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'heating'">Heating</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'solar'">Solar</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'kitchen'">Kitchen</button>
          <button class="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-300" @click="currentView = 'laundry'">Laundry</button>
          </div>
          </div>
          </div>
          <!-- Tips Feed Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Tip Card 1 -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div class="h-40 relative">
          <img class="w-full h-full object-cover" data-alt="Close up of a smart thermostat on a minimalist white wall with soft natural lighting and modern design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDav2CwnH7_sK8zJshe51W_8peePokZF0VTHkhWK4i9wTp6MyPQHEPLQwlT7VIgerogydLfGW2KApRyJz3yJ12ag0hVp0Qu30a9fJWKMeYzJV3IRKeiV2oWa87-F4U-Ax6lGsdMOI6ZvnRpLpgSJmFcXoENTx8zTeXXCl5391lz6ncX43yLvfGfmYlKhKYHzBZM8gpSeZXbXmeBMfDlCX4dU8vlqKVRW8ecGpaeqHHR_uXAbSiG9eFv59K8AMOMPzzBhUthr6eSoNHA"/>
          <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded tracking-wider">High Impact</span>
          <span class="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded tracking-wider">4 PM - 6 PM</span>
          </div>
          </div>
          <div class="p-5">
          <h4 class="text-lg font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Optimize Peak Hour Cooling</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">Lower your AC activity by 2 degrees between 4 PM and 6 PM to avoid peak tariff pricing and reduce grid strain.</p>
          <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Cooling</span>
          <button class="text-blue-700 text-sm font-bold flex items-center space-x-1" @click="currentView = 'electricity'">
          <span>Details</span>
          <span class="material-symbols-outlined text-xs">open_in_new</span>
          </button>
          </div>
          </div>
          </div>
          <!-- Tip Card 2 -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div class="h-40 relative">
          <img class="w-full h-full object-cover" data-alt="Modern washing machine in a bright clean laundry room with wooden accents and organized shelves" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjhLHZbdX_il1lydLfYaztp3hmg5jMfaaX_Qbb0HnNyPKm55i2ALDK72ZzzqmTv0r0ssunoJZTFgEZXHFRyOnXj5R5C05W1vgWIO2EeJht9vBFcDZRhwpkrZ6MsPhKrqkU2q9xxXgEZQMUED9Xk1nJj9rT0GrWUHq3oTLMwM-G9pdnEqhpUgT7oaLgasOOJumjkuE5RTLVbksns_UXtH3RDmA-j15oK4-1Jp3InIVLIfs5OBvOK2U7kQgqFGeqJDg3PpFglzRuSWeu"/>
          <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded tracking-wider">Medium Impact</span>
          </div>
          </div>
          <div class="p-5">
          <h4 class="text-lg font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">The Eco-Wash Delay</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">Use the 'Delay Start' feature on your washing machine to run during solar surplus hours or late night intervals.</p>
          <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Laundry</span>
          <button class="text-blue-700 text-sm font-bold flex items-center space-x-1" @click="currentView = 'laundry'">
          <span>Details</span>
          <span class="material-symbols-outlined text-xs" >open_in_new</span>
          </button>
          </div>
          </div>
          </div>
          <!-- Tip Card 3 -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div class="h-40 relative">
          <img class="w-full h-full object-cover" data-alt="High-end modern induction cooktop in a luxury kitchen with boiling water in a designer pot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMy0PhlxobZcJ_4g4Mf9SeMLlF-_DkNtY2SyB6FAWUZHT69Udt45Qsbzuz0ny5-lhDO8unmQcOl3R5vlohm9-yrUTfbhqqfJZyGmYcb45mgqtckZLcMiFAquIe9meoXQbicAKqGdmfXbvUR-oxLoBlywqw2E9uMyMWXpjVv7N6sB6TPmeYssnSGvnVFtzIUabwt393gKzyxnEfJEONPvz-Rpq9bNX9ZvceMD4KN8Q56KHtxXqLKHNXXKHlvDXGzhHKi0MFlg0w59vY"/>
          <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase rounded tracking-wider">Low Impact</span>
          <span class="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded tracking-wider">4 PM - 6 PM</span>
          </div>
          </div>
          <div class="p-5">
          <h4 class="text-lg font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Smart Cooking Habits</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">Cover pots while boiling water and use the microwave for small heating tasks to reduce energy consumption by 20%.</p>
          <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Kitchen</span>
          <button class="text-blue-700 text-sm font-bold flex items-center space-x-1" @click="currentView = 'kitchen'">
          <span>Details</span>
          <span class="material-symbols-outlined text-xs">open_in_new</span>
          </button>
          </div>
          </div>
          </div>
          <!-- Tip Card 4 -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div class="h-40 relative">
          <img class="w-full h-full object-cover" data-alt="Close-up of water droplets falling from a modern shower head with elegant bathroom tiling and atmospheric lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzmlNYVJl7YfKlpEYRkrcL9kQCQOvMn3CQF4v86Dh5_ybH6eGL5sAEybZJq1lf-n8SqfB_09QtWYaiRw9PT8Dxy2TL98K0iTYGwq-XA1MTc2iAgD3fYl-f5x4NEe8eCvkXSDtTUq3IWXNhwD-bNvzWCAzePLMnID6duNaqbceSQDFgWQGG0L9MkvuDniJc2DWltOPLkbfFUZ-qlnu7-CHPsxTztEHtQS8c9nrFWCYK32iAAW2TB_83yz7ua9xEnrHr0WWzuwWfgnSd"/>
          <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded tracking-wider">High Impact</span>
          </div>
          </div>
          <div class="p-5">
          <h4 class="text-lg font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">The 5-Minute Challenge</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">Reducing shower time to 5 minutes can save up to 15 gallons of water and significant energy used for heating.</p>
          <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Water</span>
          <button class="text-blue-700 text-sm font-bold flex items-center space-x-1"  @click="currentView = 'water'">
          <span>Details</span>
          <span class="material-symbols-outlined text-xs">open_in_new</span>
          </button>
          </div>
          </div>
          </div>
          <!-- Tip Card 5 -->
          <div class="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div class="h-40 relative">
          <img class="w-full h-full object-cover" data-alt="Solar panels on a residential roof reflecting a bright blue sky with wispy clouds and bright afternoon sun" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_t0LazH9tTWFhJf0OamJnaPhTE20HMRvoYyiHW4ovkvW8Obf7iqYb2FG2me5J0v5HsFi7e97ChynQX2wQZ0PRYHm_Cdwo-nbV8zNdwy2GEnYe6BmyBC1DPzLbTB98VyChVIHGAak7WY_NRtz4VLl6gPqE1aOkHw64-jAmN217gekRN2mk3jtK77cK9RJWsTEOK523_JQvwlJ_ScxAwONO1DwTtQANhS07eHuu4Ftl9AlZcyp4bL87ckS5TttmR-bJm0zMhaemM_Jh"/>
          <div class="absolute top-3 left-3 flex gap-2">
          <span class="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded tracking-wider">Medium Impact</span>
          </div>
          </div>
          <div class="p-5">
          <h4 class="text-lg font-bold text-on-background mb-2 group-hover:text-blue-700 transition-colors">Max Solar Self-Consumption</h4>
          <p class="text-sm text-on-surface-variant leading-relaxed">Run high-wattage appliances during peak sun hours (11 AM - 3 PM) to use your own solar energy instead of grid power.</p>
          <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-widest">Solar</span>
          <button class="text-blue-700 text-sm font-bold flex items-center space-x-1" @click="currentView = 'solar'">
          <span>Details</span>
          <span class="material-symbols-outlined text-xs">open_in_new</span>
          </button>
          </div>
          </div>
          </div>
          <!-- Tip Card 6 (Empty/CTA) -->
          <div
          class="border-2 border-dashed border-outline-variant/50 rounded-[16px] flex flex-col
                 items-center justify-center p-6 text-center group cursor-pointer
                 hover:border-primary/40 hover:bg-primary/[0.03] transition-all"
          @click="showAdviceModal = true"
          role="button"
          tabindex="0"
          @keydown.enter="showAdviceModal = true"
          aria-label="Request a custom energy audit"
        >
          <div class="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center mb-3
                      group-hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined text-on-surface-variant text-[26px] group-hover:text-primary transition-colors"
              style="font-variation-settings:'FILL' 1">support_agent</span>
          </div>
          <h4 class="font-bold text-sm text-on-surface mb-1.5 group-hover:text-primary transition-colors">Request Custom Advice</h4>
          <p class="text-xs text-on-surface-variant leading-relaxed">
            Can't find what you need? Request a personalised energy audit tailored to your home.
          </p>
          <span class="mt-3 text-xs font-bold text-primary flex items-center gap-1">
            Free consultation <span class="material-symbols-outlined text-[13px]">arrow_forward</span>
          </span>
        </div>
      </div>

  
            </div>

        
      <!-- REQUEST CUSTOM ADVICE MODAL -->

    <Transition name="modal-fade">
      <div v-if="showAdviceModal"
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Request custom energy advice"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="closeAdviceModal"
        ></div>

        <!-- Modal panel -->
        <div
          class="relative w-full sm:max-w-lg rounded-t-[24px] sm:rounded-[24px] overflow-hidden overflow-y-auto"
          style="background: var(--color-surface-container-lowest); max-height: 92dvh;"
        >
          <!-- Header -->
          <div class="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-outline-variant/20"
            style="background: var(--color-surface-container-lowest);">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <span class="material-symbols-outlined text-primary text-[18px]" style="font-variation-settings:'FILL' 1">support_agent</span>
              </div>
              <div>
                <h2 class="font-bold text-base text-on-surface leading-tight">Custom Energy Audit</h2>
                <p class="text-[11px] text-on-surface-variant">Free · Response within 2 business days</p>
              </div>
            </div>
            <button
              class="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors"
              @click="closeAdviceModal"
              aria-label="Close"
            >
              <span class="material-symbols-outlined text-on-surface-variant text-[18px]">close</span>
            </button>
          </div>

          <!-- Success state -->
          <div v-if="adviceSent" class="flex flex-col items-center justify-center py-14 px-6 gap-4 text-center">
            <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <span class="material-symbols-outlined text-emerald-500 text-[32px]" style="font-variation-settings:'FILL' 1">check_circle</span>
            </div>
            <h3 class="font-bold text-lg text-on-surface">Request Submitted!</h3>
            <p class="text-sm text-on-surface-variant max-w-xs leading-relaxed">
              Thanks, {{ adviceForm.name }}! Our energy advisors will review your profile and respond to
              <strong>{{ adviceForm.email }}</strong> within 2 business days.
            </p>
            <button class="solar-glow px-6 py-2.5 rounded-xl text-sm font-bold mt-2" @click="closeAdviceModal">
              Done
            </button>
          </div>

          <!-- Form -->
          <form v-if="!adviceSent" class="px-5 py-5 space-y-5" @submit.prevent="submitAdvice">

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-name">
                  Your Name *
                </label>
                <input id="adv-name" v-model="adviceForm.name" type="text" placeholder="Full name"
                  autocomplete="name" class="form-input" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-email">
                  Email Address *
                </label>
                <input id="adv-email" v-model="adviceForm.email" type="email" placeholder="your@email.com"
                  autocomplete="email" class="form-input" />
              </div>
            </div>

            <div class="space-y-2">
              <p class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Home Type *</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="h in HOME_TYPES" :key="h" type="button"
                  class="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all min-h-[36px]"
                  :class="adviceForm.homeType === h
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/30'"
                  @click="adviceForm.homeType = h"
                >{{ h }}</button>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-occ">
                  Number of Occupants *
                </label>
                <select id="adv-occ" v-model="adviceForm.occupants" class="form-input">
                  <option value="" disabled>Select…</option>
                  <option>1</option><option>2</option><option>3–4</option>
                  <option>5–6</option><option>7+</option>
                </select>
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-cost">
                  Biggest Cost Area
                </label>
                <select id="adv-cost" v-model="adviceForm.primaryCost" class="form-input">
                  <option value="" disabled>Select…</option>
                  <option v-for="c in COST_AREAS" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
            </div>

            <div class="space-y-2">
              <p class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Monthly Energy Budget</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="b in BUDGET_OPTS" :key="b" type="button"
                  class="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all min-h-[36px]"
                  :class="adviceForm.budget === b
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/30'"
                  @click="adviceForm.budget = b"
                >{{ b }}</button>
              </div>
            </div>

            <div class="space-y-2">
              <p class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Your Goals (select all that apply)</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="g in GOAL_OPTS" :key="g" type="button"
                  class="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all min-h-[36px] flex items-center gap-1.5"
                  :class="adviceForm.goals.includes(g)
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'border-outline-variant/40 text-on-surface-variant hover:border-primary/30'"
                  :aria-pressed="adviceForm.goals.includes(g)"
                  @click="toggleGoal(g)"
                >
                  <span class="material-symbols-outlined text-[13px]"
                    :style="adviceForm.goals.includes(g) ? 'font-variation-settings:\'FILL\' 1' : ''">
                    {{ adviceForm.goals.includes(g) ? 'check_circle' : 'circle' }}
                  </span>
                  {{ g }}
                </button>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block" for="adv-extra">
                Anything else we should know?
              </label>
              <textarea id="adv-extra" v-model="adviceForm.extra" rows="3"
                placeholder="Appliances you want to optimise, existing solar setup, specific concerns…"
                class="form-input resize-none"></textarea>
            </div>

            <p v-if="adviceError" class="text-sm text-red-500">{{ adviceError }}</p>

            <button
              type="submit"
              class="w-full py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 min-h-[48px]"
              :class="adviceValid
                ? 'solar-glow shadow-md hover:scale-[1.01] active:scale-[0.99]'
                : 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed'"
              :disabled="!adviceValid || adviceSending"
            >
              <svg v-if="adviceSending" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15"/>
              </svg>
              <span class="material-symbols-outlined text-[18px]" v-else style="font-variation-settings:'FILL' 1">send</span>
              {{ adviceSending ? 'Sending…' : 'Submit Audit Request' }}
            </button>

            <p class="text-[10px] text-on-surface-variant/60 text-center">
              Free service · Your data is handled per our Privacy Policy · Response within 2 business days
            </p>
          </form>
        </div>
      </div>
    </Transition>

            <!-- connections for buttons -->
            <ElectricitySavingTip v-if="currentView === 'electricity'" @back="currentView = 'main'" />
            <WaterSavingTip v-if="currentView=='water'" @back="currentView = 'main'"/>
            <HeatingSavingTip v-if="currentView=='heating'" @back="currentView = 'main'"/>
            <SolarSavingTip v-if="currentView=='solar'" @back="currentView = 'main'"/>
            <KitchenSavingTip v-if="currentView=='kitchen'" @back="currentView = 'main'"/>
            <LaundrySavingTip v-if="currentView=='laundry'" @back="currentView = 'main'"/>
            <ScheduledTip v-if="currentView == 'schedule'" :timeFrom="timeFrom" :timeTo="timeTo" @back="currentView = 'main'"/>
           
</template>


