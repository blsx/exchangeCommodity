<template>
  <div class="dialog" v-if="showDialog">
    <div class="mask"></div>
    <div class="dialog-content">
      <h3 class="title">{{dialog_title}}</h3>
      <p class="text">{{dialog_text}}</p>
      <div class="btn-group">
        <div class="btn" @click="cancelDialog">{{dialog_left}}</div>
        <div class="btn" @click="sureDialog">{{dialog_right}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'dialogBar',
    data(){
      return{
      }
    },
    props: {
      showDialog:{
        type: Boolean ,
        default: false,
      },
      dialog_title:{
        type: String,
        default:"提示:",
      },
      dialog_text:{
      },
      dialog_left:{
        type: String,
        default:"",
      },
      dialog_right:{
        type: String,
        default:"知道了",
      },
      sure:{},
      cancel:{}
    },
    methods:{
      cancelDialog(){
        return this.showDialog = false;
      },
      sureDialog(){
        this.sure()
      },
    }
  }
</script>
<style>
  .dialog {
    position: relative;
  }
  .dialog-content {
    position: fixed;
    box-sizing: border-box;
    padding: 20px;
    width: 80%;
    min-height: 140px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background: #fff;
    z-index: 50002;
  }
  .title {
    font-size: 16px;
    font-weight: 600;
    line-height: 30px;
    text-align:left;
  }
  .text {
    font-size: 14px;
    line-height: 30px;
    color: #555;
  }
  .btn-group {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 10px;
  }
  .btn {
    padding: 10px 20px;
    font-size: 14px;
  }
  .btn:last-child {
    color: #76D49B;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 50001;
    background: rgba(0,0,0,.5);
  }
</style>
