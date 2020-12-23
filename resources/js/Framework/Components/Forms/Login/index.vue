<template>
    <form @submit.prevent="submit" novalidate>
        <Input
            class="mb-3"
            v-model.trim="form.email"
            placeholder="Email"
            addon-left-icon="ni ni-email-83"
            :error="isValid.email.message"
            required
        />
        <Input
            type="password"
            v-model.trim="form.password"
            placeholder="Password"
            addon-left-icon="ni ni-lock-circle-open"
            :error="isValid.password.message"
            required
        />
        <div class="text-center">
            <div>
                <Button type="primary" native-type="submit" class="my-2" :disabled="isFormLoading">
                    <span class="fa fa-spin fa-spinner" v-show="isFormLoading"></span>
                    Sign In
                </Button>
                <Button type="secondary" class="my-2" @click="showSignupModal">Register</Button>
            </div>
            <div>
                <Button type="link" class @click="showForgotPasswordModal">
                    <small>Forgot Password?</small>
                </Button>
            </div>
        </div>
    </form>
</template>

<script>
import Input from "~/Framework/Plugins/Argon/Components/BaseInput";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

import LoginRequest from "~/Application/Services/Auth/Requests/LoginRequest";
import LoginService from "~/Application/Services/Auth";

import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validate } from "~/Framework/Helpers/Validation";

import ProfileService from "~/Application/Services/Profile";

export default {
    name: "LoginForm",

    components: {
        Button,
        Input
    },

    mixins: [validationMixin],

    validations: {
        form: {
            email: {
                required,
                email
            },
            password: {
                required
            }
        }
    },

    data() {
        return {
            isFormLoading: false,
            form: {
                email: "",
                password: ""
            },
            apiErrors: {}
        };
    },

    methods: {
        reset() {
            this.form = {
                email: "",
                password: ""
            };
            this.apiErrors = {};
        },
        submit() {
            this.$v.$touch();

            if (this.$v.form.$invalid) {
                return false;
            }

            let request = new LoginRequest(this.form);

            this.isFormLoading = true;

            LoginService.handle(request)
                .then(response => {
                    if (response.exception) {
                        this.apiErrors = response.getErrorMessages();
                        return;
                    }

                    this.$store.dispatch("session/setAuth", response);
                    this.$store.dispatch("profile/setProfile", response.info);

                    this.$toasted.success("Login Successful!", {
                        duration: 2500,
                        position: "bottom-right"
                    });

                    this.$store.dispatch("intent/hideLoginModal", true);

                    this.reset();

                    window.location.reload();
                })
                .finally(() => (this.isFormLoading = false));
        },

        showSignupModal() {
            this.$store.dispatch("intent/hideLoginModal", true);
            this.$store.dispatch("intent/showSignupModal", true);
        },

        showForgotPasswordModal() {
            this.$store.dispatch("intent/hideLoginModal", true);
            this.$store.dispatch("intent/showForgotPasswordModal", true);
        }
    },

    computed: {
        isValid() {
            return validate(this.$v.form);
        }
    }
};
</script>