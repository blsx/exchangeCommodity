<template>
  <div>
    <header_bar :headerContent="headerContent" :headerLeft="headerLeft"></header_bar>
    <div class="product_detail">
      <div class="prodetail_scroll">
        <div class="prodetail_picture">
          <img :src="productDetail.iconUrl" alt="">
        </div>
        <div class="prodetail_content">
          <p class="prodetail_name">{{productDetail.goodsName}}</p>
          <ul class="prodetail_info">
            <li><img src="http://img4.imgtn.bdimg.com/it/u=128349445,590277591&fm=27&gp=0.jpg" alt="">{{productDetail.coinPrice}}</li>
            <li>参考价¥{{productDetail.referencePrice}}</li>
            <li>剩余{{productDetail.exchangeNum}}份</li>
          </ul>
          <div class="award_introduce">
            <p>兑品介绍</p>
            {{productDetail.goodsRemark}}
          </div>
          <div class="draw_illustrate">
            <p>兑换说明</p>
            1.中奖后，可在订单页填写手贱信息，请按格式正确填写收件信息；若应收件信息填写错误导致的损失，平台不予承担；2.该奖品将由联邦快递于3个工作日安排派奖；3.请尽快填写收货信息，超过30天未填写将取消中奖资格
          </div>
        </div>
      </div>
      <div class="draw_box">
        <p>我的金豆: {{productDetail.coin}}</p>
        <div class="draw_button" @click="draw">商品兑换</div>
      </div>
      <dialog_bar :dialog_text="dialog_text" :showDialog="showDialog" :sure="sure" :dialog_left="dialog_left" :dialog_right="dialog_right"></dialog_bar>
    </div>
  </div>
</template>
<script>
  import dialog_bar from './common/dialogBar'
  import header_bar from './common/headerBar'
  export default({
    name:'productDetail',
    data(){
      return{
        productDetail:"",
        showDialog: false,
        dialog_text: "",
        sure: ()=> { this.showDialog = false},
        headerContent:"产品详情",
        headerLeft:"返回",
        dialog_left: "",
        dialog_right: "",
      }
    },
    components:{
      dialog_bar,
      header_bar
    },
    created(){
      this.productDetail=this.$route.params.item;
    },
    methods:{
      draw(){
        if(this.productDetail.coin<this.productDetail.coinPrice){
          this.showDialog = true;
          this.dialog_text = "您的金豆少于此物品所需的金豆!";
//          this.$message({
//            message: "您的金豆少于此物品所需的金豆",
//            type: 'error'
//          });
        }else{
          this.showDialog = true;
          this.dialog_right="确定";
          this.dialog_left="取消";
          this.dialog_text = "您确定要兑换此物品？";

          let goodId = this.productDetail._id;
//          let token = JSON.parse(sessionStorage.getItem('token'));
//          this.$axios.defaults.headers.common['token'] = token;
          this.sure =() =>{
            this.$axios.post('/api/goods/' + goodId , {exchangeNum: 1})
              .then((response) =>{
                let {status, msg} = response.data;
                if (status !== 1) {
                  this.showDialog = true;
                  this.dialog_text = msg;
                  this.dialog_right="知道了";
                  this.dialog_left="";
                  this.sure = ()=> {this.$router.push({ path: '/productList' })};
                  if(status === 300011){
                    this.sure = ()=> {this.$router.push({ path: '/' })};
                  }
                } else {
                  this.showDialog = true;
                  this.dialog_right="知道了";
                  this.dialog_left="";
                  this.dialog_text = "您已兑换成功此物品!";
                  this.sure = ()=> {this.$router.push({ path: '/productList' })};

//                this.$notify({
//                  title: '成功',
//                  message: '您已兑换成功',
//                  type: 'success'
//                });

                }
              }).catch((res) => {
              this.showDialog = true;
              this.dialog_right="知道了";
              this.dialog_left="";
              this.dialog_text = res;
//            this.sure = ()=> { this.showDialog = false};
//            this.$message({
//              message: res,
//              type: 'error'
//            });
              return false;
            })
          };
        }
      }
    }
  })
</script>
<style scoped>
  .product_detail{
    background:#111;
    margin-top:0.8rem;
  }
  .prodetail_scroll{
    width:100%;
    height:12rem;
    overflow:auto;
  }
  .prodetail_picture{
    width:100%;
    height:5rem;
  }
  .prodetail_picture img{
    width:100%;
    height:100%;
  }
  .prodetail_content{
    text-align:left;
    font-size:0.22rem;
    padding:0.2rem;
  }
  .prodetail_name{
    font-size:0.22rem;
    color:#fff;
  }
  .prodetail_info{
    border-bottom:1px solid #333;
    height:0.7rem;
  }
  .prodetail_info{
    clear:both;
  }
  .prodetail_info li{
    list-style-type: none;
    float:left;
    padding-top:0.04rem;
  }
  .prodetail_info li:first-child{
    font-size:0.26rem;
    color:#f23;
    font-weight:bold;
    padding-top:0;
    padding-right:0.6rem;
  }
  .prodetail_info li:first-child img{
  width:0.2rem;
    height:0.2rem;
  }
  .prodetail_info li:last-child{
    float:right;
  }
  .award_introduce{
    padding:0.25rem 0;
    border-bottom:1px solid #333;
  }
  .draw_illustrate{
    padding:0.25rem 0 0.2rem 0;
  }
  .award_introduce p, .draw_illustrate p{
    color:#fff;
    font-size:0.24rem;
  }
  .draw_box{
    position:fixed;
    bottom:0;
    text-align:center;
    width:100%;
    color:#fff;
    background:#000;
  }
  .draw_box p{
    font-size:0.24rem;
    height:0.6rem;
    line-height:0.6rem;
  }
  .draw_button{
    width:90%;
    height:0.6rem;
    line-height:0.6rem;
    background:#f12;
    border:1px solid #f12;
    border-radius: 2px;
    font-size:0.26rem;
    margin:0  0  0.3rem 5%;
  }
</style>
