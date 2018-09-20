<template>
    <div id="executive">
        <form  method="post" @submit.prevent="addExecutive">
            <div class="executive-name">
                <input type="text" v-model="executive.name" placeholder="executive_name">
            </div>
            <div class="executive-jx">
                <input type="text" v-model="executive.jx" placeholder="executive_jx">
            </div>
            <div class="executive-age">
                <input type="text" v-model="executive.age" placeholder="executive_age">
            </div>
            <div class="executive-phone">
                <input type="text" v-model="executive.phone" placeholder="executive_phone">
            </div>
            <div class="executive-zw">
                <input type="text" v-model="executive.zw" placeholder="executive_zw">
            </div>
            <input type="submit" value="添加管理人员" class="btn">
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            executive:{
                name:'',
                jx:'',
                age:0,
                phone:0,
                zw:'管理人员'
            }
        }
    },
    methods:{
        addExecutive(){
            this.$http.post('/api/addExecutive',{
                name:this.executive.name,
                jx:this.executive.jx,
                age:this.executive.age,
                phone:this.executive.phone,
                zw:this.executive.zw
            },{}).then((res) => {
                if(res.body === 'success'){
                    alert('人员添加成功')
                    this.executive.name = ''
                    this.executive.jx = ''
                }else if(res.body === '人员已存在'){
                    alert('人员已存在，请重新添加')
                    this.executive.name = ''
                    this.executive.jx = ''
                }else{
                    alert('数据不能为空')
                    this.executive.name = ''
                    this.executive.jx = ''
                }
            },(res) => {

            })
        }
    }
}
</script>
<style lang="stylus" scoped>
#executive
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
            // margin-top 20px
</style>


