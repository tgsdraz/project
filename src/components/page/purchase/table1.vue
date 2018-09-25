<template>
    <div class="purchase-table" ref="purchaseTable">
        <div class="purchase-table-title">
            <h1>采购订单</h1>
        </div>
             <div class="purchase-table-desc">
                <ul>
                    <li class="purchase-desc-item">
                        供应商：<input type="text" :value="t_data.supplier" placeholder="请选择供应商" readonly>
                    </li>
                    <li class="purchase-desc-item">
                        交货日期：<input type="text" readonly>
                    </li>
                    <li class="purchase-desc-item">
                        订单日期：<input type="text" :value="date" readonly>
                    </li>
                    <li class="purchase-desc-item">
                        订单号：<input type="text" :value="t_data.purchase_num" readonly>
                    </li>
                    <li class="purchase-desc-item">
                        订单名称：<input type="text" :value="t_data.purchase_name" readonly>
                    </li>
                </ul>
            </div>
            <div class="table-list">
                <table border="1" id="table" ref="table">
                    <tr class="table-header">
                        <th class="line-number">行号</th>
                        <th class="good-mark">商品编码</th>
                        <th class="good-name">商品名称</th>
                        <th class="good-model">商品型号</th>
                        <th class="good-unit">单位</th>
                        <th class="good-numver">数量</th>
                        <th class="good-price">单价</th>
                        <th class="total-price">金额</th>
                    </tr>
                    <tr class="table-item" v-for="(item,index) in t_data.rows" :key="index">
                        <td>
                            <input type="button" :value="item.id" readonly>
                        </td>
                        <td>
                            <input type="text" :value="item.mark" readonly>
                        </td>
                        <td>
                            <input type="text" :value="item.name" readonly>
                        </td>
                        <td>
                            <input type="text" :value="item.model" readonly>
                        </td>
                        <td>
                            <input type="text" :value="item.unit" readonly>
                        </td>
                        <td>
                            <input type="text" :value="item.number" readonly>
                        </td>
                        <td>
                            <input type="text" :value="item.price" readonly>
                        </td>
                        <td>
                            <input type="text" :value="`${parseInt(item.number)*parseFloat(item.price)}`" readonly>
                        </td>
                    </tr>
                </table>
            </div>
    </div>    
</template>
<script>
export default {
    props:{
        t_data:{
            type:Object
        },
        // flag:{
        //     type:Boolean
        // }
    },
    data(){
        return {
            date:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
        }
    },
    // methods:{
    //     hidden(){
    //         this.flag = !this.flag
    //         console.log()
    //     }
    // }
}
</script>
<style lang="stylus">
@import '../../../../static/reset.css';
.purchase-table
    position relative
    width 100%
    height 100%
    background #ffffff
    .purchase-table-title
        width 100%
        height 100px
        text-align center
        line-height 100px
    .purchase-table-desc
        width 100%
        ul
            width 100%
            display flex
            flex-wrap wrap
            .purchase-desc-item
                position relative
                margin 20px

                input
                    border 0
                    border-bottom 1px solid #000
                    background-color transparent  
                .supplier-list
                    position absolute
                    top -100px
                    left 50px
                    display none
                    width 200px
                    height 300px
                    overflow-x scroll
                    background #fff
                    .supplier-list-item
                        display inline-block
                        width 100%
                        height 30px
                        line-height 30px
                        padding 0px 10px
                        box-sizing border-box 
                        font-size 12px
                        color red
                        cursor pointer
                    .supplier-list-item:hover
                        background #F5DEB3
                    &.show
                        display block
    .table-list
        width 100%
        #table
            width 100%
            overflow-x scroll  
            overflow-y scroll
            tr
                width 100%
                display flex
                
                th,td
                    flex 1
                    text-align center
                    padding 2px
                    input 
                        width 100%
                        height 100%
                        border 0
                        color red
                        font-size 14px
                        &.change
                            background lime
                td:nth-of-type(1)
                    padding 0 2px
    .goods-list
        position absolute
        left 50%
        top 50%
        margin-top -250px
        margin-left -250px
        width 500px
        height 500px 
        display none
        &.show
            display block  
        background rgba(255,255,255,.8)  
        .good-search
            width 100%
            height 30px
            text-align center
            line-height 30px
            input 
                width 300px
                height 25px
                border 0
                border-radius 5px
                background 	#FFEFD5
                outline none
                padding 0px 20px
            button
                width 50px
                height 25px
                border 0
                border-radius 3px
                background #FFA500
                color #ffffff
                cursor pointer
        .search-results
            width 100%
            tr
                width 100%
                display flex
                cursor pointer
                td,th
                    flex 1
                    text-align center
                    color red
                    font-size 12px
                th
                    font-size 14px
                    color #000
                
                        



</style>
