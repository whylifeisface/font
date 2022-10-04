<template>
    <el-card >
       <header>
        <div class="a">
        <div>
            <el-icon><Search></Search></el-icon>
            <span>数据列表</span>
            
        </div>
        <div class="b">
            <el-button @click="add" type="primary"> 添加</el-button>
        </div>
       </div>
       </header>
    </el-card>

    <el-table :data="tableData">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="类型"></el-table-column>
        <el-table-column prop="attributeCount" label="属性数量"></el-table-column>
        <el-table-column prop="paramCount" label="参数数量"></el-table-column>
        <el-table-column label="设置">
            <template #default="scope">
                <el-button @click="attri(scope.$index)">属性列表</el-button>
                <el-button @click="cate(scope.row.name)"> 参数列表</el-button>
                
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button @click="java(scope.row)" >编辑</el-button>
                <el-button @click="js(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table> 
    <el-pagination layout="prev next " background></el-pagination>
    <el-dialog v-model="visible">
        <head>
            编辑类型
        </head>
        <el-form :rules="rule" ref="formRef">
            <el-form-item prop="" label="">
                <el-input v-model="a"></el-input>
            </el-form-item>
            
        </el-form>
        <el-button @click="submitForm(formRef)" type="primary">确定</el-button>
        <el-button @click="visible = !visible">取消</el-button>
    </el-dialog>
    <el-dialog v-model="visibilty">
        <head>提示</head>
        是否要删除该品牌
        <el-button @click="queding">确定</el-button>
        <el-button @click="visibilty = !visibilty">取消</el-button>

    </el-dialog>
</template>
<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { reactive,onMounted,ref } from 'vue'
import { useRouter } from 'vue-router';
import { GetReq } from '../axios/axios';
interface O {
    id:number,
    name:string,
    attributeCount:number,
    paramCount:number
}
let m = ref(0)
let a = ref('')
let visible = ref(false)
let visibilty = ref(false)
let router = useRouter()

let tableData = reactive([{} as O] )
const rule = reactive<FormRules>({
    name:[{
        required:true,message:'类型不能为空',trigger:'change'
    }]
})
const queding = (id:number) => {
    GetReq('api/PmsProductAttributeController/delete?id='+ id).then(data => {
        if(data.code ==200){
            console.log(data);
            
        }
    })
}
const js = (id:number)=>{
    m.value = id
    visibilty.value = true
}

const java = (row:any) => {
    visible.value = true
    a = row.name
}
const formRef = ref<FormInstance>()
onMounted(() => {
    init()
})
const init = ()=> {
    console.log(tableData);
    tableData.length = 0
    GetReq('api/PmsProductAttributeCategoryController/list').then(data => {
        if (data.code == 200) {
            for (let index = 0; index < data.data.length; index++) {
                tableData.push(data.data[index])
            }
        }
    })
}
const add = () => {
  router.push('/wtoForm')
}
const cate = (name:string)=>{
    console.log(name);
    router.push({path:'/FourTable',query:{name:name}})
    
}
const attri = (id:number) => {
    // let NAME = tableData[id].name
    router.push('/wtoattr/'+id+'/'+tableData[id].name)
}

const submitForm = (formE: FormInstance | undefined) => {
    if(!formE)return
}
</script>