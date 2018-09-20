<template>
    <div id="depot">
        <form  method="post" @submit.prevent="addDepot">
            <div class="depot-name">
                <input type="text" v-model="depot.name" placeholder="depot_name">
            </div>
            <div class="depot-jx">
                <input type="text" v-model="depot.jx" placeholder="depot_jx">
            </div>
            <input type="submit" value="添加仓库" class="btn">
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            depot:{
                name:'',
                jx:'',
            }
        }
    },
    methods:{
        addDepot(){
            this.$http.post('/api/addDepot',{
                name:this.depot.name,
                jx:this.depot.jx
            },{}).then((res) => {
                if(res.body === 'success'){
                    alert('仓库添加成功')
                    this.depot.name = ''
                    this.depot.jx = ''
                }else if(res.body === '仓库已存在'){
                    alert('仓库已存在，请重新添加')
                    this.depot.name = ''
                    this.depot.jx = ''
                }else{
                    alert('数据不能为空')
                    this.depot.name = ''
                    this.depot.jx = ''
                }
            },(res) => {

            })
        }
    }
}
</script>
<style lang="stylus" scoped>
#depot
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


