<template>
    <el-table :data="tab">
        <el-table-column prop="promotionPerLimit" label="数量"></el-table-column>
        <el-table-column prop="count" label="折扣"></el-table-column>
        <el-table-column  label="操作">   
            <!-- <template #default="scope">
                <el-button link type="primary" @click="del(scope.$index)">删除</el-button>
                <el-button link type="primary" @click="add">添加</el-button>

            </template> -->
        </el-table-column>

    </el-table>
</template>
<script>
export default{
    data() {    
        return {
            tab:[]

        }
    },
    methods: {
        del(index){
            if (this.tab.length == 1) {
                return
            }
            this.tab.splice(index,1)
        },
        add(){
            let s = {
                promotionPerLimit:0,
                count:0
            }
            this.tab.push(s)
        }
    },
}
</script>