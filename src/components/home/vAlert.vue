<template>
  <div class="vAlert" v-if="isShow">
    <div class="alertMask"></div>
    <div class="alertCon">
      <p class="alertHeader"><input v-model="waiterPY" type="text">已选择技师：{{selItem.length}}/{{curGoodItem.goodCount}}
      </p>
      <checker :value="selItem" :max="curGoodItem.goodCount" type="checkbox" default-item-class="default-item"
               @on-change="valueChange"
               selected-item-class="item-selected">
        <div class="alertItem" v-for="item in alertWaiterData">
          <div v-show="waiterPY===''||item.pinyin.indexOf(waiterPY)!==-1">
            <checker-item v-model="item.id" @on-item-click="">
              <i></i>
              <img :src="picBaseUrl+item.picurl" alt="">
              <p>{{item.mingcheng}}</p>
              <!--<p>111</p>-->
            </checker-item>
            <popup-radio v-show="selItem.indexOf(item.id)!==-1" @on-hide="radioChange(item)" class="alertRadio"
                         title="上钟方式：" v-model="item.selectChooseType" :options="alertChooseTypeName"></popup-radio>
          </div>
        </div>
      </checker>
      <div class="alertBtn">
        <div class="confirm btn" @click="alertConfirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "v-alert",
    data() {
      return {
        picBaseUrl: this.$store.getters.getPicServerHost,//图片基地址
        selItem: [],//当前选择技师
        curGoodItem: {},//临时商品数据
        waiterPY: ''
      }
    },

    props: ['isShow', 'goodItem'],
    computed: {
      alertWaiterData: function () {//可选技师筛选
        let curAry = [], _that = this;
        console.log(1, this.curGoodItem);
        // JSON.parse(JSON.stringify(_that.$store.getters.getWaiter))
        JSON.parse(JSON.stringify(this.$store.getters.getWaiter)).forEach(function (p) {
          if (p.status === '空闲') {
            p.selectChooseType = '无';
            _that.curGoodItem.selectChooseType.forEach(function (q) {
              if (p.id === q.id) {
                p.selectChooseType = q.selectChooseType
              }
            });
            curAry.push(p)
          }
        });
        return curAry
      },
      alertChooseTypeName: function () {
        let curAry = ['无'];
        this.$store.getters.getChooseType.forEach(function (p) {
          curAry.push(p.name)
        });
        return curAry
      }
    },
    mounted: function () {
      //数据初始化
      console.log(2);
      this.curGoodItem = this.goodItem;
      this.selItem = this.curGoodItem.selectWaiter;
    },
    methods: {
      valueChange(value) {//当前选择技师后，同步更新数据
        this.$set(this.curGoodItem, 'selectWaiter', value);
        this.$parent.waiterCount = value.length;
        this.selItem = value;
        console.log(value);
      },
      alertConfirm() {//确定按钮回调
        this.$parent.alertIsShow = false;
      },
      alertCancel() {//取消按钮回调
        this.$parent.alertIsShow = false;
      },
      radioChange(value) {
        console.log(value);
        let cur = true;
        for (let i = 0; i < this.curGoodItem.selectChooseType.length; i++) {
          if (this.curGoodItem.selectChooseType[i].id === value.id) {
            this.curGoodItem.selectChooseType[i] = value;
            cur = false;
            break
          }
        }
        if (cur) {
          this.curGoodItem.selectChooseType.push(value);
        }
      },
      initChooseType() {
        let cur, _that = this;
        this.alertWaiterData.forEach(function (p) {
          _that.curGoodItem.selectChooseType.forEach(function (q) {
            if (p.id === q.id) {
              cur = q.selectChooseType
            }
          })
        });
        // selectChooseType
        return cur
      }
    }
  }
</script>

<style scoped lang="scss">
  .vAlert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    .alertMask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000000;
      opacity: 0.2;
    }
    .alertCon {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80%;
      transform: translate(-50%, -50%);
      color: #000;
      background-color: #fff;
      .vux-checker-box {
        height: 183px;
        overflow-y: auto;
        .default-item {
          width: 100%;
          height: 60px;
          line-height: 60px;
          border-top: 1px solid #ececec;
          i, img, p {
            float: left;
          }
          i {
            display: inline-block;
            width: 26px;
            height: 26px;
            margin-top: 16px;
            margin-left: 12px;
            background: url(../../assets/img/cssSprite.png) no-repeat -115px -232px;
          }
          img {
            height: 55px;
            margin-top: 2px;
            margin-left: 10px;
          }
          p {

          }
        }
        .item-selected {
          i {
            background-position: -90px -232px;
          }
        }
      }

      .alertHeader {
        height: 46px;
        line-height: 46px;
        text-align: center;
        input {
          margin-right: 50px;
          height: 30px;
          border-radius: 20px;
          border: 1px solid #d6d6d6;
          padding: 0 10px;
          width: 70px;
        }
      }
      .alertItem {
        position: relative;
        .alertRadio {
          position: absolute;
          width: 130px;
          right: 8px;
          top: 7px;
          font-size: 12px;
          height: 25px;
        }
      }
      .alertBtn {
        overflow: hidden;
        border-top: 1px solid #ececec;
        .btn {
          float: left;
          width: 50%;
          height: 46px;
          line-height: 46px;
          text-align: center;
        }
        .confirm {
          position: relative;
          color: #f39a47;
          width: 100%;
          &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0;
            border-left: 1px solid #ececec;
          }
          &:active {
            background-color: #eee;
          }
        }
        .cancel {
          &:active {
            background-color: #eee;
          }
        }
      }
    }
  }
</style>
