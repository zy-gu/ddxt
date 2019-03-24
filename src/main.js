// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//vue-resource引入
import VueResource from 'vue-resource'

Vue.use(VueResource);

//vue引入
import Vuex from 'vuex';
Vue.use(Vuex);

//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = true;

//vux组件引入
import {
  LoadingPlugin,
  ToastPlugin,
  Tab,
  TabItem,
  Cell,
  InlineXNumber,
  Search,
  XInput,
  Checker,
  CheckerItem,
  Badge,
  Checklist,
  PopupRadio
} from 'vux'

Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.component('tab', Tab);
Vue.component('tab-item', TabItem);
Vue.component('cell', Cell);
Vue.component('inline-x-number', InlineXNumber);
Vue.component('vSearch', Search);
Vue.component('x-input', XInput);
Vue.component('badge', Badge);
Vue.component('checker', Checker);
Vue.component('checker-item', CheckerItem);
Vue.component('check-list', Checklist);
Vue.component('popup-radio', PopupRadio);


// 路由跳转并传参
Vue.prototype.$goRoute = function (index, params) {
  this.$router.push({name: index, params: params});
};

//vuex初始值定义
const vuex_store = new Vuex.Store({
  state: {
    DDXTServerHost: 'http://127.0.0.1/Api/Terminal/',//接口基地址
    picServerHost: 'http://127.0.0.1',//图片基地址
    // loginInfo: {},//初始化url参数
    roomInfo: {},//房间信息初始化数据
    GoodTypesData: {},//商品类型初始化数据
    GoodsData: {},//商品初始化数据
    WaiterData: {},//技师初始化数据
    ChooseType: {},//上钟方式
    userInfo: {},//会员信息数据
    businessInfo: {},//店铺信息数据
    orderInfo: {//订单数据信息
      isOrder: false,//是否有订单
      orderinfo: {},//主表信息
      suborderinfo: []//从表信息
    }
  },
  getters: {//以下为vuex数据获取方法
    getServerHost: state => {
      return state.DDXTServerHost
    },
    getPicServerHost: state => {
      return state.picServerHost
    },
    // getLoginInfo: state => {
    //   return state.loginInfo
    // },
    getRoomInfo: state => {
      return state.roomInfo
    },
    getGoodTypes: state => {
      return state.GoodTypesData
    },
    getGoods: state => {
      return state.GoodsData
    },
    getWaiter: state => {
      return state.WaiterData
    },
    getChooseType: state => {
      return state.ChooseType
    },
    getUserInfo: state => {
      return state.userInfo
    },
    getBusinessInfo: state => {
      return state.businessInfo
    },
    getOrderInfo: state => {
      return state.orderInfo
    },
  },
  mutations:
    {
      //以下为vuex数据设置方法
    // setLoginInfo(state, val) {
    //   state.loginInfo = val;
    // },
    setRoomInfo(state, val) {
      state.roomInfo = val;
    },
    setGoodTypes(state, val) {
      state.GoodTypesData = val;
    },
    setGoods(state, val) {
      state.GoodsData = val;
    },
    setWaiter(state, val) {
      state.WaiterData = val;
    },
    setChooseType(state, val) {
      state.ChooseType = val;
    },
    setUserInfo(state, val) {
      state.userInfo = val;
    },
    setBusinessInfo(state, val) {
      state.businessInfo = val;
    },
    setOrderInfo(state, val) {
      state.orderInfo = val;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: vuex_store, //注入到vue
  router,
  render: h => h(App)
});


