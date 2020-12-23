<template>
    <Card class='user-dashboard' no-body shadow>
        <div slot="header" primary>
            <h6 class="heading">Dashboard</h6>
        </div>
        <div class="align-items-center" v-for="(dashboard, key) in dashboardLinks" :key="key">
                    
            <router-link :to="dashboard.url" v-if="dashboard.url.indexOf('http') === -1">
                <div class="my-3 mx-4">
                    <Icon class :name="dashboard.icon" type="primary" rounded />
                    <span class="ml-2" v-text="dashboard.title">test</span>
                </div>
            </router-link>
            <a 
                target="_blank"
                :href="dashboard.url"
                v-else>
                    <div class="my-3 mx-4">
                    <Icon class :name="dashboard.icon" type="primary" rounded />
                    <span class="ml-2" v-text="dashboard.title">test</span>
                </div>
            </a>
        </div>
    </Card>
</template>

<script>
import Card from "~/Framework/Plugins/Argon/Components/Card";
import Icon from "~/Framework/Plugins/Argon/Components/Icon";

import MenuService from '~/Application/Services/V2/Menus';

export default {
    name: "UserDashboard",
    components: {
        Card,
        Icon
    },

    data() {
        return {
            pathPrefix: '/user',
            dashboardLinks: [],
            menuId: 4 //eww
        };
    },

    mounted() {
        MenuService.getMenuById(this.menuId)
            .then(data => this.dashboardLinks = data);
    }
};
</script>