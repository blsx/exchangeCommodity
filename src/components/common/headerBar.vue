<template>
  <div class="header_box">
    <ul class="header_content">
      <li class="header_left" @click="back">
        {{headerLeft}}
      </li>
      <li class="header_center">
        {{headerContent}}
      </li>
      <li class="header_right" @click="logout">
         退出
      </li>
    </ul>
  </div>
</template>
<script>
  export default({
    name:'headerBar',
    data(){
      return {
      }
    },
    props:["headerContent","headerLeft"],
    methods:{
      logout(){
        this.$axios.post('/api/logout', {})
          .then((response) => {
            let {status, msg} = response.data;
            if (status !== 1) {
              this.showDialog = true;
              this.dialog_text = msg;
            } else {
              this.$router.push({path: '/'})
            }
          }).catch((res)=>{
          this.showDialog = true;
          this.dialog_text = res;
          return false;
        })
      },
      back(){
        this.$router.history.go(-1);
      }
    }

  })
</script>
<style >
  .header_box{
    width:100%;
    height:0.8rem;
    background:#000;
    color:#fff;
    border:1px solid #333;
    position:fixed;
    top:0;
    z-index: 100000;
  }
  .header_content{
    list-style-type: none;
    height:100%;
  }
  .header_content li{
    float:left;
    padding-top:0.2rem;
  }
  .header_content .header_left{
    width:20%;
  }
  .header_content .header_center{
    width:60%;
    font-weight:bold;
    font-style:italic;
    font-size:0.3rem;
    padding-top:0.165rem;
  }
  .header_content .header_right{
    width:20%;
  }
</style>
