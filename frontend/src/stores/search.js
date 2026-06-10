

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// ─── SEARCH INDEX ──────────────────────────────────────────────────────────────
export const SEARCH_INDEX = [

  // ── PAGES ────────────────────────────────────────────────────────────────────
  {
    id: 'page-dashboard', type: 'page', icon: 'grid_view',
    title: 'Dashboard',
    description: 'Live energy overview, battery, solar forecast and green energy mix',
    keywords: ['home', 'overview', 'energy', 'solar', 'battery', 'production', 'consumption', 'hub', 'main', 'chart'],
    route: '/dashboard',
  },
  {
    id: 'page-upload', type: 'page', icon: 'upload_file',
    title: 'Upload Meter',
    description: 'Submit your electricity meter readings and track submission history',
    keywords: ['meter', 'reading', 'upload', 'submit', 'electricity', 'kWh', 'history', 'record'],
    route: '/upload',
  },
  {
    id: 'page-energy-tips', type: 'page', icon: 'lightbulb',
    title: 'Energy Tips',
    description: 'Personalised tips to reduce your energy consumption and save money',
    keywords: ['tips', 'advice', 'saving', 'efficiency', 'reduce', 'solar', 'laundry', 'kitchen', 'heating', 'water'],
    route: '/energy-tips',
  },
  {
    id: 'page-settings', type: 'page', icon: 'settings',
    title: 'Settings',
    description: 'Manage your profile, appearance, notifications and privacy',
    keywords: ['settings', 'preferences', 'account', 'profile', 'config', 'manage'],
    route: '/settings',
  },
  {
    id: 'page-support', type: 'page', icon: 'help',
    title: 'Support',
    description: 'Get help, browse FAQs and contact the EcoSave team',
    keywords: ['help', 'support', 'contact', 'faq', 'issue', 'problem', 'ticket'],
    route: '/support',
  },

  // ── SETTINGS SECTIONS ────────────────────────────────────────────────────────
  {
    id: 'settings-profile', type: 'setting', icon: 'person',
    title: 'Profile settings',
    description: 'Update your display name, email, bio, avatar and pronouns',
    keywords: ['profile', 'name', 'email', 'avatar', 'photo', 'bio', 'pronouns', 'location', 'website'],
    route: '/settings', hash: '#sec-profile',
  },
  {
    id: 'settings-appearance', type: 'setting', icon: 'palette',
    title: 'Appearance settings',
    description: 'Change colour theme, accent, font size, dark mode and accessibility options',
    keywords: ['theme', 'dark', 'light', 'color', 'colour', 'accent', 'font', 'size', 'contrast', 'motion', 'compact', 'mode'],
    route: '/settings', hash: '#sec-appearance',
  },
  {
    id: 'settings-viewtheme', type: 'setting', icon: 'style',
    title: 'View theme overrides',
    description: 'Set custom background, border, text and card colours per view',
    keywords: ['theme', 'override', 'background', 'border', 'card', 'colour', 'color', 'view', 'dashboard', 'meter'],
    route: '/settings', hash: '#sec-viewtheme',
  },
  {
    id: 'settings-notifications', type: 'setting', icon: 'notifications',
    title: 'Notification settings',
    description: 'Configure email alerts, push notifications, price alerts and digests',
    keywords: ['notifications', 'email', 'push', 'alerts', 'digest', 'weekly', 'monthly', 'price', 'marketing'],
    route: '/settings', hash: '#sec-notifications',
  },
  {
    id: 'settings-features', type: 'setting', icon: 'tune',
    title: 'App features',
    description: 'Enable or disable the chatbot, leaderboard, energy tips and community',
    keywords: ['features', 'chatbot', 'leaderboard', 'community', 'streak', 'disable', 'enable', 'toggle'],
    route: '/settings', hash: '#sec-features',
  },
  {
    id: 'settings-energy', type: 'setting', icon: 'bolt',
    title: 'Energy preferences',
    description: 'Configure auto offset, EV charging, smart scheduling and off-peak hours',
    keywords: ['energy', 'ev', 'electric', 'vehicle', 'charging', 'peak', 'off-peak', 'solar', 'surplus', 'offset', 'schedule'],
    route: '/settings', hash: '#sec-energy',
  },
  {
    id: 'settings-privacy', type: 'setting', icon: 'shield',
    title: 'Privacy & data',
    description: 'Control data sharing, leaderboard visibility and download your data',
    keywords: ['privacy', 'data', 'download', 'share', 'leaderboard', 'analytics', 'gdpr', 'popia', 'export'],
    route: '/settings', hash: '#sec-privacy',
  },
  {
    id: 'settings-region', type: 'setting', icon: 'language',
    title: 'Language & region',
    description: 'Change the interface language, timezone, currency and unit system',
    keywords: ['language', 'region', 'timezone', 'currency', 'locale', 'units', 'metric', 'imperial', 'afrikaans', 'english'],
    route: '/settings', hash: '#sec-region',
  },
  {
    id: 'settings-security', type: 'setting', icon: 'lock',
    title: 'Security settings',
    description: 'Change your password, enable two-factor auth and manage sessions',
    keywords: ['security', 'password', 'two-factor', '2fa', 'sessions', 'login', 'auth', 'change password'],
    route: '/settings', hash: '#sec-security',
  },

  // ── ENERGY TIPS ──────────────────────────────────────────────────────────────
  {
    id: 'tip-cooling', type: 'tip', icon: 'ac_unit',
    title: 'Optimise peak hour cooling',
    description: 'Lower AC by 2°C between 4–6 PM to avoid peak tariff pricing',
    keywords: ['cooling', 'ac', 'air conditioning', 'peak', 'tariff', 'temperature', 'electricity'],
    route: '/energy-tips',
  },
  {
    id: 'tip-laundry', type: 'tip', icon: 'local_laundry_service',
    title: 'Eco-wash delay',
    description: 'Use the delay-start feature to run your washing machine during solar hours',
    keywords: ['laundry', 'washing', 'machine', 'delay', 'solar', 'off-peak', 'schedule'],
    route: '/energy-tips',
  },
  {
    id: 'tip-kitchen', type: 'tip', icon: 'microwave',
    title: 'Smart cooking habits',
    description: 'Cover pots and use the microwave to reduce kitchen energy use by 20%',
    keywords: ['kitchen', 'cooking', 'microwave', 'oven', 'pots', 'energy', 'save'],
    route: '/energy-tips',
  },
  {
    id: 'tip-water', type: 'tip', icon: 'water_drop',
    title: '5-minute shower challenge',
    description: 'Reducing shower time saves up to 15 gallons of water and heating energy',
    keywords: ['water', 'shower', 'hot water', 'heating', 'geyser', 'save'],
    route: '/energy-tips',
  },
  {
    id: 'tip-solar', type: 'tip', icon: 'solar_power',
    title: 'Max solar self-consumption',
    description: 'Run high-wattage appliances during peak sun hours (11 AM – 3 PM)',
    keywords: ['solar', 'self-consumption', 'sun', 'appliances', 'peak', 'panels', 'pv'],
    route: '/energy-tips',
  },
  {
    id: 'tip-solar-full', type: 'tip', icon: 'solar_power',
    title: 'Solar integration guide',
    description: 'Troubleshoot solar data sync and supported inverter brands',
    keywords: ['solar', 'inverter', 'sync', 'fronius', 'solaredge', 'huawei', 'goodwe', 'sma', 'enphase'],
    route: '/energy-tips',
  },

  // ── SUPPORT / FAQ ─────────────────────────────────────────────────────────────
  {
    id: 'faq-upload', type: 'help', icon: 'help_outline',
    title: 'How to upload meter readings',
    description: 'Step-by-step guide for submitting meter photos or manual readings',
    keywords: ['meter', 'upload', 'reading', 'photo', 'submit', 'how', 'guide'],
    route: '/support',
  },
  {
    id: 'faq-solar', type: 'help', icon: 'help_outline',
    title: 'Solar data not updating',
    description: 'Fix solar data sync issues — Wi-Fi, API credentials, supported inverters',
    keywords: ['solar', 'data', 'sync', 'inverter', 'wifi', 'api', 'not working', 'update'],
    route: '/support',
  },
  {
    id: 'faq-password', type: 'help', icon: 'help_outline',
    title: 'Reset your password',
    description: 'How to reset your password from the login screen or settings',
    keywords: ['password', 'reset', 'forgot', 'change', 'login', 'locked out'],
    route: '/support',
  },
  {
    id: 'faq-data', type: 'help', icon: 'help_outline',
    title: 'Export or delete your data',
    description: 'Download a full data export or permanently delete your account',
    keywords: ['data', 'export', 'download', 'delete', 'account', 'gdpr', 'popia', 'privacy'],
    route: '/support',
  },
  {
    id: 'faq-billing', type: 'help', icon: 'help_outline',
    title: 'How savings are calculated',
    description: 'Understand how your estimated monthly savings figure is worked out',
    keywords: ['savings', 'calculation', 'billing', 'estimate', 'tariff', 'cost', 'money'],
    route: '/support',
  },
  {
    id: 'contact-support', type: 'help', icon: 'mail',
    title: 'Contact support',
    description: 'Send a message to the EcoSave support team',
    keywords: ['contact', 'support', 'help', 'message', 'email', 'ticket', 'team'],
    route: '/support',
  },

  // ── QUICK ACTIONS ─────────────────────────────────────────────────────────────
  {
    id: 'action-dark', type: 'action', icon: 'dark_mode',
    title: 'Switch to dark mode',
    description: 'Toggle the interface to dark colour scheme',
    keywords: ['dark', 'mode', 'theme', 'night', 'black'],
    route: null, action: 'dark-mode',
  },
  {
    id: 'action-light', type: 'action', icon: 'light_mode',
    title: 'Switch to light mode',
    description: 'Toggle the interface to light colour scheme',
    keywords: ['light', 'mode', 'theme', 'day', 'white', 'bright'],
    route: null, action: 'light-mode',
  },
  {
    id: 'action-language', type: 'action', icon: 'translate',
    title: 'Change language',
    description: 'Switch to Afrikaans or English interface language',
    keywords: ['language', 'afrikaans', 'english', 'taal', 'translate'],
    route: '/settings', hash: '#sec-region',
  },
]

