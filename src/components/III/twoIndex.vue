<template>

<sonIndex mes="添加" @show="sho"></sonIndex>

<twoSonIndex @sear="sear">
    <el-form :model="formModel">
        <el-form-item label="输入搜索">
            <el-input v-model="formModel.username" placeholder="角色名称"></el-input>
        </el-form-item>
    </el-form>
</twoSonIndex>  
<el-table :data="dataTable">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="username" label="角色名称"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="adminCount" label="用户数"></el-table-column>
        <el-table-column prop="createTime" label="添加时间"></el-table-column>
        <el-table-column prop="status" label="是否启用"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button text type="primary" @click="pei(scope.row.id)">分配菜单</el-button>
                <el-button text type="primary" @click="ss(scope.row.id)">分配资源</el-button>
                <el-button text type="primary" @click="edit(scope.row)">编辑</el-button>
                <el-button text type="primary" @click="del(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>


<el-dialog
v-model="visible"
@close="model = {} as S"
>
<el-form :model="model" ref="modelRef" :rules="modelRule">
    <el-form-item label="角色名称">
        <el-input v-model="model.username"></el-input>
    </el-form-item>
    <el-form-item label="描述">
        <el-input type="textarea" v-model="model.description"></el-input>
    </el-form-item>
    <el-form-item label="是否启用">
        <el-radio-group>
            <el-radio>是</el-radio>
            <el-radio>否</el-radio>
        </el-radio-group>
    </el-form-item>
</el-form>
<div class="a">
<div class="b">
     <el-button @click="visible=false">取消</el-button>
     <el-button type="primary" @click="sub1(modelRef)">确定</el-button>

</div>
</div>
</el-dialog>

</template>
<script setup lang="ts">
import { reactive,onMounted,ref } from 'vue'
// import { GetReq } from '../axios/axios';
import twoSonIndex from '@/components/son/twoSonIndex.vue'
import sonIndex from '@/components/son/sonIndex.vue'
import {useRouter} from 'vue-router'
import { GetReq, PostReq } from '../axios/axios';
import { FormInstance, FormRules } from 'element-plus';
interface P {
    id:number
    username:string
    description:string
    adminCount:number
    createTime:Date
    status:number
}

let dataTable = reactive([{} as P])
onMounted(()=>{
    init()
})
let formModel = reactive({username:''})
const init = ()=> {
    dataTable.length = 0
    GetReq('api/umsRoleController/init?num=1&size=5').then(data => {
        if (data.code == 200) {
            for (let index = 0; index < data.data.list.length; index++) {
                dataTable.push(data.data.list[index])
            }
        }
    })
}
const modelRef = ref<FormInstance>()

let router = useRouter()

const ss = (id:number) => {
    router.push('/twoiiIndex/'+id+'')
}
const pei = (id:number) =>{
    router.push('/oneiiIndex/'+id)
}

let visible = ref(false)
interface S{
    username:string
    description:string
    status:number
}
const model = reactive({} as S)
const modelRule = reactive<FormRules>({
    username:{required:true,message:"用户名不能为空",trigger:"change"},
    // description:{required:true,message:"用户名不能为空",trigger:"change"},
    status:{required:true,message:"要填",trigger:"change"}
})

const edit = (row:any) =>{
    visible.value = true
     model.username = row.username
     model.description = row.description
}

const del = (index:number) => {
    dataTable.splice(index,1)
    // PostReq()
}

const sear = () => {
    let json
if (formModel == {username:''}) {
    json = undefined
}
 json = JSON.stringify(formModel)

    PostReq('api/umsRoleController/get',json ).then(data => {
        if (data.code == 200) {
            for (let index = 0; index < data.data.length; index++) {
                dataTable.push(data.data[index])
            }
        }
    })
}
const sho = ()=>{
    visible.value = true
}

const sub1 = (formE : FormInstance|undefined)=>{
if(!formE){
    visible.value = false
    return
}
formE.validate(vlid => {
    if (vlid) {
        let json = JSON.stringify(model);
        PostReq('api/umsRoleController/create',json).then(data => {
            if (data.code == 200) {
                console.log();
            }
        })
    }
})

}
</script>