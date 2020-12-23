<template>
    <div class="card-profile-image">
        <input @change="showImage" ref="avatar" type="file" hidden />
        <a href="#" @click="uploadImage">
            <img
                :src="image"
                class="rounded-circle profile-image"
                v-on:error="(e) => {
                    e.target.src='https://thesocietypages.org/socimages/files/2009/05/nopic_192.gif'
                }"
            />
        </a>

        <UploadImageModal 
            :showModal="showModal"
            :uploadedImage="uploadedImage"
            v-on:close="showModal = false"
            />
    </div>
</template>

<script>

import UploadImageModal from '~/Framework/Components/Modals/UploadImageModal';

export default {
    name: 'ProfileImage',

    data() {
        return  {
            showModal: false,
            uploadedImage: null
        }
    },

    components: {
        UploadImageModal
    },

    methods: {
        showImage(input) {
            input = input.target;

            if (input.files && input.files[0]) {
                let reader = new FileReader();
                
                reader.onload = (e) => {
                    this.uploadedImage = e.target.result;
                    this.showModal = true;
                }

                reader.readAsDataURL(input.files[0]);
            }
        },

        uploadImage() {
            const file = this.$refs.avatar;
            file.click();
        },
    },

    props: {
        image: {
            required:true
        }
    }
};
</script>