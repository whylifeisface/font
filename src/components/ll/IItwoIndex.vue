<template>
    <el-card>
        <header class="a">
            <div>
               <el-icon><Search></Search></el-icon>筛选搜索
            </div>
            <div class="b">
                <el-button @click="formModel = {}">重置</el-button>
                <el-button @click="sub" type="primary">查询列表   </el-button>
            </div>
        </header>
        <el-form :model="formModel" class="sssss">
            <el-form-item label="商品名称">
                <el-input v-model="formModel.productName" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item label="推荐状态">
                <el-select v-model="formModel.recommendStatus" placeholder="全部">
                    <el-option v-for="(o,index) in Option" :key="index" :value="o" :label="o"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>

<el-card>
    <div class="a">
        <div >
            <el-icon></el-icon>
            数据列表</div>
        <div class="b">
            <el-button @click="sel">选择商品</el-button>
        </div>
    </div>
</el-card>

<el-table
:data="tableData"
:key="bol"
@selection-change="selectchange"
>
<el-table-column type="selection"></el-table-column>
<el-table-column label="编号" prop="id"></el-table-column>
<el-table-column label="商品名称" prop="productName"></el-table-column>
<el-table-column label="是否推荐" >
    <template #default="scope">
    <el-switch v-model="tableData[scope.$index].recommendStatus" :active-value="0"></el-switch>
    </template>
</el-table-column>
<el-table-column label="排序" prop="sort"></el-table-column>
<el-table-column label="状态" prop="status"></el-table-column>
<el-table-column label="操作">
    <template #default="scope">
        <div>
            <el-button @click="sort(scope.row,scope.$index)" text type="primary">设置排序</el-button>
            <el-button @click="dele(scope.$index)" text type="primary">删除</el-button>
        </div>
    </template>
</el-table-column>
</el-table>
    <div class="a">
        <div>
            <el-select v-model="batch" placeholder="批量操作">
                <el-option v-for="(z,index) in op" :key="index" :label="z" :value="z"></el-option>
            </el-select>
            <el-button @click="ens" type="primary">确定</el-button>
        </div>
        <div class="b">
            <el-pagination layout="prev,pager,next" :total="total"></el-pagination>
        </div>
    </div>

<el-dialog v-model="visible"
@close="model = {}">
    <header>
        设置排序
    </header>
    <el-form :model="model">
        <el-form-item label="排序"><el-input v-model="model.sort"></el-input></el-form-item>
    </el-form>
    <div class="a">
        <div class="b">
            <el-button @click="no">取消</el-button>
            <el-button @click="en" type="primary">确定</el-button>
        </div>
    </div>

</el-dialog>


<el-dialog v-model="visibility" @close="dataTbale.length = 0">
    <header>
        选择商品
    </header>
    <el-input v-model="input" placeholder="商品名称搜索">
        <template #append>
            <el-button disabled><el-icon><Search></Search></el-icon></el-button>
        </template>
    </el-input>
    <el-table :data="dataTbale">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="pmsProduct.name" label="商品名称"></el-table-column>
        <el-table-column prop="pmsProduct.productSn" label="货号"></el-table-column>
        <el-table-column prop="pmsProduct.price" label="价格"></el-table-column>
    </el-table>
    <div class="a">
        <div class="b">
            <el-button @click="visibility = false">取消</el-button>
            <el-button @click="enss" type="primary" >确定</el-button>

        </div>
    </div>
