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
                <Logo class="mb-4 mx-auto d-block" />
                <SignupForm v-on:close="closeModal" />
            </template>
        </Card>
    </Modal>
</template>
<script>
import Modal from "~/Framework/Plugins/Argon/Components/Modal";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import SignupForm from "~/Framework/Components/Forms/Signup";
import Logo from "~/Framework/Components/Atomic/Logo";

export default {
    name: "SignupModal",

    components: {
        Logo,
        Modal,
        Card,
        SignupForm
    },

    methods: {
        closeModal() {
            this.$store.dispatch("intent/hideSignupModal");
        }
    },

    computed: {
        isShown: {
            get: function() {
                return this.$store.state.intent.showSignupModal;
            },
            set: function(show) {
                let action = show ? "show" : "hide";
                let mutation = `intent/${action}SignupModal`;
                this.$store.dispatch(mutation);
            }
        }
    }
};
</script>