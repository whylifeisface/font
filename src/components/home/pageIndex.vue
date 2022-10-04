<template>
    <div class="homeBox  a c">
        <el-container >
            <el-aside style="height: 100%;" width="200px">
               <HomeMenuIndex :is-collapse="isCollapse"></HomeMenuIndex>
            </el-aside>
                <el-container class="s">
                    <el-header >
                        <div class="a">
                            <div>
                                
                            <el-button type="primary" @click="this.isCollapse = !this.isCollapse"
                                    style="margin-right: 15px; ">
                                    <el-icon>
                                        <Close />
                                    </el-icon>
                                </el-button>
                                <span>
                                    首页
                                </span>
                        </div>
                                <div class="b">

                                <HomePopover></HomePopover>    
                                </div>
                        </div>
                    </el-header>
                    <el-main class="m">
                    <div>
                        <router-view style="height: auto;"></router-view>
                    </div>
                    </el-main>
                </el-container>
        </el-container>
    </div>
</template>

<script>
    
import HomeMenuIndex from './homeMenuIndex.vue';
import HomePopover from './homePopover.vue';

export default {
    data() {
        return {
            isCollapse: false,
        };
    },
    created() {
    },
    methods: {

        collapse() {
            console.log(this.isCollapse);
        },

    },
    components: { HomeMenuIndex, HomePopover }
}
</script>
<style scoped>
el-aside {
    background-color: #304156;
    
}

.m{
   margin: 0;
   padding: 0;
}
.el-header{
    width:100%;
}


.el-container .is-vertical{
          flex-direction: row;
        }
/* .head{
        padding: 10px 0;
    } */
:global(.a) {
    display: flex;
    flex: 1;

}
:global(.sssss){
    margin-left: 100px;
}
.homeBox{
    height: 100%;
}
:global(.b) {
    margin-left: auto;
}

.headbutton {
    border: none;
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}


.layout-container-demo .el-menu {
    border-right: none;
}
.s{
    height: 500px;
     flex-direction: row-reverse;
     display: flex;
     flex-wrap: wrap;
}
</style>