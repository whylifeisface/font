<template>
  <!-- <hello-world> 111</hello-world> -->
    <router-view />

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import 'element-plus/es/components/loading-directive/style/css'; 
// import HelloWorld from '@/components/seven/two/twoIndex.vue'
@Options({
//   HelloWorld
})
export default class App extends Vue {}
</script>

<style>

#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
