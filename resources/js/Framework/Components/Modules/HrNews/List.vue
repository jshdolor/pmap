<template>
    <div class="hr-news-list" >
        <SectionHeader />
        <div class="container mt--400 header-margin">
            <div class="row">
                <div class="col-md-6">
                    <h2 class="display-3 text-white">HR NEWS</h2>
                </div>
                <div class="col-md-6 text-right">
                    <input class="form-control" placeholder="Search" @input="updateFilteredList" v-model="filterKey">
                </div>
            </div>

            <Loader :show="hrNews.length === 0 && !NoHrNews" />

            <div class="row" v-if="filteredList.length > 0">
                <div :key="k" class="col-md-4 col-lg-4 col-sm-6 col-xs-12" v-for="(item, k) in hrNewsList">
                    <router-link :to="item.path">
                    <HrNewsCard
                        class="my-3"
                        :image="item.image"
                        :date="item.eventDate"
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

            <div v-if="NoHrNews" 
                        class="my-3 text-center"
                        id="not-found"
            >
                <Card shadow style class="py-5">
                    <div class="row align-items-center">
                        <div class="col-lg-6 text-right">
                            <img src="/images/404.png" style="max-height:300px" class="img-fluid" />
                        </div>
                        <div class="col-lg-6 ">
                            <h1 class="pt-5">
                                Oops....
                                <br />
                                <span class="lead text-muted">No HR News Yet</span>
                            </h1>
                            <router-link class="mb-5 btn btn-primary btn-lg" to="/">Back to Home</router-link>
                        </div>
                    </div>
                </Card>
            </div>
            
            
            
        </div>
    </div>
    
</template>

<script>

import Config from "~/Application/Config";

import SectionHeader from "~/Framework/Components/Atomic/SectionHeader";
import Pagination from "~/Framework/Plugins/Argon/Components/BasePagination";

import HrNewsService from "~/Application/Services/HrNews";
import HrNewsCard from '~/Framework/Components/Widgets/GenericDisplayCard';
import Card from '~/Framework/Plugins/Argon/Components/Card';
import Loader from "~/Framework/Components/Atomic/Loader";

export default {
    name: 'HrNewsList',

    components: {
        HrNewsCard,
        SectionHeader,
        Pagination,
        Card,
        Loader
    },

    data() {
        return {
            hrNews: [],
            currentPage: 1,
            perPage: Config.hrNewsPerPage,
            filteredList: [],
            NoHrNews: false,
            filterKey: ''
        }
    },  
    methods: {
        getHrNews() {
            HrNewsService.getAll().then(hrNews => {
                this.hrNews = hrNews;
                this.filteredList = this.hrNews;
                this.NoHrNews = hrNews.length === 0;
            })
        },

        updateFilteredList() {

            this.currentPage = 1;

            if(this.filterKey.length === 0) {
                this.filteredList = this.hrNews;
                return;
            }

            this.filteredList = this.filteredList.filter(v =>{
                return v.title.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1;
            });

        }
       
    },

    computed: {
        hrNewsList() {
            return this.filteredList.filter((v,index) => {
                return (index >= ((this.currentPage * this.perPage) - this.perPage)) 
                    && 
                    ((index + 1) <= (this.currentPage * this.perPage));
            });
        },
        pageCount() {
            return Math.ceil(this.filteredList.length / this.perPage);
        }
    },

    mounted() {
        this.getHrNews();
    }

}
</script>