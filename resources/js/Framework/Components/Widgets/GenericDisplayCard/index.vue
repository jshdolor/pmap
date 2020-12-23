<template>
    <Card shadow  class="event-item">
        <img :src="image" class="img-fluid">
        <div class="row">
            <div class="col-md-12 text-muted" v-html="date"></div>
            <div class="col-md-12 ellipsis-overflow" v-html="title"></div>
        </div>
    </Card>
</template>

<script>

import Card from '~/Framework/Plugins/Argon/Components/Card';

export default {
    name: 'GenericDisplayCard',

    components: {
        Card
    },

    props: {
        image: {
            required: true
        },
        title: {
            required: true
        },
        date: {
            required: true
        }
    }

}   
</script>