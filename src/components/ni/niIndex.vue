<template>
    <div style="width: 100%;">
        <el-card>
            <el-form-item>  
                <el-icon><Search /></el-icon>
                <span>筛选搜索</span>
                    <div style="margin-left: auto;">
                        <el-button @click="resBtn">重置</el-button>
                        <el-button type="primary" @click="searchBtn">查询搜索</el-button>
                    </div>
            </el-form-item>
            <el-form>
                <el-form-item label="活动名称" class="sssss">
                    <el-input v-model="formInput" placeholder="活动名称"></el-input>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>
            <header>
                <el-form-item>  
                    <el-icon></el-icon> <span>数据列表</span>
                        
                        <div style="margin-left: auto;">
                            <el-button @click=" this.$router.push('/nitable')" class="sssss">秒杀时间段1</el-button>
                            <el-button @click="add" type="primary">添加活动</el-button>
                        </div>

                </el-form-item>
            </header>
        </el-card>

        <el-table :data="tableData"
        :key="bol">
            <!-- status               start_date                        end_date             title                 -->
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="title" label="活动标题"></el-table-column>
            <el-table-column label="活动状态">{{tableData.status==0? "活动未开始":"进行中"}}</el-table-column>
            <el-table-column prop="startDate" label="开始时间"></el-table-column>
            <el-table-column prop="endDate" label="结束时间"></el-table-column>
            <el-table-column  label="上线/下线"> 
                <template #default="scope"> 
                <el-switch :active-value="1" v-model="scope.row.status"></el-switch>    
                </template>
            </el-table-column>
            <el-table-column label="操作">
                    <template #default="scope"> 
                        {{scope.row}}

                        <el-button type="primary" @click="this.$router.push('/nitwotable')" text >设置商品</el-button>
                        <el-button type="primary" @click="edit(scope.row)" text>编辑</el-button>
                        <el-button type="primary" @click="del(scope.$index)" text >删除</el-button>
                    </template>
            </el-table-column>
        </el-table>

        <el-pagination  layout="prev, pager, next" :total="total" />
        <el-dialog v-model="visible" @close="formModel = {}">
            <el-form :model="formModel">
                <el-form-item label="活动标题"><el-input v-model="formModel.title"></el-input></el-form-item>
                <el-form-item label="开始时间"><el-time-picker type="date" v-model="formModel.createTime"></el-time-picker></el-form-item>
                <el-form-item label="结束时间"><el-time-picker type="date" v-model="formModel.endTime"></el-time-picker></el-form-item>
                <el-form-item label="上线/下线">
                    <el-radio-group v-model="formModel.status">
                        <el-radio :label="0">上线</el-radio>
                        <el-radio :label="1">下线</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item >
                    <div style="margin-left: auto;">
                        <el-button @click="visible = false">取消</el-button>
                        <el-button @click="ensure">确定</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
    <script>
            import {GetReq} from '@/components/axios/axios'
import { twoObject } from '../utils/twoObject'
        export default{
            data(){
                return{
                    formInput:'',
                    tableData:[],
                    total:'',
                    formModel:{},
                    visible:false,
                    bol:0
                }
            },
            created () {
                this.init()
            },
            methods: {
                edit(row){
                    this.visible = true
                    this.formModel =  twoObject(row,this.formModel)
                },
                ess(){

                },
                add(){
                    this.visible = true
                },
                ensure(){
                    this.visible = false
                    this.tableData[this.formModel.id] =
                    twoObject(this.formModel,this.tableData[this.formModel.id])
                    console.log(this.tableData[this.formModel.id]);
                    // GetReq()
                    this.bol = Math.random()
                },
                init(){
                    GetReq('api/SmsFlashPromotionController/init?num=1&size=5').then(data => {
                        if (data.code == 200) {
                            for (let index = 0; index < data.data.list.length; index++) {
                                this.tableData.push(data.data.list[index])                                
                            }
                            this.total = data.data.total    
                            console.log(this.total);
                        }


                    })
                },
                resBtn(){
                    this.formInput = ''
                },
                
                searchBtn(){

                },
                del(index){
                    this.tableData.splice(index,1)
                }
            }
        }
    </script>