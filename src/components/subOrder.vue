<template>
  <div class="subOrder">
    <ul ref="typeLists" class="typeLists">
      <li class="typeList" v-for="items in subOrderData" v-show="items.typeCount>0">
        <p class="typeName">{{items.typeName}}类（共{{items.typeCount}}份）</p>
        <good-item v-for="(item,index) in items.typeList" :key="item.id" :goodItem="item"
                   v-on:subOrderChange="subOrderChange(item,index,items)"></good-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import vHeader from './home/vHeader'
  import goodItem from './home/goodItem'

  export default {
    name: "sub-order",
    data() {
      return {
        subOrderData: {}//有效的商品数据
      }
    },
    components: {
      vHeader, goodItem
    },
    mounted: function () {
      this.initSubOrder();
      this.$refs.typeLists.style.height = window.innerHeight - 134 + 'px';//初始化适配
    },
    methods: {
      initSubOrder() {//有效商品数据初始化
        let curTypeList = {};
        this.$parent.goodOrder.forEach(function (p, idx) {
            if (p.goodCount > 0) {
              if (!curTypeList['type' + p.spflId]) {
                curTypeList['type' + p.spflId] = {
                  typeName: p.spflMingcheng,
                  typeList: [],
                  typeCount: 0
                };
              }
              curTypeList['type' + p.spflId].typeCount += p.goodCount;
              curTypeList['type' + p.spflId].typeList.push(p)
            }
          }
        );
        this.$set(this, 'subOrderData', curTypeList);
      },
      subOrderChange(item,index,items) {//修改商品数量，并回调homeMenu方法进行数据修改
        let curGoodCount=0;
        items.typeList.forEach(function (p) {
          curGoodCount+=p.goodCount;
        });
        items.typeCount=curGoodCount;
        this.$parent.goodCountChange(item)
      }
    }
  }
</script>

<style scoped lang="scss">
  .subOrder {
    position: fixed;
    top: 47px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f2f1ea;
    z-index: 2;
    .typeLists {
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
      background-color: #fff;
      overflow-y: auto;
      .typeList{
        margin-bottom: 15px;
        .typeName{
          font-weight: bold;
        }
      }

    }
  }
</style>
