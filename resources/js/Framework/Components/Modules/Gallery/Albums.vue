<template>
    <div id="gallery_album" >
        <div class='faded-album' :style="{backgroundImage:`url(${currentAlbum.image})`}"></div>
        <div class="container">

            <div class="row pt-150">
                <div class="col-md-6 text-right">
                    <img :src="currentAlbum.image">
                </div>
                <div class="col-md-6 align-self-center">
                    <h3 class="text-white" >
                        <span v-text="currentAlbum.title"></span><br>
                        <small class="text-muted" v-text="currentAlbum.createdAt"></small>
                    </h3>
                    <p class="lead text-white" v-html='currentAlbum.description'>
                    </p>
                    <Button @click="showPictures(currentAlbum)" class="btn btn-lg btn-white">See Pictures</Button>
                </div>
            </div>

        </div>
        <div class="carousel-container">
                <Carousel class='carousel' v-bind="carouselConfig" v-if="albums.length > 0">
                    <Slide :key="i" v-for="(album, i) in albums">
                    <img   :src="album.image" @click="showAlbum(album)" />
                    </Slide>
                </Carousel>
            </div>
    </div>
</template>

<script>
import GalleryService from "~/Application/Services/Gallery";
import {  Slide } from 'vue-carousel';
import Config from '~/Application/Config';
import Carousel from "~/Framework/Components/Widgets/Carousel";



import Card from '~/Framework/Plugins/Argon/Components/Card';
import Button from '~/Framework/Plugins/Argon/Components/BaseButton';

export default {
    name: 'Albums',
    components: {
        Carousel,
        Card,
        Button,
        Slide
    },
    methods: {
        getAllAlbums() {
            GalleryService.getAll()
                .then(albums => {
                    this.albums = albums;
                    this.$store.dispatch("gallery/setAlbums", albums);
                    this.$store.dispatch("gallery/setCurrentAlbum", albums[0]);
                }).finally(() => {
                    if(this.albums[0]) {
                        this.currentAlbum = this.albums[0];
                    }
                })
        },
        showAlbum(album) {
            this.currentAlbum = album;
            this.$store.dispatch("gallery/setCurrentAlbum", album);

        },
        showPictures(album) {
            this.$store.dispatch("intent/showGalleryModal");
        }
    },
    data() {
        return {
            carouselConfig:Object.assign(Config.vueCarousel, {
                perPage: 5,
                autoplay:false,
                centerMode: true,
                // adjustableHeight: true,
                scrollPerPage:false,
                carouselAutoWidth: 750,
            }),
            albums: [],
            currentAlbum: {}
        }
    },
    mounted() {
        this.getAllAlbums()
    }
}
</script>