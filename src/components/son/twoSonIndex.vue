<template>
    <el-card>
        <header>
                <div class="a">
                    <div>
                        <el-icon><Search></Search></el-icon>筛选搜索
                    </div>            
                        <div class="b">
                        <el-button @click="res">重置</el-button>
                        <el-button type="primary" @click="search">查询搜索</el-button>
                    </div>
                </div>
        </header>
            <slot></slot>
    </el-card>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        methods: {
            search(){
                this.$emit("sear")
            },
            res(){
                this.$emit("rese")
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