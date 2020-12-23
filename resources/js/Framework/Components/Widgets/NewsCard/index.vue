<template>
    <Card :shadow="withShadow" class="mb-5" :class="withMargin ? 'mx-5':''"  body-classes="py-4">
        <img v-on:error='removeElement' :src="news.image" class="news-image img-fluid" slot="outside-body"/>
        <h6 class="text-primary text-uppercase" v-html="news.title"></h6>
        <small><h6 class="text-muted" v-text="news.createdAt"></h6></small>
        <p class="description mt-3" v-html="trimString(removeTags(news.body), 100, true)"></p>
        <div>
            <Badge
                v-for="(cat,i) in news.metaKeywords"
                :key="i"
                type="primary"
                rounded
                v-html="cat"
            ></Badge>
        </div>
        <Button @click="showFullNews" tag="a" href="#" type="primary" class="mt-4">Read More</Button>
    </Card>
</template>

<script>
import Card from "~/Framework/Plugins/Argon/Components/Card";
import Badge from "~/Framework/Plugins/Argon/Components/Badge";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

import { 
    trimString,
    removeTags
} from "~/Framework/Helpers/String";


export default {
    name: "NewsCard",

    components: {
        Card,
        Badge,
        Button
    },

    methods: {
        showFullNews() {

            let {
                title,
                image,
                createdAt,
                body
            } = this.news;

            let content = `
                <img src="${image}" class="img-fluid" style="max-height: 250px">
                <h4>${title}<br><small>${createdAt}</small></h4>
                <p class="lead">${body}</p>
            `;


            let data = {
                content: content,
                large: true
            }
            this.$store.dispatch('intent/showGenericModal', data);
        },
        trimString,
        removeTags,
        removeElement(el) {
            el.target.src ="https://dummyimage.com/600x400/000/fff&text=No+Image";
        }
    },

    props: {
        news: {
            required: true
        },
        withMargin: {
            default: false
        },
        withShadow: {
            default:true
        }
    }
};
</script>