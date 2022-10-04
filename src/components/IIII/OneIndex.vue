<template>
<sonIndex mes="添加" rou="oi/of"/>
    <el-table
    :data="tableData"
    >
    <el-table-column prop="id" label="编号"></el-table-column>
    <el-table-column prop="title" label="菜单名称"></el-table-column>
    <el-table-column prop="level" label="菜单级数"></el-table-column>
    <el-table-column prop="name" label="前端名称"></el-table-column>
    <el-table-column prop="icon" label="前端图标"></el-table-column>
    <el-table-column prop="hidden" label="是否显示">
        <template #default="scope">
            <el-switch v-model="tableData[scope.$index].hidden" :active-value="0"></el-switch>
        </template>
    </el-table-column>
    <el-table-column prop="sort" label="排序"></el-table-column>
    <el-table-column label="设置">
        <template #default="scope">
            <el-button text type="primary" @click="su(scope.row.id)">查看下级</el-button>
        </template>
    </el-table-column>
    <el-table-column prop="" label="操作">
        <template #default="scope">
            <el-button text @click="edit(scope.row)" type="primary">编辑</el-button>
            <el-button text @click="del(scope.$index)" type="primary">删除</el-button>
        </template>
    </el-table-column>
    </el-table>


</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import sonIndex  from "@/components/son/sonIndex.vue";
import { GetReq } from '../axios/axios';
import {useRouter} from 'vue-router'
interface O {
    id:number
    title:string
    level:number
    name:string
    icon:string
    hidden:number
    sort:number
}

let router = useRouter()
const tableData = reactive([{} as O])
// id title level name icon hidden sort

onMounted(() => {
  init()  
})

const init = ()=>{
    tableData.length = 0
    GetReq('api/UmsMenuController/init/0').then(data => {
        if (data.code == 200) {
            for (let index = 0; index < data.data.length; index++) {
                tableData.push(data.data[index])
            }
            console.log(tableData);
            
        }
    })
}

const su = (index:number)=>{
    console.log(index);
    GetReq('api/UmsMenuController/init/'+index +'').then(data => {
        if (data.code == 200) {
            tableData.length = 0
            for (let index = 0; index < data.data.length; index++) {
                tableData.push(data.data[index])
            }
            console.log(tableData);
            
        }
    })
}



const edit = (row:any) => {
    
    let json = encodeURIComponent(JSON.stringify(row))


    router.push({path:'/ti',query:{data: json}})
}

const del = (index:number) => {
    tableData.splice(index,1)
}



</script>