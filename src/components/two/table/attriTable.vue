<template>
    <!-- <el-card> <el-icon></el-icon>数据列表 <el-button @Click="add">添加</el-button></el-card> -->
    <el-table :data="tableData">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="属性名称"></el-table-column>
        <el-table-column label="商品类型">{{props.NAME}}</el-table-column>
        <el-table-column prop="selectType" label="属性是否可选"></el-table-column>
        <el-table-column prop="inputType" label="属性值的录入方式"></el-table-column>
        <el-table-column prop="inputList" label="可选值列表"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="" label="操作">
            <template >
                
            </template>
        </el-table-column>
    </el-table>
    <el-pagination layout="prev next"></el-pagination>
</template>
<script setup lang="ts">

import { GetReq } from '@/components/axios/axios';
import { onMounted,reactive } from 'vue'

let props =defineProps({
    id:Number,
    NAME:String
})
interface O{
    id:number,
    name:string,
    sort:number,
    selectType:string,
    inputType:string,
}

let tableData = reactive([{} as O])
onMounted(()=> {
    init()
})
const init = () => {
    GetReq('api/PmsProductAttributeController/attri/'+ props.id +'').then(data => {
        if (data.code == 200) {
            console.log(data.data);
            
            for (let index = 0; index < data.data.length; index++) {
                tableData.push(data.data[index])
            }
        }
    })
}
</script>