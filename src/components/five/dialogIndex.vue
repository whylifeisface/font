<template>
    <div>

        <el-dialog v-model="dialogTableVisible">
            <h3>编辑货品信息</h3>

            <el-input placeholder="按照sku编号搜索">
                <el-button icon="el-icon-search" />
            </el-input>

            <el-table :data="dataTable">
                <el-table-column prop="skuCode" label="SKU编号"></el-table-column>
                <el-table-column v-for="(json,index) in dataTable.spData" :key="index" :label="json.key">
                    {{json.value}}
                </el-table-column>
                <el-table-column prop="price" label="销售价格"></el-table-column>
                <el-table-column prop="stock" label="商品库存"></el-table-column>
                <el-table-column prop="lowStock " label="商品预警值"></el-table-column>
            </el-table>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="toFalse">Cancel</el-button>
                    <el-button type="primary" @click="en">Confirm</el-button>
                </span>
            </template>
        </el-dialog>



    </div>
</template>

<script setup lang="ts">import { computed } from 'vue';
import { useStore } from 'vuex'
import { store } from "@/components/vuex/vuex";
// import { PostReq } from '../axios/axios';

const thestore = useStore() || store
// const dataTable = reactive([{} as ])

const dialogTableVisible = computed(()=>{
   return thestore.getters['fiveIndexVuexState/dialogTableVisible']
})
const dataTable = computed(()=>{
   return thestore.getters['fiveIndexVuexState/dialogTableVisible']

})

const toFalse = ()=>{
    thestore.commit('fiveIndexVuexState/toFalse')
}


// onMounted(() => {
//     init()
// })
// const init = ()=>{

// }


// const centerDialogVisible = ()=>{

// }
const en = () =>{
    // PostReq('',)
}
</script>

<style scoped>

</style>