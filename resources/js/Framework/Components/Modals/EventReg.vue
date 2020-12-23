<template>
    <Modal
        id="event-reg-modal"
        :show="showModal"
        body-classes="p-0"
        modal-classes="modal-lg modal-dialog-centered modal-sm"
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
                <h2 class="display-4 text-center" v-html="eventData.title"></h2>
                <EventRegForm
                    :eventData="eventData"
                    v-if="eventId"
                    v-on:formSubmitted="closeModal"
                    :eventId="eventId"
                />
            </template>
        </Card>
    </Modal>
</template>
<script>
import Modal from "~/Framework/Plugins/Argon/Components/Modal";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import EventRegForm from "~/Framework/Components/Forms/EventReg";

export default {
    name: "EventRegModal",

    components: {
        Modal,
        Card,
        EventRegForm
    },

    methods: {
        closeModal() {
            this.$emit("close", true);
        }
    },

    props: {
        showModal: {},
        eventId: {},
        eventName: {},
        eventData: {
            default: {},
            required: true
        }
    },

    computed: {
        isShown: {
            get: function() {
                return this.$store.state.intent.showEventRegModal;
            },
            set: function(show) {
                let action = show ? "show" : "hide";
                let mutation = `intent/${action}EventRegModal`;
                this.$store.dispatch(mutation);
            }
        }
    }
};
</script>