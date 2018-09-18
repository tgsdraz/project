<template>
    <div id="supplier">
        <form  method="post" @submit.prevent="addSupplier">
            <div class="supplier-name">
                <input type="text" v-model="supplier.name" placeholder="supplier_name">
            </div>
            <div class="supplier-jx">
                <input type="text" v-model="supplier.jx" placeholder="supplier_jx">
            </div>
            <div class="supplier-phone">
                <input type="text" v-model="supplier.phone" placeholder="supplier_phone">
            </div>
            <div class="supplier-address">
                <input type="text" v-model="supplier.address" placeholder="supplier_address">
            </div>
            <input type="submit" value="添加供应商" class="btn">
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            supplier:{
                name:'',
                jx:'',
                phone:'',
                address:''
            }
        }
    },
    methods:{
        addSupplier(){
            this.$http.post('/api/addSupplier',{
                name:this.supplier.name,
                jx:this.supplier.jx,
                phone:this.supplier.phone,
                address:this.supplier.address,
            },{}).then((res) => {
                if(res.body === 'success'){
                    alert('供应商添加成功')
                    this.supplier.name = ''
                    this.supplier.jx = ''
                    this.supplier.phone = ''
                    this.supplier.address = ''
                }else if(res.body === '供应商已存在'){
                    alert('供应商已存在，请重新添加')
                    this.supplier.name = ''
                    this.supplier.jx = ''
                    this.supplier.phone = ''
                    this.supplier.address = ''
                }else{
                    alert('数据不能为空')
                    this.supplier.name = ''
                    this.supplier.jx = ''
                    this.supplier.phone = ''
                    this.supplier.address = ''
                }
            },(res) => {

            })
        }
    }
}
</script>
<style lang="stylus" scoped>
#supplier
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


