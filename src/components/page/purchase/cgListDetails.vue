<template>
    <div id="tableQuery">
        <button @click="query">点击获取采购入库单详情</button>
        <table class="query" border="1">
            <tr class="query-header">
                <th>商品编码</th>
                <th>商品名称</th>
                <th>商品型号</th>
                <th>商品单位</th>
                <th>商品数量</th>
                <th>商品价格</th>
                <th>商品总价</th>
                <th>供应商</th>
                <th>订单号</th>
                <th>仓库</th>
            </tr>
            <tr class="query-list" v-for="(item,index) in data" :key="index">
                <td>{{item.cgood_mark}}</td>
                <td>{{item.cgood_name}}</td>
                <td>{{item.cgood_model}}</td>
                <td>{{item.cgood_unit}}</td>
                <td>{{item.cgood_number}}</td>
                <td>{{item.cgood_price}}</td>
                <td>{{item.cgood_total}}</td>
                <td>{{item.cgood_supplier}}</td>
                <td>{{item.order_name}}</td>
                <td>{{item.cgood_depot}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            data:[]
        }
    },
    methods:{
        query(){
            this.$http.get('/api/query6').then((res) => {
                this.data = res.body
                console.log(this.data)
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
#tableQuery
    width 100%
    height 100%
    text-align center
    button 
        width 300px
        height 30px
        text-align center
        line-height 30px
        border 0
        border-radius 10px
        background #FF7F24
        color #ffffff
        cursor pointer
    .query
        width 80%
        margin 0 auto
        background rgba(255,255,255,0.8)
        .query-header,.query-list
            width 100%
            th
                text-align center
                color red
                font-size 18px
            td
                text-align center
                font-size 16px

</style>
