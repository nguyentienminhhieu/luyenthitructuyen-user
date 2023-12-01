<template>
  <div class="container-all grid grid-cols-1 gap-4 p-4 m-6 mx-24">
    <div
      v-for="(exam, index) in exams"
      :key="index"
      class="bg-white shadow-md p-4 my-4 hover:bg-[#81818122] rounded-xl cursor-pointer"
      @click="goToIntructions(exam.slug)"
    >
      <div class="flex container-1">
        <img
          v-if="exam.url_img !== null"
          :src="exam.url_img"
          alt="exam Image"
          class="img-exam w-56 h-40 object-cover rounded-xl transform transition-transform hover:scale-105 cursor-pointer"
        />
        <div class="mx-10">
          <h2 class="text-lg font-semibold mt-4">{{ exam.title }}</h2>
          <p class="text-gray-500">{{ exam.description }}</p>
          <div class="mt-4 flex items-center text-sm text-gray-500">
            <span class="italic">{{ exam.category?.subject?.name }}</span>
            /
            <span class="italic">{{ exam.category?.grade?.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center space-x-2 my-5">
      <button
        class="bg-[#f4f4f5] text-[#7d7d7d] py-2 px-3 rounded-md"
        @click="goToPrevPage"
        :disabled="currentPage === 1"
      >
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <ul class="flex items-center space-x-2">
        <li
          v-for="page in totalPages"
          :key="page"
          :class="['number', { active: currentPage === page }]"
          @click="goToPage(page)"
          class="font-medium py-2 px-3 bg-[#f4f4f5] text-[#7d7d7d] hover:bg-[#3958ad] hover:text-[#fff] rounded-lg cursor-pointer"
        >
          {{ page }}
        </li>
      </ul>
      <button
        class="bg-[#f4f4f5] text-[#7d7d7d] py-2 px-3 rounded-md"
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
      >
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ListExamCategory',
  props: {
    slugCategory: String,
  },
  data() {
    return {
      exams: [],
      currentPage: 1,
      itemsPerPage: 6,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.listExam.length / this.itemsPerPage)
    },
    ...mapState('exam', ['listExam']),
  },
  async mounted() {
    // this.$router.go(0)
    await this.getListExamCategory(this.slugCategory)
    this.exams = this.listExam
  },
  methods: {
    ...mapActions('exam', ['getListExamCategory']),
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    goToPrevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    goToIntructions(slugExam) {
      this.$router.push({
        path: '/exam/intructions',
        query: {
          slugExam: slugExam,
        },
      })
    },
  },
}
</script>
<style scoped>
@media (min-width: 375px) and (max-width: 899px) {
  .img-exam {
    width: 100%;
    height: 80px;
  }
  .container-all {
    margin: 0 40px;
  }
  .container-1 {
    flex-direction: column;
  }
  .container-1 div {
    margin: 0;
  }
}
</style>
