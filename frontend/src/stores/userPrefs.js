
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/authStore'


// ─── ACCENT PALETTES THAT GOES WITH THEMES ──────────────────────────────────────────────────────────
export const ACCENT_PALETTES = {
  ocean: {
    label: 'Ocean Blue', hex: '#2563eb', group: 'Cool',
    '--color-primary': '#2563eb', '--color-primary-dim': '#1d4ed8',
    '--color-primary-fixed': '#dbeafe', '--color-primary-fixed-dim': '#93c5fd',
    '--color-on-primary': '#ffffff',
    '--color-primary-container': '#dbeafe', '--color-on-primary-container': '#1e3a5f',
    '--color-secondary': '#0ea5e9', '--color-secondary-container': '#e0f2fe',
    '--color-on-secondary-container': '#0c4a6e',
    '--color-tertiary': '#6366f1', '--color-tertiary-container': '#eef2ff',
    '--color-on-tertiary-container': '#312e81',
    '--pri': '#1d4ed8', '--pri-mid': '#2563eb', '--pri-light': '#dbeafe', '--pri-hover': '#1e40af',
  },
  solar: {
    label: 'Solar Green', hex: '#059669', group: 'Nature',
    '--color-primary': '#059669', '--color-primary-dim': '#047857',
    '--color-primary-fixed': '#d1fae5', '--color-primary-fixed-dim': '#6ee7b7',
    '--color-on-primary': '#ffffff',
    '--color-primary-container': '#d1fae5', '--color-on-primary-container': '#064e3b',
    '--color-secondary': '#0d9488', '--color-secondary-container': '#ccfbf1',
    '--color-on-secondary-container': '#134e4a',
    '--color-tertiary': '#16a34a', '--color-tertiary-container': '#dcfce7',
    '--color-on-tertiary-container': '#14532d',
    '--pri': '#047857', '--pri-mid': '#059669', '--pri-light': '#d1fae5', '--pri-hover': '#065f46',
  },
  violet: {
    label: 'Royal Violet', hex: '#7c3aed', group: 'Bold',
    '--color-primary': '#7c3aed', '--color-primary-dim': '#6d28d9',
    '--color-primary-fixed': '#ede9fe', '--color-primary-fixed-dim': '#c4b5fd',
    '--color-on-primary': '#ffffff',
    '--color-primary-container': '#ede9fe', '--color-on-primary-container': '#2e1065',
    '--color-secondary': '#a855f7', '--color-secondary-container': '#faf5ff',
    '--color-on-secondary-container': '#4a044e',
    '--color-tertiary': '#ec4899', '--color-tertiary-container': '#fdf2f8',
    '--color-on-tertiary-container': '#831843',
    '--pri': '#6d28d9', '--pri-mid': '#7c3aed', '--pri-light': '#ede9fe', '--pri-hover': '#5b21b6',
  },
  rose: {
    label: 'Ruby Rose', hex: '#e11d48', group: 'Bold',
    '--color-primary': '#e11d48', '--color-primary-dim': '#be123c',
    '--color-primary-fixed': '#ffe4e6', '--color-primary-fixed-dim': '#fda4af',
    '--color-on-primary': '#ffffff',
    '--color-primary-container': '#ffe4e6', '--color-on-primary-container': '#4c0519',
    '--color-secondary': '#f97316', '--color-secondary-container': '#fff7ed',
    '--color-on-secondary-container': '#7c2d12',
    '--color-tertiary': '#db2777', '--color-tertiary-container': '#fce7f3',
    '--color-on-tertiary-container': '#831843',
    '--pri': '#be123c', '--pri-mid': '#e11d48', '--pri-light': '#ffe4e6', '--pri-hover': '#9f1239',
  },
  amber: {
    label: 'Warm Amber', hex: '#d97706', group: 'Warm',
    '--color-primary': '#d97706', '--color-primary-dim': '#b45309',
    '--color-primary-fixed': '#fef3c7', '--color-primary-fixed-dim': '#fcd34d',
    '--color-on-primary': '#ffffff',
    '--color-primary-container': '#fef3c7', '--color-on-primary-container': '#451a03',
    '--color-secondary': '#f59e0b', '--color-secondary-container': '#fffbeb',
    '--color-on-secondary-container': '#78350f',
    '--color-tertiary': '#ea580c', '--color-tertiary-container': '#fff7ed',
    '--color-on-tertiary-container': '#7c2d12',
    '--pri': '#b45309', '--pri-mid': '#d97706', '--pri-light': '#fef3c7', '--pri-hover': '#92400e',
  },
  slate: {
    label: 'Midnight Slate', hex: '#475569', group: 'Neutral',
    '--color-primary': '#475569', '--color-primary-dim': '#334155',
    '--color-primary-fixed': '#f1f5f9', '--color-primary-fixed-dim': '#cbd5e1',
    '--color-on-primary': '#ffffff',
    '--color-primary-container': '#e2e8f0', '--color-on-primary-container': '#0f172a',
    '--color-secondary': '#64748b', '--color-secondary-container': '#f8fafc',
    '--color-on-secondary-container': '#1e293b',
    '--color-tertiary': '#6b7280', '--color-tertiary-container': '#f9fafb',
    '--color-on-tertiary-container': '#111827',
    '--pri': '#334155', '--pri-mid': '#475569', '--pri-light': '#f1f5f9', '--pri-hover': '#1e293b',
  },
  coral: {
    label: 'Coral Sunset', hex: '#f43f5e', group: 'Warm',
    '--color-primary': '#f43f5e', '--color-primary-dim': '#e11d48',
    '--color-primary-fixed': '#fff1f2', '--color-primary-fixed-dim': '#fecdd3',
    '--color-on-primary': '#ffffff',
    '--color-primary-container': '#ffe4e6', '--color-on-primary-container': '#881337',
    '--color-secondary': '#fb923c', '--color-secondary-container': '#fff7ed',
    '--color-on-secondary-container': '#7c2d12',
    '--color-tertiary': '#f97316', '--color-tertiary-container': '#ffedd5',
    '--color-on-tertiary-container': '#9a3412',
    '--pri': '#e11d48', '--pri-mid': '#f43f5e', '--pri-light': '#fff1f2', '--pri-hover': '#be123c',
  },
  teal: {
    label: 'Pacific Teal', hex: '#0d9488', group: 'Cool',
    '--color-primary': '#0d9488', '--color-primary-dim': '#0f766e',
    '--color-primary-fixed': '#ccfbf1', '--color-primary-fixed-dim': '#5eead4',
    '--color-on-primary': '#ffffff',
    '--color-primary-container': '#ccfbf1', '--color-on-primary-container': '#134e4a',
    '--color-secondary': '#06b6d4', '--color-secondary-container': '#cffafe',
    '--color-on-secondary-container': '#164e63',
    '--color-tertiary': '#10b981', '--color-tertiary-container': '#d1fae5',
    '--color-on-tertiary-container': '#064e3b',
    '--pri': '#0f766e', '--pri-mid': '#0d9488', '--pri-light': '#ccfbf1', '--pri-hover': '#115e59',
  },
}

