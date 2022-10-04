<template>
    <el-form :model="formModel">
        <el-form-item label="赠送积分:">
            <el-input v-model="formModel.giftPoint"></el-input>
        </el-form-item>
        <el-form-item label="赠送成长值：">
            <el-input v-model="formModel.giftGrowth"></el-input>
        </el-form-item>
        <el-form-item label="积分购买限制：">
            <el-input v-model="formModel.usePointLimit"></el-input>
        </el-form-item>
        <el-form-item label="预告商品：">
            <el-switch v-model="formModel.previewStatus" :active-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="商品上架：">
            <el-switch v-model="formModel.publishStatus" :active-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="商品推荐：">
            <el-switch v-model="formModel.recommandStatus" :active-value="0"></el-switch>
            <el-switch v-model="formModel.newStatus" :active-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="服务保证：">
            <el-checkbox-group v-model="formModel.serviceIds">
                <el-checkbox  label="0" >无忧退货</el-checkbox>
                <el-checkbox  label="1" >快速退款</el-checkbox>
                <el-checkbox  label="2" >免费包邮</el-checkbox>
            </el-checkbox-group>

        </el-form-item>
        <el-form-item label="详细页标题：">
            <el-input v-model="formModel.detailTitle"></el-input>
        </el-form-item>
        <el-form-item label="详细页描述：">
            <el-input v-model="formModel.detailDesc"></el-input>
        </el-form-item>
        <el-form-item label="商品关键字：">
            <el-input v-model="formModel.keywords"></el-input>
        </el-form-item>
        <el-form-item label="商品备注：">
            <el-input v-model="formModel.note" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="选择优惠方式">
            <el-radio-group >
                <el-radio-button label="无优惠" ></el-radio-button>
                <el-radio-button label="特惠促销" @click="one"></el-radio-button>
                <el-radio-button label="会员价格" @click="two"></el-radio-button>
                <el-radio-button label="阶梯价格" @click="three"></el-radio-button>
                <el-radio-button label="满减价格" @click="four" ></el-radio-button>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <router-view />


    <div>
        <el-button @Click="click">提交</el-button>
    </div>
</template>
<script setup lang="ts">
import { GetReq } from '@/components/axios/axios';
import { onMounted, reactive } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { useStore } from 'vuex';
import {store} from '@/components/vuex/vuex'
const stor = useStore() || store

interface O {
    serviceIds: number[],
    giftPoint:string,
    giftGrowth:string,
    usePointLimit:string,
    previewStatus:number,
    publishStatus:number,
    recommandStatus:number,
    newStatus:number,
    detailTitle:string,
    detailDesc:string,
    keywords:string,
    note:string
}
let formModel = reactive({
serviceIds: [],
giftPoint: '0',
giftGrowth: '0',
usePointLimit: '0',
previewStatus: 0,
publishStatus: 0,
recommandStatus: 0,
newStatus: 0,
detailTitle: '',
detailDesc: '',
keywords: '',
note: ''
}  as O)


let router = useRouter()
let route = useRoute()
let id = route.params.id
const init = ()=> {


   GetReq('api/PmsProductController/get/'+id).then(data => {
    formModel.giftPoint = data.data.giftPoint
    formModel.giftGrowth = data.data.giftGrowth
    formModel.usePointLimit = data.data.usePointLimit
    formModel.previewStatus = data.data.previewStatus
    formModel.publishStatus = data.data.publishStatus
    formModel.recommandStatus = data.data.recommandStatus
    formModel.newStatus = data.data.newStatus
    formModel.detailTitle = data.data.detailTitle
    formModel.detailDesc = data.data.detailDesc
    formModel.keywords = data.data.keywords
    formModel.note = data.data.note
    let list = data.data.serviceIds.split(',')
    console.log(list);  
    for (let index = 0; index < list.length; index++) {
            formModel.serviceIds.push(list[index])        
    }
    
   })
}

onMounted(() => {
  init()  
})  
const one = ()=>{
    router.push('/six/twoIndex/'+id +'/two')

}
const click = ()=>{
    stor.commit('vuexStore/settwo')
}
const two = ()=>{
    router.push('/six/twoIndex/'+id +'/three')
}

const three = ()=>{
    router.push('/six/twoIndex/'+id +'/four')
}

const four = ()=>{
    router.push('/six/twoIndex/'+id +'/five')
}

</script>