<template>
    <el-descriptions :column="6"
    direction="vertical"> 
        <el-descriptions-item label="名称">{{descriptions.name}}</el-descriptions-item>
        <el-descriptions-item label="优惠券类型">{{descriptions.type}}</el-descriptions-item>
        <el-descriptions-item label="可使用商品">{{descriptions.useType}}</el-descriptions-item>
        <el-descriptions-item label="使用门槛">{{descriptions.minPoint}}</el-descriptions-item>
        <el-descriptions-item label="面值">{{descriptions.amount}}</el-descriptions-item>
        <el-descriptions-item label="状态">{{new Date(descriptions.endTime) > new Date()? "未过期":"已过期"}}</el-descriptions-item>
        <el-descriptions-item label="有效期">{{descriptions.startTime}}至{{descriptions.endTime}}</el-descriptions-item>
        <el-descriptions-item label="总发行量">{{descriptions.count}}</el-descriptions-item>
        <el-descriptions-item label="已领取">{{descriptions.receiveCount}}</el-descriptions-item>
        <el-descriptions-item label="待领取">{{des(descriptions.count,descriptions.receiveCount)}}</el-descriptions-item>
        <el-descriptions-item label="已使用">{{descriptions.useCount}}</el-descriptions-item>
        <el-descriptions-item label="未使用">{{des(descriptions.receiveCount,descriptions.useCount)}}</el-descriptions-item>
    </el-descriptions>
    <el-card>
        <header>
            <div class="a">
                <el-icon><Search></Search></el-icon>筛选搜索
                <div class="b">
                    <el-button @click="res(formRef)">重置</el-button>
                    <el-button @click="sub(formRef)" type="primary">查询搜索</el-button>
                </div>

                
            </div>
            <el-form :model="formModel">
                    <el-form-item label="使用状态">
                        <el-select v-model="formModel.useStatus" >
                            <el-option v-for="(o,index) in option" :key="index" :label="o" :value="o"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单编号"></el-form-item>
                </el-form>
        </header>

    </el-card>
    <el-table :data="tataTable">
                    <el-table-column prop="couponCode" label="优惠券"></el-table-column>
                    <el-table-column prop="memberNickname" label="领取会员"></el-table-column>
                    <el-table-column prop="getType" label="领取方式"></el-table-column>
                    <el-table-column prop="createTime" label="领取时间"></el-table-column>
                    <el-table-column prop="useStatus" label="当前状态"></el-table-column>
                    <el-table-column prop="useTime" label="使用时间"></el-table-column>
                    <el-table-column prop="orderId" label="订单编号"></el-table-column>
                </el-table>
</template>
<script>
import { GetReq, PostReq } from '@/components/axios/axios'
import { IntegerToString } from '@/components/utils/integerToString'
import { twoObject } from '@/components/utils/twoObject'
let map =new Map()
map.set("已使用",0)
map.set("未使用",1)
map.set("已过期",2)
    export default{
        data() {
            return {
                descriptions:{},
                formModel:{},
                option:['已使用','未使用','已过期'],
                tataTable:[],
                formRef:{}
            }
        },
        created () {
            this.init()
        },
        methods: {
            des(a,b){   
                return a - b 
            },
            init(){
                GetReq('api/SmsCouponController/sel/' + this.$route.params.id).then(data => {
                    if (data.code == 200) {
                        console.log();
                        this.descriptions = twoObject(data.data,this.descriptions)
                    }
                    console.log(this.descriptions);
                })
            },
            res(){

            },
            sub(){
                this.formModel.useStatus = IntegerToString(this.formModel.useStatus,map)
                let json = JSON.stringify({
                    smsCouponHistory:this.formModel
                })
                if (this.formModel != {}) {
                    PostReq( 'api/SmsCouponHistoryController/init',json).then( data =>{
                    if(data.code == 200){
                        console.log(data.data);
                        for (let index = 0; index < data.data.length; index++) {
                            this.tataTable.push(data.data[index])
                        }
                    }
                })
                }
                console.log(json);
                PostReq( 'api/SmsCouponHistoryController/init').then( data =>{
                    
                    if(data.code == 200){
                        console.log(data.data);
                        for (let index = 0; index < data.data.length; index++) {
                            this.tataTable.push(data.data[index])
                        }
                    }
                })
            }

        }
    }
</script>
<style scope>
    .a{
        display: flex;
        flex: 1;
    }
    .b{
        margin-left: auto;
    }
</style>