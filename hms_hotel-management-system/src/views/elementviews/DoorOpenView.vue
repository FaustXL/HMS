<template>
  <div>
    <el-container style="border: 1px solid #eee; min-height: 100vh">
      <!-- 第一列导航 -->
      <!--
        此导航栏为系统总导航栏，负责用户的账户管理
        1.用户中心入口
        2.员工管理入口
        3.财务管理入口
        4.报表统计入口
        5.退出登录
        -->
        <el-aside width="auto">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
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

          <!-- 1.用户中心入口 -->
          <router-link to="/home" class="link">
            <el-menu-item index="1">
              <i class="icon"><font-awesome-icon :icon="['fas', 'user']" /></i>
              <span slot="title">用户中心</span>
            </el-menu-item>
          </router-link>

          <!-- 2.员工管理入口 -->
          <router-link to="/home" class="link">
            <el-menu-item index="2">
              <i class="icon"
                ><font-awesome-icon :icon="['fas', 'people-group']"
              /></i>
              <span slot="title">员工管理</span>
            </el-menu-item>
          </router-link>

          <!-- 3.财务管理入口 -->
          <router-link to="/home" class="link">
            <el-menu-item index="3">
              <i class="icon"><font-awesome-icon :icon="['fas', 'coins']" /></i>
              <span slot="title">财务管理</span>
            </el-menu-item>
          </router-link>

          <!-- 4.报表统计入口 -->
          <router-link to="/home" class="link">
            <el-menu-item index="4">
              <i class="icon"
                ><font-awesome-icon :icon="['fas', 'arrow-trend-up']"
              /></i>
              <span slot="title">报表统计</span>
            </el-menu-item>
          </router-link>

          <!-- 5.退出登录 -->
          <router-link to="/home" class="link">
            <el-menu-item index="5">
              <i class="icon"
                ><font-awesome-icon
                  :icon="['fass', 'arrow-right-from-bracket']"
              /></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </router-link>

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
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse2"
        >
          <!-- 系统的首页 -->
          <router-link to="/home" class="link">
            <el-menu-item index="1">
              <i class="icon"><font-awesome-icon :icon="['fas', 'house']" /></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>

          <!-- 房间管理页面 -->
          <router-link to="/room" class="link">
            <el-menu-item index="2">
              <i class="icon"><font-awesome-icon :icon="['fas', 'hotel']" /></i>
              <span slot="title">房间管理</span>
            </el-menu-item>
          </router-link>

          <!-- 资源管理页面 -->
          <router-link to="/resource" class="link">
            <el-menu-item index="3">
              <i class="icon"
                ><font-awesome-icon :icon="['fas', 'database']"
              /></i>
              <span slot="title">资源管理</span>
            </el-menu-item>
          </router-link>

          <!-- 入退房管理 -->
          <router-link to="/dooropen" class="link">
            <el-menu-item index="4">
              <i class="icon"
                ><font-awesome-icon :icon="['fas', 'door-open']"
              /></i>
              <span slot="title">入退房管理</span>
            </el-menu-item>
          </router-link>

          <!-- 客户管理 -->
          <router-link to="/client" class="link">
            <el-menu-item index="5">
              <i class="icon"
                ><font-awesome-icon :icon="['fas', 'users-viewfinder']"
              /></i>
              <span slot="title">客户管理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>

      <el-main>
        <el-card class="box-card">
          <el-tabs v-model="activeName" @tab-click="TabClick">
          <el-tab-pane label="房间管控" name="RoomControl">房间管控</el-tab-pane>
          <el-tab-pane label="客户入住" name="Stay">
            <div class="block">
              <span class="demonstration">带快捷选项</span>
              <el-date-picker
                v-model="value2"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00', '08:00:00']"
                align="right">
              </el-date-picker>
            </div>
          </el-tab-pane>
          <el-tab-pane label="客户退房" name="Check">客户退房</el-tab-pane>
          <el-tab-pane label="条件查询" name="Inquire">条件查询</el-tab-pane>
        </el-tabs>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      isCollapse2: false,
      activeName: 'RoomControl',
      /* pickerOptions: {
          shortcuts: [{
            text: '一晚',
            onClick(picker) {
              const start = new Date();
              const end = new Date();
              //const end = new Date(start.getFullYear, start.getMonth, start.getDay, 12, 0);
              picker.$emit('pick', [start, end]);
            }
          }]
        }, */
        value2: '',
    };
  },
  methods: {
    TabClick(tab, event) {
      console.log(tab, event);
      if(this.activeName == 'RoomControl'){
        /* 点击房间管控的时候提交请求获取数据 */
        console.log(this.activeName);
      }
    },
    toggleSwitch() {
      this.isCollapse = !this.isCollapse;
      this.isCollapse2 = !this.isCollapse2;
    },
    
  },
};
</script>

<style>
.box-card{
  width: 98%;
  min-width: 1000px;
  min-height: 95vh;
  margin: 0;
  padding: 0;
  position: relative;
}
</style>