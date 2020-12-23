<template>
    <section id="booksPage">
        <SectionHeader bg="bg-pmapAccent"></SectionHeader>
        <div class="container mt--400">
            <Loader :show="!noResourceData && Object.keys(data).length === 0" />

            <div class="row">
                <div class="col-lg-8">
                    <Card shadow v-if="Object.keys(data).length !== 0">
                        <img class="img-fluid img-max-width" :src="data.image" />
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <h4 class="display-3">
                                    {{ data.title }}
                                    <small class="text-muted" v-html="data.author"></small>
                                    <small
                                        class="text-muted lead sub-display-3"
                                        v-html="data.publishedDate"
                                    ></small>
                                </h4>
                                <Badge
                                    v-for="(cat,i) in data.categories"
                                    :key="i"
                                    type="primary"
                                    rounded
                                    v-html="cat"
                                ></Badge>
                                <p v-html="data.description"></p>
                            </div>
                        </div>
                    </Card>

                    <div v-if="noResourceData" class="text-center" id="not-found">
                        <Card shadow style class="py-5">
                            <div class="row align-items-center">
                                <div class="col-lg-6 text-right">
                                    <img
                                        src="/images/404.png"
                                        style="max-height:300px"
                                        class="img-fluid"
                                    />
                                </div>
                                <div class="col-lg-6">
                                    <h1 class="pt-5">
                                        Oops....
                                        <br />
                                        <span
                                            class="lead text-muted"
                                        >{{ resourceSingular }} not found</span>
                                    </h1>
                                    <router-link
                                        class="mb-5 btn btn-primary btn-lg"
                                        :to="this.listPagePath"
                                    >Back to {{ resourcePlural }}</router-link>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div class="col-lg-4" v-if="Object.keys(data).length !== 0">
                    <Card class="price-card" shadow>
                        <!-- <div class="ribbon" v-if="points">
                            <span>{{points}} points</span>
                        </div>-->
                        <div class="row text-center justify-content-center price-display">
                            <div class="col-lg-12 my-1">
                                <i
                                    v-if="isMember"
                                    style="position:absolute;right:0;"
                                    class="text-success fas fa-2x fa-check-circle"
                                ></i>
                                <h4>
                                    <div v-text="currency(data.memberPrice, '₱')"></div>
                                    <div class="subtitle">Member Price</div>
                                </h4>
                            </div>
                            <div class="col-lg-12 my-1">
                                <i
                                    v-if="!isMember"
                                    style="position:absolute;right:0;"
                                    class="text-success fas fa-2x fa-check-circle"
                                ></i>
                                <h4>
                                    <div v-text="currency(data.nonmemberPrice, '₱')"></div>
                                    <div class="subtitle">Non-Member Price</div>
                                </h4>
                            </div>
                        </div>

                        <Button
                            type="primary"
                            class="my-2"
                            tag="a"
                            target="_blank"
                            :href="
                                        isMember
                                            ? data.memberPaymentLink
                                            : data.nonmemberPaymentLink
                                    "
                            block
                            :disabled="!(data.memberPaymentLink || data.nonmemberPaymentLink)"
                        >
                            <span
                                v-show="!(data.memberPaymentLink || data.nonmemberPaymentLink)"
                                class="fa fa-spin fa-spinner"
                            ></span>
                            Buy
                        </Button>
                        <!-- <FBShareButton class="my-2" :picture="image" :url="currentUrl" /> -->
                    </Card>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <RelatedBooks :relatedResources="slideBooks" />
                </div>
            </div>

            <div class="row" v-if="false">
                <Carousel
                    :perPage="4"
                    :paginationEnabled="false"
                    :adjustableHeight="true"
                    :autoplay="true"
                    :loop="true"
                    :autoplayTimeout="4000"
                >
                    <Slide :key="i" v-for="(book, i) of slideBooks">
                        <router-link :to="book.path">
                            <Card class="mx-3 my-3 px-2 py-2">
                                <img
                                    v-on:error="removeElement"
                                    :src="book.image"
                                    class="img-fluid min-max-height-200"
                                    slot="outside-body"
                                />
                                <h6
                                    class="text-primary text-uppercase"
                                    v-html="trimString(book.title, 15, true)"
                                ></h6>
                                <div>
                                    <Badge
                                        v-for="(cat,i) in (book.categories || []).filter((b,i) => i < 2)"
                                        :key="i"
                                        type="primary"
                                        rounded
                                        v-html="cat"
                                    ></Badge>
                                </div>
                            </Card>
                        </router-link>
                    </Slide>
                </Carousel>
            </div>
        </div>
    </section>
</template>

<script>
import { currency, trimString, removeTags } from "~/Framework/Helpers/String";

import { Carousel, Slide } from "vue-carousel";
import Card from "~/Framework/Plugins/Argon/Components/Card";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import ResourceService from "~/Application/Services/Entities";
import Badge from "~/Framework/Plugins/Argon/Components/Badge";

import ResourceMixin from "~/Framework/Components/Modules/Mixins/Resource";
import BookModel from "~/Application/Models/Entities/Book";
import RelatedBooks from '~/Framework/Components/Widgets/RelatedResource';


export default {
    name: "Book",
    mixins: [ResourceMixin],
    components: {
        Carousel,
        Card,
        Button,
        Slide,
        Badge,
        RelatedBooks
    },
    methods: {
        trimString,
        removeTags,
        currency,
        removeElement(el) {
            el.target.src =
                "https://dummyimage.com/600x400/000/fff&text=No+Image";
        }
    },
    data() {
        return {
            books: [],
            booksOnSlide: 1
        };
    },

    computed: {
        slideBooks() {
            return this.books.filter(
                book =>
                    book.id != this.$route.params.id &&
                    this.data.categories.filter(
                        Set.prototype.has,
                        new Set(book.categories)
                    ).length > 0
            );
        }
    },

    mounted() {
        ResourceService.getAll("books", BookModel).then(
            books => (this.books = books)
        );
    }
};
</script>
