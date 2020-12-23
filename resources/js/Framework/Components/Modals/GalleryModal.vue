<template>
    <Modal
        :show.sync="isShown"
        gradient="primary"
        modal-classes="modal-primary modal-dialog-centered modal-lg"
        id="gallery_modal"
        v-on:close="closeModal"
        ref="modal"
    >
        <div class="py-3 text-center">
            <h4>
                <span class="display-3 text-white">
                    <i class="ni ni-album-2"></i>
                    {{currentAlbum.title}}
                </span>
            </h4>
            <Carousel
                ref="pictureSlider"
                v-if="pictures.length > 0 "
                :perPage="1"
                :autoplay="true"
                :paginationEnabled="false"
                :navigationEnabled="true"
            >
                <Slide :key="i" v-for="(picture,i) in pictures">
                    <img class="gallery-image"  :src="picture.path" />
                </Slide>
            </Carousel>
        </div>

        <template slot="footer">
            <Button type="link" text-color="white" class="ml-auto" @click="isShown = false">Close</Button>
        </template>
    </Modal>
</template>
<script>
import { isMobile } from "mobile-device-detect";

import Modal from "~/Framework/Plugins/Argon/Components/Modal";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Card from "~/Framework/Plugins/Argon/Components/Card";

import { Carousel, Slide } from 'vue-carousel';

import PictureService from "~/Application/Services/Gallery/Picture";

export default {
    name: "GalleryModal",

    components: {
        Modal,
        Button,
        Card,
        Carousel,
        Slide
    },

    data() {
        return {
            albumName: "test",
            albumSliderConfig: {
                nav: false,
                touch: true,
                "mouse-drag": true,
                items: isMobile ? 1 : 5,
                autoplay: false
            },
            pictures: [],
            showPictureSlider: false
        };
    },

    methods: {
        closeModal() {
            this.$store.dispatch("intent/hideGalleryModal");
        },
    },

    watch: {
        isShown(newVal) {
            if(newVal) {

                PictureService.getByAlbum(this.currentAlbum.id)
                    .then(pictures => (this.pictures = pictures))

            }

        }
    },

    computed: {
        isShown: {
            get: function() {
                return this.$store.state.intent.showGalleryModal;
            },
            set: function(show) {
                let action = show ? "show" : "hide";
                let mutation = `intent/${action}GalleryModal`;
                this.$store.dispatch(mutation);
            }
        },

        albums() {
            return this.$store.state.gallery.albums || [];
        },

        currentAlbum() {
            return this.$store.state.gallery.currentAlbum || {};
        }
    },

    mounted() {


    }
};
</script>