<template>
  <div class="marleft">

  <el-form :model="formModel" ref="formRef" :rules="rule">
    <el-form-item prop="flashOrderOvertime" label="秒杀订单超過"
    >
      <el-input v-model="formModel.flashOrderOvertime"
      class="w-50 m-2">
        <template #append>
            <el-button disabled>分</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="normalOrderOvertime" label="正常訂單超過"
    >
      <el-input v-model="formModel.normalOrderOvertime"
      class="w-50 m-2">
        <template #append>
            <el-button disabled>分</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="confirmOvertime" label="發貨超過"
    >
      <el-input v-model="formModel.confirmOvertime"
      class="w-50 m-2">
        <template #append>
            <el-button disabled>天</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="finishOvertime" label="訂單完成超過"
    >
      <el-input v-model="formModel.finishOvertime"
      class="w-50 m-2">
        <template #append>
            <el-button disabled>天</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="commentOvertime" label="訂單完成超過"
    >
      <el-input v-model="formModel.commentOvertime"
      class="w-50 m-2">
        <template #append>
            <el-button disabled>天</el-button>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
</div>

  <el-button @click="sum(formRef)" type="primary">提交</el-button>
</template>
<script setup lang="ts">
import {onMounted, reactive,ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { GetReq } from '../../axios/axios'
  interface O {
    flashOrderOvertime:string
    ,normalOrderOvertime:string,
    confirmOvertime:string,
    finishOvertime:string,
    commentOvertime:string
  }
  onMounted(() => {
    init()
  })
const init = ()=> {
  GetReq('api/OmsOrderSettingController/get').then(data => {
    if (data.code == 200) {
        for (let index = 0; index <= 0; index++) {
          formModel.flashOrderOvertime = data.data[index].flashOrderOvertime
          formModel.normalOrderOvertime = data.data[index].normalOrderOvertime
          formModel.confirmOvertime = data.data[index].confirmOvertime
          formModel.finishOvertime = data.data[index].finishOvertime
          formModel.commentOvertime = data.data[index].commentOvertime

        }
    }
  })
}
let formModel = reactive({} as O)

const formRef = ref<FormInstance>()

const rule = reactive<FormRules>({
  flashOrderOvertime:[{required:true,message:'不能爲空',trigger:'change'}],
  normalOrderOvertime:[{required:true,message:'不能爲空',trigger:'change'}],
  confirmOvertime:[{required:true,message:'不能爲空',trigger:'change'}],
  finishOvertime:[{required:true,message:'不能爲空',trigger:'change'}],
  commentOvertime:[{required:true,message:'不能爲空',trigger:'change'}]
})

const sum = (FormE:FormInstance | undefined) => {
  if(!FormE) return;
    FormE.validate((valid: any,filed :any)=>{
      !valid ?console.log(filed): 
      
        GetReq('api/OmsOrderSettingController/insert',formModel).then(data => {
            if (data.code == 200) {
              console.log('success');
            }
      
    })
})
}

</script>
<style scoped>
  .marleft{
    margin-left: 100px;
  }
  .el-form-item{
    margin-bottom: 40px;
  }

</style>