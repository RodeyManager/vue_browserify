<template>
    <div class="links">
        <a href="https://github.com/RodeyManager/gupack.git/doc/index.html" target="_blank" class="doc">文档</a>
        <a href="javascript:void(0)" id="case" @click="showCaseList">教程</a>
        <a href="https://github.com/RodeyManager/gupack.git" target="_blank" class="fa fa-github">GitHub</a>
        <transition name="fade">
            <ul class="case" v-show="showCase">
                <li><a href="">ES6 + jQuery</a></li>
                <li><a href="">ES6 + Vue + Browserify</a></li>
                <li><a href="">ES6 + React + Browserify</a></li>
                <li><a href="">ES6 + Angular + Browserify</a></li>
            </ul>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'links',
        data () {
            return {
                showCase: false
            };
        },
        methods: {
            showCaseList(){
                this.showCase = !this.showCase;
            },
            onDocClick(evt){
                let target = evt.target || evt.currentTarget;
                if(target.id === 'case')  return false;
                this.showCase = false;
            }
        },
        mounted(){
            document.addEventListener('click', this.onDocClick.bind(this), false);
        }
    }
</script>

<style scoped>
    .links{
        margin: 50px auto;
        position: relative;
    }
    a, a:hover, a:active, a:link{
        color: #666;
        text-decoration: none;
        margin: 0 10px;
    }
    a:last-child:before{
        padding-right: 5px;
    }
    a:nth-child(2){
        position: relative;
    }
    a:before{
        margin-right: 5px;
    }
    ul:before{
        content: "";
        display: block;
        width: 0;
        height: 0;
        border: 6px solid;
        border-color: transparent transparent #CEE6E6 transparent;
        position: absolute;
        top: -11px;
        left: 27px;
    }
    ul.case{
        position: absolute;
        left: 50%;
        top: 26px;
        list-style: none;
        -webkit-transform: translate(-26%, 0);
        -moz-transform: translate(-26%, 0);
        transform: translate(-26%, 0);
        width: 200px;
        padding: 10px;
        text-align: left;
        background-color: #CEE6E6;
    }
    ul.case li{
        list-style: none;
    }
    ul.case li a{
        font-size: 12px;
        -webkit-transition: all 0.25s ease;
        -moz-transition: all 0.25s ease;
        transition: all 0.25s ease;
    }
    ul.case li a:hover{
        color: #8DD6D5;
    }
    .fade-enter-active, .fade-leave-active {
        -webkit-transition: opacity .25s;
        -moz-transition: opacity .25s;
        transition: opacity .25s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
        opacity: 0;
    }
</style>