<template>
    <Slider v-if="events.length > 0" class="related-events-panel mt-5 mb-3" v-bind="tinySliderOptions" ref="slider" :autoInit="false">
        <div :key="i" v-for="(event,i) in events">
            <router-link :to="'/events/' + event.id">
                <Card type="default"  class="mx-2" no-body  hover>
                    <img :src="event.image" class="img-fluid">
                    <span class="lead card-title" v-html="event.title" ></span>
                </Card>
            </router-link>
        </div>
    </Slider>
</template>

<script>

import Slider from 'vue-tiny-slider';
import Card from '~/Framework/Plugins/Argon/Components/Card';
import EventsService from '~/Application/Services/Events';

import { isMobile } from "mobile-device-detect";

export default {
    name: 'RelatedEvents',

    components: {
        Card,
        Slider
    },

    data() {
        return {
            events: [],
            tinySliderOptions: {
                mouseDrag: true,
                loop: true,
                items: isMobile ? 1: 3,
                autoplay:true,
                nav:false,
                controls:false,
                'nav-options':false,
                'autoplayButtonOutput': false
            }
        }
    },

    props: {
        mainEventId: {
            required: true,
            type: Number
        }
    },

    methods: {
        getRelatedEvents() {
            EventsService.getAll().then(events => {
                this.events = events.filter( (ev) => {
                    return ev.id !== this.mainEventId;
                });
            }).finally(() => {
                if(this.events.length > 0) {
                this.$refs.slider.init()

                }
            });
        }
    },

    watch:{
        mainEventId() {
            this.getRelatedEvents();
        }
    },

    mounted() {
        this.getRelatedEvents();
    }
    
}
</script>