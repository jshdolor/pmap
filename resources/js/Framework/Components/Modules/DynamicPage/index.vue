<template>
    <section v-if="content" id="dynamic-page">
        <SectionHeader ref="header">
        </SectionHeader>
        <div class="container-fluid mt--400 header-margin">
            <div class="row">
                <div class="col-lg-8">
                    <Card shadow >
                        <BBreadcrumb :items="breadcrumbs" v-if="breadcrumbs.length > 0"></BBreadcrumb>
                        <div class=""  v-html="content"></div>
                    </Card>
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
import NewsAds from "~/Framework/Components/Widgets/NewsSlide";
import Card from "~/Framework/Plugins/Argon/Components/Card";

import PageService from "~/Application/Services/Page";
import PageModel from "~/Application/Models/Page";

import { BBreadcrumb } from 'bootstrap-vue';

export default {
    name: "DynamicPage",
    data() {
        return {
            title: "",
            content: "",
            slug: "",
            breadcrumbs: []
        };
    },

    components: {
        SectionHeader,
        Card,
        NewsAds,
        BBreadcrumb
    },

    methods: {
        getPage() {
            this.slug = this.$route.params.slug;

            PageService.get(this.slug).then(page => {

                if(page instanceof PageModel) {
                    this.title = page.title;
                    this.content = page.content;
                    return;
                }
                
                if(page.getStatus() === 404) {

                    this.$toasted.error('Page Not Found', {position: 'bottom-right', duration:2500});
                    setTimeout(() => {
                        this.$root.$emit('reload-page' ,'/');
                    }, 2000)
                }
                
            });
        },

        getPageBreadcrumb(data) {
            let currentMenu = data.filter(m => this.$route.path === m.url);
            if(currentMenu.length > 0) {
                this.breadcrumbs = currentMenu[0].breadcrumbs;
            }
        }
    },

    watch: {
        "$route.params.slug"(newVal, oldVal) {
            this.getPage();
            this.$refs.header.initComponents();
            this.getPageBreadcrumb(this.$root.navMenu);
        }
    },

    mounted() {
        this.getPage();
        if(this.$root.navMenu) {
            this.getPageBreadcrumb(this.$root.navMenu);
        }
        this.$root.$on('setNavMenu', data => {
            this.getPageBreadcrumb(data);
        })

        
    }
};
</script>