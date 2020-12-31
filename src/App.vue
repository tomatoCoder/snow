<!--
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-12-31 09:44:43
 * @LastEditors: qingyang
 * @LastEditTime: 2020-12-31 15:19:01
-->
<template>
  <canvas id="canvas_snow"></canvas>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {startSnow} from './utils/snow.js'
export default {
  name: 'App',
  components: { 
    HelloWorld
  },
  mounted() {
    startSnow();
  }
}
</script>

<style>
#app {
  background: skyblue;
  min-height: 100vh;
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
