<template>
    <div id="purchaseQuery">
        <button @click="query">点击获取订单列表</button>
        <table class="query" border="1">
            <tr class="query-header">
                <th>订单号</th>
                <th>订单名称</th>
                <th>供应商</th>
            </tr>
            <tr class="query-list" v-for="(item,index) in data" :key="index" @click="toTable1(index)">
                <td>{{item.purchase_num}}</td>
                <td>{{item.purchase_name}}</td>
                <td>{{item.supplier}}</td>
            </tr>
        </table>
        <table1 :t_data="t_data" :flag="flag" class="table1" :class="{show:flag}"></table1>
    </div>
</template>
<script>
import table1 from './table1'
export default {
    components:{
        table1
    },
    data(){
        return {
            data:[],
            t_data:{},
            flag:false
        }
    },
    methods:{
        query(){
            this.$http.get('/api/query2').then((res) => {
                this.data = res.body
                console.log(this.data)
            })
        },
        toTable1($index){
            this.flag = !this.flag
            this.data.forEach((item,index) => {
                if($index == index){
                    this.t_data = item
                    this.t_data.rows = JSON.parse(this.t_data.rows)
                }
            })
            this.$nextTick(() => {
                console.log(this.$refs.x)

            })
        },
        hidden(){
            this.flag = !this.flag
        }

    }
}
</script>
<style lang="stylus">
#purchaseQuery
    position relative
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
        .query-list
            cursor pointer
    .table1
        position absolute
        width 100%
        height 100%
        left 0
        top 0
        display none
        &.show
            display block
</style>
