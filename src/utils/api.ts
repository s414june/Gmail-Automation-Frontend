import axios from 'axios'
import refreshToken from '@/composable/refresh'
import router from '@/router'

const API_URL = import.meta.env.VITE_API_URL

// 🔹 建立 Axios 實例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 🔄 自動附加 `access_token`
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// 🔄 自動處理 401 Unauthorized（Access Token 過期）
api.interceptors.response.use(
  (response) => response, // 如果請求成功，直接返回
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log('🔄 Access Token 過期，正在刷新...')
      try {
        const userId = localStorage.getItem('user_id')
        if (!userId || userId === null) {
          alert('❌ 缺少 userId，請重新登入')
          router.push('/')
          return
        }
        await refreshToken(userId) // 🚀 呼叫 refreshToken() 來刷新
        return api.request(error.config) // ✅ 重新發送原請求
      } catch (refreshError) {
        console.error('❌ Token 刷新失敗，請重新登入', refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default api
