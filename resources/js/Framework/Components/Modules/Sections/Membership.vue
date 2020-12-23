<template>
    <section class="section section-shaped my-0 overflow-hidden" id="memberships">
        <div class="container pt-lg pb-300" v-html="content">
            
        </div>
    </section>
</template>


<script>
import PageService from "~/Application/Services/Page";
export default {
    name: "MembershipSection",
    data() {
        return {
            content: ""
        };
    },
    mounted() {
        PageService.get("membership-section").then(
            page => (this.content = page.content)
        );
    }
};
</script>