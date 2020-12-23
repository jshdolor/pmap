<template>
    <section id="eventPage" :class="`event-id-${eventId}`">
        <SectionHeader bg="bg-pmapAccent"></SectionHeader>
        <div class="container mt--400" ref="eventContentCard">
            <div class="row">
                <div class="col-lg-8">
                    <Card shadow>
                        <h2 class v-html="title">Event Title</h2>
                        <!-- <p class="lead mt-0 mb-3" v-html="subtitle"></p> -->
                        <div class="text-center">
                            <img class="img-fluid" :src="image" />
                        </div>
                        <div class="row lead text-info event-details mb-5">
                            <div class="col-lg-6">
                                <Button
                                    class="py-3 my-2 ellipsis-overflow"
                                    type="warning"
                                    block
                                    outline
                                >
                                    <span class="fa fa-2x fa-calendar"></span>
                                    <br />
                                    <span v-html="eventDate"></span>
                                </Button>
                            </div>
                            <div class="col-lg-6">
                                <Button
                                    class="py-3 my-2 ellipsis-overflow"
                                    type="success"
                                    block
                                    outline
                                >
                                    <span class="fa fa-2x fa-clock"></span>
                                    <br />
                                    <span v-html="eventTime"></span>
                                </Button>
                            </div>
                            <div class="col-lg-6">
                                <Button
                                    class="py-3 my-2 ellipsis-overflow"
                                    type="default"
                                    block
                                    outline
                                >
                                    <span class="fa fa-2x fa-calendar"></span>
                                    <br />
                                    <span>{{ slotsLeft }} Slots</span>
                                </Button>
                            </div>
                            <div class="col-lg-6">
                                <Button
                                    target="_blank"
                                    tag="a"
                                    :href="getMapsLink(venue)"
                                    type="info"
                                    class="py-3 my-2 ellipsis-overflow"
                                    block
                                    outline
                                >
                                    <span class="fa fa-2x fa-map-marker"></span>
                                    <br />
                                    <span v-text="venue"></span>
                                </Button>
                            </div>
                        </div>

                        <p v-html="content"></p>
                    </Card>
                </div>
                <div class="col-lg-4 text-center" ref="sidePanel" style>
                    <Calendar class="shadow" :eventDate="eventDate"></Calendar>
                    <div class="my-3"></div>
                    <Card class="mt-4 price-card" shadow>
                        <div class="ribbon" v-if="points">
                            <span>{{ points }} points</span>
                        </div>
                        <div
                            class="row text-center justify-content-center price-display"
                        >
                            <div class="col-lg-12 my-1">
                                <i
                                    v-if="isMember"
                                    style="position: absolute; right: 0"
                                    class="text-success fas fa-2x fa-check-circle"
                                ></i>
                                <h2
                                    v-if="prices.isEarlyBird"
                                    class="text-pmapAccent"
                                >
                                    <div
                                        v-text="
                                            currency(
                                                prices.memberEarlyPrice,
                                                '₱'
                                            )
                                        "
                                    ></div>
                                    <div class="subtitle">
                                        Member Early Bird Price
                                    </div>
                                </h2>
                                <h4>
                                    <div
                                        v-text="
                                            currency(prices.memberRegPrice, '₱')
                                        "
                                    ></div>
                                    <div class="subtitle">Member Price</div>
                                </h4>
                            </div>
                            <div class="col-lg-12 my-1">
                                <i
                                    v-if="!isMember"
                                    style="position: absolute; right: 0"
                                    class="text-success fas fa-2x fa-check-circle"
                                ></i>

                                <h2
                                    v-if="prices.isEarlyBird"
                                    class="text-pmapAccent"
                                >
                                    <div
                                        v-text="
                                            currency(
                                                prices.nonMemberEarlyPrice,
                                                '₱'
                                            )
                                        "
                                    ></div>
                                    <div class="subtitle">
                                        Non-Member Early Bird Price
                                    </div>
                                </h2>
                                <h4>
                                    <div
                                        v-text="
                                            currency(
                                                prices.nonMemberRegPrice,
                                                '₱'
                                            )
                                        "
                                    ></div>
                                    <div class="subtitle">Non-Member Price</div>
                                </h4>
                            </div>
                        </div>

                        <Button
                            @click="openEventRegModal"
                            type="primary"
                            class="my-2 pmap-join-btn"
                            block
                            :disabled="profileLoading"
                        >
                            <span
                                v-show="profileLoading"
                                class="fa fa-spin fa-spinner"
                            ></span>
                            Join
                            <br />
                            <small>( 12% tax included )</small>
                        </Button>
                        <FBShareButton
                            class="my-2"
                            :picture="image"
                            :url="currentUrl"
                        />
                    </Card>
                </div>
            </div>
            <div class="row" ref="relatedEventsContainer">
                <div class="col-lg-12">
                    <RelatedEventsSlider
                        :mainEventId="parseInt(eventId)"
                    ></RelatedEventsSlider>
                </div>
            </div>
        </div>
        <EventRegModal
            :eventId="eventId"
            :eventData="eventData"
            :showModal="showModal"
            v-on:close="showModal = false"
        />

        <GuestPromptModal
            :showModal="showPromptModal"
            v-on:close="showPromptModal = false"
            v-on:joinGuest="
                showModal = true;
                showPromptModal = false;
            "
        />
    </section>
