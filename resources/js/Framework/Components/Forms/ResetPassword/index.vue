<template>
    <div>
        <div class="form-group row mt-3">
            <label class="col-sm-4 col-form-label text-white" for="newPassword">
                <b>New Password :</b>
            </label>
            <div class="col-sm-8">
                <InputField :error="isValid.password.message || apiErrors.password">
                    <input
                        v-model.trim="form.password"
                        placeholder
                        type="password"
                        id="newPassword"
                        class="form-control search-input-field"
                    />
                </InputField>
            </div>
        </div>
        <div class="form-group row mt-3">
            <label class="col-sm-4 col-form-label text-white" for="newConfirmPassword">
                <b>Verify Password :</b>
            </label>
            <div class="col-sm-8">
                <InputField :error="isValid.verify_password.message">
                    <input
                        v-model.trim="form.verify_password"
                        placeholder
                        type="password"
                        id="newConfirmPassword"
                        class="form-control search-input-field"
                    />
                </InputField>
            </div>
        </div>
        <Button shadow primary lg class="my-3" @click="submit" :disabled="isFormLoading">
            <span class="fa fa-spin fa-spinner" v-show="isFormLoading"></span>
            Set My Password
        </Button>
    </div>
</template>

<script>
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import InputField from "~/Framework/Plugins/Argon/Components/BaseInput";

import ForgotPasswordService from "~/Application/Services/V2/ForgotPassword";
import SetNewPasswordRequest from "~/Application/Services/V2/ForgotPassword/Requests/SetNewPasswordRequest";

import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validate } from "~/Framework/Helpers/Validation";

export default {
    name: "ResetPasswordForm",

    mixins: [validationMixin],

    validations: {
        form: {
            password: {
                required
            },
            verify_password: {
                required
            }
        }
    },

    components: {
        Button,
        InputField
    },

    data() {
        return {
            form: {
                password: "",
                verify_password: ""
            },
            token: '',
            apiErrors: {},
            isFormLoading: false

        };
    },

    computed: {
        isValid() {
            return validate(this.$v.form);
        }
    },

    watch: {
        '$route.params.code': {
            immediate: true,
            handler(value) {
                this.token = value;
            }
        }
    },

    methods: {
        submit() {
            this.$v.$touch();

            if (this.$v.form.$invalid) {
                return false;
            }

            const request = new SetNewPasswordRequest({
                token: this.token,
                password: this.form.password
            })

            this.isFormLoading = true;

            ForgotPasswordService.setNewPassword(request).then(response => {
                if (response.exception) {
                    this.apiErrors = response.getErrorMessages();

                    if(this.apiErrors.token) {
                        this.$toasted.error("Forgot Password Entry Expired", {duration:2500, position:'bottom-right'})
                        setTimeout(() => {
                            this.$route.replace("/");
                        }, 3000);
                    }
                    return;
                }

                this.$toasted.success(
                    "Password Successfully Set!", 
                    {duration: 2500, position:'bottom-right'}
                );

                this.$router.push("/");
                setTimeout(() => {
                    this.$store.dispatch("intent/showLoginModal")
                }, 2000);


            }).finally(() => {
                this.$v.$reset();
                this.apiErrors = {}

                this.isFormLoading = false;
            });
            
        }
    }
};
</script>