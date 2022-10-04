<template>
    <el-card>
        <template header>
            <el-icon>
                <Search></Search>
            </el-icon>
            <el-button @click="res(formRef)">重置</el-button>
            <el-button @Click="sub(formRef)">查詢所有</el-button>
        </template>
        <div class="a">
            <div>
                <el-icon><Search></Search></el-icon>    
                <span>搜索</span>
            </div>
            
            <div class="b">
                <el-button @click="FormModel = {}">重置</el-button>
                <el-button type="primary" @click="subas">查询列表</el-button>
            </div>
        </div>

        <el-form ref="formRef" :model="FormModel">
            <el-form-item label="输入搜索">
                <el-input v-model="FormModel.orderSn" placeholder="服务单号" class="w-50 m-2"></el-input>
            </el-form-item>
            <el-form-item label="处理状态">
                <el-select v-model="FormModel.status" placeholder="全部">
                    <el-option v-for="(i,index) in op" :key="index" :label="i" :value="i"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="申请时间">
                <el-date-picker v-model="FormModel.createTime" type="date" placeholder="请选择时间" size="small">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="操作员">
                <el-input v-model="FormModel.handleMan" placeholder="全部" class="w-50 m-2"></el-input>
            </el-form-item>
            <el-form-item label="处理时间">
                <el-date-picker type="date" placeholder="请选择时间" v-model="FormModel.handleTime" size="small">
                </el-date-picker>
            </el-form-item>
        </el-form>  
    </el-card>
    <el-card>
        <el-icon>
            <Tickets />
        </el-icon>數據列表
    </el-card>
    <!-- create_time return_amount status handle_time order_sn member_username -->
    <el-table :data="tableData">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="orderSn" label="服務單號"></el-table-column>
        <el-table-column prop="createTime" label="申請時間"></el-table-column>
        <el-table-column prop="memberUsername" label="用戶賬號"></el-table-column>
        <el-table-column prop="returnAmount" label="退款金額"></el-table-column>
        <el-table-column prop="status" label="申請狀態"></el-table-column>
        <el-table-column prop="handleTime" label="處理時間"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                {{scope.row.id}}
                <el-button @click="this.$router.push('/threeDetail/'+scope.row.id)">查看详情</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination background layout="next, prev,pager " :total="total" @page-change="pageChange"></el-pagination>
</template>
<script>
import {IntegerToString} from '@/components/utils/integerToString.ts'
import { GetReq, PostReq } from '@/components/axios/axios';
let map = new Map()
map.set(0,'待处理')
map.set(1,'退货中')
map.set(2,'已完成')
map.set(3,'已拒绝')
export default {
    data() {
        return {
            FormModel: {
                orderSn: '',
                status: '',
                createTime: "",
                handleMan: '',
                handleTime: ''
            },
            op: ['待处理', '退货中', '已完成', '已拒绝'],
            tableData:[],
            total:'',
        
        }
    },
    created() {
        this.init()
    },
    methods: {
        init(){
            GetReq('api/OmsOderReturnApplyController/page?num=1&size=5').then(function(data){
            if(data.code == 200){
                console.log(data.data);
            for (let index = 0; index < data.data.list.length; index++) {
                // data.data[index]
            this.tableData.push(data.data.list[index])
            
            this.tableData[index].status = IntegerToString(this.tableData[index].status,map)
            }
            this.total = data.data.total
            }
            }.bind(this))
        }
    ,
    subas() {
        let json = JSON.stringify(this.FormModel)
        PostReq('api/OmsOderReturnApplyController/pageSearch',json).then(data => {
            if (data.code == 200) {
                for (let index = 0; index < data.data.length; index++) {
                    this.tableData.push(data.data[index])
                }
            }
        })
    },
    res(formE){
        if(!formE)return
        formE.resetFields()
    },
    sub(formE){
        if(!formE)return
        GetReq('api/OmsOderReturnApplyController/pageSearch?num=1&size=5',this.FormModel).then(function(data){
            if(data.code == 200){
                console.log(data.data);
            for (let index = 0; index < data.data.length; index++) {
                // data.data[index]
            this.tableData.push(data.data.list[index])
            
            this.tableData[index].status = IntegerToString(this.tableData[index].status,map)
            }
            this.total = data.data.total
            }
            }.bind(this))
    },
    pageChange(now){
        this.FormModel == {} ?
        GetReq('api/OmsOderReturnApplyController/page?size=5&num='+now).then(function(data){
            if(data.code == 200){
                console.log(data.data);
            for (let index = 0; index < data.data.length; index++) {
                // data.data[index]
            this.tableData.push()
            IntegerToString(this.tableData[index].status,map)
            }
            this.total = data.data.total
            }
            }.bind(this))
            :
            GetReq('api/OmsOderReturnApplyController/pageSearch?size=5&num='+now,this.FormModel).then(data => {
            if(data.code == 200){
            console.log(data.data);
            for (let index = 0; index < data.data.length; index++) {
                // data.data[index]
            this.tableData.push()
            IntegerToString(this.tableData[index].status,map)
            }
            this.total = data.data.total
            }  
            })
        }
    }
}


</script>
<style scoped>
    .el-form{
        display: flex;
        flex: 1;
        flex-wrap: wrap;
    }
    .el-form-item{
        width: calc((100%-10px) /3);

    }

</style>