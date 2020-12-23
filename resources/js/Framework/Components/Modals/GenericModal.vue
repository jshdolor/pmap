<template>
    <Modal
        :modal-classes="{'modal-lg': getData.large}"
        :show="getData.show"
        ref="modal"
        v-on:close="closeModal"
        :header-classes="getData.title ? '':'modal-no-header'"
        class="generic-modal"
    >
        <h6
            slot="header"
            v-html="getData.title"
            class="modal-title"
            id="modal-title-default"
        ></h6>

        <p v-html="getData.content"></p>

        <template v-if="showFooter" slot="footer">
            <base-button type="link" class="ml-auto" @click="closeModal">Close</base-button>
        </template>
    </Modal>
</template>

<script>
import Modal from "~/Framework/Plugins/Argon/Components/Modal";

export default {
    name: "GenericModal",
    props: {
        showFooter: {
            type: Boolean,
            default: false
        }
    },

    components: {
        Modal
    },

    computed: {
        getData() {
            return this.$store.state.intent.genericModalData;
        }
    },

    methods: {
        closeModal() {
            this.$store.dispatch("intent/hideGenericModal");
        }
    }
};
</script>
