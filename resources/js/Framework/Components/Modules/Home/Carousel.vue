<template>
    <span class="home-carousel">
        <Carousel :nav="false" v-bind="config" v-if="banners.length" class="">
            <div v-for="(banner, index) in banners" :key="index" class="item">
                <router-link :to="banner.url">
                    <img :src="banner.image" ref='bannerImages' />
                </router-link>
                <!-- <div class="carousel-caption">
                    <h1 v-html="banner.title">
                        <br>
                        <small v-if="banner.description" v-html="banner.description"></small>
                    </h1>
                </div> -->
            </div>
        </Carousel>
    </span>
</template>
<script>

import Carousel from "vue-tiny-slider";
import BannerService from "~/Application/Services/Banners";

export default {
    name: "HomeCarousel",
    components: {
        Carousel
    },
    data() {
        return {
            config: {
                controls: true,
                speed: 600,
                mouseDrag: true,
                autoplay: true,
                autoplayButtonOutput: false
            },
            banners: [],
        };
    },
    methods: {
        adjustCaptions() {
            //centering runtime
            let captions = document.querySelectorAll(
                ".home-carousel .carousel-caption"
            );
            captions.forEach(caption => {
                let topValue =
                    caption.parentElement.offsetHeight / 2 -
                    caption.offsetHeight / 2;
                caption.style.top = topValue + "px";
            });
        },


    },
    mounted() {

        BannerService.getAll()
            .then(banners => {
                window.pageCallDone['banner-page-loading-flag'] = false;
                this.banners = banners;
            })
            .finally(() => {
                let bannerImages = this.$refs.bannerImages;

                let isImagesLoaded = [];

                bannerImages.forEach((banner, bannerKey) => {
                    
                    let promise = new Promise((resolve, reject) => {

                        banner.onload = () => {
                           resolve();
                        }

                        banner.onerror = () => {
                           reject();
                        }
                    });
                    
                    isImagesLoaded.push(promise);
                    
                });



                Promise.all(isImagesLoaded).then((er) => {
                    window.pageCallDone['banner-page-loading-flag'] = true;
                    this.adjustCaptions();
                })

            });

    }
};
</script>