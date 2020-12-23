<template>
    <section  id="eventPage">
        <SectionHeader bg="bg-pmapAccent"></SectionHeader>
        <div class="container mt--400">

            <Loader :show="!noHrNewsData && Object.keys(data).length === 0"/>

            <div class="row">
                <div class="col-lg-8">
                    <Card shadow v-if="Object.keys(data).length !== 0">

                        <img class="img-fluid img-max-width" :src="data.image" />
                        <div class="row">
                            <div class="col-md-12 mt-3">
                                <h4 class="display-3" >
                                    {{data.title}}
                                    <small class="text-muted lead sub-display-3" v-html="data.eventDate"></small>
                                </h4>
                                <p class="lead mt-0 mb-3" v-html="data.subtitle"></p>

                            </div>
                            <div class="col-md-6">
                            </div>
                        </div>


                        <p v-html="data.body"></p>
                    </Card>

                    <div v-if="noHrNewsData" class="text-center" id="not-found">
                        <Card shadow style class="py-5">
                            <div class="row align-items-center">
                                <div class="col-lg-6 text-right">
                                    <img src="/images/404.png" style="max-height:300px" class="img-fluid" />
                                </div>
                                <div class="col-lg-6 ">
                                    <h1 class="pt-5">
                                        Oops....
                                        <br />
                                        <span class="lead text-muted">HR News Not Found</span>
                                    </h1>
                                    <router-link class="mb-5 btn btn-primary btn-lg" to="/hr-news">Back to HR News</router-link>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div class="col-lg-4">
                    <NewsAds :withShadow="false" :perPage="2"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SectionHeader from "~/Framework/Components/Atomic/SectionHeader";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Loader from "~/Framework/Components/Atomic/Loader";
import HrNewsService from "~/Application/Services/HrNews";
import NewsAds from "~/Framework/Components/Widgets/NewsSlide";


export default {
    name: 'HrNews',

    components: {
        SectionHeader,
        Card,
        Button,
        Loader,
        NewsAds
    },

    data() {
        return {
            data: {},
            noHrNewsData: false
        }
    },

    methods: {
        getHrNews(slug) {
            HrNewsService.getAll().then(hrNews => {

                this.data = {};
                if(hrNews.filter(v => v.slug === slug).length > 0) { 
                    this.data = hrNews.filter(v => v.slug === slug)[0];
                }

                this.noHrNewsData = Object.keys(this.data).length === 0;
            })
        },
    },

    watch: {
        "$route.params.slug": {
            immediate: true,
            handler(newVal, oldVal) {
                this.getHrNews(newVal);
            }
        },
    },

    mounted() {
        // this.getHrNews();
    }
}
</script>