<template>
    <sonIndex mes="添加" @show="sho"></sonIndex>

    <twoSonIndex>
        <el-form :model="formModel">
            <el-form-item label="输入搜索">
                <el-input v-model="formModel.username" placeholder="账号/姓名"></el-input>
            </el-form-item>
        </el-form>
    </twoSonIndex>

    <el-table :data="dataTable">
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="账号" prop="username"></el-table-column>
        <el-table-column label="姓名" prop="nickName"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="添加时间" prop="createTime"></el-table-column>
        <el-table-column label="最后登录" prop="loginTime"></el-table-column>
        <el-table-column label="是否启用" prop="status">
            <template #default="scope">
                <el-switch v-model="dataTable[scope.$index].status" :active-value="0"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button @click="add(scope.row.id)" text type="primary">分配账号</el-button>
                <el-button @click="edit(scope.row,scope.$index)" text type="primary">编辑</el-button>
                <el-button @click="del(scope.$index)" text type="priamry">删除</el-button>

            </template>
        </el-table-column>
    </el-table>
    <el-pagiation layout="prev,pager,next" :total="tatal"></el-pagiation>



    <el-dialog v-model="visible" @close="model= {} as M">
        <el-form :model="model" ref="modelRef" :rules="modelrule">
            <el-form-item label="账号">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="model.nickName"> </el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="model.email"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="model.password" type="password"> </el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="model.note" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-radio-group v-model="model.status">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        
        <div class="a">
            <div class="b">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="sub2(modelRef)">确定</el-button>
            </div>
        </div>
    </el-dialog>

    <el-dialog v-model="visibility" @close="sel = []">
        <span>
                分配角色
            </span>
        <div class="a">
            <div>
                    <el-select multiple v-model="sel" placeholder="请选择" size="large">
                    <el-option v-for="(ss,index) in op" :key="index" :label="ss" :value="ss"></el-option>
                    <el-input type="hidden" v-model="id"/>
                </el-select>


            </div>
        </div>

        <div class="a">
            <div class="b">
                <el-button @click="visibility = false">取消</el-button>
                <el-button type="primary" @click="subs">确定</el-button>
            </div>
        </div>
    </el-dialog>

</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { GetReq, PostReq } from '../axios/axios';
import sonIndex from "@/components/son/sonIndex.vue";
import twoSonIndex from "@/components/son/twoSonIndex.vue";
import { FormInstance, FormRules } from 'element-plus';

interface O {
    id: number
    index: number
    username: string
    nickName: string
    email: string
    createTime: Date
    LoginTime: Date
    status: number
}

let dataTable = reactive([{} as O])
let model = reactive({} as M)
onMounted(() => {
    init()
})
let id = ref(0)
const add = (index: number) => {
    console.log(index);
    visibility.value = true
    id.value = index
}
interface M {
    index: number
    id: number
    username: string
    nickName: string
    email: string
    note: string
    password: string
    status: number
}
let modelRef = ref<FormInstance>()
const modelrule = reactive<FormRules>({
    username:{required:true,message:"账号不能为空",trigger:'change'},
    nickName:{required:true,message:"姓名不能为空",trigger:''},
    email:{required:true,message:"邮箱不能为空",trigger:''},
    password:{required:true,message:"密码不能为空",trigger:''},
    // note:{required:true,message:"备注不能为空",trigger:''},
    status:{required:true,message:"不能为空",trigger:''},
    
})

const op = ref(['商品管理员', '订单管理员', '超级管理员'])
let visible = ref(false)
let visibility = ref(false)
let sel = ref([])
let tatal = ref(0);
const init = () => {
    dataTable.length = 0
    GetReq('api/UmsAdminController/init?num=1&size=5').then((data: any) => {
        if (data.code == 200) {
            for (let index = 0; index < data.data.list.length; index++) {
                dataTable.push(data.data.list[index])
            }
            tatal = data.data.total
        }
    })
}
let formModel = ref({
    username: ''
})
const edit = (row: any, index: number) => {
    visible.value = true
    model.index = index
    model.username = row.username

    // model.note = row.note
    model.email = row.email
    model.status = row.status
    model.nickName = row.nickName
    model.password = row.password
    model.status = row.status
    console.log(model);

}
const del = (index: number) => {
    dataTable.splice(index, 1)
    // PostReq()
}
const subs = ()=>{
    visibility.value = true
    console.log([sel.value.join(',')]);
    console.log("-----------");
    if(sel.value == [''])return
    console.log(sel.value);
    
    let json = JSON.stringify({

            "adminId":id.value,
            "umsRole":{
                "name":sel.value+''
            }
            
    })
    console.log(json);
    
    PostReq('api/UmsAdminRoleRelationController/insert',json).then((data:any) => {
        if (data.code == 200) {
            console.log("add success");
        }
    })
}

const sho = () => {
    visible.value = true
}

const sub2 = (formE:FormInstance | undefined)=>{
if(!formE){
visible.value =false     
    return;
}
formE.validate(valid => {
    if (valid) {
        let json = JSON.stringify(model)
        PostReq('api/UmsAdminController/create',json).then(data => {
        if(data.code == 200){
            console.log();
        }
})

    }
})

}
</script>