<script setup>
    import {ref} from 'vue'
    import axios from 'axios'
    import { useAuthStore } from '@/stores/authStore'
    const auth = useAuthStore()

    const image = ref("")
    let file;

    function fileUpload(event) {
        image.value = ""
        try {
            let files = event.target.files
            console.log(files)
            if (files.length === 1) {
                image.value = URL.createObjectURL(files[0]);
                file = document.getElementById("File").files[0]
                console.log(file)
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    const userID = auth.userId
    const postURL = 'https://localhost:7126/api/MeterReading'

    
    async function postMeasurement(event) {
        /*event.preventDefault();
        event.stopPropagation();*/
        let postData = {
                "userId" : userID,
                "value" : document.getElementById("value").value,
                "File" : document.getElementById("File").files[0]
            }
        await axios({
            method: "post",
            url: postURL,
            data : postData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        window.location.reload()
    }

</script>

<template>
    <div class="flex items-center gap-3 mb-6">
        <span class="material-symbols-outlined text-primary">edit_note</span>
        <h3 class="font-headline font-bold text-lg">Submit a meter reading</h3>
    </div>
    <form class="grid grid-cols-1 md:grid-cols-2 gap-6" method="post">
        <input type="hidden" :value=userID id="UserId">
        <label for="value" class="center block text-[12px] font-black uppercase tracking-widest text-on-surface-variant ml-1">Reading Value (kWh)</label>
        <input 
            id="value" 
            class="w-full h-12 form-input border border-outline-variant rounded px-4 focus:ring-1 focus:ring-primary focus:border-primary transition-all font-semibold text-sm" placeholder="00000.00" type="number"
            required
            />
        <div class="md:col-span-2">
            <!-- Dropzone -->
            <label class="relative group cursor-pointer">
                <div class="w-full aspect-[4/3] rounded border-2 border-dashed border-outline-variant bg-surface-container/30 flex flex-col items-center justify-center p-12 transition-all hover:border-primary/50 hover:bg-surface-container">
                    <input  
                        type="file" 
                        id="File" 
                        accept="image/png, image/jpeg"
                        @change="fileUpload"
                        required
                        />
                    <div v-if="image.length > 0" class="dropper-image">
                        <img :src="image" class="px-2"/>
                    </div>
                    <div v-else class="w-16 h-16 rounded bg-primary-container flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <span class="material-symbols-outlined text-on-primary-container text-3xl">add_a_photo</span>
                    </div>
                    <span v-if="image.length > 0" class="text-base font-bold text-on-surface mb-1">or choose another photo</span>
                    <span v-else class="text-base font-bold text-on-surface mb-1">Take Photo or Browse</span>
                    <p class="text-xs text-on-surface-variant text-center max-w-xs">Supported: JPG, PNG. Max: 5MB.</p>
                </div>
            </label>
        </div>
        <div class="flex gap-4 p-4 rounded bg-surface-container/50">
            <span class="material-symbols-outlined text-primary shrink-0">visibility</span>
            <div>
                <h4 class="font-bold text-xs mb-1 uppercase tracking-wider">Clearly Visible</h4>
                <p class="text-[11px] text-on-surface-variant leading-relaxed">Ensure all digits and decimals are within the frame and sharp.</p>
            </div>
        </div>
        <div class="flex gap-4 p-4 rounded bg-surface-container/50">
            <span class="material-symbols-outlined text-primary shrink-0">light_mode</span>
            <div>
                <h4 class="font-bold text-xs mb-1 uppercase tracking-wider">Avoid Glare</h4>
                <p class="text-[11px] text-on-surface-variant leading-relaxed">Turn off your flash if there's enough natural light to avoid reflections.</p>
            </div>
        </div>
        <div class="md:col-span-2">
            <button id="submit" 
                    type="button" 

                    @click="postMeasurement"
                    class="solar-glow w-full py-4 rounded text-white font-bold text-base shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2" >
                Submit Reading
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
        </div>
    </form>
</template>

<style scoped>
    input[type="file"] {
        display : none;
    }

    .center {
        margin: auto 0 auto 4pt
    }

    .dropper-image {
        max-width : 80%;
        max-height: 80%;
        margin: auto
    }

    form:invalid [type="submit"] {
        pointer-events: none;
        background: #c0c0c0;
    }
</style>