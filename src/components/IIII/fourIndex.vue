<template>
    <div>
        <sonIndex mes="添加" @show="sho" />

        <el-table :data="tableTata">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="sort" label="排序"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" text @click="edit(scope.row)">编辑</el-button>
                    <el-button type="primary" text @click="del(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="visbile" @close="model = {} as M">
            <el-form :model="model">
                <el-form-item label="名称">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="model.sort"></el-input>

                </el-form-item>
                <div class="a">
                    <div class="b">
                        <el-button @click="visbile = false">取消</el-button>
                        <el-button type="primary" @click="en">确定</el-button>
                    </div>
                </div>
            </el-form>
        </el-dialog>


    </div>
</template>

<script setup lang="ts">
import sonIndex from "@/components/son/sonIndex.vue";
import { onMounted, reactive, ref } from 'vue'
import { GetReq, PostReq } from "../axios/axios";

interface P {
    id: number
    name: string
    createTime: Date
    sort: number
}
interface M {
    id: number
    name: string
    sort: number
}

const visbile = ref(false)


const model = reactive({} as M)

const en = () => {
    if(model == {} as M)return

    let json = JSON.stringify({
        "umsResourceCategory":model
    })
    PostReq('api/UmsResourceCategoryController/insert',json).then(data => {
        if (data.code == 200) {
            console.log();
        }
    })

}

onMounted(() => {
  init()  
})

const init = () => {
    tableTata.length = 0
    GetReq("api/UmsResourceCategoryController/init?num=1&size=5").then(data => {
        if (data.code == 200) {
            for (let index = 0; index < data.data.list.length; index++) {
                    tableTata.push(data.data.list[index])
            }
        }
    })
}

const sho = () => {
    visbile.value = true
}

let tableTata = reactive([{} as P])
const edit = (row: any) => {
    console.log(row);
    

}

const del = (index: number) => {
    console.log(index);
    
}
</script>

<style scoped>

</style>