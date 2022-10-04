<template>
    <div>
        <vue-ueditor-warp v-model="content" :config="myconfig"></vue-ueditor-warp>
    </div>
</template>

<script setup lang="ts">import { computed, onMounted, ref } from 'vue';
const props = defineProps({content:String})
const myconfig = ref({
    UEDITOR_HOME_URL:"/static/UEditor"
})
const content = computed(()=>
  {
    return  props.content
  }
    )
onMounted(()=>{
    console.log("vue-ueditor-warp prop",props.content);
    
})
// let content = ref('') 
</script>

<style scoped>

</style>