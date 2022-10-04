<template>
    <twoSonIndex @rese="this.formModel = {}" @sear="sea">
    <el-form :model="formModel" class="sssss">
        <el-form-item prop="name" label="广告名称">
            <el-input v-model="formModel.name" placeholder="广告名称"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="广告位置">
            <el-select v-model="formModel.type" placeholder="全部">
                <el-option v-for="(o,index) in option" :key="index" :label="o" :value="o"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="endTime" label="到期时间">
            <el-time-picker v-model="formModel.endTime" type="date" placeholder="请选择时间"></el-time-picker>
        </el-form-item>
    </el-form>
</twoSonIndex>
<sonIndex rou="sixIndex" mes="添加广告"></sonIndex>

    <el-table :data="tableData"
    :key="bol"
    :selection-change="selectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="广告名称"></el-table-column>
        <el-table-column prop="type" label="广告位置"></el-table-column>
        <el-table-column prop="pic" label="广告图片"></el-table-column>
        <el-table-column prop="" label="时间"></el-table-column>
        <el-table-column prop="status" label="上线/下线">
            <template #default="scope">
                <el-switch v-model="tableData[scope.$index].status" :active-value="0"></el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="clickCount" label="点击次数"></el-table-column>
        <el-table-column prop="orderCount" label="生成订单"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button text @click="edit(scope.row)" type="primary">编辑</el-button>
                <el-button text @click="del(scope.$index)" type="primary">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

<div class="a">
    <el-select v-model="batch" placeholder="批量操作">
        <el-option v-for="(i,index) in op" :key="index" :label="i" :value="i"></el-option>   
    </el-select>
    <el-button @clcik="ensure" type="primary">确定</el-button>
    <div></div>
</div>

</template>
<script>
import sonIndex from "@/components/son/sonIndex.vue";
import twoSonIndex from "@/components/son/twoSonIndex.vue";
import { GetReq, PostReq } from "../axios/axios";

    export default{
        components:{sonIndex,twoSonIndex},
        data(){
            return{
                option:['PC首页轮播','APP'],
                tableData:[],
                total:0,
                batch:'',
                bol:false,
                selectionData :[],
                formModel:{},
                op:['删除']
            }
        },
        created () {
            this.init()
        },
        methods: {
            init(){
                GetReq('api/SmsHomeAdvertiseController/init?num=1&size=5').then(data => {
                    if (data.code == 200) {
                        for (let index = 0; index < data.data.list.length; index++) {
                            this.tableData.push(data.data.list[index])
                        }
                        this.total = data.data.total
                    }
                })
            },
            sea(){
                console.log(this.formModel);
                let json = JSON.stringify({
                    "":this.formModel
                })
                PostReq('api/SmsHomeAdvertiseController/get',json).then(data => {
                    if (data.code == 200) {
                        for (let index = 0; index < data.data.length; index++) {
                            this.tableData.push(data.data)
                        }
                    }
                })
            },
            ensure(){
                if(this.batch == "")return 
                switch (this.batch) {
                    case "删除":
                        for (let index = 0; index < this.tableData.length; index++) {
                            for (let aa = 0; aa < this.selectionData.length; aa++) {
                                    if (this.tableData[index].id == this.selectionData[aa].id ) {
                                        this.del(index)
                                    }
                            }
                        }
                        break;
                
                }
            },
            selectionChange(val){
                this.selectionData.length = 0
                for (let index = 0; index < val.length; index++) {
                    this.selectionData.push(val[index])
                }
            },
            del(index){
                this.tableData.splice(index,1)
                PostReq('api/SmsHomeAdvertiseController/del'+index).then(data => {
                    if (data.code == 200) {
                        console.log();
                    }
                })
            },
            edit(row){
                this.$router.push({path:"/sixIndex",query:{Form:
                    encodeURIComponent(
                JSON.stringify(row)
                )}})
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