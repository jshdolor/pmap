<template>
    <Slider v-if="relatedResources.length > 0" class="related-resources-panel mt-5 mb-3" v-bind="tinySliderOptions" ref="slider" :autoInit="true">
        <div :key="i" v-for="(resource,i) in relatedResources">
            <router-link :to="resource.path">
                <Card type="default"  class="mx-2" no-body  hover>
                    <img :src="resource.image" class="img-fluid">
                    <span class="lead card-title" v-html="resource.title" ></span>
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
    name: 'RelatedResource',

    components: {
        Card,
        Slider
    },

    data() {
        return {

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
        relatedResources: {
            required: true,
            type: Array,
            default: []
        }
    },

    watch:{
        relatedResources() {
            if(this.$refs.slider) {
                this.$refs.slider.init()
            }
        }
    },

    
}
</script>