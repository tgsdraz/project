<template>
    <div id="regedit">
        <div class="regedit-header">
            <span class="regedit-title">Regedit Here</span>
            <i class="iconfont icon-shouzhitishi"></i>
        </div>
        <div class="regedit-content">
            <form method="post" @submit.prevent="regedit">
                <div id="username1">
                    <input type="text" v-model="user.username" placeholder="username" class="username">
                    <i class="iconfont icon-user"></i>
                </div>
                <div id="password1">
                    <input type="password" v-model="user.password" placeholder="password" class="password">
                    <i class="iconfont icon-mima"></i>
                </div>
                <div id="re-password">
                    <input type="password" v-model="user.password1" placeholder="password" class="password">
                    <i class="iconfont icon-mima"></i>
                </div>
                <input type="submit" value="regedit" class="btn">
            </form>
        </div>
    </div>
</template>
<script>
import VueResource from 'vue-resource'
import Vue from 'vue'
Vue.use(VueResource)
export default {
     data(){
        return{
            user:{
                username:'',
                password:'',
                password1:''
            }
        }
    },
    methods:{
        regedit(){
            this.$http.post('/api/regedit',{
                username:this.user.username,
                password:this.user.password,
                password1:this.user.password1
            },{}).then((res) => {
                if(!this.user.username || !this.user.password || !this.user.password1){
                    alert('用户名或密码不能为空')
                }else{
                    if(res.body == 'success'){
                        alert('用户注册成功')
                        this.$router.push('/main/login')
                    }else if(res.body == '密码不一致'){
                        alert('密码不一致')
                        this.user.username = ''
                        this.user.password = ''
                        this.user.password1 = ''
                    }else{
                        alert('用户已存在')
                        this.user.username = ''
                        this.user.password = ''
                        this.user.password1 = ''
                }
                }
                
            })
        }
    }
}
</script>
<style scoped lang="stylus">
#regedit
    width 100%
    height 100%
    .regedit-header
        width 100%
        height 60px
        text-align center
        line-height 60px
        .regedit-title
            color #ffffff
            font-size 24px
        i 
            color #ff0033
            font-size 24px
    .regedit-content
        width 100%
        form
            width 100%
            padding 0px 20px
            box-sizing border-box
            #username1,#password1,#re-password
                position relative
                width 100%
                height 40px
                box-sizing border-box
                margin-bottom 20px
                .username,.password
                    width 100%
                    height 100%
                    padding 0px 20px
                    box-sizing border-box
                    border-radius 5px
                    border 0
                i 
                    font-size 16px
                    position absolute
                    top 50%
                    margin-top -8px
                    right 10px
            .regedit-tishi
                width 100%
                height 30px
                line-height 30px
                span,a
                    font-size 12px
                    vertical-align top
                a
                    float right 
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