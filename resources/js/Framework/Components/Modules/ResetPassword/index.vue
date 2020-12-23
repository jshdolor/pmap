<template>
    <section class="section section-lg bg-gradient-success" id="forgot_password">
    
        <Loader :show="showLoading"/>

        <div class="container mt-5" v-if="!showLoading">
            <div class="row row-grid justify-content-center" >

                <div class="col-lg-7 text-center" >
                    <h2 class=" text-white">Forgot <span class="text-primary"><b>Password?</b></span></h2>
                    <p class="text-white">
                        You can reset your password using <b>this form</b>
                    </p>
                    <ResetPasswordForm/>
                </div>

            </div>
        </div>

    </section>
</template>

<script>

import Loader from "~/Framework/Components/Atomic/Loader";
import ResetPasswordForm from '~/Framework/Components/Forms/ResetPassword';

import ForgotPasswordService from '~/Application/Services/V2/ForgotPassword';
import IsValidTokenRequest from '~/Application/Services/V2/ForgotPassword/Requests/IsValidTokenRequest';


export default {
    name: 'ResetPassword',

    components: {
        Loader,
        ResetPasswordForm
    },

    data() {
        return {
            showLoading: true
        }
    },

    watch: {
        '$route.params.code': {
            handler(token) {

                const request = new IsValidTokenRequest({
                    token
                });

                ForgotPasswordService.validate(request).then(response => {
                    if(response.exception) {
                        this.$router.replace("/");
                    } 
                })
                .finally(() => {
                    this.showLoading = false;
                });
                
            },
            immediate: true
        }
    },

}
</script>