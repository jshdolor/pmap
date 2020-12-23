<template>
    <div>
        <Header />
        <div class="container mt--400 ">
            <Card shadow style class="py-5">
                <div class="row align-items-center">
                    <div class="col-lg-6 text-right">
                        <img src="/images/404.png" style="max-height:300px" class="img-fluid" />
                    </div>
                    <div class="col-lg-6 ">
                        <h1 class="pt-5">
                            404
                            <br />
                            <span class="lead text-muted">Page not Found.</span>
                        </h1>
                        <router-link class="mb-5 btn btn-primary btn-lg" to="/">Back to Home</router-link>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Header from "~/Framework/Components/Atomic/SectionHeader";
import Card from "~/Framework/Plugins/Argon/Components/Card";

export default {
    components: {
        Header,
        Card
    }
};
</script>