<template>
    <el-card>
        <header>
            <div class="a">
                <el-icon><Search></Search></el-icon>筛选搜索
                <div class="b">
                    <el-button @click="res">重置</el-button>
                    <el-button @click="sub" type="primary">查询列表</el-button>
                </div>
            </div>
        </header>
        <el-form :model="formModel" class="sssss">
            <el-form-item label="品牌名称">
                <el-input v-model="formModel.brandName"></el-input>
            </el-form-item>
            <el-form-item label="推荐状态">
                <el-select v-model="formModel.status" placeholder="全部">
                    <el-option v-for="(o,index) in option" :key="index" :label="o" :value="o"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card>
        <div class="a">
            <div>
                <el-icon></el-icon>数据列表 
            </div>
            <div class="b">
                <el-button @click="sel">选择品牌</el-button>
            </div>
        </div>
    </el-card>
    <el-table :data="tableData"
    :key="bol"
    @selection-change="handleSelectionChange"
    >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="编号" prop="id"></el-table-column>
        <el-table-column label="品牌名称" prop="brandName"></el-table-column>
        <el-table-column label="是否推荐" prop="recommendStatus">
            <template #default="scope">
                <el-switch v-model="tableData[scope.$index].recommendStatus" :active-value="1"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="排序" prop="sort"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="操作" >
            <template #default="scope">
                <el-button text @click="editSort(scope.row,scope.$index)" type="primary">编辑排序</el-button>
                <el-button text @click="del(scope.$index)" type="primary">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="a">
        <div>
            <el-select v-model="batch" placeholder="批量操作">
                <el-option v-for="(o,index) in option1" :key="index" :label="o" :value="o"></el-option>
            </el-select>
            <el-button @click="ensure">确定</el-button>
        </div>
        <div class="b">
            <el-pagination layout="prev,next,pager" :total="total" @current-change="chagepage"></el-pagination>
        </div>
    </div>
   <el-dialog v-model="visible"
    @close="ob = {}"
   >
    <el-form :model="form">
        <el-form-item label="排序">
            <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="visible = flase" >取消</el-button>
            <el-button @click="en" type="primary">确认</el-button>
        </el-form-item>
    </el-form>
</el-dialog>

<el-dialog v-model="visibility">
    <header>
        <div>
            选择品牌
        </div>
        <div class="a">
            <el-input v-model="input" placeholder="品牌名称搜索">
                <template #append>
                    <el-button @click="searchData"><el-icon><Search></Search></el-icon> </el-button>
                </template>
            </el-input>
        </div>
    </header>

    <el-table
    :data="dataTable"
    @select-change="elechange">
    <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="品牌名称"></el-table-column>
        <el-table-column label="相关">
            <template #default="scope">
                商品:{{scope.row.productCount}}
                评价:{{scope.row.productCommentCount}}
            </template>
        </el-table-column>
    </el-table>
    <el-pagination layout="prev,pager,next" :total="totalV" @current-change="currentchage"></el-pagination>

