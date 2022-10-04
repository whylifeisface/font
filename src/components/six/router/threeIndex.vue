<template>
    <el-form :model="model2">
        <el-form-item label="黄金会员"><el-input v-model="model2.input1"></el-input></el-form-item>
        <el-form-item label="白银会员"><el-input v-model="model2.input2"></el-input></el-form-item>
        <el-form-item label="钻石会员"><el-input v-model="model2.input3"></el-input></el-form-item>

    </el-form>
</template>
<script>
    export default {
        data() {
            return {
               model2:{
                input1:'',
                input2:'',
                input3:''
               }
            }
        },
    }
</script>