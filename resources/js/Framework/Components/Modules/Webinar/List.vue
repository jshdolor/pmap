<template>
    <section id="webinarPage">
        <SectionHeader></SectionHeader>
        <div class="container mt--400 header-margin">
            
            <div class="row">
                <div class="col-lg-12">
                    <Card shadow class="mb-4">
                        <BBreadcrumb :items="breadcrumbs" v-if="breadcrumbs.length > 0"></BBreadcrumb>
                        <div v-html="pageContent"></div>
                    </Card>
                    
                    <div >
                        <Loader :show="filteredList.length === 0 && !NoWebinars" />

                        <div class="row">
                            <div class="col-md-6">
                                <h2 class="display-3 text-primary">WEBINARS</h2>
                            </div>
                            <div class="col-md-6 text-right">
                                <input class="form-control" placeholder="Search" @input="updateFilteredList" v-model="filterKey">
                            </div>
                        </div>

                        <div class="row" v-if="filteredList.length > 0">
                            <div :key="k" class="col-md-4 col-lg-4 col-sm-6 col-xs-12" v-for="(item, k) in webinarList">
                                <router-link :to="item.path">
                                <WebinarCard
                                    class="my-3"
                                    :image="item.videoThumbnail"
                                    :date="item.date"
                                    :title="item.title"
                                />
                                </router-link>
                            </div>

                            <div class="col-md-12">
                                <Pagination
                                    v-if="pageCount > 1"
                                    :page-count="pageCount"
                                    v-model="currentPage"
                                    align="center"
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div class="col-lg-4 d-none">
                    <NewsAds :withShadow="false" :perPage="2" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import WebinarService from "~/Application/Services/Entities/Webinar";
import PageService from "~/Application/Services/Page";


import SectionHeader from "~/Framework/Components/Atomic/SectionHeader";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Loader from "~/Framework/Components/Atomic/Loader";
import NewsAds from "~/Framework/Components/Widgets/NewsSlide";
import { BBreadcrumb } from 'bootstrap-vue';

import WebinarCard from '~/Framework/Components/Widgets/GenericDisplayCard';
import Pagination from "~/Framework/Plugins/Argon/Components/BasePagination";

import Config from "~/Application/Config";


import { groupBy } from "~/Framework/Helpers";

import { format } from "date-fns";

export default {
    name: "WebinarListPage",

    components: {
        SectionHeader,
        Card,
        Button,
        Loader,
        NewsAds,
        WebinarCard,
        BBreadcrumb,
        Pagination
    },

    data() {
        return {
            webinars: [],
            pageContent: "",
            showLoader: true,
            filteredList: [],
            NoWebinars: false,
            perPage: Config.webinarPerPage,
            filterKey: '',
            currentPage: 1,
        };
    },
    methods: {
        getAllWebinars() {
            WebinarService.getAll().then(webinars => {
                this.webinars = webinars
                this.filteredList = this.webinars;
                this.NoWebinars = webinars.length === 0;
            })
        },

        updateFilteredList() {
            this.currentPage = 1;
            if(this.filterKey.length === 0) {
                this.filteredList = this.webinars;
                return;
            }
            this.filteredList = this.filteredList.filter(v =>{
                return v.title.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1;
            });
        },

        getContent() {
            PageService.get('webinar-page').then(page => {
                this.pageContent = page.content;
            });
        },
        
        format,

    },

    mounted() {
        this.getAllWebinars();
        this.getContent();
    },

    computed: {
        webinarList() {
            return this.filteredList.filter((v,index) => {
                return (index >= ((this.currentPage * this.perPage) - this.perPage)) 
                    && 
                    ((index + 1) <= (this.currentPage * this.perPage));
            });
        },
        pageCount() {
            return Math.ceil(this.filteredList.length / this.perPage);
        },
        breadcrumbs() {
            let menu = this.$store.state.app.navMenu
            let currentMenu = menu.filter(m => this.$route.path === m.url);
            if(currentMenu.length > 0) {
                return currentMenu[0].breadcrumbs;
            }
            return [];
        }
    },

};
</script>