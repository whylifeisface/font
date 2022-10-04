<template>
    <el-card>
        <!-- return_phone return_ammount product_real_price member_username reason return_name 
            create_time handle_note proof_pics description  -->
        <header>
            退货商品
        </header>
        <body>
            <!-- proudct_id  name return_ammount  product_count product_attr-->
            <el-table :data="tableData">
            <el-table-column label="商品图片" >
                <template v-slot:scope>
                    {{scope.row.proofPics}}
                </template>
            </el-table-column>
            <el-table-column label="商品名称" >
                <template v-slot:scope>
                    <h4>
                        {{scope.row.proofPics}}
                    </h4>
                    品牌:{{scop.row.productBrand}}
                </template>
            </el-table-column>
            <el-table-column label="价格/货号" >
                <template v-slot:scope>
                    <h4>
                        <!-- 价格:{{scope.row.productRealPrice}} -->
                    </h4>
                    货号: NO.{{scop.row.proudctId}}
                </template>
            </el-table-column>
            <el-table-column label="属性">
                <template v-slot:scope>
                    {{scope.row.productAttr}}
                </template>
            </el-table-column>
            <el-table-column label="数量">
                <template v-slot:scope>
                    {{scope.row.productCount}}
                </template>
            </el-table-column>
            <el-table-column label="小计">
                <template v-slot:scope>
                    {{scope.row.returnAmmount}}
                </template>
            </el-table-column>
        </el-table>
        </body>
        <!-- 合计:{{tableData[0].productRealPrice}} -->
    </el-card>
    <el-descriptions 
    title="服务单信息" column="18" 
    direction="vertical"
    >
        <el-descriptions-item label="服务单号">{{descriptions.orderId}}</el-descriptions-item>
        <el-descriptions-item label="申请状态">{{descriptions.status}}</el-descriptions-item> <!--0 1 2 3 -->
        <el-descriptions-item label="订单编号">{{descriptions.orderSn}}<el-link type="primary" href=""></el-link></el-descriptions-item>
        <el-descriptions-item label="申请时间">{{descriptions.createTime}}</el-descriptions-item>
        <el-descriptions-item label="用户账号">{{descriptions.memberUsername}}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{descriptionsreturnPhone}}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{descriptions.returnPhone}}</el-descriptions-item>
        <el-descriptions-item label="退货原因">{{descriptions.reason}}</el-descriptions-item>
        <el-descriptions-item label="问题描述">{{descriptions.description}}</el-descriptions-item>
        <el-descriptions-item label="凭证图片">{{descriptions.proofPics}}</el-descriptions-item>

        <el-descriptions-item label="订单金额">{{descriptions.productRealPrice}}</el-descriptions-item>
        <el-descriptions-item label="确认退款金额">
            ￥
            <el-input
                class="w-50 m-2"
                v-model="proof_pics"
            ></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="选择收货点">
            <el-select v-model="addressName"
            >
            <el-option v-for="(o,index) in op" :key="index" :label="o" :value="o"></el-option>
        </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="收货人姓名">{{descriptions.returnName}}</el-descriptions-item>
        <el-descriptions-item label="所在区域">{{descriptions.province}} {{city}} {{region}}</el-descriptions-item>
        <el-descriptions-item label="详细地址">{{descriptions.detailAddress}}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{descriptions.phone}}</el-descriptions-item>
        <el-descriptions-item label="处理备注">
            <el-input v-model="handleNote"
            class="w-50 m-2"
            />
        </el-descriptions-item>
    </el-descriptions>

    <!-- <el-button @click="" typr="primary">确认退货</el-button>
    <el-button @Click="" type=danger>拒绝退货</el-button> -->
</template>
<script>
import { GetReq } from '@/components/axios/axios';

    export default{
        // prop:['tableData'],
        data(){
            return{
                op:['深圳发货点','北京发货点','南京发货点'],
                tableData:[],
                descriptions:{
                    orderId:'',status:'',orderSn:'',createTime:'',
                    memberUsername:'',returnPhone:'',reason:'',description:''
                    ,proofPics:'',addressName:'',returnName:'',
                    province:'',detailAddress:'',phone:'',handleNote:''
                },productRealPrice:''
            }
        },
        created(){
            this.init()
        },methods: {
            init(){
                const id = this.$route.params.id
                console.log(id);
                GetReq('api/OmsOderReturnApplyController/JOIN/'+id).then(
                    function(data){
                    if(data.code == 200){
                        for (let index = 0; index <= 0; index++) {
                            this.tableData.proofPics = data.data.proofPics
                            this.tableData.productBrand = data.data.productBrand
                            this.tableData.proudctId = data.data.proudctId
                            this.tableData.productAttr = data.data.productAttr
                            this.tableData.productCount = data.data.productCount
                            this.tableData.returnAmmount = data.data.returnAmmount
                        }
                        this.descriptions.orderId = data.data.orderId
                        this.descriptions.status = data.data.status
                        this.descriptions.orderSn = data.data.orderSn
                        this.descriptions.createTime = data.data.createTime
                        this.descriptions.memberUsername = data.data.memberUsername
                        this.descriptions.returnPhone = data.data.returnPhone
                        this.descriptions.reason = data.data.reason
                        this.descriptions.description = data.data.description
                        this.descriptions.proofPics = data.data.proofPics
                        this.descriptions.addressName = data.data.addressName

                        this.descriptions.returnName = data.data.returnName
                        this.descriptions.province = data.data.province
                        this.descriptions.detailAddress = data.data.detailAddress
                        this.descriptions.phone = data.data.phone
                        this.descriptions.handleNote = data.data.handleNote
                    }
            }.bind(this))
            }
        }
    }
</script>