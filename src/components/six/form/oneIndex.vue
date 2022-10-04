<template>
    <el-form ref="formRef" :rules="rule" :Model="FormModel">
        <el-form-item prop="productCategoryName" label="商品分类:">
            <el-cascader v-model="FormModel.productCategoryName" :options="option" placeholder="请选择" @visible-change="change0"/>
        </el-form-item>
        <el-form-item prop="name" label="商品名称：">
            <el-input v-model="FormModel.name" placeholder=""/>
        </el-form-item>
        <el-form-item  prop="subTitle" label="副标题：">
            <el-input v-model="FormModel.subTitle" placeholder=""/>

        </el-form-item>
        <el-form-item prop="brandName" label="商品品牌：">
            <el-select v-model="FormModel.brandName" placeholder="请选择" @visible-change="change1">
                <el-option v-for="(item,index) in optio" :key="index" :value="item.name" :label="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="description" label="商品介绍：">
            <el-input v-model="FormModel.description" placeholder="请输入商品内容" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"/>

        </el-form-item>
        <el-form-item prop="productSn" label="商品货号：">
            <el-input v-model="FormModel.productSn" placeholder=""/>

        </el-form-item>
        <el-form-item prop="price" label="商品售价：">
            <el-input v-model="FormModel.price" placeholder=""/>

        </el-form-item>
        <el-form-item prop="originalPrice" label="市场价：">
            <el-input v-model="FormModel.originalPrice" placeholder=""/>

        </el-form-item>
        <el-form-item prop="stock" label="商品库存：">
            <el-input v-model="FormModel.stock" placeholder=""/>

        </el-form-item>
        <el-form-item prop="unit" label="计量单位">
            <el-input v-model="FormModel.unit " placeholder=""/>克

        </el-form-item>
        <el-form-item prop="weight" label="商品重量：">
            <el-input v-model="FormModel.weight" placeholder=""/>

        </el-form-item>
        <el-form-item prop="sort" label="排序">
            <el-input v-model="FormModel.sort" placeholder=""/>
        </el-form-item>
    </el-form>
        <el-button @click="click">提交</el-button>
</template>
<script setup lang="ts">
import { GetReq } from '@/components/axios/axios';
import { FormInstance, FormRules } from 'element-plus';
import { ref,reactive, onMounted } from 'vue'
import {useRoute} from 'vue-router'
import {AB} from '@/components/interface/pmsInterface'
import { useStore } from 'vuex';
import {store} from '@/components/vuex/vuex'
const stor = useStore() || store

    const route = useRoute()
        interface ch {
            value:string,
            label:string
        }
        const FormModel = reactive({
            productCategoryName:'',
            name:'',
            subTitle:'',
            brandName:''
            ,description:'',
            productSn:'',
            price:'0',
            originalPrice:'0',
            stock:'0',
            unit:'0',
            weight:'',
            sort:'0'
        } as AB)
    
        const formRef = ref<FormInstance>()
    
        const rule = reactive<FormRules>({
            productCategoryName:[{
                required:true,message:'请选择商品分类',trigger:'change'
            }],
            name:[{
                required:true,message:'请选择商品名称',trigger:'change'
            }],
            subTitle:[{
                required:true,message:'请选择商品副标题',trigger:'change'
            }]
            ,       
             brandName:[{
                required:true,message:'请选择商品品牌',trigger:'change'
            }]
        })
    
        let option = ref([])
        let optio = ref([] as any)

        onMounted(() => {
          init()  
        })
       const init = () => {
       let id = route.params.id 
       GetReq('api/PmsProductController/get/'+ id).then(data => {
            if (data.code == 200) {
                // console.log(data.data);
                
                // console.log("11111111---------");
                
                console.log(data.data.productCategoryName);
                
                FormModel.name = data.data.name
                FormModel.productCategoryName = data.data.productCategoryName
                FormModel.subTitle = data.data.subTitle
                FormModel.brandName = data.data.brandName
                FormModel.description = data.data.description
                FormModel.productSn = data.data.productSn
                FormModel.originalPrice = data.data.originalPrice
                FormModel.stock = data.data.stock
                FormModel.unit = data.data.unit
                FormModel.weight = data.data.weight
                FormModel.sort = data.data.sort
            }
       })
       }    
    
        let children:ch[]
    
        const change0 = (bol:Boolean)=>{
            if (bol==true && option.value.length==0) {
                GetReq('api/PmsProductCategoryController/linInId').then(data=>{
            if (data.code == 200) {
                console.log(data.data);
                            option.value = data.data.map(
                                (i:{name:string,children:[{name:string}]}) =>{
                                    children = i.children.map(
                                        (s:{name:string}) => {
                                            return {label:s.name,value:s.name}
                                        }
                                    )
                                return {label:i.name,value:i.name,children:children}

                                })
                            }
                            })
                            console.log(option);
                
            }
        }
        const click = () => {

            stor.commit('vuexStore/setone',FormModel)
        }
        const change1 = (bol:Boolean)=>{
            if (bol==true && optio.value.length == 0 ) {
                            GetReq('api/pmsBrandController/listAll').then(data=>{
                if (data.code == 200) {
                    console.log(data.data);
                    optio.value = data.data
                    // for (let index = 0; index < data.data.length; index++) {
                    //         optio.value.push(data.data[index].name)
                    // }
                    console.log(optio.value);
                    
                }
            }
        )}
    }

    
    </script>