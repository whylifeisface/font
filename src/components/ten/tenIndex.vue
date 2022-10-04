<template>
    <el-card>
        <header>
            <div class="a">
                <div>
                    <el-icon><Search></Search></el-icon>筛选搜索
                </div>
                <div style="margin-left: auto;">
                    <el-button @click="res">重置</el-button>
                    <el-button type="primary" @click="sub">查询搜索</el-button>
                </div>
            </div>
            <el-form 
            label-width="120px"
            :model="formModel">
                <div >
                    <el-form-item label="优惠券名称"
                    ><el-input 
                    placeholder="优惠券名称" v-model="formModel.name"></el-input></el-form-item>
                </div>
                <div>
                    <el-form-item label="优惠券类型">
                        <el-select v-model="formModel.type" placeholder="优惠券类型"> 
                            <el-option v-for="(i,index) in option" :key="index" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
        </header>
    </el-card>
    <el-card  >
            <div class="a">
                <div >
                数据列表

            </div>
            
                <div style="margin-left: auto; " >
                    <el-button @click="this.$router.push('/tenForm')">添加</el-button> 
                </div>
            </div>
    </el-card>

    <el-table
    :key="bol"
    :data="tableData">
    <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="优惠券名称  "></el-table-column>
        <el-table-column prop="type" label="优惠券类型"></el-table-column>
        <el-table-column prop="useType" label="可使用商品"></el-table-column>
        <el-table-column prop="minPoint" label="使用门槛"></el-table-column>
        <el-table-column prop="amount" label="面值"></el-table-column>
        <el-table-column prop="platform" label="适用平台"></el-table-column>
        <el-table-column label="有效期">
            <!-- <template v-slot="scope"> -->
                    <!-- <el-input v-model="scope.row.startTime"></el-input> -->
                    <!-- {{}} 至{{scop.row.endTime}} -->
            <!-- </template> -->
            </el-table-column>
        <el-table-column label="状态">{{ dateTable > new Date(Date.parse(endTime)) ? "已过期":"未过期"}}</el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button text @click="check(scope.row)" type="primary">查看</el-button>
                <el-button text @click="edits(scope.row)" type="primary">编辑</el-button>
                <el-button text @click="del(scope.$index)" type="primary">删除</el-button>
                
            </template>
        </el-table-column>
    </el-table>
    <div class="a">
        <el-pagination layout="prev,next,pager" :toatl="total" 
        style="margin-left: auto;"></el-pagination>

    </div>
</template>
<script>
import { GetReq, PostReq } from '../axios/axios'
import { IntegerToString } from '../utils/integerToString'

let map = new Map()
    map.set(0,"全场赠券")
    map.set(1,"会员赠券")
    map.set(2,"购物赠券")
    map.set(3,"注册赠券")
let map1 = new Map()
map1.set(0,"全部")
map1.set(1,"移动")
map1.set(2,"PC")
let maps = new Map()
                maps.set("全场赠券",0)
                maps.set("会员赠券",1)
                maps.set("购物赠券",2)
                maps.set("注册赠券",3)

    export default{
        data() {
            return {
                tableData:[],
                formModel:{},
                option:['全场赠券','会员赠券','购物赠券','注册赠券'],
                dateTable:'',
                total:''
            }
        },
        created () {
            this.init()
        },
        methods: {
            init(){
              this.dateTable = new Date()
                GetReq('api/SmsCouponController/init?size=5&num=1').then(data => {
                    if (data.code == 200) {
                        for (let index = 0; index < data.data.list.length; index++) {
                            this.tableData.push(data.data.list[index])     
                                                 
                           this.tableData[index].platform = IntegerToString(
                                this.tableData[index].platform,map1
                            )  
                            this.tableData[index].type = IntegerToString(
                                this.tableData[index].type,map
                            )  
                        }
                        this.total = data.data.total
                    }
                })

            },
            edits(row){
                let Myquery =encodeURIComponent(JSON.stringify(row))
                console.log(Myquery);
                this.$router.push({
                    path:'/tenForm',
                    query:{allData:Myquery}
                })

            },
            check(row){
                    this.$router.push('/tenDes/' + row.id)
            },
            del(index){
                console.log(index);
                this.tableData.splice(index,1)
            },
            sub(){
                this.formModel.type = IntegerToString(this.formModel.type,maps)
                let json = JSON.stringify(
                    {   
                        "smsCoupon":this.formModel
                    }
                )

                PostReq('api/SmsCouponController/get' , json == {}? undefined:json).then(data => {
                if(data.code == 200){
                    for (let index = 0; index < data.data.length; index++) {
                        this.tableData.push(data.data[index])
                    }
                }

            })
        }
            },
        res(){
            this.formModel = {}
    }   


    }
</script>
<style >

    /* .el-form-item{
        width: calc(calc(100% / 2) - 0px);
			height: 50px; 
			display: flex; 
			flex-wrap: wrap;
    } */
    /* .el-form{
        display: flex;  
        flex-wrap: wrap;
    } */
    .el-input{
        width: 200px;
    }
</style>
<style scope
>
.a{
    display: flex;
    flex:1;
}
</style>