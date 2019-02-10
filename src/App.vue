<template>
  <div id="app">
    <Navigation></Navigation>
    <div class="content">
      <router-view />
    </div>
    <Footer></Footer>

  </div>
</template>

<script>
import Navigation from '@/components/navBar.vue'
import Footer from '@/components/Footer.vue'
export default {
  components:{
    'Navigation':Navigation,
    'Footer': Footer,
  }
}
</script>

<style>
html, body {
  height: 100%; 
  width: 100%;
}
.Footer{
  flex-shrink: 0;
  
}
.content{
  margin-top:10px;
  flex:1 0 auto;
  min-height: 100vh;
}

</style>
