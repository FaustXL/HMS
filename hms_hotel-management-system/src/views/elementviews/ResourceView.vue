<template>
  <div>
    <el-card class="box-card">
      <div style="display: flex;flex-wrap: wrap;">
        <el-card class="resource-card" shadow="hover" v-for="(item,index) in resource" :key="index">
          <h1 style="padding: 0;margin: 0 0 10px 0;">{{ item.classify }}</h1>
          <el-input-number v-model="item.number" @change="handleChange" :min="0" label="数据"></el-input-number>
          <div style="margin-top: 20px;">
            <el-popover
              placement="top"
              width="150"
              v-model="item.deleteVisible">
              <p>确定删除该房间吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="item.deleteVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteResource(item.id)">确定</el-button>
              </div>
              <el-button slot="reference" style="margin-right: 10px;background-color: #F56C6C;color: white;" >删除</el-button>
            </el-popover>
            <el-button type="primary" @click="updateResource(item)">提交修改</el-button>
          </div>
        </el-card>

        <el-card shadow="hover" class="resource-card" style="position: relative;">

          <el-card ref="resourceCard1" class="resourceCard" :style="{ left: cardPosition1 }">
            <h1 style="padding: 0;margin: 0 0 0px 0;line-height: 90px;">点击添加</h1>
            <el-button @click="addVisible(isAddFirst)" style="background:transparent;border-width:0px;outline:none;font-size: 40px;"><font-awesome-icon :icon="['far', 'square-plus']" /></el-button>
          </el-card>

          <el-card ref="resourceCard2" class="resourceCard" :style="{ left: cardPosition2 }">
            <el-button @click="addVisible(isAddFirst)" style="background:transparent;border-width:0px;outline:none;position: absolute;top: 40%;left: -5%;font-size: 20px;"><font-awesome-icon :icon="['fas', 'angle-left']" /></el-button>
            <div style="position: relative;margin-top: 5px;">
              <input v-model="newResoure.classify" placeholder="" class="newResoure"  maxlength="16">
              <label class="newResoureLabel">请输入名称</label>
            </div>
            <div style="margin-top: 10px;">
              <el-input-number v-model="newResoure.number" @change="handleChange" :min="0" label="数据"></el-input-number>
            </div>
            <div style="margin-top: 10px;">
              <el-button type="danger" @click="reSect()">重置</el-button>
              <el-button type="primary" @click="addNew()">提交添加</el-button>
            </div>
          </el-card>

        </el-card>
        
      </div>
      
    </el-card>
    
  </div>
</template>

<script>
import request from "@/utils/request.js";
export default {
  data() {
    return {
      resource:[],
      addDialogVisible:false,
      newResoure:{
        classify: '',
        number: 200,
      },
      isAddFirst: true,
      cardPosition1: '0%',
      cardPosition2: '110%',

    };
  },
  methods: {
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
    selectAll(){
      request({
        url:'/stock',
        method:'get',
      }).then(res => {
        if(res.code == 20011){
          console.log(res)
          this.resource = res.data
          this.resource.forEach(item => {
            this.$set(item,'deleteVisible',false);
          })
        }else{
          this.FalseMes(res.message)
        }
      })
    },
    addVisible(){
      if(this.isAddFirst){
        this.cardPosition1='0';
        this.cardPosition2='110%';
        this.isAddFirst = false;
        console.log("sumit")
      }else{
        this.cardPosition1='-110%';
        this.cardPosition2='0';
        this.isAddFirst = true;
      }
      
      
    },
    addResource(){
      request({
        url:'/stock',
        method:"post",
        data: this.newResource,
      }).then(res => {
        if(res.code == 20031){
          this.openMes(res.message)
          this.selectAll()
        }else{
          this.FalseMes(res.message)
        }
      })
    },
    deleteResource(index){
      request({
        url:'/stock/'+index,
        method: "delete",
      }).then(res => {
        if(res.code == 20041){
          this.openMes(res.message);
          this.selectAll()
        }else{
          this.FalseMes(res.message);
        }
      })
    },
    updateResource(item){
      console.log(JSON.stringify(item))
      request({
        url:'/stock',
        method:"put",
        data: item,
      }).then(res => {
        if(res.code == 20021){
          this.openMes(res.message)
          this.selectAll()
        }else{
          this.FalseMes(res.message)
        }
      })
    },
    reSect(){
      this.newResoure={
        classify: '',
        number: 200,
      }
      console.log("sumIt")
    },
    addNew(){
      request({
        url:'/stock',
        method:'post',
        data: this.newResoure
      }).then(res => {
        if(res.code == 20031){
          this.openMes(res.message)
          this.newResoure={
            classify: '',
            number: 200,
          }
          this.selectAll()
        }else{
          this.FalseMes(res.message)
        }
      })
    }
  },
  mounted(){
    this.selectAll();
    this.addVisible();
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
.resource-card{
  width: 250px;
  height: 200px;
  text-align: center;
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}
.resource-card:hover{
  color: #409EFF;
}
.resource-card:hover .resourceCard{
  color: #409EFF;
}
.newResoure{
  width: 80%;
  border-radius: 5px;
  border: 2px solid #888;
  height: 40px;
  position: relative;
  transition: all 0.3s ease;
  font-size: 18px;
  margin-top: 0px;
  text-align: center;
}
.newResoure:focus{
  border: 2px solid #409eff;
  outline: none;
}
.newResoureLabel{
  color: #888;
  position: absolute;
  left: 60px;
  top: 12px;
  padding: 0 5px 0 5px;
  font-size: 17px;
  pointer-events: none;
  transition: all 0.3s ease;
}
.newResoure:focus + .newResoureLabel{
  background-color: white;
  color: #409eff;
  left: 60px;
  top: -8px;
  font-size: 15px;
}
.newResoure:not(:placeholder-shown).newResoure:not(:focus) + .newResoureLabel {
  background-color: white;
  color: #888;
  left: 60px;
  top: -8px;
  font-size: 15px;
}
.resourceCard{
  margin-right: 0;
  border: none;
  position: absolute;
  top: 0;
  width: 250px;
  height: 200px;
  text-align: center;
  transition: all 0.3s ease;
}
</style>