<template>
    <footer class="footer has-cards">
        
        <section class="section section-lg pt-0">
            <div class="container">
                    <Card gradient="warning" no-body shadow-size="lg" class="border-0">
                        <div class="p-5">
                            <div class="row align-items-center">
                                <div class="col-lg-8">
                                    <h3 class="text-white">NEWSLETTER</h3>
                                    <p
                                        class="lead text-white mt-3"
                                    >Subscribe to our newsletter and get the latest scoop right to your inbox!</p>
                                    
                                </div>
                                <div class="col-lg-4">
                                    <vInput 
                                        placeholder="Email Address" 
                                        :error="isValid.email.message"
                                        v-model="form.email"></vInput>
                                    <div class="text-center">
                                        <Button @click="subscribe">Subscribe</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
            </div>
        </section>
        <div class="container" v-html="content">
        
        </div>
    </footer>
</template>
<script>
import PageService from "~/Application/Services/Page";
import NewsLetterService from "~/Application/Services/Newsletter";


import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import vInput from "~/Framework/Plugins/Argon/Components/BaseInput";
import Card from "~/Framework/Plugins/Argon/Components/Card";


import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validate } from "~/Framework/Helpers/Validation";

import { BButtonGroup } from 'bootstrap-vue';

export default {
    name: "app-footer",

    validations: {
        form: {
            email: {
                email,
                required
            },

        }
    },

    components: {
        Button,
        Card,
        vInput,
        ButtonGroup:BButtonGroup,
    },

    mixins: [validationMixin],

    data() {
        return {
            year: new Date().getFullYear(),
            content: "",
            form: {
                email: ""
            },
        };
    },

    methods: {
        subscribe() {
            this.$v.$touch();

            if (this.$v.form.$invalid) {
                return false;
            }

            NewsLetterService.subscribe({email:this.form.email})
                .then(r => {
                    this.form.email = '';
                    this.$toasted
                        .success(r.message, {
                            position: "bottom-right"
                        })
                        .goAway(3000);

                    this.$v.$reset();

                })
                .catch(e => {

                });
        },
    },

    computed: {
        isValid() {
            return validate(this.$v.form);
        }
    },

    mounted() {
        PageService.get("footer-section").then(
            ({ content }) => (this.content = content)
        );
    }
};
</script>
