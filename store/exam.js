import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'
// import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  listExam: [],
  detailExam: {},
  takeExams: {},
  reviewExam: {},
  listHistoryExam: [],
  listExamDone: [],
})

export const actions = {
  async getListExamCategory({ commit }, slug) {
    try {
      // const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-exams', {
        params: { category_slug: slug },
      })
      const data = response.data
      commit('SET_LIST_EXAM_CATEGORY', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async getExamBySlug({ commit }, slugExam) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/detail-exam', {
        params: {
          slug: slugExam,
        },
        ...config,
      })
      const data = response.data
      commit('SET_DETAIL_EXAM_SLUG', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  setDetailExam({ commit }, data) {
    commit('setDetailExam', data)
  },

  async submitExam({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post('/submit-exam', payload, config)
      const data = response.data
      commit('SET_SUBMIT_EXAM', data.data)
    } catch {}
  },
  async getReviewExam({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get(`/review-exam/${payload}`, config)
      const data = response.data
      commit('SET_REVIEW_EXAM', data.data)
    } catch {}
  },
  async getListHistoryExamByUser({ commit }, userID) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-history-exams-by-user', {
        params: {
          id: userID,
        },
        ...config,
      })
      const data = response.data
      commit('SET_HISTORY_EXAM_BY_USER', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async getListExamByTeacher({ commit }) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-exam-create-by-teacher', {
        ...config,
      })
      const data = response.data
      commit('SET_LIST_EXAM_BY_TEACHER', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async getExamByDoneUser({ commit }, examID) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get(
        '/list-exam-has-been-done-by-user',
        {
          params: {
            exam_id: examID,
          },
          ...config,
        }
      )
      const data = response.data
      commit('SET_EXAM_DONE_BY_USER', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
}
export const mutations = {
  updateField,
  SET_LIST_EXAM_CATEGORY(state, data) {
    state.listExam = data
  },
  SET_DETAIL_EXAM_SLUG(state, data) {
    state.detailExam = data
  },
  setDetailExam(state, data) {
    state.detailExam = data
  },
  SET_SUBMIT_EXAM(state, data) {
    state.takeExams = data
  },
  SET_REVIEW_EXAM(state, data) {
    state.detailExam = data
  },
  SET_HISTORY_EXAM_BY_USER(state, data) {
    state.listHistoryExam = data
  },
  SET_LIST_EXAM_BY_TEACHER(state, data) {
    state.listExam = data
  },
  SET_EXAM_DONE_BY_USER(state, data) {
    state.listExamDone = data
  },
}

export const getters = {
  getField,
}
