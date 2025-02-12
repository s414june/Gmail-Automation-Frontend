<template>
  <div>正在處理 Google OAuth 授權...</div>
</template>

<script setup lang="ts">
import api from '@/utils/api.ts'

import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  const code = route.query.code as string | undefined

  // 🔹 檢查是否有 `code`
  if (!code) {
    alert('授權無效，請重新登入')
    router.push('/')
    return
  }

  try {
    console.log('🔹 發送 OAuth 交換請求...', { code })

    const response = await api.post('/api/auth/exchange', { code })

    const { data } = await response
    console.log('✅ OAuth API 回應：', data)

    if (data.success) {
      alert('OAuth 授權成功！')
      localStorage.setItem('user_id', data.email) // 🔹 確保前端有 `userId`
      router.push('/')
    } else {
      alert('OAuth 授權失敗，請稍後再試')
      router.push('/')
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert('發生錯誤，請稍後再試')
    if (!error) {
      console.error('❌ 授權處理錯誤:', error)
    }
    if (error.response) {
      console.error(`❌ API 回應錯誤 (${error.response.status}):`, error.response.data)
    } else if (error.request) {
      console.error('❌ 沒有收到後端回應：', error.request)
    } else {
      console.error('❌ Axios 請求錯誤：', error.message)
    }
    router.push('/')
  }
})
</script>
