<template>
  <div ref="homeMenu" class="homeMenu">
    <v-header :headerState="this.$route.name" v-on:childMethod="goSearch"></v-header>
    <router-view></router-view>
    <ul class="goodTypeLists">
      <li :class="['goodTypeItem',{'active':(selGoodTypeIdx===index)}]" @click="clickGoodType(item,index)"
          v-for="(item,index) in menuGoodType">{{item.mingcheng}}
      </li>
    </ul>
    <ul ref="goodLists" class="goodLists">
      <li v-for="item in curGoodList">
        <good-item v-on:goodCountChange="goodCountChange" :key="item.id" :goodItem="item"></good-item>
      </li>
    </ul>
    <div ref="goodTypeTitle" class="goodTypeTitle">{{selGoodTypeTitle}}</div>
    <v-footer ref="vFooterEle" v-on:goSubOrder="goSubOrder"></v-footer>
  </div>
</template>

<script>
  import goodItem from './home/goodItem'//商品条目组件
  import vHeader from './home/vHeader'//头部组件
  import vFooter from './home/vFooter'//底部组件


  export default {
    name: "home-menu",
    data() {
      return {
        // menuGood: ,//商品信息
        selGoodTypeIdx: 0,//商品类型索引
        selGoodTypeTitle: '',//商品类型名称
        curGoodList: [],//当前类型下的商品
        goodOrder: [],//被添加数量的商品
        alertIsShow: false,//alert弹出层是否显示
        curGoodItem: {},//临时商品条目数据
        menuGood:[]
      }
    },
    components: {
      goodItem, vHeader, vFooter
    },
    computed: {
      menuGoodType: function () {
        return this.$store.getters.getGoodTypes
      },
      WaiterData: function () {
        return this.$store.getters.getWaiter
      }/*,
      menuGood:function () {
        return this.$store.getters.getGoods
      }*/
    },
    mounted: function () {
      let _that = this;
      //页面适配
      this.$refs.homeMenu.style.height = window.innerHeight - 138 + 'px';
      this.$refs.goodLists.style.width = window.innerWidth - 80 + 'px';
      this.$refs.goodLists.style.height = window.innerHeight - 168 + 'px';
      this.$refs.goodTypeTitle.style.width = window.innerWidth - 80 + 'px';

      //homeMenu数据初始化
      let t = setInterval(function () {
        try {
          _that.menuGood=_that.$store.getters.getGoods;
          if (_that.menuGoodType&&_that.menuGood && _that.menuGoodType[0].mingcheng) {
            _that.clickGoodType(_that.menuGoodType[0], 0);
            _that.$nextTick(function () {
              _that.goodOrder = [];
              _that.menuGood.forEach(function (p) {
                if (p.goodCount && p.goodCount > 0) {
                  _that.goodOrder.push(p)
                }
              });
              _that.$refs.vFooterEle.changePrice(this.goodOrder);
            });
            clearInterval(t)
          }
        }catch (e){}
      }, 10)
    },
    methods: {
      menuGoodUpdate(info) {//订单信息更新后执行点菜界面更新
        let _that = this;

        let curGoodData = JSON.parse(JSON.stringify(_that.$store.getters.getGoods)),
          curOrderInfo = info;

        if (curOrderInfo.isOrder) {
          console.log('订单信息更新');
          curGoodData.forEach(function (a) {
            curOrderInfo.suborderinfo.forEach(function (b) {
              if (a.id === b.spId) {
                a.goodCount = 0;
                a.selectWaiter = [];
              }
            })
          })
        }
        _that.menuGood = curGoodData;
        _that.goodOrder = [];

        _that.clickGoodType(_that.menuGoodType[0], 0);
        this.$refs.vFooterEle.resetFooter();
      },
      goSearch() {//跳转搜索页面
        this.$goRoute('search', {menuGood: this.menuGood});
        this.curGoodList = [];
      },
      goSubOrder() {//跳转订单确认页面
        if (this.orderTest() !== '未选择技师！') {
          this.$vux.toast.show({
            text: '<span>' + this.orderTest() + '</span>',
            type: 'text'
          })
        } else {
          this.$goRoute('subOrder', {goodOrder: this.goodOrder});
          this.curGoodList = [];
        }
      },
      orderTest() {//判断是否有商品未选择技师
        let curStr = '';
        this.menuGood.forEach(function (p) {
          if (p.goodCount > 0 && p.selectWaiter.length <= 0 && p.isJiShi === 1) {
            curStr += p.mingcheng + '<br>'
          }
        });
        curStr += '未选择技师！';
        return curStr
      },
      goOrderInfo() {//跳转订单明细
        this.$goRoute('orderInfo', {goodOrder: this.goodOrder});
        this.curGoodList = [];
      },
      clickGoodType(item, idx) {//切换商品类型更新商品数据
        let _that = this;
        this.selGoodTypeIdx = idx;
        this.selGoodTypeTitle = item.mingcheng;
        this.curGoodList = [];
        this.menuGood.forEach(function (p) {
          if (p.spflId == item.id) {
            _that.curGoodList.push(p)
          }
        });
        this.$refs.vFooterEle.changePrice(this.goodOrder);
      },
      goodCountChange(item) {//商品数量变动更新数据
        let cur = false, idx;
        this.goodOrder.forEach(function (p, i) {
          if (p.id == item.id) {
            cur = true;
            idx = i
          }
        });
        if (cur) {
          this.$set(this.goodOrder, idx, this.goodOrder[idx]);
        } else {
          this.goodOrder.push(item);
        }
        this.$refs.vFooterEle.changePrice(this.goodOrder);
      },
      updateItem() {//更新商品条目数据
        this.clickGoodType(this.menuGoodType[this.selGoodTypeIdx], this.selGoodTypeIdx);
      }
    },
    watch: {
      '$route'(to, from) {//监测路由跳转并进行数据更新
        console.log(to, from);
        if (from.name === 'search') {
          this.updateItem()
        } else if (from.name === 'subOrder') {
          this.updateItem()
        } else if (from.name === 'orderInfo') {
          this.$refs.vFooterEle.resetFooter();
          this.updateItem()
        }
      }
    }
  }
</script>

<style lang="scss">
  .homeMenu {
    position: fixed;
    top: 91px;
    left: 0;
    .goodTypeLists {
      float: left;
      width: 80px;
      height: 100%;
      text-align: center;
      background: #f3efe9;
      overflow-y: auto;
      .goodTypeItem {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #dadada;
        border-left: 3px solid transparent;
        &.active {
          background-color: #fff;
          border-left-color: #f39a47;
        }
      }
    }
    .goodLists {
      float: left;
      height: 100%;
      overflow-y: auto;
      padding-top: 30px;
    }
    .goodTypeTitle {
      position: absolute;
      top: 0;
      left: 80px;
      height: 30px;
      padding-left: 30px;
      background: #f9f7f4;
      color: #717171;
    }
    .homeFooter {
      .footerAlert {
        .checkList {
          max-height: 184px;
          overflow-y: auto;
          .weui-icon-checked {
            color: #f39a47;
            &:before {
              color: #f39a47;
            }
          }
        }
      }
    }
  }
</style>
