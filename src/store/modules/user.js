import { login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  mutations: {
    updateToken(state, token) {
      state.token = token
      setToken(token)
    },
    logout(state) {
      // Remove the token from the state
      state.token = ''
      // Remove the local token
      removeToken()
    }
  },
  actions: {
    async loginAction(context, data) {
      const res = await login(data)
      console.log('login success', res.data.token)
      context.commit('updateToken', res.data.token)
    }
  },
  getters: {
  }
}
