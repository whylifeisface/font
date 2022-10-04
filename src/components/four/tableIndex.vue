<template>
    <sonIndex mes="添加" @show="sho"></sonIndex>

    <el-table
    :data="tableData"
    >
    <el-table-column type="selection" width="55" />

    <el-table-column prop="id" label="编号"></el-table-column>

    <el-table-column prop="name" label="属性名称"></el-table-column>

    <el-table-column prop="PmsProductAttributeCategory.name" label="商品类型"></el-table-column>

    <el-table-column prop="selectType" label="属性是否可选"></el-table-column>
    
    <el-table-column prop="inputType" label="属性录入方式"></el-table-column>

    <el-table-column prop="inputList" label="可选值列表"></el-table-column>

    <el-table-column prop="sort" label="排序"></el-table-column>

    <el-table-column  label="操作">
        <template #default="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="del(scope.$index)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
    <myDialogIndex @show="diashow" :visible="visible" ref="myDialogIndex"/>
</template>

<script>
import { GetReq } from '../axios/axios'
import myDialogIndex from '../son/myDialogIndex.vue'
import sonIndex from '../son/sonIndex.vue'


    export default {
        components: {
            myDialogIndex,sonIndex
        },
        data() {
            return {
                tableData:[],
                visible:false
            }
        },
        props:['dat'],
        created() {
            this.load()
        },methods: {
            load(){
                let name =this.$route.query.name
                GetReq('api/PmsProductAttributeController/sql?name='+name).then(data => {
                    if (data.code == 200) {
                        for (let index = 0; index < data.data.length; index++) {
                                this.tableData.push(data.data[index])
                        }
                    }
                })
            },
            edit(row){
                console.log(row);
               let data =  encodeURIComponent(JSON.stringify(row))
               this.$router.push({path:'/fourtableform',query:{data:data}})

            },
            sho(){
                    this.$router.push('/fourtableform')
            },
            diashow(){
            // this.$refs.myDialogIndex.visible = false
        },
        del(){
            this.visible = true
        }
        },
       
    }
</script>