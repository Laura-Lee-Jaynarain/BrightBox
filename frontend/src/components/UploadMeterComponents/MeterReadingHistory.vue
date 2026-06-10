<script setup>
    import MeterReadingHistoryItem from '@/components/UploadMeterComponents/MeterReadingHistoryItem.vue'
    import {ref} from 'vue'

    const props = defineProps(["filters", "history"])
    const data = ref([])
    data.value = props.history.map(item => {
        item.time = new Date(item.time)
        return item
    })

    const page = ref(1)

    const filteredData = ref([])
    var filterData = function() {
        if (props.filters) {
            page.value = 1
            skip.value = 0
            take.value = Number(document.getElementById("amount").value)
            let startdate = new Date(document.getElementById("startdate").value)
            let enddate = new Date(document.getElementById("enddate").value)
            enddate.setDate(enddate.getDate()+1)
            let status = document.getElementById("status").value
            if (startdate <= enddate) {
                filteredData.value = data.value.filter((item) => item.time >= startdate && item.time <= enddate)
                if (status != 9) {
                    filteredData.value = filteredData.value.filter((item) => item.status === Number(status))
                }
            }
        } else {
            filteredData.value = data.value
        }
        changeIndices()
    }
    filteredData.value = data.value 

    var fade = function(filters, index) {
        if (filters === false && index === 2) {
            return true;
        }
        else {
            return false;
        }
    }
    const skip = ref(0)
    const take = ref(10)
    if (props.filters === false) {
        skip.value = 0
        take.value = 3
    }

    const indices = ref([])

    var changeIndices = function() {
        let n = Math.min(take.value, filteredData.value.length - (page.value-1)*take.value)
        indices.value = [...Array(n).keys()]
        indices.value = indices.value.map(item => item + skip.value)
    }
    changeIndices()

    var nextPage = function() {
        page.value += 1
        skip.value = skip.value + take.value
        changeIndices()
    }
    var prevPage = function() {
        page.value -= 1
        skip.value = skip.value - take.value
        changeIndices()
    }

</script>

<template>
    <div v-if="filters" class="filters">
        <div class="flex items-center gap-3 mb-6">
            <span class="material-symbols-outlined text-primary">calendar_month</span>
            <h3 class="font-headline font-bold text-lg">Meter reading history</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 row">
            <label for="startdate" class="center block text-[12px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                Start date:
            </label>
            <input type="date"
                id="startdate"
                min="2020-01-01"
                value="2020-01-01"
                @change="filterData"
                class="w-full h-12 form-input border border-outline-variant rounded px-4 focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold text-sm"
            />
            <label for="enddate" class="center block text-[12px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                End date:
            </label>
            <input type="date"
                id="enddate"
                min="2020-01-01"
                value="2030-01-01"
                @change="filterData"
                class="w-full h-12 form-input border border-outline-variant rounded px-4 focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold text-sm"
            />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 row">
            <label for="status" class="center block text-[12px] font-black uppercase tracking-widest text-on-surface-variant ml-1">
                Status: 
            </label>
            <select 
                id="status"
                @change="filterData"
                class="w-full h-12 form-input border border-outline-variant rounded px-4 focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold text-sm"
            >
                <option selected="selected" value="9">All</option>
                <option value=1>Verified</option>
                <option value=0>Pending</option>
                <option value=-1>Unapproved</option>
            </select>
            <label for="amount" class="center block text-[12px] font-black uppercase tracking-widest text-on-surface-variant ml-1"> 
                Max per page 
            </label>
            <select 
                id="amount"
                @change="filterData"
                class="w-full h-12 form-input border border-outline-variant rounded px-4 focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold text-sm"
            >
                <option selected="selected">10</option>
                <option>25</option>
                <option>50</option>
            </select>
        </div>
    </div>
    <div v-bind:class = "(filters === true)?'card list border':''"> 
        <MeterReadingHistoryItem
                v-for="index in indices"
                :value="filteredData[index].value"
                :status="filteredData[index].status"
                :date="filteredData[index].time"
                :fade="fade(filters, index)"
                />
    </div>
    <div v-if="filters" class="flex" >
        <div class="hcenter">
            <button v-if="page>1" class="w-4" @click="prevPage">
                <
            </button>
            <button v-else class="w-4" disabled>
                <
            </button>
            <span class="pagenumber">
                {{ page }}
            </span>
            <button v-if="filteredData.length > page*take" class="w-4" @click="nextPage">
                >
            </button>
            <button v-else disabled class="w-4">
                >
            </button>
        </div>
    </div>
</template>

<style scoped>
    .center {
        margin: auto 0 auto 4pt;
    }

    .row {
        margin: 4pt 0;
    }

    .filters {
        margin-bottom: 12pt
    }

    .list {
        padding: 4pt
    }
    .hcenter {
        margin: 5pt auto;
    }
    .pagenumber {
        margin: 0 10pt;
    }
</style>