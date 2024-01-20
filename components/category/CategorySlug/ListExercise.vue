<template>
  <div class="container-all grid grid-cols-1 gap-4 p-4 m-6 mx-24">
    <div
      v-for="(exercise, index) in listExercise"
      :key="index"
      class="bg-white shadow-md p-4 my-4 hover:bg-[#81818122] rounded-xl cursor-pointer"
      @click="goToIntructions(exercise.slug)"
    >
      <div class="flex container-1">
        <img
          v-if="exercise.url_img !== null"
          :src="exercise.url_img"
          alt="exercise Image"
          class="img-exercise w-56 h-40 object-cover rounded-xl transform transition-transform hover:scale-105 cursor-pointer"
        />
        <div class="mx-10">
          <h2 class="text-lg font-semibold mt-4">{{ exercise.title }}</h2>
          <p class="text-gray-500">{{ exercise.description }}</p>
          <div class="mt-4 flex items-center text-sm text-gray-500">
            <span class="italic">{{ exercise.category?.subject?.name }}</span>
            /
            <span class="italic">{{ exercise.category?.grade?.name }}</span>
          </div>
          <div class="mt-4">
            <span class="italic text-sm text-gray-500"
              >Người đăng:
              {{ exercise.user_id === null ? 'Admin' : 'Giáo viên' }}</span
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
  name: 'ListExerciseCategory',
  props: {
    slugCategory: String,
  },
  data() {
    return {
      exercises: [],
      currentPageNumber: this.currentPage,
    }
  },
  computed: {
    ...mapState('exercise', ['listExercise']),
    ...mapState('exercise', ['currentPage ']),
    ...mapState('exercise', ['totalPages']),
    ...mapState('exercise', ['itemsPerPage']),
    ...mapState('exercise', ['totalItems']),
  },
  watch: {
    currentPageNumber(newPageNumber) {
      localStorage.setItem('currentPageNumberExercise', newPageNumber)
    },
  },
  async mounted() {
    this.currentPageNumber =
      parseInt(localStorage.getItem('currentPageNumberExercise')) || 1

    await this.getListExercise()
  },

  methods: {
    ...mapActions('exercise', ['getListExerciseCategory']),
    goToIntructions(slugExercise) {
      this.$router.push({
        path: '/exercise/intructions',
        query: {
          slugExercise: slugExercise,
        },
      })
    },
    async getListExercise() {
      const payload = {
        slug: this.slugCategory,
        limit: '6',
        page: this.currentPageNumber,
      }
      try {
        await this.$store.dispatch('exercise/getListExerciseCategory', payload)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    },
    async goToNextPage() {
      if (this.currentPageNumber < this.totalPages) {
        this.currentPageNumber++
        const payload = {
          slug: this.slugCategory,
          limit: '6',
          page: this.currentPageNumber,
        }
        await this.$store.dispatch('exercise/getListExerciseCategory', payload)
      }
    },
    async goToPrevPage() {
      if (this.currentPageNumber > 1) {
        this.currentPageNumber--
        const payload = {
          slug: this.slugCategory,
          limit: '6',
          page: this.currentPageNumber,
        }
        await this.$store.dispatch('exercise/getListExerciseCategory', payload)
      }
    },
    async goToPage(pageNumber) {
      this.currentPageNumber = pageNumber
      const payload = {
        slug: this.slugCategory,
        limit: '6',
        page: this.currentPageNumber,
      }
      await this.$store.dispatch('exercise/getListExerciseCategory', payload)
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
  .img-exercise {
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
