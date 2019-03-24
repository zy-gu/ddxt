<template>
  <div class="memberCen">
    <v-header :headerState="this.$route.name"></v-header>
    <div class="memberCard">
      <div class="userLogo">
        <img src="../assets/img/userDefault.png" alt="">
        <p>{{userInfo.mingcheng}}</p>
      </div>
      <p class="businessName">{{this.$store.getters.getBusinessInfo.companyName}}</p>
      <p :class="['queryVIP',{'VIPLogo':userInfo.cardno}]" @click="queryVIP">查询VIP</p>
      <p class="VIPId">NO：{{userInfo.cardno}}</p>
      <p class="VIPBalance">余额：{{userInfo.ye}}元</p>
    </div>
    <ul class="memberInfoShow" v-if="userInfo.cardno">
      <li>
        <span>手机号</span>
        <p>{{userInfo.dianhua}}</p>
      </li>
      <li>
        <span>会员卡类型</span>
        <p>{{userInfo.cardkind}}</p>
      </li>
    </ul>
    <div class="memberAlert" v-if="alertShow">
      <div class="alertMask"></div>
      <div class="alertCon">
        <p class="alertHeader">请输入手机号码</p>
        <x-input class="alertInput" placeholder="请输入手机号码" v-model="alertInputVal"></x-input>
        <div class="alertBtn">
          <div class="cancel btn" @click="alertCancel">取消</div>
          <div class="confirm btn" @click="alertConfirm">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vHeader from './home/vHeader'

  export default {
    name: "member-cen",
    components: {
      vHeader
    },
    data() {
      return {
        VIPInfo: {},//会员信息
        alertShow: false,//alert弹出层是否显示
        alertInputVal: ''//弹出层input值
      }
    },
    computed: {
      userInfo: function () {//用户信息
        let curInfo = {};
        if (this.$store.getters.getUserInfo.mingcheng) {
          curInfo = this.$store.getters.getUserInfo
        } else {
          curInfo = {
            cardno: 0,
            ye: 0,
            mingcheng: '游客'
          }
        }
        return curInfo
      }
    },
    methods: {
      queryVIP() {//判断当前用户状态
        if (this.userInfo.mingcheng === '游客') {
          this.alertShow = true
        }
      },
      alertCancel() {//弹出层退出按钮
        this.alertShow = false;
        this.alertInputVal=''
      },
      alertConfirm() {//弹出层确定按钮，进行值验证及数据获取
        if (this.alertInputVal === '') {
          this.$vux.toast.show({
            text: '<span style="white-space:nowrap;">请输入手机号</span>',
            type: 'text'
          })
        } else if (this.alertInputVal.match("^1[34578][0-9]{9}$")) {
          this.$http.post(this.$store.getters.getServerHost + 'getMemberCardInfo', {
              mobile: this.alertInputVal
            }
          ).then((response) => {
            this.$store.commit('setUserInfo', response.body.obj);
            this.alertShow = false
          }).catch(function (response) {
            console.log(response)
          });
        } else {
          this.$vux.toast.show({
            text: '<span style="white-space:nowrap;">手机号不对</span>',
            type: 'text'
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .memberCen {
    position: fixed;
    top: 91px;
    left: 0;
    width: 100%;
    .memberCard {
      position: relative;
      width: 296px;
      height: 165px;
      margin: 20px auto;
      background: url("../assets/img/memberCen_img.png") no-repeat 0 0;
      background-size: contain;
      .userLogo {
        position: absolute;
        top: 15px;
        left: 15px;
        img {
          width: 45px;
        }
        p {
          position: absolute;
          bottom: -17px;
          left: 50%;
          white-space: nowrap;
          font-size: 18px;
          transform: scale(0.5) translateX(-100%);
          background: #7a5236;
          color: #fff;
          padding: 0 16px;
          height: 22px;
          line-height: 22px;
          &:before{
            position: absolute;
            border-top: 11px solid #7a5236;
            border-right: 6px solid transparent;
            border-bottom: 11px solid #7a5236;
            right: -6px;
            top: 0;
            content: '';
          }
        }
      }
      .businessName {
        position: absolute;
        top: 12px;
        right: 20px;
        color: #8B572A;
        font-size: 14px;
      }
      .queryVIP {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 2px 8px;
        transform: translate(-50%, -50%);
        color: #b86200;
        border: 1px solid #b86200;
        border-radius: 8px;
        &.VIPLogo {
          width: 66px;
          height: 70px;
          padding: 0;
          border: none;
          font-size: 28px;
          color: transparent;
          background: url("../assets/img/VIPLogo.png") no-repeat;
          background-size: contain;
        }
      }
      .VIPId {
        position: absolute;
        bottom: 12px;
        left: 15px;
        font-size: 14px;
        color: #8B572A;
      }
      .VIPBalance {
        position: absolute;
        bottom: 12px;
        right: 20px;
        color: #8B572A;
        font-size: 14px;
      }
    }
    .memberInfoShow{
      li{
        margin: 0 15px;
        padding: 15px 0;
        border-bottom: 1px solid #ececec;
        p{
          float: right;
        }
        &:nth-child(1){
          border-top: 1px solid #ececec;
        }
      }
    }
    .memberAlert {
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
        background-color: #fff;
        .alertHeader {
          height: 46px;
          line-height: 46px;
          text-align: center;
          background-color: #fff;
        }
        .alertInput {
          width: 80%;
          margin: 0 auto;
          border: 1px solid #ececec;
          border-radius: 5px;
          margin-bottom: 15px;
          &:before {
            display: none;
          }
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
