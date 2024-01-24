<template>
  <div class="table-1 w-[100%] my-5 mx-auto overflow-x-auto">
    <table
      class="max-h-[600px] border-collapse border border-gray-300 rounded-lg"
    >
      <thead>
        <tr class="bg-[#3c445c] text-white">
          <th
            class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
          >
            Tên người thi
          </th>
          <th
            class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
          >
            Lớp
          </th>
          <th
            class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
          >
            Địa chỉ
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
          >
            Điểm Số
          </th>
          <th
            class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
          >
            Số câu hỏi đúng
          </th>
          <th
            class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
          >
            Ngày thi
          </th>
          <th
            class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
          >
            Đánh giá
          </th>
        </tr>
      </thead>
      <tbody
        v-if="listExamDone && listExamDone.length > 0"
        class="bg-white divide-y divide-gray-200"
      >
        <tr
          v-for="(exam, index) in listExamDone"
          :key="index"
          @click="detailExamDoneUser(exam)"
          class="cursor-pointer hover:bg-gray-300"
          :class="{ 'bg-gray-100': index % 2 === 0 }"
        >
          <td class="px-3 py-4 whitespace-nowrap border-r-2">
            {{ exam.user?.name }}
          </td>
          <td class="px-3 py-4 whitespace-nowrap border-r-2">
            {{ getGradeName(exam.user?.grade_id) }}
          </td>
          <td class="px-3 py-4 whitespace-nowrap border-r-2">
            {{ exam.user?.address }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap border-r-2">
            {{ exam.total_score }} / {{ exam.exam?.max_score }}
          </td>
          <td class="px-2 py-4 whitespace-nowrap border-r-2">
            {{ exam.total_question_success }} / 40
          </td>
          <td class="px-2 py-4 whitespace-nowrap border-r-2">
            {{ getFirstTenChars(exam.exam.created_at) }}
          </td>
          <td class="px-2 py-4 whitespace-nowrap border-r-2">
            <span v-if="examReview[exam.id] > 0">
              <i class="fa-solid fa-check"></i>
            </span>
            <span v-else>
              <i class="fa-solid fa-xmark"></i>
            </span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <div class="m-5 text-gray-500 text-xl underline">
          *Đề thi này chưa có ai thi
        </div>
      </tbody>
    </table>

    <!-- <div
      class="flex items-center space-x-2 mt-8"
    >
      <button
        class="bg-[#f4f4f5] text-[#7d7d7d] py-2 px-3 rounded-md"
        :disabled="currentPageNumber === 1"
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
        :disabled="currentPageNumber === totalPages"
        @click="goToNextPage"
      >
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </div> -->
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'TableExamDone',
  props: {
    listExamDone: Array,
  },
  data() {
    return {
      examReview: {},
      currentPageNumber: this.currentPage,
    }
  },
  computed: {
    // ...mapState('exam', ['listExamDone']),
    ...mapState('exam', ['detailExam']),
    ...mapState('exam', ['currentPage ']),
    ...mapState('exam', ['totalPages']),
    ...mapState('exam', ['itemsPerPage']),
    ...mapState('exam', ['totalItems']),
  },
  // async created() {
  //   if (this.listExamDone && this.listExamDone.length > 0) {
  //     for (const exam of this.listExamDone) {
  //       await this.getReviewExam(exam.id)
  //       this.$set(this.examReview, exam.id, this.detailExam?.comments?.length)
  //     }
  //   }
  // },
  watch: {
    currentPageNumber(newPageNumber) {
      localStorage.setItem('PageNumberExamHasDoneUser', newPageNumber)
    },
  },
  async mounted() {
    this.currentPageNumber =
      parseInt(localStorage.getItem('PageNumberExamHasDoneUser')) || 1
    if (this.listExamDone && this.listExamDone.length > 0) {
      for (const exam of this.listExamDone) {
        await this.getReviewExam(exam.id)
        this.$set(this.examReview, exam.id, this.detailExam?.comments?.length)
      }
    }
    console.log(this.currentPageNumber)
  },
  methods: {
    ...mapActions('exam', ['getExamByDoneUser']),
    ...mapActions('exam', ['getReviewExam']),

    detailExamDoneUser(exam) {
      this.$router.push({
        path: `/exam/result-exam/${exam.id}`,
        query: {
          idExam: exam.id,
        },
      })
    },
    getFirstTenChars(text) {
      return text ? text.slice(0, 10) : ''
    },
    truncateText(text, maxLength) {
      if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...'
      } else {
        return text
      }
    },
    // async goToNextPage() {
    //   if (this.currentPageNumber < this.totalPages) {
    //     this.currentPageNumber++
    //     const payload = {
    //       limit: '10',
    //       page: this.currentPageNumber,
    //     }
    //     await this.$store.dispatch('exam/getExamByDoneUser', payload)
    //   }
    // },
    // async goToPrevPage() {
    //   if (this.currentPageNumber > 1) {
    //     this.currentPageNumber--
    //     const payload = {
    //       limit: '10',
    //       page: this.currentPageNumber,
    //     }
    //     await this.$store.dispatch('exam/getExamByDoneUser', payload)
    //   }
    // },
    // async goToPage(pageNumber) {
    //   this.currentPageNumber = pageNumber
    //   const payload = {
    //     limit: '10',
    //     page: this.currentPageNumber,
    //   }
    //   await this.$store.dispatch('exam/getExamByDoneUser', payload)
    // },
    getGradeName(gradeId) {
      const gradeMapping = {
        1: 'Lớp 6',
        2: 'Lớp 7',
        3: 'Lớp 8',
        4: 'Lớp 9',
      }
      return gradeId ? gradeMapping[gradeId] : ''
    },
  },
}
</script>
<style scoped>
@media (min-width: 360px) and (max-width: 899px) {
  /* .containers {
    flex-direction: column;
  } */
  .table-1 {
    width: 100%;
    margin-top: 20px;
    margin-left: 0;
    /* overflow-x: none; */
  }
  .table-1 table {
    width: 100%;
  }
}
</style>
