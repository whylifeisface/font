<template>
    <div>

        <son-index @show="sho" mes="添加">
            <el-button @click="$router.push('/fi')">资源分类</el-button>
        </son-index>
        <el-table :data="tableData" :key="bol"> 
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="资源名称"></el-table-column>
            <el-table-column prop="url" label="资源路径"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="createTime" label="添加时间"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button text type="primary" @click="edit(scope.row)">编辑</el-button>
                    <el-button text type="primary" @click="del(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog v-model="visible" @close="model = {} as M">
        <el-form :model="model" ref="modelRef" :rules="modelRules">
            <el-form-item label="资源名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="资源路径">
                <el-input v-model="model.url"></el-input>
            </el-form-item>
            <el-form-item label="资源分类">
                <el-select v-model="model.cate" placeholder="全部">
                    <el-option v-for="(m,index) in opt" :key="index" :value="m" :label="m"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="model.description" type="textarea" ></el-input>
            </el-form-item>
        </el-form>
        <div class="a">
            <div class="b">
        <el-button text @click="visible = false">取消</el-button>
        <el-button text type="primary" @click="en">确定</el-button>
            </div>
        </div>

    </el-dialog>

</template>

<script setup lang="ts">import { onMounted, reactive, ref } from 'vue';
import sonIndex  from "@/components/son/sonIndex.vue";
import { GetReq, PostReq } from '../axios/axios';
import { FormInstance, FormRules } from 'element-plus';
interface  O {
    id:number
    name:string
    url:string
    description:string
    createTime:Date
    cate:{
        name:string
    }
}
// id name url description createTime
interface M{
    id:number
    name:string
    url:string
    description:string
    cate:{
        name:string
    }
    
}
const modelRules = reactive<FormRules>({
    name:{required:true,message:"name不能为空",trigger:"change"},
    url:{required:true,message:"name不能为空",trigger:"change"},
    // description:{required:true,message:"name不能为空",trigger:"change"},
    // cate.name:{required:true,message:"name不能为空",trigger:"change"},
})
onMounted(() => {
    init()
})

const init = ()=>{
    tableData.length = 0
    GetReq('api/UmsResourceController/init?num=1&size=5').then(data => {
        if (data.code == 200) {
            for (let index = 0; index < data.data.list.length; index++) {
                        tableData.push(data.data.list[index])
            }
        }
    })
}




const opt = ref(['商品模块','订单模块','营销模块','权限模块','内容模块','其他模块'])
const bol = ref(false)
const tableData = reactive([{} as O])

const visible = ref(false)

const model = reactive({} as M)
const edit = (row:any) => {
    visible.value = true
      model.name = row.name 
      model.url= row.url    
      model.description =row.description
     model.cate = row.cate 

}
const del = (index:number)=> {
    tableData.splice(index,1)

}
const en = (formE:FormInstance | undefined) => {
    if(model.id == undefined){
        formE?.validate(vaild => {
            if (vaild) {
                let json = JSON.stringify(model)
                PostReq('api/UmsResourceController/create',json).then(data =>{
                    if (data.code == 200) {
                        console.log();
                    }
                })
            }

        })
    }
    else{
        let json = JSON.stringify(model)
                PostReq('api/UmsResourceController/update',json).then(data =>{
                    if (data.code == 200) {
                        console.log();
                    }
                })
    }

}

const sho = () => {
    visible.value = true
}
</script>

<style scoped>

</style>