</template>

<script>
import {
    debounce,
    isElementInViewport,
    getOffsetTop,
} from "~/Framework/Helpers";

import { currency } from "~/Framework/Helpers/String";

import Calendar from "./Calendar";
import SectionHeader from "~/Framework/Components/Atomic/SectionHeader";
import RelatedEventsSlider from "~/Framework/Components/Widgets/EventRelated";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

import EventsService from "~/Application/Services/V2/Event";

import EventRegModal from "~/Framework/Components/Modals/EventReg";
import GuestPromptModal from "~/Framework/Components/Modals/GuestPrompt";
import { isMobile } from "mobile-device-detect";

import FBShareButton from "~/Framework/Components/Widgets/Facebook/ShareButton";

export default {
    name: "EventsPage",
    components: {
        Calendar,
        SectionHeader,
        Card,
        EventRegModal,
        Button,
        RelatedEventsSlider,
        GuestPromptModal,
        FBShareButton,
    },
    data() {
        return {
            eventId: "",
            image: "",
            content: "",
            title: "",
            subtitle: "",
            venue: "",
            slotsLeft: 0,
            eventTime: "",
            eventDate: new Date(),
            rawEventDate: new Date(),
            loaded: false,
            prices: {},
            showModal: false,
            showPromptModal: false,
            wholeEventData: null,
            points: 0,
        };
    },

    methods: {
        shareToFB() {
            let url = location.href;
            let path = `https://www.facebook.com/sharer/sharer.php?u=${url}&amp;src=sdkpreparse`;

            window.open(path, "_blank");
        },
        currency,
        openEventRegModal() {
            if (this.isLoggedIn && this.profile.isIncomplete) {
                //show toast with path to profile
                this.$toasted.info("Profile Incomplete", {
                    duration: 4000,
                    action: {
                        text: "Go to Profile",
                        onClick: (e, toastObject) => {
                            this.$router.replace({ name: "user-profile-page" });
                            toastObject.goAway(0);
                        },
                    },
                });

                return;
            }

            if (this.isLoggedIn) {
                this.showModal = true;
                return;
            }

            this.showPromptModal = true;
        },

        getMapsLink(str) {
            str = str.replace(/ /g, "+");
            return `https://www.google.com/maps/search/${str}/`;
        },

        getEvent() {
            this.eventId = this.$route.params.id;
            this.loaded = false;

            EventsService.events(this.eventId)
                .then((event) => {
                    if (event.getErrorMessages) {
                        this.$router.replace({ name: "events-list-route" });
                        return;
                    }

                    if (!this.eventId) {
                        this.$root.$emit("reload-page", `event/${event.id}`);
                    }
                    this.wholeEventData = event;
                    this.image = event.image;
                    this.points = event.points;
                    this.content = event.body;
                    this.title = event.title;
                    this.venue = event.venue;
                    this.subtitle = event.subtitle;
                    this.slotsLeft = event.slotsLeft;
                    this.eventDate = event.eventDate;
                    this.eventTime = event.eventTime;
                    this.rawEventDate = event.rawEventDate;
                    this.eventId = event.id;
                    this.prices = {
                        isEarlyBird: event.isEarlyBird,
                        nonMemberEarlyPrice: event.nonMemberEarlyPrice,
                        nonMemberRegPrice: event.nonMemberRegPrice,
                        memberRegPrice: event.memberRegPrice,
                        memberEarlyPrice: event.memberEarlyPrice,
                    };
                })
                .finally(() => {
                    this.loaded = true;
                });
        },
    },

    mounted() {
        this.getEvent();
    },

    computed: {
        currentUrl() {
            return location.href;
        },
        profile() {
            return this.$store.state.profile.profile || {};
        },

        isMember() {
            return this.profile.isMember;
        },

        isLoggedIn() {
            return this.$store.state.session.isLoggedIn;
        },

        eventData() {
            return this.wholeEventData || {};
        },

        profileLoading() {
            if (!this.isLoggedIn) {
                return false;
            }

            if (Object.keys(this.profile).length === 0) {
                return true;
            }

            return false;
        },
    },

    watch: {
        "$route.params.id"(newVal, oldVal) {
            this.getEvent();
        },

        isLoggedIn(newVal) {
            if (newVal) {
                this.showPromptModal = false;
                this.showModal = true;
            }
        },
    },
};
</script>