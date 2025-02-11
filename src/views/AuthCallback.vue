<template>
  <div>正在處理 Google OAuth 授權...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  const code = route.query.code
  if (!code) {
    alert('未找到授權碼 (code)')
    router.push('/')
    return
  }

  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })

    const data = await response.json()
    if (data.success) {
      alert('OAuth 授權成功！')
      localStorage.setItem('access_token', data.accessToken)
      router.push('/')
    } else {
      alert('OAuth 授權失敗')
      router.push('/')
    }
  } catch (error) {
    console.error('授權處理錯誤:', error)
    alert('發生錯誤，請稍後再試')
    router.push('/')
  }
})
</script>