// DARK: Rich, warm-dark slate with layered depth — not flat black
const DARK_SURFACES = {
  '--color-background':               '#131720',
  '--color-on-background':            '#e2e8f0',
  '--color-surface':                  '#131720',
  '--color-surface-dim':              '#0e1219',
  '--color-surface-bright':           '#1e2535',
  '--color-surface-variant':          '#1a2132',
  '--color-on-surface':               '#e2e8f0',
  '--color-on-surface-variant':       '#8a9bb8',
  '--color-inverse-surface':          '#e2e8f0',
  '--color-surface-container-lowest': '#0e1219',
  '--color-surface-container-low':    '#161d2c',
  '--color-surface-container':        '#1c2435',
  '--color-surface-container-high':   '#222c3e',
  '--color-surface-container-highest':'#293447',
  '--color-outline':                  '#3d4f6e',
  '--color-outline-variant':          '#243047',
  '--surf': '#161d2c', '--surf-2': '#1c2435', '--surf-3': '#222c3e',
  '--surf-card': '#161d2c', '--text': '#e2e8f0', '--text-muted': '#8a9bb8',
  '--border': 'rgba(100,130,180,0.10)', '--border-strong': 'rgba(100,130,180,0.22)',
}

// LIGHT MODE
const LIGHT_SURFACES = {
  '--color-background':               '#f5f7fa',
  '--color-on-background':            '#0f172a',
  '--color-surface':                  '#f5f7fa',
  '--color-surface-dim':              '#e2e8f4',
  '--color-surface-bright':           '#ffffff',
  '--color-surface-variant':          '#e8edf6',
  '--color-on-surface':               '#0f172a',
  '--color-on-surface-variant':       '#4b5775',
  '--color-inverse-surface':          '#1e293b',
  '--color-surface-container-lowest': '#ffffff',
  '--color-surface-container-low':    '#f0f4fb',
  '--color-surface-container':        '#e8edf7',
  '--color-surface-container-high':   '#dde5f4',
  '--color-surface-container-highest':'#d1dcf0',
  '--color-outline':                  '#7080a0',
  '--color-outline-variant':          '#c8d4e8',
  '--surf': '#f5f7fa', '--surf-2': '#eef4ff', '--surf-3': '#dbeafe',
  '--surf-card': '#ffffff', '--text': '#0f172a', '--text-muted': '#4b5775',
  '--border': 'rgba(37,99,235,0.12)', '--border-strong': 'rgba(37,99,235,0.24)',
}

const HC_LIGHT = {
  '--color-on-surface': '#000', '--color-on-background': '#000',
  '--color-on-surface-variant': '#111', '--color-outline': '#000', '--color-outline-variant': '#333',
}
const HC_DARK = {
  '--color-on-surface': '#fff', '--color-on-background': '#fff',
  '--color-on-surface-variant': '#eee', '--color-outline': '#fff', '--color-outline-variant': '#ccc',
}

