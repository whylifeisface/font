<template>
    <el-steps :active="active" finish-status="success">
        <el-step ></el-step>
        <el-step></el-step>
        <el-step></el-step>
        <el-step></el-step>
        <el-step></el-step>
    </el-steps>
    <el-card>
        <header>
            <!-- order_sn  member_username pay_type  source_type status 
                 order_typedelivery_company delivery_sn auto_confirm_day promotion_info   growth integration-->
        </header>
        <body>
            <el-descriptions title="基本信息" column="6" border="true">
                    <el-description-item label="订单编号">order_sn</el-description-item>
                    <el-description-item label="发货单流水号"></el-description-item>
                    <el-description-item label="用户账号">member_username</el-description-item>
                    <el-description-item label="支付方式">pay_type int </el-description-item>
                    <el-description-item label="订单来源">source_type int </el-description-item>
                    <el-description-item label="订单类型">order_type</el-description-item>
                    <el-description-item label="配送方式">order_typedelivery_company</el-description-item>
                    <el-description-item label="物流单号">delivery_sn</el-description-item>
                    <el-description-item label="自动确认收货时间">auto_confirm_day</el-description-item>
                    <el-description-item label="订单可得优币"> integration</el-description-item>
                    <el-description-item label="订单可得成长值">growth </el-description-item>
                    <el-description-item label="活动信息">promotion_info</el-description-item>
            </el-descriptions>
            <!-- receiver_post_code receiver_phone -->
            <el-descriptions title="基本信息" column="4" border="true">
                    <el-description-item label="收货人">receiver_name</el-description-item>
                    <el-description-item label="手机号码">receiver_phone</el-description-item>
                    <el-description-item label="邮政编号">receiver_post_code</el-description-item>
                    <el-description-item label="收获地址"></el-description-item>
            </el-descriptions>
            
            <el-descriptions title="商品信息" column="6" border="true">
                    <el-description-item label="商品图片" span=""></el-description-item>
                    <el-description-item label="商品名称" span=""></el-description-item>
                    <el-description-item label="价格/货号" span=""></el-description-item>
                    <el-description-item label="属性" span=""></el-description-item>
                    <el-description-item label="数量" span=""></el-description-item>
                    <el-description-item label="小计" span=""></el-description-item>
            </el-descriptions>
            <!-- integration_amount coupon_amount promotion_amount total_amount  pay_amount  freight_amount-->
            <el-descriptions title="费用信息" column="4" border="true">
                    <el-description-item label="商品合计" > </el-description-item>
                    <el-description-item label="运费" ></el-description-item>
                    <el-description-item label="优惠券" ></el-description-item>
                    <el-description-item label="积分抵扣"></el-description-item>
                    <el-description-item label="活动优惠" ></el-description-item>
                    <el-description-item label="抵扣金额" ></el-description-item>
                    <el-description-item label="订单总金额" ></el-description-item>
                    <el-description-item label="应付款金额" ></el-description-item>
            </el-descriptions>

            <el-descriptions title="费用信息" column="6" border="true">
                    <el-description-item label="操作者" >operate_man</el-description-item>
                    <el-description-item label="操作时间" >create_time</el-description-item>
                    <el-description-item label="订单状态" >create_time</el-description-item>
                    <el-description-item label="付款状态"></el-description-item>
                    <el-description-item label="发货状态" ></el-description-item>
                    <el-description-item label="备注" >note</el-description-item>
            </el-descriptions>
        </body>
    </el-card>
</template>