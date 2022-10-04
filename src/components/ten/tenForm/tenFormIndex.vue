<template>
    <el-form :model="formModel" ref="formRef" :rules="rule">
        <el-form-item label="优惠券类型" prop="type                 ">
            <el-select v-model="formModel.type" placeholder="请选择优惠券类型">
                <el-option v-for="(i,index) in option" :key="index" :value="i" :label="i"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="优惠券名称" prop="name                 "><el-input v-model="formModel.name"></el-input></el-form-item>
        <el-form-item label="适用平台" prop="platform             ">
            <el-select v-model="formModel.platform">
                <el-option v-for="(m,index) in opt" :key="index" :value="m" :label="m"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="总发行量" prop="count                ">
            <el-input v-model="formModel.count" placeholder="只能是正整数"></el-input>
        </el-form-item>
        <el-form-item label="面额" prop="amount               ">
            <el-input v-model="formModel.amount">
                <template #append>
                    <el-button disibled>元</el-button>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item label="每日限领" prop="per_limit">    
            <el-input v-model="formModel.perLimit" placeholder="面值只能是整数,限两位小数">
                <template #append>
                    <el-button disibled>张</el-button>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item label="使用门槛" prop="min_point            ">
            <el-input v-model="formModel.minPoint" placeholder="只能输入正整数">
                <template #prepend>
                    <el-button disibled>满</el-button>
                </template>
                <template #append>
                    <el-button disibled>元可用</el-button>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item label="领取日期" prop="enable_time          ">
            <el-time-picker type="date" v-model="formModel.enableTime" placeholder="选择日期"> </el-time-picker>
        </el-form-item>
        <el-form-item label="有效期" >
            <el-time-picker type="date" v-model="formModel.startTime           " placeholder="选择日期"></el-time-picker>
            <el-time-picker type="date" v-model="formModel.endTime             " placeholder="选择日期"></el-time-picker>
        </el-form-item>
        <el-form-item label="可使用商品"     >
            <el-button-group type="primary">
                <el-button @click="status = 0">全场通用</el-button>
                <el-button @click="status = 1">指定分类</el-button>
                <el-button @click="status = 2">指定商品</el-button>
            </el-button-group>
        </el-form-item>

            <div v-if="status == 0">
            
        </div>  

        <div v-else-if="status==1">
            <el-form-item >
                <el-cascader v-model="cascader" :options="options0" placeholder="请选择分类名称" @visible-change="vis1"></el-cascader>
                <el-button @click="add2">添加</el-button>
            </el-form-item>
                <el-table :data="tableData">
                    <el-table-column label="分类名称" prop="productCategoryName">
                    </el-table-column> 
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button text @click="de(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>    
                </el-table>
        </div>

        <!-- <div v-else-if="status==2">
            <el-form-item v-for="(pm,index) in pmsList" :key="index" :value="pm" :label="pm">
                <el-input v-model="formModel.PmsProduct[index].name" placeholder="商品名称/商品货号" @input="inputIn"></el-input>
                <el-button @click="add3">添加</el-button>
            </el-form-item>
            <el-table :data="tab">
                <el-table-column label="商品名称" prop=""></el-table-column>
                <el-table-column label="货号" prop=""></el-table-column>
                <el-table-column label="操作" prop=""></el-table-column>

            </el-table>
        </div>   -->
        <el-form-item label="备注" prop="note">
            <el-input v-model="formModel.note" type="textarea"></el-input>
        </el-form-item>
        <div>
            <el-button @click="sub(formRef)">提交</el-button>
            <el-button @clcik="res(formRef)">重置</el-button>
        </div>
    </el-form>
    
</template>
<script lang="ts" setup>
import { GetReq } from '@/components/axios/axios';
import { FormInstance, FormRules } from 'element-plus';
import { onMounted, reactive,ref } from 'vue'
import {useRoute} from 'vue-router'
interface O {
    id:number,
    type:number,
    name:string,
    platform:number,
    perLimit:number,
    minPoint:number,
    startTime:Date,
    endTime:Date,
    useType:number,
    count:number,
    publishCount:number,
    note:string,
    amount:number,
    enableTime:Date
    productCategoryName:string
    PmsProduct:[{
        name:string,
        productSn:string
    }],
    smsCouponProductCategoryRelation:[{
        productCategoryName:string
    }]
}
let cascader = ref('')
// let pmsList = ref(['0'])
const tableData = ref([
    {
    }
] )
const status = ref(0)
const opt = ['全平台','PC',"移动"]
const option = ['全场赠券','会员赠券','购物赠券','注册赠券']

let formModel = reactive({} as O)
const rule = ref<FormRules>({
})
const formRef = ref<FormInstance>()
onMounted(() => {
    init()
})
// let tab = ref([])
const init = ()=>{
const route = useRoute()
console.log(route.query.Myquery);

       let M:O = JSON.parse( decodeURIComponent( route.query.allData + '' ))
       
        formModel.PmsProduct = M.PmsProduct
        formModel.id = M.id
        formModel.type = M.type
        formModel.platform = M.platform
        formModel.perLimit = M.perLimit
        formModel.minPoint = M.minPoint
        formModel.startTime = M.startTime
        formModel.endTime = M.endTime
        formModel.useType = M.useType

        formModel.count = M.count
        formModel.publishCount = M.publishCount
        formModel.note = M.note
        formModel.amount = M.amount
        formModel.enableTime = M.enableTime
        formModel.productCategoryName = M.productCategoryName
        console.log(formModel);

            
}
let options0 = ref([])
const vis1 = (bol:Boolean)=> {
    if (bol) {
        console.log();
                
        GetReq('api/PmsProductCategoryController/linInId').then(data=>{
            if (data.code == 200) {
                console.log(data.data);
                            options0.value = data.data.map(
                                (i:{name:string,children:[{name:string}]}) =>{
                                   let children = i.children.map(
                                        (s:{name:string}) => {
                                            return {label:s.name,value:s.name}
                                        }
                                    )
                                return {label:i.name,value:i.name,children:children}

                                })
                            }
                            })
                            console.log(options0)

    }
}
const de = (index:number)=> {
    console.log(index);
    
    tableData.value.splice(index,1)
}
// const add3 = ()=>{
//     pmsList.value.push('0')
//     tab.value.push()
// }
const add2 = ()=> {
   let a = {
        productCategoryName:cascader.value
    }
    tableData.value.push(a)
    cascader.value = ''
}
const sub = (FormE:FormInstance | undefined) => {
    if(!FormE)return
    FormE.validate(
        (valid,filde) =>{
        if (valid) {
            console.log();
        }else{
            console.log(filde);
            
        }
    }
    )
}
const res = (FormE:FormInstance | undefined)=>{
    console.log(formModel.amount);
    
    if(!FormE)return
    FormE.resetFields()
}

// const inputIn = ()=> {}
</script>
    