<template>
    <div id="PW">
        <div class="PW-header">
            <h1>入库单</h1>
        </div>
        <form action="" method="post">
            <div class="PW-desc">
                <ul class="PW-desc-list">
                    <li class="PW-list-item">
                        订单号：<input type="text" v-model="order_number">
                    </li>
                    <li class="PW-list-item">
                        订单名称：<input type="text" v-model="order_name">
                    </li>
                    <li class="PW-list-item">
                        入库时间：<input type="text" v-model="date">
                        
                    </li>
                    <li class="PW-list-item">
                        入库人：<input type="text" v-model=" operatorInit" placeholder="请选择操作人员" @click="selectOperater">
                        <ul class="operator-list" :class="{showOperater:flag}">
                            <li class="operator" v-for="(item,index) in operatorData" :key="index" @click="selectOwner(index)">{{item.executive_name}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="PW-operator">
                <button @click.prevent="toPurchaseList">点击导入采购入库单</button>
                <button @click.prevent="toStore">提交</button>
            </div>
            <div class="purchaseList" :class="{showPurchaseList:flag1}">
                <ul class="purchaseList-content">
                    <li class="purchaseList-item" v-for="(item,index) in purchaseList" :key="index" @click="selectpurchaseItem(index)">
                        <span>{{item.store_name}}</span>
                        <span>{{item.store_number}}</span>
                        <span>{{item.store_rows}}</span>
                    </li>
                </ul>
            </div>
             <div class="DepotList" :class="{showDepotList:flag2}">
                <ul class="DepotList-content">
                    <li class="DepotList-item" v-for="(item,index) in DepotList" :key="index" @click="selectDepot(index)">
                        {{item.depot_name}}
                    </li>
                </ul>
            </div>
            <table class="PW-table" border="1" ref="PWTable">
                 <tr class="PW-table-header">
                    <th class="line-number">行号</th>
                    <th class="good-mark">商品编码</th>
                    <th class="good-name">商品名称</th>
                    <th class="good-model">商品型号</th>
                    <th class="good-unit">单位</th>
                    <th class="good-numver">入库数量</th>
                    <th class="good-price">入库单价</th>
                    <th class="total-price">入库金额</th>
                    <th class="depot">仓库</th>
                </tr>
                <tr class="PW-table-item" v-for="(item,index) in rowsInit" :key="index">
                    <td>
                        <input type="button" :value="(index+1)" readonly>
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
                        <input type="text" :value="item.cg_number" readonly>
                    </td>
                    <td>
                        <input type="text" :value="item.cg_price" readonly>
                    </td>
                    <td>
                        <input type="text" v-model="item.total" readonly>
                    </td>
                    <td>
                        <input type="text" :value="item.depot" readonly>
                    </td>
                    
                </tr>
            </table>
        </form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      //订单号初始值
      order_number:'',
      //订单名称初始值
      order_name:'',
      //入库时间初始值
      date:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
      //入库人数据
      operatorData: [],
      //点击控制operator-list的显示和隐藏
      flag: false,
      //入库人值
      operatorInit: "",
      //获取采购订单列表
      purchaseList: [],
      //点击控制采购订单列表的显示和隐藏
      flag1: false,
      //采购订单列表每一项的数据
      itemInit: [],
      //获取仓库列表
      DepotList: [],
      //点击控制depotList的显示和隐藏
      flag2: false,
      //采购数量初始值
      cg_number: 0,
      //采购单价初始值
      cg_price: 0,
      //每个订单里面的rows项
      rowsInit: [],
      //选中的row index
       selectRowIndex:0,
      //采购入库单中所有项
      rows:[]
    };
  },
  methods: {
    //点击显示入库人列表
    selectOperater() {
      this.flag = !this.flag;
      this.$http.get("/api/operator").then(res => {
        this.operatorData = res.body;
      });
    },
    //点击选择入库人
    selectOwner($index) {
      this.flag = !this.flag;
      this.operatorInit = this.operatorData[$index].executive_name;
    },
    // 点击显示采购入库单列表
    toPurchaseList() {
      this.flag1 = !this.flag1;
      this.$http.get("/api/query5").then(res => {
        this.purchaseList = res.body;
      });
    },
    //点击采购订单列表选中对应index的项
    selectpurchaseItem($index) {
      this.flag1 = !this.flag1;
      this.itemInit = this.purchaseList[$index];
      this.itemInit.store_rows = JSON.parse(this.itemInit.store_rows);
      this.itemInit.store_rows.forEach(item => {
          item.total = parseFloat(item.cg_number) * parseFloat(item.cg_price)
        this.rowsInit.push(item);
      });
    
      this.itemInit.flag = 'off'
      console.log(this.rowsInit);
      this.purchaseList.splice($index, 1);
      this.$http.post('/api/updateInList',{
          id:this.itemInit.store_number,
          flag:this.itemInit.flag
      },{}).then((res) => {
          console.log(res)
      })
    },
    toStore(){
        this.$http.post('/api/inStore',{
            order_number:this.order_number,
            date:this.date,
            order_name:this.order_name,
            owner:this.operatorInit,
            rows:this.rowsInit
        },{}).then((res) => {
            if(res.body == 'success'){
                // this.operatorInit = ''
                this.order_number = ''
                this.order_name = ''
                this.rowsInit = []
            }
        },(res) => {

        })
    }
    

  }
};
</script>
<style lang="stylus" scoped>
#PW {
    position: relative;
    width: 100%;
    height: 100%;
    background: #ffffff;

    .PW-header {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
    }

    form {
        width: 100%;

        .PW-desc {
            width: 100%;

            .PW-desc-list {
                width: 100%;
                display: flex;
                flex-wrap: wrap;

                .PW-list-item {
                    flex: 1;

                    input {
                        border: 0;
                        border-bottom: 1px solid #000;
                    }
                }

                .PW-list-item:nth-of-type(4) {
                    position: relative;

                    .operator-list {
                        position: absolute;
                        width: 150px;
                        height: 200px;
                        left: 60px;
                        top: -100px;
                        background: #ffffff;
                        display: none;
                        box-shadow: 0 0 10px inset gray;

                        &.showOperater {
                            display: block;
                        }

                        .operator {
                            font-size: 12px;
                            padding: 5px 10px;
                            box-sizing: border-box;
                            cursor: pointer;
                        }

                        .operator:hover {
                            background: #9400D3;
                        }
                    }
                }
            }
        }

        .PW-operator {
            margin-top: 10px;
        }

        .purchaseList {
            position: absolute;
            width: 400px;
            height: 400px;
            left: 50%;
            top: 50%;
            margin-top: -200px;
            margin-left: -200px;
            background: #ffffff;
            box-shadow: 0 0 10px inset gray;
            display: none;

            &.showPurchaseList {
                display: block;
            }

            .purchaseList-content {
                width: 100%;
                height: 100%;

                li {
                    width: 100%;
                    display: flex;
                    padding: 5px 0;
                    cursor: pointer;

                    span {
                        flex: 1;
                        display: inline-block;
                        height: 20px;
                        overflow: hidden;
                        flex-wrap: nowrap;
                        font-size: 12px;
                        color: red;
                        text-align: center;
                    }
                }

                li:hover {
                    background: gray;
                }
            }
        }

        .DepotList {
            position: absolute;
            width: 200px;
            height: 200px;
            left: 50%;
            top: 50%;
            margin-top: -100px;
            margin-left: -100px;
            background: #ffffff;
            box-shadow: 0 0 10px inset gray;
            display: none;

            &.showDepotList {
                display: block;
            }

            .DepotList-content {
                width: 100%;

                li {
                    width: 100%;
                    padding: 5px 0;
                    font-size: 12px;
                    color: red;
                    cursor: pointer;
                }

                li:hover {
                    background: gray;
                }
            }
        }

        .PW-table {
            width: 100%;
            margin-top: 10px;

            .PW-table-header, .PW-table-item {
                width: 100%;
                display: flex;

                th, td {
                    flex: 1;
                    padding: 1px 0;
                    font-size: 12px;

                    input {
                        width: 100%;
                        height: 100%;
                        border: 0;
                    }
                }

                th {
                    text-align: center;
                }
            }
        }
    }
}
</style>
