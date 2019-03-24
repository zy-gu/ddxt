<template>
  <div class="homeFooter">
    <div class="footerLeft" v-show="this.$route.name!=='orderInfo'">
      <i class="goodCount"></i>
      <div class="totalPrice">
        <p class="">原价：￥{{unitPrice}}</p>
        <p class="VipPrice">会员价：￥{{VIPPrice}}</p>
      </div>
    </div>
    <div @click="confirmOrder" class="footerRight" v-show="unitPrice>0||this.$route.name==='orderInfo'">
      <p>{{btnName}}</p>
    </div>
  </div>
</template>

<script>
  import {dateFormat} from 'vux'

  export default {
    name: "vFooter",
    data() {
      return {
        unitPrice: 0,//商品价格
        VIPPrice: 0//会员加个
      }
    },
    computed: {
      btnName: function () {//根据路由判断按钮名称
        let curName;
        switch (this.$route.name) {
          case 'homeMenu':
          case 'search':
            curName = '点好了';
            break;
          case 'subOrder':
            curName = '确认下单';
            break;
          case 'orderInfo':
            curName = '加菜';
            break;
        }
        return curName
      }
    },
    methods: {
      resetFooter() {//重置金额
        this.unitPrice = 0;
        this.VIPPrice = 0;
      },
      changePrice(item) {//接收上级传递数据，进行金额变化
        switch (this.$route.name) {
          case 'homeMenu':
          case 'subOrder':
          case 'search':
            // this.btnName = this.$route.name === 'homeMenu' ? '点好了' : '确认下单';
            let curUnitPrice = 0, curVIPPrice = 0;
            item.forEach(function (p, i) {
              curUnitPrice += p.danjia * p.goodCount;
              curVIPPrice += p.hyjia * p.goodCount;
            });
            this.unitPrice = curUnitPrice;
            this.VIPPrice = curVIPPrice;
            break;
          case 'orderInfo':
            // this.btnName = '加菜';
            let _that = this, curDetail = this.$store.getters.getOrderInfo.suborderinfo;
            curDetail.forEach(function (p) {
              _that.unitPrice += p.danjia;
            });
            break
        }
      },
      confirmOrder() {//根据路由判断按钮执行方法
        let _that = this;
        if (this.$route.name === 'homeMenu') {
          this.$emit('goSubOrder')
        } else if (this.$route.name === 'subOrder') {
          console.log(this.$parent.goodOrder);
          _that.submitOrder()
        } else if (this.$route.name === 'orderInfo') {
          this.$goRoute('homeMenu')
        }
      },
      submitOrder() {//订单确定方法
        let _that = this, orderinfo = {
          id: '',//int
          zyId: this.$store.getters.getRoomInfo.id,//Integer
          zyMingcheng: this.$store.getters.getRoomInfo.mingcheng,//String
          kssj: new Date().getTime(),//Timestamp
          jssj: '',//Timestamp
          djzt: 0,//Integer
          rs: _that.$store.getters.getRoomInfo.peopleNum,//Integer
          ygId: '',//Integer
          bz: '',//String
          xfjine: this.unitPrice,//Double
          ssjine: '',//Double
          ysjine: '',//Double
          yhjine: '',//Double
          zfjine: '',//Double
          zljine: '',//Double
          gsccId: '',//Integer
          unionId: _that.$store.getters.getRoomInfo.hbzdh,//Integer
          zbianhao: '',//String
          yufjine: '',//Double
          hyId: '',//Integer
          hyMingcheng: '',//String
          jifen: '',//Double
          canduan: '',//String
          ismiandan: '',//Integer
          kdren: '',//String
          chargingType: '',//String
          isCheckTime: '',//Boolean
          checkTime: '',//Integer
          jsrId: '',//Integer
          jsrTc: '',//Double
          jsrTcfs: '',//Integer
          sdzdxf: '',//Double
          yuanZyMingcheng: '',//String
          xm: '',//String
          sfzh: '',//String
          dh: '',//String
          dz: '',//String
          mz: '',//String
          sr: '',//String
          qfjg: '',//String
          yxq: '',//String
          wjje: '',//Double
          fkfangshi: '',//String
        }, suborderinfo = [];
        this.$parent.goodOrder.forEach(function (p) {
          if (p.goodCount > 0) {
            for (let i = 0; i < p.goodCount; i++) {
              let curWaiter = {}, curChooseType = {};
              if (p.isJiShi === 1) {
                if (p.selectWaiter[i]) {
                  curWaiter = _that.filterWaiter(p.selectWaiter[i])
                } else {
                  curWaiter = _that.filterWaiter(p.selectWaiter[0])
                }
                if (p.selectChooseType[i]) {
                  curChooseType = _that.filterChooseType(p.selectChooseType[i].selectChooseType)
                }
              }
              let curSuborder = {
                id: '',//int
                xsId: '',//Integer
                zyId: _that.$store.getters.getRoomInfo.id,//Integer------
                zyMingcheng: _that.$store.getters.getRoomInfo.mingcheng,//String------
                handCardId: '',//Integer
                handCardName: '',//String
                spId: p.id,//Integer------
                spDbsp: '',//Integer
                spSfzdxf: '',//Integer
                spMingcheng: p.mingcheng,//String------
                spDanwei: p.danwei,//String
                danjia: p.danjia,//Double-----
                shuliang: 1,//Double------
                zhekou: _that.$store.getters.getRoomInfo.zhekou,//Double-----
                jine: p.danjia,//Double金额-----
                ygId: '',//Integer
                ticheng: curWaiter.ticheng / 100 * p.jzticheng,//Double提成金额
                spTcfs: p.sftc,//Integer商品提成方式-----
                zt: '',//String商品状态
                bz: '',//String备注
                spJzticheng: p.jzticheng,//Double商品结账提成金额
                ckId: '',//Integer仓库id
                chengben: '',//Double成本价
                spSfjkc: '',//Integer是否计库存
                qtzt: '',//String其他备注
                spSfdz: '',//Integer
                unionId: _that.$store.getters.getRoomInfo.hbzdh,//Integer合并账单号
                qtbz: '',//String其他备注
                hyzhekou: '',//Double会员折扣
                spzhekou: '',//Double商品折扣
                ydanjia: '',//Double
                ishyMoney: '',//Integer
                xfriqi: new Date().getTime(),//Timestamp消费日期-----
                dcbFlag: '',//String
                ispandian: '',//Integer
                isprint: '',//Integer是否打印
                isAccount: '',//Boolean
                technicianName: curWaiter.mingcheng || '',//String技师名称-----
                technicianId: curWaiter.id || '',//Integer技师id-----
                technicianStartDt: new Date().getTime(),//Timestamp服务开始时间------
                Technicianstartdate: new Date().getTime(),//Timestamp点单开始时间------
                technicianEndDt: '',//Timestamp服务结束时间------
                proofId: '',//String
                customdegree: '',//String
                chooseType: curChooseType.name || '无',//String
                chooseTypeValue: curChooseType.moneyvalue || 0,//Double
                customdegreeValue: '',//Double
                spIsJiShi: p.isJiShi,//Integer商品是否需要技师-----
                technicianZbh: curWaiter.zbianhao || '',//String技师编号-----
                sfdg: '',//Double是否语音读过
              };
              console.log("计算提成");
              if (p.sftc == 1) {
                console.log("p.sftc==1");
                curSuborder.ticheng = p.tcjine;
                console.log(p.tcjine)
              } else if (p.sftc == 0) {
                console.log("p.sftc==0");
                curSuborder.ticheng = 0;
                console.log(p.tcjine)
              } else {
                console.log("p.sftc>1")
              }

              console.log(curSuborder);
              suborderinfo.push(curSuborder)
            }
          }
        });
        let curOrderInfo = this.$store.getters.getOrderInfo;
        if (curOrderInfo.isOrder) {
          orderinfo = curOrderInfo.orderinfo;
          suborderinfo = suborderinfo.concat(curOrderInfo.suborderinfo)
        }

        this.$http.post(this.$store.getters.getServerHost + 'submitOrder', {
            orderinfo: orderinfo,
            suborderinfo: suborderinfo
          }
        ).then((response) => {
          console.log(response);
          this.$store.commit('setOrderInfo', {
            isOrder: true,
            orderinfo: response.body.orderinfo,
            suborderinfo: response.body.suborderinfo
          });
          this.$parent.menuGoodUpdate({isOrder: true, suborderinfo: suborderinfo});
          this.$goRoute('orderInfo');
        }).catch(function (response) {
          console.log('error', response)
        });
      },
      filterWaiter(id) {//技师与商品绑定
        let cur;
        this.$store.getters.getWaiter.forEach(function (p) {
          if (p.id === id) {
            cur = p
          }
        });
        return cur
      },
      filterChooseType(name) {//技师与商品绑定
        let cur;
        this.$store.getters.getChooseType.forEach(function (p) {
          if (p.name === name) {
            cur = p
          }
        });
        return cur
      },

    }
  }
</script>

<style scoped lang="scss">

  .homeFooter {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 47px;
    background: #474241;
    color: #fff;
    z-index: 2;
    .footerLeft {
      float: left;
      width: 50%;
      height: 100%;
      .goodCount {
        /*display: inline-block;*/
        float: left;
        width: 37px;
        height: 29px;
        margin: 12px 0 0 8px;
        background: url("../../assets/img/cssSprite.png") no-repeat -246px 0;
      }
      .totalPrice {
        float: left;
        margin: 5px 0 0 14px;
        .VipPrice {
          font-size: 12px;
          color: #f39a47;
          margin-top: -3px;
        }
      }
    }
    .footerRight {
      float: right;
      width: 50%;
      height: 100%;
      line-height: 47px;
      background-color: #f39a47;
      text-align: center;
    }
    .footerAlert {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
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
        .alertHeader {
          height: 46px;
          line-height: 46px;
          text-align: center;
          background-color: #fff;
        }
        .alertBtn {
          overflow: hidden;
          background-color: #fff;
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
  }
</style>
