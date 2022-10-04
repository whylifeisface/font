<template>
    <el-form :model="reactiveRule" ref="ruleForm" :rule="rule">
        <el-form-item label="分类名称" prop="name">
            <el-input v-model="reactiveRule.name"></el-input>
        </el-form-item>

        <el-form-item prop="parentId" label="上级分类">
            <el-select v-model="reactiveRule.parentId" placeholder="无上级分类" @visible-change="show">
                <el-option v-for="(a,index) in opt" :key="index" :label="a">{{a}}</el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="数量单位" prop="productCount">
            <el-input v-model="reactiveRule.productCount"></el-input>
        </el-form-item>

        <el-form-item label="是否显示" prop="showStatus">
            {{reactiveRule.showStatus}}
            <div class="my-2 flex items-center text-sm">
                <el-radio-group v-model="reactiveRule.showStatus" class="ml-4">
                    <el-radio :label="0" size="large">是</el-radio>
                    <el-radio :label="1" size="large">否</el-radio>
                </el-radio-group>
            </div>
        </el-form-item>

        <el-form-item label="是否显示在导航栏" prop="navStatus">
            <el-radio-group v-model="reactiveRule.navStatus">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="分类图标">
            <el-upload v-model:file-list="fileList" class="upload-demo" @http-request="httprequest">
                <el-button type="primary">Click to upload</el-button>
                <template #tip>
                    <div class="el-upload__tip">
                        只能上传jpg/png文件,且不超过10MB
                    </div>
                </template>
            </el-upload>
        </el-form-item>

        <el-form-item label="筛选属性">
            <!-- {{l}} -->
            <div v-for="(l,index) in list" :key="index">
                <el-cascader @visible-change="vc" :options="options" v-model="valu" clearable>
                </el-cascader>
                <el-button @click="list.splice(index,1)">删除</el-button>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button @click="list.push('1')" type="primary">新增</el-button>
        </el-form-item>


        <el-form-item label="关键词" prop="keywords">
            <el-input v-model="reactiveRule.keywords"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" prop="description">
            <el-input v-model="reactiveRule.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="subFor(ruleForm)">提交</el-button>
            <el-button @click="res(ruleForm)">重置</el-button>
        </el-form-item>
    </el-form>

    <!-- cate  aboutcate num is key des aboutcate icon isnav-->
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { GetReq, PostReq } from '@/components/axios/axios'
import { FormRules, FormInstance } from 'element-plus';
import {useStore} from 'vuex'
import {store} from '@/components/vuex/vuex'
import { B } from "@/components/interface/pmsinterface";



const stor = useStore()||store
let valu = ref('')
const ruleForm = ref<FormInstance>()
let rule = reactive<FormRules>({
    name: [{
        required: true, message: 'name', trigger: 'blur'
    }, {
        min: 3, message: 'name3', trigger: 'change'
    }],
    level: [{
        required: true, message: 'level', trigger: 'change'
    }],
    productCount: [{
        required: true, message: 'productCount', trigger: 'change'
    }],
    navStatus: [{
        required: true, message: 'navStatus', trigger: 'change'
    }],

    showStatus: [{
        required: true, message: 'showStatus', trigger: 'change'
    }],
    sort: [{
        required: true, message: 'sort', trigger: 'blur'
    }],

    keywords: [{
        required: true, message: 'keywords', trigger: 'blur'
    }],
})

let reactiveRule = reactive({
    // parentId: 0,id: 0, name: '', level: 0 productCount: 0,
    // productUnit: '', navStatus: '',showStatus: 0,sort: 0, icon: '',  keywords: '', description: '', index:''

} as B)
const opt = ref([] as any)

const options = ref([] as any)
const fileList = ref([] as any)
const list = ref([1] as any)
onMounted(() => {
    edParm()
})

const edParm = () => {
    const route = useRoute()
    let id = route.query.id 
    console.log(id);
    let index = route.query.index + ''
    if (null != id) {
        GetReq('/api/PmsProductCategoryController/byId/' + id + '').then(data => {
            if (data.code == 200) {
                reactiveRule.index = index 
                reactiveRule.name = data.data.name
                reactiveRule.parentId = data.data.parentId
                reactiveRule.level = data.data.level
                reactiveRule.id = data.data.id
                reactiveRule.productCount = data.data.productCount
                reactiveRule.navStatus = data.data.navStatus
                reactiveRule.productUnit = data.data.productUnit
                reactiveRule.showStatus = data.data.showStatus
                reactiveRule.sort = data.data.sort
                reactiveRule.icon = data.data.icon
                reactiveRule.description = data.data.description
                reactiveRule.keywords = data.data.keywords
            }
            console.log(reactiveRule);
            console.log(reactiveRule.name);
        })
    }
}
const vc = () => {
    if (options.value.length == 0) {
        GetReq('/api/PmsProductAttributeCategoryController/sql').then(data => {
            if (data.code == 200) {
                console.log(data.data);
                for (let index = 0; index < data.data.length; index++) {
                    let { name: value, name: label, pmsProductCategory: childrens } = data.data[index]
                    console.log(value);

                    let children = childrens.map((element: { name: any; }) => {
                        return {
                            label: element.name,
                            value: element.name
                        }
                    });
                    let s = {
                        value, label, children
                    }
                    console.log(s);
                    options.value.push(s)
                }
                console.log(options);
            }
        })
    }
}
const res = (ruleForm: FormInstance | undefined) => {
    if (!ruleForm) {
        return;
    }
    ruleForm.resetFields()
}

//    const sw = ()=>{
//     if (za.value.length == 0 ) {
// GetReq('api/PmsProductAttributeCategoryController/list').then(function (data) {
//     if (data.code == 200) {
//         console.log(data.data);
//         for (let i = 0; i < data.data.length; i++) {
//             za.value.push(data.data[i].name)
//         }
//     }
// })
// }
// }
const show = (B: any) => {
    if (0 == opt.value.length && B == true) {
        GetReq('/api/PmsProductAttributeCategoryController/list').then(data => {

            if (data.code == 200) {
                console.log(data.data);
                for (let index = 0; index < data.data.length; index++) {
                    opt.value.push(data.data[index].name)

                }
            }
        })
    }

}
const httprequest = (option: any) => {
    fileList.value.push(option);
}
const subFor = async (Form: FormInstance | undefined) => {
    if (!Form) return
    await Form.validate((valid: any, field: any) => {
        if (valid) {


            stor.commit('xiugai',reactiveRule)
            PostReq('/api/PmsProductCategoryController/',JSON.stringify(reactiveRule)).then(data =>{
                if(data.code == 200){
                    console.log();
                    
                }
            })
            console.log("---");
            console.log(valid);
        } else {
            console.log("error");
            console.log(field)
        }
    })

}
</script>

