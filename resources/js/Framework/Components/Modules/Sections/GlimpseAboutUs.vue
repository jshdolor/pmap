<template>
    <section class="section section-lg section-2 bg-white">
        <div class="container">
        <div class="row row-grid align-items-center">
            <div class="col-md-6 order-md-2">
                <NewsSlide :withMargin="true" />
            </div>
            <div class="col-md-6 order-md-1"  v-html="content"></div>
        </div>
        </div>
    </section>
</template>
<script>
import icon from "~/Framework/Plugins/Argon/Components/Icon";
import badge from "~/Framework/Plugins/Argon/Components/Badge";
import PageService from "~/Application/Services/Page";

import NewsSlide from "~/Framework/Components/Widgets/NewsSlide";


export default {
    name: "WhoAreWe",
    data() {
        return {
            content: ""
        }
    },
    components: {
        icon,
        badge,
        NewsSlide
    },
    mounted() {
        PageService.get("glimpse-about-section").then(
            page => (this.content = page.content)
        );
    }
};
</script>