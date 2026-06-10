<script setup>
import { ref } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import { useRouter } from 'vue-router'

defineEmits(['saved'])
const prefs  = useUserPrefsStore()
const router = useRouter()

const resetConfirm  = ref(false)
const deleteConfirm = ref(false)
const deleteInput   = ref('')
const resetting     = ref(false)
const resetDone     = ref(false)

async function resetSettings() {
  if (!resetConfirm.value) { resetConfirm.value = true; return }
  resetting.value = true
  await new Promise(r => setTimeout(r, 800))

  // Clear all ep-* keys from localStorage
  Object.keys(localStorage)
    .filter(k => k.startsWith('ep-'))
    .forEach(k => localStorage.removeItem(k))

  resetting.value  = false
  resetDone.value  = true
  resetConfirm.value = false

  // Re-apply defaults
  prefs.applyAll()

  setTimeout(() => {
    resetDone.value = false
    router.go(0) // full reload to restore defaults
  }, 2000)
}

function cancelReset() { resetConfirm.value = false }

const canDelete = () => deleteInput.value === 'DELETE MY ACCOUNT'
</script>

<template>
  <section class="space-y-4">
    <!-- Reset settings -->
    <div class="card border-amber-500/20 bg-amber-500/[0.03]">
      <h2 class="text-base font-bold text-on-surface mb-1 flex items-center gap-2">
        <span class="material-symbols-outlined text-amber-500 text-[20px]">restore</span>
        Reset All Settings
      </h2>
      <p class="text-xs text-on-surface-variant mb-4">
        Restores all appearance, notification, feature, and privacy preferences to factory defaults.
        Your meter readings, account, and energy history are <strong>not</strong> affected.
      </p>

      <Transition name="expand">
        <div v-if="resetConfirm && !resetDone"
          class="mb-4 p-4 rounded-2xl bg-amber-500/8 border border-amber-500/20">
          <p class="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3">
            Are you sure? This will clear all your customisations (theme, accent, notifications, features).
          </p>
          <div class="flex gap-2 flex-wrap">
            <button
              class="px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors min-h-[44px] flex items-center gap-2"
              :disabled="resetting"
              @click="resetSettings"
            >
              <svg v-if="resetting" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15"/>
              </svg>
              {{ resetting ? 'Resetting…' : 'Yes, reset everything' }}
            </button>
            <button
              class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors min-h-[44px]"
              @click="cancelReset"
            >Cancel</button>
          </div>
        </div>
      </Transition>

      <div v-if="resetDone" class="mb-4 flex items-center gap-2 text-emerald-500 text-sm font-semibold">
        <span class="material-symbols-outlined text-[18px]">check_circle</span>
        Settings reset! Reloading…
      </div>

      <button v-if="!resetConfirm && !resetDone"
        class="px-5 py-2.5 rounded-xl text-sm font-bold border-2 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors min-h-[44px] flex items-center gap-2"
        @click="resetSettings"
      >
        <span class="material-symbols-outlined text-[18px]">restore</span>
        Reset All Settings to Defaults
      </button>
    </div>

    <!-- Delete account -->
    <div class="card border-red-500/20 bg-red-500/[0.02]">
      <h2 class="text-base font-bold text-on-surface mb-1 flex items-center gap-2">
        <span class="material-symbols-outlined text-red-500 text-[20px]">delete_forever</span>
        Delete Account
      </h2>
      <p class="text-xs text-on-surface-variant mb-4">
        Permanently deletes your BrightBox account and all associated data including meter readings,
        usage history, and personal information. <strong>This cannot be undone.</strong>
      </p>

      <div v-if="!deleteConfirm">
        <button
          class="px-5 py-2.5 rounded-xl text-sm font-bold border-2 border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors min-h-[44px] flex items-center gap-2"
          @click="deleteConfirm = true"
        >
          <span class="material-symbols-outlined text-[18px]">delete_forever</span>
          Delete My Account
        </button>
      </div>

      <Transition name="expand">
        <div v-if="deleteConfirm" class="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3">
          <p class="text-sm font-semibold text-red-600 dark:text-red-400">
            Type <code class="font-mono bg-red-500/10 px-1.5 py-0.5 rounded">DELETE MY ACCOUNT</code> to confirm:
          </p>
          <input
            v-model="deleteInput"
            type="text"
            placeholder="DELETE MY ACCOUNT"
            class="form-input font-mono border border-red-500/30"
          />
          <div class="flex gap-2 flex-wrap">
            <button
              class="px-5 py-2.5 rounded-xl text-sm font-bold min-h-[44px] transition-all"
              :class="canDelete() ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-surface-container text-on-surface-variant/50 cursor-not-allowed'"
              :disabled="!canDelete()"
            >
              Permanently Delete Account
            </button>
            <button
              class="px-5 py-2.5 rounded-xl text-sm font-semibold min-h-[44px] bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
              @click="deleteConfirm = false; deleteInput = ''"
            >Cancel</button>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.expand-enter-active, .expand-leave-active { transition: all 0.25s ease; }
.expand-enter-from, .expand-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
