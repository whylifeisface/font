<template>
    <div class="sssss">
        <el-form :model="formModel" ref="formRef" :rules="formRules">
            <el-form-item label="菜单名称" prop="title">
                <el-input v-model="formModel.title"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单" prop="level">
                <el-select v-model="formModel.level" placeholder="请选择">
                    <el-option v-for="(o,index) in list" :key="index" :label="o" :value="o"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="前端名称">
                <el-input v-model="formModel.name" prop="name"></el-input>
            </el-form-item>
            <el-form-item label="前端图标">
                <el-input v-model="formModel.icon"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="hidden">
                <el-radio-group v-model="formModel.hidden">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model="formModel.sort"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="sub(formRef)">提交</el-button>
        <el-button @click="res(formRef)">重置</el-button>

</div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { ref,reactive } from 'vue'
import { PostReq } from '../axios/axios';
const formRef = ref<FormInstance>()
interface M{
    title:string
    level:number
    name:string
    icon:string
    hidden:number
    sort:number
}
let formModel = reactive({} as M)
let formRules = reactive<FormRules>({
    title:{required:true,message:"title不能为空",trigger:"change"},
    level:{required:true,message:"title不能为空",trigger:"change"},
    name:{required:true,message:"title不能为空",trigger:"change"},
    hidden:{required:true,message:"title不能为空",trigger:"change"},
    sort:{required:true,message:"title不能为空",trigger:"change"},
})

const res = (formE:FormInstance |undefined)=>{
    if(!formE)return
    formE.resetFields()

}
const list = ref(['商品','订单','营销','权限','无上级'])
const sub = (formE:FormInstance|undefined)=>{
if (!formE) return
formE.validate(vaild => {
        if (vaild) {
            let json = JSON.stringify(formModel)
            PostReq('api/UmsMenuController/create',json).then(data =>{
                if (data.code) {
                console.log();
                }
            })
        }
    })
}
</script>

<style scoped>

</style>