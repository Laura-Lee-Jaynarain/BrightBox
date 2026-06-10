<script setup>
import { ref, computed } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'
import ToggleSwitch from 'primevue/toggleswitch'

defineEmits(['saved'])
const prefs = useUserPrefsStore()

// ── Password ─────────────────────────────────────────────────────────────────
const currentPw   = ref('')
const newPw       = ref('')
const confirmPw   = ref('')
const showCurrent = ref(false)
const showNew     = ref(false)
const showConfirm = ref(false)
const pwSaving    = ref(false)
const pwSaved     = ref(false)
const pwError     = ref('')

const strength = computed(() => {
  const p = newPw.value
  if (!p) return 0
  let s = 0
  if (p.length >= 8)        s++
  if (p.length >= 12)       s++
  if (/[A-Z]/.test(p))      s++
  if (/[0-9]/.test(p))      s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})
const strengthLabel = computed(() => ['','Very Weak','Weak','Fair','Strong','Very Strong'][strength.value])
const strengthColor = computed(() => ['','bg-red-500','bg-amber-500','bg-yellow-400','bg-emerald-500','bg-emerald-600'][strength.value])

const pwMatch = computed(() => {
  if (!newPw.value && !confirmPw.value) return null
  return newPw.value === confirmPw.value && newPw.value.length > 0
})
const canUpdate = computed(() => pwMatch.value === true && currentPw.value.length > 0 && strength.value >= 3)

async function updatePassword() {
  pwError.value = ''
  pwSaving.value = true
  await new Promise(r => setTimeout(r, 800))
  // Demo: simulate wrong current password
  if (currentPw.value === 'wrong') { pwError.value = 'Incorrect current password.'; pwSaving.value = false; return }
  pwSaving.value = false
  pwSaved.value  = true
  currentPw.value = ''; newPw.value = ''; confirmPw.value = ''
  setTimeout(() => { pwSaved.value = false }, 4000)
}

// ── Two-Factor Authentication ─────────────────────────────────────────────────
// Demo TOTP setup flow: shows QR + backup codes
const twoFaEnabled   = ref(prefs.twoFactor)
const twoFaSetupMode = ref(false)   // shows setup wizard
const twoFaStep      = ref(1)       // 1 = scan, 2 = verify, 3 = backup codes
const twoFaCode      = ref('')
const twoFaVerifying = ref(false)
const twoFaError     = ref('')
const backupCodes    = ref([])
const disableConfirm = ref(false)

// Demo: static TOTP secret & QR URL (in production: generated server-side)
const DEMO_SECRET   = 'JBSWY3DPEHPK3PXP'
const DEMO_QR_URL   = computed(() =>
  `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`otpauth://totp/BrightBox:${prefs.profile.email}?secret=${DEMO_SECRET}&issuer=BrightBox`)}`
)

function startTwoFaSetup() {
  twoFaSetupMode.value = true
  twoFaStep.value = 1
  twoFaCode.value = ''
  twoFaError.value = ''
  backupCodes.value = []
}

async function verifyTwoFaCode() {
  twoFaError.value = ''
  if (twoFaCode.value.length !== 6 || !/^\d+$/.test(twoFaCode.value)) {
    twoFaError.value = 'Please enter the 6-digit code from your authenticator app.'
    return
  }
  twoFaVerifying.value = true
  await new Promise(r => setTimeout(r, 1000))
  twoFaVerifying.value = false

  // Demo: accept any 6-digit code
  backupCodes.value = generateBackupCodes()
  twoFaStep.value = 3
}

function generateBackupCodes() {
  return Array.from({ length: 8 }, () =>
    Math.random().toString(36).substr(2, 4).toUpperCase() + '-' +
    Math.random().toString(36).substr(2, 4).toUpperCase()
  )
}

function completeTwoFaSetup() {
  prefs.twoFactor = true
  twoFaEnabled.value = true
  twoFaSetupMode.value = false
  twoFaStep.value = 1
}

function cancelSetup() {
  twoFaSetupMode.value = false
  if (!prefs.twoFactor) twoFaEnabled.value = false
}

async function disableTwoFa() {
  if (!disableConfirm.value) { disableConfirm.value = true; return }
  disableConfirm.value = false
  prefs.twoFactor = false
  twoFaEnabled.value = false
}

function copyBackupCodes() {
  navigator.clipboard?.writeText(backupCodes.value.join('\n'))
}

