<template>

    <el-card>
        <div class="a">

            <el-icon>
                <Search></Search>
            </el-icon>
            <span>
                筛选搜索
            </span>
            <div class="b">
                <el-button type="primary" @click="searchBtn">查询结果</el-button>
            </div>
        </div>
        <div class="a sssss">
            <el-form-item label="输入搜索">
                <el-input v-model="search" placeholder="品牌名称/关键词" />

            </el-form-item>
        </div>
    </el-card>


    <SonIndex mes="添加" @show="sho"></SonIndex>
    <el-table :data="table" @selection-change="atSelection">
        <el-table-column type="selection" width="55" />
        <!-- 编号 品牌名称 品牌首字母 排序 品牌制造商 是否显示 相关 操作 -->
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="name" label="品牌名称"></el-table-column>
        <el-table-column prop="firstLetter" label="品牌首字母"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="factoryStatus" label="品牌制造商">
            <template #default="scope">
                <el-switch v-model="table[scope.$index].factoryStatus" />
            </template>
        </el-table-column>
        <el-table-column prop="showStatus" label="是否显示">
            <template #default="scope">
                <el-switch v-model="table[scope.$index].showStatus" />
            </template>
        </el-table-column>
        <el-table-column prop="" label="相关"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button @click="edit(scope.row)">编辑</el-button>
                <el-button type="danger" @click="del(scope.$index)">删除</el-button>
            </template>
        </el-table-column>

    </el-table>

    <div class="a">
        <div>
            <el-select v-model="select">
                <el-option v-for="(o,index) in option" :key="index" :label="o" :value="o"></el-option>
            </el-select>
    <el-button type="primary" @click="consure">确定</el-button>

        </div>
        <div class="b">
            <el-pagination layout="prev, pager, next" background :total="total" v-model:currentpage="nowpage"
            @current-change="pagechange" />
        </div>

    </div>
    <MyDialogIndex  :visible="visible"  @show="en"/>

</template>
<script>
import { GetReq } from '../axios/axios';
import MyDialogIndex from '../son/myDialogIndex.vue';
import SonIndex from '../son/sonIndex.vue';
// import FormItem from '@/components/three/form/FormItem.vue'

export default {
    data() {
        return {
            search: "",
            select: "",
            table: [],
            nowpage: "1",
            total: "",
            visible:false,
            bol: false,
            multipleSelection: [],
            option: ["显示品牌", "隐藏品牌"]
        };
    },
    mounted() {
        this.Load();
    },
    methods: {
        edit(row) {
            console.log(row);
            this.bol = true;
            let object = JSON.stringify(row);
            this.$router.push({
                path: "/threeForm/",
                query: {
                    dta: encodeURIComponent(object)
                }
            });
        },
       async del(index) {

            this.visible = true
            GetReq("api/pmsBrandController/delete" + index + "", null).then(function (data) {
                if (data.code == 200) {
                    this.table.splice(index, 1);
                }
            });
        },
        Load() {
            GetReq("api/pmsBrandController/page?num=10&size=" + this.nowpage + "", null).then(function (data) {
                if (data.code == 200) {
                    console.log(data.data);
                    for (let index = 0; index < data.data.length; index++) {
                        this.table.push(data.data[index]);
                    }
                }
            }.bind(this));
            GetReq("api/pmsBrandController/get", null).then(function (data) {
                if (data.code == 200) {
                    console.log(data.data);
                    this.total = data.data;
                }
            }.bind(this));
        },
        pagechange(newpage) {
            GetReq("api/pmsBrandController/page?num=10&size=" + newpage + "", null).then(function (data) {
                if (200 == data.code) {
                    this.table.length = 0;
                    //threeIndex.vue?8551:67 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'table')
                    for (let index = 0; index < data.data.length; index++) {
                        this.table.push(data.data[index]);
                    }
                }
            }.bind(this));
        },
        atSelection(selection) {
            this.multipleSelection.clearSelection();
            for (let index = 0; index < selection.length; index++) {
                this.multipleSelection.push(selection[index]);
            }
        },
        consure() {
            switch (this.select) {
                case "显示品牌": {
                    for (let index = 0; index < this.table.length; index++) {
                        for (let aa = 0; aa < this.multipleSelection.length; aa++) {
                            if (this.table[index].id == this.multipleSelection[aa].id && this.table[index].showStatus != 1) {
                                this.table[index].showStatus = 1;
                            }
                        }
                    }
                    break;
                }
                case "隐藏品牌": {
                    for (let index = 0; index < this.table.length; index++) {
                        for (let aa = 0; aa < this.multipleSelection.length; aa++) {
                            if (this.table[index].id == this.multipleSelection[aa].id && this.table[index].showStatus != 0) {
                                this.table[index].showStatus = 0;
                            }
                        }
                    }
                    break;
                }
            }
        },
        searchBtn() {
            GetReq("api/pmsBrandController/byName?name=" + this.search + "").then(function (data) {
                if (data.code == 200) {
                    this.table.length = 0;
                    for (let index = 0; index < data.data.length; index++) {
                        this.table.push(data.data[index]);
                    }
                }
            }.bind(this));
        },
        en(){
        },
        sho(){
                this.$router.push('/threeForm')
        }

    },
    components: { MyDialogIndex, SonIndex }
}
</script>
<style>

    /* .ss{
        margin-left: 100px;
    } */
</style>