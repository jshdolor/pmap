import SectionHeader from '~/Framework/Components/Atomic/SectionHeader';
import Card from '~/Framework/Plugins/Argon/Components/Card';
import Button from '~/Framework/Plugins/Argon/Components/BaseButton';
import Loader from '~/Framework/Components/Atomic/Loader';
import ResourceService from '~/Application/Services/Entities';
import NewsAds from '~/Framework/Components/Widgets/NewsSlide';

import BookModel from '~/Application/Models/Entities/Book';

export default {
    name: 'Resource',

    components: {
        SectionHeader,
        Card,
        Button,
        Loader,
        NewsAds,
    },

    data() {
        return {
            data: {},
            noResourceData: false,
            resource: 'books',
            listPagePath: '/books',
            resourceSingular: 'Book',
            resourcePlural: 'Books',
            model: BookModel,
        };
    },

    methods: {
        getResourceData(id) {
            ResourceService.getAll(this.resource, this.model).then(
                (resourceData) => {
                    this.data = resourceData.find((v) => v.id == id) || {};
                    this.noResourceData = Object.keys(this.data).length === 0;
                }
            );
        },
    },

    watch: {
        '$route.params.id': {
            immediate: true,
            handler(newVal, oldVal) {
                this.getResourceData(newVal);
            },
        },
    },

    computed: {
        user() {
            return this.$store.state.profile.profile;
        },
        isMember() {
            return !!this.user.memberStatus;
        },
    },
};