// Toggle handler
function onTwoFaToggle(v) {
  if (v && !prefs.twoFactor) {
    startTwoFaSetup()
  } else if (!v && prefs.twoFactor) {
    disableTwoFa()
  }
}
</script>

<template>
  <section class="card card-elevated">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-1 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">lock</span>
      {{ prefs.t.security }}
    </h2>
    <p class="text-xs text-on-surface-variant mb-6">Keep your BrightBox account secure.</p>

    <!-- ── Change Password ─────────────────────────────────────────────────── -->
    <div class="mb-7 pb-7 border-b border-outline-variant/15">
      <p class="text-sm font-bold text-on-surface mb-4 flex items-center gap-2">
        <span class="material-symbols-outlined text-on-surface-variant text-[18px]">key</span>
        {{ prefs.t.changePassword }}
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- Current -->
        <div class="sm:col-span-2 space-y-1.5">
          <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block" for="cur-pw">
            {{ prefs.t.currentPassword }}
          </label>
          <div class="relative flex items-center">
            <input :type="showCurrent ? 'text' : 'password'" id="cur-pw" v-model="currentPw"
              placeholder="••••••••" autocomplete="current-password" class="form-input pr-12" />
            <button type="button" class="absolute right-3 btn-icon-sm text-on-surface-variant hover:text-on-surface flex items-center justify-center" style="top:50%;transform:translateY(-50%);line-height:0"
              @click="showCurrent = !showCurrent">
              <span class="material-symbols-outlined text-[18px]">{{ showCurrent ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>

        <!-- New -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block" for="new-pw">
            {{ prefs.t.newPassword }}
          </label>
          <div class="relative flex items-center">
            <input :type="showNew ? 'text' : 'password'" id="new-pw" v-model="newPw"
              placeholder="••••••••" autocomplete="new-password" class="form-input pr-12" />
            <button type="button" class="absolute right-3 btn-icon-sm text-on-surface-variant hover:text-on-surface flex items-center justify-center" style="top:50%;transform:translateY(-50%);line-height:0"
              @click="showNew = !showNew">
              <span class="material-symbols-outlined text-[18px]">{{ showNew ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
          <div v-if="newPw" class="space-y-1 mt-1">
            <div class="flex gap-1">
              <div v-for="i in 5" :key="i"
                class="h-1 flex-1 rounded-full transition-all"
                :class="i <= strength ? strengthColor : 'bg-outline-variant/30'" />
            </div>
            <p class="text-[10px] font-semibold"
               :class="{'text-red-500':strength<=2,'text-yellow-500':strength===3,'text-emerald-500':strength>=4}">
              {{ prefs.t.passwordStrength }}: {{ strengthLabel }}
            </p>
          </div>
        </div>

        <!-- Confirm -->
        <div class="space-y-1.5">
          <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block" for="con-pw">
            {{ prefs.t.confirmPassword }}
          </label>
          <div class="relative flex items-center">
            <input :type="showConfirm ? 'text' : 'password'" id="con-pw" v-model="confirmPw"
              placeholder="••••••••" autocomplete="new-password"
              class="form-input pr-12 border"
              :class="pwMatch===false ? 'border-red-500' : pwMatch===true ? 'border-emerald-500/60' : 'border-outline-variant'" />
            <button type="button" class="absolute right-3 btn-icon-sm text-on-surface-variant hover:text-on-surface flex items-center justify-center" style="top:50%;transform:translateY(-50%);line-height:0"
              @click="showConfirm = !showConfirm">
              <span class="material-symbols-outlined text-[18px]">{{ showConfirm ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
          <p v-if="pwMatch===false" class="text-xs text-red-500 mt-1">{{ prefs.t.passwordMismatch }}</p>
          <p v-if="pwMatch===true"  class="text-xs text-emerald-500 mt-1">{{ prefs.t.passwordMatch }}</p>
        </div>
      </div>

      <div v-if="pwError" class="mt-3 text-sm text-red-500 flex items-center gap-2">
        <span class="material-symbols-outlined text-[16px]">error</span> {{ pwError }}
      </div>
      <div v-if="pwSaved" class="mt-3 text-sm text-emerald-500 flex items-center gap-2">
        <span class="material-symbols-outlined text-[16px]">check_circle</span> Password updated successfully.
      </div>

      <div class="mt-4 flex justify-end">
        <button :disabled="!canUpdate || pwSaving"
          class="px-5 py-2.5 rounded-xl text-sm font-bold min-h-[44px] transition-all flex items-center gap-2"
          :class="canUpdate ? 'solar-glow' : 'bg-surface-container text-on-surface-variant/50 cursor-not-allowed'"
          @click="updatePassword">
          <svg v-if="pwSaving" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15"/>
          </svg>
          {{ pwSaving ? 'Updating…' : prefs.t.updatePassword }}
        </button>
      </div>
    </div>

    <!-- ── Two-Factor Authentication ──────────────────────────────────────── -->
    <div>
      <div class="toggle-row mb-4" :class="prefs.twoFactor ? 'border border-emerald-500/20 bg-emerald-500/5' : ''">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
               :class="prefs.twoFactor ? 'bg-emerald-500/15' : 'bg-primary/10'">
            <span class="material-symbols-outlined text-[20px]"
                  :class="prefs.twoFactor ? 'text-emerald-500' : 'text-primary'">
              phonelink_lock
            </span>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <p class="text-sm font-bold text-on-surface">{{ prefs.t.twoFactor }}</p>
              <span v-if="prefs.twoFactor"
                class="pill bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <span class="material-symbols-outlined text-[10px]">check</span> Enabled
              </span>
              <span v-else class="pill bg-amber-500/10 text-amber-600">Not enabled</span>
            </div>
            <p class="text-xs text-on-surface-variant mt-0.5">{{ prefs.t.twoFactorDesc }}</p>
          </div>
        </div>
        <ToggleSwitch
          :model-value="twoFaEnabled"
          :aria-label="prefs.t.twoFactor"
          @update:model-value="onTwoFaToggle"
        />
      </div>

      <!-- Disable confirm -->
      <Transition name="slide-down">
        <div v-if="disableConfirm" class="mb-4 p-4 rounded-2xl bg-red-500/8 border border-red-500/20">
          <p class="text-sm font-semibold text-red-600 dark:text-red-400 mb-3">
            Are you sure you want to disable two-factor authentication? This will make your account less secure.
          </p>
          <div class="flex gap-2">
            <button class="px-4 py-2 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors min-h-[44px]"
              @click="disableTwoFa">Disable 2FA</button>
            <button class="px-4 py-2 rounded-xl text-sm font-semibold bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors min-h-[44px]"
              @click="disableConfirm = false">Cancel</button>
          </div>
        </div>
      </Transition>

      <!-- Setup wizard -->
      <Transition name="slide-down">
        <div v-if="twoFaSetupMode" class="border border-outline-variant/20 rounded-2xl overflow-hidden">
          <!-- Progress -->
          <div class="flex border-b border-outline-variant/15">
            <div v-for="(label, i) in ['Scan QR', 'Verify', 'Backup Codes']" :key="i"
              class="flex-1 py-2.5 text-center text-[11px] font-bold transition-colors"
              :class="twoFaStep === i+1
                ? 'bg-primary/8 text-primary border-b-2 border-primary'
                : twoFaStep > i+1 ? 'text-emerald-500' : 'text-on-surface-variant/50'">
              <span v-if="twoFaStep > i+1" class="material-symbols-outlined text-[14px] mr-1">check_circle</span>
              {{ label }}
            </div>
          </div>

          <!-- Step 1: Scan QR -->
          <div v-if="twoFaStep === 1" class="p-5">
            <h3 class="font-bold text-sm text-on-surface mb-1">Scan with your authenticator app</h3>
            <p class="text-xs text-on-surface-variant mb-4">
              Use <strong>Google Authenticator</strong>, <strong>Authy</strong>, or any TOTP app. Scan the QR code or enter the key manually.
            </p>
            <div class="flex flex-col sm:flex-row gap-5 items-start">
              <!-- QR Code -->
              <div class="p-3 bg-white rounded-2xl border border-outline-variant/20 shadow-sm shrink-0 mx-auto sm:mx-0">
                <img :src="DEMO_QR_URL" alt="2FA QR Code" width="160" height="160" class="block" />
              </div>
              <div class="flex-1 space-y-3">
                <div>
                  <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant mb-1">Manual entry key</p>
                  <div class="flex items-center gap-2 p-3 bg-surface-container rounded-xl border border-outline-variant/20">
                    <code class="text-sm font-mono text-primary tracking-wider flex-1">{{ DEMO_SECRET }}</code>
                    <button class="text-on-surface-variant hover:text-primary transition-colors" @click="navigator.clipboard?.writeText(DEMO_SECRET)" title="Copy key">
                      <span class="material-symbols-outlined text-[16px]">content_copy</span>
                    </button>
                  </div>
                </div>
                <div class="text-xs text-on-surface-variant space-y-1">
                  <p>1. Open your authenticator app</p>
                  <p>2. Tap "Add account" or the + button</p>
                  <p>3. Scan the QR code or enter the key above</p>
                  <p>4. Click "Next" to verify</p>
                </div>
                <button class="solar-glow px-5 py-2.5 rounded-xl text-sm font-bold min-h-[44px]"
                  @click="twoFaStep = 2">Next: Verify Code →</button>
              </div>
            </div>
          </div>

          <!-- Step 2: Verify -->
          <div v-if="twoFaStep === 2" class="p-5">
            <h3 class="font-bold text-sm text-on-surface mb-1">Enter the 6-digit code</h3>
            <p class="text-xs text-on-surface-variant mb-4">Open your authenticator app and enter the code shown for BrightBox.</p>
            <div class="flex gap-3 items-start flex-wrap">
              <input
                v-model="twoFaCode"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength="6"
                placeholder="000000"
                class="form-input font-mono tracking-[0.5em] text-xl text-center w-48"
                :class="twoFaError ? 'border-red-500' : ''"
                @keydown.enter="verifyTwoFaCode"
              />
              <button
                class="solar-glow px-5 py-2.5 rounded-xl text-sm font-bold min-h-[44px] flex items-center gap-2"
                :disabled="twoFaVerifying || twoFaCode.length !== 6"
                @click="verifyTwoFaCode">
                <svg v-if="twoFaVerifying" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15"/>
                </svg>
                {{ twoFaVerifying ? 'Verifying…' : 'Verify' }}
              </button>
            </div>
            <p v-if="twoFaError" class="text-xs text-red-500 mt-2">{{ twoFaError }}</p>
            <button class="mt-3 text-xs text-on-surface-variant hover:text-primary transition-colors underline"
              @click="twoFaStep = 1">← Back to QR code</button>
          </div>

          <!-- Step 3: Backup Codes -->
          <div v-if="twoFaStep === 3" class="p-5">
            <div class="flex items-start gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-emerald-500 text-[20px]">check_circle</span>
              </div>
              <div>
                <h3 class="font-bold text-sm text-on-surface">Verification successful!</h3>
                <p class="text-xs text-on-surface-variant">Save these backup codes before finishing setup.</p>
              </div>
            </div>
            <div class="p-4 rounded-xl bg-surface-container border border-outline-variant/20 mb-4">
              <div class="flex items-center justify-between mb-3">
                <p class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">Recovery Codes (one-time use)</p>
                <button class="text-xs font-semibold text-primary hover:opacity-70 transition-opacity flex items-center gap-1"
                  @click="copyBackupCodes">
                  <span class="material-symbols-outlined text-[14px]">content_copy</span> Copy all
                </button>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <code v-for="code in backupCodes" :key="code"
                  class="text-xs font-mono bg-surface-container-high px-3 py-1.5 rounded-lg text-center text-on-surface tracking-wider">
                  {{ code }}
                </code>
              </div>
            </div>
            <div class="flex items-start gap-2 p-3 rounded-xl bg-amber-500/8 border border-amber-500/15 mb-4">
              <span class="material-symbols-outlined text-amber-500 text-[16px] mt-0.5 shrink-0">warning</span>
              <p class="text-xs text-on-surface-variant">
                <strong class="text-on-surface">Store these codes safely.</strong> Each can only be used once. If you lose access to your authenticator and don't have these codes, you'll be locked out.
              </p>
            </div>
            <button class="solar-glow px-6 py-2.5 rounded-xl text-sm font-bold min-h-[44px]"
              @click="completeTwoFaSetup">I've saved my codes — Finish Setup</button>
          </div>

          <!-- Cancel -->
          <div class="px-5 py-3 border-t border-outline-variant/10 flex justify-end">
            <button class="text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
              @click="cancelSetup">Cancel setup</button>
          </div>
        </div>
      </Transition>

      <!-- Info when 2FA is enabled -->
      <div v-if="prefs.twoFactor && !twoFaSetupMode && !disableConfirm"
           class="mt-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
        <p class="text-xs text-on-surface-variant flex items-center gap-2">
          <span class="material-symbols-outlined text-emerald-500 text-[16px]">verified_user</span>
          Your account is protected with two-factor authentication. Codes are required at each login.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.25s ease; }
.slide-down-enter-from, .slide-down-leave-to { opacity: 0; transform: translateY(-8px); max-height: 0; }
.slide-down-enter-to, .slide-down-leave-from { opacity: 1; max-height: 600px; }
</style>
