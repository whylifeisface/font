<template>
    <el-card>
        <el-form-item>
            <span>数据列表</span>
            <div style="margin-left: auto;">
                <el-button @click="add">添加</el-button>
            </div>
        </el-form-item>
    </el-card>
    <el-table :data="tableData">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="pmsProduct.name" label="商品名称"></el-table-column>
        <el-table-column prop="pmsProduct.productSn" label="货号"></el-table-column>
        <el-table-column prop="pmsProduct.price" label="商品价格"></el-table-column>
        <el-table-column prop="pmsProduct.stock" label="剩余数量"></el-table-column>
        <el-table-column prop="flashPromotionPrice" label="秒杀价格"></el-table-column>
        <el-table-column prop="flashPromotionCount" label="秒杀数量"></el-table-column>
        <el-table-column prop="flashPromotionLimit" label="限购数量"></el-table-column>
        <el-table-column prop="pmsProduct.sort" label="排序"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button text @click="edit(scope.row)" type="primary">编辑</el-button>
                <el-button text @click="del(scope.$index)" type="primary">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="visible" @close="clo"> 
        <header>编辑秒杀商品信息</header>
        <el-form :model="FormModel">
            <el-form-item  label="商品名称">{{FormModel.pmsProduct.name}}</el-form-item>
            <el-form-item  label="货号">{{FormModel.pmsProduct.productSn}}</el-form-item>
            <el-form-item  label="商品价格">{{FormModel.pmsProduct.price}}</el-form-item>
            <el-form-item  label="秒杀价格">
                <el-input v-model="FormModel.flashPromotionPrice">
                    <template #prepend>
                        <el-button disabled >￥</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item  label="剩余数量">{{FormModel.pmsProduct.stock}}</el-form-item>
            <el-form-item  label="秒杀数量"><el-input v-model="FormModel.flashPromotionCount"></el-input></el-form-item>
            <el-form-item  label="限购数量"><el-input v-model="FormModel.flashPromotionLimit"></el-input></el-form-item>
            <el-form-item  label="排序"><el-input v-model="FormModel.sort"></el-input></el-form-item>
            <el-form-item>
                <div style="margin-left: auto;">
                    <el-button @click="visible = flase">取消</el-button>
                    <el-button >确定</el-button>

                </div>
            </el-form-item>
        </el-form>
        
    </el-dialog>
    <el-dialog v-model="visibility">
        <header>
            选择商品
        </header>
        <el-input placeholder="商品名称搜索">
            <template #append>
                <el-button disabled >
                    <el-icon><Search/></el-icon>
                </el-button>
            </template>
        </el-input>
        <el-table
        @selection-change="handleSelectionChange"
        :data="dat"
        ref="tableRef"
        >
            <el-table-column type="selection"></el-table-column>    
            <el-table-column prop="pmsProduct.name" label="商品名称"></el-table-column>
            <el-table-column prop="pmsProduct.productSn" label="货号"></el-table-column>
            <el-table-column prop="pmsProduct.price" label="价格"></el-table-column>
        </el-table>
        <el-pagination layout="prev,next,pager" :total="total"></el-pagination>
        <el-form-item>
            <div style="margin-left: auto;">
                <el-button @click="visibility = false" >取消</el-button>
                <el-button @click="ensure" >确定</el-button>
            </div>
        </el-form-item>
    </el-dialog>
</template>
<script>
import { GetReq } from '@/components/axios/axios';
import { twoObject } from '@/components/utils/twoObject';
import { ElMessage } from 'element-plus';

        export default{
            data() {
                return {
                    tableData:[],
                    FormModel:{},
                    visible:false,
                    visibility:false,
                    total:'',
                    tableRef:[],
                    dat:[]
                }
            },
            created () {
                this.init()
            },
            methods: {
                init(){
                    GetReq('api/SmsFlashPromotionProductRelationController/joinPmsProduct/  '+this.$route.params.id).then(data => {
                        if (data.code == 200) {
                            for (let index = 0; index < data.data.length; index++) {
                                this.tableData.push(data.data[index])
                            }
                            console.log(this.tableData);
                        }
                    })
                },
                handleSelectionChange(val){
                    this.tableRef = []
                    for (let index = 0; index < val.length; index++) {
                        this.tableRef.push(val[index])
                    }
                },
                add(){

                    this.visibility = true
                    if(this.dat.length != 0)return
                    GetReq('api/SmsFlashPromotionProductRelationController/twice').then(data => {
                        if (data.code == 200) {
                            for (let index = 0; index < data.data.length; index++) {
                                this.dat.push(data.data[index])
                            }
                            console.log(this.dat);
                        }
                    })
                },
                ensure(){
                    if (this.tableRef.length == 0) {
                        ElMessage.error({message:"请至少选择一条"})
                    }

                },
                edit(row){
                    this.visible = true
                    this.FormModel = twoObject(row,this.FormModel)
                },
                clo(){
                    this.FormModel = {}
                },
                del(index){
                    this.tableData.splice(index,1)
                }
            }
        }
</script>