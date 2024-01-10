import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'
// import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  listSubject: [],
})

export const actions = {
  async getSubjects({ commit }) {
    try {
      const response = await this.$axios.get('/list-subjects')
      const data = response.data
      commit('SET_SUBJECT', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
}

export const mutations = {
  updateField,
  SET_SUBJECT(state, subject) {
    state.listSubject = subject
  },
}

export const getters = {
  getField,
}
