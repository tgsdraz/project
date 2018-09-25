<template>
    <div class="store-list">
        <ul class="store-list-content" ref="storeListContent">
            <router-link :to="{name:'storeIn'}" tag="li">入库单</router-link>
            <router-link :to="{name:'storeOut'}" tag="li">出库单</router-link>
            <router-link :to="{name:'storeTable'}" tag="li">库存详单</router-link>
            <router-link :to="{name:'outList'}" tag="li">出库详单</router-link>

            <!-- <router-link :to="{name:'storeQuery'}" tag="li">采购订单查询</router-link>
            <router-link :to="{name:'tableQuery'}" tag="li">采购订单详情</router-link> -->
        </ul>
        <div class='store-list-show'>
            <router-view></router-view>
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
@import '../../../static/reset.css'
.store-list
    position relative
    width 100%
    height 100%
    .store-list-content
        width 100%
        height 30px
        background rgba(219, 219, 219,.3)
        li 
            display inline-block
            width 80px
            height 30px
            font-size 12px 
            color 	#FFA500
            text-align center
            line-height 30px
            cursor pointer
    .store-list-show
        position absolute
        top 30px
        bottom 0px
        width 100%
        

</style>
