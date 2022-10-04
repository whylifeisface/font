<template>
    <el-card>
        <el-form-item>
            <span>数据列表</span>
        </el-form-item>
    </el-card>
    <el-table :data="tableData">
        <el-table-column prop="smsFlashPromotionSession.id" label="编号"></el-table-column>
        <el-table-column prop="smsFlashPromotionSession.name" label="秒杀时间段名称"></el-table-column>
        <el-table-column prop="smsFlashPromotionSession.startTime" label="每日开始时间"></el-table-column>
        <el-table-column prop="smsFlashPromotionSession.endTime" label="每日结束时间"></el-table-column>
        <el-table-column prop="numberCount" label="商品数量"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <!-- {{scope.row}} -->

                <el-button type="primary" text @click="this.$router.push('/nithreeTable/' + scope.row.id)">商品列表</el-button>
            </template>
        </el-table-column>
    </el-table>



</template>
<script>
import { GetReq } from '@/components/axios/axios';

    export default{
        data() {
            return {
                tableData:[]
            }
        },
        created () {
            this.init()
        },
        methods: {
            init(){
                GetReq('api/SmsFlashPromotionProductRelationController/init').then(data => {
                    if (data.code == 200) {
                        for (let index = 0; index < data.data.length; index++) {
                            console.log(data.data[index]);
                            this.tableData.push(data.data[index])   
                        }
                        console.log(this.tableData);
                    }
                })
            },

        }
    }
</script>