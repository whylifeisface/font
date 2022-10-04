<template>
    <el-form :model="formModel" ref="fromRef" :rules="rule">
        <el-form-item label="广告名称">
            <el-input v-model="formModel.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="广告位置">
            <el-select>
                <el-option v-for="(o,index) in option" :key="index" :label="o" :value="o"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
            <el-time-picker v-model="formModel.startTime" type="date" placeholder="选择日期"></el-time-picker>
        </el-form-item>
        <el-form-item label="到期时间">
            <el-time-picker v-model="formModel.endTime" type="date" placeholder="选择日期"></el-time-picker>

        </el-form-item>
        <el-form-item label="上线/下线">
            <el-radio-group v-model="formModel.status">
                <el-radio :label="0">下线</el-radio>
                <el-radio :label="1">上线</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="广告图片">
            <el-upload></el-upload>
        </el-form-item>
        <el-form-item label="排序">
            <el-input v-model="formModel.sort" ></el-input>
        </el-form-item>
        <el-form-item label="广告链接">
            <el-input v-model="formModel.url"></el-input>
        </el-form-item>
        <el-form-item label="广告备注">
            <el-input v-model="formModel.note" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="sub(fromRef)">提交</el-button>
    <el-button @click="res(fromRef)">重置</el-button>
</template>
<script setup lang="ts">
    import { FormInstance, FormRules } from 'element-plus';
import { ref,reactive, onMounted } from 'vue'
import {useRoute} from 'vue-router'
// import { PostReq } from '../axios/axios';
interface O {
    id:number,
    name:string,
    type:number,
    endTime:Date,
    note:string,
    sort:number,
    url:string,
    startTime:Date
    status:number
}

    const fromRef = ref<FormInstance>()
    let formModel = reactive({} as O)
    const rule = reactive<FormRules>({
    })
    const option = ref(['APP首页轮播','PC首页轮播'])

    onMounted(() => {
        init()
    })
    const init = ()=> {
       let router = useRoute()
       let rou = router.query.Form
       if(rou == undefined || rou == null) return
       
       let MM = JSON.parse(decodeURIComponent(rou + '')) as O   
       console.log(MM);
       
        formModel.id = MM.id
        formModel.name = MM.name
        formModel.type = MM.type
        formModel.endTime = MM.endTime
        formModel.sort = MM.sort
        formModel.url = MM.url
        formModel.startTime = MM.startTime
        formModel.status = MM.status    
}
const sub = (formE: FormInstance | undefined)=> {
    if(!formE) return
    formE.validate((vaild,filde)=> {
        if (vaild) {
            // PostReq()
            console.log();
            
        }
        else{
            console.log(filde);
            
        }
    })
}
const res = (formE:FormInstance | undefined) => {
    if(!formE) return
    formE.resetFields;
    
}
</script>