// ─── LANGAGES FOR BASIC SYSTEM UNDERSTANDING ─────────────────────────────────────────────────────────────
export const TRANSLATIONS = {
  en: {
    // navigation section
    dashboard: 'Dashboard', leaderboard: 'Leaderboard', uploadMeter: 'Upload Meter',
    energyTips: 'Energy Tips', community: 'Community', settings: 'Settings',
    support: 'Support', logout: 'Log Out', search: 'Search BrightBox…',
    viewImpactReport: 'View Impact Report', navMenu: 'Navigation',
    // settings section
    settingsTitle: 'Settings', settingsSubtitle: 'Personalise your BrightBox experience.',
    profile: 'Profile', appearance: 'Appearance', notifications: 'Notifications',
    privacyData: 'Privacy & Data', energyPrefs: 'Energy', languageRegion: 'Language & Region',
    security: 'Security', dangerZone: 'Danger Zone', featuresTitle: 'App Features',
    //profile section
    profileTitle: 'Your Profile', profileAvatar: 'Profile Photo',
    changePhoto: 'Change Photo', removePhoto: 'Remove',
    displayName: 'Display Name', email: 'Email Address', phone: 'Phone Number',
    bio: 'Short Bio', location: 'Location', website: 'Website', pronouns: 'Pronouns',
    updateProfile: 'Save Profile', profileSaved: 'Profile updated!',
    // Appearance
    colorMode: 'Color Mode', light: 'Light', dark: 'Dark', system: 'System',
    accentColor: 'Accent Color', textSize: 'Text Size',
    small: 'Small', medium: 'Medium', large: 'Large', xlarge: 'X-Large',
    accessibility: 'Accessibility',
    highContrast: 'High Contrast', highContrastDesc: 'Boost text contrast for legibility',
    reduceMotion: 'Reduce Motion', reduceMotionDesc: 'Minimise animations',
    compactMode: 'Compact Mode', compactModeDesc: 'Denser layout with reduced spacing',
    // notifications
    notifTitle: 'Notification Preferences',
    emailNotifs: 'Email Notifications', emailNotifsDesc: 'Master switch for all email communications',
    emailAlerts: 'Critical Alerts', emailAlertsDesc: 'Account security and system alerts (required)',
    weeklyDigest: 'Weekly Digest', weeklyDigestDesc: 'Your weekly energy summary and insights',
    monthlyReport: 'Monthly Report', monthlyReportDesc: 'Detailed monthly usage and savings report',
    communityEmail: 'Community Updates', communityEmailDesc: 'Activity from your neighbourhood',
    productUpdates: 'Product Updates', productUpdatesDesc: 'New features and improvements',
    marketingEmail: 'Promotions & Offers', marketingEmailDesc: 'Special deals and partner offers',
    pushNotifs: 'Push Notifications', pushNotifsDesc: 'Real-time browser and device alerts',
    priceAlerts: 'Tariff Price Alerts', priceAlertsDesc: 'Alerts when energy tariff rates change',
    maintenanceTips: 'Maintenance Tips', maintenanceTipsDesc: 'Periodic energy efficiency reminders',
    unsubAll: 'Unsubscribe from all marketing emails',
    // privacy
    privacyControl: 'Control how your data is collected, used, and shared.',
    shareMetrics: 'Share Usage Metrics', shareMetricsDesc: 'Contribute anonymised data to energy research',
    publicLeaderboard: 'Public Leaderboard', publicLeaderboardDesc: 'Display your name in community rankings',
    analyticsOptIn: 'Product Analytics', analyticsOptInDesc: 'Help us improve BrightBox with usage analytics',
    downloadMyData: 'Download My Data', privacyPolicy: 'Privacy Policy',
    deleteMyData: 'Request Data Deletion',
    // features
    featuresDesc: 'Enable or disable app features throughout BrightBox.',
    chatbotFeature: 'AI Assistant', chatbotFeatureDesc: 'Floating AI energy chat assistant',
    leaderboardFeature: 'Leaderboard', leaderboardFeatureDesc: 'Community energy savings rankings',
    energyTipsFeature: 'Energy Tips', energyTipsFeatureDesc: 'Personalised efficiency tips page',
    communityFeature: 'Community Feed', communityFeatureDesc: 'Neighbourhood activity and posts',
    streakFeature: 'Streak Tracker', streakFeatureDesc: 'Daily green energy streak counter in sidebar',
    // energy prefs
    autoOffsetSurplus: 'Auto Offset Surplus', autoOffsetSurplusDesc: 'Redirect surplus solar to the grid automatically',
    communitySharing: 'Community Sharing', communitySharingDesc: 'Share live metrics with your neighbourhood',
    smartScheduling: 'Smart Scheduling', smartSchedulingDesc: 'AI-optimised appliance scheduling',
    evCharging: 'EV Off-Peak Charging', evChargingDesc: 'Charge EV during off-peak tariff windows only',
    offPeakWindow: 'Off-Peak Window', start: 'Start', end: 'End', energyUnit: 'Energy Unit',
    // security
    changePassword: 'Change Password', currentPassword: 'Current Password',
    newPassword: 'New Password', confirmPassword: 'Confirm New Password',
    updatePassword: 'Update Password', passwordMatch: '✓ Passwords match',
    passwordMismatch: 'Passwords do not match', passwordStrength: 'Password strength',
    twoFactor: 'Two-Factor Authentication', twoFactorDesc: 'Add a second verification step at login',
    // region
    language: 'Language', timeZone: 'Time Zone', currency: 'Currency', unitSystem: 'Unit System',
    regionNote: 'Changes apply instantly. Non-English selections use Google Translate.',
    languageLive: 'Interface language is now', rtlActive: '(right-to-left layout active)',
    metric: 'Metric (kWh, km)', imperial: 'Imperial (BTU, miles)',
    // danger
    resetSettings: 'Reset All Settings', resetSettingsDesc: 'Restore all preferences to factory defaults',
    deleteAccount: 'Delete Account', deleteAccountDesc: 'Permanently delete account and all associated data',
    // actions
    saveAllChanges: 'Save Changes', settingsSaved: 'Settings saved!',
    cancel: 'Cancel', confirm: 'Confirm', close: 'Close',
  },
   af: {
    dashboard: 'Paneelbord', leaderboard: 'Ranglys', uploadMeter: 'Laai Meter Op',
    energyTips: 'Energiewenke', community: 'Gemeenskap', settings: 'Instellings',
    support: 'Ondersteuning', logout: 'Meld af', search: 'Soek…',
    viewImpactReport: 'Bekyk Impakverslag', navMenu: 'Kieslys',
    settingsTitle: 'Instellings', settingsSubtitle: 'Personaliseer jou ervaring en bestuur jou rekening.',
    profile: 'Profiel', appearance: 'Voorkoms', notifications: 'Kennisgewings',
    privacyData: 'Privaatheid', energyPrefs: 'Energie', languageRegion: 'Taal & Streek',
    security: 'Sekuriteit', dangerZone: 'Gevaarsone',
    profileTitle: 'Jou Profiel', profileAvatar: 'Profielfoto',
    changePhoto: 'Verander Foto', removePhoto: 'Verwyder',
    displayName: 'Vertoonaam', email: 'E-posadres', phone: 'Telefoonnommer',
    bio: 'Bio', location: 'Ligging', website: 'Webwerf', pronouns: 'Voornaamwoorde',
    updateProfile: 'Dateer Profiel Op', profileSaved: 'Profiel opgedateer!',
    colorMode: 'Kleurmodus', light: 'Lig', dark: 'Donker', system: 'Stelsel',
    accentColor: 'Aksentkleur', textSize: 'Teksgrootte',
    small: 'Klein', medium: 'Medium', large: 'Groot', xlarge: 'Ekstra Groot',
    accessibility: 'Toeganklikheid',
    highContrast: 'Hoë Kontras', highContrastDesc: 'Vergroot tekskontrast vir leesbaarheid',
    reduceMotion: 'Verminder Beweging', reduceMotionDesc: 'Minimeer animasies',
    compactMode: 'Kompakte Modus', compactModeDesc: 'Verminder spasiëring',
    notifTitle: 'Kennisgewinginstellings',
    emailNotifs: 'E-poskennisgewings', emailNotifsDesc: 'Hoofskakelaar vir alle e-posse',
    emailAlerts: 'Kritiese Waarskuwings', emailAlertsDesc: 'Rekening- en stelselwaarskuwings',
    weeklyDigest: 'Weeklikse Opsomming', weeklyDigestDesc: 'Jou weeklikse energieverslag',
    monthlyReport: 'Maandelikse Verslag', monthlyReportDesc: 'Gedetailleerde maandelikse gebruik',
    communityEmail: 'Gemeenskapsopdaterings', communityEmailDesc: 'Aktiwiteit van jou buurt',
    productUpdates: 'Produkopdaterings', productUpdatesDesc: 'Nuwe funksies en verbeterings',
    marketingEmail: 'Promosies', marketingEmailDesc: 'Spesiale aanbiedinge en vennootskappe',
    pushNotifs: 'Stootkennisgewings', pushNotifsDesc: 'Blaaier- en mobiele kennisgewings',
    priceAlerts: 'Pryswaarskuwings', priceAlertsDesc: 'Waarskuwings wanneer tariewe verander',
    maintenanceTips: 'Onderhoudswenke', maintenanceTipsDesc: 'Energiedoeltreffendheidswenke',
    unsubAll: 'Teken af van alle e-posse',
    privacyControl: 'Beheer hoe jou data gebruik en gedeel word.',
    shareMetrics: 'Deel Statistieke', shareMetricsDesc: 'Deel geanonimiseerde data met navorsers',
    publicLeaderboard: 'Openbare Ranglys', publicLeaderboardDesc: 'Wys jou naam op gemeenskapsranglyste',
    analyticsOptIn: 'Gebruiksanalise', analyticsOptInDesc: 'Help om die program te verbeter',
    downloadMyData: 'Laai My Data Af', privacyPolicy: 'Privaatheidsbeleid',
    featuresTitle: 'Programfunksies', featuresDesc: 'Skakel funksies regdeur die program in/uit.',
    chatbotFeature: 'KI-assistent', chatbotFeatureDesc: 'Drywende KI-praatassistent',
    leaderboardFeature: 'Ranglys', leaderboardFeatureDesc: 'Gemeenskapsenergieprestasies',
    energyTipsFeature: 'Energiewenke', energyTipsFeatureDesc: 'Gepersonaliseerde wenke',
    communityFeature: 'Gemeenskapsvoer', communityFeatureDesc: 'Buurtaktiwiteit en plasings',
    streakFeature: 'Streeksporing', streakFeatureDesc: 'Daaglikse groenenergiestreek',
    autoOffsetSurplus: 'Outo Surplus Verreken', autoOffsetSurplusDesc: 'Stuur surplus na netwerk',
    communitySharing: 'Gemeenskapsdeling', communitySharingDesc: 'Deel statistieke met buurt',
    smartScheduling: 'Slim Skedule', smartSchedulingDesc: 'KI-skedule',
    evCharging: 'EV Buitepieklaaing', evChargingDesc: 'Laai EV buite piektye',
    offPeakWindow: 'Buitepiektydvenster', start: 'Begin', end: 'Einde',
    energyUnit: 'Energie-eenheid',
    changePassword: 'Verander Wagwoord', currentPassword: 'Huidige Wagwoord',
    newPassword: 'Nuwe Wagwoord', confirmPassword: 'Bevestig Wagwoord',
    updatePassword: 'Dateer Wagwoord Op', passwordMatch: '✓ Wagwoorde stem ooreen',
    passwordMismatch: 'Wagwoorde stem nie ooreen nie', passwordStrength: 'Wagwoordsterkte',
    twoFactor: 'Twee-Faktor-Verifikasie', twoFactorDesc: 'Ekstra sekuriteitslaag',
    activeSessions: 'Aktiewe Sessies', logoutAllDevices: 'Meld af van alle toestelle',
    language: 'Taal', timeZone: 'Tydsone', currency: 'Geldeenheid', unitSystem: 'Eenheidstelsel',
    regionNote: 'Veranderinge geld onmiddellik.',
    languageLive: 'Koppelvlaktaal is nou:', rtlActive: '(RTL uitleg aktief)',
    metric: 'Metriek (kWh, km)', imperial: 'Imperiaal (myl)',
    resetSettings: 'Herstel Instellings', resetSettingsDesc: 'Herstel alle voorkeure',
    deleteAccount: 'Vee Rekening Uit', deleteAccountDesc: 'Verwyder rekening en alle data permanent',
    saveAllChanges: 'Stoor Veranderinge', settingsSaved: 'Instellings gestoor!',
    cancel: 'Kanselleer', confirm: 'Bevestig', close: 'Sluit',
  },
  fr: {
    dashboard: 'Tableau de bord', leaderboard: 'Classement', uploadMeter: 'Télécharger relevé',
    energyTips: 'Conseils énergie', community: 'Communauté', settings: 'Paramètres',
    support: 'Support', logout: 'Déconnexion', search: 'Rechercher…',
    viewImpactReport: "Voir le rapport d'impact", navMenu: 'Menu',
    settingsTitle: 'Paramètres', settingsSubtitle: 'Personnalisez votre expérience et gérez votre compte.',
    profile: 'Profil', appearance: 'Apparence', notifications: 'Notifications',
    privacyData: 'Confidentialité', energyPrefs: 'Énergie', languageRegion: 'Langue & Région',
    security: 'Sécurité', dangerZone: 'Zone dangereuse',
    profileTitle: 'Votre profil', profileAvatar: 'Photo de profil',
    changePhoto: 'Changer la photo', removePhoto: 'Supprimer',
    displayName: 'Nom affiché', email: 'Adresse e-mail', phone: 'Téléphone',
    bio: 'Bio', location: 'Lieu', website: 'Site web', pronouns: 'Pronoms',
    updateProfile: 'Mettre à jour', profileSaved: 'Profil mis à jour !',
    colorMode: 'Mode couleur', light: 'Clair', dark: 'Sombre', system: 'Système',
    accentColor: "Couleur d'accent", textSize: 'Taille du texte',
    small: 'Petit', medium: 'Moyen', large: 'Grand', xlarge: 'Très grand',
    accessibility: 'Accessibilité',
    highContrast: 'Contraste élevé', highContrastDesc: 'Augmenter le contraste du texte',
    reduceMotion: 'Réduire les animations', reduceMotionDesc: 'Minimiser les animations',
    compactMode: 'Mode compact', compactModeDesc: 'Réduire les espaces',
    notifTitle: 'Préférences de notification',
    emailNotifs: 'Notifications e-mail', emailNotifsDesc: 'Interrupteur principal pour tous les e-mails',
    emailAlerts: 'Alertes critiques', emailAlertsDesc: 'Alertes de sécurité et système',
    weeklyDigest: 'Résumé hebdomadaire', weeklyDigestDesc: 'Votre résumé énergétique hebdomadaire',
    monthlyReport: 'Rapport mensuel', monthlyReportDesc: 'Rapport mensuel détaillé',
    communityEmail: 'Mises à jour communautaires', communityEmailDesc: 'Activité de votre quartier',
    productUpdates: 'Mises à jour produit', productUpdatesDesc: 'Nouvelles fonctionnalités',
    marketingEmail: 'Promotions', marketingEmailDesc: 'Offres spéciales et partenariats',
    pushNotifs: 'Notifications push', pushNotifsDesc: 'Alertes navigateur et mobile',
    priceAlerts: 'Alertes de prix', priceAlertsDesc: 'Alertes lors des changements de tarifs',
    maintenanceTips: 'Conseils de maintenance', maintenanceTipsDesc: "Conseils d'efficacité",
    unsubAll: 'Se désabonner de tous les e-mails',
    privacyControl: 'Contrôlez comment vos données sont utilisées.',
    shareMetrics: 'Partager les métriques', shareMetricsDesc: 'Partager avec les chercheurs',
    publicLeaderboard: 'Classement public', publicLeaderboardDesc: 'Afficher votre nom',
    analyticsOptIn: "Analyses d'utilisation", analyticsOptInDesc: "Aider à améliorer l'application",
    downloadMyData: 'Télécharger mes données', privacyPolicy: 'Politique de confidentialité',
    featuresTitle: "Fonctionnalités", featuresDesc: "Activer/désactiver les fonctionnalités.",
    chatbotFeature: 'Assistant IA', chatbotFeatureDesc: 'Assistant chat IA flottant',
    leaderboardFeature: 'Classement', leaderboardFeatureDesc: 'Classements énergétiques',
    energyTipsFeature: 'Conseils énergie', energyTipsFeatureDesc: 'Conseils personnalisés',
    communityFeature: 'Fil communautaire', communityFeatureDesc: 'Activité du quartier',
    streakFeature: 'Suivi des séries', streakFeatureDesc: 'Compteur de série verte',
    autoOffsetSurplus: 'Compensation auto', autoOffsetSurplusDesc: 'Rediriger le surplus solaire',
    communitySharing: 'Partage communautaire', communitySharingDesc: 'Partager avec le quartier',
    smartScheduling: 'Planification intelligente', smartSchedulingDesc: 'Planification IA',
    evCharging: 'Charge VE hors-pointe', evChargingDesc: 'Charger pendant les heures creuses',
    offPeakWindow: 'Fenêtre hors-pointe', start: 'Début', end: 'Fin',
    energyUnit: "Unité d'énergie",
    changePassword: 'Changer le mot de passe', currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe', confirmPassword: 'Confirmer le mot de passe',
    updatePassword: 'Mettre à jour', passwordMatch: '✓ Mots de passe identiques',
    passwordMismatch: 'Mots de passe différents', passwordStrength: 'Force du mot de passe',
    twoFactor: 'Authentification à deux facteurs', twoFactorDesc: 'Couche de sécurité supplémentaire',
    activeSessions: 'Sessions actives', logoutAllDevices: 'Déconnecter tous les appareils',
    language: 'Langue', timeZone: 'Fuseau horaire', currency: 'Devise', unitSystem: "Système d'unités",
    regionNote: "Les changements s'appliquent instantanément.",
    languageLive: "La langue de l'interface est maintenant :", rtlActive: '(mise en page RTL active)',
    metric: 'Métrique (kWh, km)', imperial: 'Impérial (miles)',
    resetSettings: 'Réinitialiser', resetSettingsDesc: 'Restaurer les préférences par défaut',
    deleteAccount: 'Supprimer le compte', deleteAccountDesc: 'Supprimer définitivement le compte',
    saveAllChanges: 'Enregistrer tout', settingsSaved: 'Paramètres enregistrés !',
    cancel: 'Annuler', confirm: 'Confirmer', close: 'Fermer',
  },
  de: {
    dashboard: 'Übersicht', leaderboard: 'Rangliste', uploadMeter: 'Zähler hochladen',
    energyTips: 'Energietipps', community: 'Gemeinschaft', settings: 'Einstellungen',
    support: 'Support', logout: 'Abmelden', search: 'Suchen…',
    viewImpactReport: 'Auswirkungsbericht', navMenu: 'Menü',
    settingsTitle: 'Einstellungen', settingsSubtitle: 'Personalisieren Sie Ihr Erlebnis.',
    profile: 'Profil', appearance: 'Erscheinungsbild', notifications: 'Benachrichtigungen',
    privacyData: 'Datenschutz', energyPrefs: 'Energie', languageRegion: 'Sprache & Region',
    security: 'Sicherheit', dangerZone: 'Gefahrenzone',
    profileTitle: 'Ihr Profil', profileAvatar: 'Profilbild',
    changePhoto: 'Foto ändern', removePhoto: 'Entfernen',
    displayName: 'Anzeigename', email: 'E-Mail-Adresse', phone: 'Telefonnummer',
    bio: 'Bio', location: 'Standort', website: 'Website', pronouns: 'Pronomen',
    updateProfile: 'Profil aktualisieren', profileSaved: 'Profil aktualisiert!',
    colorMode: 'Farbmodus', light: 'Hell', dark: 'Dunkel', system: 'System',
    accentColor: 'Akzentfarbe', textSize: 'Textgröße',
    small: 'Klein', medium: 'Mittel', large: 'Groß', xlarge: 'Sehr groß',
    accessibility: 'Barrierefreiheit',
    highContrast: 'Hoher Kontrast', highContrastDesc: 'Textkontrast erhöhen',
    reduceMotion: 'Bewegung reduzieren', reduceMotionDesc: 'Animationen minimieren',
    compactMode: 'Kompaktmodus', compactModeDesc: 'Abstände reduzieren',
    notifTitle: 'Benachrichtigungseinstellungen',
    emailNotifs: 'E-Mail-Benachrichtigungen', emailNotifsDesc: 'Hauptschalter für alle E-Mails',
    emailAlerts: 'Kritische Warnungen', emailAlertsDesc: 'Sicherheits- und Systemwarnungen',
    weeklyDigest: 'Wöchentliche Zusammenfassung', weeklyDigestDesc: 'Ihr wöchentlicher Energiebericht',
    monthlyReport: 'Monatsbericht', monthlyReportDesc: 'Detaillierter Monatsbericht',
    communityEmail: 'Community-Updates', communityEmailDesc: 'Aktivität in Ihrer Nachbarschaft',
    productUpdates: 'Produkt-Updates', productUpdatesDesc: 'Neue Funktionen',
    marketingEmail: 'Aktionen', marketingEmailDesc: 'Sonderangebote und Partner',
    pushNotifs: 'Push-Benachrichtigungen', pushNotifsDesc: 'Browser- und mobile Benachrichtigungen',
    priceAlerts: 'Preiswarnungen', priceAlertsDesc: 'Warnungen bei Tarifänderungen',
    maintenanceTips: 'Wartungshinweise', maintenanceTipsDesc: 'Energieeffizienz-Tipps',
    unsubAll: 'Von allen E-Mails abmelden',
    privacyControl: 'Steuern Sie, wie Ihre Daten verwendet werden.',
    shareMetrics: 'Metriken teilen', shareMetricsDesc: 'Mit Forschern teilen',
    publicLeaderboard: 'Öffentliche Rangliste', publicLeaderboardDesc: 'Namen anzeigen',
    analyticsOptIn: 'Nutzungsanalysen', analyticsOptInDesc: 'App-Verbesserung unterstützen',
    downloadMyData: 'Daten herunterladen', privacyPolicy: 'Datenschutzrichtlinie',
    featuresTitle: 'App-Funktionen', featuresDesc: 'Funktionen aktivieren/deaktivieren.',
    chatbotFeature: 'KI-Assistent', chatbotFeatureDesc: 'Schwebender KI-Chat',
    leaderboardFeature: 'Rangliste', leaderboardFeatureDesc: 'Energie-Rankings',
    energyTipsFeature: 'Energietipps', energyTipsFeatureDesc: 'Personalisierte Tipps',
    communityFeature: 'Community-Feed', communityFeatureDesc: 'Nachbarschaftsaktivität',
    streakFeature: 'Streak-Tracker', streakFeatureDesc: 'Täglicher grüner Energie-Streak',
    autoOffsetSurplus: 'Auto-Überschuss', autoOffsetSurplusDesc: 'Solarüberschuss ins Netz',
    communitySharing: 'Community-Teilen', communitySharingDesc: 'Metriken teilen',
    smartScheduling: 'Intelligente Planung', smartSchedulingDesc: 'KI-Zeitplanung',
    evCharging: 'EV Nebenzeiten', evChargingDesc: 'EV in Nebenzeiten laden',
    offPeakWindow: 'Nebenzeitfenster', start: 'Beginn', end: 'Ende',
    energyUnit: 'Energieeinheit',
    changePassword: 'Passwort ändern', currentPassword: 'Aktuelles Passwort',
    newPassword: 'Neues Passwort', confirmPassword: 'Passwort bestätigen',
    updatePassword: 'Passwort aktualisieren', passwordMatch: '✓ Passwörter stimmen überein',
    passwordMismatch: 'Passwörter stimmen nicht überein', passwordStrength: 'Passwortstärke',
    twoFactor: '2-Faktor-Authentifizierung', twoFactorDesc: 'Zusätzliche Sicherheitsebene',
    activeSessions: 'Aktive Sitzungen', logoutAllDevices: 'Von allen Geräten abmelden',
    language: 'Sprache', timeZone: 'Zeitzone', currency: 'Währung', unitSystem: 'Einheitensystem',
    regionNote: 'Änderungen gelten sofort.',
    languageLive: 'Oberflächensprache ist jetzt:', rtlActive: '(RTL-Layout aktiv)',
    metric: 'Metrisch (kWh, km)', imperial: 'Imperial (Meilen)',
    resetSettings: 'Zurücksetzen', resetSettingsDesc: 'Alle Einstellungen zurücksetzen',
    deleteAccount: 'Konto löschen', deleteAccountDesc: 'Konto dauerhaft löschen',
    saveAllChanges: 'Speichern', settingsSaved: 'Einstellungen gespeichert!',
    cancel: 'Abbrechen', confirm: 'Bestätigen', close: 'Schließen',
  },
  es: {
    dashboard: 'Panel', leaderboard: 'Clasificación', uploadMeter: 'Subir lectura',
    energyTips: 'Consejos energía', community: 'Comunidad', settings: 'Configuración',
    support: 'Soporte', logout: 'Cerrar sesión', search: 'Buscar…',
    viewImpactReport: 'Ver informe', navMenu: 'Menú',
    settingsTitle: 'Configuración', settingsSubtitle: 'Personaliza tu experiencia y gestiona tu cuenta.',
    profile: 'Perfil', appearance: 'Apariencia', notifications: 'Notificaciones',
    privacyData: 'Privacidad', energyPrefs: 'Energía', languageRegion: 'Idioma & Región',
    security: 'Seguridad', dangerZone: 'Zona peligrosa',
    profileTitle: 'Tu perfil', profileAvatar: 'Foto de perfil',
    changePhoto: 'Cambiar foto', removePhoto: 'Eliminar',
    displayName: 'Nombre visible', email: 'Correo electrónico', phone: 'Teléfono',
    bio: 'Bio', location: 'Ubicación', website: 'Sitio web', pronouns: 'Pronombres',
    updateProfile: 'Actualizar perfil', profileSaved: '¡Perfil actualizado!',
    colorMode: 'Modo de color', light: 'Claro', dark: 'Oscuro', system: 'Sistema',
    accentColor: 'Color de acento', textSize: 'Tamaño de texto',
    small: 'Pequeño', medium: 'Mediano', large: 'Grande', xlarge: 'Muy grande',
    accessibility: 'Accesibilidad',
    highContrast: 'Alto contraste', highContrastDesc: 'Aumentar contraste del texto',
    reduceMotion: 'Reducir movimiento', reduceMotionDesc: 'Minimizar animaciones',
    compactMode: 'Modo compacto', compactModeDesc: 'Reducir espaciado',
    notifTitle: 'Preferencias de notificación',
    emailNotifs: 'Correos electrónicos', emailNotifsDesc: 'Interruptor principal para todos los correos',
    emailAlerts: 'Alertas críticas', emailAlertsDesc: 'Alertas de seguridad',
    weeklyDigest: 'Resumen semanal', weeklyDigestDesc: 'Tu resumen energético semanal',
    monthlyReport: 'Informe mensual', monthlyReportDesc: 'Informe mensual detallado',
    communityEmail: 'Actualizaciones comunitarias', communityEmailDesc: 'Actividad de tu barrio',
    productUpdates: 'Actualizaciones', productUpdatesDesc: 'Nuevas funciones',
    marketingEmail: 'Promociones', marketingEmailDesc: 'Ofertas especiales',
    pushNotifs: 'Notificaciones push', pushNotifsDesc: 'Alertas del navegador y móvil',
    priceAlerts: 'Alertas de precios', priceAlertsDesc: 'Cambios de tarifas',
    maintenanceTips: 'Consejos de mantenimiento', maintenanceTipsDesc: 'Eficiencia energética',
    unsubAll: 'Cancelar suscripción a todos los correos',
    privacyControl: 'Controla cómo se usan tus datos.',
    shareMetrics: 'Compartir métricas', shareMetricsDesc: 'Compartir con investigadores',
    publicLeaderboard: 'Clasificación pública', publicLeaderboardDesc: 'Mostrar nombre',
    analyticsOptIn: 'Análisis de uso', analyticsOptInDesc: 'Mejorar la aplicación',
    downloadMyData: 'Descargar mis datos', privacyPolicy: 'Política de privacidad',
    featuresTitle: 'Funciones de la app', featuresDesc: 'Activar/desactivar funciones.',
    chatbotFeature: 'Asistente IA', chatbotFeatureDesc: 'Chat IA flotante',
    leaderboardFeature: 'Clasificación', leaderboardFeatureDesc: 'Rankings de energía',
    energyTipsFeature: 'Consejos energía', energyTipsFeatureDesc: 'Consejos personalizados',
    communityFeature: 'Feed comunitario', communityFeatureDesc: 'Actividad del barrio',
    streakFeature: 'Racha', streakFeatureDesc: 'Contador de racha verde',
    autoOffsetSurplus: 'Compensar excedente', autoOffsetSurplusDesc: 'Redirigir excedente solar',
    communitySharing: 'Compartir comunitario', communitySharingDesc: 'Compartir métricas',
    smartScheduling: 'Programación inteligente', smartSchedulingDesc: 'Programación IA',
    evCharging: 'Carga VE valle', evChargingDesc: 'Cargar en horas valle',
    offPeakWindow: 'Ventana valle', start: 'Inicio', end: 'Fin',
    energyUnit: 'Unidad de energía',
    changePassword: 'Cambiar contraseña', currentPassword: 'Contraseña actual',
    newPassword: 'Nueva contraseña', confirmPassword: 'Confirmar contraseña',
    updatePassword: 'Actualizar', passwordMatch: '✓ Contraseñas coinciden',
    passwordMismatch: 'No coinciden', passwordStrength: 'Fortaleza',
    twoFactor: 'Autenticación de dos factores', twoFactorDesc: 'Capa adicional de seguridad',
    activeSessions: 'Sesiones activas', logoutAllDevices: 'Cerrar sesión en todos',
    language: 'Idioma', timeZone: 'Zona horaria', currency: 'Moneda', unitSystem: 'Sistema de unidades',
    regionNote: 'Los cambios se aplican al instante.',
    languageLive: 'Idioma de la interfaz:', rtlActive: '(diseño RTL activo)',
    metric: 'Métrico (kWh, km)', imperial: 'Imperial (millas)',
    resetSettings: 'Restablecer', resetSettingsDesc: 'Restaurar preferencias',
    deleteAccount: 'Eliminar cuenta', deleteAccountDesc: 'Eliminar cuenta permanentemente',
    saveAllChanges: 'Guardar todo', settingsSaved: '¡Configuración guardada!',
    cancel: 'Cancelar', confirm: 'Confirmar', close: 'Cerrar',
  },
  ar: {
    dashboard: 'لوحة التحكم', leaderboard: 'المتصدرون', uploadMeter: 'رفع قراءة العداد',
    energyTips: 'نصائح الطاقة', community: 'المجتمع', settings: 'الإعدادات',
    support: 'الدعم', logout: 'تسجيل الخروج', search: 'بحث…',
    viewImpactReport: 'عرض التقرير', navMenu: 'القائمة',
    settingsTitle: 'الإعدادات', settingsSubtitle: 'خصّص تجربتك وأدر حسابك.',
    profile: 'الملف الشخصي', appearance: 'المظهر', notifications: 'الإشعارات',
    privacyData: 'الخصوصية', energyPrefs: 'الطاقة', languageRegion: 'اللغة والمنطقة',
    security: 'الأمان', dangerZone: 'المنطقة الخطرة',
    profileTitle: 'ملفك الشخصي', profileAvatar: 'صورة الملف',
    changePhoto: 'تغيير الصورة', removePhoto: 'إزالة',
    displayName: 'الاسم المعروض', email: 'البريد الإلكتروني', phone: 'رقم الهاتف',
    bio: 'نبذة', location: 'الموقع', website: 'الموقع الإلكتروني', pronouns: 'الضمائر',
    updateProfile: 'تحديث الملف', profileSaved: 'تم تحديث الملف!',
    colorMode: 'وضع الألوان', light: 'فاتح', dark: 'داكن', system: 'النظام',
    accentColor: 'لون التمييز', textSize: 'حجم النص',
    small: 'صغير', medium: 'متوسط', large: 'كبير', xlarge: 'كبير جداً',
    accessibility: 'إمكانية الوصول',
    highContrast: 'تباين عالٍ', highContrastDesc: 'زيادة تباين النص',
    reduceMotion: 'تقليل الحركة', reduceMotionDesc: 'تقليل الرسوم المتحركة',
    compactMode: 'الوضع المضغوط', compactModeDesc: 'تقليل المسافات',
    notifTitle: 'تفضيلات الإشعارات',
    emailNotifs: 'إشعارات البريد', emailNotifsDesc: 'المفتاح الرئيسي لجميع الرسائل',
    emailAlerts: 'تنبيهات حرجة', emailAlertsDesc: 'تنبيهات الأمان',
    weeklyDigest: 'ملخص أسبوعي', weeklyDigestDesc: 'ملخصك الأسبوعي',
    monthlyReport: 'تقرير شهري', monthlyReportDesc: 'تقرير شهري تفصيلي',
    communityEmail: 'تحديثات المجتمع', communityEmailDesc: 'نشاط حيّك',
    productUpdates: 'تحديثات المنتج', productUpdatesDesc: 'ميزات جديدة',
    marketingEmail: 'عروض وتخفيضات', marketingEmailDesc: 'صفقات خاصة',
    pushNotifs: 'الإشعارات الفورية', pushNotifsDesc: 'إشعارات المتصفح',
    priceAlerts: 'تنبيهات الأسعار', priceAlertsDesc: 'تغييرات التعريفات',
    maintenanceTips: 'نصائح الصيانة', maintenanceTipsDesc: 'نصائح الكفاءة',
    unsubAll: 'إلغاء الاشتراك من جميع الرسائل',
    privacyControl: 'تحكم في كيفية استخدام بياناتك.',
    shareMetrics: 'مشاركة البيانات', shareMetricsDesc: 'مشاركة مع الباحثين',
    publicLeaderboard: 'القائمة العامة', publicLeaderboardDesc: 'إظهار الاسم',
    analyticsOptIn: 'تحليلات الاستخدام', analyticsOptInDesc: 'تحسين التطبيق',
    downloadMyData: 'تحميل بياناتي', privacyPolicy: 'سياسة الخصوصية',
    featuresTitle: 'ميزات التطبيق', featuresDesc: 'تفعيل/تعطيل الميزات.',
    chatbotFeature: 'مساعد ذكي', chatbotFeatureDesc: 'مساعد دردشة عائم',
    leaderboardFeature: 'المتصدرون', leaderboardFeatureDesc: 'تصنيفات الطاقة',
    energyTipsFeature: 'نصائح الطاقة', energyTipsFeatureDesc: 'نصائح شخصية',
    communityFeature: 'خلاصة المجتمع', communityFeatureDesc: 'نشاط الحي',
    streakFeature: 'متتبع السلسلة', streakFeatureDesc: 'عداد السلسلة اليومية',
    autoOffsetSurplus: 'موازنة الفائض', autoOffsetSurplusDesc: 'إعادة توجيه الفائض الشمسي',
    communitySharing: 'المشاركة المجتمعية', communitySharingDesc: 'مشاركة المقاييس',
    smartScheduling: 'الجدولة الذكية', smartSchedulingDesc: 'جدولة بالذكاء الاصطناعي',
    evCharging: 'شحن السيارة الكهربائية', evChargingDesc: 'الشحن خارج أوقات الذروة',
    offPeakWindow: 'نافذة خارج الذروة', start: 'البداية', end: 'النهاية',
    energyUnit: 'وحدة الطاقة',
    changePassword: 'تغيير كلمة المرور', currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة مرور جديدة', confirmPassword: 'تأكيد كلمة المرور',
    updatePassword: 'تحديث', passwordMatch: '✓ كلمات المرور متطابقة',
    passwordMismatch: 'غير متطابقة', passwordStrength: 'قوة كلمة المرور',
    twoFactor: 'المصادقة الثنائية', twoFactorDesc: 'طبقة أمان إضافية',
    activeSessions: 'الجلسات النشطة', logoutAllDevices: 'تسجيل الخروج من جميع الأجهزة',
    language: 'اللغة', timeZone: 'المنطقة الزمنية', currency: 'العملة', unitSystem: 'نظام الوحدات',
    regionNote: 'تُطبَّق التغييرات فوراً في التطبيق.',
    languageLive: 'لغة الواجهة الآن:', rtlActive: '(تخطيط RTL نشط)',
    metric: 'متري (كيلوواط، كم)', imperial: 'إمبراطوري (ميل)',
    resetSettings: 'إعادة التعيين', resetSettingsDesc: 'استعادة جميع التفضيلات',
    deleteAccount: 'حذف الحساب', deleteAccountDesc: 'حذف الحساب نهائياً',
    saveAllChanges: 'حفظ التغييرات', settingsSaved: 'تم الحفظ!',
    cancel: 'إلغاء', confirm: 'تأكيد', close: 'إغلاق',
  },
}

