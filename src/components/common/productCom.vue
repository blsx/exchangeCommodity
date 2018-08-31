<template>
  <div class="product_list">
    <div class="product_box" v-for="item in productList" @click="goProductDetail(item)">
      <ul class="product_content">
        <li class="product_picture">
          <p class="product_label" v-if="item.label === 1"></p>
          <p class="product_label label_color" v-else-if="item.label === 2"><span>新品</span></p>
          <p class="product_label" v-else-if="item.label === 3">热门</p>
          <p class="product_label" v-else-if="item.label === 4">折扣</p>
          <p class="product_label" v-else="item.label === 5">人气</p>
          <img :src="item.screenshotUrl">
        </li>
        <li class="product_name">{{item.goodsName}}</li>
        <li class="proposed_price">(参考价：{{item.referencePrice}}元)</li>
        <li class="product-price">
          <img src="http://img4.imgtn.bdimg.com/it/u=128349445,590277591&fm=27&gp=0.jpg" alt="">
          {{item.coinPrice}}个金豆
        </li>
      </ul>

    </div>
  </div>
</template>
<script>
  export default {
    name : 'product_component',
    data(){
      return {
        productLabel:""
      }
    },
    props:["productList", "coin"],
    methods:{
      goProductDetail(item){
        item.coin = this.coin;
        this.$router.push({ name: 'ProductDetail',params: {item}});
      },
      isShow(item){
         item.label
      }
    }

  }
</script>
<style scoped>
  .product_list{
    width:100%;
    background: #000;
    position:absolute;
    margin-right:0.15rem;
    font-size:0.23rem;
    margin-top: 1.5rem;
  }
  .product_box{
    box-sizing:border-box;
    background: #000;
    width:50%;
    height:4.4rem;
    border-bottom:1px solid #222;
    float:left;
    position:relative;
  }
  .product_content{
    box-sizing: border-box;
    margin:0.3rem 0;
    width:100%;
    height:3.8rem;
  }
  .product_content:nth-of-type(odd){
    border-right:1px solid #333;
  }
  ul.product_content li{
    list-style-type: none;
  }
  .product_picture img{
    width:2.5rem;
    height:2.8rem;
  }
  .product_label{
    background:#f00;
    width:0.5rem;
    height:0.5rem;
    line-height:0.5rem;
    border-radius: 0.25rem;
    position:absolute;
    top:0.2rem;
    left:0.2rem;
    font-size:0.1rem;
    color:#fff;
  }
  .label_color{
    background:#67c23a;
  }
  .product_name, .product-price{
    color:#fff;
  }
  .proposed_price{
    font-size:0.12rem;
    text-decoration:line-through;
  }
  .product-price img{
    width:0.2rem;
    height:0.2rem;
  }
</style>
