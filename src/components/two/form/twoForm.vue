<template>
    <el-form :rules="rule" :model="FormModel" ref="formRef">
        <el-form-item label="类型名称" prop="name"><el-input v-model="FormModel.name"></el-input></el-form-item>
        <el-form-item label="属性数量" prop="attributeCount"><el-input v-model="FormModel.attributeCount"></el-input></el-form-item>
        <el-form-item label="参数数量" prop="paramCount"><el-input v-model="FormModel.paramCount"></el-input></el-form-item>
        <el-button @Clcik="sub(formRef)" ></el-button>
    </el-form>
</template>
<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { ref,reactive } from 'vue'
interface O {
    name:string,
    attributeCount: number,
    paramCount:number
}

const rule = reactive<FormRules>({
        name:[{
            required:true,message:'类型名称不能为空',trigger:'change'
        }],
        attributeCount:[{
            required:true,message:'类型名称不能为空',trigger:'change'
        }],
        paramCount:[{
            required:true,message:'类型名称不能为空',trigger:'change'
        }]
})
let FormModel = reactive({} as O)
const formRef = ref<FormInstance>()

const sub = (formE: FormInstance | undefined) => {
    if (!formE) return
    
}

</script>