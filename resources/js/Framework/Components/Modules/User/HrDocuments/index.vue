<template>
    <Card shadow class="my-4" no-body>
        <div class="container">
            <div class="row">
                <InputField
                    class="col-md-12 my-4 display-4 text-center text-primary"
                >HR Documents/Forms
                </InputField>
            </div>
            <div class="row"
                v-if="documents.length === 0"
                >
                <div class="col-md-12 text-center display-4 my-5">
                    No Available Forms
                </div>
            </div>
            <div v-if="documents.length > 0">
                <div class="row"
                    :key="i"
                    v-for="(docs, i) in groupedDocs"
                    >
                    <div class="mt-2 col-md-12">
                        <h4 class="display-5" v-html="docs[0].category"></h4>
                        <v-client-table :data="docs" :columns="tableColumns" :options="tableOptions">
                            <div
                                slot-scope="rowData"
                                slot="name"
                            >
                                <div>{{rowData.row.name}}</div>
                                <div class="text-muted"><small v-html="rowData.row.description"></small></div>
                            </div>
                            <div
                                slot-scope="rowData"
                                slot="download_link"
                            >
                                <a download :href="rowData.row.filePath">
                                    <span 
                                        class="badge text-uppercase badge-primary">
                                        <i class="ni ni-cloud-upload-96 mr-2"></i>
                                        Download
                                    </span>
                                </a>
                            </div>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
import Vue from "vue";
import { ServerTable, ClientTable, Event } from "vue-tables-2";
import { CollapsePlugin } from "bootstrap-vue";
Vue.use(ClientTable, {}, false, "bootstrap4", "default");
Vue.use(CollapsePlugin);

import HrDocumentService from '~/Application/Services/Entities/HrDocument';

import Card from "~/Framework/Plugins/Argon/Components/Card";
import InputField from '~/Framework/Plugins/Argon/Components/BaseInput';

import {
    groupBy
} from  '~/Framework/Helpers';

export default {
    name: 'HrDocuments',

    components: {
        Card,
        InputField
    },

    data() {
        return {
            documents: [],
            tableOptions: {
                perPage: 5,
                filterable: false
            },
            tableColumns: [
                'name',
                'date',
                'download_link'
            ]
        }
    },

    methods: {
        getDocuments() {
            HrDocumentService.getAll().then(docs => this.documents = docs);
        }  
    },

    computed: {
        groupedDocs() {
            return groupBy(this.documents, 'category')
        }
    },

    mounted() {
        this.getDocuments();
    }
}
</script>