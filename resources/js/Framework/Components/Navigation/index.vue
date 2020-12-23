<template>
    <nav
        class="navbar"
        :class="[
            {'navbar-expand-lg': expand},
            {[`navbar-${effect}`]: effect},
            {'navbar-transparent': transparent},
            {'fixed-top': topFix},
            {[`bg-${type}`]: type},
            {'rounded': round}
         ]"
    >
        <div class="container-fluid">
            <slot name="container-pre"></slot>
            <slot name="brand">
                <a class="navbar-brand" href="#" @click.prevent="onTitleClick">{{title}}</a>
            </slot>
            <navbar-toggle-button
                :toggled="toggled"
                :target="contentId"
                @click.native.stop="toggled = !toggled"
            ></navbar-toggle-button>

            <slot name="container-after"></slot>

            <div
                class="collapse navbar-collapse"
                :class="{show: toggled}"
                :id="contentId"
                v-click-outside="closeMenu"
            >
                <div class="navbar-collapse-header">
                    <slot name="content-header" :close-menu="closeMenu"></slot>
                </div>
                <slot :close-menu="closeMenu"></slot>
            </div>
        </div>
    </nav>
</template>
<script>
import BaseNav from "~/Framework/Plugins/Argon/Components/BaseNav";
import {
    union
} from "~/Framework/Helpers/";

export default {
    name: 'Navigation',
    extends: BaseNav,
    props: {
        topFix: {
            type: Boolean,
            default: false,
            description: 'fixed top position of navigation'
        }
    }
}
</script>
