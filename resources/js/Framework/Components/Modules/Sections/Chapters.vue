<template>
    <div class="container container-lg" id="chapters">
        <div class="row">
            <div class="col-md-5 mb-5 mb-md-0 mt-5" v-html="content"></div>
            <div class="col-md-7 mb-5 mb-lg-0 pb-5">
                <div class="card card-lift--hover shadow border-0">
                    <div class="card-body row">
                        <div class="col-lg-4">
                            <h3>Luzon</h3>
                            <p
                                :key="key"
                                v-for="(place, key) in Luzon"
                                @click="showInfo(place)"
                                :class="{'text-info': place.content}"
                            >
                                <i class="text-success fa fa-map-marker"></i>
                                {{place.name}}
                            </p>
                        </div>
                        <div class="col-lg-4">
                            <h3>Visayas</h3>
                            <p
                                :key="key"
                                v-for="(place, key) in Visayas"
                                :class="{'text-info': place.content}"
                                @click="showInfo(place)"
                            >
                                <i class="text-default fa fa-map-marker"></i>
                                {{place.name}}
                            </p>
                        </div>
                        <div class="col-lg-4">
                            <h3>Mindanao</h3>
                            <p
                                :key="key"
                                v-for="(place, key) in Mindanao"
                                :class="{'text-info': place.content}"
                                @click="showInfo(place)"
                            >
                                <i class="text-warning fa fa-map-marker"></i>
                                {{place.name}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Card from "~/Framework/Plugins/Argon/Components/Card";
import TabPane from "~/Framework/Plugins/Argon/Components/Tabs/TabPane";
import Tabs from "~/Framework/Plugins/Argon/Components/Tabs/Tabs";

import PageService from "~/Application/Services/Page";
import ChaptersService from "~/Application/Services/Chapters";

export default {
    name: "Chapters",
    components: {
        Card,
        TabPane,
        Tabs
    },

    methods: {
        showInfo(place) {
            if (!place.content) {
                return;
            }
            this.$store.dispatch("intent/showGenericModal", {
                title: place.name,
                content: place.content,
                large: true
            });
        }
    },

    data() {
        return {
            chapters: [],
            content: ""
        };
    },

    mounted() {
        PageService.get("chapters-section").then(
            ({ content }) => (this.content = content)
        );
        ChaptersService.getAll().then(chapters => (this.chapters = chapters));
    },

    computed: {
        Luzon() {
            return this.chapters.filter(({ group }) => group === "Luzon");
        },
        Visayas() {
            return this.chapters.filter(({ group }) => group === "Visayas");
        },
        Mindanao() {
            return this.chapters.filter(({ group }) => group === "Mindanao");
        }
    }
};
</script>