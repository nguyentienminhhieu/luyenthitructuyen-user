<template>
  <div>
    <button
      class="fixed w-14 h-14 bottom-16 right-4 rounded-full bg-[#2743cf] hover:bg-[#1733bd] my-3 text-white z-50"
      @click="Savedata"
    >
      <!-- <i class="fa-regular fa-floppy-disk"></i> -->
      SAVE
    </button>
    <ToastSuccess v-if="showSuccessToast" :message="successMessage" />
    <ToastError v-if="showErrorToast" :message="errorMessage" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'
export default {
  components: {
    ToastSuccess,
    ToastError,
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    listQuestions: Array,
    // eslint-disable-next-line vue/require-default-prop
    detailExam: Object,
    detailExercise: Object,
  },
  data() {
    return {
      isScrolling: false,
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Lưu thành công!.',
      errorMessage: 'Lỗi!',
    }
  },
  mounted() {},

  methods: {
    ...mapActions('examByTeacher', ['updateExamByTeacher']),
    ...mapActions('examByTeacher', ['getDetailExam']),
    ...mapActions('exerciseByTeacher', ['updateExercise']),

    async Savedata() {
      try {
        if (this.detailExam) {
          const payload = {
            id: this.detailExam.id,
            title: this.detailExam.title,
            description: this.detailExam.description,
            slug: this.detailExam.slug,
            category_id: this.detailExam.category_id,
            duration: this.detailExam.duration,
            max_score: this.detailExam.max_score,
            url_img: this.detailExam.url_img,
            question_ids: this.detailExam.question_ids,
            questions: this.detailExam.questions,
          }
          await this.updateExamByTeacher(payload)
        } else if (this.detailExercise) {
          const payload = {
            id: this.detailExercise.id,
            title: this.detailExercise.title,
            description: this.detailExercise.description,
            slug: this.detailExercise.slug,
            category_id: this.detailExercise.category_id,
            duration: this.detailExercise.duration,
            max_score: this.detailExercise.max_score,
            url_img: this.detailExercise.url_img,
            question_ids: this.detailExercise.question_ids,
            questions: this.detailExercise.questions,
          }
          await this.updateExercise(payload)
        }
        this.showSuccessToast = true
        setTimeout(() => {
          this.showSuccessToast = false
        }, 2000)
      } catch (error) {
        console.log(error)
        this.showErrorToast = true
        setTimeout(() => {
          this.showErrorToast = false
        }, 2000)
      }
    },
    saveDataToLocalStorage() {
      localStorage.setItem('questionData', JSON.stringify(this.questions))
    },
  },
}
</script>
<style></style>
