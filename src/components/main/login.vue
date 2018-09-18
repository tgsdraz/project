<template>
    <div id="login">
        <div class="login-header">
            <span class="login-title">Login Here</span>
            <i class="iconfont icon-shouzhitishi"></i>
        </div>
        <div class="login-content">
            <form method="post" @submit.prevent="login">
                <div id="username">
                    <input type="text" v-model="user.username" placeholder="username" class="username">
                    <i class="iconfont icon-user"></i>
                </div>
                <div id="password">
                    <input type="password" v-model="user.password" placeholder="password" class="password">
                    <i class="iconfont icon-mima"></i>
                </div>
                <div class="login-tishi">
                    <input type="checkbox" v-model="user.remember" id="check">
                    <span>Remember Me</span>
                    <a href="#">Forget Password?</a>
                </div>
                <input type="submit" value="login" class="btn">
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
                remember:''
            }
        }
    },
    methods:{
        login(){
            this.$http.post('/api/login',{
                username:this.user.username,
                password:this.user.password,
                remember:this.user.remember
            },{}).then((res) => {
                if(res.body.length > 0){
                    alert('登录成功，页面跳转中')
                    this.$router.push('/page')
                }else{
                    alert('用户名或密码错误,请重新登录')
                    this.user.username = ''
                    this.user.password = ''
                    this.user.remember = ''
                }
            })
        }
    }
}
</script>
<style scoped lang="stylus">
#login
    width 100%
    height 100%
    .login-header
        width 100%
        height 60px
        text-align center
        line-height 60px
        .login-title
            color #ffffff
            font-size 24px
        i 
            color #ff0033
            font-size 24px
    .login-content
        width 100%
        form
            width 100%
            padding 0px 20px
            box-sizing border-box
            #username,#password
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
            .login-tishi
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

