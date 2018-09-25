<template>
    <div id="storeQuery">
        <button @click.prevent='query3'>点击获取库存列表</button>
        <table class="query" border="1">
            <tr class="query-header">
                <th>商品编号</th>
                <th>商品名称</th>
                <th>商品型号</th>
                <th>商品单位</th>
                <th>出库数量</th>
                <th>出库总价</th>
                <th>出库单位</th>
            </tr>
            <tr class="query-list" v-for="(item,index) in storeData" :key="index">
                <td>{{item.ogood_mark}}</td>
                <td>{{item.ogood_name}}</td>
                <td>{{item.ogood_model}}</td>
                <td>{{item.ogood_unit}}</td>
                <td>{{item.ogood_number}}</td>
                <td>{{item.ogood_total}}</td>
                <td>{{item.ogood_depart}}</td>
            </tr>
        </table>
        <!-- <table1 :t_data="t_data" :flag="flag" class="table1" :class="{show:flag}"></table1> -->
    </div>
</template>
<script>
// import table1 from './table1'
export default {
    components:{
        // table1
    },
    data(){
        return {
            storeData:[],
            // t_data:{},
            // flag:false
        }
    },
    methods:{
        query3(){
            this.$http.get('/api/query7').then((res) => {
                this.storeData = res.body
            })
        },
        // toTable1($index){
        //     this.flag = !this.flag
        //     this.data.forEach((item,index) => {
        //         if($index == index){
        //             this.t_data = item
        //             this.t_data.rows = JSON.parse(this.t_data.rows)
        //         }
        //     })
        //     this.$nextTick(() => {
        //         console.log(this.$refs.x)

        //     })
        // },
        // hidden(){
        //     this.flag = !this.flag
        // }

    }
}
</script>
<style lang="stylus">
#storeQuery
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
                font-size 16px
            td
                text-align center
                font-size 12px
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
