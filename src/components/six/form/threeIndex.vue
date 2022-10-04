<template>
    <el-form :model="z">
        <el-form-item prop="name" label="属性类型" >
            <el-select v-model="z.name" @visible-change="visibleChange">
                <el-option v-for="(item,index) in option" :key="index" :value="item" :label="item"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="inputList" label="商品规格">
            <div v-if="z.name">
                <el-card>
                颜色:
                <el-input v-model="Input"></el-input> <el-button @click="pp">增加</el-button>
                <div v-for="(ss,index) in ssss" :key="index">
                    <el-radio>{{ss}}</el-radio> <el-button type="primary" text @click="ssss.splice[index]">删除</el-button>
                </div>

                <el-radio-group v-model="z.inputList" v-for="(i,index) in m" :key="index">
                    {{i}}:
                    <el-radio v-for="(s,index) in n" :key="index">{{s.split(',')}}</el-radio>
                </el-radio-group>
            </el-card>
            </div>
            <el-table :data="ad">
                <el-table-column :label="s" prop="" v-for="(s,index) in m " :key="index">
                    <template v-slot="scope"> 
                        {{scope.$index}}
                    </template>
                </el-table-column>
                <el-table-columnm label="销售价格" prop="price">
                    <template #default="scope">
                        <el-input v-model="ad[scope.$index].price"></el-input>
                    </template>
                </el-table-columnm>
                <el-table-column label="商品库存" prop="stock">
                    <template #default="scope">
                        <el-input v-model="ad[scope.$index].stock"></el-input>
                    </template>
                </el-table-column>
                <el-table-column  label="库存预警值" prop="low_stock">
                    <template #default="scope">
                        <el-input v-model="ad[scope.$index].low_stock"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="SKU编号" prop="sku_code">
                    <template #default="scope">
                        <el-input v-model="ad[scope.$index].sku_code"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button linked @click="del(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="add">刷新列表</el-button>
            <el-button type="primary">同步价格</el-button>
            <el-button type="primary">同步库存</el-button>

        </el-form-item>
        <el-form-item label="商品参数">
            <div v-if="visible">

            </div>
        </el-form-item>
        <el-form-item label="商品相册"></el-form-item>
        <el-form-item label="规格参数">
            <el-button-group>
                <el-button @click="vif=0">电脑端详情</el-button>
                <el-button @click="vif=1">移动端详情</el-button>
            </el-button-group>
            <div v-if="vif == 0">
                <UeditorIndex content=""></UeditorIndex>
            </div>
            <div v-else-if="vif == 1">
                <UeditorIndex content=""></UeditorIndex>
            </div>
        </el-form-item>
    </el-form>

    <el-button @click="click">提交</el-button>
</template>
<script setup lang="ts">
import { GetReq } from '@/components/axios/axios';
import { ref,reactive } from 'vue'
import { treeTable,threeForm } from "@/components/interface/pmsInterface";
import UeditorIndex from '../ueditor/ueditorIndex.vue';
import { useStore } from 'vuex';
import {store} from '@/components/vuex/vuex'
const stor = useStore() || store
const vif = ref(0)
const ssss = ref([] as any)
const option = ref([] as any)
const z = reactive({} as threeForm )
const Input = ref('')
let m = ref([] as any)
let n = ref([] as any)
let ad = reactive([{} as treeTable])
const visible = ref(false)
const visibleChange = (bol:Boolean)=>{
    if (bol == true && option.value.length == 0) {
        GetReq('api/PmsProductAttributeCategoryController/list').then(data => {
            if (data.code == 200) {
                for (let index = 0; index < data.data.length; index++) {
                        option.value.push(data.data[index])
                }
            }
        })
    }
    if(bol == false && z.name != ' '){
        GetReq('api/PmsProductAttributeController/sql?name='+z.name).then(data => {
            if (data.code == 200) {
            //    m = data.data.split('，')
            for (let index = 0; index < data.data.length; index++) {
                m = data.data[index].name
                n = data.data[index].inputList
            }
            }
        })
    }
}
    
const add = () =>{
    for (let index = 0; index < z.inputList.length; index++) {
            for (let aa = 0; aa < ssss.value.length; aa++) {
                let s = {"":z.inputList[index],"  ":ssss.value[aa] ,price:undefined,stock:undefined,low_stock:undefined,sku_code:undefined}
                
                ad.push(s)
            }
    }
    console.log("ad add push",ad);
    
}
const pp = ()=>{
    if(!Input.value)return
    ssss.value.push(Input)
}
const click = ()=>{
    stor.commit('vuexStore/setthree')
}
const del = (index:any) => {
    ad.splice(index,1)
}
</script>