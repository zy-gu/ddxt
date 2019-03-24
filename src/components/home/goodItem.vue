<template>
  <div v-show="isShow" :class="['goodItem',{'subOrderItem':(this.$route.name==='subOrder')}]">
    <img v-if="this.$route.name!=='subOrder'" class="goodImg"
         :src="this.goodItem.picurl?this.$store.getters.getPicServerHost + this.goodItem.picurl:''" alt="">
    <p class="goodName">{{goodItem.mingcheng}}</p>
    <span class="goodPrice">单价：{{goodItem.danjia}}元</span>
    <cell primary="content">
      <inline-x-number v-model="count" button-style="round" :min="0" width="30px"></inline-x-number>
    </cell>
    <div class="selWaiter" @click="selWaiter" v-if="this.goodItem.isJiShi===1&&this.$route.name!=='subOrder'">
      <badge class="tip" :text="this.goodItem.selectWaiter.length"></badge>
    </div>
    <v-alert :isShow="alertIsShow" :goodItem="this.goodItem"></v-alert>
  </div>
</template>

<script>
  import vAlert from './vAlert'//技师选择组件

  export default {
    name: "good-item",
    data: function () {
      return {
        count: 0,//数量
        isShow: true,//是否显示条目
        alertIsShow: false,//alert是否显示
        waiterCount: 0,//技师数量
      }
    },
    components: {vAlert},
    props: ['goodItem'],//上级传递商品数据
    created: function () {
      //初始化选择技师字段及数量字段
      this.goodItem.selectWaiter = this.goodItem.selectWaiter || [];
      this.goodItem.selectChooseType = this.goodItem.selectChooseType || [];

      if (!this.goodItem.goodCount) {
        this.count = 0;
      } else {
        this.count = this.goodItem.goodCount;
      }
    },
    watch: {
      count(newVal, oldVal) {//检测数量变化，并进行方法回调
        this.goodItem.goodCount = newVal;
        if (this.$route.name === 'subOrder') {
          if (newVal === 0) {
            this.isShow = false;
          }
          this.$emit('subOrderChange', this.goodItem)
        } else {
          this.$emit('goodCountChange', this.goodItem)
        }
      }
    },
    methods: {
      selWaiter() {//判断是否需要选择技师
        if (this.count > 0) {
          this.alertIsShow = true;
        }
      }
    }
  }
</script>

<style lang="scss">
  .goodItem {
    position: relative;
    height: 55px;
    padding: 8px 0;
    margin: 0 10px;
    border-bottom: 1px solid #cfd5d9;
    .goodImg {
      float: left;
      width: 72px;
      height: 54px;
      margin-right: 10px;
      border-radius: 5px;
      background: url("../../assets/img/goodDefault.jpg") no-repeat;
      background-size: contain;
    }
    .goodPrice {
      font-size: 12px;
      color: #ff4966;
    }
    .weui-cell {
      float: right;
      width: 110px;
      margin-top: 12px;
      margin-right: -5px;
      padding: 0;
      &:before {
        border-top-color: transparent;
      }
      .vux-number-selector-sub, .vux-number-selector-plus {
        border-color: #ff9900;
        svg {
          fill: #FF9900;
        }
      }

    }
    .selWaiter {
      position: absolute;
      top: 2px;
      right: 25px;
      width: 32px;
      height: 31px;
      background: url(../../assets/img/cssSprite.png) no-repeat -10px -149px;
      .tip {
        position: absolute;
        top: -1px;
        left: 18px;
      }
    }
  }

  .subOrderItem {
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-align: right;
    padding: 4px 0;
    border-bottom: none;
    margin: 2px 0;

    .goodName {
      float: left;
      margin-right: 10px;
    }
    .weui-cell {
      margin-top: 3px;
    }
    .typeName {
      font-weight: bold;
    }
    .itemList {
      font-size: 14px;
    }
  }


</style>
