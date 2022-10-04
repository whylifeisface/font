<template>
    <div style="width:100%">
        <el-card>
            <el-form-item>
                <span>数据列表</span>
                <div style="margin-left: auto ;">
                    <el-button @click="visible = true" >添加</el-button>
                </div>
            </el-form-item>
    </el-card>

    <el-table :data="tableTata">
        <!-- id                      name                 start_time           end_time             status               create_time           -->
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="秒杀时间段名称"></el-table-column>
        <el-table-column prop="startTime" label="每日开始时间"></el-table-column>
        <el-table-column prop="endTime" label="每日结束时间"></el-table-column>
        <el-table-column prop="status" label="启用">
            <template #default="scope">
                <el-switch v-model="scope.row.status" :active-value="0"></el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
                <template #default="scope">
                    <el-button text type="primary" @click="edit(scope.row)">编辑</el-button>
                    <el-button text type="primary" @click="del(scope.$index)">删除</el-button>
                </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="visible" @close="formModel={}">
        <header>
            <span>添加时间段</span>
        </header>
        <el-form :model="formModel">
            <el-form-item label="秒杀时间段名称"><el-input v-model="formModel.name"></el-input></el-form-item>
            <el-form-item label="每日开始时间"><el-date-picker v-model="formModel.startTime" placeholder="" type="date"></el-date-picker></el-form-item>
            <el-form-item label="每日结束时间"><el-date-picker v-model="formModel.endTime" placeholder="" type="date"></el-date-picker></el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="formModel.status" :active-value="0"></el-switch>
            </el-form-item>
        </el-form>
    </el-dialog>
    </div>

</template>
    <script>
import { GetReq } from '@/components/axios/axios';

        export default{
            data() {
                return {
                    tableTata:[],
                    formModel:{},
                    visible:false
                }
            },
            created () {
                this.init()
            },
            methods: {
                init(){
                    GetReq('api/SmsFlashPromotionSessionController/init').then(data => {
                        if (data.code == 200) {
                            for (let index = 0; index < data.data.length; index++) {
                                    this.tableTata.push(data.data[index])
                            }
                        }
                    })
                },
                add(){

                },
                edit(row){
                    this.visible = !this.visible
                  this.formModel = Object.fromEntries(
                    Object.entries(row).map( i => 
                        [i[0],i[1]]
                ))
                console.log(this.formModel);
                },
                del(index){
                    this.tableTata.splice(index,1)
                    
                }
            }
        }
    </script>