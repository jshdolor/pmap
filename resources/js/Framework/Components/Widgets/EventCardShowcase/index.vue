<template>
    <div class="event-slider">
        <Slider 
            controls="true" 
            :nav="false"
            :autoHeight="true"
            v-if="events.length">
            <EventCard v-for="(event, index) in events" :key="index" class="event-item" :event="event"></EventCard>
        </Slider>
    </div>
</template>
<script>
import EventCard from "~/Framework/Components/Widgets/EventCard";
import Slider from "vue-tiny-slider";

export default {
    name: "EventCardShowcase",

    components: {
        Slider,
        EventCard
    },

    props: ["events"],

    mounted() {
    }
};
</script>