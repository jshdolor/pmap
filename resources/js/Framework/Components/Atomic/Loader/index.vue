<template>
    <div class="container text-center" v-show="show">
        <img src="/images/loading.svg">
    </div>
</template>

<script>
export default {

    name: 'Loader',

    props: {
        show: {
            default: false
        }
    },


}
</script>