<template>
    <div id="storeQuery">
        <button @click.prevent='query3'>点击获取订单列表</button>
        <table class="query" border="1">
            <tr class="query-header">
                <th>商品编号</th>
                <th>商品名称</th>
                <th>商品型号</th>
                <th>商品单位</th>
                <th>商品数量</th>
                <th>商品价格</th>
                <th>商品总价</th>
            </tr>
            <tr class="query-list" v-for="(item,index) in storeData" :key="index">
                <td>{{item.cgood_mark}}</td>
                <td>{{item.cgood_name}}</td>
                <td>{{item.cgood_model}}</td>
                <td>{{item.cgood_unit}}</td>
                <td>{{item.cgood_number}}</td>
                <td>{{item.cgood_price}}</td>
                <td>{{item.cgood_total}}</td>
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
            this.$http.get('/api/query3').then((res) => {
                this.storeData = res.body
                for(let i = 0; i < this.storeData.length; i++){
                    for(let j = i+1;j < this.storeData.length; j++){
                        if(this.storeData[i].cgood_mark == this.storeData[j].cgood_mark && this.storeData[i].cgood_name == this.storeData[j].cgood_name && this.storeData[i].cgood_model == this.storeData[j].cgood_model && this.storeData[i].cgood_unit == this.storeData[j].cgood_unit){
                            this.storeData[i].cgood_number = parseFloat(this.storeData[i].cgood_number) + parseFloat(this.storeData[j].cgood_number)
                            this.storeData[i].cgood_total = parseFloat(this.storeData[i].cgood_total) + parseFloat(this.storeData[j].cgood_total)
                            this.storeData[i].cgood_price = parseFloat(this.storeData[i].cgood_total)/parseFloat(this.storeData[i].cgood_number)
                            this.storeData.splice(j,1)
                        }
                    }
                }
                console.log(this.storeData)
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
