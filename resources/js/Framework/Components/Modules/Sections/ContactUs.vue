<template>
    <section class="section section-lg pt-lg-0 section-contact-us" id="contact-us">
        <div class="container">
            <div class="row justify-content-center mt--200">
                <div class="col-lg-8">
                    <EmailInquiryForm></EmailInquiryForm>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import EmailInquiryForm from '~/Framework/Components/Forms/EmailInquiry'

export default {
    name: "ContactUsSection",
    components: {
        EmailInquiryForm
    }
};
</script>