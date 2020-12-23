<template>
    <div class="shadow-lg--hover mt-5 card bg-default shadow border-0">
        <router-link :to="{name: 'events-route', params: { id: event.id}}">
            <img :src="event.image" class="card-img-top" />
        </router-link>
        <blockquote class="card-blockquote">
            <svg
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 583 95"
                class="svg-bg"
            >
                <polygon points="0,52 583,95 0,95" class="fill-default" />
                <polygon points="0,42 583,95 683,0 0,95" opacity=".2" class="fill-default" />
            </svg>
            <h4 class="display-4 font-weight-bold text-white">{{event.title | eventTitle}}</h4>
            <div class="row">
                <div class="col-md-6">
                    <h5 class="display-6 text-warning">
                        <span class="fa fa-calendar"></span>
                        {{event.eventDate}}
                    </h5>
                </div>
                <div class="col-md-6">
                    <h5 class="display-6 text-warning">
                        <span class="fa fa-map-marker"></span>
                        <span v-text="event.venue"></span>
                    </h5>
                </div>
            </div>
            <p class="text-italic text-white event-teaser-container">
                {{event.teaser | trim}}
                <br>
                <router-link :to="{name: 'events-route', params: { id: event.id}}">
                    <Button type="link" class="btn-read-more">
                        <span class="fa fa-book"></span>
                        Read More
                    </Button>
                </router-link>
            </p>
        </blockquote>
    </div>
</template>
<script>

import Button from '~/Framework/Plugins/Argon/Components/BaseButton';

import {
    trimString
} from '~/Framework/Helpers/String';

export default {
    name: "EventCardShowcase",
    components: {
        Button
    },
    props: {
        event: {
            type: Object,
            required: true
        }
    },

    filters: {
        eventTitle: function(value) { 
            value = trimString(value, 25, true);
            return value.toLowerCase().split(' ').map(function(word) {
                return word.replace(word[0], word[0].toUpperCase());
            }).join(' ');
        },

        trim: function (value) {
            return trimString(value, 180, true);
        },

    },
    mounted() {}
};
</script>