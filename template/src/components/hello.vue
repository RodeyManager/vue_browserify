<template>
    <div>
        <logo></logo>
        <h1>{{ message }}</h1>
        <links></links>
    </div>
</template>

<script>
    const Links = require('./links.vue');
    const Logo = require('./logo.vue');

    export default {
        name: 'hello',
        data () {
            return {
                message: 'Hello world!!!'
            }
        },
        components: {
            Links,
            Logo
        }
    }
</script>

<style scoped>
    div{
        margin-top: 60px;
    }
    h1{
        font-size: 40px;
        margin-top: 10px;
        color: #8DD6D5;
    }
</style>