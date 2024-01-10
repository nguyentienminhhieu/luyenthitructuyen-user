<template>
  <div
    v-if="slugExam && idExam"
    class="flex flex-col justify-center items-center mx-5 h-screen"
  >
    <div
      class="text-[#585858] border-b border-black max-h-[500px] max-w-[600px] p-4"
    >
      <div class="text-center">
        <h2 class="text-2xl font-bold">Hướng dẫn làm bài kiểm tra</h2>
        <p class="my-4">
          <strong><i class="fa-solid fa-users"></i> Lượt thi: </strong
          >{{ listExamDone.length }}
        </p>
      </div>
      <div class="text-xl font-bold text-center my-4">
        Chủ đề: {{ detailExam.title }}
      </div>
      <div class="my-4">
        <!-- <div class="font-medium">Descriptions:</div> -->
        <p><strong>Mô tả:</strong> {{ detailExam.description }}</p>
        <p><strong>Thời gian: </strong>{{ detailExam.duration }}phút</p>
        <p><strong>Điểm tối đa: </strong>{{ detailExam.max_score }}Điểm</p>
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
        @click="goToExam(detailExam.slug)"
      >
        <i class="fa-solid fa-arrow-right-long mr-2"></i>
        Bắt đầu làm bài
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'IntructionsExam',
  data() {
    return {
      slugExam: '',
      idExam: null,
    }
  },
  computed: {
    ...mapState('exam', ['detailExam']),
    ...mapState('exam', ['listExamDone']),
  },
  created() {},
  mounted() {
    if (this.$route.query.slugExam) {
      this.slugExam = this.$route.query.slugExam
      this.getExamBySlug(this.slugExam)
    }
    if (this.$route.query.idExam) {
      this.idExam = this.$route.query.idExam
      this.getExamByDoneUser(this.idExam)
    }
  },
  methods: {
    ...mapActions('exam', ['getExamBySlug']),
    ...mapActions('exam', ['getExamByDoneUser']),

    goToExam(slugExam) {
      this.$router.push({
        path: `/exam/${slugExam}`,
        query: {
          slugExam: this.slugExam,
        },
      })
    },
  },
}
</script>

<style scoped>
/* Thêm CSS tùy chỉnh cho InstructionsExam nếu cần */
</style>
