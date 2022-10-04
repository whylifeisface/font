<template>

    <son-index mes="添加" @show="sho"></son-index>
    <!-- 编号 分类名称 级别 商品数量  导航栏 是否显示 排序 设置 操作 -->
    <!-- id parentId name level productCount productUnit navStatus showStatus sort keywords description  -->
    <the-index-table-index ></the-index-table-index>

    <my-dialog-index @show="show" :visible="diavisible" mes="属性"></my-dialog-index>

    <!-- <el-input nmae="hidden" :value="value"></el-input> -->

</template>


<script lang="ts"  setup>
import { computed } from 'vue'
import sonIndex from '@/components/son/sonIndex.vue'
import MyDialogIndex from '../son/myDialogIndex.vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import TheIndexTableIndex from './theIndexTableIndex.vue';
import {store} from '@/components/vuex/vuex'



const stor = useStore() || store
let router = useRouter()

let diavisible = computed(()=>{
    return stor.getters['theIndex/getDialogVisible']
})

// let value = computed(()=>{
//     console.log("diavisible",stor.getters['theIndex/getDialogValue']);
//     return stor.getters['theIndex/getDialogValue']
// })
const sho = () => {
    router.push('/two')
}


const show = () => {
    // if(stor.getters['theIndex/getDialogValue'] == undefined) return
    // console.log("show",value.value);
    
    store.dispatch('theIndex/en',stor.getters['theIndex/getDialogValue'])
}

</script>
