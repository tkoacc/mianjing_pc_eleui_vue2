const KEY = 'my-token-elementui-pc'

// 获取token
export const getToken = () => localStorage.getItem(KEY)

// 设置token
export const setToken = token => localStorage.setItem(KEY, token)

// 删除token
export const removeToken = () => localStorage.removeItem(KEY)
