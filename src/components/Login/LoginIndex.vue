<template>
    <el-card >
        <el-form ref="formRef" :model="formModel" :rule="rules">
            <el-form-item label="用戶名" class="w-50 m-2" prop="username">
                <el-input v-model="formModel.username"></el-input>
            </el-form-item>
            <el-form-item label="密碼" prop="password">
                <el-input v-model="formModel.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox true-label="on" v-model="formModel.rememberMe" label="记住我" size="large" name="remember" />
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="sub(formRef)"> 提交</el-button>
    </el-card>
</template>
<script lang="ts" setup>
import { FormInstance, FormRules } from 'element-plus';
import {  reactive, ref } from 'vue'
import {  PostReq } from '../axios/axios';
interface O {
    username: string,
    password: string,
    rememberMe:string
}
let formModel = reactive({
    username:'',
    password:'',
    rememberMe:''
} as O)
let formRef = ref<FormInstance>()
let rules = reactive<FormRules>({
    username: [{ required: true, message: '請輸入用戶名', trigger: 'change' }],
    password: [{ required: true, message: '請輸入用戶名', trigger: 'change' }]
})

const sub = (FormE: FormInstance | undefined) => {
    if (!FormE) return
    console.log(formModel.rememberMe);
    let form =  new FormData();
    // let username:string;
    form.append('username',formModel.username)
    form.append('password',formModel.password)
    formModel.rememberMe ? form.append('rememberMe',formModel.rememberMe): ''
    FormE.validate((vaild, field) => {
        if (vaild) {
            PostReq('api/in',form).then(data => {
                if (data.code == 200) {
                    console.log(data);
                    
                }
            })
            return
        }
        console.log(field);
    })
}

</script>