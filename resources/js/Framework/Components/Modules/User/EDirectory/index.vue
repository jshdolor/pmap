
<template>
    <Card shadow class="my-4" no-body>
        <div class="container">
            <div class="row">
                <InputField class="col-md-12 my-4 display-4 text-center text-primary">E-Directory</InputField>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <Loader :show="isFetching" />
                    <table class="table table-striped" v-if="!isFetching">
                        <tr v-for="(company, i) of companies" :key="i">
                            <td v-html="company.name"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
import Card from "~/Framework/Plugins/Argon/Components/Card";
import InputField from "~/Framework/Plugins/Argon/Components/BaseInput";

import Loader from "~/Framework/Components/Atomic/Loader";

import CompanyService from "~/Application/Services/Entities/Company";

import { sortObjectArray } from "~/Framework/Helpers";

export default {
    name: "E-Directory",

    components: {
        Card,
        InputField,
        Loader
    },

    data() {
        return {
            companies: [],
            isFetching: true
        };
    },

    methods: {
        async fetchList() {
            const companies = await CompanyService.getAll();
            this.companies = companies.sort(this.compare);
            this.isFetching = false;
        },
        compare(a, b) {
            // Use toUpperCase() to ignore character casing
            const bandA = a.name.toUpperCase();
            const bandB = b.name.toUpperCase();

            let comparison = 0;

            if (bandA > bandB) {
                comparison = 1;
            } else if (bandA < bandB) {
                comparison = -1;
            }
            return comparison;
        }
    },

    mounted() {
        this.fetchList();
    }
};
</script>