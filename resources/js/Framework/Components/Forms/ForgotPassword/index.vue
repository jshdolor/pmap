<template>
    <div>
        <Input
            v-model.trim="form.email"
            placeholder="Email Address"
            addon-left-icon="ni ni-email-83"
            :error="isValid.email.message || apiErrors.email"
            required
        />
        <div class="text-center">
            <Button type="primary" class="my-4" @click="submit" :disabled="isFormLoading">
                <span class="fa fa-spin fa-spinner" v-show="isFormLoading"></span>
                Send Link
            </Button>
        </div>
    </div>
</template>

<script>
import Input from "~/Framework/Plugins/Argon/Components/BaseInput";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validate } from "~/Framework/Helpers/Validation";

import ForgotPasswordService from "~/Application/Services/V2/ForgotPassword";
import ForgotPasswordRequest from "~/Application/Services/V2/ForgotPassword/Requests/ForgotPasswordRequest";

export default {
    name: "ForgotPasswordForm",

    mixins: [validationMixin],

    components: {
        Input,
        Button
    },

    validations: {
        form: {
            email: {
                required,
                email
            }
        }
    },

    data() {
        return {
            form: {
                email: ""
            },
            apiErrors: {},
            isFormLoading: false,
        };
    },

    methods: {
        submit() {
            this.$v.$touch();

            if (this.$v.form.$invalid) {
                return false;
            }

            const request = new ForgotPasswordRequest({
                email: this.form.email
            });

            this.isFormLoading = true;

            ForgotPasswordService.sendLink(request).then(response => {
                if (response.exception) {
                    this.apiErrors = response.getErrorMessages();
                    return;
                }

                if (response.message) {
                    this.$toasted.success(response.message, {
                        duration: 2500,
                        position: "bottom-right"
                    });
                }

                this.apiErrors = {};
                this.form.email = "";
                this.$store.dispatch("intent/hideForgotPasswordModal", true);
                
            }).finally(() => {
                this.$v.$reset();
                this.isFormLoading = false;
            });
        }
    },

    computed: {
        isValid() {
            return validate(this.$v.form);
        }
    }
};
</script>