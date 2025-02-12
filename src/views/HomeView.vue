<template>
  <div>
    <button @click="startOAuth">前往Google 授權頁面</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
// 按鈕點擊後，請求 OAuth API
const startOAuth = async () => {
  router.push('/auth/access')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

button {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #357ae8;
}
</style>
