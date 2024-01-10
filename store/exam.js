import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'
// import Cookies from '~/services/cookies.service.js'

export const state = () => ({
  listExam: [],
  listExamByTeacher: [],
  listExamSearch: [],
  detailExam: {},
  takeExams: {},
  reviewExam: {},
  listHistoryExam: [],
  listExamDone: [],
  currentPage: 1,
  totalPages: null,
  itemsPerPage: null,
  totalItems: null,
})

export const actions = {
  async getListExamCategory({ commit }, payload) {
    try {
      // const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-exams', {
        params: {
          title: payload.title,
          category_slug: payload.slug,
          limit: payload.limit,
          page: payload.page,
        },
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
  async getListHistoryExamByUser({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-history-exams-by-user', {
        params: {
          id: payload.userID,
          limit: '10',
          subject_id: payload.subject_id,
          page: payload.page,
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
        params: {
          limit: '20',
        },
        ...config,
      })
      const data = response.data?.data
      commit('SET_LIST_EXAM_BY_TEACHER', data.data)
    } catch {}
  },
  async getExamByDoneUser({ commit }, examID) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get(
        '/list-exam-has-been-done-by-user',
        {
          params: {
            exam_id: examID,
            limit: '20',
          },
          ...config,
        }
      )
      const data = response.data?.data
      commit('SET_EXAM_DONE_BY_USER', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async getListExamHome({ commit }, examID) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-exam-home', config)
      const data = response.data
      commit('SET_LIST_EXAM_HOME', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async getListExamsSearch({ commit }, payload) {
    try {
      // category_slug: payload.category_slug,
      const config = getAuthorizationConfig()
      const response = await this.$axios.get('/list-exams', {
        params: {
          limit: payload.limit,
          category_slug: payload.category_slug,
          title: payload.title,
        },
        ...config,
      })
      const data = response.data?.data
      commit('SET_LIST_EXAM_SEARCH', data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
}

export const mutations = {
  updateField,
  SET_LIST_EXAM_CATEGORY(state, data) {
    state.listExam = data.data
    state.currentPage = data.current_page
    state.totalPages = data.last_page
    state.itemsPerPage = data.per_page
    state.totalItems = data.total
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
    state.listHistoryExam = data.data
    state.currentPage = data.current_page
    state.totalPages = data.last_page
    state.itemsPerPage = data.per_page
    state.totalItems = data.total
  },
  SET_LIST_EXAM_BY_TEACHER(state, data) {
    state.listExamByTeacher = data
  },
  SET_EXAM_DONE_BY_USER(state, data) {
    state.listExamDone = data
    state.currentPage = data.current_page
    state.totalPages = data.last_page
    state.itemsPerPage = data.per_page
    state.totalItems = data.total
  },
  SET_LIST_EXAM_HOME(state, data) {
    state.listExam = data
  },
  SET_LIST_EXAM_SEARCH(state, data) {
    state.listExamSearch = data
  },
}

export const getters = {
  getField,
}
