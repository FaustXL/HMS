<template>
  <div>
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
       <!-- <div class="block">
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
       </div> -->
       <el-steps :active="active" finish-status="success" style="margin: 20px 50px 20px 50px;">
         <el-step title="步骤 1"></el-step>
         <el-step title="步骤 2"></el-step>
         <el-step title="步骤 3"></el-step>
       </el-steps>

       <el-form ref="form" :model="form" label-width="80px">
         <!-- <el-form-item label="活动名称">
           <el-input v-model="form.name"></el-input>
         </el-form-item> -->

         <el-form-item label="房间号">
           <el-select v-model="value" filterable placeholder="请选择">
             <el-option
               v-for="item in rooms"
               :key="item.roomNumber"
               :label="item.roomNumber"
               :value="item.roomNumber">
             </el-option>
           </el-select>
         </el-form-item>

         <!-- <el-form-item label="活动区域">
           <el-select v-model="form.region" placeholder="请选择活动区域">
             <el-option label="区域一" value="shanghai"></el-option>
             <el-option label="区域二" value="beijing"></el-option>
           </el-select>
         </el-form-item>

         <el-form-item label="活动时间">
           <el-col :span="11">
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
           </el-col>
         </el-form-item>
         
         <el-form-item label="订单类型">
           <el-radio-group v-model="form.resource">
             <el-radio label="入住"></el-radio>
             <el-radio label="预订"></el-radio>
           </el-radio-group>
         </el-form-item>
         <el-form-item label="备注">
           <el-input type="textarea" v-model="form.desc"></el-input>
         </el-form-item> -->

         <el-form-item>
           <el-button type="primary" @click="onSubmit">立即创建</el-button>
           <el-button>取消</el-button>
         </el-form-item>
       </el-form>

     </el-tab-pane>
     <el-tab-pane label="客户退房" name="Check">客户退房AAAAAAAAAAAAAAAAAAAAAAAAAA</el-tab-pane>
     <el-tab-pane label="条件查询" name="Inquire">条件查询</el-tab-pane>
   </el-tabs>

     <!-- 房间信息窗口 -->
     <el-dialog
       v-model="tempRoom"
       :title="tempRoom.roomNumber"
       :visible.sync="roomdialogFormVisible">
       <el-descriptions :data="tempRoom" class="margin-top" title="房间信息" :column="3" :size="size" border>
         <!-- <el-descriptions-item>
           <template slot="label">
             <i class="el-icon-postcard"></i>
             身份证号
           </template>
           {{ customer.idCard }}
         </el-descriptions-item>
         
         <el-descriptions-item>
           <template slot="label">
             <i class="el-icon-user"></i>
             姓名
           </template>
           {{ customer.name }}
         </el-descriptions-item>
         <el-descriptions-item>
           <template slot="label">
             <i class="el-icon-mobile-phone"></i>
             手机号
           </template>
           {{ customer.phoneNumber }}
         </el-descriptions-item>
         <el-descriptions-item>
           <template slot="label">
             <i class="el-icon-date"></i>
             生日
           </template>
           {{ customer.birthday }}
         </el-descriptions-item>
         <el-descriptions-item>
           <template slot="label">
             <i class="el-icon-tickets"></i>
             备注
           </template>
           {{ customer.comment }}
         </el-descriptions-item> -->
         <el-descriptions-item>
           <template slot="label">
             房间号
           </template>
           {{ tempRoom.roomNumber }}
         </el-descriptions-item>
         
         <el-descriptions-item>
           <template slot="label">
             价格
           </template>
           {{ tempRoom.price }}
         </el-descriptions-item>
         <el-descriptions-item>
           <template slot="label">
             楼层
           </template>
           {{ tempRoom.floor }}
         </el-descriptions-item>
         <el-descriptions-item>
           <template slot="label">
             最大可入住人数
           </template>
           {{ tempRoom.maxNumber }}
         </el-descriptions-item>
         <el-descriptions-item>
           <template slot="label">
             类型
           </template>
           {{ tempRoom.type }}
         </el-descriptions-item>
       </el-descriptions>
     </el-dialog>

   </el-card>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  data() {
    return {
      activeName: 'RoomControl',
      floorName: 'All',
      TimeDefault: '',
      rooms: [],
      floors: [],
      customer: {
        idCard:'',
        name:'',
        sex:'',
        birthday:'',
        phoneNumber:'',
        comment:'',
      },
      tempRoom:{},
      roomdialogFormVisible: false,
      active: 0,
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
      request({
        url:"/room/selectById/"+index,
        method:"get",
      }).then(res => {
        if(res.code == 20011){
          this.tempRoom = res.data;
        }else{
          console.log(index)
        }
      })
      this.roomdialogFormVisible = true;
    },
    next() {
      if (this.active++ > 2) this.active = 0;
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