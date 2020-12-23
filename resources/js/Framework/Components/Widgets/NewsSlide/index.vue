<template>
    <div>
        <Carousel
            :perPage="1"
            :paginationEnabled="false"
            :adjustableHeight="false"
            :autoplay="true"
            :loop="true"
            :autoplayTimeout="3000"
        >
            <Slide :key="i" v-for="(newsItems, i) of displayNews">
                <NewsCard
                    :withShadow="withShadow"
                    :withMargin="withMargin"
                    :key="k"
                    v-for="(newsItem, k) in newsItems"
                    :news="newsItem"
                />
            </Slide>
        </Carousel>
    </div>
</template>

<script>
import NewsService from "~/Application/Services/News";

import { Carousel, Slide } from "vue-carousel";

import NewsCard from "~/Framework/Components/Widgets/NewsCard";

export default {
    name: "NewsSlide",

    components: {
        Carousel,
        Slide,
        NewsCard,
    },

    props: {
        perPage: {
            default: 1
        },
        withMargin: {
            default: false
        },
        withShadow: {
            default: true
        }
    },

    data() {
        return {
            news: []
        };
    },

    computed: {
        displayNews() {
            let newsArr = [];
            let newsObjArr = [];

            this.news.forEach((news, i) => {
                newsArr.push(news);

                if ((i + 1) % this.perPage === 0) {
                    newsObjArr.push(newsArr);
                    newsArr = [];
                }
            });

            return newsObjArr;
        }
    },

    methods: {
        getNews() {
            NewsService.getAll().then(news => (this.news = news));
        }
    },

    mounted() {
        this.getNews();
    }
};
</script>