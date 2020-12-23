<template>
    <Card shadow no-body class="no-border event-item">
        <div class="row align-items-center">
            <div class="col-auto">
                <!-- Avatar -->
                <router-link :to="{name: 'events-route', params: { id: event.id}}">
                    <img class="event-image" alt="Image placeholder" :src="event.image" />
                </router-link>
            </div>
            <div class="col ml--2">
                <h4 class="mb-0 event-title">
                    <router-link v-html="event.title" :to="{name: 'events-route', params: { id: event.id}}">
                    </router-link>
                </h4>
                <p class="event-venue text-sm text-muted mb-0" v-html="event.venue"></p>
                <span class="text-warning" v-if="event.isEarlyBird">
                    <span class="fa fa-star"></span> Early Bird Promo
                </span>
                <div class="row  justify-content-md-center">
                    <div class="col-md-5 text-center">
                        <h4 class='price-display'>
                            <div v-text="currency(event.memberRegPrice, '₱')"></div>
                            <div class="subtitle">Member Price</div>
                        </h4>
                    </div>
                    <div class="col-md-5 text-center">
                        <h4 class='price-display'>
                            <div v-text="currency(event.nonMemberRegPrice, '₱')"></div>
                            <div class="subtitle">Non-Member Price</div>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
import Card from "~/Framework/Plugins/Argon/Components/Card";
import { trimString , currency} from "~/Framework/Helpers/String";

export default {
    
    name: "EventListCard",

    components: {
        Card
    },

    methods: {
        trimString,
        currency
    },

    props: {
        event: {
            required: true
        }
    }
};
</script>