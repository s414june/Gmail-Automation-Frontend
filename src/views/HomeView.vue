<template>
  <div id="app">
    <h1>OAuth 2.0 授權</h1>
    <button @click="startOAuth">Google 授權</button>
  </div>
</template>

<script setup lang="ts">
// 按鈕點擊後，請求 OAuth API
const startOAuth = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/login')
    const data = await response.json()

    if (data.url) {
      window.location.href = data.url // 跳轉到 Google 授權畫面
    } else {
      alert('無法獲取授權網址')
    }
  } catch (error) {
    console.error('請求 OAuth 失敗:', error)
    alert('發生錯誤，請稍後再試')
  }
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
