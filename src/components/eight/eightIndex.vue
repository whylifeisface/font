<template>
    <el-card>
        发货列表
    </el-card>
    <el-table :data="tableTable">
        <el-table-column prop="orderSn" label="订单编号"></el-table-column>
        <el-table-column prop="receiverName" label="收货人"></el-table-column>
        <el-table-column prop="receiverPhone" label="手机号码"></el-table-column>
        <el-table-column prop="receiverPostCode" label="邮政编码"></el-table-column>
        <el-table-column prop="receiverDetailAddress" label="收货地址"></el-table-column>
        <el-table-column label="配送方式">
            <el-select v-model="tableTable.deliveryCompany" placeholder="请选择物流公司" >
                <el-option :value="i" :label="i" v-for="(i,index) in options" :key="index"></el-option>
            </el-select>
        </el-table-column>
        <el-table-column prop="deliverySn" label="物流单号">
            <el-input v-model="deliverySn"></el-input>
        </el-table-column>
    </el-table>
    <el-button @click="this.$router.push('/seven')">取消</el-button>
    <el-button type="primary" @clcik="visible = true">确认</el-button>
<el-dialog v-model="visible">
    <head>提示</head>
    是否进行发货操作
    <el-button @click="ElMessage.error({message:'发货取消'})">取消</el-button>
    <el-button  type="primary">确认</el-button>
</el-dialog>
</template>
<script>
import { GetReq } from '../axios/axios';

    export default{
        data() {
            return {
                tableTable:[],
                visible:false,
                options:["顺丰快递","圆通快递","中通快递","韵达快递"]
            }
        },
        created () {
            this.init()
        },
        methods: {
            init(){
                let id = this.$route.params.id
                GetReq('api/OmsOrderController/se/'+id).then(data => {
                    if (data.code == 200) {
                        console.log(data.data);
                        for (let index = 0; index <= 0; index++) {
                            // this.tableTable.orderSn = data.data.orderSn
                            // this.tableTable.receiverName = data.data.receiverName
                            // this.tableTable.receiverPhone = data.data.receiverPhone
                            // this.tableTable.receiverPostCode = data.data.receiverPostCode
                            // this.tableTable.receiverDetailAddress = data.data.receiverDetailAddress
                            this.tableTable.push(data.data)
                        }
                        console.log("------");
                        console.log(this.tableTable);
                    }
                })
            }
        }
    }
</script>