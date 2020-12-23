<template>
    <header class="header-global">
        <Navigation ref="nav" class="navbar-main" topFix type effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                <Logo></Logo>
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <router-link to="/">
                        <Logo></Logo>
                    </router-link>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>

            <NavMenu></NavMenu>
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item d-lg-block ml-lg-4" v-if="!hasCredentials">
                    <a class="btn btn-pmapAccent btn-icon text-white" signup v-auth-required>
                        <span class="btn-inner--icon">
                            <i class="fa fa-user mr-2"></i>
                        </span>
                        <span class="nav-link-inner--text">Join Us</span>
                    </a>
                    <a class="btn btn-neutral btn-icon" v-auth-required>
                        <span class="btn-inner--icon">
                            <i class="fa fa-sign-in mr-2"></i>
                        </span>
                        <span class="nav-link-inner--text">Login</span>
                    </a>
                </li>
                <li class="nav-item d-lg-block ml-lg-4" v-else>
                    <router-link to="/user" class="btn btn-primary btn-icon text-white"  >
                        <span class="btn-inner--icon">
                            <i class="fa fa-user mr-2"></i>
                        </span>
                        <span class="nav-link-inner--text" v-text="memberName"></span>
                    </router-link>
                    <a class="btn btn-pmapAccent btn-icon text-white"  @click="logout">
                        <span class="btn-inner--icon">
                            <i class="fa fa-sign-out mr-2"></i>
                        </span>
                        <span class="nav-link-inner--text">Logout</span>
                    </a>
                </li>
            </ul>
        </Navigation>
    </header>
</template>
<script>
import Navigation from "~/Framework/Components/Navigation";
import NavMenu from "~/Framework/Components/Layout/NavigationMenu";
import Dropdown from "~/Framework/Components/Widgets/Dropdown";
import CloseButton from "~/Framework/Components/Widgets/CloseButton";
import Logo from "~/Framework/Components/Atomic/Logo";

import ProgressBar from "~/Framework/Plugins/Argon/Components/BaseProgress";

import { isMobile } from "mobile-device-detect";

export default {
    components: {
        Navigation,
        CloseButton,
        Dropdown,
        Logo,
        NavMenu,
        ProgressBar
    },

    data() {
        return {
            classTogglers: ["affix", "bg-white", "navbar-light", "shadow-lg"],
            shrinkRouteMap: [
                'gallery-route'
            ]
        };
    },

    methods: {
        logout() {
            this.$store.dispatch('session/setAuth', {});
            this.$toasted.info('Logging out...', {position: 'bottom-right'}).goAway(3000);
            this.$root.$emit('reload-page');
        },

        attachNavShrinker() {

            window.onscroll = () => {
                if (window.pageYOffset > 10 || this.shrinkRouteMap.indexOf(this.$route.name) > -1) {
                    this.shrinkNav();
                } else {
                    this.unShrinkNav();
                }
            };
        },
        shrinkNav() {
            let nav = this.$refs.nav;
            this.classTogglers.forEach(cls => nav.$el.classList.add(cls));
        },
        unShrinkNav() {
            let nav = this.$refs.nav;
            this.classTogglers.forEach(cls => nav.$el.classList.remove(cls));
        },

        headerBehavior() {
            if (isMobile) {
                this.shrinkNav();
                document.querySelector("body").style.paddingTop = "53px";
            } else {
                this.attachNavShrinker();
            }
        }
    },

    watch: {
        $route: {
            handler(to, from) {
                if(this.shrinkRouteMap.indexOf(to.name) > -1) {
                    this.shrinkNav();
                } else {
                    if (window.pageYOffset > 10) {
                        this.shrinkNav();
                    } else {
                        this.unShrinkNav();
                    }
                }
            }
        }
    },

    computed: {
        hasCredentials() {
            return this.$store.state.session.isLoggedIn;
        },
        memberDetails() {
            return this.$store.state.profile.profile;
        },
        memberName() {
            return this.memberDetails.fullName;
        }
    },

    mounted() {
        this.headerBehavior();
    }
};
</script>
<style>
</style>
