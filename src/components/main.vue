<template>
  <div class="main-wrapper">
    <div class="main-wrapper-content">
      <div class="main-header">
        <ul>
          <router-link :to="{name:'login'}" tag="li">登录</router-link>
          <router-link :to="{name:'regedit'}" tag="li">注册</router-link>
        </ul>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.main-wrapper
  position relative
  width 100%
  height 100%
  .main-wrapper-content
    position absolute
    left 50%
    top 50%
    margin-left -200px
    margin-top -150px
    width 350px
    height 400px
    border 1px solid gray
    border-radius 5px
    box-shadow 0 0  10px inset gray 
    .main-header
      width 100%
      height 30px
      background rgba(255, 64, 64,.3)
      ul
        height 100%
        float right
        li
          display inline-block
          width 50px
          height 30px
          color #fff
          font-size 16px
          text-align center
          line-height 30px
    .content
      width 100%
      height 370px    

</style>
