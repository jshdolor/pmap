<template>
    <section class="section section section-shaped my-0 overflow-hidden" v-if="events.length > 0">
            <div class="shape shape-style-3 shape-primary shape-skew alpha-4">
                <span :key="comp" v-for="comp in designComponents"></span>
            </div>
            <div class="container py-0">
                <div class="row row-grid align-items-center">
                    <div class="col-md-6 order-lg-2 ml-lg-auto d-none d-md-block" >
                        <div class="position-relative pl-md-5">
                            <img src="/images/events.svg" class="img-center img-fluid">
                        </div>
                    </div>
                    <div class="col-lg-6 order-lg-1">
                        <div class="d-flex px-3">
                            <div>
                                <icon name="ni ni-building" size="lg" class="bg-gradient-white" color="primary" shadow
                                      rounded></icon>
                            </div>
                            <div class="pl-4" v-html="content">
                                </div>
                        </div>
                        
                        <EventCardShowcase
                            :events="events"
                        ></EventCardShowcase>

                    </div>
                </div>
            </div>
        </section>
</template>
<script>

import card from "~/Framework/Plugins/Argon/Components/Card";
import icon from "~/Framework/Plugins/Argon/Components/Icon";

import EventCardShowcase from '~/Framework/Components/Widgets/EventCardShowcase';

import EventService from '~/Application/Services/Events';
import PageService from '~/Application/Services/Page';

export default {
    components: {
        card,
        icon,
        EventCardShowcase
    },

    data() {
        return {
            events: [],
            designComponents: 0,
            content: ''
        }
    },

    methods: {
        randomDisplay() {
            this.designComponents = Math.floor(Math.random() * 5) + 1;
        }
    },

    mounted() {

        PageService.get('events-section').then(({content}) => this.content = content)

        EventService.getAll()
            .then(events => this.events = events);

        this.randomDisplay();

    }
}
</script>