import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'
// import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  listExercise: [],
  detailExercise: {},
  currentPage: 1,
  totalPages: null,
  itemsPerPage: null,
  totalItems: null,
})

export const actions = {
  async getListExerciseCategory({ commit }, payload) {
    try {
      // const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-exercises', {
        params: {
          category_slug: payload.slug,
          limit: payload.limit,
          page: payload.page,
        },
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
  async getListExerciseHome({ commit }, examID) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-exercise-home', config)
      const data = response.data
      commit('SET_LIST_EXERCISE_HOME', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
}
export const mutations = {
  updateField,
  SET_LIST_EXERCISE_CATEGORY(state, data) {
    state.listExercise = data.data
    state.currentPage = data.current_page
    state.totalPages = data.last_page
    state.itemsPerPage = data.per_page
    state.totalItems = data.total
  },
  SET_DETAIL_EXERCISE_SLUG(state, data) {
    state.detailExercise = data
  },
  setDetailExercise(state, data) {
    state.detailExercise = data
  },
  SET_LIST_EXERCISE_HOME(state, data) {
    state.listExercise = data
  },
}

export const getters = {
  getField,
}
