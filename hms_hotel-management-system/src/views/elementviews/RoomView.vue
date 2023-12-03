<template>
  <div>
    <el-container style="border: 1px solid #eee;min-height: 100vh;max-height: 100vh;display: flex;flex-direction: row;">
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
            <el-menu-item index="2" style="color: #409eff;" >
              <i class="icon" style="color: #409eff;"><font-awesome-icon :icon="['fas', 'hotel']" /></i>
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
          <!-- 条件筛选 -->
          <div style="margin-left: 20px;">
          <el-form :inline="true" :model="slelctFrom" class="demo-form-inline">
            <el-form-item label="房间号">
              <el-input
                v-model="slelctFrom.roomNumber"
                placeholder="房间号"
                style="width: 100px"
              ></el-input>
            </el-form-item>
            
            <el-form-item label="房间价格">
              <el-input
                v-model="slelctFrom.price"
                placeholder="价格(￥/晚)"
                style="width: 150px"
              ></el-input>
            </el-form-item>

            <el-form-item label="最大可入住人数">
              <el-input
                v-model="slelctFrom.maxNumber"
                placeholder="人数"
                style="width: 100px"
              ></el-input>
            </el-form-item>

            <el-form-item label="房型">
              <el-input
                v-model="slelctFrom.type"
                placeholder="房型"
                style="width: 200px"
              ></el-input>
            </el-form-item>


            <el-form-item style="position: absolute; right: 30px">
              <el-button type="primary" @click="selectAction()">查询</el-button>
            </el-form-item>
          </el-form></div>

          <!-- 楼层选择器：切换楼层，选择之后向后端发送对应楼层的请求数据 -->
          <div class="block" style="margin-left: 20px;">
            <!-- 绑定数据为：Defaultfloor:默认楼层；
              绑定事件为：selectfloorAction(Defaultfloor): 传参为选择到的楼层-->
            <el-select v-model="Defaultfloor" placeholder="请选择" @change="selectfloorAction(Defaultfloor)">

              <!-- 全部楼层选项：值为0 -->
              <el-option label="全部" value="0"></el-option>

              <!-- 遍历楼层：值为楼层所对应的楼层号 -->
              <el-option
                v-for="item in floors"
                :key="item"
                :label="`第 ${item} 层`"
                :value="item"></el-option>
            </el-select>
          </div>

          <!-- 内容 -->
          <!-- 此为主界面下方的房间格子的区域 -->
            <div style="display: flex;flex-wrap: wrap;margin-top: 20px;">
              <!-- 房间格子 为按钮 给服务器发送需要展开的房间id 点击事件为：openRoomDialog(index)：此事件为打开房间的Dialog -->
              <el-button
                type="text"
                v-for="(item, index) in rooms"
                :key="index"
                @click="openRoomDialog(item.id)"
                class="roombutton">

                <!-- 此为房间按钮内的内容区域，显示了房间号（黑色，加粗）、房间价格、房间类型、房间最大居住人数 -->
                <el-card
                  class="room-card"
                  shadow="hover"
                  style="position: relative"
                >
                  <span>{{ item.roomNumber }}</span><br>
                  <div style="font-weight: lighter;font-size: 12px;color: #555;">
                    <p>{{ item.price }}</p>
                    <span>{{ item.type }} - {{ item.maxNumber }}</span>
                    <span style="text-align: right;"></span>
                  </div>
                </el-card>

              </el-button>

              <!-- 点击添加 -->
              <!-- 此为添加按钮 点击事件为 openaddroomDialog()：此事件为打开点击添加的Dialog窗口-->
              <el-button
                type="text"
                @click="openaddroomDialog()"
                class="roombutton">
                <!-- 点击添加的内容  -->
                <el-card class="room-card" shadow="hover">
                  <span v-bind="addroom">{{ addroom }}</span>
                  <!-- font-awesome-icon为字符icon 此字符为加号 -->
                  <div style="position: absolute; bottom: 10px; right: 10px">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                  </div>
                </el-card>
              </el-button>
            </div>
          
            <!-- 此为房间的dialog 用于在同一页面展示出房间的信息并给予管理员修改权限  -->
          <el-dialog
            :title="temroom.roomNumber"
            :visible.sync="roomdialogFormVisible">
          <el-form>
            <!-- 房间号 -->
              <el-form-item label="房间号" :label-width="formLabelWidth">
                <el-input
                  v-model="temroom.roomNumber"
                  autocomplete="off"
                  style="width: 150px"
                ></el-input>
              </el-form-item>

              <!-- 楼层 -->
              <el-form-item label="楼层" :label-width="formLabelWidth">
                <el-select v-model="temroom.floor" placeholder="请选择楼层">
                  <el-option
                    v-for="item in floors"
                    :key="item"
                    :label="`第 ${item} 层`"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>

              <!-- 房间价格 -->
              <el-form-item label="价格(￥/晚)" :label-width="formLabelWidth">
                <el-input
                  v-model="temroom.price"
                  autocomplete="off"
                  style="width: 150px"></el-input>
              </el-form-item>

              <!-- 房间最大可居住人数 -->
              <el-form-item
                label="最大可入住人数"
                :label-width="formLabelWidth">
                <el-input
                  v-model="temroom.maxNumber"
                  autocomplete="off"
                  style="width: 150px"></el-input>
              </el-form-item>

              <!-- 房型 -->
              <el-form-item label="房型" :label-width="formLabelWidth">
                <el-input
                  v-model="temroom.type"
                  autocomplete="off"
                  style="width: 150px"></el-input>
              </el-form-item>
            </el-form>

            
            <!-- 取消和确定按钮 -->
            <div slot="footer" class="dialog-footer">
              <!-- 删除按钮 -->
              <el-popover
                placement="top"
                width="150"
                v-model="deleteVisible">
                <p>确定删除该房间吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="deleteVisible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteRoom()">确定</el-button>
                </div>
                <el-button slot="reference" style="margin-right: 10px;background-color: #F56C6C;color: white;" >删除</el-button>
              </el-popover>
              <!-- 取消按钮：roomdialogFormVisible为该dialog的显示绑定变量 -->
              <el-button @click="roomdialogFormVisible = false">取 消</el-button>
              <!-- 确定按钮：closeRoomDialog():关闭窗口并向后端发送数据的方法 -->
              <el-button type="primary" @click="closeRoomDialog()">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 房间添加按钮：addroomdialogFormVisible为该窗口是否显示的变量 -->
          <el-dialog title="房间添加" :visible.sync="addroomdialogFormVisible">
            <el-form :model="newRoom"><!-- form -->
              <el-form-item label="房间号" :label-width="formLabelWidth">
                <el-input
                  v-model="newRoom.roomNumber"
                  autocomplete="off"
                  style="width: 150px"
                ></el-input>
              </el-form-item>

              <el-form-item label="楼层" :label-width="formLabelWidth">
                <el-select v-model="newRoom.floor" placeholder="请选择楼层">
              <el-option
                v-for="item in floors"
                :key="item"
                :label="`第 ${item} 层`"
                :value="item"
              >
              </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="价格(￥/晚)" :label-width="formLabelWidth">
                <el-input
                  v-model="newRoom.price"
                  autocomplete="off"
                  style="width: 150px"
                ></el-input>
              </el-form-item>

              <el-form-item
                label="最大可入住人数"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="newRoom.maxNumber"
                  autocomplete="off"
                  style="width: 150px"
                ></el-input>
              </el-form-item>

              <el-form-item label="房型" :label-width="formLabelWidth">
                <el-input
                  v-model="newRoom.type"
                  autocomplete="off"
                  style="width: 150px"
                ></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="addroomdialogFormVisible = false"
                >取 消</el-button
              >
              <el-button type="primary" @click="addroomactive()">确 定</el-button>
            </div>
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
      addroomdialogFormVisible: false,
      roomdialogFormVisible: false,
      innerVisible: false,
      deleteVisible: false,

      floors: [],
      rooms: [],
      temroom:{},

      formLabelWidth: "120px",
      floorss: "",
      Defaultfloor: "0",
      addroom: "点击添加",
      
      slelctFrom: {
        roomNumber: "",
        floor: "",
        price: "",
        maxNumber: "",
        type: "",
      },
      newRoom: {
        roomNumber: "",
        price: "",
        floor: "",
        maxNumber: "",
        type:"",
      },
      newfloor: {
        label: "",
        value: "",
      },
    };
  },
  methods: {
    toggleSwitch() {
      /* 点击展开和缩小导航栏 */
      /* isCollapse为第一个导航栏的展开变量 
          isCollapse2为第二个导航栏的展开变量  */
      this.isCollapse = !this.isCollapse;
      this.isCollapse2 = !this.isCollapse2;
    },
    selectAction() {
      /* 条件查询方法：由查询按钮触发 */
      request({
        url:'/room/selectCondition',
        method:"post",
        contentType:"application/json",
        data:this.slelctFrom
      }).then(res =>{
        if(res.code == 20011){
          this.rooms = res.data;
          this.openMes('查询成功');
        }else{
          this.FalseMes(res.message);
        }
      })
    },
    openaddroomDialog(){
      /* 此事件为打开点击添加的Dialog窗口 */
      /* 刷新newRoom对象 */
      this.newRoom = {
        roomNumber: "",
        price: "",
        floor: "",
        maxNumber: "",
        type:"",
      }
      this.addroomdialogFormVisible = true;

    },
    addroomactive() {
      /* 提交添加房间的方法 */
      /* 需要添加字段state 表示入住状态 */
      this.newRoom.state = "未入住"
      request({
            url:"/room",
            method:"post",
            data:this.newRoom
        }).then((res) => {
          if(res.code == 20031){
            this.openMes('添加成功');
            this.addroomdialogFormVisible = false;
            this.selectfloorAction(this.Defaultfloor);
          }else{
            console.log(res.message);
            this.FalseMes(res.message);
            console.log(JSON.stringify(this.newRoom))
          }
        });
    },
    openRoomDialog(index) {
      /* 此事件为打开房间的Dialog */
      /* 给服务器发送需要展开的房间id */
      /* 将房间信息赋值给temroom */
      request({
        url:"/room/selectById/"+index,
        method:"get",
      }).then(res => {
        if(res.code == 20011){
          this.temroom = res.data;
        }else{
          this.FalseMes(res.message);
        }
      })
      // 打开对应索引的房间弹窗
      this.roomdialogFormVisible = true;
    },
    closeRoomDialog() {
      // 关闭对应索引的房间弹窗
      // 并将数据返回给后端，修改数据
      request({
            url:"/room",
            method:"put",
            data:this.temroom
      }).then((res) => {
        if(res.code == 20021){
          this.openMes(res.message);
          this.roomdialogFormVisible = false;
          this.selectAllAction();
        }else{
          this.FalseMes(res.message);
        }
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
            this.openMes('查询成功');
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
    deleteRoom(){
      request({
        url:'/room/'+this.temroom.id,
        method:"delete"
      }).then(res =>{
        /* console.log(res); */
        if(res.code == 20041){
          this.deleteVisible = false;
          this.roomdialogFormVisible = false;
          this.openMes('删除成功');
          this.selectAllAction();
        }else{
          this.FalseMes(res.message);
        }
      })
      
    }
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  mounted() {
    this.selectAllAction();
    request.get("/room/returnFloor").then((res) => {
      this.floors = res.data;
      console.log(this.floors);
    });
  },
};
</script>

<style>
.box-card {
  width: 98%;
  min-height: 98%;
  position: relative;
}
.room-card {
  width: 150px;
  height: 100px;
  font-weight: bold;
  font-size: large;
  text-align: left;
  border: 1px solid #2b2b2b;
  margin: 0;
  position: relative
}
.roombutton{
  margin-right: 20px;
  margin-left: 20px !important
}
.roombutton:hover .room-card {
  color: #409eff;
  border: 1px solid #409eff;
}
</style>