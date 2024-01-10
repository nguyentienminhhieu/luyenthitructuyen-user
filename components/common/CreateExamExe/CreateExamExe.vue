<template>
  <div
    class="menu absolute top-30 left-0 w-[150px] max-h-[400px] bg-white border border-gray-300 mt-2 rounded shadow-md z-50 overflow-auto"
  >
    <ul class="grid grid-cols-2 gap-2 cursor-pointer">
      <li
        v-if="listExamByTeacher.length < 10"
        @click="openModalAddExam"
        class="p-4 rounded text-[#5d5d5d] font-bold hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis transition duration-300 ease-in-out"
      >
        Tạo Đề thi
      </li>
      <li
        v-if="listExamByTeacher.length >= 10"
        @click="overLengthExam"
        class="p-4 rounded text-[#5d5d5d] font-bold hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis transition duration-300 ease-in-out"
      >
        Tạo Đề thi
      </li>
      <li
        v-if="listExercise.length < 10"
        @click="openModalAddExercise"
        class="p-4 rounded text-[#5d5d5d] font-bold hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis transition duration-300 ease-in-out"
      >
        Tạo Bài tập
      </li>
      <!-- {{
        listExamByTeacher.length
      }} -->
      <li
        v-if="listExercise.length >= 10"
        @click="overLengthExercise"
        class="p-4 rounded text-[#5d5d5d] font-bold hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis transition duration-300 ease-in-out"
      >
        Tạo Bài tập
      </li>
    </ul>
    <ToastSuccess v-if="showSuccessToast" :message="successMessage" />
    <ToastError v-if="showErrorToast" :message="errorMessage" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'
export default {
  name: 'CreateExamExe',
  components: {
    ToastSuccess,
    ToastError,
  },
  data() {
    return {
      isPasswordVisible: false,
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: '',
      errorMessage: 'Bạn tạo đã vượt quá số lượng cho phép',
    }
  },
  computed: {
    ...mapState('exam', ['listExamByTeacher']),
    ...mapState('exerciseByTeacher', ['listExercise']),
  },
  mounted() {
    this.getListExamByTeacher(), this.getListExercise()
  },
  methods: {
    ...mapActions('exam', ['getListExamByTeacher']),
    ...mapActions('exerciseByTeacher', ['getListExercise']),
    openModalAddExam() {
      this.$emit('open-add-exam')
    },
    openModalAddExercise() {
      this.$emit('open-add-exercise')
    },
    overLengthExam() {
      this.showErrorToast = true
      setTimeout(() => {
        this.showErrorToast = false
      }, 3000)
    },
    overLengthExercise() {
      this.showErrorToast = true
      setTimeout(() => {
        this.showErrorToast = false
      }, 3000)
    },
  },
}
</script>
<style scoped>
@media (min-width: 900px) {
  .menu ul {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (min-width: 360px) and (max-width: 899px) {
  .menu {
    width: 150px;
    max-height: 220px;
    /* left: 0; */
  }
  .menu ul {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
