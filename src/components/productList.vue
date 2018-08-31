<template>
  <div class="product_total">
    <header_bar :headerContent="headerContent"></header_bar>
    <div class="search_box">
      <div class="demo-input-suffix search_input">
        <el-input
          placeholder="请输入搜索内容"
          prefix-icon="el-icon-search" size="small" v-model="inputValue">
        </el-input>
      </div>
      <div class="search_text" @click="search">搜索</div>
    </div>
    <div style="clear:both"></div>
    <product_component :productList="productList" :coin="coin"/>
    <dialog_bar :dialog_text="dialog_text" :showDialog="showDialog" :sure="sure"></dialog_bar>
  </div>
</template>
<script>
  import product_component from './common/productCom'
  import dialog_bar from './common/dialogBar'
  import header_bar from './common/headerBar'
  export default({
    name: 'productList',
    data() {
      return {
        productList: "",
        coin: "",
        showDialog: false,
        dialog_text: "",
        sure: ()=> { this.showDialog = false},
        headerContent:"产品列表",
        inputValue:""
      }
    },
    components:{
      product_component,
      dialog_bar,
      header_bar
    },
    created(){
      this.getProduct();
    },
    methods:{
      search(){
       let goodsName = this.inputValue;
       this.getProduct(goodsName);
      },
      getProduct(goodsName){
        this.$axios.get('/api/goods',{params:{goodsName: goodsName}})
          .then((response) =>{
            let {status, msg} = response.data;
            if (status !== 1) {
              this.showDialog = true;
              this.dialog_text = msg;
              if(status === 300011){
                this.sure = ()=> {this.$router.push({ path: '/' })};
              }
            }else{
              this.productList = response.data.data.list;
              this.coin = response.data.data.user.coin
            }
          }).catch((res) =>{
          this.showDialog = true;
          this.dialog_text = res;
          return false;
        })
      }
    }
  })
</script>
<style scoped>
  .product_total{
    background: #000;
    font-size: 0.25rem;

  }
  .search_box{
    position:fixed;
    top:0.84rem;
    background:#000;
    width:100%;
    z-index:9999;
  }
  .search_input{
    width:80%;
    padding:0.15rem 0 0.15rem 0.3rem;
    float:left;
  }
  .search_text{
    float:right;
    color:#fff;
    padding:0.22rem 0.35rem 0 0;
  }
</style>
