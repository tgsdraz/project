<template>
    <div id="department">
        <form  method="post" @submit.prevent="addDepartment">
            <div class="department-name">
                <input type="text" v-model="department.name" placeholder="department_name">
            </div>
            <div class="department-jx">
                <input type="text" v-model="department.jx" placeholder="department_jx">
            </div>
            <input type="submit" value="添加部门" class="btn">
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            department:{
                name:'',
                jx:'',
            }
        }
    },
    methods:{
        addDepartment(){
            this.$http.post('/api/addDepartment',{
                name:this.department.name,
                jx:this.department.jx
            },{}).then((res) => {
                if(res.body === 'success'){
                    alert('部门添加成功')
                    this.department.name = ''
                    this.department.jx = ''
                }else if(res.body === '部门已存在'){
                    alert('部门已存在，请重新添加')
                    this.department.name = ''
                    this.department.jx = ''
                }else{
                    alert('数据不能为空')
                    this.department.name = ''
                    this.department.jx = ''
                }
            },(res) => {

            })
        }
    }
}
</script>
<style lang="stylus" scoped>
#department
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


