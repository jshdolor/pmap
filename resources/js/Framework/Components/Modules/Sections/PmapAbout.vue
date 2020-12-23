<template>
    <section class="section section-skew bg-white">
        <div class="container">
            <card shadow class="card-profile mt--400" no-body>
                <div class="px-4">
                    <div class="row justify-content-center">
                        <div class="col-lg-3 order-lg-2">
                            <div class="card-profile-image">
                                <a href="#">
                                    <img
                                        :src="logo"
                                        style="
                                            height: 200px;
                                            width: 200px;
                                        "      
                                        class="shadow rounded-circle about-us"
                                    />
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                            <div class="card-profile-actions py-4 mt-lg-0">
                                <router-link to="/#contact-us">
                                    <Button type="info" size="sm" class="mr-4">Message Us</Button>
                                </router-link>
                                <Button @click="showRegistration" type="default" size="sm" class="float-right">Register</Button>
                            </div>
                        </div>
                        <div class="col-lg-4 order-lg-1">
                            <div class="card-profile-stats d-flex justify-content-center"></div>
                        </div>
                    </div>
                    <div class="text-center mt-5">
                        <h3>
                            People Management Association of the Philippines
                            <br />
                            <span class="font-weight-light">(PMAP)</span>
                        </h3>
                        <div class="h6 font-weight-300">
                            <i class="ni location_pin mr-2"></i>The Premier Organization of HR Professionals and People Managers
                        </div>
                        <!-- <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i></div> -->
                        <!-- <div><i class="ni education_hat mr-2"></i></div> -->
                    </div>
                    <div class="mt-5 border-top">
                        <div class="row justify-content-center">
                            <div class="col-lg-11">
                                
                                <div v-html="content"></div>

                                <span class="row">
                                    <p class="col-lg-4" :key="k" v-for="(info, k) of moreinfoDivided">
                                        <Button
                                            block
                                            type="link"
                                            :key="i"
                                            v-for="(item, i) in info"
                                            v-html="item.name"
                                            @click="showModal(item.innerId)"
                                        ></Button>
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </card>
        </div>
    </section>
</template>
<script>
import card from "~/Framework/Plugins/Argon/Components/Card";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

import PageService from "~/Application/Services/Page";
import AboutDetailsService from "~/Application/Services/AboutDetails";


export default {
    name: "PmapAbout",
    components: {
        card,
        Button
    },

    methods: {
        showRegistration() {
            this.$store.dispatch('intent/showSignupModal');
        },
        showModal(innerId) {
            let data = {
                title: this.moreinfo[innerId].name,
                content: this.moreinfo[innerId].details,
                large: true
            }
            this.$store.dispatch('intent/showGenericModal', data);
        },

        getAboutContent() {
            PageService.get('about-us').then(page => {
                this.content = page.content;
            });

            AboutDetailsService.getAll().then(moreinfo => this.moreinfo = moreinfo);
        }
    },

    data() {
        return {
            content: "",
            logo: `/storage/${window.site_setting.site_logo_two}`,
            moreinfo : [
                
            ]
        }
    },
    computed: {
        moreinfoDivided() {
            
            let moreInfo = [];
            let moreInfoArr = [];
            
            this.moreinfo.forEach((v,k) => {

                v.innerId = k;
                moreInfoArr.push(v);

                if((k+1) % 4 === 0 || k === this.moreinfo.length-1) {
                    moreInfo.push(moreInfoArr);
                    moreInfoArr = [];
                }
            });

            return moreInfo;

        },

        moreinfoLength() {
            return this.moreinfo.length;
        }
    },

    mounted() {
        this.getAboutContent();
    }
};
</script>