<template>
  <div
    class="container-1 bg-gray-300 flex flex-col rounded-lg fixed max-h-[600px] overflow-y-auto pb-4"
  >
    <div class="p-2">
      <div class="mb-2">
        <h1 class="text-lg font-semibold text-center text-[#5d5d5d]">
          Tổng điểm: {{ totalScore }} / 100
        </h1>
        <p></p>
      </div>
      <div class="flex flex-row flex-wrap">
        <button
          v-for="question in reviewExam.questions"
          :key="question.id"
          @click="goToQuestion(question.index)"
          :class="{
            'rounded-full w-8 h-8 m-1 border-2 border-[#3adf7f] bg-[#aad7b999] text-black items-center justify-center':
              isSuccessDefined(question),
            'rounded-full w-8 h-8 m-1 border-2 border-[#e84c4c] bg-[#d9aaaaac] text-black items-center justify-center':
              !isSuccessDefined(question),
          }"
        >
          {{ question.index }}
        </button>
      </div>
      <h1 class="mt-8 text-[#5d5d5d] font-medium">Đánh giá:</h1>
      <div>
        <div v-if="user.role === 2">
          <div v-for="item in comments" :key="item.id" class="flex">
            <textarea
              v-if="comments !== null"
              v-model="item.comment"
              name=""
              id=""
              class="border-2 outline-none p-2 mb-2 rounded-xl"
              cols="40"
              rows="0"
            ></textarea>
            <button
              class="m-3 px-3 py-2 bg-[#273c75] hover:bg-[#395193] text-white rounded-md"
              @click="editFeedback(item)"
            >
              Sửa
            </button>
            <button @click="xoaComment(item.id)">
              <i class="fas fa-trash text-red-500 hover:text-red-700 ml-2"></i>
            </button>
          </div>

          <div class="mt-4 flex">
            <textarea
              v-model="feedback"
              name=""
              id=""
              class="border-2 outline-none p-2 rounded-xl"
              cols="40"
              rows="0"
            ></textarea>
            <button
              class="m-3 px-3 py-2 bg-[#273c75] hover:bg-[#395193] text-white rounded-md"
              @click="sendFeedback"
            >
              Thêm
            </button>
          </div>
        </div>
        <div v-if="user.role === 1">
          <div
            v-for="item in comments"
            :key="item.id"
            class="m-4 w-[200px] break-words"
          >
            <div v-if="item.comment">- {{ item.comment }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center my-6">
      <button
        class="px-6 py-2 bg-[#7e7e7e] hover:bg-[#9d9d9d] text-white rounded-md mr-4"
        @click="handleOut"
      >
        Thoát
        <i class="fa-solid fa-arrow-right-from-bracket px-1"></i>
      </button>
    </div>
    <ToastSuccess v-if="showSuccessToast" :message="successMessage" />
    <ToastSuccess v-if="showSuccessToastAdd" :message="successMessageAdd" />
    <ToastSuccess
      v-if="showSuccessToastDelete"
      :message="successMessageDelete"
    />
    <ToastError v-if="showErrorToast" :message="errorMessage" />
    <ModalDelete
      :show-modal="showDeleteModal"
      :id-comment="idComment"
      @close="showDeleteModal = false"
    />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Vue from 'vue'
export const EventBus = new Vue()
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'
import ModalDelete from '~/components/common/ModalDelete'

export default {
  name: 'HeaderResultExam',
  components: {
    ToastSuccess,
    ToastError,
    ModalDelete,
  },
  props: {
    reviewExam: Object,
    totalScore: Number,
    idExam: String,
    commentsExam: Array,
  },
  data() {
    return {
      feedback: '',
      comments: null,
      showSuccessToast: false,
      showSuccessToastAdd: false,
      showSuccessToastDelete: false,
      showErrorToast: false,
      successMessageAdd: 'Thêm đánh giá thành công!.',
      successMessage: 'Sửa đánh giá thành công!.',
      successMessageDelete: 'Xóa đánh giá thành công',
      errorMessage: 'Lỗi! Dữ liệu.',
      idComment: null,
      showDeleteModal: false,
    }
  },
  watch: {
    commentsExam: {
      handler(newCommentsExam) {
        if (this.commentsExam !== null) {
          // Nếu commentsExam khác null, sao chép giá trị vào comments
          this.comments = JSON.parse(JSON.stringify(this.commentsExam))
        } else {
          // Nếu commentsExam là null, tạo một mảng rỗng cho comments
          this.comments = [{ id: null, comment: '' }]
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState('users', ['user']),
    // ...mapState('commentExam', ['comments']),
  },
  mounted() {
    this.getInfoUser()
  },
  methods: {
    ...mapActions('users', ['getInfoUser']),
    // ...mapActions('exam', ['getReviewExam']),
    ...mapActions('commentExam', ['getReviewExam']),
    ...mapActions('commentExam', ['addCommentExam']),
    ...mapActions('commentExam', ['updateCommentExam']),
    ...mapActions('commentExam', ['deleteComment']),
    handleOut() {
      this.$router.push('/')
    },
    goToQuestion(index) {
      EventBus.$emit('go-to-question-result', index)
    },
    isSuccessDefined(question) {
      return question.hasOwnProperty('is_success')
    },
    isCorrectQuestion(question) {
      return question.is_success == true
    },
    sendFeedback() {
      const payload = {
        take_exam_id: this.idExam,
        comment: this.feedback,
      }
      this.addCommentExam(payload)
        .then(() => {
          this.showSuccessToastAdd = true
          setTimeout(() => {
            this.showSuccessToastAdd = false
            this.getReviewExam(this.reviewExam.id)
          }, 3000)
        })
        .catch(() => {
          this.showErrorToast = true
          setTimeout(() => {
            this.showErrorToast = false
          }, 3000)
        })
    },
    editFeedback(item) {
      const payload = {
        id: item.id,
        take_exam_id: this.idExam,
        comment: item.comment,
      }
      this.updateCommentExam(payload)
        .then(() => {
          this.showSuccessToast = true
          setTimeout(() => {
            this.showSuccessToast = false
          }, 3000)
        })
        .catch(() => {
          this.showErrorToast = true
          setTimeout(() => {
            this.showErrorToast = false
          }, 3000)
        })
    },
    async xoaComment(id) {
      // this.idComment = id
      // this.showDeleteModal = true
      await this.deleteComment(id)
      this.showSuccessToastDelete = true
      setTimeout(() => {
        this.showSuccessToastDelete = false
        this.getReviewExam(this.reviewExam.id)
      }, 3000)
    },
  },
}
</script>
<style scoped>
/* @media (min-width: 375px) and (max-width: 899px) {
  .container-1 {

    display: none;
  }
} */
</style>
