<template>
    <form @submit.prevent="submit" novalidate>
        <Field
            class="my-4 display-4 text-center text-primary"
            type="password"
        >Change Password
        </Field>
        <Field
            class="mb-3"
            label="Current Password"
            :error="isValid.currentPassword.message || apiErrors['current_password']"
            placeholder="Current Password"
            v-model="form.currentPassword"
            type="password"
        />
        <Field
            class="mb-3"
            label="New Password"
            :error="isValid.password.message || apiErrors['password']"
            placeholder="New Password"
            v-model="form.password"
            type="password"
        />
        <Field
            class="mb-3"
            label="Verify New Password"
            :error="isValid.confirmNewPassword.message || apiErrors['confirm_new_password']"
            placeholder="Verify New Password"
            v-model="form.confirmNewPassword"
            type="password"
        />
        <div class="text-center">
            <Button type="primary" native-type="submit" class="my-4" :disabled="isLoading">
                <span class="fa fa-spin fa-spinner" v-show="isLoading"></span>
                Update Password
            </Button>
        </div>
    </form>
</template>

<script>
import Field from "~/Framework/Plugins/Argon/Components/BaseInput";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Dropdown from "~/Framework/Plugins/Argon/Components/BaseDropdown";

import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validate } from "~/Framework/Helpers/Validation";

import ProfileService from "~/Application/Services/Profile";
import UpdatePasswordRequest from '~/Application/Services/Profile/Requests/UpdatePasswordRequest';


export default {
    name: 'ChangePasswordForm',

    mixins: [validationMixin],

    components: {
        Field,
        Button,
        Dropdown
    },

    validations: {
        form: {
            currentPassword: {
                required
            },
            password: {
                required
            },
            confirmNewPassword: {
                required
            }
        }
    },

    data() {
        return {
            apiErrors: {},
            form: {
                currentPassword: '',
                password: '',
                confirmNewPassword: ''
            },
            isLoading: false
        }
    },

    methods: {
        reset() {
            this.form = {
                currentPassword: '',
                password: '',
                confirmNewPassword: ''
            }
            this.apiErrors = {};
        },
        submit() {
            this.$v.$touch();

            if (this.$v.form.$invalid) {
                return false;
            }

            let request = new UpdatePasswordRequest(this.form);

            this.isLoading = true;

            ProfileService.updatePassword(request)
                .then(response => {

                    if (response.exception) {
                        this.apiErrors = response.getErrorMessages();
                        return;
                    }

                    this.$toasted.success(response.message, {
                        position: "bottom-right"
                    }).goAway(3000);

                    this.reset();

                }).finally(e => {
                    this.$v.$reset();
                    this.isLoading = false;
                });
        }
    },

    computed: {
        isValid() {
            return validate(this.$v.form);
        },
    }


}
</script>