<template>
    <el-steps :active="active" finish-status="success">
        <el-step title="填写商品信息"/>
        <el-step title="填写商品促销" />
        <el-step title="填写商品属性"/>
        <el-step title="选择商品关联"/>
    </el-steps>
    <div class="sssss">

        <router-view />
    </div>
    <div class="a">
        <div v-if="active>0">
        <el-button @click="pre">上一步</el-button>
    </div>
    <el-button style="margin-top: 12px" @click="next">Next step</el-button>
    </div>
</template>
<script>

// let push = ''
    export default {
        data() {
            return {
                active:0,   
                id:0,
                
            }
        },
        created() {
            this.init()
        },
        watch:{
                active(w){  
                    console.log("wathc");
                    switch (w) {
                        case 0:{
                            this.$router.push('/six/one/'+this.id)

                            break;
                        }
                        case 1:{
                            this.$router.push('/six/twoIndex/'+this.id)

                            break;
                        }
                        case 2:{
                            this.$router.push('/six/threeIndex')

                            break;
                        }
                        case 3:{
                            this.$router.push('/six/threeIndex')

                            break;
                        }
                    
                        default:
                            break;
                    }
                }
            },
        methods: {
            init(){
               this.id =  this.$route.params.id
            this.$router.push('/six/one/'+this.id)
            
            },

            next(){
                if(this.active <=3)
                this.active++

            },  pre(){
                this.active--;

        },
            },
              
    }
</script>