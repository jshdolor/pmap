<template>
    <div>
        <img :src="imageSrc">
    </div>
</template>

<script>
export default {
    name: 'SponsorBanner',
    props: {
        imageSrc: {
            required: true
        }
    }
}   
</script>