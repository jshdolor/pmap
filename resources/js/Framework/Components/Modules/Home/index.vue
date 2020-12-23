<template>
    <section class="section-shaped my-0" >
        <Carousel></Carousel>
        <EventSection></EventSection>
        <WhoAreWeSection></WhoAreWeSection>
        <ServicesSection/>
        <MembershipSection></MembershipSection>
        <PartnersSection></PartnersSection>
        <ContactUsSection></ContactUsSection>
        <div class="footer-carousel">
            <SponsorsCarousel :nav="false" v-bind="sponsorBannerConfig" v-if="sponsorBanners.length">
                <BannerImage class="item" v-for="(imageSrc, k) of sponsorBanners" :key="k" :imageSrc="imageSrc"/>
            </SponsorsCarousel>
        </div>
    </section>
</template>
<script>

import Carousel from "./Carousel";

import WhoAreWeSection from "~/Framework/Components/Modules/Sections/GlimpseAboutUs";
import EventSection from "~/Framework/Components/Modules/Sections/GlimpseEvent";
import ContactUsSection from "~/Framework/Components/Modules/Sections/ContactUs";
import PartnersSection from '~/Framework/Components/Modules/Sections/Partners';
import MembershipSection from '~/Framework/Components/Modules/Sections/Membership';
import ServicesSection from '~/Framework/Components/Modules/Sections/Services';

import BannerImage from '~/Framework/Components/Widgets/SponsorBanner';
import SponsorsCarousel from "vue-tiny-slider";

import SponsorsService from "~/Application/Services/V2/Sponsors";


import BaseModule from '~/Framework/Components/Modules/BaseModule';

export default {
    name: "HomePage",
    extends: BaseModule,
    components: {
        Carousel,
        WhoAreWeSection,
        EventSection,
        PartnersSection,
        ContactUsSection,
        MembershipSection,
        ServicesSection,
        BannerImage,
        SponsorsCarousel
    },
    data() {
        return {
            sponsorBanners: [],
            sponsorBannerConfig: {
                controls: false,
                speed: 600,
                mouseDrag: true,
                autoplay: true,
                autoplayButtonOutput: false
            },
        }
    },
    methods: {
        getBannerSponsors() {
            SponsorsService.banners().then(data => {
                this.sponsorBanners = data.map(d => d.banner);
            })
        }
    },
    mounted() {
        this.getBannerSponsors();
        console.log('HelloWorld');
    }
};
</script>
