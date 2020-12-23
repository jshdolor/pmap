<template>
    <section v-if="content && services.length > 0">
        <SectionHeader id="services"></SectionHeader>
        <div class="container" :class="isMobileDevice ? 'mt--350' : 'mt--500'">
            <span v-html="content"></span>
            <div class="row mb-lg justify-content-center">
                <a href="javascript:void(0)" class="card-front col-lg-3 my-2 mx-3" @click="goToService(service.url)" v-for="(service, i) in services" :key="i">
                    <Card shadow >
                        <div class="float-right fa-4x" :class="service.icon"></div>
                        <div class="title" v-text="service.title"></div>
                    </Card>
                </a>
            </div>
        </div>
    </section>
</template>

<script>
import { isMobile } from "mobile-device-detect";

import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import SectionHeader from "~/Framework/Components/Atomic/SectionHeader";
import ServicesOfferedService from "~/Application/Services/ServicesOffered";
import PageService from "~/Application/Services/Page";

import { objFetchByKey } from "~/Framework/Helpers";

export default {
    name: "ServicesSection",
    components: {
        SectionHeader,
        Button,
        Card
    },
    data() {
        return {
            services: [],
            content: false,
            isMobileDevice: isMobile
        };
    },
    methods: {
        showService(id) {
            let imageTag = `<img src='${this.services[id].image}' class="img-fluid">`;

            let data = {
                title: "<b>SERVICES</b>: " + this.services[id].title,
                content: imageTag + this.services[id].description
            };
            this.$store.dispatch("intent/showGenericModal", data);
        },
        getServices() {
            PageService.get("services-section").then(
                ({ content }) => (this.content = content)
            );

            ServicesOfferedService.getAll().then(
                services => (this.services = services)
            );
        },
        goToService(path) {

            if(path.indexOf('http') > -1) {
                window.open(path);
                return;
            }

            this.$router.replace(path);
        }
    },
    mounted() {
        this.getServices();
    }
};
</script>