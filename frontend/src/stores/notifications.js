
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserPrefsStore } from './userPrefs'
import axios from 'axios'

let _nextId = 100

function makeId() { return ++_nextId }
function timeAgo(ms) {
  const s = Math.floor((Date.now() - ms) / 1000)
  if (s < 60) return 'Just now'
  if (s < 3600) return `${Math.floor(s/60)}m ago`
  if (s < 86400) return `${Math.floor(s/3600)}h ago`
  return `${Math.floor(s/86400)}d ago`
}

// Seed demo notifications
const SEED = [
  { id: 1, type: 'price',       read: false, title: 'Tariff Rate Change',        body: 'Eskom off-peak rate dropped 8c/kWh tonight 22:00–06:00. Good time to run heavy appliances.',       ts: Date.now() - 1000*60*12  },
  { id: 2, type: 'maintenance', read: false, title: 'Maintenance Tip',            body: 'Clean your geyser thermostat. A scaled element can use up to 35% more electricity.',               ts: Date.now() - 1000*60*60*2 },
  { id: 3, type: 'success',     read: false, title: 'Meter Reading Uploaded',      body: 'Your October meter reading was accepted. Current usage: 142 kWh this month.',                     ts: Date.now() - 1000*60*60*5 },
  { id: 4, type: 'price',       read: true,  title: 'Peak Hours Alert',            body: 'High-tariff window starts in 30 minutes (17:00–19:00). Consider deferring geyser and oven use.',  ts: Date.now() - 1000*60*60*24 },
  { id: 5, type: 'info',        read: true,  title: 'Weekly Energy Digest',        body: 'You used 12% less energy than last week! You\'re ranked #47 on the neighbourhood leaderboard.',  ts: Date.now() - 1000*60*60*48 },
]

export const useNotificationStore = defineStore('notifications', () => {
  const items = ref([]) // 


  let pushPermission = ref(Notification.permission || 'default')

  // Refresh time strings every minute
  setInterval(() => {
    items.value.forEach(n => { n.time = timeAgo(n.ts) })
  }, 60_000)

  const unreadCount = computed(() => items.value.filter(n => !n.read).length)

  async function add(notif) {
    items.value.unshift({
      id: makeId(),
      read: false,
      ts: Date.now(),
      time: 'Just now',
      type: 'info',
      ...notif,
    })

    // Limit to 50 items
    if (items.value.length > 50) items.value.splice(50)
  }

  function markRead(id) {
    const n = items.value.find(n => n.id === id)
    if (n) n.read = true
  }

  function markAllRead() {
    items.value.forEach(n => { n.read = true })
  }

  function remove(id) {
    items.value = items.value.filter(n => n.id !== id)
  }

  // ── Browser Push Notifications ──────────────────────────────────────────────
  async function requestPushPermission() {
    if (!('Notification' in window)) return { ok: false, reason: 'not_supported' }
    if (Notification.permission === 'granted') { pushPermission.value = 'granted'; return { ok: true } }
    const result = await Notification.requestPermission()
    pushPermission.value = result
    return { ok: result === 'granted', reason: result }
  }

  function sendBrowserPush(title, body, icon) {
    if (Notification.permission !== 'granted') return
    try {
      new Notification(title, { body, icon: icon || '/favicon.ico', badge: '/favicon.ico' })
    } catch {}
  }

  // ── Demo triggers (called from settings price/maintenance alerts) ──────────
  function firePriceAlert() {
    const prefs = useUserPrefsStore()
    if (!prefs.notif.priceAlerts) return
    const n = { type: 'price', title: 'Tariff Alert', body: 'Load-shedding schedule may affect tonight\'s off-peak window. Check Eskom app for Stage updates.' , date: new Date()}
    add(n)
    if (prefs.notif.push) sendBrowserPush(n.title, n.body)
  }

  function fireMaintenanceTip() {
    const prefs = useUserPrefsStore()
    if (!prefs.notif.maintenanceTips) return
    const tips = [
      'Replace incandescent bulbs with LEDs to save up to 80% on lighting costs.',
      'Set your geyser to 55°C — hot enough for safety, cool enough to save energy.',
      'A dripping tap can waste 15L/day. Fix leaks to lower both water and heating costs.',
      'Unplug devices on standby — they can account for 10% of your electricity bill.',
    ]
    const body = tips[Math.floor(Math.random() * tips.length)]
    const n = { type: 'maintenance', title: 'Maintenance Tip', body }
    add(n)
    if (prefs.notif.push) sendBrowserPush(n.title, n.body)
  }

  return {
    items, unreadCount, pushPermission,
    add, markRead, markAllRead, remove,
    requestPushPermission, sendBrowserPush,
    firePriceAlert, fireMaintenanceTip, timeAgo
  }
})
