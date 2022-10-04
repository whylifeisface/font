<template>
    <div class="sssss">
        <el-form :model="formModel" ref="formRef" :rules="rules">
            <el-form-item prop="name" label="属性名称">
                <el-input v-model="formModel.name" ></el-input>
            </el-form-item>
            <el-form-item prop="" label="商品类型">
                <el-select v-model="formModel.value" placeholder="请选择">
                    <el-option v-for=" (o,index) in option" :key="index" :label="o" :value="o"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="filterType" label="分类筛选样式">
                <el-radio-group v-model="formModel.filterType">
                    <el-radio :label="0">不需要检索</el-radio>
                    <el-radio :label="1">关键字检索</el-radio>
                    <el-radio :label="2">范围检索</el-radio>

                </el-radio-group>
            </el-form-item>
            <el-form-item prop="searchType" label="能否进行检索">
                <el-radio-group v-model="formModel.searchType">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="relatedStatus" label="商品属性关联">
                <el-radio-group v-model="formModel.relatedStatus">
                    <el-radio :label="0">唯一</el-radio>
                    <el-radio :label="1">单选</el-radio>
                    <el-radio :label="2">复选</el-radio>

                </el-radio-group>
            </el-form-item>
            <el-form-item prop="selectType" label="属性是否可选">
                <el-radio-group v-model="formModel.selectType">
                    <el-radio :label="0">手工录入</el-radio>
                    <el-radio :label="1">从下面列表选择</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="inputList" label="属性可选值列表">
                <el-input v-model="formModel.inputList"></el-input>
            </el-form-item>
            <el-form-item prop="handAddStatus" label="是否支持手动刷新">
                <el-radio-group v-model="formModel.handAddStatus">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item prop="sort" label="排序属性">
                <el-input v-model="formModel.sort"></el-input>
            </el-form-item>
        </el-form>
        <div>
            <el-button type="primary" @click="sub(formRef)">提交</el-button>
            <el-button @click="res(formRef)">重置</el-button>

        </div>
    </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { ref, reactive, onMounted } from 'vue'
import { PostReq } from '../axios/axios';
import {useRoute} from 'vue-router'
const route = useRoute()
const formRef = ref<FormInstance>()
interface M {
    id: number
    name: string
    filterType: number
    searchType: number
    relatedStatus: number
    selectType: number
    inputList: string
    handAddStatus: number
    sort: string,
    value:string
}
let formModel = reactive({} as M)
const rules = reactive<FormRules>({
    name: { required: true, message: "name不能为空", trigger: "change" },
    filterType: { required: true, message: "filterType不能为空", trigger: "change" },
    relatedStatus: { required: true, message: "relatedStatus不能为空", trigger: "change" },
    selectType: { required: true, message: "selectType不能为空", trigger: "change" },
    inputList: { required: true, message: "inputList不能为空", trigger: "change" },
    handAddStatus: { required: true, message: "handAddStatus不能为空", trigger: "change" },
    sort: { required: true, message: "sort不能为空", trigger: "change" },

})
// name filterType searchType relatedStatus selectType inputList handAddStatus sort
const sub = (formE: FormInstance | undefined) => {
    if (!formE) return;
    // let json: any;

    if (formModel.id == undefined) {
        formE.validate(vaild => {
            if (vaild) {
               let json = JSON.stringify(formModel)
                PostReq('api/PmsProductAttributeController/insert', json).then(data => {
                    if (data.code == 200) {
                        console.log();

                    }
                })
            }
        })
    }
    else {
        let json = JSON.stringify(formModel)
        PostReq('api/PmsProductAttributeController/update', json).then(data => {
            if (data.code == 200) {
                console.log();

            }

        })
    }


    

}

const option = ['服装-T恤','服装-裤装','手机数码-手机通讯','配件','居家','洗护','测试分类','服装-鞋帽']

onMounted(() => {
  init()
})
const init = ()=>{
    //   
   let data:any = JSON.parse(decodeURIComponent(route.query.data + '' ))
   if (data == undefined)return
    console.log(data);
    
    formModel.name = data.name 
    formModel.filterType = data.filterType 
    formModel.searchType = data.searchType 
    formModel.relatedStatus = data.relatedStatus 
    formModel.selectType = data.selectType 
    formModel.inputList = data.inputList 
    formModel.handAddStatus = data.handAddStatus 
    formModel.sort = data.sort 
    formModel.value = data.PmsProductAttributeCategory.name

    // 
}

const res = (formE: FormInstance | undefined) => {
    if (!formE) return
    formE.resetFields()
}
</script>

<style scoped>

</style>