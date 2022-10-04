<template>
    <el-form :model="model1"> 
        <el-form-item label="开始时间">
            <el-date-picker
            v-model="model1.promotionStartTime"
            type="date"
            placeholder="选择开始时间"
            size="small"
      />

        </el-form-item>   
        <el-form-item label="结束时间">
            <el-date-picker
            v-model="model1.promotionEndTime"
            type="date"
            placeholder="选择结束时间"
            size="small"
      />
        </el-form-item> 
        <el-form-item label="促销价格">
            <el-input v-model="model1.promotionPrice" placeholder="输入促销价格">
            </el-input>
        </el-form-item>
    </el-form>
    <!-- <el-button type="primary" @="">确定</el-button> -->
</template>
<script>
    export default {
        data() {
            return {
                model1:{
                    promotionStartTime:'',
                    promotionEndTime:'',
                    promotionPrice:''
                }
            }
        },
        mounted() {
            this.$emit('getIndex', this.model1)
        },
    }
</script>
