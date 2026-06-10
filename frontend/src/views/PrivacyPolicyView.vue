<template>
  <div class="min-h-screen bg-slate-100 text-slate-800 font-['Inter'] antialiased">

    
    <header class="border-b border-slate-200 bg-slate-100">
      <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2">
          <span class="material-symbols-outlined text-blue-600 text-2xl">bolt</span>
          <span class="text-xl font-bold text-blue-700">BrightBlock</span>
        </router-link>
        <router-link
          to="/"
          class="text-sm text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          <span class="material-symbols-outlined text-base leading-none">arrow_back</span>
          Back to home
        </router-link>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-6 py-16">
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 px-16 py-12">

      
      <div class="mb-12">
        <span class="text-xs font-semibold uppercase tracking-widest text-blue-600">Legal</span>
        <h1 class="text-4xl font-extrabold text-slate-900 mt-2 mb-3">Privacy Policy</h1>
        <p class="text-slate-400 text-sm">Last updated: 1 January 2025</p>
      </div>

      <p class="text-slate-600 leading-relaxed mb-10">
        BrightBlock ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains what data we collect, why we collect it, how we use it, and the choices you have. By using BrightBlock, you agree to the practices described here.
      </p>

      <div class="space-y-10">

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">1. What we collect</h2>
          <ul class="space-y-2 text-slate-600 leading-relaxed list-disc list-inside">
            <li><strong class="text-slate-800">Account information</strong> — your name, email address, and password when you register.</li>
            <li><strong class="text-slate-800">Energy data</strong> — consumption readings from your smart meter or manual entries you submit.</li>
            <li><strong class="text-slate-800">Usage data</strong> — how you interact with the app (pages visited, features used, session duration).</li>
            <li><strong class="text-slate-800">Device data</strong> — browser type, operating system, and IP address for security and analytics.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">2. Why we collect it</h2>
          <ul class="space-y-2 text-slate-600 leading-relaxed list-disc list-inside">
            <li>To provide and improve your personalised energy insights.</li>
            <li>To calculate anonymised community-level impact statistics.</li>
            <li>To send you Peak Load Alerts and account notifications.</li>
            <li>To ensure platform security and prevent abuse.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">3. How we share your data</h2>
          <p class="text-slate-600 leading-relaxed">
            We do not sell or rent your personal data. We may share data with trusted service providers (e.g. cloud hosting, analytics) strictly to operate the platform, and only under data processing agreements that bind them to confidentiality. Aggregate, anonymised statistics may be shared publicly or with research partners — these cannot be traced back to you.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">4. Data retention</h2>
          <p class="text-slate-600 leading-relaxed">
            We retain your account data for as long as your account is active. If you delete your account, personal data is purged within 30 days. Anonymised aggregate data may be retained indefinitely for research purposes.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">5. Your rights</h2>
          <p class="text-slate-600 leading-relaxed mb-3">Depending on your jurisdiction, you may have the right to:</p>
          <ul class="space-y-2 text-slate-600 leading-relaxed list-disc list-inside">
            <li>Access the personal data we hold about you.</li>
            <li>Correct inaccurate data.</li>
            <li>Request deletion of your data.</li>
            <li>Object to or restrict processing.</li>
            <li>Port your data to another service.</li>
          </ul>
          <p class="text-slate-600 leading-relaxed mt-3">
            To exercise any of these rights, contact us at
            <a href="mailto:privacy@brightblock.app" class="text-blue-600 hover:underline">privacy@brightblock.app</a>.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">6. Cookies</h2>
          <p class="text-slate-600 leading-relaxed">
            We use strictly necessary cookies to keep you signed in and maintain your preferences. We do not use advertising or third-party tracking cookies.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">7. Security</h2>
          <p class="text-slate-600 leading-relaxed">
            All data is encrypted in transit (TLS 1.3) and at rest. Access to production data is restricted to authorised personnel only and is subject to audit logging.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">8. Changes to this policy</h2>
          <p class="text-slate-600 leading-relaxed">
            We may update this policy from time to time. If changes are material, we'll notify you by email or in-app banner at least 14 days before they take effect. Continuing to use BrightBlock after that date constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">9. Contact</h2>
          <p class="text-slate-600 leading-relaxed">
            Questions about this policy? Reach us at
            <a href="mailto:privacy@brightblock.app" class="text-blue-600 hover:underline">privacy@brightblock.app</a>.
          </p>
        </section>

      </div>

      
      <div class="mt-16 pt-8 border-t border-slate-200 flex gap-6 text-sm text-slate-400">
        <router-link to="/terms" class="hover:text-blue-600 transition-colors">Terms of Service →</router-link>
      </div>

      </div>
    </main>
  </div>
</template>

<script setup>
// Static page — no logic needed
</script>