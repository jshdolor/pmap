<template>
    <div id="events-list">
        <SectionHeader />
        <div class="container mt--400">
            <Loader :show="!showFilters" />
            <div class="row" v-if="!noEvents">
                <div class="col-md-4">
                    <FilterEvent
                        v-if="showFilters"
                        :maxPrice="maxPrice"
                        :events="events"
                        v-on:filter="updateList"
                        ref="filterWidget"
                    />
                </div>
                <div class="col-md-8">
                    <div
                        class="text-center"
                        id="not-found"
                        v-if="eventsList.length === 0 && showFilters"
                    >
                        <Card shadow style class="py-5">
                            <div class="row align-items-center">
                                <div class="col-lg-6 text-right">
                                    <img
                                        src="/images/404.png"
                                        style="max-height: 300px"
                                        class="img-fluid"
                                    />
                                </div>
                                <div class="col-lg-6">
                                    <h1 class="pt-5">
                                        Oops...
                                        <br />
                                        <span class="lead text-muted"
                                            >No events available with your
                                            filter</span
                                        >
                                    </h1>
                                    <Button
                                        class="mb-5 btn btn-primary btn-lg"
                                        @click="resetFilters"
                                        >Reset Filters</Button
                                    >
                                </div>
                            </div>
                        </Card>
                    </div>

                    <EventCard
                        :class="`mb-3 event-id-${event.id}`"
                        :event="event"
                        v-for="(event, k) in eventsList"
                        :key="k"
                    />
                    <Pagination
                        v-if="pageCount > 1"
                        :page-count="pageCount"
                        v-model="currentPage"
                        align="center"
                    />
                </div>
            </div>

            <div class="row" v-if="noEvents">
                <div class="col-md-12">
                    <!-- no available events -->
                    <div class="text-center" id="not-found">
                        <Card shadow style class="py-5">
                            <div class="row align-items-center">
                                <div class="col-lg-6 text-right">
                                    <img
                                        src="/images/404.png"
                                        style="max-height: 300px"
                                        class="img-fluid"
                                    />
                                </div>
                                <div class="col-lg-6">
                                    <h1 class="pt-5">
                                        Oops....
                                        <br />
                                        <span class="lead text-muted"
                                            >No Available Events</span
                                        >
                                    </h1>
                                    <router-link
                                        class="mb-5 btn btn-primary btn-lg"
                                        to="/"
                                        >Back to Home</router-link
                                    >
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Config from "~/Application/Config";

import EventsService from "~/Application/Services/V2/Event";

import SectionHeader from "~/Framework/Components/Atomic/SectionHeader";
import FilterEvent from "~/Framework/Components/Widgets/FilterEvent";
import EventCard from "~/Framework/Components/Widgets/EventListCard";
import Pagination from "~/Framework/Plugins/Argon/Components/BasePagination";
import Card from "~/Framework/Plugins/Argon/Components/Card";

import Input from "~/Framework/Plugins/Argon/Components/BaseInput";
import Loader from "~/Framework/Components/Atomic/Loader";

export default {
    name: "EventsListPage",

    components: {
        Pagination,
        SectionHeader,
        Input,
        FilterEvent,
        EventCard,
        Loader,
        Card,
    },

    data() {
        return {
            maxPrice: 1,
            filteredList: [],
            currentPage: 1,
            events: [],
            perPage: Config.eventsPerPage,
            showFilters: false,
            noEvents: false,
        };
    },

    methods: {
        getEvents() {
            let promises = [];

            EventsService.events()
                .then((events) => {
                    this.noEvents = events.length === 0;
                    this.events = events;
                })
                .finally(() => {
                    this.showFilters = true;
                });
        },
        updateList(events) {
            this.currentPage = 1;
            this.filteredList = events;
        },
        resetFilters() {
            this.$refs.filterWidget.resetFilters();
        },
    },

    mounted() {
        this.getEvents();
    },

    watch: {
        currentPage(newVal) {
            window.scrollTo(0, 0);
        },
    },

    computed: {
        eventsList() {
            return this.filteredList.filter((v, k) => {
                return (
                    k >= this.currentPage * this.perPage - this.perPage &&
                    k + 1 <= this.currentPage * this.perPage
                );
            });
        },
        pageCount() {
            return Math.ceil(this.filteredList.length / this.perPage);
        },
    },
};
</script>