<template>
    <Modal
        :show="isShown"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-sm"
        header-classes="modal-no-header"
        v-on:close="closeModal"
    >
        <span slot="header"></span>
        <Card
            type="neutral"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
        >
            <template>
                <Logo class="mb-4 mx-auto d-block"/>
                <div class="text-primary my-3 display-4 text-center">
                    Forgot Password?
                </div>
                <ForgotPasswordForm/>
            </template>
        </Card>
    </Modal>
</template>
<script>
import Modal from "~/Framework/Plugins/Argon/Components/Modal";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import ForgotPasswordForm from '~/Framework/Components/Forms/ForgotPassword';
import Logo from '~/Framework/Components/Atomic/Logo';

export default {
    name: "ForgotPasswordModal",

    components: {
        Logo,
        Modal,
        Card,
        ForgotPasswordForm
    },

    methods: {
        closeModal() {
            this.$store.dispatch("intent/hideForgotPasswordModal");
        },
    },

    computed: {
        isShown: {
            get: function() {
                // this.$v.$reset();
                // this.username = null;
                // this.password = null;
                return this.$store.state.intent.showForgotPasswordModal;
            },
            set: function(show) {
                let action = show ? "show" : "hide";
                let mutation = `intent/${action}ForgotPasswordModal`;
                this.$store.dispatch(mutation);
            }
        },
    },


};
</script>