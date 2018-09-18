<template>
  <div id="app">
    <!-- <div class="content"> -->
      <!-- <main></main> -->
      
      <router-view></router-view>
    <!-- </div> -->
  </div>
  
</template>

<script>
import main from './components/main'
export default {
  name: 'App',
  components:{
    // main
  }
}
</script>

<style lang="stylus">
html,body
  width 100%
  height 100%
  background url(./assets/bg.jpg) center center no-repeat
  background-size cover
#app
  width 100%
  height 100%
</style>
