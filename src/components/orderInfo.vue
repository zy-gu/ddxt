<template>
  <div class="orderInfo" ref="orderInfo">
    <div class="orderDetail">
      <p class="detailTitle">订单明细(共{{count}}份)</p>
      <ul class="detailList">
        <li class="listItem" v-for="item in orderDetail">
          <p class="itemName">{{item.spMingcheng}}</p>
          <p class="itemPrice">单价:{{item.danjia}}元</p>
          <span class="itemCount">x{{item.shuliang}}</span>
        </li>
      </ul>
      <p class="detailFot">商品金额&emsp;￥{{unitPrice}}元</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "order-info",
    data() {
      return {
        unitPrice:0,//总金额
        count:0//总数量
      }
    },
    computed: {
      orderDetail: function () {//订单详情数据
        let _that=this,curDetailObj={},curDetail = this.$store.getters.getOrderInfo.suborderinfo;
        curDetail.forEach(function (p) {
          if (!curDetailObj['spid'+p.spId]){
            curDetailObj['spid'+p.spId]={
              spMingcheng:p.spMingcheng,
              shuliang:1,
              danjia:p.danjia
            };
          }else {
            curDetailObj['spid'+p.spId].shuliang+=1;
          }
          _that.unitPrice+=p.danjia;
          _that.count+=1;
        });
      return curDetailObj
      }
    },
    mounted: function () {
      //初始化适配
      this.$refs.orderInfo.style.height = window.innerHeight - 94 + 'px';
    }
  }
</script>

<style scoped lang="scss">
  .orderInfo {
    position: fixed;
    top: 47px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f2f1ea;
    z-index: 2;
    .orderDetail {
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
      background-color: #fff;
      .detailTitle {
        font-weight: bold;
        margin-bottom: 20px;
      }
      .detailList {
        background: #fbfbfb;
        .listItem {
          overflow: hidden;
          margin-bottom: 8px;
          font-size: 14px;
          .itemName {
            float: left;
            width: 65%;
          }
          .itemPrice {
            float: right;
            color: #ff4966;
          }
          .itemCount {
            float: left;
            color: #aaa;
          }
        }
      }
      .detailFot {
        text-align: right;
        margin-top: 20px;
      }
    }
  }

</style>
