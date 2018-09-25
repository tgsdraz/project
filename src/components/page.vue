<template>
    <div id="page">
        <div class="page-header">
            <router-link :to="{name:'supplier'}" tag="div" class="add-supplier">供应商添加</router-link>
            <router-link :to="{name:'goods'}" tag="div" class="add-goods">商品添加</router-link>
            <router-link :to="{name:'depot'}" tag="div" class="add-depot">仓库添加</router-link>
            <router-link :to="{name:'executive'}" tag="div" class="add-executive">管理人员添加</router-link>
            <router-link :to="{name:'department'}" tag="div" class="add-executive">领料部门添加</router-link>
        </div>
        <div class="page-content">
            <div class="page-content-left">
                <ul class="page-list">
                    <router-link :to="{name:'purchase'}" tag="li">
                        <i class="iconfont icon-webicon05"></i>
                        <span class="purchase-title">采购管理</span>
                    </router-link>
                    <router-link :to="{name:'store'}" tag="li">
                        <i class="iconfont icon-05_kucunguanli"></i>
                        <span class="store-title">库存管理</span>
                    </router-link>
                </ul>
            </div>
            <div class="page-content-right">
                <router-view></router-view>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    methods:{
        
        
    }
}
</script>
<style lang="stylus">
@import '../../static/reset.css'
#page
    position relative
    width 100%
    height 100%
    .page-header
        width 100%
        height 40px
        background orange
        div
            display inline-block
            margin-right 20px
            width 100px
            height 40px
            text-align center
            line-height 40px
    .page-content
        position absolute
        top 40px
        left 0px
        bottom 40px
        width 100%
        display flex
        .page-content-left
            flex 0 0 200px
            height 100%
            background rgba(142, 229, 238,.5)
            .page-list
                width 100%
                height 100%
                li
                    width 100%
                    height 30px
                    line-height 30px
                    text-align center
                    cursor pointer
                    padding 10px 0
                li:hover
                    color #ffffff
                    background #ff4400


        .page-content-right
            flex 1
            height 100%
</style>
