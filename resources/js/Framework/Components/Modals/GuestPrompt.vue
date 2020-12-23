<template>
    <Modal :show="showModal"
            gradient="primary"
            header-classes="modal-no-header"
            v-on:close='closeModal'
            modal-classes="modal-primary modal-dialog-centered">
            <span slot="header"></span>
            <div class="py-3 text-center">
                <i class="fas fa-3x fa-address-card"></i>
                <h4 class="heading mt-4">Got a PMAP Account?</h4>
                <p>Members have discounts as perks.</p>
                <Button type="white" v-auth-required>Login</Button>
                <Button type="link"
                             text-color="white"
                             class="ml-auto"
                             @click="proceedRegistration">
                    Join as Guest
                </Button>
            </div>
            
        </Modal>
</template>

<script>
import Modal from "~/Framework/Plugins/Argon/Components/Modal";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

export default {
    name: 'GuestPromptModal',
    components: {
        Modal,
        Button
    },

    methods: {
        proceedRegistration() {
            this.$emit('joinGuest', true);      
        },
        closeModal() {
            this.$emit('close');
        }
    },

    props: [
        'showModal',
    ],

}
</script>