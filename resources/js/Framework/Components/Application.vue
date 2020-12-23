<template>
    <div id="app">
        <AppHeader></AppHeader>
        <main class="main-content" ref="mainPage">
            <router-view></router-view>
        </main>
        <AppFooter></AppFooter>

        <!-- modals -->
        <LoginModal></LoginModal>
        <SignupModal />
        <GenericModal></GenericModal>
        <ForgotPasswordModal></ForgotPasswordModal>
    </div>
</template>

<script>
import AppHeader from "~/Framework/Components/Layout/AppHeader";
import AppFooter from "~/Framework/Components/Layout/AppFooter";

import LoginModal from "~/Framework/Components/Modals/Login";
import SignupModal from "~/Framework/Components/Modals/Signup";
import ForgotPasswordModal from "~/Framework/Components/Modals/ForgotPassword";
import GenericModal from "~/Framework/Components/Modals/GenericModal";

import ProfileService from "~/Application/Services/Profile";
import ErrorMessagesService from "~/Application/Services/ErrorMessages";

import { isMobile } from "mobile-device-detect";

import CookieManager from "~/Infrastructure/Cookies";

export default {
    name: "PmapApp",

    components: {
        AppHeader,
        AppFooter,
        LoginModal,
        SignupModal,
        GenericModal,
        ForgotPasswordModal
    },

    data() {
        return {
            loaderTimer: null
        };
    },

    methods: {
        getSettings() {
            let externalScript = document.createElement("script");
            externalScript.innerHTML = window.site_setting.external_script;
            document.querySelector("body").append(externalScript);
        },

        reloadPage(path = null) {
            let route = this.$router.currentRoute;
            if (path) {
                location.href = path;
                return;
            }
            location.href = route.path;
        },

        fetchProfile() {
            ProfileService.get().then(data => {
                this.$store.dispatch("profile/setProfile", data);
                this.$root.$emit("user-fetched");
            });
        },

        sectionDisplay() {
            let { path, hash } = this.$route;

            if (path !== "/") {
                this.$router.push("/");
                this.$router.replace({ path, hash });
            } else {
                this.$router.push("/about-us");
                this.$router.replace({ path, hash });
            }
        },

        setRouter() {
            //new tab solution
            this.$router.beforeEach((to, from, next) => {
                /* must call `next` */
                if (to.query.tab) {
                    window.open(to.path.substr(1), "_blank");
                    return;
                }

                if (isMobile) {
                    console.log(to);
                }

                next();
            });
        },

        privacyPrompt() {
            if (CookieManager.get("a-p-p")) {
                return;
            }

            this.$toasted.info(
                "We use cookies to offer you a better browsing experience. By continuing to use our website, you consent to the use of these cookies.",
                {
                    // you can pass a single action as below
                    action: {
                        text: "Accept",
                        onClick: (e, toastObject) => {
                            toastObject.goAway(0);
                            CookieManager.set("a-p-p", true);
                        }
                    },
                    position: "bottom-right"
                }
            );
        }
    },

    computed: {
        isLoggedIn() {
            return this.$store.state.session.isLoggedIn;
        }
    },

    mounted() {
        window.$toasted = this.$toasted;
        this.$root.$on("reload-page", this.reloadPage);
        ErrorMessagesService.getAll().then(r =>
            this.$store.dispatch("localization/setLocalization", r)
        );

        this.sectionDisplay();

        if (this.isLoggedIn) {
            this.fetchProfile();
        }

        this.setRouter();

        this.privacyPrompt();

        this.getSettings();

        this.$root.$on("setNavMenu", data => {
            this.$root.navMenu = data;
        });
    }
};
</script>