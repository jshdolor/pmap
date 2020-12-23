<template>
    <div class="profile-page" id="profile-page">
        <SectionHeader></SectionHeader>
        <section class="section section-skew bg-white">
            <div class="container">
                <div class="row header-margin">
                    <div class="col-lg-8">
                        <Card shadow class="" no-body>
                            <div class=" card-profile px-4">
                                <div class="row justify-content-center">
                                    <div class="col-lg-3 order-lg-2">
                                        <ProfileImage :image="profile.avatar"/>
                                    </div>
                                    <div class="col-lg-4 order-lg-1">
                                        <div class="card-profile-stats d-flex justify-content-center">
                                            <div>
                                                <span class="heading">0</span>
                                                <span class="description">Points</span>
                                            </div>
                                            <div>
                                                <span class="heading" v-html="userEventCount">0</span>
                                                <span class="description">Events</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 order-lg-3">
                                        <div class="card-profile-stats d-flex justify-content-center" v-if="profile.isMember">
                                            <div>
                                                <span class="heading" v-text="profile.memberSince"></span>
                                                <span class="description">Member Since</span>
                                            </div>
                                        </div>
                                        <div class="card-profile-stats d-flex justify-content-center" v-else>
                                            <div>
                                                <span class="heading text-danger">Pending</span>
                                                <span class="description text-danger">Member Status</span>
                                            </div>
                                        </div>
                                        <div class="card-profile-stats d-flex justify-content-center" v-if="profile.isMember">
                                            <div>
                                                <span class="heading" v-text="profile.memberType"></span>
                                                <span class="description">Member type</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center mt-5">
                                    <h3 v-if="profile.name" v-text="profile.name"></h3>
                                    <div class="h6 font-weight-300" v-text="profile.completeAddress"></div>
                                </div>
                            </div>
                        </Card>
                        <router-view></router-view>
                    </div>
                    <div class="col-lg-4">
                        <UserDashboard />
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import SectionHeader from "~/Framework/Components/Atomic/SectionHeader";

import Card from "~/Framework/Plugins/Argon/Components/Card";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

import UserDashboard from "~/Framework/Components/Widgets/UserDashboard";

import ProfileService from "~/Application/Services/Profile";
import ProfileImage from '~/Framework/Components/Widgets/ProfileImage';

import { isMobile } from 'mobile-device-detect';


export default {
    name: "UserPage",
    components: {
        SectionHeader,
        Card,
        Button,
        UserDashboard,
        ProfileImage
    },
    data() {
        return {
            userEvents: [],
            isMobile
        };
    },
    methods: {

},

    computed: {
        profile() {
            return this.$store.state.profile.profile;
        },
        userEventCount() {
            return this.userEvents.length;
        }
    },

    mounted() {
        ProfileService.getRegisteredEvents().then(events => this.userEvents = events);
    }
};
</script>
