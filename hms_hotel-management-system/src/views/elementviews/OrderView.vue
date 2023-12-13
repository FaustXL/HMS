<template>
  <div>
    <el-card class="box-card">
      <el-card shadow="never" style="margin-bottom: 30px;">
        <div style="display: flex;width: 100%;justify-content: space-between;text-align: center;">
          <div class="moneyCard">
            <span>今日营业额为</span>
            <span style="font-size: 50px;color: #409EFF;margin-left: 10px;">{{ todayMoney }}</span>
          </div>
          <div class="moneyCard">
            <span>第</span>
            <span>
              <el-select v-model="valueOfMonth" placeholder="请选择" style="width: 100px;margin: 0 10px;" @change="getMonthMoney()">
                <el-option
                  v-for="item in month"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
            <span>的总营业额为</span>
            <span style="font-size: 50px;color: #409EFF;margin-left: 10px;">{{ monthMoney }}</span>
          </div>
        </div>
      </el-card>
      <el-table :data="order" border style="width: 100%;margin-bottom: 50px;">
        <el-table-column fixed prop="orderId" label="订单号" width="200">
        </el-table-column>
        <el-table-column prop="checkInId" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="roomPrice" label="房间价格" width="120">
        </el-table-column>
        <el-table-column prop="totalAmount" label="总计金额" width="120">
        </el-table-column>
        <el-table-column prop="paymentWay" label="支付方式" width="120">
        </el-table-column>
        <el-table-column prop="paymentStatus" label="支付状态" width="120">
        </el-table-column>
        <el-table-column prop="creationTime" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="cancellationTime" label="取消时间" width="auto">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 查找 -->
      <el-button type="primary" style="position: absolute; left: 20px;bottom: 20px;" @click="openDialogFilter()">
        <font-awesome-icon :icon="['fas', 'filter']" style="margin-right: 10px;"/>条件查询
      </el-button>

      <!-- 分页条 -->
      <div class="block pagesize">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next,total"
          :total=total>
        </el-pagination>
      </div>

      <el-dialog title="条件查询" :visible.sync="dialogFilterVisible">
        <el-form :model="selection">
          <el-form-item label="订单号" :label-width="formLabelWidth">
            <el-input v-model="selection.orderId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付方式" :label-width="formLabelWidth">
            <el-select v-model="selection.paymentWay" placeholder="请选择">
              <el-option label="信用卡" value="信用卡"></el-option>
              <el-option label="微信" value="微信"></el-option>
              <el-option label="支付宝" value="支付宝"></el-option>
              <el-option label="美团" value="美团"></el-option>
              <el-option label="现金" value="现金"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付状态" :label-width="formLabelWidth">
            <el-select v-model="selection.paymentStatus" placeholder="请选择">
              <el-option label="取消预订" value="取消预订"></el-option>
              <el-option label="已支付" value="已支付"></el-option>
              <el-option label="未支付" value="未支付"></el-option>
              <el-option label="已退款" value="已退款"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="月份" :label-width="formLabelWidth">
            <el-date-picker
              v-model="selection.date"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFilterVisible = false;">取 消</el-button>
          <el-button type="primary" @click="FilterAction()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="查询结果"
        :visible.sync="dialogFilterOutcomeVisible"
        width="80%"
        style="margin-top: -8%;">
        <el-table :data="searchResults.ordersList" border style="width: 100%;margin-bottom: 50px;">
          <el-table-column fixed prop="orderId" label="订单号" width="200">
          </el-table-column>
          <el-table-column prop="checkInId" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="roomPrice" label="房间价格" width="120">
          </el-table-column>
          <el-table-column prop="totalAmount" label="总计金额" width="120">
          </el-table-column>
          <el-table-column prop="paymentWay" label="支付方式" width="120">
          </el-table-column>
          <el-table-column prop="paymentStatus" label="支付状态" width="120">
          </el-table-column>
          <el-table-column prop="creationTime" label="创建时间" width="200">
          </el-table-column>
          <el-table-column prop="cancellationTime" label="取消时间" width="auto">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small"
                >查看</el-button
              >
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="font-size: 20px;font-weight: bold;text-align: center;">
          <span>查询出的结果的总营业额为</span>
          <span style="font-size: 50px;color: #409EFF;margin-left: 10px;">{{ searchResults.money }}</span>
        </div>

      </el-dialog>
