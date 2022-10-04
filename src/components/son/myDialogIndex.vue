<template>
    <div>
        <el-dialog v-model="visible">
            <el-card>
                <template #header>提示</template>
                <div>
                    {{mes}}
                </div>
                <div class="a">
                    <div class="b">
                        <el-button @click="visible = false">取消</el-button>
                        <el-button @click="en" type="primary">确认</el-button>
                    </div>
                </div>
            </el-card>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">import {  ref,watch } from 'vue';


const props = defineProps({visible:Boolean,mes:String})
const emit = defineEmits(['show'])

let visible = ref(false)
 

watch(
   ()=>props.visible ,()=>{ visible.value = props.visible}
)

const en = ()=>{
    emit('show')
    visible.value = false
}

</script>

<style scoped>

</style>