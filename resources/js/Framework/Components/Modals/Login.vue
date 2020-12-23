<template>
    <Modal
        :show="isShown"
        body-classes="p-0 login-modal"
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
                <LoginForm />
                <hr />
                <FbLogin />
            </template>
        </Card>
    </Modal>
</template>
<script>
import Modal from "~/Framework/Plugins/Argon/Components/Modal";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import LoginForm from "~/Framework/Components/Forms/Login";
import Logo from "~/Framework/Components/Atomic/Logo";

import FbLogin from "~/Framework/Components/Widgets/Facebook/LoginButton";

export default {
    name: "LoginModal",

    components: {
        Logo,
        Modal,
        Card,
        LoginForm,
        FbLogin,
    },

    methods: {
        closeModal() {
            this.$store.dispatch("intent/hideLoginModal");
        },
    },

    computed: {
        isShown: {
            get: function () {
                // this.$v.$reset();
                // this.username = null;
                // this.password = null;
                return this.$store.state.intent.showLoginModal;
            },
            set: function (show) {
                let action = show ? "show" : "hide";
                let mutation = `intent/${action}LoginModal`;
                this.$store.dispatch(mutation);
            },
        },
    },
};
</script>