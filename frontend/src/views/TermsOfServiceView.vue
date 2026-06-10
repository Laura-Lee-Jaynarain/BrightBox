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
        <h1 class="text-4xl font-extrabold text-slate-900 mt-2 mb-3">Terms of Service</h1>
        <p class="text-slate-400 text-sm">Last updated: 1 January 2025</p>
      </div>

      <p class="text-slate-600 leading-relaxed mb-10">
        These Terms of Service ("Terms") govern your access to and use of BrightBlock ("we", "us", "our"). By creating an account or using the platform you agree to be bound by these Terms. If you do not agree, do not use BrightBlock.
      </p>

      <div class="space-y-10">

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">1. Eligibility</h2>
          <p class="text-slate-600 leading-relaxed">
            You must be at least 18 years old to use BrightBlock. By registering, you confirm that the information you provide is accurate and that you have the legal capacity to enter into these Terms.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">2. Your account</h2>
          <p class="text-slate-600 leading-relaxed">
            You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify us immediately at
            <a href="mailto:support@brightblock.app" class="text-blue-600 hover:underline">support@brightblock.app</a>
            if you suspect unauthorised access. We reserve the right to suspend or terminate accounts that violate these Terms.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">3. Acceptable use</h2>
          <p class="text-slate-600 leading-relaxed mb-3">You agree not to:</p>
          <ul class="space-y-2 text-slate-600 leading-relaxed list-disc list-inside">
            <li>Use the platform for any unlawful purpose.</li>
            <li>Attempt to gain unauthorised access to other users' data or our systems.</li>
            <li>Scrape, reverse-engineer, or resell any part of the platform without written permission.</li>
            <li>Submit false or misleading energy data that distorts community statistics.</li>
            <li>Interfere with the platform's availability or performance.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">4. Energy data &amp; accuracy</h2>
          <p class="text-slate-600 leading-relaxed">
            BrightBlock provides energy insights for informational purposes only. Savings estimates, CO₂ calculations, and Peak Load Alerts are based on available data and reasonable assumptions — they are not a substitute for professional energy audits or utility advice. We do not guarantee specific financial savings.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">5. Intellectual property</h2>
          <p class="text-slate-600 leading-relaxed">
            All content, trademarks, software, and designs on BrightBlock are owned by us or our licensors. You may not copy, distribute, or create derivative works without our express written consent. Your energy data remains yours — we claim no ownership over it.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">6. Third-party integrations</h2>
          <p class="text-slate-600 leading-relaxed">
            BrightBlock may integrate with third-party services (e.g. smart meter providers, utility APIs). We are not responsible for the availability, accuracy, or practices of those services. Your use of third-party integrations is subject to their own terms.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">7. Disclaimers &amp; limitation of liability</h2>
          <p class="text-slate-600 leading-relaxed">
            BrightBlock is provided "as is" without warranties of any kind. To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of the platform, including loss of data or financial loss based on platform recommendations.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">8. Termination</h2>
          <p class="text-slate-600 leading-relaxed">
            You may delete your account at any time via Profile → Settings. We may suspend or terminate your access if you breach these Terms, with or without notice. Upon termination, your right to use the platform ceases immediately.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">9. Changes to these Terms</h2>
          <p class="text-slate-600 leading-relaxed">
            We may revise these Terms from time to time. Material changes will be communicated by email or in-app notification at least 14 days before they take effect. Continued use after that date constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">10. Governing law</h2>
          <p class="text-slate-600 leading-relaxed">
            These Terms are governed by the laws of the jurisdiction in which BrightBlock is incorporated. Any disputes shall be resolved in the courts of that jurisdiction, unless local consumer law provides otherwise.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-bold text-slate-900 mb-3">11. Contact</h2>
          <p class="text-slate-600 leading-relaxed">
            Questions about these Terms? Contact us at
            <a href="mailto:legal@brightblock.app" class="text-blue-600 hover:underline">legal@brightblock.app</a>.
          </p>
        </section>

      </div>

      
      <div class="mt-16 pt-8 border-t border-slate-200 flex gap-6 text-sm text-slate-400">
        <router-link to="/privacy" class="hover:text-blue-600 transition-colors">Privacy Policy →</router-link>
      </div>

      </div>
    </main>
  </div>
</template>

<script setup>
// Static page — no logic needed
</script>