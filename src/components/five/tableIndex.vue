<template>
    <div>
        <el-table :data="tableData">
    <el-table-column type="selection" width="40"></el-table-column>
    <el-table-column label="编号">
        <template v-slot="scope">
            {{scope.row.id}}
        </template>
    </el-table-column>
    <el-table-column  label="商品图片"></el-table-column>
    <el-table-column  label="商品名称">
        <template v-slot="scope">
            <p>
                {{scope.row.name}}
            </p>
            <p>
                品牌:{{scope.row.brandName}}
            </p>
        </template>
    </el-table-column>
    <el-table-column  label="价格/货号">
        <template v-slot="scope">

            <p>
                价格:${{scope.row.promotionPrice}}
            </p>
            <p>
                货号:{{scope.row.productSn}}
            </p>
        </template>
    </el-table-column>
    <el-table-column prop="" label="标签">
        <template v-slot="scope">   
            <p>
            上架:{{scope.row.publishStatus==0?'上架':'下架'}}
            <el-switch v-model="scope.row.publishStatus" :active-value="0"></el-switch>
            </p>
            <p>
            新品:{{scope.row.newStatus == 0?'不是新品':'新品'}}
            <el-switch v-model="scope.row.newStatus" :active-value="0"></el-switch>
            </p>            
            <p>
            推荐:{{scope.row.recommandStatus == 0?'不推荐':'推荐'}}
            <el-switch v-model="scope.row.recommandStatus" :active-value="0"></el-switch>
            </p>
        </template>

    </el-table-column>
    <el-table-column  label="排序">
        <template v-slot="scope">
            {{scope.row.sort}}
        </template>
    </el-table-column>
    <el-table-column  label="SKU库存">
        <template v-slot="scope">
            <el-button @click="sku(scope.row.id)" type="primary">
                <el-icon><EditPen /></el-icon>
            </el-button>
        </template>
    </el-table-column>
    <el-table-column  label="销量">
        <template v-slot="scope">
            {{scope.row.sale}}
        </template>
    </el-table-column>
    <el-table-column label="审核状态">
        <template v-slot="scope">
            {{scope.row.verifyStatus==0?'未审核':'审核通过'}}
            <el-button @click="shenhe" text type="primary"></el-button> 
        </template>
    </el-table-column>
    <el-table-column prop="操作">
        <template #default="scope">
            <el-button size="small" @click="editxx(scope.row.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="delxx(scope.$index)">删除</el-button>
        </template>
    </el-table-column>
</el-table>

<el-pagination background layout="prev, pager, next" :total="total" @current-change="page"/>


    </div>
</template>

<script setup lang="ts"> import {store} from '@/components/vuex/vuex'
import { computed, onMounted } from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const theStore = useStore() ||  store

let tableData = computed(()=>{
   return theStore.getters['fiveIndexVuexState/getTableData']
})

let total = computed(()=>{
    return theStore.getters['fiveIndexVuexState/getTotal']
})
const shenhe = ()=>{

}
const editxx = (id:number)=>{
    console.log(id);
    router.push("/six/" + id);
}
const delxx = (id:number)=>{
    theStore.commit('fiveIndexVuexState/change',id)
}

const sku = (id:number)=>{
    theStore.dispatch('fiveIndexVuexState/initTableData',id)
}   

const page = (now:number)=>{
    theStore.dispatch('fiveIndexVuexState/page',now)
}

onMounted(() => {
  getData()  
})
const getData = ()=>{
    theStore.dispatch('fiveIndexVuexState/init')
}

</script>

<style scoped>

</style>