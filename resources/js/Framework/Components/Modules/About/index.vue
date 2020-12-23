<template>
    <div class="profile-page">
        <SectionHeader></SectionHeader>
        <PmapAboutSection></PmapAboutSection>
        <GallerySection></GallerySection>
        <OfficersSection></OfficersSection>
        <ChaptersSection></ChaptersSection>
    </div>
</template>
<script>

import PmapAboutSection from '~/Framework/Components/Modules/Sections/PmapAbout';
import OfficersSection from '~/Framework/Components/Modules/Sections/Officers';
import GallerySection from '~/Framework/Components/Modules/Sections/Gallery';
import ChaptersSection from '~/Framework/Components/Modules/Sections/Chapters';


import BaseModule from '~/Framework/Components/Modules/BaseModule';
import SectionHeader from '~/Framework/Components/Atomic/SectionHeader';

export default {
    extends: BaseModule,
    name: 'AboutPage',
    data() {
        return {

        }
    },
    components: {
        PmapAboutSection,
        OfficersSection,
        SectionHeader,
        GallerySection,
        ChaptersSection
    },
    mounted() {
    }
}
</script>