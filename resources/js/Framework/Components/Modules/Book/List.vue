<template>
    <div :class="`resource-${resource}-list`">
        <SectionHeader />
        <div class="container mt--400 header-margin">
            <div class="row">
                <div class="col-md-8">
                    <h2 class="display-3 text-white">{{ resourcePlural }}</h2>
                </div>
                <div class="col-md-4 text-right" v-if="filteredList.length > 0">
                    <input
                        class="form-control"
                        placeholder="Search"
                        @input="updateFilteredList"
                        v-model="filterKey"
                    />
                </div>
            </div>

            <Loader :show="resourceData.length === 0 && !NoResourceData" />

            <div class="row" v-if="filteredList.length > 0">
                <div
                    :key="k"
                    class="col-md-4 col-lg-4 col-sm-6 col-xs-12"
                    v-for="(item, k) in dataList"
                >
                    <router-link :to="item.path">
                        <GenericDisplayCard
                            class="my-3"
                            :image="item.image"
                            :date="item.publishedDate"
                            :title="item.title"
                        />
                    </router-link>
                </div>

                <div class="col-md-12">
                    <Pagination
                        v-if="pageCount > 1"
                        :page-count="pageCount"
                        v-model="currentPage"
                        align="center"
                    />
                </div>
            </div>

            <div v-if="NoResourceData" class="my-3 text-center" id="not-found">
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
                                    No {{ resourcePlural }}
                                </span>
                            </h1>
                            <router-link
                                class="mb-5 btn btn-primary btn-lg"
                                to="/"
                            >
                                Back to Home
                            </router-link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
    import Config from '~/Application/Config';

    import SectionHeader from '~/Framework/Components/Atomic/SectionHeader';
    import Pagination from '~/Framework/Plugins/Argon/Components/BasePagination';

    import GenericDisplayCard from '~/Framework/Components/Widgets/GenericDisplayCard';
    import Card from '~/Framework/Plugins/Argon/Components/Card';
    import Loader from '~/Framework/Components/Atomic/Loader';

    import BookModel from '~/Application/Models/Entities/Book';

    import entityResourceMixin from '~/Framework/Components/Modules/Mixins/ResourceList';

    export default {
        name: 'BooksList',

        components: {
            GenericDisplayCard,
            SectionHeader,
            Pagination,
            Card,
            Loader,
        },

        data() {
            return {
                model: BookModel,
            };
        },

        mixins: [entityResourceMixin],
    };
</script>
