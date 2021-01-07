<!--
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-12-31 09:44:43
 * @LastEditors: qingyang
 * @LastEditTime: 2021-01-06 16:26:48
-->
<template>
  <div id="three"></div>
  <!-- <canvas id="canvas_snow"></canvas>
  <img alt="Vue logo" src="./assets/snow.png" id="logo">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { startSnow } from './utils/snow.js'
import { createThree } from './utils/three'
export default {
  name: 'App',
  components: { 
    HelloWorld
  },
  mounted() {
    // startSnow();
    createThree();
  }
}
</script>

<style>
#app {
  background: skyblue;
  /* min-height: 100vh; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#canvas_snow {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
}
</style>
