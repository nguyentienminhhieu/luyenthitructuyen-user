<template>
  <div>
    <div
      class="container-1 bg-white flex flex-col rounded-lg sticky max-h-[500px] overflow-y-auto pb-4"
    >
      <div class="p-2">
        <div class="text-center text-red-600 font-semibold my-2">
          {{ formatTime(remainingTime) }}
        </div>

        <div class="flex flex-row flex-wrap">
          <button
            v-for="index in questions.length"
            :key="index"
            class="rounded-full w-8 h-8 m-1 bg-gray-500 text-white items-center justify-center hover:bg-gray-600 hover:text-white"
            @click="goToQuestion(index)"
          >
            {{ index }}
          </button>
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
        <button
          class="px-6 py-2 bg-[#273c75] hover:bg-[#395193] text-white rounded-md"
          @click="handleSend"
        >
          Nộp bài
          <i class="fa-regular fa-paper-plane px-1"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderExam',
  data() {
    return {
      questions: [
        'Câu hỏi 1',
        'Câu hỏi 2',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
        'Câu hỏi 3',
      ],
      totalTime: 60 * 60, // Tổng thời gian (đơn vị giây)
      remainingTime: 0, // Thời gian còn lại (đơn vị giây)
    }
  },
  mounted() {
    // Khởi tạo thời gian còn lại bằng thời gian tổng cộng
    this.remainingTime = this.totalTime

    // Bắt đầu đếm thời gian
    this.startCountdown()
  },
  methods: {
    handleSend() {
      this.$emit('send-clicked')
    },
    handleOut() {
      this.$emit('out-clicked')
    },
    goToQuestion(index) {
      // Thực hiện hành động để điều hướng đến câu hỏi cụ thể tại vị trí `index`
      // Ví dụ: có thể làm một chuyển đổi trang hoặc cuộn đến câu hỏi đó.
      console.log(`Điều hướng đến câu hỏi ${index}`)
    },
    startCountdown() {
      // Đếm ngược thời gian
      this.countdownInterval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime -= 1
        } else {
          // Thời gian kết thúc, xử lý tại đây
          clearInterval(this.countdownInterval)
        }
      }, 1000)
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    },
  },
  beforeDestroy() {
    // Trước khi component bị hủy, hủy bỏ interval
    clearInterval(this.countdownInterval)
  },
}
</script>
<style scoped>
@media (min-width: 375px) and (max-width: 899px) {
}
</style>
