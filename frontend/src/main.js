import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import ToggleSwitch from 'primevue/toggleswitch'

import Lara from '@primevue/themes/lara'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: Lara
  }
})

app.use(vue3GoogleLogin, {
  clientId: '491184789863-045kii4su8urcvvrtt8n13s8u2u3v5bh.apps.googleusercontent.com'
})

app.component('ToggleSwitch', ToggleSwitch)



/**
 * ToggleSwitch — global ARIA switch component
 * • WCAG 2.5.5: min 44×44px tap target
 * • WCAG 2.1.1: keyboard toggleable via Space / Enter
 * • WCAG 1.4.1: uses semantic role="switch" not just colour
 */
app.component('ToggleSwitch', {
  props: {
    modelValue: { type: Boolean, required: true },
    disabled:   { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  template: `
    <button
      role="switch"
      type="button"
      :aria-checked="String(modelValue)"
      :aria-disabled="disabled ? 'true' : undefined"
      class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent
             transition-colors duration-200 focus-visible:outline-none
             focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
             focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50"
      style="min-height:44px;min-width:48px;align-items:center;justify-content:center;display:inline-flex;"
      :class="modelValue ? 'bg-primary' : 'bg-outline-variant/50'"
      :disabled="disabled"
      @click="!disabled && $emit('update:modelValue', !modelValue)"
      @keydown.space.prevent="!disabled && $emit('update:modelValue', !modelValue)"
      @keydown.enter.prevent="!disabled && $emit('update:modelValue', !modelValue)"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none absolute inline-block h-5 w-5 transform rounded-full
               bg-white shadow-md transition-transform duration-200"
        :class="modelValue ? 'translate-x-[1.25rem]' : 'translate-x-[0.125rem]'"
      />
    </button>
  `,
})

app.mount('#app')

// ── Apply persisted preferences immediately ───────────────────────────────────
import { useUserPrefsStore } from './stores/userPrefs'
const prefs = useUserPrefsStore()
prefs.applyAll()

// ── Google Translate — free gtx endpoint, no API key needed ─────────────────
// Called by userPrefs.setLanguage() via window.__ecoTranslate(langCode)
window.__ecoTranslate = async function(targetLang) {
  if (targetLang === 'en') {
    // Restore originals
    document.querySelectorAll('[data-bb-orig]').forEach(el => {
      el.textContent = el.getAttribute('data-bb-orig')
      el.removeAttribute('data-bb-orig')
    })
    return
  }

  const SKIP_TAGS = new Set(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','INPUT','CODE','PRE'])

  // Collect text leaf nodes
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement
      if (!p || SKIP_TAGS.has(p.tagName)) return NodeFilter.FILTER_REJECT
      if (node.textContent.trim().length < 2)  return NodeFilter.FILTER_REJECT
      return NodeFilter.FILTER_ACCEPT
    }
  })
  const nodes = []
  let n
  while ((n = walker.nextNode())) nodes.push(n)
  if (!nodes.length) return

  const texts = nodes.map(n => n.textContent.trim())

  // Batch in groups of 40 to stay within URL length limits
  async function translateBatch(batch) {
    try {
      const q = batch.map(t => encodeURIComponent(t)).join('&q=')
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(batch.join('\n'))}`
      const res  = await fetch(url)
      if (!res.ok) throw new Error('translate failed')
      const data = await res.json()
      return data[0].map(item => item[0]).join('').split('\n')
    } catch {
      return batch // fallback: keep originals
    }
  }

  const BATCH = 40
  const translated = []
  for (let i = 0; i < texts.length; i += BATCH) {
    const result = await translateBatch(texts.slice(i, i + BATCH))
    translated.push(...result)
  }

  nodes.forEach((node, i) => {
    if (!node.parentElement.hasAttribute('data-bb-orig')) {
      node.parentElement.setAttribute('data-bb-orig', node.textContent.trim())
    }
    if (translated[i]) node.textContent = translated[i]
  })
}

