<template>
    <div>
        <el-card>
            <header>
                <div class="a">
                    <div>
                        <el-icon>
                            <Search></Search>
                        </el-icon>筛选搜索
                    </div>
                    <div class="b">
                        <el-button @click="formModel = {}">重置</el-button>
                        <el-button @click="search" type="primary">查询搜索</el-button>
                    </div>
                </div>
            </header>
            <el-form :model="formModel" class="sssss">
                <el-form-item label="专题名称">
                    <el-input v-model="formModel.subjectName" placeholder="专题名称"></el-input>
                </el-form-item>
                <el-form-item label="推荐状态">
                    <el-select v-model="formModel.recommendStatus" placeholder="全部">
                        <el-option v-for="(m,index) in option" :key="index" :label="m" :value="m"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
    <sonIndex @show="sho" mes="选择专题" :vs="visibility"></sonIndex>

    <el-table @selection-change="selectionchange" :data="tableData" :key="bol">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="subjectName" label="专题名称"></el-table-column>
        <el-table-column label="是否推荐">
            <template #default="scope">
                <el-switch v-model="tableData[scope.$index].recommendStatus"></el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button text @click="settin(scope.row,scope.$index)" type="primary">设置排序</el-button>
                <el-button text @click="del(scope.$index)" type="primary">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="a">
        <el-select v-model="batch" placeholder="批量操作">
            <el-option v-for="(o,index) in op" :key="index" :label="o" :value="o"></el-option>
        </el-select>
        <el-button @click="ess" type="primary">确定</el-button>
        <div class="b">
            <el-pagination layout="prev,next,pager" :total="total"></el-pagination>

        </div>
    </div>

    <el-dialog v-model="visible">
        <el-table :data="dataTable">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="title" label="专题名称"></el-table-column>
            <el-table-column prop="categoryName" label="所属分类"></el-table-column>
            <el-table-column prop="createTime" label="添加时间"></el-table-column>

        </el-table>
        <el-pagination layout="prev,next,pager" :total="taa"></el-pagination>
        <div class="a">
            <div class="b">
                <el-button @click="visible=false">取消</el-button>
                <el-button></el-button>
            </div>
        </div>
    </el-dialog>

    <el-dialog v-model="visibility" @close="model= {}">
        <el-form :model="model">
            <el-form-item label="排序">
                <el-input v-model="model.sort"></el-input>
            </el-form-item>
        </el-form>
        <div class="a">
            <div class="b">
                <el-button @click="visibility = false">取消</el-button>
                <el-button @click="ensure" type="primary">确定</el-button>
            </div>
        </div>


    </el-dialog>


</template>
<script>
import sonIndex from '@/components/son/sonIndex.vue'

import { GetReq, PostReq } from '../axios/axios'

export default {
    components: {
        sonIndex,
    },
    data() {
        return {
            op: ['设为推荐', '取消推荐', '删除'],
            tableData: [],
            total: 0,
            visible: false,
            dataTable: [],
            taa: 0,
            option: ['推荐中', '未推荐'],
            formModel: {},
            visibility: false,
            selectedData: [],
            model: {},
            bol: false,
            batch: ''
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            GetReq('api/SmsHomeRecommendSubjectController/init?num=1&size=5').then(data => {
                if (data.code == 200) {
                    for (let index = 0; index < data.data.list.length; index++) {
                        this.tableData.push(data.data.list[index])
                        this.tableData[index].status = this.tableData[index].recommendStatus == 0 ? "未推荐" : "推荐中"
                    }
                    this.total = data.data.total
                }
            })
        },
        settin(row, index) {
            this.visibility = true
            this.model.sort = row.sort
            this.model.index = index
        },
        sho(bo) {
            this.visible = bo
            GetReq('api/CmsSubjectController/init?num=1&size=5').then(data => {
                if (data.code == 200) {
                    for (let index = 0; index < data.data.list.length; index++) {
                        this.dataTable.push(data.data.list[index])
                    }
                    this.taa = data.data.total
                }
            })
        },
        ess() {
            if (this.batch)
                switch (this.batch) {
                    case "设置排序":
                        for (let index = 0; index < this.tableData.length; index++) {
                            for (let index = 0; index < this.selectedData.length; index++) {
                                if (this.tableData[index].id == this.selectedData[index].id && this.tableData[index].recommendStatus != 1) {
                                    this.tableData[index].recommendStatus = 1
                                    this.tableData[index].status = "推荐"
                                    this.bol = !this.bol
                                }
                            }
                        }
                        break;
                    case "取消推荐": {
                        for (let index = 0; index < this.tableData.length; index++) {
                            for (let index = 0; index < this.selectedData.length; index++) {
                                if (this.tableData[index].id == this.selectedData[index].id && this.tableData[index].recommendStatus != 0) {
                                    this.tableData[index].recommendStatus = 0
                                    this.tableData[index].status = "不推荐"
                                    this.bol = !this.bol
                                }
                            }
                        }
                        break;
                    }
                    case "删除": {
                        for (let index = 0; index < this.tableData.length; index++) {
                            for (let index = 0; index < this.selectedData.length; index++) {
                                if (this.tableData[index].id == this.selectedData[index].id) {
                                    this.del(index)
                                }
                            }
                            break;
                        }
                    }
                }
        },
        del(index) {
            this.tableData.splice(index, 1)
            PostReq()
        },
        ensure() {
            this.tableData[this.model.index].sort = this.model.sort
            this.bol = !this.bol
        },
        selectionchange(arr) {
            this.selectedData.length = 0
            for (let index = 0; index < arr.length; index++) {
                this.selectedData.push(arr[index])
            }
        },
        search() {
            this.tableData.length = 0
            let json = JSON.stringify({
                "smsHomeRecommendSubject": this.formModel
            })
            PostReq('/api/SmsHomeRecommendSubjectController/get', json == {} ? null : json).then(data => {
                if (data.code == 200) {
                    for (let index = 0; index < data.data.length; index++) {
                        this.tableData.push(data.data[index])
                        this.tableData[index].status = this.tableData[index].recommendStatus == 0 ? "未推荐" : "推荐中"

                    }
                }
            })
        }
    }
}

</script>
<style>
.a {
    display: flex;
    flex: 1;
}

.b {
    margin-left: auto;
}
</style>