</el-dialog>
</template>
<script>
import { GetReq, PostReq } from '../axios/axios';
import { IntegerToString } from '../utils/integerToString';
let map = new Map()
map.set("推荐中",1)
map.set("未推荐",0)
export default{
        data() {
            return {
                elechange:[],
                dataTable:[],
                input:'',
                formModel:{},
                tableData:[],
                bol:false,
                batch:'',
                tableSelected:[],
                total:0,
                option:['未推荐','推荐中'],
                option1:['设为推荐','取消推荐','删除'],
                ob:{},
                form:{},
                visible:false,
                visibility:false,
                totalV:0
            }
        },
        created(){
            this.init()
        },
        methods: {
            init(){
                GetReq('api/SmsHomeBrandController/init?num=1&size=5').then(data => {
                    if(data.code == 200){
                        for (let index = 0; index < data.data.list.length; index++) {
                            this.tableData.push(data.data.list[index])
                            this.tableData[index].status = data.data.recommendStatus ==0? "推荐中":"未推荐";
                        }
                        this.total = data.data.total
                    }
                })
            },
            res(){
                this.formModel = {}
            },
            sub(){

                this.tableData.length = 0
                this.formModel.status = IntegerToString(this.formModel.status,map)
                let json = JSON.stringify({
                    smsHomeBrand:{
                        brandName:this.formModel.brandName,
                        recommendStatus:this.formModel.status
                    }
                })
                PostReq('api/SmsHomeBrandController/form',json=={}?null:json).then(data => {
                    if(data.code == 200){
                        for (let index = 0; index < data.data.length; index++) {
                            this.tableData.push(data.data[index])
                            this.tableData[index].status = data.data.recommendStatus ==0? "推荐中":"未推荐";
                        }
                    }
                })
            },
            ensure(){
                if(this.batch == " ")return
                switch(this.batch){
                    case "设为推荐":{
                        for (let index = 0; index < this.tableData.length; index++) {
                                for (let ia = 0; ia < this.tableSelected.length; ia++) {

                                        if (this.tableData[index].id == this.tableSelected[ia].id && this.tableData[index].recommendStatus != 1) {
                                            this.tableData[index].recommendStatus = 1
                                            this.tableData[index].status = "推荐"
                                            this.bol = !this.bol
                                        }
                                }                            
                        }
                        break;
                    }
                    case "取消推荐":{
                        console.log("22222");

                        for (let index = 0; index < this.tableData.length; index++) {
                                for (let ia = 0; ia < this.tableSelected.length; ia++) {
                                        if (this.tableData[index].id == this.tableSelected[ia].id && this.tableData[index].recommendStatus == 1) {
                                            this.tableData[index].recommendStatus = 0
                                            this.tableData[index].status = "不推荐"
                                            this.bol = !this.bol
                                        }
                                }
                            }                    
                        break;
                    }
                    case "删除":{
                        for (let index = 0; index < this.tableData.length; index++) {
                                for (let ia = 0; ia < this.tableSelected.length; ia++) {
                                        if (this.tableData[index].id == this.tableSelected[ia].id) {
                                            this.del(index)
                                        }
                                }
                            }             
                        break;
                    }
                }
            },
            handleSelectionChange(val){
                console.log("----------");
                console.log(val);
                this.tableSelected.length = 0
                for (let index = 0; index < val.length; index++) {
                        this.tableSelected.push(val[index])
                }

            },
            chagepage(now){
                this.tableData = []
                GetReq('api/SmsHomeBrandController/init?size=5&num='+now+'').then(data => {
                    if(data.code == 200){
                        for (let index = 0; index < data.data.list.length; index++) {
                            this.tableData.push(data.data.list[index])
                        }
                    }
                })
            },
            editSort(row,index){
                console.log(row);
                this.form.sort = row.sort
                this.form.index = index
                this.visible = true
                PostReq('api/SmsHomeBrandController/update',JSON.stringify({sort:this.form.sort})).then(data => {
                    if (data.code == 200) {
                        console.log();
                        }
                })
            },
            del(index){
                        console.log(index);
                        this.tableData.splice(index,1)
                        PostReq('api/SmsHomeBrandController/'+index).then(data => {
                            if (data.code == 200) {
                                console.log();
                            }
                        })
            },
            en(){
                this.bol = !this.bol
                this.tableData[this.form.index].sort = this.form.sort
                this.visible = false
            },
            sel(){
                this.visibility = true
                GetReq('api/pmsBrandController/visibility?num=1&size=5').then(data => {
                    if (data.code == 200) {
                        for (let index = 0; index < data.data.list.length; index++) {
                            this.dataTable.push(data.data.list[index])
                        }
                        this.totalV = data.data.total
                    }
                })
            },
            currentchage(now){
                this.tableData.length = 0
                GetReq('api/pmsBrandController/visibility?size=5&num='+now).then(data => {
                    if (data.code == 200) {
                        for (let index = 0; index < data.data.list.length; index++) {
                            this.dataTable.push(data.data.list[index])
                        }
                        this.totalV = data.data.total
                    }
                })
            },
            searchData(){
                if (this.input == undefined) return

                let json = JSON.stringify({"name":this.input})
                PostReq('api/pmsBrandController/search',json).then(data => {
                    if (data.code == 200) {
                        for (let index = 0; index < data.data.length; index++) {
                            this.tableData.push(data.data[index])
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