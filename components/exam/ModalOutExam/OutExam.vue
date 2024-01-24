<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="container-1 w-[400px] bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <h2
        class="text-center text-xl text-[#2D6097] font-semibold pb-14 border-b-[1px] border-[#6666]"
      >
        Bạn có muốn thoát?
      </h2>
      <div class="btn-confirm mt-6 text-[#ffff] flex justify-between">
        <div class="lg:my-0 mb-6">
          <button
            @click="handleContinue"
            class="btn-confirm-1 px-5 py-2 bg-[#7e7e7e] hover:bg-[#9d9d9d] text-white rounded-md mr-4"
          >
            Làm tiếp
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
        <div class="lg:my-0 mb-6">
          <button
            @click="handleOut"
            class="btn-confirm-1 px-5 py-2 bg-[#273c75] hover:bg-[#395193] text-white rounded-md"
          >
            Thoát
            <i class="fa-solid fa-arrow-right-from-bracket px-1"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalOutExam',
  components: {},
  props: {
    showModal: Boolean,
  },
  methods: {
    handleOut() {
      localStorage.removeItem('answersKey')
      localStorage.removeItem('remainingTime')
      localStorage.removeItem('currentPageNumberExam')
      localStorage.removeItem('currentPageNumberExercise')
      this.$router.push('/')
    },
    handleContinue() {
      this.closeModal()
    },
    closeModal() {
      this.$emit('close')
    },
  },
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
