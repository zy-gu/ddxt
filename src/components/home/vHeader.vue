<template>
  <div class="homeHeader">
    <div @click="goSearchChild" class="searchBtn" v-if="headerState==='homeMenu'"></div>
    <div @click="backHomeMenu" class="backBtn" v-if="headerState==='subOrder'||headerState==='orderInfo'"></div>
    <div class="title">
      <p>{{headerTitle}}</p>
      <span>房间：{{headerRoomName}}</span>
    </div>
    <div @click="goOrderInfo" class="goOrder"></div>
  </div>
</template>

<script>
  export default {
    name: "vHeader",
    data() {
      return {
        headerRoomName:this.$store.getters.getRoomInfo.mingcheng//房间名称
      }
    },
    computed:{
      headerTitle:function () {
        return this.$store.getters.getBusinessInfo.companyName//初始化店铺名称
      }
    },
    props: ['headerState'],
    methods: {
      goSearchChild() {//回调homeMenu方法
        this.$emit('childMethod');
      },
      backHomeMenu(){//返回homeMenu
        this.$goRoute('homeMenu')
      },
      goOrderInfo(){//进入订单详情
        this.$goRoute('orderInfo')
      }
    }
  }
</script>

<style scoped lang="scss">
  .homeHeader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 47px;
    background: #474241;
    color: #fff;
    .searchBtn, .backBtn, .refresh, .goOrder {
      width: 40px;
      height: 40px;
      margin-top: 3px;
      background: url(../../assets/img/cssSprite.png) no-repeat -70px -220px;
    }
    .searchBtn, .backBtn {
      float: left;
    }
    .refresh, .goOrder {
      float: right;
    }
    .searchBtn {
      background-position: -112px -144px;
    }
    .backBtn {
      background-position: -243px -120px;
    }
    .title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      font-size: 12px;
      text-align: center;
      p{
        font-size: 14px;
      }
    }
    .goOrder {
      background-position: -198px -5px;
    }
    .refresh {
      background-position: -59px -144px;
    }

  }
</style>
