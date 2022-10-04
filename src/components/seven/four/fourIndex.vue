<template>
<div class="wi">
    <el-card>
<el-row>
    <el-col :span="2">
            <el-icon></el-icon><span style="text-align: center;">数据列表</span>
        </el-col>
        <el-col :span="2" :offset="20">
            <el-button @click="adbDia">添加</el-button>
        </el-col>
</el-row>
    </el-card>
    <el-table :data="tableData"
    ref="multipleTableRef"  
    @selection-change="handleSelectionChange"
    >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="原因类型"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="status" label="是否可用">
            <template #default="scope">
            <el-switch v-model="scope.row.status" :active-value="1"></el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="添加时间"></el-table-column>
        <el-table-column  label="操作">
            <template #default="scope">
                <el-button @click="show(scope.row)">编辑</el-button>
                <el-button type="danger" @click="dd(scope.$index)">删除</el-button>
            </template> 
        </el-table-column>
        <el-table-column>
            
        </el-table-column>
    </el-table>
    <el-form-item >
                <el-select placeholder="批量操作" v-model="selec" clearable style="margin-right: 20px;">
                <el-option v-for="(ss,index) in op" :key="index" :label="ss" :value="ss"></el-option>
                </el-select>
        <el-button type="primary" @click="sss">确定</el-button>
    <div class="b">
        <el-pagination layout="prev, pager, next" :total="total"></el-pagination>
    </div>

    </el-form-item>
           

    <el-dialog v-model="dialogVisible">
        dialog
        <head>添加退货原因</head>
        <el-form :model="FormModel">
            <el-form-item label="原因类型"><el-input v-model="FormModel.name"></el-input></el-form-item>
            <el-form-item label="排序"><el-input v-model="FormModel.sort"></el-input></el-form-item>
            <el-form-item label="是否启用"><el-switch v-model="FormModel.status" :active-value="1"></el-switch></el-form-item>
                <el-button @click="cli">确定</el-button>
        </el-form>
    </el-dialog>
</div>

</template>

<script>
import { GetReq } from '@/components/axios/axios'

    export default{
        data(){
            return {
                FormModel:{
                    name:'',
                    sort:'',
                    status:'',
                    id:0,
                },
                selec:'',

                op:['删除'],
                multipleSelection : [],
                multipleTableRef:'',
                tableData:[],
                total:0,
                dialogVisible:false,
                multipleSelectio:[]
            }
        },
        created() { 
            this.init()
        },
        methods: {
            sss(){
                if(this.selec == "")return
                    this.tableData.length = 0
                    for (let index = 0; index < this.multipleSelectio.length; index++) {
                            for (let aa = 0; aa < this.tableData.length; aa++) {
                                    if(this.tableData[index].id  ==this.multipleSelectio[index].id){
                                        this.del(this.tableData[index].id)
                                    }
                            }
                    }
                    console.log(this.tableData);
                
              
        }
           ,
            dd(index){
                this.tableData.splice(index,1)
                GetReq('api/OmsOrderReturnReasonController/del'+index).then(function (data) {
                    if (data.code == 200) {
                        console.log();
                    }
                }.bind(this))
            },
             handleSelectionChange (val) {
                console.log(val);
                this.multipleSelectio = []
                for (let index = 0; index < val.length; index++) {
                this.multipleSelectio.push(val[index])
                }
                console.log("=====");
                console.log(this.multipleSelectio);
                },

            show(row){

                this.FormModel.id = row.id
                this.FormModel.name = row.name
                this.FormModel.sort = row.sort
                this.FormModel.status = row.status
                if(this.FormModel.name == " ") return
                GetReq('api/OmsOrderReturnReasonController/update',this.FormModel).then(data => {
                    if(data.code == 200){
                        console.log();
                    }
                })
                this.dialogVisible = true
            },
            cli(){
                this.dialogVisible = false

                this.tableData[this.FormModel.id].name = this.FormModel.name
                this.tableData[this.FormModel.id].sort = this.FormModel.sort
                this.tableData[this.FormModel.id].status = this.FormModel.status
                this.FormModel = {}
            },
            // handleSelectionChange(row){
            //     if(!row) return
            //     row.forEach((row) => {
            //         this.multipleTableRef.value.toggleRowSelection(row, undefined)
            //      })
            // },
            init(){
                GetReq('api/OmsOrderReturnReasonController/page?num=1&size=5').then(function(data){
                if(data.code == 200){
                    for (let index = 0; index < data.data.list.length; index++) {
                    this.tableData.push(data.data.list[index])
                    }
                    console.log(this.tableData);
                    this.total = data.data.total
                    console.log("total");
                    console.log(this.total);
                }
            }.bind(this))
            },
            adbDia(){
                this.dialogVisible = true
                GetReq('api/OmsOrderReturnReasonController/insert',this.FormModel).then(data => {
                    if (data.code == 200) {
                        console.log();
                    }
                })
            }   
        }
        }
    
    
</script>
<style >
    .wi{
        width: 100%;
    }
</style>