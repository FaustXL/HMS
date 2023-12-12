<template>
  <div>
    <el-container style="border: 1px solid #eee; min-height: 100vh">
      <!-- 第一列导航 -->
      <!--
        此导航栏为系统总导航栏，负责用户的账户管理
        5.退出登录
        -->
        <el-aside width="auto">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
        <!-- 顶端按钮，用于展开或收缩导航 -->
          <div
            class="custom-switch"
            :class="{ active: isCollapse }"
            @click="toggleSwitch"
          >
            <i><font-awesome-icon :icon="['fas', 'expand']"/></i>
          </div>

          <!-- 5.退出登录 -->
            <el-menu-item index="5" @click="loginOut">
              <i class="icon"
                ><font-awesome-icon
                  :icon="['fass', 'arrow-right-from-bracket']"
              /></i>
              <span slot="title">退出登录</span>
            </el-menu-item>

        </el-menu>
      </el-aside>

      <!-- 第二列导航 -->
      <!--
            此导航栏负责网页的功能入口
            主要是脱离了管理员本身账号的功能的功能
            1.该系统的首页（功能的统合页面，存放各个功能的卡片，卡片内容为功能介绍）
            2.房间管理页面（房间状态的总存放页，配备条件查询功能，分页功能，在此页面点击房间卡片，即会弹出此房间的管理表单）
            3.资源管理页面（酒店洗漱用品等的库存情况）
            4.入退房管理页面（记录客人的入退房信息{入住时间、退房时间、客人信息}）
            5.客户管理页面（客人信息）（需再次验证二级密码）
         -->
      <el-aside width="auto">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse2"
        >
          <!-- 系统的首页 -->
          <router-link to="/home" class="link">
            <el-menu-item index="/home">
              <i class="icon"><font-awesome-icon :icon="['fas', 'house']" /></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>

          <!-- 房间管理页面 -->
          <router-link to="/room" class="link">
            <el-menu-item index="/room">
              <i class="icon"><font-awesome-icon :icon="['fas', 'hotel']" /></i>
              <span slot="title">房间管理</span>
            </el-menu-item>
          </router-link>

          <!-- 资源管理页面 -->
          <router-link to="/resource" class="link">
            <el-menu-item index="/resource">
              <i class="icon"
                ><font-awesome-icon :icon="['fas', 'database']"
              /></i>
              <span slot="title">资源管理</span>
            </el-menu-item>
          </router-link>

          <!-- 入退房管理 -->
          <router-link to="/dooropen" class="link">
            <el-menu-item index="/dooropen">
              <i class="icon"
                ><font-awesome-icon :icon="['fas', 'door-open']"
              /></i>
              <span slot="title">入退房管理</span>
            </el-menu-item>
          </router-link>

          <!-- 客户管理 -->
          <router-link to="/client" class="link">
            <el-menu-item index="/client">
              <i class="icon"
                ><font-awesome-icon :icon="['fas', 'users-viewfinder']"
              /></i>
              <span slot="title">客户管理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>

      <el-main>
        <transition :name="transitionName" mode="out-in">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  data() {
    return {
      isCollapse: true,
      isCollapse2: false,
      transitionName: '',
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleSwitch() {
      this.isCollapse = !this.isCollapse;
      this.isCollapse2 = !this.isCollapse2;
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
    loginOut(){
      /* http://localhost:8080/loginOut */
      request.get("/loginOut").then(res => {
        if(res.code == 20041){
          this.openMes(res.message)
          this.$router.push({name:'login'})
        }else{
          this.FalseMes(res.message)
        }
      })
    },
    
  },
  watch: {
   //使用watch 监听$router的变化
    $route(to, from) {
      console.log(to, "to");
      console.log(from, "from");
      this.transitionName = to.meta.index>from.meta.index ? "slide-down":"slide-up"
   },
  }
};
</script>

<style>

</style>