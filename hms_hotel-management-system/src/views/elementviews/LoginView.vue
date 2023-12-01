<template>
  <div>
    <div class="maxbox" :style="enrollShowBackground">
      <!-- <div class="maxboxbule" :style="maxboxbule"></div> -->
      <!-- 登录 -->
      <div class="loginBox" :style="loginBox">
        <div style="flex: 1; position: relative;">
          <img src="@/imgs/logo_low.png" width="20%">
          <h2>登录</h2>
          <div style="position: relative;">
            <input v-model="accountForm.username" placeholder="" class="account">
            <label class="accountLabel">请输入账号</label>
          </div>
          <div style="position: relative;">
            <input v-model="accountForm.password" placeholder="" class="account" type="password">
            <label class="accountLabel">请输入密码</label>
          </div>
          <el-button type="text" style="height: 40px;width: 100px;position: absolute;left: 50px;bottom: 50px;" @click="enrollShow(1)">新增管理员？点击注册</el-button>
          <el-button type="primary" style="height: 40px;width: 100px;position: absolute;right: 50px;bottom: 50px;" @click="Login()">下一步</el-button>
        </div>
      </div>

      <!-- 注册 -->
      <div class="enrollBox" :style="enrollBox">
        <div style="flex: 1; position: relative;">
          <img src="@/imgs/logo_low.png" width="20%">
          <h2>注册</h2>
          <div style="position: relative;">
            <input v-model="registerForm.username" placeholder="" class="account">
            <label class="accountLabel">请输入账号</label>
          </div>
          <div style="position: relative;">
            <input v-model="registerForm.password" placeholder="" class="account" type="password">
            <label class="accountLabel">请输入密码</label>
          </div>
          <div style="position: relative;">
            <input v-model="registerForm.repassword" placeholder="" class="account" type="password">
            <label class="accountLabel">请再次输入密码</label>
          </div>
          <el-button type="text" style="height: 40px;width: 100px;position: absolute;left: 50px;bottom: 50px;" @click="enrollShow(0)">已有账号？点击登录</el-button>
          <el-button type="primary" style="height: 40px;width: 100px;position: absolute;right: 50px;bottom: 50px;" @click="register()">下一步</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  data() {
    return {
      accountForm:[
        {
          username: '',
          password: '',
        }
      ],
      registerForm:{
        username: '',
        password: '',
        repassword: '',
      },
      maxbox: 'maxbox',
      enrollShowBackground:'background: #fff;',
      loginBox: 'opacity: 1;z-index: 1;height: 450px;',
      enrollBox: 'opacity: 0;position: absolute;z-index: 0;height: 450px;',
    }
  },methods: {
    enrollShow(index){
      if(index == 1){
        this.enrollShowBackground = 'background: #3688db;';
        this.loginBox = 'opacity: 0;position: absolute;z-index: 0;height: 500px;';
        this.enrollBox = 'opacity: 1;z-index: 1;height: 500px;';
        this.accountForm=
        {
          username: '',
          password: '',
        };
        this.registerForm=
        {
          username: '',
          password: '',
          repassword: ''
        };
      }else{
        this.enrollShowBackground = 'background: #fff;';
        this.loginBox = 'opacity: 1;z-index: 1;height: 450px;';
        this.enrollBox = 'opacity: 0;position: absolute;z-index: 0;height: 450px;';
      }
    },
    openMes(message) {
      const h = this.$createElement;
      this.$notify({
        title: '提示',
        message: h('i', { style: 'color: teal'}, message)
      });
    },
    Login(){
      /* 登录 */
      request({
        url:'/users',
        method:"post",
        data:this.accountForm
      }).then( res =>{
        if(res.code == 20011){
          this.openMes(res.message);
          this.$router.push({name:'room'})
        }else{
          this.openMes(res.message);
        }
      })
    },
    register(){
      /* 注册 */
      request({
        url:'/users/register',
        method:"post",
        data:this.registerForm
      }).then(res =>{
        if(res.code == 20021){
          this.openMes(res.message);
          this.accountForm.username = this.registerForm.username;
          this.accountForm.password = this.registerForm.password;
          this.enrollShow(0);
          this.openMes('注册成功！');
        }else{
          this.openMes(res.message);
        }
      })
    },
  },
}
</script>

<style>
*{
  outline: none;
}
.maxbox{
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;
  overflow: hidden;
}
/* .maxboxbule{
  display: block;
  background-color: #3688db;
  position: absolute;
  transition: all 0.3s ease;
  overflow: hidden;
} */
.loginBox{
  display: flex;
  width: 500px;
  background-color: white;
  border: 2px solid #ecedee;
  border-radius:10px;
  height: 450px;
  transition: all 0.3s ease;
}
.enrollBox{
  display: flex;
  width: 500px;
  background-color: white;
  border: 2px solid #ecedee;
  border-radius:10px;
  height: 500px;
  transition: all 0.3s ease;
}
.account{
  width: 75%;
  border-radius: 5px;
  border: 2px solid #888;
  height: 40px;
  position: relative;
  padding-left: 20px;
  transition: all 0.3s ease;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.account:focus{
  border: 2px solid #409eff;
}
.accountLabel{
  color: #888;
  position: absolute;
  left: 65px;
  top: 32px;
  padding: 0 5px 0 5px;
  font-size: 17px;
  pointer-events: none;
  transition: all 0.3s ease;
}
.account:focus + .accountLabel{
  background-color: white;
  color: #409eff;
  left: 65px;
  top: 15px;
  font-size: 15px;
}
.account:not(:placeholder-shown).account:not(:focus) + .accountLabel {
  background-color: white;
  color: #888;
  left: 65px;
  top: 15px;
  font-size: 15px;
}

</style>