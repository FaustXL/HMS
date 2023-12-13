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
            <input ref="userName" v-model="accountForm.username" placeholder="" class="account" maxlength="16">
            <label ref="userNameLabel" class="accountLabel">请输入账号</label>
          </div>
          <div style="position: relative;">
            <input ref="password" v-model="accountForm.password" placeholder="" class="account" type="password"  maxlength="16">
            <label ref="passwordLabel" class="accountLabel">请输入密码</label>
          </div>
          <el-button type="text" style="height: 40px;width: 100px;position: absolute;left: 50px;bottom: 50px;" @click="Switch()">新增管理员？点击注册</el-button>
          <el-button type="primary" style="height: 40px;width: 100px;position: absolute;right: 50px;bottom: 50px;" @click="Login()" autofocus="true">下一步</el-button>
        </div>
      </div>

      <!-- 注册 -->
      <div class="enrollBox" :style="enrollBox">
        <div style="flex: 1; position: relative;">
          <img src="@/imgs/logo_low.png" width="20%">
          <h2>注册</h2>
          <div style="position: relative;">
            <input ref="registerUserName" v-model="registerForm.username" placeholder="" class="account"  maxlength="16">
            <label ref="registerUserNameLabel" class="accountLabel">请输入账号</label>
          </div>
          <div style="position: relative;">
            <input ref="registerPassword" v-model="registerForm.password" placeholder="" class="account" type="password"  maxlength="16">
            <label ref="registerPasswordLabel" class="accountLabel">请输入密码</label>
          </div>
          <div style="position: relative;">
            <input ref="registerRePassword" v-model="registerForm.repassword" placeholder="" class="account" type="password"  maxlength="16">
            <label ref="registerRePasswordLabel" class="accountLabel">请再次输入密码</label>
          </div>
          <el-button type="text" style="height: 40px;width: 100px;position: absolute;left: 50px;bottom: 50px;" @click="Switch()">已有账号？点击登录</el-button>
          <el-button type="primary" style="height: 40px;width: 100px;position: absolute;right: 50px;bottom: 50px;" @click="register()" autofocus="true">下一步</el-button>
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
      accountForm:{
        username: '',
        password: '',
      },
      registerForm:{
        username: '',
        password: '',
        repassword: '',
      },
      maxbox: 'maxbox',
      enrollShowBackground:'background: #fff;',
      loginBox: 'opacity: 1;z-index: 1;height: 450px;',
      enrollBox: 'opacity: 0;position: absolute;z-index: 0;height: 450px;',
      boxIndex: 1,
    }
  },
  methods: {
    enrollShow(index){
      /* 用于表单切换的样式切换以及数据清空 */
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
        this.$refs.userName.style = this.$refs.userNameLabel.style = 
        this.$refs.password.style = this.$refs.passwordLabel.style = 
        this.$refs.registerUserName.style = this.$refs.registerUserNameLabel.style =
        this.$refs.registerPassword.style = this.$refs.registerPasswordLabel.style = 
        this.$refs.registerRePassword.style = this.$refs.registerRePasswordLabel.style = ''
        this.boxIndex = 0
      }else{
        this.enrollShowBackground = 'background: #fff;';
        this.loginBox = 'opacity: 1;z-index: 1;height: 450px;';
        this.enrollBox = 'opacity: 0;position: absolute;z-index: 0;height: 450px;';
        this.boxIndex = 1
      }
    },
    openMes(message) {
      //字体为绿色的提示框
      //用于成功提示
      const h = this.$createElement;
      this.$notify({
        title: '提示',
        message: h('i', { style: 'color: teal'}, message),
        customClass: 'messageZ'
      });
    },
    FalseMes(mes) {
      //字体为红色的提示框
      //用于警告、报错
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: red" }, mes),
        customClass: 'messageZ'
      });
    },
    Login() {
      /* 登录 */
      if(this.accountForm.username == ''||this.accountForm.password == ''){
        /* 为空，弹出提示框 */
        this.FalseMes('不能为空！')
        if(this.accountForm.username == ''){
          /* 账号为空，设置动画样式 */
          this.$refs.userName.style = 
          'border: 2px solid #F56C6C;animation-name: isNull; animation-duration: 0.3s;'
          this.$refs.userNameLabel.style = 
          'color: #F56C6C;animation-name: isNull; animation-duration: 0.3s;'
        }else{
          this.$refs.userName.style = this.$refs.userNameLabel.style = ''
        }

        if(this.accountForm.password == ''){
          /* 密码为空，设置动画样式 */
          this.$refs.password.style = 
          'border: 2px solid #F56C6C;animation-name: isNull; animation-duration: 0.3s;'
          this.$refs.passwordLabel.style = 
          'color: #F56C6C;animation-name: isNull; animation-duration: 0.3s;'
        }else{
          this.$refs.password.style = this.$refs.passwordLabel.style = ''
        }
      }else{
        request({
          url:'/users',
          method:"post",
          data:this.accountForm
        }).then( res =>{
          if(res.code == 20011){
            this.$router.push({name:'Room'})
          }else{
            this.FalseMes(res.message);
          }
        })
      }
      
    },
    register() {
      /* 注册 */
      if(this.registerForm.username == ''||this.registerForm.password == ''||this.registerForm.repassword == ''){
        /* 为空，弹出提示框 */
        this.FalseMes('不能为空！')
        if(this.registerForm.username == ''){
          /* 账号为空，设置动画样式 */
          this.$refs.registerUserName.style = 
          'border: 2px solid #F56C6C;animation-name: isNull; animation-duration: 0.3s;'
          this.$refs.registerUserNameLabel.style = 
          'color: #F56C6C;animation-name: isNull; animation-duration: 0.3s;'
        }else{
          this.$refs.registerUserName.style = this.$refs.registerUserNameLabel.style = ''
        }

        if(this.registerForm.password == ''){
          /* 密码为空，设置动画样式 */
          this.$refs.registerPassword.style = 
          'border: 2px solid #F56C6C;animation-name: isNull; animation-duration: 0.3s;'
          this.$refs.registerPasswordLabel.style = 
          'color: #F56C6C;animation-name: isNull; animation-duration: 0.3s;'
        }else{
          this.$refs.registerPassword.style = this.$refs.registerPasswordLabel.style = ''
        }

        if(this.registerForm.repassword == ''){
          /* 二次密码为空，设置动画样式 */
          this.$refs.registerRePassword.style = 
          'border: 2px solid #F56C6C;animation-name: isNull; animation-duration: 0.3s;'
          this.$refs.registerRePasswordLabel.style = 
          'color: #F56C6C;animation-name: isNull; animation-duration: 0.3s;'
        }else{
          this.$refs.registerRePassword.style = this.$refs.registerRePasswordLabel.style = ''
        }
      }else{
        request({
          url:'/users/register',
          method:"post",
          data:this.registerForm
        }).then(res =>{
          if(res.code == 20031){
            this.accountForm.username = this.registerForm.username;
            this.accountForm.password = this.registerForm.password;
            this.enrollShow(this.boxIndex);
            this.openMes(res.message);
          }else{
            this.FalseMes(res.message);
          }
        })
      }
    },
    Switch(){
      if(this.boxIndex == 1){
        this.enrollShow(this.boxIndex),
        this.boxIndex == 0
      }else(
        this.enrollShow(this.boxIndex),
        this.boxIndex ==1
      )
    },
    handkeyCode(e) {
      let key = null;
      if (window.event === undefined) {
        key = e.keyCode;
      } else {
        key = window.event.keyCode;
      }
      if (key === 13) {
        if(this.boxIndex == 1){
          this.Login()
        }else(
          this.register()
        )
      }
    },
  },
  created() {
    window.addEventListener('keydown', this.handkeyCode, true)//开启监听键盘按下事件
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
@keyframes isNull{
  25% { transform: translateX(-3px); }
  50% { transform: translateX(0px); }
  75% { transform: translateX(3px); }
  100%{ transform: translateX(0px); }
}
</style>