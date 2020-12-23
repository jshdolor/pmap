<template>
    <div
        class="VueCarousel"
        v-bind:class="{ 'VueCarousel--reverse': paginationPosition === 'top' }"
        v-bind:style="styleConfig"
    >
        <div class="VueCarousel-wrapper" ref="VueCarousel-wrapper">
            <div
                ref="VueCarousel-inner"
                :class="[
          'VueCarousel-inner',
          { 'VueCarousel-inner--center': isCenterModeEnabled }
        ]"
                :style="{
          'transform': `translate(${currentOffset}px, 0)`,
          'transition': dragging ? 'none' : transitionStyle,
          'ms-flex-preferred-size': `${slideWidth}px`,
          'webkit-flex-basis': `${slideWidth}px`,
          'flex-basis': `${slideWidth}px`,
          'visibility': slideWidth ? 'visible' : 'hidden',
          'height': `${currentHeight}`,
          'padding-left': `${padding}px`,
          'padding-right': `${padding}px`
        }"
            >
                <slot></slot>
            </div>
        </div>

        <slot name="navigation" v-if="navigationEnabled">
            <navigation
                v-if="isNavigationRequired"
                :clickTargetSize="navigationClickTargetSize"
                :nextLabel="navigationNextLabel"
                :prevLabel="navigationPrevLabel"
                @navigationclick="handleNavigation"
            />
        </slot>

        <slot name="pagination" v-if="paginationEnabled">
            <pagination @paginationclick="goToPage($event, 'pagination')" />
        </slot>
    </div>
</template>

<script>
import { Carousel } from "vue-carousel";

export default {
    name: "PmapSlider",
    extends: Carousel,
    props: {
        carouselAutoWidth: {
            default: false
        }
    },
    data() {
        return {
            styleConfig : {
                width: this.carouselAutoWidth ?this.carouselAutoWidth+'px' :'auto',
            }
        }
    },
    computed: {
        slideWidth() {
            let spacePadding = this.spacePadding * 2;
            if (this.noGutter) {
                spacePadding = 0;
            }
            const width = this.carouselWidth - spacePadding;
            const perPage = this.currentPerPage;
            return width / perPage;
        },
        
    },
    methods: {
        computeCarouselWidth() {
            this.getSlideCount();
            this.getBrowserWidth();
            this.getCarouselWidth();
            this.setCurrentPageInBounds();
            this.styleConfig.left =((this.browserWidth/2) - (this.carouselWidth/ 2))+'px'
        },
    }
};
</script>

