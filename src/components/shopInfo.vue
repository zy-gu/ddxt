<template>
  <div class="shopInfo">
    <v-header :headerState="this.$route.name"></v-header>
    <div class="shopPhoto">
      <img :src="this.$store.getters.getPicServerHost+businessInfo.picurl" alt="">
    </div>
    <p class="shopTitle">商户信息</p>
    <ul class="shopInfoShow">
      <li>
        <span>名称</span>
        <p>{{businessInfo.companyName}}</p>
      </li>
      <li>
        <span>电话</span>
        <p>{{businessInfo.tel}}</p>
      </li>
      <li>
        <span>地址</span>
        <p>{{businessInfo.addr}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import vHeader from './home/vHeader'

  export default {
    name: "shop-info",
    components: {
      vHeader
    },
    computed: {
      businessInfo: function () {//获取店铺信息
        return this.$store.getters.getBusinessInfo
      }
    }
  }
</script>

<style scoped lang="scss">
  .shopInfo {
    position: fixed;
    top: 91px;
    left: 0;
    width: 100%;
    .shopPhoto{
      width: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .shopTitle{
      font-weight: bold;
      height: 50px;
      line-height: 50px;
      margin: 0 15px;
    }
    .shopInfoShow {
      li {
        margin: 0 15px;
        padding: 15px 0;
        border-bottom: 1px solid #ececec;
        p {
          float: right;
        }
        &:nth-child(1) {
          border-top: 1px solid #ececec;
        }
      }
    }
  }
</style>
