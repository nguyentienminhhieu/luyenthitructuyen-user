import { getField, updateField } from 'vuex-map-fields'
import { getAuthorizationConfig } from '~/plugins/configToken'

export const state = () => ({
  reviewExam: {},
  comments: [],
})

export const actions = {
  async getReviewExam({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.get(`/review-exam/${payload}`, config)
      const data = response.data
      commit('SET_COMMENT_REVIEW_EXAM', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async addCommentExam({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.post('/comment-exam', payload, config)
      const data = response.data
      commit('SET_ADD_COMMENT_EXAM', data.data)
      // console.log(data.data)
    } catch (error) {
      console.log('Loi sever, ', error)
    }
  },
  async updateCommentExam({ commit }, payload) {
    try {
      const payload2 = {
        take_exam_id: payload.take_exam_id,
        comment: payload.comment,
      }
      const config = getAuthorizationConfig()
      const response = await this.$axios.put(
        `/update-comment-exam/${payload.id}`,
        payload2,
        config
      )
      const data = response.data
      commit('SET_UPDATE_COMMENT_EXAM', data.data)
    } catch {}
  },
  async deleteComment({ commit }, payload) {
    try {
      const config = getAuthorizationConfig()
      const response = await this.$axios.delete(
        `/delete-comment-exam/${payload}`,
        config
      )
      const data = response.data
      commit('SET_DELETE_COMMENT_EXAM', data.data)
    } catch {}
  },
}
export const mutations = {
  updateField,
  SET_COMMENT_REVIEW_EXAM(state, data) {
    state.reviewExam = data
  },
  SET_ADD_COMMENT_EXAM(state, data) {
    state.comments = data
  },
  SET_UPDATE_COMMENT_EXAM(state, data) {
    state.comments = data
  },
  SET_DELETE_COMMENT_EXAM(state, data) {
    state.comments = data
  },
}

export const getters = {
  getField,
}
