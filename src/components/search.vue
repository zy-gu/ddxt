<template>
  <div class="search">
    <div class="searchInput">
      <vSearch
        @on-change="getResult"
        placeholder="请输入菜名"
        @on-cancel="onCancel"
        ref="searchInput"></vSearch>
    </div>
    <ul ref="searchList" class="searchList">
      <li v-for="item in searchVal">
        <good-item v-on:goodCountChange="goodCountChange" :key="item.id" :goodItem="item"></good-item>
      </li>
    </ul>
  </div>
</template>

<script>

  import goodItem from './home/goodItem'

  export default {
    name: 'search',
    data() {
      return {
        title: 'search',
        value: '',//input输入值
        searchMenuGood: [],//所有商品信息
        searchVal: []//匹配到的商品信息
      }
    },
    components: {
      goodItem
    },
    mounted: function () {
      this.$refs.searchInput.setFocus();//input焦点事件
      this.searchMenuGood = this.$route.params.menuGood;//所有商品信息获取
      this.$refs.searchList.style.height = window.innerHeight - 91 + 'px'//初始化适配
    },
    methods: {
      getResult(val) {//根据输入值查询匹配商品数据
        let _that = this;
        this.value = val;
        this.searchVal = [];
        this.searchMenuGood.forEach(function (p) {
          if (p.pinyin.indexOf(val) != -1&&val!='') {
            _that.searchVal.push(p)
          }
        })
      },
      onCancel() {//取消按钮
        this.$goRoute('homeMenu')
      },
      goodCountChange(item) {//商品数量变化回调homeMenu方法进行数据修改
        this.$parent.goodCountChange(item)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 2;
    .searchInput {
      height: 44px;
      .weui-search-bar__cancel-btn {
        color: #f39a48;
      }
      .weui-search-bar {
        background-color: #474141;
      }
      .weui-search-bar__form {
        border-radius: 20px;
        overflow: hidden;
      }
    }
    .searchList {
      overflow-y: auto;
    }
  }
</style>
