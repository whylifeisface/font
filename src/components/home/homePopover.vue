<template>
    <div>
        <el-popover placement="bottom" :visible="visible" :width="100" trigger="click">
            <el-row class="head">
                <el-button class="headbutton" @click="$router.push('/')">首页</el-button>
            </el-row>
            <el-button class="headbutton" @click="loginOut">退出</el-button>

            <template #reference>
                <el-button @click="visible = true">
                    java
                </el-button>
            </template>
        </el-popover>
    </div>
</template>

<script setup lang="ts"> import { ref } from 'vue'
import { PostReq } from '../axios/axios';
let visible = ref(false)


const  loginOut = () => {
            PostReq("api/logout").then(data => {
                if (data.code == 200) {
                    console.log(data.data);
                }
            });
        }


</script>

<style scoped>

</style>