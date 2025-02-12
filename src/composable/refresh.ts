async function refreshToken(userId: string) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })

    const data = await response.json()
    if (data.success) {
      localStorage.setItem('user_id', userId)
      localStorage.setItem('expires_at', String(data.expiresAt))
      localStorage.setItem('expires_at', String(data.expiresAt))
      console.log('✅ Access Token 更新成功')
    } else {
      console.error('❌ 無法刷新 Access Token:', data.message)
    }
  } catch (error) {
    console.error('❌ 刷新 Token 失敗:', error)
  }
}

export default refreshToken
