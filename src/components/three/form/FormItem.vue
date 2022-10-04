<template>
    <div>


                <!-- 编号 品牌名称 品牌首字母 排序 品牌制造商 是否显示 相关 操作 -->
        <el-form ref="ruleFormRef" :model="formModel" 
        size="default"
        :rules="rule">
            <el-form-item label="品牌名称" prop="name">
                <el-input v-model="formModel.name"  placeholder="请输入内容"/>
            </el-form-item>

            <el-form-item label="品牌首字母" prop="firstLetter">
                <el-input placeholder="请输入内容" v-model="formModel.firstLetter"/>
            </el-form-item>

            <el-form-item label="品牌LOGO" prop="logo">
                <el-upload 
                v-model:file-list="fileList"
                @http-request="httprequest"
                list-type="picture-card"
                >
                <el-icon><Plus /></el-icon>
                    <el-button type="primary" >点击上传</el-button>
                        <template #tip>
                            <div class="el-upload__tip">
                            只能上传jpg/png文件,且不超过10MB
                            </div>
                        </template>
            </el-upload>
            </el-form-item>   

            <el-form-item label="品牌专区大图" prop="about">

                <el-button type="primary" >点击上传</el-button>

                <el-upload 
                v-model:file-list="ListFile"
                @http-request="requsethttp"
                list-type="picture-card"
                >
                <el-icon><Plus /></el-icon>
                        <template #tip>
                            <div class="el-upload__tip">
                            只能上传jpg/png文件,且不超过10MB
                            </div>
                        </template>
            </el-upload>
            </el-form-item>

            <el-form-item label="品牌故事" prop="gushi">
                <el-input placeholder="请输入内容" />
            </el-form-item>

            <el-form-item label="排序" prop="sort">
                <el-input placeholder="请输入内容" v-model="formModel.sort"/>
            </el-form-item>

            <el-form-item label="是否显示" prop="showStatus">
                <div>
                    <el-radio-group v-model="formModel.showStatus">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </div>
            </el-form-item>

            <el-form-item label="品牌制造商" prop="factoryStatus">
                <el-radio-group v-model="formModel.factoryStatus">
                    <el-radio :label="1"></el-radio>
                    <el-radio :label="0"></el-radio>
                </el-radio-group>
            </el-form-item>  

        </el-form>
        <el-button type="primary" @click="sub(ruleFormRef)">提交</el-button>
        
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref ,toRefs} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute } from 'vue-router';

const props = defineProps({
    dat: Object
});
let route = useRoute();
interface ob {
        id:'',
                    name:'',
                    firstLetter:'',
                    sort:'',
                    factoryStatus:'',
                    showStatus:'',
                    logo:'',
                    gushi:'',
                    about:''
}

const {dat} = toRefs(props)
// props: ['dat']
const ruleFormRef = ref<FormInstance>()

let formModel: ob = reactive({
                    id:'',
                    name:'',
                    firstLetter:'',
                    sort:'',
                    factoryStatus:'',
                    showStatus:'',
                    logo:'',
                    gushi:'',
                    about:''
                })
const Load = () => {  
    console.log("-------------");
    console.log(dat);
    console.log("===========");
    
    console.log(route.query.dta);
    
    if(route.query.dta){
      let json = decodeURIComponent(route.query.dta as string)
    console.log(JSON.parse(json));
    let dta = JSON.parse(json)
      formModel.id = dta.id
      formModel.name = dta.name
      formModel.firstLetter = dta.firstLetter
      formModel.sort = dta.sort
      formModel.factoryStatus = dta.factoryStatus
      formModel.showStatus = dta.showStatus
      formModel.logo = dta.logo
      formModel.gushi = dta.gushi
      formModel.about = dta.about

    }
}

const  rule =reactive<FormRules>({
                    id:[{required:true,message:'非空',trigger:'blur'}],
                    name:[{required:true,message:'非空',trigger:'change'}],
                    firstLetter:[{required:true,message:'非空',trigger:'change'}],
                    sort:[{required:true,message:'非空',trigger:'change'}],
                    factoryStatus:[{required:true,message:'非空',trigger:'blur'}],
                    showStatus:[{required:true,message:'非空',trigger:'blur'}]
                })
const fileList = ref([] as any)

const httprequest = (option: any)=>{
    console.log(option);
    fileList.value.push(option)
}

    
const ListFile = ref([] as any)

const requsethttp =  (option: any) =>
{
    console.log(option);
    fileList.value.push(option)
}

const sub = async  (instance: FormInstance | undefined)=>{
    if(!instance){return;}

    console.log(instance);
    await  instance.validate((valid,field) => {
        if(valid){
            console.log("submit");
            
        }else{
            console.log("error");
            console.log(field)
            return false;
            
        }
    })
    
}

onMounted(() => {
    Load()
})
</script>