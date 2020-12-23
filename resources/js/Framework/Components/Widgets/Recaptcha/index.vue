<template>
    <vue-recaptcha
        ref="recaptcha"
        @verify="onCaptchaVerified"
        @expired="onCaptchaExpired"
        size="invisible"
        :sitekey="siteKey"
    ></vue-recaptcha>
</template>

<script>
import Config from "~/Application/Config";
import VueRecaptcha from "vue-recaptcha";
export default {
    components: {
        VueRecaptcha
    },
    methods: {
        onCaptchaVerified(recaptchaToken) {
            this.$emit('verified', recaptchaToken);
            this.$refs.recaptcha.reset();
        },
        onCaptchaExpired: function() {
            this.$refs.recaptcha.reset();
        },
        run() {
            this.$refs.recaptcha.execute();
        }
    },
    data() {
        return {
            siteKey: Config.googleSiteKey
        };
    }
};
</script>