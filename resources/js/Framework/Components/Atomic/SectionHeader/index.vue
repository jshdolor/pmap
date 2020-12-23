<template>
    <section class="v-section-header section-profile-cover section-shaped " :class="{'my-0' : !spaceTop}">
        <slot name="top"></slot>
        <div class="shape shape-style-3 shape-skew" 
            :class="backgroundColor">
            <span :key="cmp" v-for="cmp in designComponents"></span>
            <slot name="header"></slot>
        </div>
        <slot></slot>
    </section>
</template>

<script>
export default {
    name: "SectionHeader",
    data() {
        return {
            designComponents: 1,
            colorMap: {
                primary: "shape-primary",
                default: "shape-default",
                // dark: "shape-dark",
                warning: "bg-warning",
                warningG: "bg-gradient-warning",
                success: "bg-success",
                successG: "bg-gradient-success",
                info: "bg-info",
                infoG: "bg-gradient-info"
            },
            background: ''
        };
    },

    props: {
        bg: {
            type: String,
        },
        spaceTop: {
            default: false
        }
    },

    methods: {
        randomizeDesignComponents() {
            this.designComponents = Math.floor(Math.random() * 4) + 1;
        },
        randomizeBg() {
            if(this.background )
            {
                return true;
            }
            let colorKeys = Object.keys(this.colorMap);
            let randomBg = Math.floor(Math.random() * colorKeys.length);
            this.background = colorKeys[randomBg];
        },
        initComponents() {
            this.randomizeBg();
            this.randomizeDesignComponents();
        }
    },

    mounted() {
        this.background = this.bg;
        this.initComponents();
    },

    computed: {
        backgroundColor() {
            return this.colorMap[this.background] || this.background ;
        }
    }
};
</script>