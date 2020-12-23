<template>
    <Card shadow class v-if="events">
        <h5>Filter Events</h5>

        <Input
            label="Event Title"
            v-model="title"
            class="mt-1"
            placeholder="Event Title"
        />

        <Input
            label="Venue"
            v-model="venue"
            class="mt-1"
            placeholder="Event Venue"
        />

        <Input class="mt-1" label="From">
            <DatePicker
                v-model="fromDate"
                class="form-control"
                placeholder="Select From Date"
            />
        </Input>

        <Input class="mt-1" label="To">
            <DatePicker
                v-model="toDate"
                class="form-control"
                placeholder="Select To Date"
            />
        </Input>

        <Input class="mt-1" v-if="false">
            <vSlider
                label="Price Range"
                :options="sliderConfig"
                v-model="range"
                :range="priceRange"
            />
        </Input>

        <div class="form-group form-inline">
            <label>
                <vSwitch
                    class="mr-2"
                    labelTrue="Asc"
                    labelFalse="Desc"
                    v-model="dateAscending"
                />Event Date Sorting
            </label>
        </div>

        <div class="form-group form-inline">
            <label>
                <vSwitch class="mr-2" v-model="onlyEarlyBird" />Early Bird Only
            </label>
        </div>

        <div class="form-group form-inline">
            <Input class="my-1" style="width: 100%">Categories</Input>
            <!-- <CheckBox class="mr-2" >All</CheckBox> -->
            <CheckBox
                v-model="category.checked"
                class="mr-2"
                v-for="category in filteredCategories"
                :key="category.id"
            >
                {{ category.name }}
            </CheckBox>
        </div>

        <Button @click="resetFilters">Reset</Button>
    </Card>
</template>

<script>
import Config from "~/Application/Config";

import Input from "~/Framework/Plugins/Argon/Components/BaseInput";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import vSwitch from "~/Framework/Plugins/Argon/Components/BaseSwitch";
import CheckBox from "~/Framework/Plugins/Argon/Components/BaseCheckbox";
import vSlider from "~/Framework/Plugins/Argon/Components/BaseSlider";
import DatePicker from "vue-flatpickr-component";

import EventService from "~/Application/Services/V2/Event";

export default {
    name: "FilterEvent",

    components: {
        Input,
        Card,
        Button,
        vSwitch,
        vSlider,
        DatePicker,
        CheckBox,
    },

    methods: {
        resetFilters() {
            this.title = "";
            this.venue = "";
            this.range = [0, this.maxPrice];
            this.onlyEarlyBird = false;
            this.dateAscending = false;
            this.fromDate = "";
            this.toDate = "";
            this.eventCategories.forEach((d) => (d.checked = true));
        },

        getEventCategories() {
            EventService.categories().then((data) => {
                this.eventCategories = data.map((eventCateg) => {
                    eventCateg.checked = true;
                    return eventCateg;
                });
            });
        },
    },

    props: {
        events: {
            required: true,
        },
        maxPrice: {
            required: true,
        },
    },

    data() {
        return {
            title: "",
            venue: "",
            range: [0, this.maxPrice],
            onlyEarlyBird: false,
            dateAscending: false,
            fromDate: "",
            toDate: "",
            eventCategories: [],
            sliderConfig: Config.sliderConfig,
        };
    },

    mounted() {
        this.$emit("filter", this.filteredEvents);
        this.getEventCategories();
    },

    watch: {
        dateAscending() {
            this.$emit("filter", this.filteredEvents);
        },
        filteredEvents(events) {
            this.$emit("filter", events);
        },
    },

    computed: {
        filteredEvents() {
            let events = [];

            events = this.events
                .filter((event) => {
                    let status = true;

                    if (
                        event.title
                            .toLowerCase()
                            .indexOf(this.title.toLowerCase()) === -1
                    ) {
                        status *= false;
                    }

                    if (
                        event.venue
                            .toLowerCase()
                            .indexOf(this.venue.toLowerCase()) === -1
                    ) {
                        status *= false;
                    }

                    if (this.fromDate) {
                        if (
                            new Date(event.rawEventDate).getTime() <
                            new Date(this.fromDate).getTime()
                        ) {
                            status *= false;
                        }
                    }

                    if (this.toDate) {
                        if (
                            new Date(event.rawEventDate).getTime() >
                            new Date(this.toDate).getTime()
                        ) {
                            status *= false;
                        }
                    }

                    if (
                        this.range[0] > event.price.nonMemberRegPrice ||
                        this.range[1] < event.price.nonMemberRegPrice
                    ) {
                        status *= false;
                    }

                    if (this.onlyEarlyBird) {
                        status *= event.price.isEarlyBird;
                    }

                    let allowedCategories = this.eventCategories
                        .filter((c) => c.checked)
                        .map((c) => c.id);
                    if (
                        allowedCategories.indexOf(event.category) === -1 ||
                        allowedCategories.length === 0
                    ) {
                        status *= false;
                    }

                    return status;
                })
                .sort((a, b) => {
                    if (this.dateAscending) {
                        return (
                            new Date(b.rawEventDate) - new Date(a.rawEventDate)
                        );
                    }

                    return new Date(b.rawEventDate) + new Date(a.rawEventDate);
                });

            return events;
        },

        filteredCategories() {
            const eventIdCategories = this.events.map(
                (event) => event.category
            );

            return this.eventCategories.filter(
                (category) => eventIdCategories.indexOf(category.id) > -1
            );
        },

        priceRange() {
            return {
                min: 0,
                max: this.maxPrice || 1,
            };
        },
    },
};
</script>