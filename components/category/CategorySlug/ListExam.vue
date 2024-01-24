<template>
  <div class="container-all grid grid-cols-1 gap-4 p-4 m-6 mx-24">
    <div class="hidden relative my-2 w-[300px] shadow-xl rounded-md border-1">
      <input
        v-model="searchQuery"
        placeholder="Search exam..."
        class="w-full first-letter:border-b-2 border-gray-300 rounded py-2 pl-4 pr-6 focus:outline-none"
        @keyup.enter="performSearch"
      />
      <!-- @input="performSearch" -->
      <button
        class="absolute right-0 top-1/2 mx-2 transform -translate-y-1/2 text-gray-400 text-color-custom hover:text-gray-600 focus:outline-none"
        @click="performSearch"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div
      v-for="(exam, index) in listExam"
      :key="index"
      class="bg-white shadow-md p-4 my-4 hover:bg-[#81818122] rounded-xl cursor-pointer"
      @click="goToIntructions(exam)"
    >
      <div class="flex container-1">
        <img
          v-if="exam.url_img === null"
          src="~/assets/img/loi-hinh-anh.jpg"
          alt="exam Image"
          class="img-exam w-56 h-40 object-cover rounded-xl transform transition-transform hover:scale-105 cursor-pointer"
        />
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
          <div class="mt-4">
            <span class="italic text-sm text-gray-500"
              >Người đăng:
              {{ exam.user_id === null ? 'Admin' : 'Giáo viên' }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="totalPages > 1" class="flex items-center space-x-2 mt-8">
      <button
        class="bg-[#f4f4f5] text-[#7d7d7d] py-2 px-3 rounded-md"
        :class="currentPageNumber === 1 ? 'disabled' : ''"
        @click="goToPrevPage"
      >
        <i class="fa-solid fa-angle-left"></i>
      </button>
      <ul class="flex items-center space-x-2">
        <li
          v-for="page in totalPages"
          :key="page"
          :class="{
            active:
              currentPageNumber === page || (!currentPageNumber && page === 1),
          }"
          class="font-medium py-2 px-3 bg-[#f4f4f5] text-[#7d7d7d] hover:bg-[#3958ad] hover:text-[#fff] rounded-lg cursor-pointer"
          @click="goToPage(page)"
        >
          {{ page }}
        </li>
      </ul>
      <button
        class="bg-[#f4f4f5] text-[#7d7d7d] py-2 px-3 rounded-md"
        :class="currentPageNumber === totalPages ? 'disabled' : ''"
        @click="goToNextPage"
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
      currentPageNumber: this.currentPage,
      searchQuery: '',
      searchResults: [],
      originalList: [],
    }
  },
  computed: {
    ...mapState('exam', [
      'listExam',
      'currentPage',
      'totalPages',
      'itemsPerPage',
      'totalItems',
    ]),
  },
  watch: {
    currentPageNumber(newPageNumber) {
      localStorage.setItem('currentPageNumberExam', newPageNumber)
    },
    searchQuery(newSearchQuery) {
      if (!newSearchQuery) {
        this.searchResults = [...this.originalList]
      }
    },
  },
  async mounted() {
    this.currentPageNumber =
      parseInt(localStorage.getItem('currentPageNumberExam')) || 1

    await this.getListExam()
    this.originalList = [...this.listExam]
    this.searchResults = [...this.listExam]
  },
  methods: {
    ...mapActions('exam', ['getListExamCategory']),
    async performSearch() {
      const payload = {
        title: this.searchQuery,
        slug: this.slugCategory,
        page: this.currentPageNumber,
      }
      await this.$store.dispatch('exam/getListExamCategory', payload)
      this.searchResults = this.listExam
    },
    goToIntructions(exam) {
      this.$router.push({
        path: '/exam/intructions',
        query: {
          slugExam: exam.slug,
          idExam: exam.id,
        },
      })
    },
    async getListExam() {
      const payload = {
        slug: this.slugCategory,
        page: this.currentPageNumber,
      }
      try {
        await this.$store.dispatch('exam/getListExamCategory', payload)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    },
    async goToNextPage() {
      if (this.currentPageNumber < this.totalPages) {
        this.currentPageNumber++
        const payload = {
          slug: this.slugCategory,
          page: this.currentPageNumber,
          title: this.searchQuery,
        }
        await this.$store.dispatch('exam/getListExamCategory', payload)
      }
    },
    async goToPrevPage() {
      if (this.currentPageNumber > 1) {
        this.currentPageNumber--
        const payload = {
          slug: this.slugCategory,
          page: this.currentPageNumber,
          title: this.searchQuery,
        }
        await this.$store.dispatch('exam/getListExamCategory', payload)
      }
    },
    async goToPage(pageNumber) {
      this.currentPageNumber = pageNumber
      const payload = {
        slug: this.slugCategory,
        page: this.currentPageNumber,
        title: this.searchQuery,
      }
      await this.$store.dispatch('exam/getListExamCategory', payload)
    },
  },
}
</script>
<style scoped>
.active {
  background-color: #3958ad;
  color: #ffff;
}
.disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
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
