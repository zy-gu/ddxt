<template>
  <div class="home">

    <div class="menuTab">
      <tab active-color='#f29b45' bar-active-color="#f29b45">
        <tab-item :selected="this.$route.name==='homeMenu'" @on-item-click="tabClick">点菜</tab-item>
        <tab-item :selected="this.$route.name==='memberCen'" @on-item-click="tabClick">会员</tab-item>
        <tab-item :selected="this.$route.name==='shopInfo'" @on-item-click="tabClick">商家详情</tab-item>
      </tab>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        title: 'home'
      }
    },
    methods: {
      tabClick(idx) {//tab切换更改路由
        switch (idx) {
          case 1:
            this.$goRoute('memberCen');
            break;
          case 2:
            this.$goRoute('shopInfo');
            break;
          default:
            this.$goRoute('homeMenu');
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  .home {
    width: 100%;
    height: 100%;
    .menuTab {
      position: fixed;
      top: 47px;
      left: 0;
      width: 100%;
    }
  }
</style>
