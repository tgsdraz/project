<template>
    <div id="goods">
        <form  method="post" @submit.prevent="addGoods">
            <div class="goods-mark">
                <input type="text" v-model="goods.mark" placeholder="goods_mark">
            </div>
            <div class="goods-name">
                <input type="text" v-model="goods.name" placeholder="goods_name">
            </div>
            <div class="goods-model">
                <input type="text" v-model="goods.model" placeholder="goods_model">
            </div>
            <div class="goods-unit">
                <input type="text" v-model="goods.unit" placeholder="goods_unit">
            </div>
            <input type="submit" value="添加商品" class="btn">
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            goods:{
                mark:'',
                name:'',
                model:'',
                unit:''
            }
        }
    },
    methods:{
        addGoods(){
            this.$http.post('/api/addGoods',{
                mark:this.goods.mark,
                name:this.goods.name,
                model:this.goods.model,
                unit:this.goods.unit,
                
            },{}).then((res) => {
                if(res.body === 'success'){
                    alert('商品添加成功')
                    this.goods.mark = ''
                    this.goods.name = ''
                    this.goods.model = ''
                    this.goods.unit = ''
                }else if(res.body === '商品已存在'){
                    alert('商品已存在，请重新添加')
                    this.goods.mark = ''
                    this.goods.name = ''
                    this.goods.model = ''
                    this.goods.unit = ''
                }else{
                    alert('数据不能为空')
                    this.goods.mark = ''
                    this.goods.name = ''
                    this.goods.model = ''
                    this.goods.unit = ''
                }
            },(res) => {

            })
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../../../static/reset.css'
#goods
    position relative
    width 100%
    height 100%
    form
        position absolute
        top 50%
        left 50%
        margin-left -150px
        margin-top -200px
        width 300px
        height 300px
        border 1px solid gray
        border-radius 5px
        box-shadow 0 0  10px inset gray 
        padding 20px
        div
            width 100%
            margin-bottom 20px
            input   
                width 100%
                height 100%
                padding 10px 20px
                box-sizing border-box
                border 0
                border-radius 3px
                outline none
        .btn
            width 100%
            height 40px
            text-align center
            line-height 40px
            color #ffffff
            background #cc6600
            border 0
            border-radius 4px
            margin-top 20px
</style>