// ─── STORE ────────────────────────────────────────────────────────────────────
export const useUserPrefsStore = defineStore('userPrefs', () => {

  const auth = useAuthStore()

  // ── Appearance ──────────────────────────────────────────────────────────────
  const accentKey    = ref(localStorage.getItem('ep-accent')     || 'ocean')
  const themeMode    = ref(localStorage.getItem('ep-theme-mode') || 'system')
  const fontSize     = ref(Number(localStorage.getItem('ep-font-size')) || 15)
  const highContrast = ref(localStorage.getItem('ep-hc')         === 'true')
  const reduceMotion = ref(localStorage.getItem('ep-motion')     === 'true')
  const compactMode  = ref(localStorage.getItem('ep-compact')    === 'true')
  const darkMode     = ref(false)

  // ── Region ──────────────────────────────────────────────────────────────────
  const language   = ref(localStorage.getItem('ep-lang')        || 'en')
  const timezone   = ref(localStorage.getItem('ep-timezone')    || 'Africa/Johannesburg')
  const currency   = ref(localStorage.getItem('ep-currency')    || 'ZAR')
  const unitSystem = ref(localStorage.getItem('ep-unit-system') || 'metric')
  const energyUnit = ref(localStorage.getItem('ep-unit')        || 'kWh')

  // ── Layout ──────────────────────────────────────────────────────────────────
  const sidebarOpen       = ref(true)
  const mobileSidebarOpen = ref(false)


  const _avatarKey = 'ep-profile-avatar'

  const profile = ref({
    displayName: computed(()=>auth.fullName )          || 'Energy Hero',
    email:       computed(()=>auth.email  )             || 'hero@brightbox.app',
    phone:       localStorage.getItem('ep-profile-phone')    || '',
    bio:         localStorage.getItem('ep-profile-bio')      || '',
    location:    localStorage.getItem('ep-profile-location') || 'South Africa',
    website:     localStorage.getItem('ep-profile-website')  || '',
    pronouns:    localStorage.getItem('ep-profile-pronouns') || '',
    avatar:      localStorage.getItem(_avatarKey)            || '',
  })

  
  function saveProfile(data) {
    Object.assign(profile.value, data)
    const fieldMap = {
      displayName: 'name', email: 'email', phone: 'phone', bio: 'bio',
      location: 'location', website: 'website', pronouns: 'pronouns', avatar: 'avatar',
    }
    Object.entries(data).forEach(([k, v]) => {
      const lsKey = fieldMap[k] ? `ep-profile-${fieldMap[k]}` : `ep-profile-${k}`
      localStorage.setItem(lsKey, v)
    })
  }

 
  function setAvatar(dataUrl) {
    profile.value.avatar = dataUrl
    localStorage.setItem(_avatarKey, dataUrl)
  }

  
  const avatarUrl = computed(() =>
    profile.value.avatar ||
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBfmVuxN7riZahEcZ3uEoyYaRu9JXhalFTwXgadhcFsO8Xxou2dNcoqLOfZaIVbt8EnWTxlg3zRPYQ3Ta0F3ZGippGnsp1oxqgxsXlQAVirvN2at_uPKdde96ZedgOfNsdhJsvdG-OHe9C1A783qYo3cywkcasmg1YO50I7lV5oPQ7SctvfOUX2o0b0Bib32LcFYdZAHsglAza7pXs2Huj9NN_-orB0EAl-8zNBzrU9L8qcYNqy1pmq3ak2Y026EolUm5Z-VCZoJaU'
  )

  // ── Features ────────────────────────────────────────────────────────────────
  const features = ref({
    chatbot:     localStorage.getItem('ep-feat-chatbot')     !== 'false',
    leaderboard: localStorage.getItem('ep-feat-leaderboard') !== 'false',
    energyTips:  localStorage.getItem('ep-feat-energyTips')  !== 'false',
    community:   localStorage.getItem('ep-feat-community')   !== 'false',
    streak:      localStorage.getItem('ep-feat-streak')      !== 'false',
  })
  watch(features, v => {
    Object.entries(v).forEach(([k, val]) => localStorage.setItem(`ep-feat-${k}`, String(val)))
  }, { deep: true })

  // ── Notifications ────────────────────────────────────────────────────────────
  const notif = ref({
    emailMaster:     localStorage.getItem('ep-notif-email-master')    !== 'false',
    emailAlerts:     true, // always required
    weeklyDigest:    localStorage.getItem('ep-notif-weekly')          !== 'false',
    monthlyReport:   localStorage.getItem('ep-notif-monthly')         !== 'false',
    communityEmail:  localStorage.getItem('ep-notif-community-email') === 'true',
    productUpdates:  localStorage.getItem('ep-notif-product')         !== 'false',
    marketingEmail:  localStorage.getItem('ep-notif-marketing')       === 'true',
    push:            localStorage.getItem('ep-notif-push')            !== 'false',
    priceAlerts:     localStorage.getItem('ep-notif-price')           !== 'false',
    maintenanceTips: localStorage.getItem('ep-notif-tips')            === 'true',
  })
  watch(notif, v => {
    const map = {
      emailMaster: 'email-master', weeklyDigest: 'weekly', monthlyReport: 'monthly',
      communityEmail: 'community-email', productUpdates: 'product',
      marketingEmail: 'marketing', push: 'push', priceAlerts: 'price', maintenanceTips: 'tips',
    }
    Object.entries(map).forEach(([k, lk]) => localStorage.setItem(`ep-notif-${lk}`, String(v[k])))
  }, { deep: true })

  // ── Privacy ──────────────────────────────────────────────────────────────────
  const privacy = ref({
    shareMetrics: localStorage.getItem('ep-priv-metrics')   !== 'false',
    publicLeader: localStorage.getItem('ep-priv-leader')    !== 'false',
    analytics:    localStorage.getItem('ep-priv-analytics') === 'true',
    dataDeletion: false, // request state (not persisted)
  })
  watch(privacy, v => {
    localStorage.setItem('ep-priv-metrics',   String(v.shareMetrics))
    localStorage.setItem('ep-priv-leader',    String(v.publicLeader))
    localStorage.setItem('ep-priv-analytics', String(v.analytics))
  }, { deep: true })

  // ── Energy ────────────────────────────────────────────────────────────────────
  const energy = ref({
    autoOffset: localStorage.getItem('ep-en-offset')    !== 'false',
    community:  localStorage.getItem('ep-en-community') === 'true',
    smart:      localStorage.getItem('ep-en-smart')     !== 'false',
    ev:         localStorage.getItem('ep-en-ev')        === 'true',
  })
  const peakStart = ref(localStorage.getItem('ep-peak-start') || '22:00')
  const peakEnd   = ref(localStorage.getItem('ep-peak-end')   || '06:00')
  watch(energy, v => {
    localStorage.setItem('ep-en-offset',    String(v.autoOffset))
    localStorage.setItem('ep-en-community', String(v.community))
    localStorage.setItem('ep-en-smart',     String(v.smart))
    localStorage.setItem('ep-en-ev',        String(v.ev))
  }, { deep: true })
  watch(peakStart, v => localStorage.setItem('ep-peak-start', v))
  watch(peakEnd,   v => localStorage.setItem('ep-peak-end', v))

  // ── Security ──────────────────────────────────────────────────────────────────
  const twoFactor    = ref(localStorage.getItem('ep-2fa') === 'true')   // OFF by default — user must  enable, WAITING FOR LOGIN TO CONFIGURE IF TIME
  const twoFactorSetup = ref(false) 
  watch(twoFactor, v => localStorage.setItem('ep-2fa', String(v)))

  // ─── Computed ──────────────────────────────────────────────────────────────
  const isDark = computed(() => {
    if (themeMode.value === 'system') return window.matchMedia('(prefers-color-scheme: dark)').matches
    return themeMode.value === 'dark'
  })

   const t = computed(() => {
    const base = TRANSLATIONS.en
    const lang = TRANSLATIONS[language.value] || {}
    return { ...base, ...lang }
  })

  // ─── Master apply — writes all CSS vars to <html> ─────────────────────────
  function applyAll() {
    const html = document.documentElement
    const dark = isDark.value
    darkMode.value = dark

    html.classList.toggle('dark', dark)

    const surfaces = dark ? DARK_SURFACES : LIGHT_SURFACES
    for (const [k, v] of Object.entries(surfaces)) html.style.setProperty(k, v)

    const palette = ACCENT_PALETTES[accentKey.value] || ACCENT_PALETTES.ocean
    for (const [k, v] of Object.entries(palette)) {
      if (k.startsWith('--')) html.style.setProperty(k, v)
    }

    if (highContrast.value) {
      const hc = dark ? HC_DARK : HC_LIGHT
      for (const [k, v] of Object.entries(hc)) html.style.setProperty(k, v)
    }

    html.classList.toggle('high-contrast', highContrast.value)
    html.style.fontSize = fontSize.value + 'px'
    html.classList.toggle('reduce-motion', reduceMotion.value)
    html.classList.toggle('compact', compactMode.value)

    const RTL = ['ar', 'he', 'fa', 'ur']
    html.setAttribute('dir', RTL.includes(language.value) ? 'rtl' : 'ltr')
    html.setAttribute('lang', language.value)
  }

  // ─── Setters ──────────────────────────────────────────────────────────────
  function setAccent(k)      { accentKey.value = k;   localStorage.setItem('ep-accent', k);       applyAll() }
  function setThemeMode(m)   { themeMode.value = m;   localStorage.setItem('ep-theme-mode', m);   applyAll() }
  function toggleTheme()     { setThemeMode(isDark.value ? 'light' : 'dark') }
  function setDarkMode(v)    { setThemeMode(v ? 'dark' : 'light') }
  function setFontSize(v)    { fontSize.value = v;    localStorage.setItem('ep-font-size', v);     applyAll() }
  function setHighContrast(v){ highContrast.value = v; localStorage.setItem('ep-hc', String(v));  applyAll() }
  function setReduceMotion(v){ reduceMotion.value = v; localStorage.setItem('ep-motion', String(v)); applyAll() }
  function setCompactMode(v) { compactMode.value = v;  localStorage.setItem('ep-compact', String(v)); applyAll() }
  function setLanguage(v) {
    language.value = v
    localStorage.setItem('ep-lang', v)
    applyAll()
   
  }
  function setTimezone(v)    { timezone.value = v;    localStorage.setItem('ep-timezone', v) }
  function setCurrency(v)    { currency.value = v;    localStorage.setItem('ep-currency', v) }
  function setUnitSystem(v)  { unitSystem.value = v;  localStorage.setItem('ep-unit-system', v) }
  function setEnergyUnit(v)  { energyUnit.value = v;  localStorage.setItem('ep-unit', v) }
  function toggleSidebar()   { sidebarOpen.value = !sidebarOpen.value }

  // OS system theme listener
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themeMode.value === 'system') applyAll()
  })

  applyAll()

  return {
    accentKey, themeMode, fontSize, highContrast, reduceMotion, compactMode,
    darkMode, isDark, language, timezone, currency, unitSystem, energyUnit,
    sidebarOpen, mobileSidebarOpen, profile, features, notif, privacy,
    energy, peakStart, peakEnd, twoFactor, twoFactorSetup,
    t, avatarUrl, accentPalettes: ACCENT_PALETTES,
    applyAll, saveProfile, setAvatar,
    setAccent, setThemeMode, setDarkMode, toggleTheme,
    setFontSize, setHighContrast, setReduceMotion, setCompactMode,
    setLanguage, setTimezone, setCurrency, setUnitSystem, setEnergyUnit,
    toggleSidebar,
  }
})

export const useThemeStore = useUserPrefsStore
