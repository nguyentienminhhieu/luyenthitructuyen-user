<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60"></div>
    <div
      class="container-1 w-[400px] bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <div class="border-b-[1px] border-[#6666] pb-4">
        <h2 class="text-center text-xl text-[#2D6097] font-semibold pb-8">
          Kết quả
        </h2>
        <div class="flex justify-around text-lg font-medium text-[#585858]">
          <div class="flex flex-col items-center">
            <h2>Câu Đúng</h2>
            <h2>
              {{ takeExams.total_question_success }} / {{ totalQuestions }}
            </h2>
          </div>
          <div class="flex flex-col items-center">
            <h2>Điểm số</h2>
            <h2>{{ takeExams.total_score }} / 100</h2>
          </div>
        </div>
      </div>
      <div class="btn-confirm mt-6 text-[#ffff] flex justify-between">
        <div class="lg:my-0 mb-6">
          <button
            @click="handleOut"
            class="btn-confirm-1 px-5 py-2 bg-[#7e7e7e] hover:bg-[#9d9d9d] text-white rounded-md mr-4"
          >
            Thoát
            <i class="fa-solid fa-arrow-right-from-bracket px-1"></i>
          </button>
        </div>
        <div class="lg:my-0 mb-6">
          <button
            @click="handleResult(takeExams)"
            class="btn-confirm-1 px-5 py-2 bg-[#273c75] hover:bg-[#395193] text-white rounded-md"
          >
            Đáp án
            <i class="fa-solid fa-clipboard"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalResultExam',
  components: {},
  props: {
    showModal: Boolean,
    takeExams: Object,
    detailExam: Object,
  },
  computed: {
    totalQuestions() {
      return this.detailExam.questions.length
    },
  },
  mounted() {
    // window.addEventListener('unload', this.handleUnload)
  },
  methods: {
    handleOut() {
      localStorage.removeItem('answersKey')
      localStorage.removeItem('remainingTime')
      this.$router.push('/')
    },
    handleResult(takeExams) {
      this.$router.push({
        path: `/exam/result-exam/${takeExams.id}`,
        query: {
          idExam: takeExams.id,
        },
      })
    },
    closeModal() {
      this.$emit('close')
    },
    // handleUnload(event) {
    //   if (this.showModal == true) {
    //     // Nếu modal đang hiển thị, bạn có thể chuyển hướng về trang chủ hoặc thực hiện các hành động khác
    //     event.returnValue = 'Bạn có chắc chắn muốn rời khỏi trang?' // Cho trình duyệt hiển thị hộp thoại xác nhận
    //     this.$router.push('/')
    //   }
    // },
  },
  // beforeDestroy() {
  //   // Xóa sự kiện beforeunload khi component bị hủy
  //   window.removeEventListener('unload', this.handleUnload)
  // },
}
</script>

<style scoped>
@media (min-width: 375px) and (max-width: 899px) {
  .container-1 {
    width: 250px;
  }
  .btn-confirm {
    flex-direction: column;
  }
  .btn-confirm-1 {
    width: 100%;
  }
}
</style>
