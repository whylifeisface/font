<template>
    <div>
        <el-card>
            <template #header>

                <div class="a">
                    <el-icon>
                        <Search />
                    </el-icon>
                    <span> 筛选搜索</span>
                    <div class="b">
                        <el-button @click="$router.push('/six/0')">添加</el-button>
                    </div>
                </div>
            </template>
            <FormIndex />
        </el-card>

    </div>
</template>

<script setup lang="ts">
import FormIndex from './FIVE/FormIndex.vue'
// const fom = (content) => {
//      tableData = []
//      tableData = content
//     console.log( tableData)
// },
// const fe = (content) => {
//             total = content
//         },

</script>

<style scoped>

</style>