<template>
            <el-form :model="model" ref="formRef" :rules="rule">
            <el-form-item label="菜单名称">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单">
                <el-select v-model="model.level" placeholder="无上级菜单">
                    <el-option v-for="(index,i) in option" :key="index" :label="i" :value="i"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="前端名称">
                <el-input v-model="model.name" ></el-input>
            </el-form-item>
            <el-form-item label="前端图片">
                <el-input v-model="model.icon"></el-input> 
            </el-form-item>
            <el-form-item label="是否显示">
                <el-radio-group v-model="model.hidden">
                    <el-radio :label="0">是</el-radio>
                    <el-radio :label="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序">
                <el-input v-model="model.sort" ></el-input>
            </el-form-item>
        </el-form>
        <el-button @click="sub(formRef)" type="primary" />
</template>
<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive, ref } from 'vue'
// <!-- // id title level name icon hidden sort -->
import {useRoute} from 'vue-router'
interface M {
    id:number
    title:string
    level:number
    name:string
    icon:string
    hidden:number
    sort:number
}

let route = useRoute()
onMounted(() => {
    init()
})

const init = () =>{
    let j =JSON.parse(decodeURIComponent(route.query.data + ''))
    if(!j) return
    model.id = j.id
    model.title = j.title
    model.level = j.level
    model.name = j.name
    model.icon = j.icon
    model.hidden = j.hidden
    model.sort = j.sort

}

const formRef = ref<FormInstance>()

const option = ['商品','订单','营销','权限']

const model = reactive({} as M)

const rule = reactive<FormRules>({
})

const sub = (FormE: FormInstance | undefined) => {
    if(!FormE)return    
}
</script>