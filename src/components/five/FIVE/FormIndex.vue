<template>
<div class="a">
    <div class="b">
        <el-button 
                @click="res(fromRef)"> 重置</el-button>
                <el-button type="primary" @click="sub()"> 查询结果</el-button>
    </div>
</div>
              

     <el-form ref="fromRef" :model="formModel" >
        <el-row>
            <el-form-item  label="输入搜索">
                <el-input v-model="formModel.name" placeholder="商品名称"/>
            </el-form-item>
            <el-form-item label="商品货号">
                <el-input v-model="formModel.productSn" placeholder="商品货号"/>
            </el-form-item>
        </el-row>
            <el-form-item label="商品分类">
                <el-cascader v-model="formModel.productCategoryName" :options="options0" @visible-change="change0"></el-cascader>
            </el-form-item>
            <el-form-item  label="商品品牌">
                <el-select @visible-change="change1" v-model="formModel.brandName">
                    <el-option       
                    v-for="( item, index) in options1"
                    :key="index"
                    :label="item.name"
                    :value="item.name"/>
                </el-select>
            </el-form-item> 
            <el-form-item  label="上架状态">
                <el-select   v-model="formModel.publishtatus">
                    <el-option       
                    v-for="(item,index) in options2"
                    :key="index"
                    :label="item"
                    :value="item"/>
                </el-select>
            </el-form-item>
            <el-form-item  label="审核状态">
                <el-select  v-model="formModel.verifyStatus">
                    <el-option       
                    v-for="(item,index) in options3"
                    :key="index"
                    :label="item"
                    :value="item"/>
                </el-select>
            </el-form-item>

        </el-form>
</template>
<script setup lang="ts">
    //   import { , Emit } from 'vue-property-decorator';
import { GetReq } from '@/components/axios/axios';
import { FormInstance } from 'element-plus';
import { reactive,ref } from 'vue'
import {useStore} from 'vuex'
import { store } from "@/components/vuex/vuex";
import { AC } from '@/components/interface/pmsInterface'
import ObjectValueToNull from '@/components/utils/ObjectValueTonull'

let formModel = reactive({
    // verifyStatus:'',
    // publishtatus:'',
    // brandName:'',
    // productCategoryName:'',
    // productSn:'',
    // name:''
} as AC);

const stor = useStore() || store

let fromRef = ref<FormInstance>()

let options0 = ref([{} as O] )

let options1 = ref([] as any)

let options2 = ['上架','已下架']

let options3 = ['未审核','审核通过'] 

interface Childern {
    value:String,
    label:String
}
interface O {
    value:String,
    label:String,
    children:[Childern]
}

let children:Childern[] 
const change0 = (s:Boolean) =>{
    if (s == true  ) {
        
        GetReq('api/PmsProductCategoryController/linInId').then(data=>{
            if (data.code == 200) {
                console.log(data.data);
                            options0.value = data.data.map(
                                (i:{name:string,children:[{name:string}]}) =>{
                                    children = i.children.map(
                                        (s:{name:string}) => {
                                            return {label:s.name,value:s.name}
                                        }
                                    )
                                return {label:i.name,value:i.name,children:children}

                                })
                            }
                            })
                            console.log(options0);
    }
                        }      


    const change1 = (sa:Boolean) =>{
        if (sa == true && options1.value.length == 0) {
            GetReq('api/pmsBrandController/listAll').then(data=>{
            if (data.code == 200) {
                for (let index = 0; index < data.data.length; index++) {
                        options1.value.push(data.data[index])
                }
            }
    })
        }

}
// const emit = defineEmits(['on-save-ok','se-aw'])

const sub = ()=>{

    stor.dispatch('fiveIndexVuexState/search',formModel)

    }        


const res = (FormE:FormInstance|undefined)=>{
    if (!FormE) return
    // console.log("formModel",formModel);
    // formModel = {
    //  verifyStatus:'',
    // publishtatus:'',
    // brandName:'',
    // productCategoryName:'',
    // productSn:'',
    // name:''
    // } as AC
    ObjectValueToNull(formModel)
    // formModel.publishtatus = ''
    // FormE.resetFields()
}
</script>
<style scoped>
    .el-form{
        display: flex;
        /* flex: 1; */
        flex-wrap: wrap;
    }
    .el-form-item{
        width: calc((100%-10px)/3);
        min-width: calc((100%-10px)/3);
        max-width: calc((100%-10px)/3);
    }
</style>    