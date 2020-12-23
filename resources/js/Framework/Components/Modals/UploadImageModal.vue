<template>
    <Modal
        :show="showModal"
        v-on:close="closeModal"
    >
        <template slot="header">
            Upload Image
        </template>
        
        <p>
            <img class="img-fluid" :src="uploadedImage" >
        </p>
        <template slot="footer">
            <Button type="primary"  @click="submitImage">Submit</Button>
            <Button type="link"  @click="closeModal">Close</Button>
        </template>
    </Modal>
</template>

<script>


import Modal from "~/Framework/Plugins/Argon/Components/Modal";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Card from "~/Framework/Plugins/Argon/Components/Card";

import ProfileService from '~/Application/Services/Profile';
import AvatarRequest from '~/Application/Services/Profile/Requests/AvatarRequest';

export default {
    name: 'UploadImageModal',

    components: {
        Modal,
        Button,
        Card 
    },

    methods: {
        submitImage() {
            const request = new AvatarRequest({avatar: this.uploadedImage});

            ProfileService.updateAvatar(request).then(d => {
                this.$store.dispatch('profile/setAvatar', this.uploadedImage);
                this.$emit('close');
            });
        },

        closeModal() {
            this.$emit('close');
        }
    },

    props: [
        'uploadedImage',
        'showModal'
    ],

    mounted() {
    }

}
</script>