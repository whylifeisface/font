<template>
    <el-table :data="t">
        <el-table-column prop="a" label="满"></el-table-column>
        <el-table-column prop="b" label="立减"></el-table-column>
        <el-table-column label="操作">
                <template #default="scope">
                    <el-button link type="primary" @click="del(scope.$index)">删除</el-button>
                    <el-button link type="primary" @click="add">添加</el-button>
                </template>
            </el-table-column>
    </el-table>
</template>
<script>
    export default{
        data() {
            return {
                t:[]
            }
        },
        methods: {
            del(index){
                if (this.t,length == 1) {
                    return;
                }
                this.t.splice(index,1)
            },
            add(){
                this.t.push({
                    a:'0',
                    b:'0'
                })
            }
        },
    }
</script>