<template>
  <div class="flex flex-col justify-center items-center mx-5 h-screen">
    <div
      class="text-[#585858] border-b border-black max-h-[450px] max-w-[600px] p-4"
    >
      <div class="text-center">
        <h2 class="text-2xl font-bold">Hướng dẫn làm bài kiểm tra</h2>
      </div>
      <div class="text-xl font-bold text-center my-4">
        Title: Đề thi kiểm tra Hàm số
      </div>
      <div class="my-4">
        <!-- <div class="font-medium">Descriptions:</div> -->
        <p>
          <strong>Descriptions:</strong> Đề thi này dành cho học sinh lớp 6 môn
          Ngữ Văn và và có thang điểm 100 thời gian làm bài là 60 phút
        </p>
      </div>
      <div class="my-6 space-y-2">
        <div class="flex items-center space-x-2">
          <div>
            <i class="fas fa-arrow-pointer"></i>
          </div>
          <div>
            Click (tap) trực tiếp vào đáp án để chọn câu trả lời Bạn cho là đúng
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-[#6B6B6B] rounded-full"></div>
          <div>Câu hỏi chưa làm</div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-[#0B68AD] rounded-full"></div>
          <div>Câu hỏi đã làm</div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-[#27ae60] rounded-full"></div>
          <div>Câu hỏi trả lời đúng</div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-[#D81515] rounded-full"></div>
          <div>Câu hỏi trả lời sai</div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <button
        type="submit"
        class="mt-10 text-sm w-64 btn-bg-default text-white py-3 px-6 rounded-full hover:btn-bg-default transition duration-300"
        @click="goToExam"
      >
        <i class="fa-solid fa-arrow-right-long mr-2"></i>
        Bắt đầu làm bài
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InstructionsExam',
  methods: {
    goToExam() {
      this.$router.push(`/exam/${this.$route.params.slug}`)
    },
  },
}
</script>

<style scoped>
/* Thêm CSS tùy chỉnh cho InstructionsExam nếu cần */
</style>
