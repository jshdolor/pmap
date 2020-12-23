<template>
    <section id="webinarPage">
        <SectionHeader></SectionHeader>
        <div class="container-fluid mt--400 header-margin">
            <div class="row">
                <div class="col-lg-8">
                    <Card shadow>
                        <BBreadcrumb :items="breadcrumbs" v-if="breadcrumbs.length > 0"></BBreadcrumb>
                        <Loader :show="showLoader" />
                        <div v-show="Object.keys(webinar).length !== 0">
                            <h2 class="display-4" v-html="webinar.title"></h2>
                            <div v-html="webinar.video"></div>

                            <p class="mt-3">Title: {{webinar.title}}</p>
                            <p>Speaker: <span v-html="webinar.speaker"></span></p>
                            <p>Date: {{webinar.date}}</p>
                            <p v-if="webinar.filename">
                                Download Presentation:
                                <a
                                    href="javascript:void(0)"
                                    @click="downloadFile(webinar)"
                                    v-html="webinar.filename"
                                >Presentation</a>
                            </p>
                            <p v-if="webinar.presentationLink">
                                Download Presentation:
                                <a
                                    :href="webinar.presentationLink"
                                    v-html="webinar.presentationLink"
                                >Presentation</a>
                            </p>
                            <span v-html="webinar.info"></span>
                        </div>
                    </Card>

                    <Card shadow v-if="moreWebinars.length" class="my-4">
                        <h2 class="display-4">More Webinars</h2>
                        <Slider
                            :controls="false"
                            :autoplay="true"
                            :loop="true"
                            :nav="false"
                            :autoHeight="true"
                            :items="slideCardCount"
                            :gutter="20"
                        >
                            <router-link
                                :key="i"
                                v-for="(seminar, i) of moreWebinars"
                                class="text-center"
                                :to="{name : 'webinar-route', params: {slug: seminar.slug}}"
                            >
                                <img :src="seminar.videoThumbnail" :onerror="noImage" class="img-fluid" />
                                <div class v-html="seminar.title"></div>
                            </router-link>
                        </Slider>
                    </Card>
                </div>
                <div class="col-lg-4">
                    <NewsAds :withShadow="false" :perPage="2" />

                    <Card shadow>
                        <ins class="adsbygoogle img-fluid"
     style="display:inline-block"
     data-ad-client="ca-pub-4041826644744302"
     data-ad-slot="6150796101"></ins>
                    </Card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { isMobile } from 'mobile-device-detect';
import {
    lodashGet
} from '~/Framework/Helpers';

import SectionHeader from "~/Framework/Components/Atomic/SectionHeader";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Loader from "~/Framework/Components/Atomic/Loader";
import NewsAds from "~/Framework/Components/Widgets/NewsSlide";
import { BBreadcrumb } from "bootstrap-vue";

import WebinarService from "~/Application/Services/Entities/Webinar";
import Slider from "vue-tiny-slider";

export default {
    name: "WebinarPage",

    components: {
        SectionHeader,
        Card,
        Button,
        Loader,
        NewsAds,
        BBreadcrumb,
        Slider
    },

    data() {
        return {
            webinars: [],
            slideCardCount: isMobile ? 1:4,
            showLoader: true
        };
    },

    methods: {
        getAllWebinars() {
            WebinarService.getAll().then(webinars => {
                this.webinars = webinars;
            }).finally(() => {
                this.showLoader = false;
            });
        },

        noImage:function() {
            this.onerror=null;
            this.src='https://via.placeholder.com/150/000000/FFFFFF/?text=No Image Available'
        },

        downloadFile({id, filename}) {

            WebinarService.downloadFile(id).then(data => {
                
                if(!data) {
                    return;
                }

                if(lodashGet(data, 'response.status') === 403) {

                    const message = "Your Account is not allowed to download this file. Kindly contact us, if you want to have access.";
                    window.$toasted.error(message, {
                        position: 'bottom-right',
                        duration: 4000
                    });

                    return false;

                }

                const url = window.URL.createObjectURL(new Blob([data] ));
                const link = document.createElement('a');
                link.href = url;
                link.style.display='none';
                link.setAttribute('download', filename); //or any other extension
                document.body.appendChild(link);
                link.click();
            });
        }
    },

    mounted() {
        this.getAllWebinars();
    },

    watch: {
        "$route.params.slug": {
            immediate: true,
            handler(value) {
                this.getAllWebinars();
            }
        }
    },

    computed: {
        breadcrumbs() {
            let menu = this.$store.state.app.navMenu;
            let currentMenu = menu.filter(m => "/webinar" === m.url);
            if (currentMenu.length > 0) {
                const breadcrumbs = currentMenu[0].breadcrumbs;
                return [
                    ...breadcrumbs,
                    {
                        text: this.webinar.title,
                        to: `/webinar/${this.webinar.slug}`
                    }
                ];
            }
            return [];
        },

        webinar() {
            let webinar = this.webinars.filter(
                w => w.slug === this.$route.params.slug
            );
            return webinar.length > 0 ? webinar[0] : {};
        },

        moreWebinars() {
            return this.webinars.filter(
                w => w.slug !== this.$route.params.slug
            );
        },

        isLoggedIn() {
            return this.$store.state.session.isLoggedIn;
        }
    }
};
</script>