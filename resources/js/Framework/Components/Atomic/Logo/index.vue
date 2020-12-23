
<template>
    <img :src="logo" class="company-main-logo" alt="logo" />
</template>
<script>
export default {
    name: 'Logo',
    data() {
        return {
            logo: `/storage/${window.site_setting.logo}`
        }
    }
}
</script>