<template>
    <div id="tableQuery">
        <button @click="query">点击获取订单详情</button>
        <table class="query" border="1">
            <tr class="query-header">
                <th>商品编码</th>
                <th>商品名称</th>
                <th>商品型号</th>
                <th>商品数量</th>
                <th>商品价格</th>
                <th>商品总价</th>
                <th>供应商</th>
            </tr>
            <tr class="query-list" v-for="(item,index) in data" :key="index">
                <td>{{item.good_mark}}</td>
                <td>{{item.good_name}}</td>
                <td>{{item.good_model}}</td>
                <td>{{item.good_number}}</td>
                <td>{{item.good_price}}</td>
                <td>{{item.total_price}}</td>
                <td>{{item.supplier}}</td>
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
            this.$http.get('/api/query1').then((res) => {
                this.data = res.body
            })
        }
    }
}
</script>
<style lang="stylus">
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
                font-size 16px
            td
                text-align center
                font-size 12px

</style>
