<template>
    <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <Dropdown class="nav-item" tag="li" v-for="(item, ikey) in menu" :nochild="!item.hasChildren" :key="ikey">
            <router-link
                :to="item.hasChildren ? '':item.url"  
                slot="title"
                href="#"
                class="nav-link"
                data-toggle="dropdown"
                role="button"
            >
                <i class="ni ni-ui-04 d-lg-none"></i>
                <span class="nav-link-inner--text" v-html="item.title"></span>
            </router-link>
            <span :key="key" v-for="(child,key) in item.children">
                <router-link 
                    :to="child.url"
                    v-if="child.url.indexOf('http') === -1"
                    >
                    <SubNav :level="1" class="dropdown-item" :children="child.children">
                        <span v-html="child.title" ></span>
                    </SubNav>
                </router-link>
                <a 
                    target="_blank"
                    :href="child.url"
                    v-else
                    >
                    <SubNav :level="1" class="dropdown-item" :children="child.children">
                        <span v-html="child.title" ></span>
                    </SubNav>
                </a>
            </span>

        </Dropdown>
    </ul>
</template>

<script>
import { isMobile } from 'mobile-device-detect';

import Dropdown from "~/Framework/Components/Widgets/Dropdown";
import SubNav from "~/Framework/Components/Widgets/SubNav";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

import MenuService from '~/Application/Services/Menus';

export default {
    name: "NavigationMenu",
    components: {
        Dropdown,
        SubNav,
        Button
    },
    data() {
        return {
            menu: [],
            isMobile,
            
        }
    },
    methods: {
        getAllMenu() {

            MenuService.getAll()
                .then(menu => {
                    menu.map(m => {
                        m.breadcrumbs = this.getBreadCrumbsMenu(m, menu, []).reverse();
                        return m;
                    });

                    this.$store.dispatch("app/setNavMenu", menu);

                    this.$root.$emit('setNavMenu', menu);

                    menu.map(m => {
                        m.children = menu.filter(vmenu => vmenu.parentId == m.id);
                        return m;
                    });

                    menu = menu.sort((a,b) => a.order - b.order)
                    this.menu = menu.filter(menu => menu.parentId === null);
                })
        },

        getBreadCrumbsMenu(menu, wholeMenu, breadcrumbs) {

            breadcrumbs.push({text: menu.title, to: menu.url ?menu.url: '#'});

            if(!menu.parentId) {
                return breadcrumbs;
            } 

            let filteredMenu = wholeMenu.filter(wmenu => menu.parentId == wmenu.id);
            if(filteredMenu.length > 0) {
                filteredMenu = filteredMenu[0];
            }

            return this.getBreadCrumbsMenu(filteredMenu, wholeMenu, breadcrumbs);
        }
    },
    computed: {
        hasCredentials() {
            return this.$store.state.session.isLoggedIn;
        },
    },
    mounted() {
        this.getAllMenu();
    }
};
</script>