</el-dialog>
</template>
<script>
import { GetReq, PostReq } from '../axios/axios';
import { IntegerToString } from '../utils/integerToString';
import { twoObject } from '../utils/twoObject';
let map1 = new Map();
            map1.set("推荐中",1)
            map1.set("未推荐",0)
    export default{
        data(){
            return{
                Option:['未推荐','推荐中'],
                model:{},
                bol:false,
                formModel:{},
                tableData:[],
                visible:false,
                batch:'',
                input:'',
                dataTbale:[],
                total:0,
                dat:[],
                op:['设为推荐','取消推荐','删除'],
                visibility:false
            }
        },
        created () {
            this.init()
        },
      methods: {
        init(){
          GetReq('api/SmsHomeRecommendProductController/init?num=1&size=5').then(data => {
            if(data.code == 200){
                for (let index = 0; index < data.data.list.length; index++) {
                    this.tableData.push(data.data.list[index])
                    this.tableData[index].status = this.tableData[index].recommendStatus == 0 ?"推荐中":"未推荐"
                }
                this.total=data.data.total
                console.log(this.tableData);
            }
          })  
        },
        en(){
            this.visible = false
            if (this.tableData[this.model.index].sort == this.model.sort) return

                this.tableData[this.model.index].sort = this.model.sort 
                this.bol = !this.bol
                let json = JSON.stringify({
                        smsHomeRecommendProduct:{
                            sort:this.model.sort
                        }
                    })
            PostReq('api/SmsHomeRecommendProductController/update',json).then(data => {
                if(data.code == 200){
                    console.log();
                }
            })
        },
        no(){
            this.visible = false
        },
        dele(index){
            this.tableData.splice(index,1)
            PostReq('api/SmsHomeRecommendProductController/del'+index + '').then(data => {
                if (data.code == 200) {
                    for (let index = 0; index < data.data.length; index++) {
                        console.log();
                    }
                }
            })
        },
        sort(row,index){
            this.visible = true
            this.model = twoObject(row,this.model)
            this.model.index = index
        },
        sel(){
            this.visibility = true
            GetReq('api/SmsHomeRecommendProductController/sql').then(data => {
                if (data.code == 200) {
                    for (let index = 0; index < data.data.length; index++) {
                        this.dataTbale.push(data.data[index])
                    }
                }
            })
        },
        ens(){
            if(this.batch == " ")return 
            console.log("11111111111");
            console.log(this.tableData);
            console.log(this.dat);
            switch(this.batch){
                case "设为推荐":{
                for (let index = 0; index < this.tableData.length; index++) {
                    for (let aa = 0; aa < this.dat.length; aa++) {
                                if (this.tableData[index].id == this.dat[aa].id &&this.tableData[index].status != "推荐中") {
                                    this.tableData[index].status = "推荐中"
                                    this.tableData[index].recommendStatus = 1
                                    this.bol = !this.bol
                                }                        
                    }
                }
                    break;
                }
                case "取消推荐":{
                    for (let index = 0; index < this.tableData.length; index++) {
                    for (let aa = 0; aa < this.dat.length; aa++) {
                                if (this.tableData[index].id == this.dat[aa].id &&this.tableData[index].status != "未推荐") {
                                    this.tableData[index].status = "未推荐"
                                    this.tableData[index].recommendStatus = 0
                                    this.bol = !this.bol

                                }                        
                    }
                }
                    break;
                }
                    
                case "删除":{
                    for (let index = 0; index < this.tableData.length; index++) {
                    for (let aa = 0; aa < this.dat.length; aa++) {
                                if (this.tableData[index].id == this.dat[aa].id) {
                                    this.dele(index)
                                    this.bol = !this.bol

                                }                        
                    }
                }
                    break;}

            }
        },
        selectchange(val){
            this.dat.length = 0 
            for (let index = 0; index < val.length; index++) {
                this.dat.push(val[index])
            }
        },
        sub(){

            this.formModel.recommendStatus=  IntegerToString(this.formModel.recommendStatus,map1)
           let json = JSON.stringify({
                smsHomeRecommendProduct:{
                    productName:this.formModel.productName
                    ,
                    recommendStatus:this.formModel.recommendStatus
                }
            })
            this.tableData.length = 0
            PostReq('api/SmsHomeRecommendProductController/get',json == {} ? null:json).then(data => {
                if (data.code == 200) {
                    for (let index = 0; index < data.data.length; index++) {
                        this.tableData.push(data.data[index])
                        this.tableData[index].status = this.tableData[index].recommendStatus == 0 ?"推荐中":"未推荐"
                    
                    }
                }
            })
        }

      }
    }
</script>
<style>
    .a{
        display: flex;
        flex: 1;
    }
    .b{
        margin-left: auto;
    }
</style>