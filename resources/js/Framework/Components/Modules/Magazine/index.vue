<template>
    <section id="magazinePage">
        <SectionHeader bg="bg-pmapAccent"></SectionHeader>
        <div class="container mt--400">
            <Loader :show="!noResourceData && Object.keys(data).length === 0" />

            <div class="row">
                <div class="col-lg-8 ">
                    <Card shadow v-if="Object.keys(data).length !== 0">
                        <img
                            class="img-fluid img-max-width"
                            :src="data.image"
                        />
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <h4 class="display-3">
                                    {{ data.title }}
                                    <small
                                        class="text-muted lead sub-display-3"
                                        v-html="data.publishedDate"
                                    ></small>
                                </h4>
                            </div>
                        </div>

                        <p v-html="data.description"></p>
                        <p v-html="data.content"></p>
                    </Card>

                    <div
                        v-if="noResourceData"
                        class="text-center"
                        id="not-found"
                    >
                        <Card shadow style class="py-5">
                            <div class="row align-items-center">
                                <div class="col-lg-6 text-right">
                                    <img
                                        src="/images/404.png"
                                        style="max-height:300px"
                                        class="img-fluid"
                                    />
                                </div>
                                <div class="col-lg-6 ">
                                    <h1 class="pt-5">
                                        Oops....
                                        <br />
                                        <span class="lead text-muted">
                                            {{ resourceSingular }} not found
                                        </span>
                                    </h1>
                                    <router-link
                                        class="mb-5 btn btn-primary btn-lg"
                                        :to="this.listPagePath"
                                    >
                                        Back to {{ resourcePlural }}
                                    </router-link>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
                <div class="col-lg-4 ">
                    <NewsAds :withShadow="false" :perPage="2" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import ResourceMixin from '~/Framework/Components/Modules/Mixins/Resource';
    import MagazineModel from '~/Application/Models/Entities/Magazine';
    export default {
        name: 'Magazine',
        mixins: [ResourceMixin],
        data() {
            return {
                resource: 'magazines',
                listPagePath: '/pmm',
                resourceSingular: 'Magazine',
                resourcePlural: 'People Management Magazines',
                model: MagazineModel,
            };
        },
    };
</script>
