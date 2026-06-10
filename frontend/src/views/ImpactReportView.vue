<template>
  <div id="impact-report" class="p-6 md:p-10 space-y-10 bg-slate-100 min-h-screen">

    <!-- HERO SECTION -->
    <section
      class="rounded-[32px] p-8 md:p-12 bg-emerald-700 text-white shadow-2xl overflow-hidden relative"
    >

      <!-- Glow -->
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-3xl rounded-full"></div>

      <div class="relative z-10 flex flex-col lg:flex-row justify-between gap-10 items-center">

        <!-- LEFT -->
        <div class="max-w-3xl">

          <p class="uppercase tracking-[0.35em] text-sm text-emerald-100 font-semibold mb-4">
            Monthly Sustainability Report
          </p>

          <button
            @click="downloadReport"
            class="mb-8 bg-white text-emerald-700 px-6 py-3 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all duration-300"
          >
            ⬇ Download PDF Report
          </button>

          <h1 class="text-5xl md:text-6xl font-black leading-tight mb-6">
            Excellent Energy <br />
            Performance 🌱
          </h1>

          <p class="text-lg md:text-xl text-emerald-50 leading-relaxed max-w-2xl">
            Your household is performing better than most homes in your
            community through strong renewable energy usage and optimized
            energy consumption habits.
          </p>

          <!-- QUICK STATS -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">

            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <p class="text-sm text-emerald-100">
                Renewable Usage
              </p>

              <h3 class="text-3xl font-black mt-2">
                72.3%
              </h3>
            </div>

            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <p class="text-sm text-emerald-100">
                CO₂ Prevented
              </p>

              <h3 class="text-3xl font-black mt-2">
                1.4t
              </h3>
            </div>

            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <p class="text-sm text-emerald-100">
                Community Rank
              </p>

              <h3 class="text-3xl font-black mt-2">
                #42
              </h3>
            </div>

          </div>
        </div>

        <!-- RIGHT CARD -->
        <div
          class="w-full lg:w-[340px] bg-white text-slate-800 rounded-[28px] p-8 shadow-2xl"
        >

          <div class="flex items-center justify-between mb-6">

            <div>
              <p class="text-sm uppercase tracking-wider text-slate-500 font-bold">
                Sustainability Grade
              </p>

              <h2 class="text-7xl font-black text-emerald-600 mt-2">
                A+
              </h2>
            </div>

            <div class="text-6xl">
              🌱
            </div>

          </div>

          <div class="space-y-4">

            <div class="bg-emerald-50 rounded-xl p-4 flex justify-between items-center">
              <span class="font-medium">⚡ Efficiency</span>
              <span class="font-black text-emerald-700">Excellent</span>
            </div>

            <div class="bg-blue-50 rounded-xl p-4 flex justify-between items-center">
              <span class="font-medium">🌍 Carbon Impact</span>
              <span class="font-black text-blue-700">Low</span>
            </div>

            <div class="bg-yellow-50 rounded-xl p-4 flex justify-between items-center">
              <span class="font-medium">☀ Renewable Usage</span>
              <span class="font-black text-yellow-600">High</span>
            </div>

          </div>

          <!-- SCORE -->
          <div class="mt-8">

            <div class="flex justify-between mb-2 text-sm font-medium">
              <span>Eco Score</span>
              <span>90/100</span>
            </div>

            <div class="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div class="h-full w-[90%] bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- METRICS -->
    <section class="grid grid-cols-1 md:grid-cols-4 gap-6">

      <div class="bg-white rounded-3xl shadow-xl p-6">
        <div class="text-5xl mb-4">⚡</div>

        <p class="text-sm text-slate-500 mb-2">
          Renewable Usage
        </p>

        <h2 class="text-4xl font-black text-green-600">
          72.3%
        </h2>

        <p class="text-sm text-slate-500 mt-3">
          Renewable energy contribution this month.
        </p>
      </div>

      <div class="bg-white rounded-3xl shadow-xl p-6">
        <div class="text-5xl mb-4">🌳</div>

        <p class="text-sm text-slate-500 mb-2">
          Trees Equivalent
        </p>

        <h2 class="text-4xl font-black text-emerald-600">
          64
        </h2>

        <p class="text-sm text-slate-500 mt-3">
          Environmental savings equivalent.
        </p>
      </div>

      <div class="bg-white rounded-3xl shadow-xl p-6">
        <div class="text-5xl mb-4">🌍</div>

        <p class="text-sm text-slate-500 mb-2">
          CO₂ Prevented
        </p>

        <h2 class="text-4xl font-black text-blue-600">
          1.4t
        </h2>

        <p class="text-sm text-slate-500 mt-3">
          Carbon emissions reduced this month.
        </p>
      </div>

      <div class="bg-white rounded-3xl shadow-xl p-6">
        <div class="text-5xl mb-4">🏆</div>

        <p class="text-sm text-slate-500 mb-2">
          Community Rank
        </p>

        <h2 class="text-4xl font-black text-yellow-500">
          #42
        </h2>

        <p class="text-sm text-slate-500 mt-3">
          Ranking among local households.
        </p>
      </div>

    </section>

    <!-- ENERGY INSIGHTS -->
    <section class="bg-white rounded-3xl shadow-xl p-8">

      <div class="flex items-center gap-3 mb-8">

        <div class="text-5xl">
          📊
        </div>

        <div>
          <h2 class="text-3xl font-black text-slate-800">
            Energy Insights
          </h2>

          <p class="text-slate-500">
            Personalized usage analysis and trends.
          </p>
        </div>

      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div class="bg-slate-50 rounded-2xl p-6">
          <p class="text-sm text-slate-500 mb-2">
            Highest Usage Day
          </p>

          <h3 class="text-3xl font-black mb-2">
            Wednesday
          </h3>

          <p class="text-slate-600">
            Peak consumption occurred during evening hours.
          </p>
        </div>

        <div class="bg-slate-50 rounded-2xl p-6">
          <p class="text-sm text-slate-500 mb-2">
            Most Efficient Day
          </p>

          <h3 class="text-3xl font-black mb-2">
            Sunday
          </h3>

          <p class="text-slate-600">
            Lowest non-renewable usage recorded.
          </p>
        </div>

        <div class="bg-slate-50 rounded-2xl p-6">
          <p class="text-sm text-slate-500 mb-2">
            Projected Savings
          </p>

          <h3 class="text-3xl font-black mb-2">
            $342
          </h3>

          <p class="text-slate-600">
            Estimated monthly savings through optimized usage.
          </p>
        </div>

      </div>

    </section>

    <!-- ACHIEVEMENTS -->
    <section class="bg-white rounded-3xl shadow-xl p-8">

      <div class="flex items-center gap-3 mb-8">

        <div class="text-5xl">
          🎖️
        </div>

        <div>
          <h2 class="text-3xl font-black text-slate-800">
            Sustainability Achievements
          </h2>

          <p class="text-slate-500">
            Rewards earned through efficient energy consumption.
          </p>
        </div>

      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div class="bg-yellow-100 rounded-2xl p-6 shadow">
          <div class="text-5xl mb-4">☀️</div>

          <h3 class="text-xl font-bold mb-2">
            Solar Champion
          </h3>

          <p class="text-slate-700 text-sm">
            Maintained strong renewable energy usage.
          </p>
        </div>

        <div class="bg-green-100 rounded-2xl p-6 shadow">
          <div class="text-5xl mb-4">🌱</div>

          <h3 class="text-xl font-bold mb-2">
            Eco Saver
          </h3>

          <p class="text-slate-700 text-sm">
            Reduced non-renewable consumption.
          </p>
        </div>

        <div class="bg-blue-100 rounded-2xl p-6 shadow">
          <div class="text-5xl mb-4">⚡</div>

          <h3 class="text-xl font-bold mb-2">
            Grid Optimizer
          </h3>

          <p class="text-slate-700 text-sm">
            Improved off-peak energy efficiency.
          </p>
        </div>

        <div class="bg-purple-100 rounded-2xl p-6 shadow">
          <div class="text-5xl mb-4">🏆</div>

          <h3 class="text-xl font-bold mb-2">
            Community Leader
          </h3>

          <p class="text-slate-700 text-sm">
            Ranked among top sustainable households.
          </p>
        </div>

      </div>

    </section>

  </div>
</template>

<script setup>
import html2pdf from 'html2pdf.js'

const downloadReport = () => {
  const element = document.getElementById('impact-report')

  const options = {
    margin: 0.5,
    filename: 'Sustainability-Impact-Report.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: 'in',
      format: 'a4',
      orientation: 'portrait'
    }
  }

  html2pdf().set(options).from(element).save()
}
</script>