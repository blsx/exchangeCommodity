<template>
  <el-form ref="form" :model="form" status-icon :rules="rulers" label-width="80px" class="login_box ">
    <el-form-item label="账号：" class="input_margin" prop="username">
      <el-input v-model="form.username" size="medium" placeholder="请输入账号" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码：" class="input_margin" prop="password">
      <el-input v-model="form.password" size="medium" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-checkbox class="remember_button" v-model="checked">记住密码</el-checkbox>
    <el-button type="primary" class="loading" @click="loginSubmit">登录</el-button>
    <dialog_bar :dialog_text="dialog_text" :showDialog="showDialog" :sure="sure"></dialog_bar>
  </el-form>
</template>
<script>
  import dialog_bar from './common/dialogBar'
  import {setCookie, delCookie, getCookie} from '../js/common'
  export default {
    name: 'Login',
    data () {
      return {
        form: {
          username: '',
          password: ''
        },
        rulers:{
          username:[{
            required:true, message:'请输入账号', trigger:'blur'
            },
          ],
          password:[{
            required:true, message:'请输入密码', trigger:'blur'
          }]

        },
        showDialog: false,
        dialog_text: "",
        sure: ()=> { this.showDialog = false},
        checked: false
      }
    },
    components:{
      dialog_bar
    },

    methods:{
      loginSubmit(){
        this.$refs.form.validate((valid) => {
          if(valid){
            let username = this.form.username;
            let password = this.form.password;
            let params ={
              username: username,
              password: password
            };
            let rememberStatus = this.checked;
            let userInfo = params.username + '&' + params.password;
            this.$axios.post('/api/login', params)
              .then((response) =>{
                let {status, msg} = response.data;
                let {username, token} = response.data.data;
                if (status !== 1) {
                  this.showDialog = true;
                  this.dialog_text = msg;
                } else {
                  if (rememberStatus) {
                    setCookie('userInfo', userInfo, 1440 * 3);
                  } else {
                    delCookie('userInfo');
                  }
//                  this.$axios.defaults.headers.common['token'] = token;
                  sessionStorage.setItem('username', JSON.stringify(username));
                  sessionStorage.setItem('token', JSON.stringify(token));
                  this.$router.push({ path: '/productList' });
                }
              }).catch((res) => {
              this.showDialog = true;
              this.dialog_text = res;
              return false;
            })
          }
        })
      },
      loadUserInfo () {
        let userInfo = getCookie('userInfo');
        if (userInfo === true) {
          let userName = '';
          let passWord = '';
          let index = userInfo.indexOf('&');
          userName = userInfo.substring(0, index);
          passWord = userInfo.substring(index + 1);
          this.form.username = userName;
          this.form.password = passWord;
          this.checked = true;
        }
      },
    },
    mounted () {
      this.loadUserInfo();
    }
  }


</script>
<style>
  .login_box{
    padding: 3.5rem 0 3.5rem;
  }
  .input_margin{
    margin-right:0.3rem;
  }
  .remember_button{
    float:right;
    margin-right:0.3rem;
  }
  .loading{
    width:90%;
    margin-top:0.15rem;

  }
  .el-form-item.is-required .el-form-item__label:before{
    content:'';
  }
</style>
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJwd2NuIiwiaWF0IjoxNTI3NTYxNjI5fQ.4o6zExlPazPmc4FpwXdbuENRcdF5xWgG3bWqS03ExO8
