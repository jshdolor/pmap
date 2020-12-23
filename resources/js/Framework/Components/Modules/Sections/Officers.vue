<template>
    <section class="section section-lg" id="officers-and-board-of-trustees">
        <div class="container">
            <div class="row justify-content-center text-center mb-sm">
                <div class="col-lg-8" v-html="content">
                    
                </div>
            </div>
            <div class="row justify-content-md-center"
                :key="i"
                v-for="(batch,i) in officers"
                >
                <div class="text-center mt-2 col-md-12">
                    <h4 class="display-4" v-html="batch[0].batch"></h4>
                </div>
                <div
                    class="col-md-3 col-lg-3 col-xs-2 mb-5 mb-lg-0"
                    :key="officerKey"
                    v-for="(officer,officerKey) in batch"
                >
                    <div class="px-4">
                        <img
                            :src="officer.image"
                            class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                            style="max-width: 100px;height:auto"
                            onerror="this.setAttribute('src', 'https://dummyimage.com/300x300/000/fff')"
                        />
                        <div class="pt-3 text-center">
                            <h6 class="title">
                                <small class="h6 text-muted">{{officer.position}}</small>
                                <span class="d-block mb-1">{{officer.name}}</span>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SectionHeader from "~/Framework/Components/Atomic/SectionHeader";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

import OfficersService from '~/Application/Services/Officers';

import PageService from "~/Application/Services/Page";

import {
    groupBy
} from  '~/Framework/Helpers';

export default {
    name: "OfficersBoDs",
    components: {
        SectionHeader,
        Button
    },
    data() {
        return {
            officers: [
                
            ],
            content: ''
        };
    },

    mounted() {
        OfficersService.getAll().then(officers => {
            this.officers = groupBy(officers, 'batch');
        });
        PageService.get('officers-section').then(({content}) => this.content = content);
    }
};
</script>