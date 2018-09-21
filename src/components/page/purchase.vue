<template>
    <div class="purchase-list">
        <ul class="purchase-list-content" ref="purchaseListContent">
            <router-link :to="{name:'purchaseTable'}" tag="li">采购订单</router-link>
            <router-link :to="{name:'PW'}" tag="li">采购入库单</router-link>
            <router-link :to="{name:'purchaseQuery'}" tag="li">采购订单查询</router-link>
            <router-link :to="{name:'tableQuery'}" tag="li">采购订单详情</router-link>
            <router-link :to="{name:'cgListQuery'}" tag="li">采购入库订单查询</router-link>
            <router-link :to="{name:'cgListDetails'}" tag="li">采购入库订单详情查询</router-link>
        </ul>
        <div class='purchase-list-show'>
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
.purchase-list
    position relative
    width 100%
    height 100%
    .purchase-list-content
        width 100%
        height 30px
        background rgba(219, 219, 219,.3)
        li 
            display inline-block
            width 120px
            height 30px
            font-size 12px 
            color 	#FFA500
            text-align center
            line-height 30px
            cursor pointer
    .purchase-list-show
        position absolute
        top 30px
        bottom 0px
        width 100%
        

</style>
