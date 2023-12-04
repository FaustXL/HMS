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
            <el-tab-pane label="房间管控" name="RoomControl">

              <el-tabs tab-position="left" v-model="floorName" @tab-click="floorClick" style="margin-left: -20px;">
                  <el-tab-pane label="全部房间" name="All">
                    <el-button
                    type="text"
                    v-for="(item, index) in rooms"
                    :key="index"
                    @click="openRoomDialog(item.id)"
                    class="roombutton">

                    <!-- 全部 -->
                    <!-- 此为房间按钮内的内容区域，显示了房间号（黑色，加粗）、房间价格、房间类型、房间最大居住人数 -->
                    <el-card
                      class="room-Card"
                      shadow="hover"
                      style="position: relative;background-color: #e9e9eb;"
                      v-if="item.state == '未入住'"
                    >
                      <span>{{ item.roomNumber }}</span><br>
                      <p style="font-size: 13px;color: #909399;">{{ item.state }}</p>
                      <div style="font-weight: lighter;font-size: 12px;color: #555;">
                      </div>
                    </el-card>

                    <el-card
                      class="room-Card"
                      shadow="hover"
                      style="position: relative;background-color: #c6e2ff;"
                      v-else-if="item.state == '预定中'"
                    >
                      <span>{{ item.roomNumber }}</span><br>
                      <p style="font-size: 13px;color: #409EFF;">{{ item.state }}</p>
                      <div style="font-weight: lighter;font-size: 12px;color: #555;">
                      </div>
                    </el-card>

                    <el-card
                      class="room-Card"
                      shadow="hover"
                      style="position: relative;background-color: #e1f3d8;"
                      v-else
                    >
                      <span>{{ item.roomNumber }}</span><br>
                      <p style="font-size: 13px;color: #67C23A;">{{ item.state }}</p>
                      <div style="font-weight: lighter;font-size: 12px;color: #555;">
                      </div>
                    </el-card>

                    </el-button>
                  </el-tab-pane>
              <el-tab-pane v-for="(floor,index) in floors" :key="index" :label="`第 ${floor} 层`" :name="floor">
                <el-button
                    type="text"
                    v-for="(item, index) in rooms"
                    :key="index"
                    @click="openRoomDialog(item.id)"
                    class="roombutton">

                    <!-- 独立楼层 -->
                    <!-- 此为房间按钮内的内容区域，显示了房间号（黑色，加粗）、房间价格、房间类型、房间最大居住人数 -->
                    <el-card
                      class="room-Card"
                      shadow="hover"
                      style="position: relative;background-color: #e9e9eb;"
                      v-if="item.state == '未入住'"
                    >
                      <span>{{ item.roomNumber }}</span><br>
                      <p style="font-size: 13px;color: #909399;">{{ item.state }}</p>
                      <div style="font-weight: lighter;font-size: 12px;color: #555;">
                      </div>
                    </el-card>

                    <el-card
                      class="room-Card"
                      shadow="hover"
                      style="position: relative;background-color: #c6e2ff;"
                      v-else-if="item.state == '预定中'"
                    >
                      <span>{{ item.roomNumber }}</span><br>
                      <p style="font-size: 13px;color: #409EFF;">{{ item.state }}</p>
                      <div style="font-weight: lighter;font-size: 12px;color: #555;">
                      </div>
                    </el-card>

                    <el-card
                      class="room-Card"
                      shadow="hover"
                      style="position: relative;background-color: #e1f3d8;"
                      v-else
                    >
                      <span>{{ item.roomNumber }}</span><br>
                      <p style="font-size: 13px;color: #67C23A;">{{ item.state }}</p>
                      <div style="font-weight: lighter;font-size: 12px;color: #555;">
                      </div>
                    </el-card>

                    </el-button>
              </el-tab-pane>
            </el-tabs>
            
          </el-tab-pane>


          <el-tab-pane label="客户入住" name="Stay">
            <div class="block">
              <el-date-picker
                v-model="TimeDefault"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['14:00:00', '12:00:00']"
                align="right">
              </el-date-picker>
            </div>
          </el-tab-pane>
          <el-tab-pane label="客户退房" name="Check">客户退房AAAAAAAAAAAAAAAAAAAAAAAAAA</el-tab-pane>
          <el-tab-pane label="条件查询" name="Inquire">条件查询</el-tab-pane>
        </el-tabs>

          <el-dialog
            :title="aaaaaaaaa"
            :visible.sync="roomdialogFormVisible">
            <el-descriptions class="margin-top" title="index" :column="3" :size="size" border>
            <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  用户名
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-mobile-phone"></i>
                  手机号
                </template>
                18100000000
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-location-outline"></i>
                  居住地
                </template>
                苏州市
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-tickets"></i>
                  备注
                </template>
                <el-tag size="small">学校</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-office-building"></i>
                  联系地址
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
              </el-descriptions-item>
            </el-descriptions>
          </el-dialog>

        </el-card>
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
      activeName: 'RoomControl',
      floorName: 'All',
      TimeDefault: '',
      rooms: [],
      floors: [],
      roomdialogFormVisible: false,
    };
  },
  methods: {
    floorClick() {
      if(this.floorName == 'All'){
        this.selectfloorAction(0);
      }else{
        this.selectfloorAction(this.floorName);
      }
    },
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
    selectAllAction(){
      /* 查找出所有的房间 */
      request.get("/room").then((res) => {
        this.rooms = res.data;
      });
    },
    selectfloorAction(index){
      /* 查询所有的楼层号 */
      /* 0为全部 */
      if(index == 0){
        this.selectAllAction();
      }else{
        request({
            url:"/room/"+index,
            method:"get",
        }).then((res) => {
          if(res.code == 20011){
            this.rooms = res.data;
          }else{
            this.openMes(res.message);
          }
        });
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
    openRoomDialog(index) {
      console.log(index)
      // 打开对应索引的房间弹窗
      this.roomdialogFormVisible = true;
    },
  },
  mounted(){
    this.selectAllAction();
    request.get("/room/returnFloor").then((res) => {
      this.floors = res.data;
      console.log(this.floors);
    });
  }
};
</script>

<style scoped>
.box-card{
  width: 98%;
  min-width: 1000px;
  min-height: 95vh;
  margin: 0;
  padding: 0;
  position: relative;
}
.room-Card {
  width: 150px;
  height: 100px;
  font-weight: bold;
  font-size: large;
  text-align: left;
  border: 1px solid none;
  margin: 0;
  position: relative
}
.roombutton{
  margin-right: 20px;
  margin-left: 20px !important
}
.roombutton:hover .room-Card {
  color: #409eff;
  border: 1px solid #409eff;
}
</style>