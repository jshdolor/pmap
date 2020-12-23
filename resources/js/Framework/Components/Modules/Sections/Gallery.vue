<template>
    <SectionHeader  id="gallery" bg="bg-gradient-primary" class="section section-lg section-shaped overflow-hidden my-0" v-if="albums.length > 0">
        <div class="container py-0 pb-lg">
            <div class="row justify-content-between align-items-center">
                <div class="col-lg-5 mb-5 mb-lg-0">
                    <span v-html="content"></span>
                    <router-link to="gallery" class="btn btn-white mt-4">See all Albums</router-link>
                </div>
                <div class="col-lg-6 mg-lg-auto gallery-section-slider">
                    <div class="rounded shadow-lg overflow-hidden transform-perspective-right">
                        <Carousel
                            v-bind="carouselConfig"
                        >
                            <Slide :key="i" v-for="(album, i) in albums">
                                <Card no-body >
                                    <div class="row album-title">
                                        <div class="col-lg-12 text-center">
                                            <div v-html="album.title"></div>
                                            <Button @click="showAlbum(album)" outline>View</Button>
                                        </div>
                                    </div>
                                    <img ref="slideImages" :src="album.image" />
                                </Card>
                            </Slide>
                        </Carousel>
                        
                    </div>
                </div>
            </div>
        </div>
    </SectionHeader>
</template>

<script>
import SectionHeader from "~/Framework/Components/Atomic/SectionHeader";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

import GalleryService from "~/Application/Services/Gallery";

import { Carousel, Slide } from 'vue-carousel';

import Config from '~/Application/Config';

import PageService from "~/Application/Services/Page";

export default {
    name: "Gallery",
    components: {
        SectionHeader,
        Card,
        Button,
        Carousel,
        Slide
    },

    methods: {
        getAllAlbums() {
            GalleryService.getAll()
                .then(albums => {
                    this.albums = albums;
                    this.$store.dispatch("gallery/setAlbums", albums);
                })
        },

    },

    data() {
        return {
            albums: [],
            content: '',
            carouselConfig:Config.vueCarousel
        };
    },

    mounted() {
        this.getAllAlbums();

        PageService.get('gallery-section').then(({content}) => this.content = content)
        
    }
};
</script>