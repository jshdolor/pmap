import ResourceService from '~/Application/Services/Entities';
import Config from '~/Application/Config';

export default {
    name: 'ResourceList',
    data() {
        return {
            resourceData: [],
            currentPage: 1,
            perPage: Config.booksPerPage,
            filteredList: [],
            NoResourceData: false,
            filterKey: '',
            resource: 'books',
            resourcePlural: 'Books',
        };
    },
    methods: {
        getResourceData() {
            ResourceService.getAll(this.resource, this.model).then((data) => {
                this.resourceData = data;
                this.filteredList = this.resourceData;
                this.NoResourceData = data.length === 0;
            });
        },

        updateFilteredList() {
            this.currentPage = 1;

            if (this.filterKey.length === 0) {
                this.filteredList = this.resourceData;
                return;
            }

            this.filteredList = this.filteredList.filter((v) => {
                return (
                    v.title
                        .toLowerCase()
                        .indexOf(this.filterKey.toLowerCase()) > -1
                );
            });
        },
    },

    computed: {
        dataList() {
            return this.filteredList.filter((v, index) => {
                return (
                    index >= this.currentPage * this.perPage - this.perPage &&
                    index + 1 <= this.currentPage * this.perPage
                );
            });
        },
        pageCount() {
            return Math.ceil(this.filteredList.length / this.perPage);
        },
    },

    mounted() {
        this.getResourceData();
    },
};
