<template>
    <div class="container-fluid pt-4" id="user-events">
        <Button class="mb-2" block primary v-b-toggle.accordion-1>Events</Button>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <v-client-table :data="tableData" :columns="columns" :options="options">
                <select
                    @change="(e) => actionChange(e, rowData)"
                    slot="action"
                    slot-scope="rowData"
                    class="form-control"
                    :disabled="rowData.row.status !== 'RESERVED'"
                >
                    <option value>Action</option>
                    <option>Cancel</option>
                    <option>Pay</option>
                </select>
                <a
                    slot="code"
                    slot-scope="rowData"
                    target="_blank"
                    :href="`/ticket-search/${rowData.row.code}`"
                >{{rowData.row.code}}</a>
            </v-client-table>
        </b-collapse>

        <Button class="mb-2" block primary v-b-toggle.accordion-2 v-if="false">Pmap Upcoming Events</Button>
        <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
            <v-client-table :data="tableData" :columns="columns" :options="options">
                <select
                    @change="(e) => actionChange(e, rowData)"
                    slot="action"
                    slot-scope="rowData"
                    class="form-control"
                    :disabled="rowData.row.status !== 'Reserved'"
                >
                    <option value>Action</option>
                    <option>Cancel</option>
                    <option>Pay</option>
                </select>
            </v-client-table>
        </b-collapse>

        <Modal
            :show="showCancelModal"
            gradient="danger"
            header-classes="modal-no-header"
            v-on:close="showCancelModal = false"
            modal-classes="modal-primary modal-dialog-centered"
        >
            <span slot="header"></span>
            <div class="py-3 text-center">
                <i class="fas fa-4x fa-exclamation-circle"></i>
                <h4 class="heading mt-4">Cancel Event Reservation?</h4>
                <CancelForm
                    v-if="cancelCode"
                    :code="cancelCode"
                    v-on:close="showCancelModal = false"
                ></CancelForm>
                <p>
                    <small>This action cannot be REVERTED</small>
                </p>
            </div>
        </Modal>
    </div>
</template>

<script>
import ProfileService from "~/Application/Services/Profile";
import CancelEventRequest from "~/Application/Services/Events/Requests/EventCodeRequest";
import EventService from "~/Application/Services/Events";

import Vue from "vue";
import { ServerTable, ClientTable, Event } from "vue-tables-2";
import { CollapsePlugin } from "bootstrap-vue";
Vue.use(ClientTable, {}, false, "bootstrap4", "default");
Vue.use(CollapsePlugin);

import CancelForm from "~/Framework/Components/Forms/CancelEventReservation";

import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Modal from "~/Framework/Plugins/Argon/Components/Modal";

export default {
    name: "UserEvents",

    components: {
        Button,
        Modal,
        CancelForm
    },

    methods: {
        actionChange(event, { row }) {
            const action = event.target.value;
            event.target.value = "";

            if (action === "Pay" && row.code) {
                this.goToPaymentLink(row.code);
                return;
            }

            if (action === "Cancel") {
                //openconfirmation
                this.showCancelModal = true;
                this.cancelCode = row.code;
                return;
            }
        },

        cancelEventRegistration() {
            const request = new CancelEventRequest({ code: this.cancelCode });

            EventService.cancelEventRegistrationByCode(request).then(d => {
                this.$root.$emit("reload-page");
            });
        },

        goToPaymentLink(code) {
            const link = `/api/v2/payment/paypal/event-reservation/${code}`;
            window.open(link, "_blank");
        }
    },

    data() {
        return {
            columns: ["code", "action", "eventTitle", "eventDate", "status"],
            tableData: [],
            showCancelModal: false,
            cancelCode: null,
            options: {
                perPage: 5
            }
        };
    },

    mounted() {
        ProfileService.getRegisteredEvents().then(
            events => (this.tableData = events)
        );
    }
};
</script>
