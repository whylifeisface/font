<template>
    <div>


        <el-scrollbar>
                    <el-menu :collapse="isCollapse " router default-active="1" class="el-menu-vertical-demo">
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon>
                                    <HomeFilled />
                                </el-icon>
                                <span>商品</span>
                            </template>
                            <!-- 商品列表','添加商品','商品分类','商品类型','品牌管理 -->
                            <el-menu-item index="/five">商品列表</el-menu-item>
                            <el-menu-item index="/six/0">添加商品</el-menu-item>
                            <el-menu-item index="/one">商品分类</el-menu-item>
                            <el-menu-item index="/wto">商品类型</el-menu-item>
                            <el-menu-item index="/three">品牌管理</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon>
                                    <Shop />
                                </el-icon>
                                <span>订单</span>
                            </template>
                            <el-menu-item index="/seven">订单列表</el-menu-item>
                            <el-menu-item index="/seventwo">订单设置</el-menu-item>
                            <el-menu-item index="/seventhree">退换货申请</el-menu-item>
                            <el-menu-item index="/sevenfourfourIndex">退换货原因设置</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon>
                                    <Document />
                                </el-icon>
                                <span>营销</span>
                            </template>
                            <el-menu-item index="/ni">秒杀活动列表</el-menu-item>
                            <el-menu-item index="/tenIndex">优惠券列表</el-menu-item>
                            <el-menu-item index="/llIndex">品牌列表</el-menu-item>
                            <el-menu-item index="/LLtwoIndex">新品推荐</el-menu-item>
                            <el-menu-item index="/forIndex">专题推荐</el-menu-item>
                            <el-menu-item index="/fiv">广告列表</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="4">
                            <template #title>
                                <el-icon>
                                    <Picture />
                                </el-icon>
                                <span>权限</span>
                            </template>
                            <el-menu-item index="/oneIndex">用户列表</el-menu-item>
                            <el-menu-item index="/twoIndexs">角色列表</el-menu-item>
                            <el-menu-item index="/oi">菜单列表</el-menu-item>
                            <el-menu-item index="/ri">资源列表</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-scrollbar>


    </div>
</template>

<script setup lang="ts"> import { ref, watch } from 'vue'
let props = defineProps(['isCollapse'])

let isCollapse = ref(Boolean)

watch(
    ()=>props.isCollapse
    ,()=>{
        isCollapse.value = props.isCollapse
    }
)

</script>

<style scoped>

</style>