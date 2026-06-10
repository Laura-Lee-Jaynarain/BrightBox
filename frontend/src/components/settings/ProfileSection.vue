<script setup>
import { ref, computed } from 'vue'
import { useUserPrefsStore } from '@/stores/userPrefs'

defineEmits(['saved'])
const prefs = useUserPrefsStore()

const local = ref({ ...prefs.profile })
const saving = ref(false)
const saved  = ref(false)
const avatarInput = ref(null)
const avatarPreview = ref(prefs.profile.avatar || '')
const dragOver = ref(false)

// Keep local preview in sync if profile is changed elsewhere
const displayAvatar = computed(() => avatarPreview.value || prefs.avatarUrl)

function triggerFileInput() { avatarInput.value?.click() }

function handleAvatarFile(file) {
  if (!file || !file.type.startsWith('image/')) return
  if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5 MB'); return }
  const reader = new FileReader()
  reader.onload = e => {
    avatarPreview.value = e.target.result
    local.value.avatar  = e.target.result
  }
  reader.readAsDataURL(file)
}

function onFileChange(e)    { handleAvatarFile(e.target.files[0]) }
function onDrop(e)          { dragOver.value = false; handleAvatarFile(e.dataTransfer?.files[0]) }
function onDragOver(e)      { e.preventDefault(); dragOver.value = true }
function onDragLeave()      { dragOver.value = false }

function removeAvatar() {
  avatarPreview.value  = ''
  local.value.avatar   = ''
  if (avatarInput.value) avatarInput.value.value = ''
}

async function saveProfile() {
  saving.value = true
  await new Promise(r => setTimeout(r, 600))
  // setAvatar handles reactive propagation to TopBar, SideBar, and all consumers
  if (local.value.avatar !== prefs.profile.avatar) {
    prefs.setAvatar(local.value.avatar)
  }
  prefs.saveProfile({ ...local.value })
  saving.value = false
  saved.value  = true
  setTimeout(() => { saved.value = false }, 3000)
}

const pronounOptions = ['', 'he/him', 'she/her', 'they/them', 'he/they', 'she/they', 'xe/xem', 'Prefer not to say']
const charCount = computed(() => local.value.bio?.length || 0)
</script>

