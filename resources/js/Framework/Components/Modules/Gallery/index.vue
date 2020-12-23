<template>
    <div>
    <AlbumSection/>
    <GalleryModal />
    </div>
</template>

<script>
import GalleryModal from "~/Framework/Components/Modals/GalleryModal";
import AlbumSection from './Albums';


export default {
    name: 'GalleryPage',
    components: {
        AlbumSection,
        GalleryModal
    }
}
</script>