<template>
    <div
        :class="children.length? 'has-child':''"
        @mouseenter="showSubNav = true"
        @mouseleave="showSubNav = false"
        @click="showSubNav = true"
    >
        <slot></slot>
        <ul v-show="displaySubNav" :class="{['level-'+level]: true}" :style="isMobile ? 'display:contents':''">
            <router-link :key="key" v-for="(child,key) in children" :to="child.url">
                <SubNav
                    class="dropdown-item"
                    :class="{'has-child': child.children.length > 0}"
                    :level="level+1"
                    :children="child.children"
                >
                    <span v-html="child.title"></span>
                </SubNav>
            </router-link>
        </ul>
    </div>
</template>

<script>
import SubNav from "~/Framework/Components/Widgets/SubNav";
import { isMobile } from 'mobile-device-detect';

export default {
    name: "SubNav",
    props: ["children", "level"],

    components: {
        SubNav
    },

    data() {
        return {
            showSubNav: false,
            isMobile
        };
    },

    mounted() {
    },

    computed: {
        displaySubNav() {

            if(isMobile) {
                return this.children.length > 0;
            }

            return this.showSubNav && this.children.length > 0;
        }
    }
    
};
</script>