<template>
  <section class="card card-elevated">
    <h2 class="text-base sm:text-lg font-bold text-on-surface mb-1 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary text-[20px]">person</span>
      {{ prefs.t.profileTitle }}
    </h2>
    <p class="text-xs text-on-surface-variant mb-6">Changes to your profile photo sync instantly across the entire app.</p>

    <!-- Avatar section -->
    <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-outline-variant/20">
      <!-- Avatar display + drag zone -->
      <div class="relative shrink-0">
        <div
          class="w-24 h-24 rounded-[22px] overflow-hidden ring-4 transition-all cursor-pointer group"
          :class="dragOver
            ? 'ring-primary ring-offset-4 ring-offset-surface scale-105'
            : 'ring-primary/20 ring-offset-2 ring-offset-surface hover:ring-primary/40'"
          @click="triggerFileInput"
          @drop.prevent="onDrop"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
          role="button"
          :aria-label="prefs.t.changePhoto"
          tabindex="0"
          @keydown.enter="triggerFileInput"
        >
          <img
            :src="displayAvatar"
            :alt="local.displayName"
            class="w-full h-full object-cover"
          />
          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[22px]">
            <span class="material-symbols-outlined text-white text-[24px]">photo_camera</span>
          </div>
        </div>

        <!-- Online dot -->
        <span class="absolute bottom-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-surface-container-lowest"></span>
      </div>

      <!-- Avatar controls -->
      <div class="flex-1 w-full">
        <p class="font-bold text-sm text-on-surface mb-1">{{ prefs.t.profileAvatar }}</p>
        <p class="text-xs text-on-surface-variant mb-4">
          Upload a JPG, PNG, GIF or WebP under 5 MB. Your photo appears in the sidebar, top bar, and settings.
        </p>

        <!-- Drag-drop zone (desktop) -->
        <div
          class="hidden sm:flex items-center gap-3 p-3 rounded-xl border-2 border-dashed transition-all mb-3 cursor-pointer"
          :class="dragOver
            ? 'border-primary bg-primary/5'
            : 'border-outline-variant/40 hover:border-primary/40 hover:bg-surface-container'"
          @click="triggerFileInput"
          @drop.prevent="onDrop"
          @dragover="onDragOver"
          @dragleave="onDragLeave"
          role="button"
          tabindex="-1"
        >
          <span class="material-symbols-outlined text-on-surface-variant text-[22px]">cloud_upload</span>
          <p class="text-xs text-on-surface-variant">
            <strong class="text-primary font-semibold">Click to upload</strong> or drag & drop your photo here
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            class="solar-glow px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 min-h-[40px]"
            @click="triggerFileInput"
          >
            <span class="material-symbols-outlined text-[16px]">upload</span>
            {{ prefs.t.changePhoto }}
          </button>
          <button v-if="displayAvatar && displayAvatar !== prefs.avatarUrl || local.avatar"
            class="px-4 py-2 rounded-xl text-xs font-semibold border border-error/30 text-error hover:bg-error/8 transition-colors min-h-[40px]"
            @click="removeAvatar"
          >
            <span class="material-symbols-outlined text-[16px]">delete</span>
            {{ prefs.t.removePhoto }}
          </button>
        </div>

        <input
          ref="avatarInput"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          class="sr-only"
          aria-hidden="true"
          @change="onFileChange"
        />
      </div>
    </div>

    <!-- Profile fields grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div class="space-y-1.5">
        <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block" for="disp-name">
          {{ prefs.t.displayName }} <span class="text-error">*</span>
        </label>
        <input
          id="disp-name"
          v-model="local.displayName"
          type="text"
          :placeholder="prefs.t.displayName"
          autocomplete="name"
          class="form-input"
        />
      </div>

      <div class="space-y-1.5">
        <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block" for="email">
          {{ prefs.t.email }} <span class="text-error">*</span>
        </label>
        <input
          id="email"
          v-model="local.email"
          type="email"
          :placeholder="prefs.t.email"
          autocomplete="email"
          class="form-input"
        />
      </div>

      <div class="space-y-1.5">
        <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block" for="phone">
          {{ prefs.t.phone }}
        </label>
        <input
          id="phone"
          v-model="local.phone"
          type="tel"
          placeholder="+27 00 000 0000"
          autocomplete="tel"
          class="form-input"
        />
      </div>

      <div class="space-y-1.5">
        <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block" for="pronouns">
          {{ prefs.t.pronouns }}
        </label>
        <select id="pronouns" v-model="local.pronouns" class="form-input">
          <option v-for="p in pronounOptions" :key="p" :value="p">
            {{ p || 'Prefer not to say' }}
          </option>
        </select>
      </div>

      <div class="space-y-1.5">
        <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block" for="location">
          {{ prefs.t.location }}
        </label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[18px] pointer-events-none">location_on</span>
          <input
            id="location"
            v-model="local.location"
            type="text"
            placeholder="City, Country"
            class="form-input pl-9"
          />
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block" for="website">
          {{ prefs.t.website }}
        </label>
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[18px] pointer-events-none">language</span>
          <input
            id="website"
            v-model="local.website"
            type="url"
            placeholder="https://yoursite.com"
            class="form-input pl-9"
          />
        </div>
      </div>

      <div class="sm:col-span-2 space-y-1.5">
        <div class="flex items-center justify-between">
          <label class="text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant block" for="bio">
            {{ prefs.t.bio }}
          </label>
          <span class="text-[10px] text-on-surface-variant/60">{{ charCount }}/160</span>
        </div>
        <textarea
          id="bio"
          v-model="local.bio"
          rows="3"
          maxlength="160"
          placeholder="A short description about yourself…"
          class="form-input resize-none"
        />
      </div>
    </div>

    <!-- Save button + status -->
    <div class="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-outline-variant/15">
      <Transition name="fade-slide">
        <div v-if="saved" class="flex items-center gap-2 text-emerald-500 text-sm font-semibold">
          <span class="material-symbols-outlined text-[18px]">check_circle</span>
          {{ prefs.t.profileSaved }}
        </div>
        <p v-else class="text-xs text-on-surface-variant/60">
          Profile photo syncs to sidebar and top bar instantly.
        </p>
      </Transition>
      <button
        class="solar-glow px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 min-h-[44px]"
        :disabled="saving"
        @click="saveProfile"
      >
        <svg v-if="saving" class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="40" stroke-dashoffset="15"/>
        </svg>
        <span class="material-symbols-outlined text-[16px]" v-else>save</span>
        {{ saving ? 'Saving…' : prefs.t.updateProfile }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(4px); }
.fade-slide-leave-to   { opacity: 0; transform: translateY(-4px); }
</style>
