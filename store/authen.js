import { getAuthorizationConfig } from '~/plugins/configToken'
import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  user: [],
  isLoggedIn: false,
  isRegister: null,
})

export const actions = {
  async register({ commit }, payload) {
    try {
      const response = await this.$axios.post('/register', payload)
      const data = response.data
      if (data) {
        commit('setRegisteredUser', data)
        commit('setRegisterStatus', 'success')
      } else {
        commit('setRegisterStatus', 'error')
      }
    } catch (error) {
      commit('setRegisterStatus', 'error')
      console.log('Loi serve', error)
    }
  },

  async changePassword({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post(
        '/change-password',
        payload,
        config
      )
      return response
      // const data = response.data
      // commit('SET_SUBMIT_EXAM', data.data)
    } catch (error) {
      // return error
      console.log('loi', error)
    }
  },
  async forgotPassword({ commit }, payload) {
    try {
      // const config = getAuthorizationConfig()
      const response = await this.$axios.post('/forgot-password', payload)
      return response
      // const data = response.data
      // commit('SET_SUBMIT_EXAM', data.data)
    } catch {}
  },
  async resetPassword({ commit }, payload) {
    try {
      // const config = getAuthorizationConfig()
      const response = await this.$axios.post('/reset-password', payload)
      return response
      // const data = response.data
      // commit('SET_SUBMIT_EXAM', data.data)
    } catch (error) {
      // return error
      console.log('loi', error)
    }
  },
  async verifyEmail({ commit }, payload) {
    try {
      // const config = getAuthorizationConfig()
      const response = await this.$axios.post('/verify-email', payload)
      return response
      // const data = response.data
      // commit('SET_SUBMIT_EXAM', data.data)
    } catch {}
  },
  async login({ commit }, payload) {
    try {
      const response = await this.$axios.post('/login', payload)
      const data = response.data
      if (data && data.token) {
        Cookies.saveToken(data.token)
        Cookies.saveUser(data.data.id)
        Cookies.saveData('authentication', true)
        commit('setUserLogin', data)
        commit('setLoggedIn', true)
        return data
      }
    } catch (error) {
      // return error
      console.log('loi', error)
    }
  },
  logout({ commit }) {
    try {
      // const response = await this.$axios.post('/logout', payload)
      Cookies.destroyToken()
      Cookies.destroyUser()
      Cookies.saveData('authentication', false)
      commit('setLoggedIn', false)
      // return response
    } catch (error) {
      console.log('Loi sever!', error)
    }
  },
}

export const mutations = {
  setRegisteredUser(state, user) {
    state.registeredUser = user
  },
  setRegisterStatus(state, isRegister) {
    state.isRegister = isRegister
  },
  setUserLogin(state, user) {
    state.user = user
  },
  setLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },
}

export const getters = {
  getUser(state) {
    return state.user
  },
  // getLoggedIn(state) {
  //   return state.isLoggedIn === true
  // },
}
