<template>
    <el-table :data="theData" >
        <!-- 编号 类型 属性数量 参数数量 设置 操作 -->
        <!-- 属性列表 参数列表 编辑 删除 -->
        <el-table-column prop="id" lable="编号"></el-table-column>
        <el-table-column prop="name" lable="类型名称"></el-table-column>
        <el-table-column prop="attributeCount" lable="属性数量"></el-table-column>
<!-- four -->
        <el-table-column prop="paramCount" lable="参数数量"></el-table-column>
        <el-table-column  lable="设置">
            <template #default="scope">
            <el-button @click="list(scope.row)">属性列表</el-button>
            <el-button @click="tisl(scope.$index)">参数列表</el-button>
            </template>
        </el-table-column>
        <el-table-column lable="操作">
            <template #default="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
                <el-dialog v-model="diaVisible">
                    <el-card>
                        <template #header>编辑类型</template>
                        <label for="类型名称">
                            <el-input v-model="diaInp"/>
                        </label>
                        <el-button @click="diaBtbFal">取消</el-button>
                        <el-button type="primary" @click="diaBtn"></el-button>
                    </el-card>
                </el-dialog>

            <el-button @click="del(scope.$index)">删除</el-button>
                
            </template>
        </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="total"  
    @current-change="pageChange(nowpage)"
    v-model:currentpage="nowpage"/>
    
</template>
<script >
import { ElMessage } from 'element-plus';
import { GetReq } from '../axios/axios';


    export default{
        data () {
            return {
                theData:[],
                diaVisible:false,
                diaInp:'',
                total:'',
                nowpage:''
            }
        },created() {
            
        },methods: {
            diaBtbFal(){
                this.diaVisible = false 
            },
            diaBtn(){
                // if(this.diaInp != ){

                // }
                GetReq('').then(function (data) {
                    if (200 == data.code) {
                        console.log();
                    }
                })

                this.diaBtbFal()
            },

            edit(row){
                this.diaInp = row.name
            },list(row){
                
                GetReq('api/PmsProductAttributeCategoryController/by/'+row.id+'').then(function (data) {
                    if (200 == data.code) {
                        console.log();
                    }
                })
            },
            del(index){
                GetReq('api/PmsProductAttributeCategoryController/delete/'+index+'').then(function (data) {
                    if (200 == data.code) {
                        console.log();
                        ElMessage.success({message:'del--sucess'})
                    }
                })
            }
            ,Load(){
                GetReq('api/PmsProductAttributeCategoryController/pageChange?size=10&num'+this.nowpage+'').then(function (data) {
                    if (200 == data.code) {
                        console.log();
                        for (let index = 0; index < data.data.length; index++) {
                                this.theData.push(data.data[index])                            
                        }

                    }
                }),
                GetReq('api/PmsProductAttributeCategoryController/count').then(function (data) {
                    if (200 == data.code) {
                        this.total = data.data
                    }
                    
                })
            },
            pageChange(newpage){
                GetReq('api/PmsProductAttributeCategoryController/pageChange?size=10&num'+newpage+'').then(function (data) {
                    if (200 == data.code) {
                        this.theData.length = 0
                        for (let index = 0; index < data.data.length; index++) {
                                this.theData.push(data.data[index])                            
                        }
                    }
                })
            }
        },
    }
</script>