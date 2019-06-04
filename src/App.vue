<template>
  <div class="">
    <sidebar/>
    <router-view id="main"></router-view>
  </div>
</template>

<script>
import Sidebar from "./assets/vue/components/sidebar";
export default {
  components: {
    Sidebar,
  },
  watch: {
    '$route'(to, from) {
      let sidebar = document.getElementById('sidebar');
      let main = document.getElementById('main');
      if(sidebar.classList.contains('visible')) {
        sidebar.classList.remove('visible');
        main.style.marginLeft = '0%';
      }
    }
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
  }
  #main {
    margin-left: 0%;
    transition: margin-left .5s;
  }
  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>