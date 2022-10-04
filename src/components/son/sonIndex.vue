<template>
    <el-card>
        <div class="a">
            <div>
                {{props.mess == undefined ? "数据列表" : props.mess}}
            </div>
                <div class="b">
                    <slot></slot>
                <el-button @click="clik" type="primary">{{props.mes}}</el-button>
            </div>
        </div>

    </el-card>

</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
let router = useRouter()




const emit = defineEmits(['show'])
const props = defineProps({
    rou: String,
    mess: String,
    mes: String
})






const clik = () => {
    console.log(props.mess);
    
    console.log("11111");
    if (props.rou != undefined) {
        console.log(
            props.rou
        );
        router.push('/' + props.rou + '');
    }
    else {
        console.log("sssssssssssss");
        
        emit("show", true)
    }
    console.log();
}
</script>
<style scoped>

</style>