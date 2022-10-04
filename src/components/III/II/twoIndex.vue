<template>
    <el-tree
    ref="treeRef"
    show-checkbox
    node-key="id"
    :data="data"
    >
    <template #default="{ node }">
        <!-- <span class="custom-tree-node"> -->
            <div class="a">
                <div>
                    <span>{{ node.label }}</span>

                </div>
            </div>
            <!-- {{data}} -->
        <!-- </span> -->
      </template>
    </el-tree>
</template>
<script setup lang="ts">
import { ElTree } from 'element-plus';
import {useRoute} from 'vue-router'
import { ref ,onMounted } from 'vue'

let route = useRoute()
     const data = ref([ {
                   children:[
                    {label:'商品',id:"1",children:[{label:'商品列表',id:'1-1'},{label:'添加商品',id:'1-2'}
                    ,{label:'商品分类',id:'1-3'},{label:'商品类型',id:'1-4'},{label:'品牌管理',id:'1-5'}]},
                    {label:'订单',id:"2",children:[{label:'订单列表',id:'1-1'},{label:'订单设置',id:'1-1'},{label:'退货货申请',id:'1-1'},{label:'退货原因设置',id:'1-1'}]},
                    {label:'营销',id:"3",children:[{label:'秒杀活动列表',id:'1-1'},{label:'优惠券列表',id:'1-1'},
                    {label:'品牌推荐',id:'1-1'},{label:'新品推荐',id:'1-1'},{label:'人气推荐',id:'1-1'},{label:'专题推荐',id:'1-1'},{label:'广告列表',id:'1-1'}]},
                    {label:'权限',id:"4",children:[{label:'用户列表',id:'1-1'},
                    {label:'角色列表',id:'1-1'},{label:'菜单列表',id:'1-1'},{label:'资源列表',id:'1-1'}]},
                   ]
                } ])
 
                const  treeRef =ref<InstanceType<typeof ElTree>>()  
                onMounted(() => {
                  init()  
                })
                const init = ()=> {
                 let id =   route.params.id
                    treeRef.value!.setCheckedKeys([id],false)


                }
</script>
<style scoped>
    .a{
        display: flex;
        flex:1;
        width: 50px;
    }
</style>