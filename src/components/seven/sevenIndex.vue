<template>
  <el-card>
    <div class="a">
      <el-icon>
      <Search />
    </el-icon>筛选搜索
    <div class="b">
      <el-button @click="res">重置</el-button>
      <el-button type="primary" @click="add">查询列表</el-button>
    </div>
    </div>
    <div class="a">
      <el-form :model="formModel">
      <el-form-item label="输入搜索">
        <el-input v-model="id" class="w-50 m-2" placeholder="订单编号" size="large" />
      </el-form-item>
      <el-form-item label="收货人">
        <el-input
          placeholder="收货人姓名/手机号"
          v-model="formModel.memberUsername"
          class="w-50 m-2"
          size="large"
        />
      </el-form-item>
      <el-form-item label="提交时间">
        <el-date-picker v-model="formModel.createTime" type="datetime" placeholder="请选择时间" />
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select class="w-50 m-2" placeholder="全部" v-model="formModel.status" clear="true">
          <el-option v-for="(z,index) in a" :key="index" :label="z" :value="z"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单分类">
        <el-select class="w-50 m-2" placeholder="全部" v-model="formModel.payType" clear="true">
          <el-option v-for="(m,index) in b" :key="index" :label="m" :value="m"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单来源">
        <el-select class="w-50 m-2" placeholder="全部" v-model="formModel.sourceType" clear="true">
          <el-option v-for="(n,index) in c" :key="index" :value="n" :label="n"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    </div>
  </el-card>
  <el-card>
  <div class="a">
    <div>
      数据列表<el-icon><Search></Search></el-icon>
    </div>
    <!-- <div class="b">
      <el-button type="primary" @click="">添加</el-button>
    </div> -->
  </div>
  
  </el-card>
  <el-table :data="tableData">
    <el-table-column type="selection" ></el-table-column>
    <el-table-column prop="id" label="编号" ></el-table-column>
    <el-table-column prop="orderSn" label="订单编号" ></el-table-column>
    <el-table-column prop="createTime" label="提交时间" ></el-table-column>
    <el-table-column prop="memberUsername" label="用户账号" />
    <el-table-column prop="totalAmount" label="订单金额" />
    <el-table-column prop="payType" label="支付方式" />
    <el-table-column prop="sourceType" label="订单来源" />
    <el-table-column prop="status" label="订单状态" />
    <el-table-column prop="orderType" label="操作">
      <template #default="scope">
        <el-button @clcik="this.$router.push('/six')">查看订单</el-button>
        <div v-if="scope.row.status == '已关闭'">
          <el-button type="danger" @click="aa(scope.$index)">删除订单</el-button>
        </div>
        <div v-else-if="scope.row.status == '待发货'">
          <el-button @click="this.$router.push('/eight/'+scope.row.id)">订单发货</el-button>
        </div>
        <div v-else-if="scope.row.status == '已完成'">
          <el-button @click="visible = !visible">订单跟踪</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange"></el-pagination>
  <el-dialog v-model="visible">

  </el-dialog>
</template>
<script>


import { GetReq, PostReq } from "../axios/axios";
import { IntegerToString } from "../utils/integerToString";

let map1 =  new Map()
map1.set(0,'未支付')
map1.set(1,'支付宝')
map1.set(2,'微信')
let map2 = new Map()
map2.set(0,'PC订单')
map2.set(1,'app订单')
let map3 = new Map()
map3.set(0,'待付款')
map3.set(1,'待发货')
map3.set(2,'已发货')
map3.set(3,'已完成')
map3.set(4,'已关闭')
let map4 = new Map()
map4.set(0,'正常订单')
map4.set(1,'秒杀订单')

let _map2 = new Map()
_map2.set('PC订单',0)
_map2.set('app订单',1)

let _map3 = new Map()
_map3.set('待付款',0)
_map3.set('待发货',1)
_map3.set('已发货',2)
_map3.set('已完成',3)
_map3.set('已关闭',4)

let _map4 = new Map()
_map4.set('正常订单',0)
_map4.set('秒杀订单',1)

export default {
  data() {
    return {
      a: ["待付款", "待发货", "已发货", "已完成", "已关闭"],
      b: ["正常订单", "秒杀订单"],
      c: ["PC订单", "APP订单"],
      tableData: [],
      total:0,
      formModel:{

      },
      visible:false
    };
  },
  created() { 
    this.init()
  },
  methods: {
    init() {
      GetReq("/api/OmsOrderController/page?num=1&size=5").then(
        function(data) {
          if (data.code == 200) {
            console.log(data.data); 
            for (let index = 0; index < data.data.list.length; index++) {
              this.tableData.push(data.data.list[index]);
              this.tableData[index].payType = IntegerToString(this.tableData[index].payType,map1)
              this.tableData[index].sourceType = IntegerToString(this.tableData[index].sourceType,map2)
              this.tableData[index].status= IntegerToString(this.tableData[index].status,map3)
              // IntegerToString(this.tableData[index].orderType,map1)

            }
            console.log(this.tableData);
          }
        }.bind(this)
      );
    },add(){

      console.log(this.formModel);  
      // if(this.formModel == {}) return;
      this.formModel.status = IntegerToString(this.formModel.status,_map3)
      this.formModel.payType =IntegerToString(this.formModel.payType,_map4)
      this.formModel.sourceType =IntegerToString(this.formModel.sourceType,_map2)


      let json = JSON.stringify(this.formModel)
      console.log(json);
        PostReq("/api/OmsOrderController/get",json).then(
        function(data) {
          if (data.code == 200) {
            this.tableData.length = 0
            console.log(data.data);
            for (let index = 0; index < data.data.length; index++) {
              this.tableData.push(data.data[index]);
            }
          }
        }.bind(this))
    },
    res(){
        this.formModel = {}
        // GetReq('api/OmsOrderController/del/'+index).then(function(data){
        // if(data.code == 200){
        //     console.log(data.data);
        // }
        // }.bind(this))
  },
  aa(index){
    this.tableData.splice(index,1)
  },
  pageChange(nowpage){
   
      GetReq("/api/OmsOrderController/page?size=5num="+nowpage).then(
        function(data) {
          if (data.code == 200) {
            console.log(data.data);
            for (let index = 0; index < data.data.length; index++) {
              this.tableData.push(data.data[index]);
            }
          }
        }.bind(this))
      
  }

}
}
</script>
<style scoped>
  .a .el-form{
    display: flex;
    flex: 1;
    flex-wrap: wrap;
  }
  .el-form-item{
    width: calc((100% - 10px) / 3);  
    min-width: calc((100% - 10px) / 3); 
    max-width: calc((100% - 10px) / 3); 
  }

</style>