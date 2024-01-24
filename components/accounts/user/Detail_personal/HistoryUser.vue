<template>
  <div class="mx-auto p-8">
    <div class="flex justify-between my-8">
      <h2 v-if="user.role === 1" class="text-lg font-semibold text-[#273c75]">
        Lịch sử thi
      </h2>
      <h2 v-if="user.role === 2" class="text-lg font-semibold text-[#273c75]">
        Lịch sử tạo Đề thi và Bài tập
      </h2>
    </div>
    <div
      v-if="user.role === 1"
      class="table-hs w-[60%] items-center mx-auto my-20 overflow-x-auto max-h-[700px]"
    >
      <div class="relative my-2">
        <label
          for="subjectSelect"
          class="absolute top-0 left-0 ml-2 mt-1 text-gray-500 transition-transform transform-origin-left"
          :class="{ hidden: selectedOptionSubject }"
        >
          Môn học
        </label>
        <select
          id="subjectSelect"
          v-model="selectedOptionSubject"
          class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none shadow-xl"
          @change="handleOptionSubject"
        >
          <option v-for="item in listSubject" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>
      </div>
      <table class="w-[100%] border-collapse border border-gray-300 rounded-lg">
        <thead>
          <tr class="bg-[#3c445c] text-white">
            <th
              class="pl-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
            >
              Tên bài thi
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
              Môn học
            </th>
            <!-- <th
              class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
            >
              Số lần luyện
            </th> -->
            <th
              class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
            >
              Ngày thi
            </th>
          </tr>
        </thead>
        <tbody
          v-if="listHistoryExam.length > 0"
          class="bg-white divide-y divide-gray-200"
        >
          <tr
            v-for="(exam, index) in listHistoryExam"
            :key="index"
            @click="detailExamDoneUser(exam)"
            class="cursor-pointer hover:bg-gray-300"
            :class="{ 'bg-gray-100': index % 2 === 0 }"
          >
            <td class="pl-3 py-4 whitespace-nowrap border-r-2">
              {{ truncateText(exam.exam.title, 20) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap border-r-2">
              {{ exam.total_score }} /{{ exam.exam?.max_score }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap border-r-2">
              {{ exam.total_question_success }} / {{ exam.total_question }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap border-r-2">
              {{ exam.exam?.category?.title }}
            </td>
            <!-- <td class="px-2 py-4 whitespace-nowrap border-r-2">
              {{ exam.times }}
            </td> -->
            <td class="px-2 py-4 whitespace-nowrap border-r-2">
              {{ getFirstTenChars(exam.exam.created_at) }}
            </td>
          </tr>
        </tbody>
        <tbody v-if="listHistoryExam.length === 0">
          <div class="text-center m-5 text-gray-500 text-xl underline">
            *Bạn chưa thi lần nào
          </div>
        </tbody>
      </table>

      <div v-if="totalPages != 1" class="flex items-center space-x-2 mt-8">
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
                currentPageNumber === page ||
                (!currentPageNumber && page === 1),
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
      </div>
    </div>

    <div
      v-if="user.role === 2"
      class="table-all w-[50%] items-center mx-auto my-20"
    >
      <!-- <div class="relative my-2 w-[300px] shadow-xl rounded-md border-1">
        <input
          v-model="searchedExam"
          @input="updateFilteredExam"
          placeholder="Search for a exam..."
          class="w-full first-letter:border-b-2 border-gray-300 rounded py-2 pl-4 pr-6 focus:outline-none"
        />
        <button
          class="absolute right-0 top-1/2 mx-2 transform -translate-y-1/2 text-gray-400 text-color-custom hover:text-gray-600 focus:outline-none"
          @click="updateFilteredExam"
        >
          <i class="fas fa-search"></i>
        </button>
      </div> -->
      <div class="table-1 flex flex-col w-[100%]">
        <table
          class="w-[100%] max-h-[500px] overflow-x-auto border-collapse border border-gray-300 rounded-lg"
        >
          <thead>
            <tr class="bg-[#3c445c] text-white">
              <th
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Tên bài thi
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Thể loại
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Ngày tạo/ Ngày sửa
              </th>
              <th
                class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Active
              </th>
              <th
                class="px-1 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Số lần đã thi
              </th>
              <th
                class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              ></th>
            </tr>
          </thead>
          <tbody
            v-if="listExamByTeacher.length > 0"
            class="bg-white divide-y divide-gray-200"
          >
            <tr
              v-for="(exam, index) in listExamByTeacher"
              :key="index"
              class="cursor-pointer hover:bg-gray-300"
              :class="{ 'bg-gray-100': index % 2 === 0 }"
            >
              <td class="pl-3 py-4 whitespace-nowrap border-r-2">
                {{ truncateText(exam.title, 30) }}
              </td>
              <td class="pl-2 py-4 px-2 whitespace-nowrap border-r-2">
                {{ exam.category?.title }}
              </td>
              <td class="pl-2 py-4 whitespace-nowrap border-r-2">
                {{ getFirstTenChars(exam.created_at) }}/
                {{ getFirstTenChars(exam.updated_at) }}
              </td>
              <td class="pl-2 py-4 whitespace-nowrap border-r-2">
                {{ exam.is_active === 0 ? 'InActive' : 'Active' }}
              </td>
              <td class="pl-2 py-4 whitespace-nowrap border-r-2">
                {{ examDoneLength[exam.id] }}
              </td>
              <td class="px-2 py-4 whitespace-nowrap">
                <button @click="editExam(exam)">
                  <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
                </button>
                <button @click="deleteExam(exam.id)">
                  <i
                    class="fas fa-trash text-red-500 hover:text-red-700 ml-2"
                  ></i>
                </button>
                <button @click="detailExam(exam)">
                  <i
                    class="fa-regular fa-eye text-yellow-600 hover:text-yellow-700 ml-2"
                  ></i>
                </button>
                <button @click="openTableExamDone(exam.id)">
                  <i class="fa-regular fa-comment ml-2"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-if="listExamByTeacher.length === 0">
            <div class="text-center m-5 text-gray-500 text-xl underline">
              *Bạn chưa tạo đề thi lần nào
            </div>
          </tbody>
        </table>
        <TableExamDone v-if="openTable" :list-exam-done="examDone" />
      </div>
      <div v-if="user.role === 2" class="w-[100%] items-center mx-auto my-20">
        <table
          class="w-[100%] border-collapse border border-gray-300 rounded-lg"
        >
          <thead>
            <tr class="bg-[#3c445c] text-white">
              <th
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Tên bài tập
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Thể loại
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Ngày tạo/ Ngày sửa
              </th>
              <th
                class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Active
              </th>
              <th
                class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              ></th>
            </tr>
          </thead>
          <tbody
            v-if="listExercise.length > 0"
            class="bg-white divide-y divide-gray-200"
          >
            <tr
              v-for="(exercise, index) in listExercise"
              :key="index"
              class="cursor-pointer hover:bg-gray-300"
              :class="{ 'bg-gray-100': index % 2 === 0 }"
            >
              <td class="pl-3 py-4 whitespace-nowrap border-r-2">
                {{ truncateText(exercise.title, 40) }}
              </td>
              <td class="pl-2 py-4 px-2 whitespace-nowrap border-r-2">
                {{ exercise.category?.title }}
              </td>
              <td class="pl-2 py-4 whitespace-nowrap border-r-2">
                {{ getFirstTenChars(exercise.created_at) }}/
                {{ getFirstTenChars(exercise.updated_at) }}
              </td>
              <td class="pl-2 py-4 whitespace-nowrap border-r-2">
                {{ exercise.is_active === 0 ? 'InActive' : 'Active' }}
              </td>
              <td class="px-2 py-4 whitespace-nowrap">
                <button @click="editExercise(exercise)">
                  <i class="fas fa-edit text-blue-500 hover:text-blue-700"></i>
                </button>
                <button @click="deleteExercise(exercise.id)">
                  <i
                    class="fas fa-trash text-red-500 hover:text-red-700 ml-2"
                  ></i>
                </button>
                <button @click="detailExercise(exercise)">
                  <i
                    class="fa-regular fa-eye text-yellow-600 hover:text-yellow-700 ml-2"
                  ></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-if="listExercise.length === 0">
            <div class="text-center m-5 text-gray-500 text-xl underline">
              *Bạn chưa tạo đề thi lần nào
            </div>
          </tbody>
        </table>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import TableExamDone from '~/components/accounts/user/Detail_personal/TableExamDone.vue'
export default {
  name: 'HistoryUser',
  props: {
    userInfo: Number,
  },
  components: {
    TableExamDone,
  },
  data() {
    return {
      examDone: null,
      examDoneLength: {},
      openTable: false,
      selectedOption: null,
      searchQuery: '',
      searchedExam: '',
      searchedExercise: '',
      filteredExam: [],
      currentPageNumber: this.currentPage,
      selectedOptionSubject: null,
    }
  },
  computed: {
    ...mapState('users', ['user']),
    ...mapState('exam', ['listHistoryExam']),
    ...mapState('exam', ['listExamByTeacher']),
    ...mapState('exam', ['listExamDone']),
    ...mapState('exam', ['currentPage ']),
    ...mapState('exam', ['totalPages']),
    ...mapState('exam', ['itemsPerPage']),
    ...mapState('exam', ['totalItems']),
    ...mapState('exerciseByTeacher', ['listExercise']),
    ...mapState('subject', ['listSubject']),

    ...mapState('grade', ['listGrade']),
    listGradeSearch() {
      return this.listGrade.filter((item) => item.id < 2)
    },
    displayedExams() {
      if (this.searchedExam !== '') {
        return this.filteredExam
      }
      return this.listExam
    },

    // examDoneLength() {
    //   return this.examDone ? this.examDone.length : 0
    // },
  },
  watch: {
    currentPageNumber(newPageNumber) {
      localStorage.setItem('currentPagHistoryExam', newPageNumber)
    },
  },
  async mounted() {
    this.currentPageNumber =
      parseInt(localStorage.getItem('currentPagHistoryExam')) || 1

    await this.getInfoUser()
    if (this.user.role === 1) {
      await this.getListExamUserHis()
    } else {
      await this.getListExamByTeacher()
      await this.getListExercise()
    }
    this.getGrade()
    this.getSubjects()
    for (const exam of this.listExamByTeacher) {
      await this.getExamByDoneUser(exam.id)
      this.$set(this.examDoneLength, exam.id, this.listExamDone.length)
    }
  },
  methods: {
    ...mapActions('users', ['getInfoUser']),
    ...mapActions('exam', ['getListHistoryExamByUser']),
    ...mapActions('exam', ['getListExamByTeacher']),
    ...mapActions('exam', ['getExamByDoneUser']),
    ...mapActions('exerciseByTeacher', ['getListExercise']),
    ...mapActions('subject', ['getSubjects']),

    // async performSearch() {
    //   await this.$store.dispatch('exam/getListHistoryExamByUser', {
    //     title: this.searchQuery,
    //   })
    // },
    ...mapActions('grade', ['getGrade']),
    async getListExamUserHis() {
      try {
        await this.$store.dispatch('exam/getListHistoryExamByUser', {
          userID: this.userInfo,
          page: this.currentPageNumber,
        })
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    },
    async openTableExamDone(id) {
      this.openTable = !this.openTable
      await this.getExamByDoneUser(id)
      this.examDone = this.listExamDone
      // this.examDoneLength[id] = this.listExamDone
    },
    // async examDoneLengthClick(id) {
    //   await this.getExamByDoneUser(id)
    //   // this.examDoneAll = this.listExamDone
    //   const examDoneAll = this.listExamDone.length
    //   return examDoneAll
    //   // return this.examDoneLength[id] ? this.examDoneLength[id].length : 0
    // },
    editExam(exam) {
      this.$emit('edit-clicked', exam)
    },
    detailExam(examItem) {
      this.$router.push({
        path: `/create-exam/${examItem.slug}`,
        query: { examID: examItem.id },
      })
    },
    deleteExam(examId) {
      this.$emit('delete-clicked', examId)
      this.getListExamByTeacher()
    },
    editExercise(exercise) {
      this.$emit('edit-clicked-exercise', exercise)
    },
    detailExercise(exerciseItem) {
      this.$router.push({
        path: `/create-exercise/${exerciseItem.slug}`,
        query: { exerciseID: exerciseItem.id },
      })
    },
    deleteExercise(exerciseId) {
      this.$emit('delete-exercise-clicked', exerciseId)
      this.getListExercise()
    },
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
      // Kiểm tra xem text có tồn tại không
      if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...'
      } else {
        return text
      }
    },
    async updateFilteredExam() {
      try {
        const payload = {
          limit: '20',
        }
        await this.getListExamByTeacher(payload)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async goToNextPage() {
      if (this.currentPageNumber < this.totalPages) {
        this.currentPageNumber++
        await this.$store.dispatch('exam/getListHistoryExamByUser', {
          userID: this.userInfo,
          page: this.currentPageNumber,
          subject_id: this.selectedOptionSubject,
        })
      }
    },
    async goToPrevPage() {
      if (this.currentPageNumber > 1) {
        this.currentPageNumber--
        await this.$store.dispatch('exam/getListHistoryExamByUser', {
          userID: this.userInfo,
          page: this.currentPageNumber,
          subject_id: this.selectedOptionSubject,
        })
      }
    },
    async goToPage(pageNumber) {
      this.currentPageNumber = pageNumber
      await this.$store.dispatch('exam/getListHistoryExamByUser', {
        userID: this.userInfo,
        page: this.currentPageNumber,
        subject_id: this.selectedOptionSubject,
      })
    },
    async handleOptionSubject() {
      await this.$store.dispatch('exam/getListHistoryExamByUser', {
        subject_id: this.selectedOptionSubject,
        page: this.currentPageNumber,
      })
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
  background-color: #e8e8e8;
  cursor: not-allowed;
}
@media (min-width: 360px) and (max-width: 899px) {
  /* .containers {
    flex-direction: column;
  } */
  .table-all {
    width: 100%;
  }
  .table-hs {
    width: 100%;
  }
  .table-1 {
    /* display: flex;
    flex-direction: column; */
    width: 100%;
  }
  .table-1 table {
    width: 90%;
  }
}
</style>