// ─── TYPE METADATA ─────────────────────────────────────────────────────────────
export const TYPE_META = {
  page:    { label: 'Page',    colour: 'text-primary    bg-primary/10'         },
  setting: { label: 'Setting', colour: 'text-purple-600 bg-purple-500/10'      },
  tip:     { label: 'Tip',     colour: 'text-amber-600  bg-amber-500/10'       },
  help:    { label: 'Help',    colour: 'text-emerald-600 bg-emerald-500/10'    },
  action:  { label: 'Action',  colour: 'text-blue-600   bg-blue-500/10'        },
}

// ─── SEARCH ALGORITHM ──────────────────────────────────────────────────────────
function scoreRecord(record, words) {
  let score = 0
  const title = record.title.toLowerCase()
  const desc  = (record.description || '').toLowerCase()

  for (const word of words) {
    if (!word) continue
    // Title scoring
    if (title === word)             score += 10
    else if (title.startsWith(word)) score += 7
    else if (title.includes(word))   score += 5
    // Description scoring
    if (desc.includes(word))         score += 3
    // Keyword scoring
    for (const kw of record.keywords) {
      const k = kw.toLowerCase()
      if (k === word)          score += 2
      else if (k.includes(word)) score += 1
    }
  }
  return score
}

// ─── PINIA STORE ───────────────────────────────────────────────────────────────
export const useSearchStore = defineStore('search', () => {
  const query   = ref('')
  const open    = ref(false)
  const focused = ref(false)

  // Recent searches (up to 6) persisted to localStorage
  const recentSearches = ref(
    JSON.parse(localStorage.getItem('ep-recent-searches') || '[]')
  )

  const results = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (q.length < 1) return []

    const words = q.split(/\s+/).filter(w => w.length >= 1)
    return SEARCH_INDEX
      .map(r => ({ ...r, _score: scoreRecord(r, words) }))
      .filter(r => r._score > 0)
      .sort((a, b) => b._score - a._score || a.title.localeCompare(b.title))
      .slice(0, 12)
  })

  // Group results by type for display
  const groupedResults = computed(() => {
    const groups = {}
    for (const r of results.value) {
      if (!groups[r.type]) groups[r.type] = []
      groups[r.type].push(r)
    }
    return groups
  })

  function search(q) {
    query.value = q
    open.value  = q.trim().length > 0
  }

  function clear() {
    query.value = ''
    open.value  = false
    focused.value = false
  }

  function saveRecent(record) {
    const list = [record, ...recentSearches.value.filter(r => r.id !== record.id)].slice(0, 6)
    recentSearches.value = list
    localStorage.setItem('ep-recent-searches', JSON.stringify(list))
  }

  function clearRecent() {
    recentSearches.value = []
    localStorage.removeItem('ep-recent-searches')
  }

  // Returns the record to navigate to + clears state
  function pick(record) {
    saveRecent(record)
    clear()
    return record
  }

  return {
    query, open, focused, results, groupedResults, recentSearches,
    search, clear, pick, saveRecent, clearRecent,
  }
})

