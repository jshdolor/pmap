<template>
    <form @submit.prevent="submit" novalidate>
        <Card gradient="secondary" shadow body-classes="p-lg-5">
            <h4 class="mb-1">Have a question?</h4>
            <p class="mt-0">Don't be shy, we don't bite.</p>
            <vInput
                v-model="form.name"
                class="mt-5"
                placeholder="Your name"
                addon-left-icon="ni ni-single-02"
                :error="isValid.name.message || apiErrors.name"
                @input="apiErrors.name = ''"
                required
            />
            <vInput
                v-model="form.email"
                placeholder="Email address"
                addon-left-icon="ni ni-email-83"
                :error="isValid.email.message || apiErrors.email"
                @input="apiErrors.email = ''"
                required
            />
            <vInput
                v-model="form.phone"
                placeholder="Phone Number"
                addon-left-icon="ni ni-tablet-button"
                :error="isValid.phone.message || apiErrors.contact_number"
                @input="apiErrors.contact_number = ''"
                required
            />
            <vInput
                required
                :error="isValid['service department'].message || apiErrors.contact_service"
                @input="apiErrors.contact_service = ''"

                >
                <Dropdown class>
                    <Button
                        icon="ni ni-building"
                        slot="title"
                        type="secondary"
                        class="btn-block dropdown-toggle"
                        
                    ><span v-text="selectedDept"></span></Button>
                    <li
                        @click="setDepartment(department)"
                        class="dropdown-item"
                        :key="i"
                        v-for="(department,i) in departments"
                        v-html="department.name"
                    ></li>

                </Dropdown>
            </vInput>
            <vInput class="mb-4"
                :error="isValid.message.message || apiErrors.message"
                @input="apiErrors.message = ''"

                required>
                <textarea
                    class="form-control"
                    name="name"
                    rows="4"
                    v-model="form.message"
                    cols="80"
                    placeholder="Type a message..."
                ></textarea>
            </vInput>
            <Button native-type="submit" type="default" round block size="lg" :disabled="isFormLoading">
                <span class="fa fa-spin fa-spinner" v-show="isFormLoading"></span>
                Send Message
            </Button>
        </Card>
    </form>
</template>

<script>
import Card from "~/Framework/Plugins/Argon/Components/Card";
import Input from "~/Framework/Plugins/Argon/Components/BaseInput";
import Dropdown from "~/Framework/Plugins/Argon/Components/BaseDropdown";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

import EmailInquiryService from "~/Application/Services/EmailInquiry";
import DepartmentsService from "~/Application/Services/Departments";
import EmailInquiryRequest from "~/Application/Services/EmailInquiry/Request/InquiryRequest";

import { validationMixin } from "vuelidate";
import { between, required, minLength, email } from "vuelidate/lib/validators";
import { validate } from "~/Framework/Helpers/Validation";


export default {
    name: "EmailInquiryForm",
    mixins: [validationMixin],

    validations: {
        form: {
            name: {
                required,
                minLength: minLength(2)
            },
            email: {
                email,
                required
            },
            "service department": {
                required
            },
            phone: {
                required
            },
            message: {
                required
            }
        }
    },
    components: {
        Card,
        vInput: Input,
        Button,
        Dropdown
    },

    computed: {
        isValid() {

            return validate(this.$v.form);
        }
    },

    data() {
        return {
            form: {
                name: "",
                email: "",
                phone: "",
                message: "",
                "service department": "",
                isSending: false
            },
            departments: [],
            selectedDept: "Which service to contact?",
            gScript: document.createElement('script'),
            apiErrors: {},
            isFormLoading: false
        };
    },

    mounted() {
        DepartmentsService.getAll().then(departments => {
            this.departments = departments;
        })

    },

    methods: {
        async recaptcha() {
            await this.$recaptchaLoaded()
            return await this.$recaptcha('emailInquiry');
        },
        setDepartment(dept) {
            this.form["service department"] = dept.id;
            this.selectedDept = dept.name
        },
        submit() {
            this.$v.$touch();

            if (this.$v.form.$invalid) {
                return false;
            }

            this.apiErrors = {};

            this.recaptchaVerified();
        },

        recaptchaVerified() {
            let request = new EmailInquiryRequest(this.form);

            this.isFormLoading = true;

            this.recaptcha().then(token => request.token = token ? token : '')
                .finally(() => {

                    EmailInquiryService.handle(request)
                        .then( ({success, message}) => {
                            
                            if(success) {
                                
                                this.$toasted.success(message, {
                                    position: 'bottom-right',
                                    duration: 3000
                                });

                                this.form.name = "";
                                this.form.phone = "";
                                this.form.email = "";
                                this.form["service department"] = "";
                                this.form.message = "";

                                this.$v.$reset();

                            }

                        }).catch(e => {
                            this.apiErrors = e.getErrorMessages();
                        }).finally(() => this.isFormLoading = false);
                })

            
        }
    }
};
</script>