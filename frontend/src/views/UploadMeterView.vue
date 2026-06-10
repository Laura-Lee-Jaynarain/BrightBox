<script setup>
    import MeterReadingHistory from '@/components/UploadMeterComponents/MeterReadingHistory.vue'
    import UploadMeterForm from '@/components/UploadMeterComponents/UploadMeterForm.vue'
    import {ref} from 'vue'
    import axios from 'axios'

    const target = ref(0)
    const progress = ref(3)

    const showFullHistory = ref(false)

    const history = ref([])

    const userID = sessionStorage.getItem('userId')

    async function fetchData() {
        try {
            await axios({
                method: "get",
                url: 'https://localhost:7126/api/MeterReading/'+userID
            })
            .then(function (response) {
                target.value = response.data.target
                progress.value = response.data.progress
                history.value = response.data.recentSubmissions
                console.log(history.value)
            })
            .catch(function (error) {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        } 
    }

    fetchData().then(() => console.log("data fetched"))


    
</script>

<template>
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" v-if="target > 0">
        <!-- Left Column: Upload Interaction -->
        <section class="lg:col-span-7 space-y-6">
            <div class="card rounded border border-outline-variant p-8">
                <UploadMeterForm v-if="showFullHistory===false"/>
                <MeterReadingHistory v-else :filters="true" :history="history"/>
            </div>
        </section>
        <!-- Right Column: History & Stats -->
        <section class="lg:col-span-5 space-y-6">
        <!-- Summary Card -->
        <div class="bg-primary-container/30 rounded border border-primary/10 p-8 relative overflow-hidden">
            <h3 class="font-headline font-bold text-lg mb-4 text-on-primary-container">Submission Progress</h3>
            <div class="space-y-4">
                <div class="flex justify-between items-end">
                    <span class="text-xs font-semibold text-on-primary-container/70">Week Target: {{ target }} Readings</span>
                    <span class="text-2xl font-black text-primary">{{ progress }}/{{ target }}</span>
                </div>
                <div class="w-full h-2 bg-white/50 rounded overflow-hidden">
                    <div class="h-full solaris-glow rounded" style="width: 75%"></div>
                </div>
                <p v-if="target - progress > 0" class="text-[11px] text-on-primary-container/80 italic">{{ target - progress }} more reading needed to verify your community green badge.</p>
                <p v-else class="text-[11px] text-on-primary-container/80 italic">Congrats! Your community green badge has been verified!</p>
            </div>
        </div>
        <!-- Recent Uploads Section -->
        <div class="space-y-4" v-if="showFullHistory===false">
            <div class="flex justify-between items-center px-1">
                <h3 class="font-headline font-bold text-base">Recent History</h3>
                <button class="text-primary font-bold text-xs hover:underline uppercase tracking-wider"
                    @click="showFullHistory=true"
                >View All</button>
            </div>
            <!-- History List -->
            <div class="space-y-2">
                <MeterReadingHistory :filters="false" :history="history"/>
            </div>
        </div>
        <!-- Educational Tip Card -->
        <div class="card border-l-4 border-primary rounded p-5 shadow-sm">
            <div class="flex items-start gap-4">
                <span class="material-symbols-outlined text-primary text-2xl">lightbulb</span>
                <div>
                    <h4 class="font-bold text-xs mb-1 uppercase tracking-wider text-on-surface">Coming soon: automatic verification</h4>
                    <p class="text-[11px] text-on-surface-variant leading-relaxed">No more waiting on meter reading verification! A state-of-the-art image recognition algorithm will verify your uploads immediately.</p>
                </div>
            </div>
        </div>
        <div v-if="showFullHistory===true" class="flex justify-between items-center px-1">
                <button class="text-primary font-bold text-xs hover:underline uppercase tracking-wider"
                    @click="showFullHistory=false"
                >Return to submission page</button>
            </div>
        </section>
    </div>
    <div v-else> loading </div>
</template>

<style scoped>

</style>