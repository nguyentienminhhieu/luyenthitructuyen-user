import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'
// import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  listExercise: [],
  detailExercise: {},
})

export const actions = {
  async getListExerciseCategory({ commit }, slug) {
    try {
      // const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-exercises', {
        params: { category_slug: slug },
      })
      const data = response.data
      commit('SET_LIST_EXERCISE_CATEGORY', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async getExerciseBySlug({ commit }, slugExam) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/detail-exercise', {
        params: {
          slug: slugExam,
        },
        ...config,
      })
      const data = response.data
      commit('SET_DETAIL_EXERCISE_SLUG', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  setDetailExercise({ commit }, data) {
    commit('setDetailExercise', data)
  },
}
export const mutations = {
  updateField,
  SET_LIST_EXERCISE_CATEGORY(state, data) {
    state.listExercise = data
  },
  SET_DETAIL_EXERCISE_SLUG(state, data) {
    state.detailExercise = data
  },
  setDetailExercise(state, data) {
    state.detailExercise = data
  },
}

export const getters = {
  getField,
}