<template v-if="orderView">
      <el-dialog
        title="查询结果"
        :visible.sync="dialogOrderViewVisible"
        width="80%"
        style="margin-top: -8%;">
        
        <!-- <el-descriptions direction="vertical" :column="2" border style="width: 100%;margin: 0;">
          <el-descriptions-item label="客户名">{{ orderView.client.name }}</el-descriptions-item>
          <el-descriptions-item label="性别"><el-tag size="small">{{ orderView.client.sex }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="手机号">{{ orderView.client.phoneNumber }}</el-descriptions-item>
          <el-descriptions-item label="身份证">{{ orderView.client.idCard }}</el-descriptions-item>
          <el-descriptions-item label="客户备注" :span="2">{{ orderView.client.comment }}</el-descriptions-item>
          <el-descriptions-item label="订单号">{{ orderView.orderId }}</el-descriptions-item>
          <el-descriptions-item label="房间价格">{{ orderView.roomPrice }}</el-descriptions-item>
          <el-descriptions-item label="创建时间"><el-tag size="small">{{ orderView.creationTime }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="取消时间"><el-tag size="small">{{ orderView.cancellationTime }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="支付状态"><el-tag size="small">{{ orderView.paymentStatus }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="支付方式"><el-tag size="small">{{ orderView.paymentWay }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="实际支付">{{ orderView.totalAmount }}</el-descriptions-item>
          <el-descriptions-item label="入住房间号">{{ orderView.room.roomNumber }}</el-descriptions-item>
          <el-descriptions-item label="房间楼层">{{ orderView.room.floor }}</el-descriptions-item>
          <el-descriptions-item label="房间类型">{{ orderView.room.type }}</el-descriptions-item>
          <el-descriptions-item label="房间可入住最大人数">{{ orderView.room.maxNumber }}</el-descriptions-item>
        </el-descriptions> -->
        <el-descriptions direction="vertical" :column="2" border style="width: 100%;margin: 0;">
          <el-descriptions-item label="客户名">{{ client.name }}</el-descriptions-item>
          <el-descriptions-item label="性别"><el-tag size="small">{{ client.sex }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="手机号">{{ client.phoneNumber }}</el-descriptions-item>
          <el-descriptions-item label="身份证">{{ client.idCard }}</el-descriptions-item>
          <el-descriptions-item label="客户备注" :span="2">{{ client.comment }}</el-descriptions-item>
          <el-descriptions-item label="订单号">{{ orderView.orderId }}</el-descriptions-item>
          <el-descriptions-item label="房间价格">{{ orderView.roomPrice }}</el-descriptions-item>
          <el-descriptions-item label="创建时间"><el-tag size="small">{{ orderView.creationTime }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="取消时间"><el-tag size="small">{{ orderView.cancellationTime }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="支付状态"><el-tag size="small">{{ orderView.paymentStatus }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="支付方式"><el-tag size="small">{{ orderView.paymentWay }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="实际支付">{{ orderView.totalAmount }}</el-descriptions-item>
          <el-descriptions-item label="入住房间号">{{ room.roomNumber }}</el-descriptions-item>
          <el-descriptions-item label="房间楼层">{{ room.floor }}</el-descriptions-item>
          <el-descriptions-item label="房间类型">{{ room.type }}</el-descriptions-item>
          <el-descriptions-item label="房间可入住最大人数">{{ room.maxNumber }}</el-descriptions-item>
        </el-descriptions>
      </el-dialog></template>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  data() {
    return {
      order: [],
      currentPage: 1,
      pageSize: 10,
      total: '',
      month:[
        {
          label:"1月",
          value:1
        },
        {
          label:"2月",
          value:2
        },
        {
          label:"3月",
          value:3
        },
        {
          label:"4月",
          value:4
        },
        {
          label:"5月",
          value:5
        },
        {
          label:"6月",
          value:6
        },
        {
          label:"7月",
          value:7
        },
        {
          label:"8月",
          value:8
        },
        {
          label:"9月",
          value:9
        },
        {
          label:"10月",
          value:10
        },
        {
          label:"11月",
          value:11
        },
        {
          label:"12月",
          value:12
        }
      ],
      valueOfMonth:"",
      todayMoney:'',
      monthMoney:'',
      selection:{
        orderId:'',
        paymentWay:'',
        paymentStatus:'',
        date:'',
      },
      searchResults:{},
      dialogFilterVisible: false,
      dialogFilterOutcomeVisible: false,
      dialogOrderViewVisible: false,
      formLabelWidth: '120px',
      /* orderView:null, */
      orderView:{},
      room:{
        roomNumber:'',
        floor:'',
        type:'',
        maxNumber:''
      },client:{
        name:'',
        sex:'',
        phoneNumber:'',
        idCard:'',
        comment:'',
      },
    };
  },
  methods: {
    openMes(message) {
      //字体为绿色的提示框
      //用于成功提示
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: teal" }, message),
        customClass: "messageZ",
      });
    },
    FalseMes(mes) {
      //字体为红色的提示框
      //用于警告、报错
      const h = this.$createElement;
      this.$notify({
        title: "提示",
        message: h("i", { style: "color: red" }, mes),
        customClass: "messageZ",
      });
    },
    getOrder() {
      request({
        url: "/order",
        method: "get",
      }).then((res) => {
        if (res.code == 20011) {
          this.order = res.data;
          this.order.forEach(item => {
            if(item.creationTime != null){
              item.creationTime = item.creationTime.replace("T", " ");
            }
            if(item.cancellationTime != null){
              item.cancellationTime = item.cancellationTime.replace("T", " ");
            }
          })
        } else {
          this.FalseMes(res.message);
        }
      });
    },
    handleSizeChange(val) {
      /* 分页条每页x条 */
      this.pageSize = val;
      this.currentPage = 1;
      this.Page();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      /* 分页条第几页更改 */
      this.currentPage = val;
      this.Page();
      console.log(`当前页: ${val}`);
    },
    Page(){
      /* 向后端发送请求读取当前页数的数据 */
      request({
        url:'/order/selectByPage/'+this.currentPage+'/'+this.pageSize,
        method:"get",
      }).then( res =>{
        if(res.code == 20011){
          this.order = res.data[0].records;
          if(this.order!=[]){
            this.order.forEach(item => {
              if(item.creationTime != null){
                item.creationTime = item.creationTime.replace("T", " ");
              }
              if(item.cancellationTime != null){
                item.cancellationTime = item.cancellationTime.replace("T", " ");
              }
            })
          }
          this.total = res.data[0].total;
        }else{
          console.log(res);
          this.openMes(res.message);
        }
      })
    },
    getMonthMoney(){
      console.log(this.valueOfMonth)
      let d = new Date();
      let yearMonth = d.getFullYear()+"-"+this.valueOfMonth;
      if(this.valueOfMonth<10){
        yearMonth = d.getFullYear()+"-0"+this.valueOfMonth;
      }
      this.selection={
        orderId:'',
        paymentWay:'',
        paymentStatus:'',
        date:yearMonth,
      }
      request({
        url:'/order',
        method:"post",
        data:this.selection
      }).then(res => {
        if(res.code == 20011){
          this.monthMoney = res.data.money
        }else{
          this.FalseMes(res.message)
        }
      })
    },
    openDialogFilter(){
      /* 搜索使用的变量 */
      this.selection.orderId = '';
      this.selection.paymentWay = '';
      this.selection.paymentStatus = '';
      this.selection.date = '';
      this.dialogFilterVisible = true;
    },
    FilterAction(){
      if(this.selection.date!=''){
        if((this.selection.date.getMonth()+1)<10){
          this.selection.date = this.selection.date.getFullYear() + '-0' + (this.selection.date.getMonth()+1)
        }else if((this.selection.date.getMonth()+1)>=10){
          this.selection.date = this.selection.date.getFullYear() + '-' + (this.selection.date.getMonth()+1)
        }
      }
      request({
        url:'/order',
        method:"post",
        data:this.selection
      }).then(res => {
        if(res.code == 20011){
          console.log(JSON.stringify(res.data))
          this.searchResults = res.data
          this.searchResults = res.data
          console.log(JSON.stringify(this.searchResults))
          this.dialogFilterVisible = false
          this.dialogFilterOutcomeVisible=true
        }else{
          this.FalseMes(res.message)
        }
      })
      
    },
    handleClick(row){
      console.log(JSON.stringify(row))
      this.orderView = row
      request({
        url:'/order/'+row.orderId,
        method:"get"
      }).then(res => {
        if(res.code == 20011){
          this.client = res.data
          request({
            url:'/order/selectRoomInformation/'+row.orderId,
            method:"get"
          }).then(res => {
            if(res.code == 20011){
              this.room = res.data
              this.dialogOrderViewVisible = true
            }else{
              this.FalseMes(res.message)
            }
          })
        }else{
          this.FalseMes(res.message)
        }
      });
      
    }
  },
  mounted(){
    this.Page();
    let d = new Date();
    this.valueOfMonth = (d.getMonth()+1);
    console.log(this.valueOfMonth)
    request({
      url:'/order/getThatDayMoney',
      method:"get"
    }).then(res => {
      if(res.code == 20011){
        this.todayMoney = res.data.money
      }else{
        this.FalseMes(res.message)
      }
    })
    this.getMonthMoney();
  }
};
</script>

<style>
.box-card {
  width: 98%;
  min-width: 1000px;
  min-height: 95vh;
  margin: 0;
  padding: 0;
  position: relative;
}
.pagesize{
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.moneyCard{
  width: 50%;
  height: 150px;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
}
</style>