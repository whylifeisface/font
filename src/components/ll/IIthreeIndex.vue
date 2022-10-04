<template>
    <el-card>
        <header>
            <div>
                <el-icon><Search></Search></el-icon>筛选搜索

            </div>
            <div>

                <el-button @click="this.formModel = {}">重置</el-button>
                <el-button @click="search">查询搜索</el-button>
            </div>
        </header>        
        <el-form :model="formModel">
            <el-form-item label="商品名称"><el-input v-model="formModel.productName" placeholder="商品名称"></el-input></el-form-item>
            <el-form-item label="推荐状态">
                <el-select v-model="formModel.recommendStatus" placeholder="全部">
                    <el-option v-for="(m,index) in op " :key="index" :label="m" :value="m">

                    </el-option>
                </el-select>
            </el-form-item>

        </el-form>

    </el-card>

    <el-table :data="tableData"
    @selection-change="selectionchange"
    :key="bol">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="productName" label="商品名称"></el-table-column>
        <el-table-column prop="recommendStatus" label="是否推荐">
            <el-switch v-model="tableData.recommendStatus" :active-value="0"></el-switch>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column  abel="操作">
                <template #default="scope">
                    <el-button text v-on:click="sort(scope.row,scope.$index)">设置排序</el-button>
                    <el-button text v-on:click="del(scope.$index)">删除</el-button>
                </template>
        </el-table-column>
    </el-table>
    <div>
        <div>
            <el-select v-model="batch" placeholder="批量操作">
                <el-option v-for="(o,index) in option" :key="index" :label="o" :value="o"></el-option>
            </el-select>
            <el-button @click="ensure">确定</el-button>
        </div>
        <div>
            <el-pagination layout="prev, pager, next" :total="total"></el-pagination>
        </div>
    </div>
<el-dialog v-model="visible" @close="dialogForm = {}">
    <header>设置排序</header>
    <el-form :model="dialogForm">
        <el-form-item label="排序"><el-input v-model="dialogForm.sort"></el-input></el-form-item>
        <el-form-item>
            <el-button @click="visible=false">取消</el-button>
            <el-button @click="en">确定</el-button>

        </el-form-item>
    </el-form>
</el-dialog>
<sonIndex :visi = "visibility" @show=" sho"></sonIndex>
<el-dialog v-model="visibility"
@close="dataTbale.length = 0">
    <header>
            选择商品
    </header>
    <el-input v-model="input" placeholder="商品名称搜索">
        <template #append>
            <el-button disibled><el-icon><Search></Search></el-icon></el-button>
        </template>
    </el-input>

    <el-table :data="dataTbale">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="pmsProduct.name" label="商品名称"></el-table-column>
        <el-table-column prop="pmsProduct.productSn" label="货号"></el-table-column>
        <el-table-column prop="pmsProduct.price" label="价格"></el-table-column>
    </el-table>
    <el-pagination layout="prev,pager,next" :total="ti"></el-pagination>
    <el-button @click="visibility=false">取消</el-button>
    <el-button type="primary">确定</el-button>
</el-dialog>

</template>
<script>
import { PostReq,GetReq } from '../axios/axios'
import sonIndex from '@/components/son/sonIndex.vue'
    export default{
        comonpents:{sonIndex}
        ,
        data(){
            return{
                bol:false,
                tableData:[],
                total:0,
                op:['未推荐',"推荐中"],
                option:['设为推荐','取消推荐','删除'],
                batch:'',
                visible:false,
                formModel:{},
                selection:[],
                dialogForm:{},
                ti:0,
                dataTbale:[],
                visibility:false
            }
        },
        created () {
            // this.init()
        },
        methods: {
            init(){
                GetReq('api/SmsHomeNewProductController/init?num=1&size=5').then(data => {
                    if (data.code == 200) {
                        for (let index = 0; index < data.data.lits.length; index++) {
                            this.tableData.push(data.data.list[index])
                            this.tableData[index].status = this.tableData[index].recommendStatus == 0? "未推荐":"推荐中"
                        }
                        this.total = data.data.total
                    }
                })
            }

            ,
            sho(bo){
                this.visibility = bo;
                 GetReq('api/SmsHomeRecommendProductController/sql').then(data => {
                if (data.code == 200) {
                    for (let index = 0; index < data.data.length; index++) {
                        this.dataTbale.push(data.data[index])
                    }
                }
            })
            },
            sort(row,index){
              this.dialogForm.sort =  row.sort
              this.dialogForm.index = index
              this.visible = true
            },
            del(index){
                this.tableData.splice(index,1)
                PostReq('api/SmsHomeNewProductController/del'+index).then(data => {
                    if (data.code == 200) {
                        console.log();
                    }
                })
            }
            ,
            ensure(){
                switch(this.batch){
                    case "设为推荐":{
                        for (let index = 0; index < this.dataTbale.length; index++) {
                            for (let aa = 0; aa < this.tableData.length; aa++) {
                                if (this.dataTbale[index].id == this.tableData[aa].id && this.tableData[aa].recommendStatus !=1) {
                                    this.tableData[aa].recommendStatus = 1
                                    this.tableData[aa].status = "推荐"
                                }
                            }                            
                        }
                        
                        break;}
                    case "取消推荐":{
                        for (let index = 0; index < this.dataTbale.length; index++) {
                            for (let aa = 0; aa < this.tableData.length; aa++) {
                                if (this.dataTbale[index].id == this.tableData[aa].id && this.tableData[aa].recommendStatus !=0) {
                                    this.tableData[aa].recommendStatus = 0
                                    this.tableData[aa].status = "不推荐"
                                }
                            }                            
                        }

                        break;
                    }
                    case "删除":{
                        for (let index = 0; index < this.dataTbale.length; index++) {
                            for (let aa = 0; aa < this.tableData.length; aa++) {
                                if (this.dataTbale[index].id == this.tableData[aa].id ) {
                                    this.del(aa)
                                }
                            }                            
                        }
                        break;}
                }
            },
            selectionchange(arr){
                this.selection.length = 0
                for (let index = 0; index < arr.length; index++) {
                    this.selection.push(arr[index])
                }
            },
            en(){
                if(
                this.tableData[this.dialogForm.index].sort == this.dialogForm.sort
                )
                return
                this.tableData[this.dialogForm.index].sort = this.dialogForm.sort;
                this.visible = false
                PostReq('api/SmsHomeNewProductController/update',JSON.stringify({
                    "smsHomeNewProduct":{
                        "sort":this.dialogForm.sort
                    }
                })).then(data => {
                    if (data.code == 200) {
                        console.log();
                    }
                })
            },
            search(){
                if(this.formModel == {}) return
                let json = JSON.stringify({
                    "smsHomeNewProduct":this.formModel
                })
                PostReq('api/SmsHomeNewProductController/get',json=={}?null:json ).then(data => {
                    if (data.code == 200) {
                        for (let index = 0; index < data.data.length; index++) {
                            this.tableData.push(data.data[index])
                            this.tableData[index].status = this.tableData[index].recommendStatus == 0? "未推荐":"推荐中"
                        }
                    }
                })
            }

        }

    }
</script>
<style>
    .a{
        display: flex;
        flex: 1;
    }
    .b{
        margin-left: auto;
    }
</style>