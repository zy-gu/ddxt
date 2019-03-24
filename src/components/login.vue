<template>
  <div class="login">
    <div :style="{ opacity: curRoom?0:1 }">
      <h2 class="roomNum">桌号：{{roomName}}</h2>
      <img class="loginIssueImg" src="../assets/img/loginIssue.png" alt="">
      <p class="peopleNum"><span>{{peopleNum}}</span>&emsp;人</p>
    </div>
    <div class="roomImport" v-if="curRoom">
      <p>请输入房间号</p>
      <span>{{roomNum}}</span>
    </div>
    <table class="select-num" cellspacing="5" cellpadding="0">
      <tbody>
      <tr>
        <td class="num-wrap" @click="selectNum">7</td>
        <td class="num-wrap" @click="selectNum">8</td>
        <td class="num-wrap" @click="selectNum">9</td>
      </tr>
      <tr>
        <td class="num-wrap" @click="selectNum">4</td>
        <td class="num-wrap" @click="selectNum">5</td>
        <td class="num-wrap" @click="selectNum">6</td>
      </tr>
      <tr>
        <td class="num-wrap" @click="selectNum">1</td>
        <td class="num-wrap" @click="selectNum">2</td>
        <td class="num-wrap" @click="selectNum">3</td>
      </tr>
      <tr>
        <td class="num-wrap" colspan="2" @click="selectNum">0</td>
        <td class="num-wrap" @click="deleteNum()">
          <i class="num-back icon-num-del"></i>
        </td>
      </tr>
      </tbody>
    </table>
    <div :class="['confirmBtn',{'btnUnavailable':(roomNum===''||peopleNum<=0)}]" @click="confirmNum()">确定</div>
  </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        roomNum: '',
        roomName: '',
        curRoom: false,
        buissnessNum: '',
        curRoomInfo: {},
        peopleNum: '1'
      }
    },
    mounted: function () {
      let _that = this;
      //url参数
      //?roomid=1&Buissnessid=1
      console.log(this.$route.query.roomid);
      if (!this.$route.query.roomid || this.$route.query.roomid === '') {
        console.log('房间id');
        this.curRoom = true;
      } else {
        this.$vux.loading.show({
          text: 'Loading'
        });
        this.roomNum = this.$route.query.roomid;
        // _that.$http.post(_that.$store.getters.getServerHost + 'getRoomInfo', {
        //     Roomid: this.$route.query.roomid
        //   }
        // ).then((response) => {

        let response = {
          body: {
            "Resb": 200,
            "RsbInfo": "ok",
            "Ver": "1.0",
            "obj": {
              "id": 1,
              "zyflId": 1,
              "leixing": "二楼",
              "zbianhao": "201",
              "mingcheng": "二楼201",
              "danjia": 0.0,
              "zdxf": 0.0,
              "zhuangtai": "开单",
              "kssj": 1527083294567,
              "jssj": -28800000,
              "qlsj": -28800000,
              "hbzdh": 0,
              "tsdc": 0,
              "zdh": 42,
              "ygId": 0,
              "ygMingcheng": "",
              "jsfangan": null,
              "rs": 0,
              "zhekou": 1.0,
              "shouPaiId": "1",
              "shouPaiMoShi": 1,
              "baoJingJinE": 0.0,
              "xm": "",
              "sfzh": "",
              "dh": "",
              "dz": "",
              "mz": null,
              "sr": null,
              "qfjg": "",
              "yxq": null,
              "hyprice": null,
              "zhuangtai2": null
            }
          }
        };

        if (response.body.obj) {
          _that.curRoomInfo = response.body.obj;
          _that.roomName = response.body.obj.mingcheng || '名称为空';
        } else {
          _that.$vux.toast.show({
            text: '<span style="white-space:nowrap;">找不到房间号！</span>',
            type: 'text'
          })
        }
        _that.$vux.loading.hide();
        // }).catch(function (response) {
        //   console.log(response)
        // });
      }
      this.buissnessNum = this.$route.query.Buissnessid || '1';
    },
    methods: {
      selectNum(event) {
        let num = event.target.innerText;
        if (!this.curRoom) {
          if (this.peopleNum == '0') {
            this.peopleNum = num
          } else if (this.peopleNum.length == 1) {
            this.peopleNum += num
          } else {
            this.$vux.toast.show({
              text: '<span style="white-space:nowrap;">您输入的人数太多了！</span>',
              type: 'text'
            })
          }
        } else {
          if (this.roomNum == '') {
            this.roomNum = num
          } else if (this.roomNum.length <= 8) {
            this.roomNum += num
          } else {
            this.$vux.toast.show({
              text: '<span style="white-space:nowrap;">房间号太长了！</span>',
              type: 'text'
            })
          }
        }
      },
      deleteNum() {
        if (!this.curRoom) {
          if (this.peopleNum != '0' && this.peopleNum.length == 2) {
            this.peopleNum = this.peopleNum.substring(0, this.peopleNum.length - 1)
          } else {
            this.peopleNum = '0'
          }
        } else {
          if (this.roomNum != '') {
            this.roomNum = this.roomNum.substring(0, this.roomNum.length - 1)
          } else {
            this.roomNum = ''
          }
        }
      },
      confirmNum() {
        let _that = this;
        if (!this.curRoom) {
          if (this.peopleNum == '0') {
            this.$vux.toast.show({
              text: '<span style="white-space:nowrap;">您尚未选择人数！</span>',
              type: 'text'
            })
          }
          else {
            this.$vux.loading.show({
              text: 'Loading'
            });
            new Promise(function (resolve) {
              // _that.$http.post(_that.$store.getters.getServerHost + 'getUpdateTimes', {}
              // ).then((response) => {
              resolve({
                "Resb": 200,
                "RsbInfo": "ok",
                "Ver": "1.0",
                "GoodsUptime": "2018-06-23 15:12:37",
                "WaiterUptime": "2018-06-23 15:12:37",
                "GoodsTypesUptime": "2018-06-23 15:12:37",
                "ChooseTypeTableUptime": "2018-06-23 15:12:37"
              })
              // }).catch(function (response) {
              //   console.log(response)
              // });
            }).then(function (data) {
                let curUpdateTime = JSON.parse(localStorage.getItem('updateTime'));
                if (curUpdateTime && curUpdateTime.GoodsTypesUptime === data.GoodsTypesUptime && localStorage.getItem('goodTypes')) {
                  _that.$store.commit('setGoodTypes', JSON.parse(localStorage.getItem('goodTypes')))
                } else {
                  // _that.$http.post(_that.$store.getters.getServerHost + 'getGoodTypes', {}
                  // ).then((response) => {
                  //   console.log(response);
                  let response = {
                    body: {
                      "Resb": 200,
                      "RsbInfo": "ok",
                      "Ver": "1.0",
                      "objList": [{"id": 1, "pid": 0, "mingcheng": "酒水", "dyj": "", "zk": 1.0, "dyj2": ""}, {
                        "id": 2,
                        "pid": 0,
                        "mingcheng": "足浴",
                        "dyj": "",
                        "zk": 1.0,
                        "dyj2": ""
                      }, {"id": 3, "pid": 0, "mingcheng": "小项", "dyj": "", "zk": 1.0, "dyj2": ""}, {
                        "id": 4,
                        "pid": 0,
                        "mingcheng": "面部护理",
                        "dyj": "",
                        "zk": 0.0,
                        "dyj2": ""
                      }, {"id": 5, "pid": 0, "mingcheng": "餐饮", "dyj": "", "zk": 1.0, "dyj2": ""}, {
                        "id": 6,
                        "pid": 5,
                        "mingcheng": "小炒系列",
                        "dyj": "GP-80160(Cut) Series",
                        "zk": 1.0,
                        "dyj2": ""
                      }, {
                        "id": 7,
                        "pid": 5,
                        "mingcheng": "拌面类",
                        "dyj": "GP-80160(Cut) Series",
                        "zk": 1.0,
                        "dyj2": ""
                      }, {
                        "id": 8,
                        "pid": 5,
                        "mingcheng": "烧烤",
                        "dyj": "GP-80160(Cut) Series",
                        "zk": 1.0,
                        "dyj2": ""
                      }, {"id": 9, "pid": 5, "mingcheng": "精美凉菜", "dyj": "", "zk": 1.0, "dyj2": ""}, {
                        "id": 10,
                        "pid": 5,
                        "mingcheng": "汤类",
                        "dyj": "",
                        "zk": 1.0,
                        "dyj2": ""
                      }, {"id": 11, "pid": 5, "mingcheng": "大盘系列", "dyj": "", "zk": 1.0, "dyj2": ""}, {
                        "id": 12,
                        "pid": 5,
                        "mingcheng": "白酒类",
                        "dyj": "",
                        "zk": 1.0,
                        "dyj2": ""
                      }]
                    }
                  };
                  localStorage.setItem('goodTypes', JSON.stringify(response.body.objList));
                  _that.$store.commit('setGoodTypes', response.body.objList)
                  // }).catch(function (response) {
                  //   console.log(response)
                  // });
                }

                if (curUpdateTime && curUpdateTime.GoodsUptime === data.GoodsUptime && localStorage.getItem('goods')) {
                  _that.$store.commit('setGoods', JSON.parse(localStorage.getItem('goods')))
                } else {
                  // _that.$http.post(_that.$store.getters.getServerHost + 'getGoods', {}
                  // ).then((response) => {
                  //   console.log(response);

                    let response = {
                      body:
                        {"Resb":200,"RsbInfo":"ok","Ver":"1.0","objList":[{"id":1,"spflId":2,"spflMingcheng":"足浴","zbianhao":"0006","mingcheng":"经典足疗","pinyin":"jdzl","danwei":"","avgprice":0.0,"danjia":128.0,"hyjia":80.0,"sfjkc":0,"sfdb":0,"sftc":3,"tcjine":0.0,"jzticheng":128.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":90,"kkj":null,"sfajzjetc":null,"picurl":"/goods1.jpg"},{"id":2,"spflId":2,"spflMingcheng":"足浴","zbianhao":"0006","mingcheng":"经典养生足疗","pinyin":"jdyszl","danwei":"","avgprice":0.0,"danjia":168.0,"hyjia":108.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":100,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":3,"spflId":2,"spflMingcheng":"足浴","zbianhao":"005","mingcheng":"经典至尊足疗","pinyin":"jdzzzl","danwei":"","avgprice":0.0,"danjia":198.0,"hyjia":138.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":110,"kkj":null,"sfajzjetc":null,"picurl":"/goods3.jpg"},{"id":4,"spflId":2,"spflMingcheng":"足浴","zbianhao":"0006","mingcheng":"全身SPA","pinyin":"qsSPA","danwei":"","avgprice":0.0,"danjia":268.0,"hyjia":180.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":80,"kkj":null,"sfajzjetc":null,"picurl":"/goods4.jpg"},{"id":5,"spflId":2,"spflMingcheng":"足浴","zbianhao":"0007","mingcheng":"经典SPA","pinyin":"jdSPA","danwei":"","avgprice":0.0,"danjia":298.0,"hyjia":218.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":110,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":6,"spflId":2,"spflMingcheng":"足浴","zbianhao":"0008","mingcheng":"中式全身保健按摩","pinyin":"zsqsbjam","danwei":"","avgprice":0.0,"danjia":128.0,"hyjia":80.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":60,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":7,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"刮痧","pinyin":"gs","danwei":"","avgprice":0.0,"danjia":58.0,"hyjia":58.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":8,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"火罐","pinyin":"hg","danwei":"","avgprice":0.0,"danjia":38.0,"hyjia":38.0,"sfjkc":0,"sfdb":0,"sftc":2,"tcjine":0.0,"jzticheng":38.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":9,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"修脚","pinyin":"xj","danwei":"","avgprice":28.0,"danjia":28.0,"hyjia":28.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":10,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"单修","pinyin":"dx","danwei":"","avgprice":0.0,"danjia":38.0,"hyjia":20.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":11,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"采耳","pinyin":"ce","danwei":"","avgprice":28.0,"danjia":28.0,"hyjia":28.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":12,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"单采","pinyin":"dc","danwei":"","avgprice":0.0,"danjia":38.0,"hyjia":20.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":13,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"灰指甲","pinyin":"hzj","danwei":"","avgprice":0.0,"danjia":200.0,"hyjia":200.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":14,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"鸡眼","pinyin":"jy","danwei":"","avgprice":0.0,"danjia":200.0,"hyjia":200.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":15,"spflId":4,"spflMingcheng":"面部护理","zbianhao":"0006","mingcheng":"面部护理","pinyin":"mbhl","danwei":"","avgprice":138.0,"danjia":138.0,"hyjia":138.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":60,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":16,"spflId":1,"spflMingcheng":"酒水","zbianhao":"0006","mingcheng":"烟","pinyin":"y","danwei":"","avgprice":0.0,"danjia":28.0,"hyjia":28.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":"/goods16.jpg"},{"id":17,"spflId":1,"spflMingcheng":"酒水","zbianhao":"003","mingcheng":"雪碧","pinyin":"xb","danwei":"","avgprice":0.0,"danjia":3.0,"hyjia":3.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":18,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"局部","pinyin":"jb","danwei":"","avgprice":0.0,"danjia":68.0,"hyjia":68.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":19,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"刺候","pinyin":"ch","danwei":"","avgprice":0.0,"danjia":300.0,"hyjia":300.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":20,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"48劵送修脚","pinyin":"48jsxj","danwei":"","avgprice":0.0,"danjia":0.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":21,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"鸡眼","pinyin":"jy","danwei":"","avgprice":150.0,"danjia":150.0,"hyjia":150.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":22,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"脚气","pinyin":"jq","danwei":"","avgprice":260.0,"danjia":260.0,"hyjia":260.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":23,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"药","pinyin":"y","danwei":"","avgprice":0.0,"danjia":100.0,"hyjia":100.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":1,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":24,"spflId":1,"spflMingcheng":"酒水","zbianhao":"0006","mingcheng":"餐费","pinyin":"cf","danwei":"","avgprice":120.0,"danjia":120.0,"hyjia":120.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":25,"spflId":1,"spflMingcheng":"酒水","zbianhao":"0006","mingcheng":"餐费","pinyin":"cf","danwei":"","avgprice":80.0,"danjia":80.0,"hyjia":80.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":26,"spflId":3,"spflMingcheng":"小项","zbianhao":"0006","mingcheng":"麻将房","pinyin":"mjf","danwei":"","avgprice":300.0,"danjia":300.0,"hyjia":300.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":27,"spflId":1,"spflMingcheng":"酒水","zbianhao":"0006","mingcheng":"餐费","pinyin":"cf","danwei":"","avgprice":1000.0,"danjia":1000.0,"hyjia":1000.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":28,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0006","mingcheng":"干花菜烧牛腩","pinyin":"ghcsnn","danwei":"","avgprice":0.0,"danjia":42.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":29,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0007","mingcheng":"土豆烧牛肉","pinyin":"tdsnr","danwei":"","avgprice":0.0,"danjia":38.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":30,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0008","mingcheng":"农家小炒肉","pinyin":"njxcr","danwei":"","avgprice":0.0,"danjia":46.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":31,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0009","mingcheng":"过油肉","pinyin":"gyr","danwei":"","avgprice":0.0,"danjia":58.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":32,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0010","mingcheng":"牛肉皮带面","pinyin":"nrpdm","danwei":"","avgprice":0.0,"danjia":38.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":33,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0011","mingcheng":"酸菜粉条肉","pinyin":"scftr","danwei":"","avgprice":0.0,"danjia":28.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":34,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"001","mingcheng":"过油肉拌面","pinyin":"gyrbm","danwei":"","avgprice":0.0,"danjia":25.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":35,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"002","mingcheng":"圆菇拌面","pinyin":"ygbm","danwei":"","avgprice":0.0,"danjia":25.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":36,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"003","mingcheng":"辣子肉拌面","pinyin":"lzrbm","danwei":"","avgprice":0.0,"danjia":20.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":37,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"004","mingcheng":"蘑菇肉拌面","pinyin":"mgrbm","danwei":"","avgprice":0.0,"danjia":20.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":38,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"005","mingcheng":"毛芹肉拌面","pinyin":"mqrbm","danwei":"","avgprice":0.0,"danjia":20.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":39,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"006","mingcheng":"韭菜肉拌面","pinyin":"jcrbm","danwei":"","avgprice":0.0,"danjia":20.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":40,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"007","mingcheng":"土豆丝拌面","pinyin":"tdsbm","danwei":"","avgprice":0.0,"danjia":18.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":41,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"008","mingcheng":"酸菜肉拌面","pinyin":"scrbm","danwei":"","avgprice":0.0,"danjia":18.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":42,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"009","mingcheng":"西辣蛋拌面","pinyin":"xldbm","danwei":"","avgprice":0.0,"danjia":15.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":43,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"010","mingcheng":"过油肉炒面","pinyin":"gyrcm","danwei":"","avgprice":0.0,"danjia":25.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":44,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"011","mingcheng":"干煸炒面","pinyin":"gbcm","danwei":"","avgprice":0.0,"danjia":20.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":45,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"012","mingcheng":"家常炒面","pinyin":"jccm","danwei":"","avgprice":0.0,"danjia":18.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":46,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"013","mingcheng":"汤饭","pinyin":"tf","danwei":"","avgprice":0.0,"danjia":15.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":47,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"014","mingcheng":"皮带面","pinyin":"pdm","danwei":"","avgprice":0.0,"danjia":5.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":48,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"015","mingcheng":"米饭","pinyin":"mf","danwei":"","avgprice":0.0,"danjia":2.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":49,"spflId":7,"spflMingcheng":"拌面类","zbianhao":"016","mingcheng":"花卷","pinyin":"hj","danwei":"","avgprice":0.0,"danjia":1.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":50,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0012","mingcheng":"黄面烤肉","pinyin":"hmkr","danwei":"","avgprice":0.0,"danjia":48.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":51,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0013","mingcheng":"回锅牛肉荷叶饼","pinyin":"hgnrhyb","danwei":"","avgprice":0.0,"danjia":46.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":52,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0014","mingcheng":"炒黄面","pinyin":"chm","danwei":"","avgprice":0.0,"danjia":28.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":53,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0015","mingcheng":"虎皮辣子烧茄子","pinyin":"hplzsqz","danwei":"","avgprice":0.0,"danjia":26.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":54,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0016","mingcheng":"油麦菜","pinyin":"ymc","danwei":"","avgprice":0.0,"danjia":18.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":55,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0017","mingcheng":"家常豆腐","pinyin":"jcdf","danwei":"","avgprice":0.0,"danjia":22.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":56,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0018","mingcheng":"口味干花菜","pinyin":"kwghc","danwei":"","avgprice":0.0,"danjia":22.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":57,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0019","mingcheng":"麻辣豆腐","pinyin":"mldf","danwei":"","avgprice":0.0,"danjia":18.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":58,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0020","mingcheng":"酸辣土豆丝","pinyin":"sltds","danwei":"","avgprice":0.0,"danjia":16.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":59,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0021","mingcheng":"醋溜白菜","pinyin":"clbc","danwei":"","avgprice":0.0,"danjia":16.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":60,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0022","mingcheng":"香葱木耳","pinyin":"xcme","danwei":"","avgprice":0.0,"danjia":22.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":61,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0023","mingcheng":"清炒西蓝花","pinyin":"qcxlh","danwei":"","avgprice":0.0,"danjia":26.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":62,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0024","mingcheng":"干煸豆角","pinyin":"gbdj","danwei":"","avgprice":0.0,"danjia":20.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":63,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0025","mingcheng":"大碗花菜","pinyin":"dwhc","danwei":"","avgprice":0.0,"danjia":22.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":64,"spflId":6,"spflMingcheng":"小炒系列","zbianhao":"0026","mingcheng":"拔丝红薯","pinyin":"bshs","danwei":"","avgprice":0.0,"danjia":26.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":65,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"001","mingcheng":"架子肉【公斤】","pinyin":"jzrgj","danwei":"","avgprice":0.0,"danjia":88.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":66,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"002","mingcheng":"烤肉 [串】","pinyin":"kr[c","danwei":"","avgprice":0.0,"danjia":5.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":67,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"003","mingcheng":"红柳烤肉【串】","pinyin":"hlkrc","danwei":"","avgprice":0.0,"danjia":10.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":68,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"004","mingcheng":"馕坑肉【串】","pinyin":"nkrc","danwei":"","avgprice":0.0,"danjia":10.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":69,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"005","mingcheng":"烤鱼","pinyin":"ky","danwei":"","avgprice":0.0,"danjia":25.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":70,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"006","mingcheng":"烤腰子【串】","pinyin":"kyzc","danwei":"","avgprice":0.0,"danjia":13.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":71,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"007","mingcheng":"烤翅【串】","pinyin":"kcc","danwei":"","avgprice":0.0,"danjia":8.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":72,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"008","mingcheng":"烤菜拼盘","pinyin":"kcpp","danwei":"","avgprice":0.0,"danjia":25.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":73,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"009","mingcheng":"烤花卷[份】","pinyin":"khj[f","danwei":"","avgprice":0.0,"danjia":10.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":74,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"0010","mingcheng":"加工囊","pinyin":"jgn","danwei":"","avgprice":0.0,"danjia":5.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":75,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"0011","mingcheng":"烤板筋【串】","pinyin":"kbjc","danwei":"","avgprice":0.0,"danjia":4.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":76,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"0012","mingcheng":"烤肝子【串】","pinyin":"kgzc","danwei":"","avgprice":0.0,"danjia":3.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":77,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"0013","mingcheng":"烤心【串】","pinyin":"kxc","danwei":"","avgprice":0.0,"danjia":3.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":78,"spflId":8,"spflMingcheng":"烧烤","zbianhao":"0014","mingcheng":"烤肚子【串】","pinyin":"kdzc","danwei":"","avgprice":0.0,"danjia":3.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":79,"spflId":9,"spflMingcheng":"精美凉菜","zbianhao":"001","mingcheng":"泡椒娃娃菜","pinyin":"pjwwc","danwei":"","avgprice":0.0,"danjia":16.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":80,"spflId":9,"spflMingcheng":"精美凉菜","zbianhao":"002","mingcheng":"水煮花生米","pinyin":"szhsm","danwei":"","avgprice":0.0,"danjia":12.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":81,"spflId":9,"spflMingcheng":"精美凉菜","zbianhao":"003","mingcheng":"油炸花生米","pinyin":"yzhsm","danwei":"","avgprice":0.0,"danjia":12.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":82,"spflId":9,"spflMingcheng":"精美凉菜","zbianhao":"004","mingcheng":"菠菜面筋","pinyin":"bcmj","danwei":"","avgprice":0.0,"danjia":16.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":83,"spflId":9,"spflMingcheng":"精美凉菜","zbianhao":"005","mingcheng":"凉拌牛肉","pinyin":"lbnr","danwei":"","avgprice":0.0,"danjia":38.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":84,"spflId":9,"spflMingcheng":"精美凉菜","zbianhao":"006","mingcheng":"家常粉条","pinyin":"jcft","danwei":"","avgprice":0.0,"danjia":16.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":85,"spflId":9,"spflMingcheng":"精美凉菜","zbianhao":"007","mingcheng":"皮辣红","pinyin":"plh","danwei":"","avgprice":0.0,"danjia":12.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":86,"spflId":9,"spflMingcheng":"精美凉菜","zbianhao":"008","mingcheng":"青椒变蛋","pinyin":"qjbd","danwei":"","avgprice":0.0,"danjia":16.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":87,"spflId":10,"spflMingcheng":"汤类","zbianhao":"001","mingcheng":"豆腐青菜羹","pinyin":"dfqcg","danwei":"","avgprice":0.0,"danjia":16.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":88,"spflId":10,"spflMingcheng":"汤类","zbianhao":"002","mingcheng":"西湖牛肉羹","pinyin":"xhnrg","danwei":"","avgprice":0.0,"danjia":18.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":89,"spflId":10,"spflMingcheng":"汤类","zbianhao":"003","mingcheng":"廖糟羹","pinyin":"lzg","danwei":"","avgprice":0.0,"danjia":16.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":90,"spflId":10,"spflMingcheng":"汤类","zbianhao":"004","mingcheng":"豆腐汤","pinyin":"dft","danwei":"","avgprice":0.0,"danjia":18.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":91,"spflId":10,"spflMingcheng":"汤类","zbianhao":"005","mingcheng":"蛋花汤","pinyin":"dht","danwei":"","avgprice":0.0,"danjia":16.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":92,"spflId":11,"spflMingcheng":"大盘系列","zbianhao":"001","mingcheng":"羊肉焖饼","pinyin":"yrmb","danwei":"","avgprice":0.0,"danjia":118.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":93,"spflId":11,"spflMingcheng":"大盘系列","zbianhao":"002","mingcheng":"鸡肉焖饼","pinyin":"jrmb","danwei":"","avgprice":0.0,"danjia":128.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":94,"spflId":11,"spflMingcheng":"大盘系列","zbianhao":"003","mingcheng":"杂粮牛排","pinyin":"zlnp","danwei":"","avgprice":0.0,"danjia":138.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":95,"spflId":11,"spflMingcheng":"大盘系列","zbianhao":"004","mingcheng":"芦花土鸡","pinyin":"lhtj","danwei":"","avgprice":0.0,"danjia":108.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":96,"spflId":11,"spflMingcheng":"大盘系列","zbianhao":"005","mingcheng":"辣子鸡","pinyin":"lzj","danwei":"","avgprice":0.0,"danjia":88.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":97,"spflId":11,"spflMingcheng":"大盘系列","zbianhao":"006","mingcheng":"豆腐草鱼","pinyin":"dfcy","danwei":"","avgprice":0.0,"danjia":68.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":98,"spflId":11,"spflMingcheng":"大盘系列","zbianhao":"007","mingcheng":"香辣草鱼","pinyin":"xlcy","danwei":"","avgprice":0.0,"danjia":68.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":99,"spflId":11,"spflMingcheng":"大盘系列","zbianhao":"008","mingcheng":"草鱼炖饺子","pinyin":"cydjz","danwei":"","avgprice":0.0,"danjia":88.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":100,"spflId":11,"spflMingcheng":"大盘系列","zbianhao":"009","mingcheng":"薯条大虾","pinyin":"stdx","danwei":"","avgprice":0.0,"danjia":68.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""},{"id":101,"spflId":11,"spflMingcheng":"大盘系列","zbianhao":"0010","mingcheng":"大盘肚子","pinyin":"dpdz","danwei":"","avgprice":0.0,"danjia":88.0,"hyjia":0.0,"sfjkc":0,"sfdb":0,"sftc":0,"tcjine":0.0,"jzticheng":0.0,"shangxian":null,"xiaxian":0.0,"sfzdxf":0,"sfdz":1,"istuijian":null,"isJiShi":0,"fuwshch":30,"kkj":null,"sfajzjetc":null,"picurl":""}]}
                    };

                    localStorage.setItem('goods', JSON.stringify(response.body.objList));
                    _that.$store.commit('setGoods', response.body.objList)
                  // }).catch(function (response) {
                  //   console.log(response)
                  // });
                }

                if (curUpdateTime && curUpdateTime.WaiterUptime === data.WaiterUptime && localStorage.getItem('waiter')) {
                  _that.$store.commit('setWaiter', JSON.parse(localStorage.getItem('waiter')))
                } else {
                  // _that.$http.post(_that.$store.getters.getServerHost + 'getWaiter', {}
                  // ).then((response) => {
                  //   console.log(response);

                    let response = {
                      body:
                        {"Resb":200,"RsbInfo":"ok","Ver":"1.0","objList":[{"id":6,"zbianhao":"065","mingcheng":"032","pinyin":"032","xingbie":"男","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472118346000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":"","picurl":"/waiter6.jpg"},{"id":17,"zbianhao":"022","mingcheng":"陈秋秋","pinyin":"cqq","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472118723000,"sfsc":1,"status":"繁忙","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":20,"zbianhao":"013","mingcheng":"林妹妹","pinyin":"lmm","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472118779000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":"/waiter20.jpg"},{"id":21,"zbianhao":"039","mingcheng":"李秋兰","pinyin":"lql","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472118792000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":22,"zbianhao":"015","mingcheng":"黄洋洋","pinyin":"hyy","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472118825000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":"/waiter22.jpg"},{"id":23,"zbianhao":"051","mingcheng":"051","pinyin":"051","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472118838000,"sfsc":1,"status":"繁忙","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":24,"zbianhao":"003","mingcheng":"003","pinyin":"003","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472118897000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":25,"zbianhao":"012","mingcheng":"012","pinyin":"012","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472118919000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":26,"zbianhao":"031","mingcheng":"031","pinyin":"031","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472118937000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":27,"zbianhao":"019","mingcheng":"019","pinyin":"019","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472118950000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":28,"zbianhao":"036","mingcheng":"036","pinyin":"036","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472118964000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":29,"zbianhao":"025","mingcheng":"025","pinyin":"025","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472119017000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":30,"zbianhao":"021","mingcheng":"021","pinyin":"021","xingbie":"","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472119050000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":31,"zbianhao":"056","mingcheng":"10","pinyin":"10","xingbie":"女","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472282509000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":32,"zbianhao":"060","mingcheng":"001","pinyin":"001","xingbie":"女","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472288292000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":33,"zbianhao":"061","mingcheng":"09","pinyin":"09","xingbie":"女","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472380218000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":34,"zbianhao":"063","mingcheng":"10","pinyin":"10","xingbie":"女","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472396806000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":35,"zbianhao":"064","mingcheng":"10","pinyin":"10","xingbie":"男","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1472396832000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":42,"zbianhao":"029","mingcheng":"武文超","pinyin":"wwc","xingbie":"男","leixing":"技师","dianhua":"","dizhi":"","ticheng":0,"jdrq":1474361431000,"sfsc":1,"status":"空闲","skill":"","paiban":0,"zhuangT":"在职","sfdg":null,"openid":null,"picurl":""},{"id":45,"zbianhao":"066","mingcheng":"1","pinyin":"1","xingbie":"男","leixing":"","dianhua":"","dizhi":"","ticheng":0,"jdrq":1522857074000,"sfsc":0,"status":"繁忙","skill":"","paiban":1,"zhuangT":"在职","sfdg":0.0,"openid":"","picurl":""}]}
                    };

                    localStorage.setItem('waiter', JSON.stringify(response.body.objList));
                    _that.$store.commit('setWaiter', response.body.objList)
                  // }).catch(function (response) {
                  //   console.log(response)
                  // });
                }
                if (curUpdateTime && curUpdateTime.ChooseTypeTableUptime === data.ChooseTypeTableUptime && localStorage.getItem('ChooseType')) {
                  _that.$store.commit('setChooseType', JSON.parse(localStorage.getItem('ChooseType')))
                } else {
                  // _that.$http.post(_that.$store.getters.getServerHost + 'getChooseTypeTableypes', {}
                  // ).then((response) => {
                    let response = {
                      body:
                        {"Resb":200,"RsbInfo":"ok","Ver":"1.0","objList":[{"id":0,"name":"5元点钟","moneyvalue":5.0,"memo":""},{"id":1,"name":"10元点钟","moneyvalue":10.0,"memo":""},{"id":2,"name":"5元点钟","moneyvalue":5.0,"memo":null}]}
                    };

                    localStorage.setItem('ChooseType', JSON.stringify(response.body.objList));
                    _that.$store.commit('setChooseType', response.body.objList)
                  // }).catch(function (response) {
                  //   console.log(response)
                  // });
                }
                localStorage.setItem('updateTime', JSON.stringify(data));

                // _that.$http.post(_that.$store.getters.getServerHost + 'getBusinessInfo', {
                //     Buissnessid: _that.buissnessNum
                //   }
                // ).then((response) => {
                  console.log(_that, response);
                  let response = {
                    body:
                      {"Resb":200,"RsbInfo":"ok","Ver":"1.0","obj":{"id":1,"companyName":"立足点养生足浴会所","tel":"0994-2527399","addr":"昌吉市石河子西路嘉顺小区东侧","cont":"养生之道从足开始","dcbName":"","picurl":"/business1.jpg"}}
                  };
                  _that.$store.commit('setBusinessInfo', response.body.obj);
                // }).catch(function (response) {
                //   console.log(response)
                // });


              }
            ).then(function () {
              // _that.$http.post(_that.$store.getters.getServerHost + 'getRoomOrderInfo', {
              //     Roomid: _that.curRoomInfo.id
              //   }
              // ).then((response) => {
              //   console.log('查询订单信息', response);

                let response = {
                  body:
                    {"Resb":200,"RsbInfo":"ok","Ver":"1.0","orderinfo":{"id":42,"zyId":1,"zyMingcheng":"二楼201","kssj":1527083294567,"jssj":null,"djzt":0,"rs":1,"ygId":null,"bz":"","xfjine":28.0,"ssjine":null,"ysjine":null,"yhjine":null,"zfjine":null,"zljine":null,"gsccId":null,"unionId":0,"zbianhao":"","yufjine":null,"hyId":null,"hyMingcheng":"","jifen":null,"canduan":"","ismiandan":null,"kdren":"","isCheckTime":false,"checkTime":null,"jsrId":null,"jsrTc":null,"jsrTcfs":null,"sdzdxf":null,"yuanZyMingcheng":"","xm":"","sfzh":"","dh":"","dz":"","mz":"","sr":"","qfjg":"","yxq":"","wjje":null,"fkfangshi":"","chargingtype":null},"suborderinfo":[{"id":54,"xsId":42,"zyId":1,"zyMingcheng":"二楼201","handCardId":null,"handCardName":"","spId":16,"spDbsp":null,"spSfzdxf":null,"spMingcheng":"烟","spDanwei":"","danjia":28.0,"shuliang":1.0,"zhekou":1.0,"jine":28.0,"ygId":null,"ticheng":null,"spTcfs":0,"zt":"","bz":"","spJzticheng":0.0,"ckId":null,"chengben":null,"spSfjkc":null,"qtzt":"","spSfdz":null,"unionId":0,"qtbz":"","hyzhekou":null,"spzhekou":null,"ydanjia":null,"ishyMoney":null,"xfriqi":1527083294567,"dcbFlag":"","ispandian":null,"isprint":null,"technicianName":"","technicianId":null,"technicianStartDt":1527083294567,"technicianEndDt":null,"proofId":"","customdegree":"","chooseType":"无","chooseTypeValue":0.0,"customdegreeValue":null,"spIsJiShi":0,"technicianZbh":"","sfdg":null,"account":false},{"id":55,"xsId":42,"zyId":1,"zyMingcheng":"二楼201","handCardId":null,"handCardName":"","spId":16,"spDbsp":null,"spSfzdxf":null,"spMingcheng":"烟","spDanwei":"","danjia":28.0,"shuliang":1.0,"zhekou":1.0,"jine":28.0,"ygId":null,"ticheng":null,"spTcfs":0,"zt":"","bz":"","spJzticheng":0.0,"ckId":null,"chengben":null,"spSfjkc":null,"qtzt":"","spSfdz":null,"unionId":0,"qtbz":"","hyzhekou":null,"spzhekou":null,"ydanjia":null,"ishyMoney":null,"xfriqi":1527083757527,"dcbFlag":"","ispandian":null,"isprint":null,"technicianName":"","technicianId":null,"technicianStartDt":1527083757527,"technicianEndDt":null,"proofId":"","customdegree":"","chooseType":"无","chooseTypeValue":0.0,"customdegreeValue":null,"spIsJiShi":0,"technicianZbh":"","sfdg":null,"account":false}]}
                };
                _that.curRoomInfo.peopleNum = _that.peopleNum;
                _that.$store.commit('setRoomInfo', _that.curRoomInfo);
                if (response.body.orderinfo) {
                  _that.$store.commit('setOrderInfo', {
                    isOrder: true,
                    orderinfo: response.body.orderinfo,
                    suborderinfo: response.body.suborderinfo
                  });
                  _that.$goRoute('orderInfo');
                } else {
                  _that.$goRoute('homeMenu')
                }
                _that.$vux.loading.hide();
              // }).catch(function (response) {
              //   console.log(response)
              // });
            });
          }
        }
        else {
          if (this.roomNum !== '') {
            this.$vux.loading.show({
              text: 'Loading'
            });
            // _that.$http.post(_that.$store.getters.getServerHost + 'getRoomInfo', {
            //     Roomid: _that.roomNum
            //   }
            // ).then((response) => {
            //   console.log(_that, response);
            // _that.$store.commit('setRoomInfo', response.body.obj);

            let response = {
              body: {
                "Resb": 200,
                "RsbInfo": "ok",
                "Ver": "1.0",
                "obj": {
                  "id": 1,
                  "zyflId": 1,
                  "leixing": "二楼",
                  "zbianhao": "201",
                  "mingcheng": "二楼201",
                  "danjia": 0.0,
                  "zdxf": 0.0,
                  "zhuangtai": "开单",
                  "kssj": 1527083294567,
                  "jssj": -28800000,
                  "qlsj": -28800000,
                  "hbzdh": 0,
                  "tsdc": 0,
                  "zdh": 42,
                  "ygId": 0,
                  "ygMingcheng": "",
                  "jsfangan": null,
                  "rs": 0,
                  "zhekou": 1.0,
                  "shouPaiId": "1",
                  "shouPaiMoShi": 1,
                  "baoJingJinE": 0.0,
                  "xm": "",
                  "sfzh": "",
                  "dh": "",
                  "dz": "",
                  "mz": null,
                  "sr": null,
                  "qfjg": "",
                  "yxq": null,
                  "hyprice": null,
                  "zhuangtai2": null
                }
              }
            };

            if (response.body.obj) {
              _that.curRoomInfo = response.body.obj;
              _that.curRoom = false;
              _that.roomName = response.body.obj.mingcheng || '名称为空';
            } else {
              _that.$vux.toast.show({
                text: '<span style="white-space:nowrap;">找不到房间号！</span>',
                type: 'text'
              })
            }
            _that.$vux.loading.hide();

            // }).catch(function (response) {
            //   console.log(response)
            // });

          } else {
            this.$vux.toast.show({
              text: '<span style="white-space:nowrap;">请输入房间号！</span>',
              type: 'text'
            })
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .login {
    width: 100%;
    height: 100%;
    background-color: #000;
    text-align: center;
    font-size: 22px;
    .roomNum {
      padding-top: 40px;
      font-weight: 700;
      color: #ccc;
    }
    .loginIssueImg {
      width: 80%;
      margin-top: 15px;
    }
    .peopleNum {
      color: #fff;
      margin-top: -25px;
      span {
        font-size: 50px;
        color: #f39c46;
      }
    }
    .roomImport {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 180px;
      padding-top: 100px;
      background-color: #000;
      color: #fff;
      p {
        margin-bottom: 30px;
      }
      span {
        color: #f29b47;
      }
    }
    .select-num {
      margin: 20px auto 0;
      text-align: center;
      color: #141414;
      .num-wrap {
        width: 110px;
        height: 40px;
        line-height: 40px;
        font-size: 22px;
        background: #d8d8d8;
        border-radius: 8px;
        border: 3px solid #000;
        &:active {
          background-color: #aaa;
        }
        .icon-num-del {
          display: inline-block;
          margin-bottom: -4px;
          margin-right: 13px;
          width: 63px;
          height: 25px;
          background: url(../assets/img/cssSprite.png) no-repeat -70px -190px;
        }
      }
    }
    .confirmBtn {
      margin: 0 auto;
      width: 336px;
      height: 40px;
      border-radius: 6px;
      background: #f29b47;
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 22px;
      &.btnUnavailable {
        background: #d8d8d8;
      }
    }
  }
</style>
    
