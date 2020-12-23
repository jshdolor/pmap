<template>
    <section
        id="sponsors"
        class="section section-lg section-shaped my-0 overflow-hidden"
        v-if="content && sponsors.length > 0"
    >

        <div class="shape shape-style-3 bg-pmapAccent shape-skew">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container  pt-lg pb-300">
            <span v-html="content"></span>
            <div class="row justify-content-md-center">
                <div
                    class="col-md-10 col-lg-10 mb-5 mb-lg-0"
                    v-for="(group,i) in groupedSponsors"
                    :key="i"
                >
                    <h4 class="pt-3 text-center lead sponsor-group text-white" v-text="i"></h4>
                    <div class="row justify-content-md-center">
                        <div
                            class="col-sm-6 col-xs-6 col-md-3 col-lg-3 mb-3 mb-lg-0"
                            v-for="(sponsor,i) in group"
                            :key="i"
                        >
                            <div class="">
                                <a target='_blank' :href="sponsor.link">
                                <img
                                    :src="sponsor.image"
                                    class="my-1 px-1 rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import SponsorService from "~/Application/Services/Sponsors";
import PageService from "~/Application/Services/Page";
import CategorySponsorService from "~/Application/Services/CategorySponsors";

import button from "~/Framework/Plugins/Argon/Components/BaseButton";

export default {
    name: "SponsorsSection",
    components: {
        "base-button": button
    },

    methods: {},

    computed: {
        groupedSponsors() {
            let groupedSponsors = {};
            let sponsors = null;
            for (let group of this.sponsorCategory) {
                sponsors = this.sponsors.filter(s => s.categoryId === group.id).sort((a,b) => a.priority > b.priority);
                if (sponsors.length > 0) {
                    groupedSponsors[group.name] = this.sponsors.filter(
                        s => s.categoryId === group.id
                    );
                }
            }
            return groupedSponsors;
        }
    },

    data() {
        return {
            sponsors: [],
            content: false,
            sponsorCategory: []
        };
    },

    mounted() {
        SponsorService.getAll().then(sponsor => {
            this.sponsors = sponsor;
        });

        CategorySponsorService.getAll().then(group => {
            this.sponsorCategory = group;
        });

        PageService.get("sponsors-section").then(
            ({ content }) => (this.content = content)
        );
    }
};
</script>