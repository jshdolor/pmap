<template>
    <section class="section section-lg bg-gradient-success" id="ticketSearch">
        <Loader :show="showLoading" />

        <div class="container mt-5">
            <div class="row row-grid justify-content-center">
                <div class="col-lg-7 text-center" v-show="showSearch && !showLoading">
                    <h2 class="display-3 text-white">
                        Did you register
                        <span class="text-primary">for a PMAP Event?</span>
                    </h2>
                    <p
                        class="lead text-white"
                    >Cause if you do, you can search it here just put in the code you have and hit the search button!</p>
                    <input
                        placeholder="E V E N T C O D E"
                        v-model="code"
                        class="form-control search-input-field mt-3"
                    />

                    <Button
                        shadow
                        primary
                        lg
                        icon="fa fa-2x fa-search"
                        class="my-3"
                        @click="searchRegistration"
                    >Search</Button>
                </div>

                <div class="col-lg-7 bg-white pt-3 shadow" v-show="!showSearch && !showLoading">
                    <div class="payment-link-container float-right" v-if="!isPaid">
                        <svg height="100px" width="100px" v-html="qrCode" />
                        <a
                            class="btn btn-sm btn-block btn-primary mb-2"
                            target="_blank"
                            :href="paymentUrl"
                        >Pay</a>
                    </div>
                    <div class="ribbon" v-if="isPaid">
                        <span>Paid</span>
                    </div>
                    <RegisteredEventInfo :data="eventRegInfo" />
                </div>

                <div class="col-lg-12 text-center">
                    <RelatedEventsSlider :mainEventId="0" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import RelatedEventsSlider from "~/Framework/Components/Widgets/EventRelated";
import SectionHeader from "~/Framework/Components/Atomic/SectionHeader";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Loader from "~/Framework/Components/Atomic/Loader";
import RegisteredEventInfo from "~/Framework/Components/Widgets/RegisteredEventInfo";

import EventReservationService from "~/Application/Services/V2/Event/Reservation";
import EventCodeRequest from "~/Application/Services/Events/Requests/EventCodeRequest";

export default {
    name: "TicketSearchPage",

    components: {
        RelatedEventsSlider,
        SectionHeader,
        Button,
        Loader,
        RegisteredEventInfo,
    },

    data() {
        return {
            showSearch: false,
            showLoading: true,
            code: "",
            eventRegInfo: {},
            qrCode: "",
        };
    },

    computed: {
        paymentUrl() {
            return `/api/v2/payment/paypal/event-reservation/${this.code}`;
        },
        isPaid() {
            return this.eventRegInfo.status === "PAID";
        },
    },

    watch: {
        "$route.params.code": {
            immediate: true,
            handler(newVal, oldVal) {
                this.code = newVal;

                if (newVal) {
                    this.searchRegistration();
                } else {
                    this.showSearch = true;
                    this.showLoading = false;
                }
            },
        },
    },

    methods: {
        async getQrCode(code) {
            return await EventReservationService.getQrCode(code);
        },

        searchRegistration() {
            const request = new EventCodeRequest({ code: this.code });

            this.showLoading = true;

            EventReservationService.getEventRegistrationByCode({
                code: this.code,
            })
                .then(async (r) => {
                    if (r.getErrorMessages) {
                        const errMessage = Object.values(
                            r.getErrorMessages()
                        )[0];

                        this.showSearch = true;

                        this.$toasted.error(errMessage, {
                            duration: 3500,
                            position: "bottom-right",
                        });
                        return;
                    }

                    this.eventRegInfo = r;

                    this.qrCode = await this.getQrCode(this.code);

                    this.showLoading = false;
                    this.showSearch = false;
                })
                .finally(() => (this.showLoading = false));
        },
    },

    mounted() {},
};
</script>
