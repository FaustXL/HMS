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
                  v-else-if="item.state == '预订中'"
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
                  v-else-if="item.state == '预订中'"
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


        <el-tab-pane label="客户入住" name="Stay" >
          <el-steps :active="active" finish-status="success" simple style="margin-top: 10px;background-color: white;margin-bottom: 20px;">
            <el-step title="填写表单" ></el-step>
            <el-step title="校验表单" ></el-step>
          </el-steps>

            <div ref="StayBox" class="StayBox">
              <div style="padding: 20px 0px 20px 30px;width: 50%;display: flex;flex: 1;margin: 10px;">
                <el-form ref="form" :model="Stay" label-width="100px" style="display: flex;flex-direction: column;justify-content: space-between;">
                  
                  <el-form-item label="客户姓名">
                    <el-input v-model="Stay.customer.name" placeholder="请输入内容"></el-input>
                  </el-form-item>

                  <el-form-item label="身份证">
                    <el-input v-model="Stay.customer.idCard" placeholder="请输入内容"></el-input>
                  </el-form-item>

                  <el-form-item label="电话号码" prop="phoneNumber" key="phoneNumber">
                    <el-input v-model.number="Stay.customer.phoneNumber" placeholder="请输入内容" ></el-input>
                  </el-form-item>      

                  <el-form-item label="房间号">
                    <el-select v-model="Stay.roomNumber" filterable placeholder="请选择" @change="checkPrice()">
                      <el-option
                        v-for="item in rooms"
                        :key="item.roomNumber"
                        :label="item.roomNumber"
                        :value="item.roomNumber">
                      </el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="入住时间">
                    <el-col :span="11">
                      <div class="block">
                        <el-date-picker
                          v-model="TimeDefault"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetimerange"
                          :picker-options="pickerOptions"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['14:00:00', '12:00:00']"
                          @change="getDate"
                          align="right">
                        </el-date-picker>
                      </div>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="支付方式">
                    <el-radio-group v-model="Stay.paymentWay">
                      <el-radio-button label="信用卡"></el-radio-button>
                      <el-radio-button label="微信"></el-radio-button>
                      <el-radio-button label="支付宝"></el-radio-button>
                      <el-radio-button label="美团"></el-radio-button>
                      <el-radio-button label="现金"></el-radio-button>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="支付结果">
                    <el-radio-group v-model="Stay.paymentStatus">
                      <el-radio-button label="未支付"></el-radio-button>
                      <el-radio-button label="已支付"></el-radio-button>
                    </el-radio-group>
                  </el-form-item>

                  
                </el-form>
              </div>

              <div style="padding: 20px 0px 20px 30px;width: 50%;display: flex;flex: 1;margin: 10px;">
                <el-form ref="form" :model="Stay" label-width="100px" style="display: flex;flex-direction: column;justify-content: space-between;">
                    <el-form-item label="性别">
                      <el-radio-group v-model="Stay.customer.sex">
                      <el-radio label="男"></el-radio>
                      <el-radio label="女"></el-radio>
                    </el-radio-group>
                    </el-form-item>
                    
                    <el-form-item label="订单类型">
                      <el-radio-group v-model="Stay.state">
                        <el-radio label="入住"></el-radio>
                        <el-radio label="预订"></el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="客户备注">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 8}"
                        placeholder="请输入内容"
                        v-model="Stay.customer.comment"
                        style="width: 400px;">
                      </el-input>
                    </el-form-item>

                    <el-form-item label="房间备注">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 8}"
                        placeholder="请输入内容"
                        v-model="Stay.comment">
                      </el-input>
                    </el-form-item>

                    <el-form-item label="折扣">
                        <el-slider
                          v-model="Stay.discount"
                          :step="0.05"
                          max="1"
                          show-stops
                          @change="checkPrice()">
                        </el-slider>
                    </el-form-item>

                    <el-form-item label="价格">
                    <div v-if="price.length == 1" style="color: #409EFF;font-size: 50px;height: 55px;">{{ price[0] }}</div>
                    <div v-else-if="price.length == 2"  style="color: #409EFF;font-size: 50px;height: 55px;">
                      <span style="padding: 0;margin: 0;">{{ price[1] }}</span>
                      <s style="font-size: 15px;color: #555;padding: 0;margin: 0;font-weight: bold;">{{ `原价: ${price[0]}` }}</s>
                    </div>
                    <div v-else style="color: #409EFF;font-size: 50px;height: 55px;">0</div>
                  </el-form-item>
                    
                </el-form>
              </div>
            </div>

            <div ref="StayFrom" class="StayFrom" style="opacity: 0;position: absolute;left: -100%;">
              <el-descriptions direction="vertical" :column="2" border style="width: 100%;margin: 0;">
                <el-descriptions-item label="客户名">{{ Stay.customer.name }}</el-descriptions-item>
                <el-descriptions-item label="性别"><el-tag size="small">{{ Stay.customer.sex }}</el-tag></el-descriptions-item>
                <el-descriptions-item label="手机号">{{ Stay.customer.phoneNumber }}</el-descriptions-item>
                <el-descriptions-item label="身份证">{{ Stay.customer.idCard }}</el-descriptions-item>
                <el-descriptions-item label="客户备注" :span="2">{{ Stay.customer.comment }}</el-descriptions-item>
                <el-descriptions-item label="入住房间号">{{ Stay.roomNumber }}</el-descriptions-item>
                <el-descriptions-item label="订单类型"><el-tag size="small">{{ Stay.state }}</el-tag></el-descriptions-item>
                <el-descriptions-item label="入住时间">{{ Stay.checkInTime }}</el-descriptions-item>
                <el-descriptions-item label="退房时间">{{ Stay.checkOutTime }}</el-descriptions-item>
                <el-descriptions-item label="折扣">{{ Stay.discount }}</el-descriptions-item>
                <el-descriptions-item label="支付方式" :span="2">{{ Stay.paymentWay }}</el-descriptions-item>
                <el-descriptions-item label="房间备注" :span="2">{{ Stay.comment }}</el-descriptions-item>
              </el-descriptions>
            </div>

            <div style="text-align: center;">
              <el-button v-if="active==1" @click="previousClick">上一步</el-button>
              <el-button type="primary" @click="nextClick">下一步</el-button>
            </div>

        </el-tab-pane>

        <el-tab-pane label="客户退房" name="Check" style="position: relative;">
          <el-form :model="Check" label-width="100px" style="display: flex;flex-direction: column;justify-content: space-between;padding-bottom: 50px;margin-top: 20px;">
            <el-form-item label="房间号">
              <el-select v-model="Check.id" filterable placeholder="请选择" @change="checkState()">
                <el-option
                  v-for="item in outRooms"
                  :key="item.roomNumber"
                  :label="item.roomNumber"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作类型">
              <el-tag style="font-size: 15px;">{{ Check.state }}</el-tag>
            </el-form-item>

            <el-form-item label="客户信息">
              <el-descriptions direction="vertical" :column="2" border style="width: 100%;margin: 0;">
                <el-descriptions-item label="客户名">{{ customer.name }}</el-descriptions-item>
                <el-descriptions-item label="性别"><el-tag size="small">{{ customer.sex }}</el-tag></el-descriptions-item>
                <el-descriptions-item label="手机号">{{ customer.phoneNumber }}</el-descriptions-item>
                <el-descriptions-item label="身份证">{{ customer.idCard }}</el-descriptions-item>
                <el-descriptions-item label="客户备注" :span="2">{{ customer.comment }}</el-descriptions-item>
              </el-descriptions>
            </el-form-item>
            <el-button type="primary" style="position: absolute;right: 20px;bottom: 0;" @click="Unsubscribe">{{ `立即${Check.state}` }}</el-button>
          </el-form>

          
        </el-tab-pane>

      </el-tabs>

     <!-- 房间信息窗口 -->
      <el-dialog
        v-model="tempRoom"
        :title="tempRoom.roomNumber"
        :visible.sync="roomdialogFormVisible">
        <el-descriptions :data="tempRoom" class="margin-top" title="房间信息" :column="3" :size="size" border>
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

        <h3 style="margin-top: 40px;">历史客户</h3>
        <el-table
          :data="clients"
          border
          style="width: 100%;margin-bottom: 50px;">
          <el-table-column
            fixed
            prop="idCard"
            label="身份证"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="150">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="120">
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="生日"
            width="150">
          </el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="电话"
            width="150">
          </el-table-column>
          <el-table-column
            prop="comment"
            label="备注"
            width="auto"
            min-width="300">
          </el-table-column>
        </el-table>
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
      outRooms: [],
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
      Stay:{
        roomNumber: '',
        state: '入住',
        comment: '',
        checkInTime:'',
        checkOutTime:'',
        discount: 1,
        paymentWay: '信用卡',
        paymentStatus: '未支付',
        customer: {
          idCard:'',
          name:'',
          sex:'男',
          phoneNumber:'',
          comment:'',
        },
      },
      price: [],
      Check:{
        id: '',
        state: '退房',
      },
      clients: [],
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
        this.selectAllAction()
        console.log(this.activeName);
      }else if(this.activeName == 'Stay'){
        request({
          url:'/room/selectForNoShowRooms',
          method:"get",
        }).then(res => {
          if(res.code == 20011){
            this.rooms = res.data
          }else{
            this.FalseMes(res.massage)
          }
        })

      }else if(this.activeName == 'Check'){
        this.getOutRooms()
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
    openRoomDialog(index) {
      console.log(index)
      // 打开对应索引的房间弹窗
      request({
        url:"/room/selectById/"+index,
        method:"get",
      }).then(res => {
        if(res.code == 20011){
          this.tempRoom = res.data;
          console.log(JSON.stringify(this.tempRoom))
          request({
            url: '/room/selectroomhistory',
            method: "post",
            data: this.tempRoom,
          }).then(res => {
            if(res.code == 20011){
              this.clients = res.data;
            }else{
              this.FalseMes(res.message)
            }
          })
        }else{
          console.log(index)
        }
      });
      
      
      this.roomdialogFormVisible = true;
    },
    nextClick() {
      
      if(this.active==0){
        if( this.Stay.roomNumber==''||
            this.Stay.checkInTime==''||
            this.Stay.checkOutTime==''||
            this.Stay.customer.idCard==''||
            this.Stay.customer.name==''||
            this.Stay.customer.phoneNumber=='')
          {
            this.FalseMes('除备注外，不能留空！');
        }else{
          this.active++;
          this.$refs.StayBox.style = 'opacity: 0;position: absolute;left: -100%;';
          this.$refs.StayFrom.style = 'opacity: 1;';
        }
        
      }else if(this.active==1){
        console.log(this.Stay)
        request({
          url:'/checkInInformation',
          method:"post",
          data: this.Stay
        }).then(res => {
          if(res.code == 20031){
            this.active++
            this.openMes('添加成功！')
          }else{
            this.FalseMes(res.message)
          }
        })

      }else{
        if (this.active++ > 0) this.active = 0;
        this.$refs.StayBox.style = 'opacity: 1;';
        this.$refs.StayFrom.style = 'opacity: 0;position: absolute;left: -100%;';
      }
    },
    previousClick(){
      this.active--;
        this.$refs.StayBox.style = 'opacity: 1;';
        this.$refs.StayFrom.style = 'opacity: 0;position: absolute;left: -100%;';
    },
    getDate(){
      /* 将开始日期赋值给Stay */
      if(this.TimeDefault != null){
        this.Stay.checkInTime = this.TimeDefault[0]
        this.Stay.checkOutTime = this.TimeDefault[1]
        var today = new Date();
        console.log(today.getDate())
        console.log(this.TimeDefault[0])
        var date = new Date(this.TimeDefault[0])
        console.log(date)
        var day = date.getDate()
        console.log(day)
        if(today.getDate() == day){
          this.Stay.state = '入住'
        }else{
          this.Stay.state = '预订'
        }
        this.checkPrice();
      }else{
        this.Stay.checkInTime = this.Stay.checkOutTime = ''
      }
    },
    getOutRooms(){
      request({
        url:'/chroom',
        method:"get",
      }).then(res => {
        if(res.code == 20011){
          this.outRooms = res.data
          this.Check.id = this.outRooms[0].id
          this.checkState()
        }else{
          this.FalseMes(res.message)
        }
      })
    },
    checkState(){
      request({
        url:"/room/selectById/"+this.Check.id,
        method:"get",
      }).then(res => {
        if(res.code == 20011){
          let temp = res.data;
          if(temp.state == "已入住"){
            this.Check.state = "退房"
          }else{
            this.Check.state = "取消订单"
          }
        }else{
          this.FalseMes(res.message);
        }
      })
      request({
        url:'/checkInInformation/'+this.Check.id,
        method:"get",
      }).then(res => {
        if(res.code == 20011){
          this.customer = res.data;
        }else{
          this.FalseMes(res.message)
        }
      })
    },
    Unsubscribe(){
      if(this.Check.state == "退房"){
        request({
          url:'/chroom/'+this.Check.id,
          method:"put"
        }).then(res => {
          if(res.code == 20021){
            this.openMes(res.message)
            this.getOutRooms()
          }else{
            this.FalseMes(res.message)
          }
        })
      }else{
        request({
          url:'/chroom/cancel/'+this.Check.id,
          method:"put"
        }).then(res => {
          if(res.code == 20021){
            this.openMes(res.message)
            this.getOutRooms()
          }else{
            this.FalseMes(res.message)
          }
        })
      }
    },
    checkPrice(){
      if(this.Stay.roomNumber != ''&&
        this.Stay.checkInTime != ''){
          request({
            url:'/room/discount',
            method:"post",
            data:this.Stay,
          }).then(res => {
            if(res.code == 20050){
              this.price = [];
              this.price[0] = res.data
            }else if(res.code == 20051){
              this.price = res.data
              this.openMes(res.message)
            }else{
              this.FalseMes(res.message)
            }
          })
        }
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
  position: relative;
}
.roombutton{
  margin-right: 20px;
  margin-left: 20px !important
}
.roombutton:hover .room-Card {
  color: #409eff;
  border: 1px solid #409eff;
}
.StayBox{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 650px;
  transition: all 0.3s ease;
}
.StayFrom{
  min-height: 650px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}
</style>