<template>
    <div id="storeOut">
            <div class="storeOut-header">
                <h1>出库单</h1>
            </div>
            <div class="storeOut-desc">
                <ul class="storeOut-desc-list">
                    <li class="storeOut-list-item">
                        出库单号：<input type="text" v-model="store_number">
                    </li>
                    <li class="storeOut-list-item">
                        出库单名称：<input type="text" v-model="store_name">
                    </li>
                    <li class="storeOut-list-item">
                        领料部门：<input type="text" v-model="store_department" @click="toDepartList">
                        <ul class="depart-list" :class="{showDepartList:flag1}">
                            <li class="depart" v-for="(item,index) in departs" :key="index" @click="selectDepart(index)">{{item.department_name}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="store-operator">
                <button @click.prevent="toStoreList">点击导入库存列表</button>
                <button @click.prevent="toStoreOut">提交</button>
            </div>
            <div class="storeList" :class="{showStoreList:flag}">
                    <table border="1" class="storeList-item">
                        <tr>
                            <th>商品编号</th>
                            <th>商品名称</th>
                            <th>商品型号</th>
                            <th>商品单位</th>
                            <th>商品数量</th>
                            <th>商品价格</th>
                            <th>商品总价</th>
                        </tr>
                        <tr  v-for="(item,index) in storeList" :key="index" @click="selectStoreItem(index)">
                            <td>{{item.cgood_mark}}</td>
                            <td>{{item.cgood_name}}</td>
                            <td>{{item.cgood_model}}</td>
                            <td>{{item.cgood_unit}}</td>
                            <td>{{item.cgood_number}}</td>
                            <td>{{item.cgood_price}}</td>
                            <td>{{item.cgood_total}}</td>
                        </tr>
                    </table>
            </div>
            <table class="store-table" border="1">
                 <tr class="PW-table-header">
                    <th class="line-number">行号</th>
                    <th class="good-mark">商品编码</th>
                    <th class="good-name">商品名称</th>
                    <th class="good-model">商品型号</th>
                    <th class="good-unit">单位</th>
                    <th class="good-numver">库存数量</th>
                    <th class="good-price">单价</th>
                    <th class="total-price">金额</th>
                    <th class="good-numver">出库数量</th>
                </tr>
                <tr class="PW-table-item" v-for="(item,index) in storeData" :key="index">
                    <td>
                        <input type="button" :value="index" readonly>
                    </td>
                    <td>
                        <input type="text" :value="item.cgood_mark" readonly>
                    </td>
                    <td>
                        <input type="text" :value="item.cgood_name" readonly>
                    </td>
                    <td>
                        <input type="text" :value="item.cgood_model" readonly>
                    </td>
                    <td>
                        <input type="text" :value="item.cgood_unit" readonly>
                    </td>
                    <td>
                        <input type="text" :value="item.cgood_number" readonly>
                    </td>
                    <td>
                        <input type="text" :value="item.cgood_price" readonly>
                    </td>
                    <td>
                        <input type="text" :value="item.cgood_total" readonly>
                    </td>
                     <td>
                        <input type="text" v-model="item.outNum">
                    </td>
                </tr>
            </table>
    </div>
</template>
<script>
export default {
  data() {
    return {
        storeList:[],
        flag:false,
        flag1:false,
        store_number:'',
        store_name:'',
        store_department:'',
        storeData:[],
        count:0,
        departs:[]
    };
  },
  methods: {
    
    
    //点击显示库存列表
    toStoreList() {
      this.flag = true;
      this.$http.get("/api/query3").then(res => {
         this.storeList = res.body
                for(let i = 0; i < this.storeList.length; i++){
                    for(let j = i+1;j < this.storeList.length; j++){
                        if(this.storeList[i].cgood_mark == this.storeList[j].cgood_mark && this.storeList[i].cgood_name == this.storeList[j].cgood_name && this.storeList[i].cgood_model == this.storeList[j].cgood_model && this.storeList[i].cgood_unit == this.storeList[j].cgood_unit){
                            this.storeList[i].cgood_number = parseFloat(this.storeList[i].cgood_number) + parseFloat(this.storeList[j].cgood_number)
                            this.storeList[i].cgood_total = parseFloat(this.storeList[i].cgood_total) + parseFloat(this.storeList[j].cgood_total)
                            this.storeList[i].cgood_price = (parseFloat(this.storeList[i].cgood_total)/parseFloat(this.storeList[i].cgood_number)).toFixed(2)
                            this.storeList.splice(j,1)
                        }
                    }
                }
                console.log(this.storeList)
      });
    },
    
    selectStoreItem($index){
        this.flag = false
        let singleStoreData = this.storeList[$index]
        singleStoreData.outNum = 0
        this.storeData.push(singleStoreData)
        console.log(this.storeData)
    },
    //显示部门列表
    toDepartList(){
        this.flag1 = true
        this.$http.get('/api/depart').then((res) => {
            this.departs = res.body
        })
    },
    //选择部门
    selectDepart($index){
        this.flag1 = false
        this.store_department = this.departs[$index].department_name
    },
    toStoreOut(){
        this.$http.post('/api/outlist',{
            id:this.store_number,
            name:this.store_name,
            depart:this.store_department,
            store:this.storeData
        },{}).then((res) => {
            if(res.body == 'success'){
                alert('success')
                this.store_number = ''
                this.store_name = ''
                this.store_department = ''
                this.storeData = []
            }
        })
    }

    // //点击采购订单列表选中对应index的项
    // selectpurchaseItem($index) {
    //   this.flag1 = !this.flag1;
    //   this.itemInit = this.purchaseList[$index];
    //   this.itemInit.rows = JSON.parse(this.itemInit.rows);
    //   // this.itemInit.rows.push(this.itemInit.supplier)
    //   // console.log(this.itemInit)
    //   this.itemInit.rows.forEach(item => {
    //     item.supplier = this.itemInit.supplier;
    //     item.cg_number = 0;
    //     item.cg_price = 0;
    //     item.depot = "";
    //     this.rowsInit.push(item);
    //   });
    //   this.itemInit.flag = 'off'
    // //   console.log(this.rowsInit);
    //   this.purchaseList.splice($index, 1);
    //   this.$http.post('/api/updateHtml',{
    //       id:this.itemInit.purchase_num,
    //       flag:this.itemInit.flag
    //   },{}).then((res) => {
    //       console.log(res)
    //   })
    // },
    // toStore(){
    //     this.$http.post('/api/cgTable',{
    //         operator:this.operatorInit,
    //         order_number:this.order_number,
    //         rows:this.rowsInit
    //     },{}).then((res) => {
    //         if(res.body == 'success'){
    //             this.operatorInit = ''
    //             this.order_number = ''
    //             this.rowsInit = []
    //         }
    //     },(res) => {

    //     })
    // },
    // //点击显示仓库列表
    // toDepots($index) {
    //   this.selectRowIndex = $index
    //   this.flag2 = true
    //   this.$http.get('/api/depots').then((res) => {
    //       this.DepotList = res.body

    //   },(res) => {

    //   })
    // },
    // //选中仓库渲染商品中的仓库值
    // selectDepot($index){
    //     console.log(this.selectRowIndex)
    //     this.flag2 = false
    //     this.rowsInit[this.selectRowIndex].depot = this.DepotList[$index].depot_name
    // }
    

  }
};
</script>
<style lang="stylus">
#storeOut
    position relative
    width 100%
    height 100%
    background #ffffff
    .storeOut-header
        width 100%
        height 100px
        text-align center
        line-height 100px
    .storeOut-desc
        width 100%
        .storeOut-desc-list
            width 100%
            display flex
            li
                .depart-list
                    position absolute
                    width 200px
                    height 200px
                    left 50%
                    top 50%
                    margin-top -100px
                    margin-left -100px
                    background #ffffff
                    box-shadow: 0 0 10px inset gray
                    display none
                    &.showDepartList
                        display block
                    li
                        padding 5px 0
                        font-size 12px
                        color red
                        cursor pointer
                    li:hover
                        background gray
                input 
                    border 0
                    border-bottom 1px solid #000
    .store-operator
        width 100%
        padding 10px 0
        button 
            color red
            font-size 12px
    .storeList
        position absolute
        left 50%
        top 50%
        width 600px
        height 300px
        margin-top -150px
        margin-left -300px
        background #ffffff
        box-shadow: 0 0 10px inset gray
        display:none
        &.showStoreList
            display block
        table
            width 100%
            tr
                width 100%
                th 
                    text-align center
                td
                    color red
                    font-size 12px
            tr:hover
                background gray
                cursor pointer
            
    .store-table
        width 100%
        tr
            width 100%
            th
                font-size 14px
                text-align center
            td
                font-size 12px
                color red
                input
                    width 100%
                    border 0
            



</style>
