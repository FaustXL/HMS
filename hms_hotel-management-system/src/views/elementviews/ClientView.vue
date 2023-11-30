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
            <i><font-awesome-icon :icon="['fas', 'expand']" spin /></i>
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
            <el-menu-item index="5"  style="color: #409eff;">
              <i class="icon"><font-awesome-icon :icon="['fas', 'users-viewfinder']" style="color: #409eff;"/></i>
              <span slot="title">客户管理</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>

      <el-main>
        <el-card class="box-card">
          <template>
            <el-table
              :data="users"
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
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>

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
              :page-sizes="[15, 20, 25, 30]"
              :page-size="pageSize"
              layout="sizes, prev, pager, next,total"
              :total=total>
            </el-pagination>
          </div>

          <el-dialog title="条件查询" :visible.sync="dialogFilterVisible">
            <el-form :model="filter">
              <el-form-item label="名字" :label-width="formLabelWidth">
                <el-input v-model="filter.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" :label-width="formLabelWidth">
                <el-input v-model="filter.idCard" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="filter.sex" placeholder="请选择性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话号码" :label-width="formLabelWidth">
                <el-input v-model="filter.phoneNumber" autocomplete="off"></el-input>
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
            <el-table
              :data="filterUsers"
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
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleClick(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>

          <el-dialog title="用户信息编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="名字" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" :label-width="formLabelWidth">
                <el-input v-model="form.idCard" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-select v-model="form.sex" placeholder="请选择性别">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生日" :label-width="formLabelWidth">
                <span>{{ form.birthday }}</span>
              </el-form-item>
              <el-form-item label="电话号码" :label-width="formLabelWidth">
                <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  autosize
                  placeholder="请输入内容"
                  v-model="form.comment">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false;">取 消</el-button>
              <el-button type="primary" @click="upDataUser()">确 定</el-button>
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
      users: [],
      currentPage: 1,
      pageSize: 15,
      dialogFormVisible: false,
      dialogFilterVisible: false,
      total: '',
      form: {
        id: '',
        idCard:'',
        name:'',
        sex:'',
        birthday: '',
        phoneNumber: '',
        comment: '',
      },
      filter: {
        idCard:'',
        name:'',
        sex:'',
        phoneNumber: '',
      },
      formLabelWidth: '120px',
      dialogFilterOutcomeVisible: false,
      filterUsers:[],
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
    handleClick(row) {
      /* 员工编辑展示的变量，深度拷贝 */
      this.form.id = row.id;
      this.form.idCard = row.idCard;
      this.form.name = row.name;
      this.form.sex = row.sex;
      this.form.birthday = row.birthday;
      this.form.phoneNumber = row.phoneNumber;
      this.form.comment = row.comment;
      this.dialogFormVisible = true;
      console.log(row);
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
        url:'/customer/'+this.pageSize+'/'+this.currentPage,
        method:"get",
      }).then( res =>{
        if(res.code == 20011){
          this.users = res.data.records;
          this.total = res.data.total;
        }else{
          console.log(res);
          this.openMes(res.message);
        }
      })
    },
    openMes(message) {
      /* 打开消息提示框 */
      const h = this.$createElement;
      this.$notify({
        title: '提示',
        message: h('i', { style: 'color: teal'}, message),
        customClass: 'messageZ'
      });
    },
    upDataUser(){
      /* 更新用户数据 */
      request({
        url:'/customer',
        method:"put",
        data:this.form
      }).then( res =>{
        if(res.code == 20021){
          this.dialogFormVisible = false;
          this.openMes(res.message);
          this.Page();
        }else{
          this.openMes(res.message);
        }
      })
    },
    openDialogFilter(){
      /* 搜索使用的变量 */
      this.filter.idCard = '';
      this.filter.name = '';
      this.filter.sex = '';
      this.filter.phoneNumber = '';
      this.dialogFilterVisible = true;
    },
    FilterAction(){
      /* 向后端发送搜索的信息，并得到搜索结果，打开结果窗口 */
      request({
        url:'/customer/selectCondition',
        method:"post",
        data:this.filter
      }).then( res =>{
        if(res.code == 20011){
          this.filterUsers = res.data;
          this.dialogFilterVisible = false;
          this.openMes('查询成功');
          this.dialogFilterOutcomeVisible = true;
        }else{
          this.openMes(res.message);
        }
      })
    }
  },
  mounted(){
    this.Page();
  }
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
.pagesize{
  position: absolute;
  bottom: 20px;
  right: 20px;
}
</style>