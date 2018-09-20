<template>
    <div class="purchase-table" ref="purchaseTable">
        <div class="purchase-table-title">
            <h1>采购订单</h1>
        </div>
        <!-- <form @submit.prevent="save" method="post"> -->
             <div class="purchase-table-desc">
            <ul>
                <li class="purchase-desc-item">
                    供应商：<input type="text" @click="supplierInfo" v-model="supplierInit" placeholder="请选择供应商">
                    <ul class="supplier-list" :class="{show:flag}">
                        <li v-for="(item,index) in data" :key="index"  @click="select(index)" class="supplier-list-item">{{item.supplier_name}}</li>
                    </ul>
                </li>
                <li class="purchase-desc-item">
                    交货日期：<input type="text">
                </li>
                <li class="purchase-desc-item">
                    订单日期：<input type="text" :value="date">
                </li>
                <li class="purchase-desc-item">
                    订单号：<input type="text" v-model="purchaseNum">
                </li>
                <li class="purchase-desc-item">
                    订单名称：<input type="text" v-model="purchaseName">
                </li>
            </ul>
        </div>
        <div class="control-table">
            <button  class="addRow" @click.stop.prevent="addRow">添加行</button>
            <button  class="removeRow"  @click.stop.prevent="removeRow">删除行</button>
            <button @click.stop.prevent="submit">提交</button>
            <button @click.stop.prevent="save">保存</button>

            <!-- <input type="submit" value="保存"> -->
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
                <tr class="table-item" v-for="(item,index) in rows" :key="index">
                    <td>
                        <input type="button" v-model="item.id" @click="selectRemove(index)" :class="{change:index == removeIndex}">
                    </td>
                    <td>
                        <input type="text" v-model="item.mark">
                    </td>
                    <td>
                        <input type="text" v-model="item.name" @click="toSearch(index)">
                    </td>
                    <td>
                        <input type="text" v-model="item.model">
                    </td>
                    <td>
                        <input type="text" v-model="item.unit">
                    </td>
                    <td>
                        <input type="text" v-model="item.number">
                    </td>
                    <td>
                        <input type="text" v-model="item.price">
                    </td>
                    <td>
                        <input type="text" :value="`${parseInt(item.number)*parseFloat(item.price)}`">
                    </td>
                </tr>
            </table>
            <div class="goods-list" :class="{show:flag1}">
                <div class="good-search">
                    <input type="text" placeholder="请按名称搜索">
                    <button>搜索</button>
                </div>
                <table class="search-results" border="1">
                    <tr>
                        <th>编号</th>
                        <th>名称</th>
                        <th>型号</th>
                        <th>单位</th>
                    </tr>
                    <tr v-for="(item1,index1) in searchResults" :key="index1" @click="selectCur(index1)">
                        <td>{{item1.good_mark}}</td>
                        <td>{{item1.good_name}}</td>
                        <td>{{item1.good_model}}</td>
                        <td>{{item1.good_unit}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <!-- </form> -->
       
    </div>    
</template>
<script>
import VueResource from 'vue-resource'
import Vue from 'vue'
Vue.use(VueResource)
export default {
    data(){
        return {
            date:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
            data:[],
            //供应商初始值
            supplierInit:'',
            //订单号
            purchaseNum:'',
            //订单名称
            purchaseName:'',
            flag:false,
            rows:[],
            count:0,
            searchResults:[],
            flag1:false,
            //采购订单部分项的初始值 选中行的索引
            selectIndex:0,
            //删除行的索引值
            removeIndex:0,
            color:false,
            
            
        }
    },
    created(){
        // this.
    },
    methods:{
        supplierInfo(){
            this.flag = !this.flag
            this.$http.get('/api/supplier').then((res) => {
                this.data = res.body
            })
        },
        select($index){
            this.$nextTick(() => {
                this.data.forEach((item,index) => {
                    if($index == index){
                        this.supplierInit = item.supplier_name
                        this.flag = !this.flag
                    }
                })
            })
        },
        addRow(){
            this.count++
            const obj = {
                id:this.count,
                mark:'',
                name:'',
                model:'',
                unit:'',
                number:0,
                price:0,
                // total:parseInt(this.number) * parseFloat(this.price)
            }
            this.rows.push(obj)
            console.log(this.rows)
            
        },
        selectRemove($index){
            this.removeIndex = $index
            this.color = !this.color
            console.log(this.removeIndex)
        },
        removeRow(){
            this.count--
            if(this.count <= 0){
                this.count = 0
            }
            this.rows.splice(this.removeIndex,1)
        },
        toSearch($index){
            this.selectIndex = $index
            this.flag1 = !this.flag1
            this.$http.get('/api/search').then((res) => {
                this.searchResults = res.body
                // console.log(this.rows)
            })
        },
        selectCur($index){
            this.flag1 = !this.flag1
            this.rows[this.selectIndex].mark = this.searchResults[$index].good_mark
            this.rows[this.selectIndex].name = this.searchResults[$index].good_name
            this.rows[this.selectIndex].model = this.searchResults[$index].good_model
            this.rows[this.selectIndex].unit = this.searchResults[$index].good_unit
        },
        //提交订单数据
        submit(){
            this.$http.post('/api/submit',{
                supplier:this.supplierInit,
                rows:this.rows,
            },{}).then((res) => {
                if(res.body == 'success'){
                    alert('数据保存成功')
                }else if(res.body == '数据更新成功'){
                    alert('数据更新成功')
                }else{
                    alert('数据不能为空')
                }
                
            })
        },
        //提交订单表
        save(){
            this.$http.post('/api/save',{
                purchaseNum:this.purchaseNum,
                purchaseName:this.purchaseName,
                supplier:this.supplierInit,
                rows:this.rows,
                flag:'on'
            },{}).then((res) => {
                // console.log(res)
                if(res.body === 'success'){
                    alert('订单保存成功')
                                
                    this.purchaseNum = ''
                    this.purchaseName =''
                    this.supplierInit = ''          
                    this.rows = []
                }
                // if(res.body == 'success'){
                //     alert('数据保存成功')
                //     this.rows = []
                // }else if(res.body == '数据更新成功'){
                //     alert('数据更新成功')
                //     this.rows = []
                // }else{
                //     alert('数据不能为空')
                //     this.rows = []
                // }
                
            })
        }
    }
}
</script>
<style lang="stylus">
@import '../../../../static/reset.css';
.purchase-table
    position relative
    width 100%
    height 100%
    background rgba(255,255,255,.5)
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
                    input 
                        width 100%
                        height 100%
                        border 0
                        color red
                        font-size 14px
                        &.change
                            background lime
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