;[
  {
    id: 'page-community', type: 'page', icon: 'solar_power',
    title: 'Community',
    description: 'Solar community hub — feed, WhatsApp groups, leaderboard and badges',
    keywords: ['community', 'social', 'group', 'chat', 'whatsapp', 'leaderboard', 'badges', 'challenges', 'feed'],
    route: '/community',
  },
  {
    id: 'community-whatsapp', type: 'tip', icon: 'chat',
    title: 'Join a WhatsApp group',
    description: 'Energy Saving, Solar Talk, Help, Announcements, Trading, Challenges',
    keywords: ['whatsapp', 'group', 'chat', 'join', 'solar talk', 'energy saving', 'help', 'announcements'],
    route: '/community',
  },
  {
    id: 'community-feed', type: 'tip', icon: 'dynamic_feed',
    title: 'Community feed',
    description: 'Share tips, ask questions and react to posts from your neighbours',
    keywords: ['feed', 'post', 'share', 'tip', 'question', 'comment', 'like', 'community'],
    route: '/community',
  },
  {
    id: 'community-badges', type: 'tip', icon: 'workspace_premium',
    title: 'Badges and perks',
    description: 'Earn badges for saving energy, streaks and community challenges',
    keywords: ['badge', 'perk', 'reward', 'achievement', 'streak', 'milestone', 'solar hero'],
    route: '/community',
  },
  {
    id: 'community-challenge', type: 'tip', icon: 'emoji_events',
    title: 'Weekly challenge',
    description: 'Compete in community energy challenges and climb the leaderboard',
    keywords: ['challenge', 'weekly', 'competition', 'leaderboard', 'rank', 'points'],
    route: '/community',
  },
].forEach(r => SEARCH_INDEX.push(r))
