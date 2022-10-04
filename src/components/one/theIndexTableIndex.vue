<template>
    <div>
        <!--  -->
        <!-- {{Loaddata}} -->
        <el-table style="width: 100%;" :data="Loaddata"> 
            <el-table-column prop="id" label="编号" />
            <el-table-column prop="name" label="分类名称" />
            <el-table-column prop="level" label="级别" />
            <el-table-column prop="productCount" label="商品数量" />
            <el-table-column label="导航栏">
                <template #default="scope">
                    <el-switch v-model="Loaddata[scope.$index].navStatus" />
                </template>
            </el-table-column>
            <el-table-column label="是否显示">
                <template #default="scope">
                    <el-switch v-model="Loaddata[scope.$index].showStatus" />
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" />
            <el-table-column label="设置">
                <template #default="scope">
                    <el-button size="small" @click="down(scope.row.id)"> 查看下级</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="edit(scope.row,scope.$index)">edit</el-button>
                    <el-button size="small" type="danger" @click="del(scope.$index)">delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="nowpage" background layout="prev, pager, next" :total="total"
            @current-change="pagechange" />

    </div>
</template>

<script setup lang="ts">
// import { ElMessage } from 'element-plus'
import { onMounted,computed, ref } from 'vue'
// import { GetReq } from '../axios/axios';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {store} from '@/components/vuex/vuex'
import { Store } from 'element-plus/es/components/table/src/store';

let nowpage = ref(0)
let total = computed(() => {
    return stor.getters['theIndex/getTotal']
})

let stor = useStore() || store

let router = useRouter()

const TheLoad = () => {
    console.log(stor);
    stor.dispatch('theIndex/init')
}

onMounted(() => {
    TheLoad()
})

let  Loaddata:Store<[any]> = computed(() => {
    console.log("java");
    console.log("stor.getters",stor.getters['theIndex/getLoadData']);
    return  stor.getters['theIndex/getLoadData']
})

const edit = (row: any,index:number) => {
    console.log(row.id);
    
    router.push({ path: '/two', query: { id: row.id,index:index } })
}

const del = (index: Number) => {
    stor.dispatch({
        type:'theIndex/change',
        index:index
    })
}


const pagechange = (newpage: number) => {
    stor.dispatch({
        type:'pagechange',
        index:newpage
    })

}


const down = (id: number) => {
    stor.dispatch(
        'theIndex/down',
        id
    )


}


</script>

<style scoped>

</style>