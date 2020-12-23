<template>
    <form @submit.prevent="submit" class="form-signup" novalidate>
        <Input
            class="mb-3"
            v-model.trim="form.name"
            placeholder="Name"
            addon-left-icon="ni ni-circle-08"
            :error="isValid.name.message || apiErrors.name"
            required
        />
        <Input
            class="mb-3"
            v-model.trim="form.email"
            placeholder="Email"
            addon-left-icon="ni ni-email-83"
            :error="isValid.email.message || apiErrors.email"
            required
        />
        <Input
            type="password"
            v-model.trim="form.password"
            placeholder="Password"
            addon-left-icon="ni ni-lock-circle-open"
            :error="isValid.password.message || apiErrors.password"
            required
        />
        <Input
            type="password"
            v-model.trim="form.confirm_password"
            placeholder="Confirm Password"
            addon-left-icon="ni ni-lock-circle-open"
            :error="isValid.confirm_password.message || apiErrors.confirm_password"
            required
        />
        <Checkbox class="ml-2 mb-3" v-model="agreement[0]">
            I accept the
            <a href="#" @click="goTo('privacy-disclaimer')">terms and conditions</a> of PMAP
        </Checkbox>
        <Checkbox
            class="ml-2 mb-3"
            v-model="agreement[1]"
        >I agree to the processing of my personal data in adherence with the Privacy Notice</Checkbox>
        <Checkbox
            class="ml-2 mb-3"
            v-model="agreement[2]"
        >I want to receive Marketing Promotional campaigns</Checkbox>
        <div class="text-center">
            <Button
                type="primary"
                native-type="submit"
                class="my-4"
                :disabled="isFormLoading || !(agreement.every(a => a))"
            >
                <span class="fa fa-spin fa-spinner" v-show="isFormLoading"></span>
                Signup
            </Button>
        </div>
        <div class="text-center">
            <Button
                type="danger"
                v-if="showHelp"
                @click="goTo('unsuccessful-registration')"
            >Problems with registration?</Button>
        </div>
    </form>
</template>

<script>
import Input from "~/Framework/Plugins/Argon/Components/BaseInput";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Checkbox from "~/Framework/Plugins/Argon/Components/BaseCheckbox";

import SignupRequest from "~/Application/Services/Signup/Requests/SignupRequest";
import SignupService from "~/Application/Services/Signup";

import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validate } from "~/Framework/Helpers/Validation";

export default {
    name: "SignupForm",

    components: {
        Button,
        Input,
        Checkbox,
    },

    mixins: [validationMixin],

    validations: {
        form: {
            email: {
                required,
                email,
            },
            password: {
                required,
            },
            confirm_password: {
                required,
            },
            name: {
                required,
            },
        },
    },

    data() {
        return {
            form: {
                email: "",
                password: "",
                name: "",
                confirm_password: "",
            },
            apiErrors: {},
            isFormLoading: false,
            agreement: [false, false, false],
            showHelp: false,
        };
    },

    methods: {
        goTo(path) {
            if (this.$route.path !== path) {
                this.$router.replace(`/page/${path}`);
            }
            this.$emit("close");
        },
        reset() {
            this.form = {
                email: "",
                password: "",
                name: "",
                confirm_password: "",
            };
            this.apiErrors = {};
        },
        submit() {
            this.$v.$touch();

            if (this.$v.form.$invalid) {
                return false;
            }

            let request = new SignupRequest(this.form);

            this.isFormLoading = true;

            SignupService.handle(request)
                .then((response) => {
                    if (response.exception) {
                        this.apiErrors = response.getErrorMessages();
                        this.showHelp = true;
                        return;
                    }

                    this.$store.dispatch("intent/hideSignupModal", true);

                    this.$toasted.success(
                        "Signup Successful! Please check your email for account activation",
                        { duration: 2500, position: "bottom-right" }
                    );

                    this.reset();
                    // this.$root.$emit('reload-page', true);
                })
                .finally(() => (this.isFormLoading = false));
        },
    },

    computed: {
        isValid() {
            return validate(this.$v.form);
        },
    },
};
</script>