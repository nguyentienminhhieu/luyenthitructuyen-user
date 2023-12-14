<template>
  <div class="mx-auto p-8">
    <div class="flex justify-between my-8">
      <h2 v-if="user.role === 1" class="text-lg font-semibold text-[#273c75]">
        Lịch sử thi
      </h2>
      <h2 v-if="user.role === 2" class="text-lg font-semibold text-[#273c75]">
        Lịch sử tạo đề thi
      </h2>
    </div>
    <div
      v-if="user.role === 1"
      class="table-1 w-[50%] items-center mx-auto my-20 overflow-x-auto max-h-[600px]"
    >
      <!-- {{ listGrade.subjects }} -->
      <div v-for="item in listGradeSearch" :key="item.id" class="relative my-2">
        <select
          v-model="selectedOption"
          class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none"
        >
          <option
            v-for="subject in item.subjects"
            :key="subject.id"
            :value="subject.id"
          >
            {{ subject.name }}
          </option>
          <!-- Thêm các option khác nếu cần -->
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
              Ngày thi
            </th>
            <th
              class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
            ></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(exam, index) in listHistoryExam"
            :key="index"
            class="cursor-pointer hover:bg-gray-300"
            :class="{ 'bg-gray-100': index % 2 === 0 }"
          >
            <td class="pl-3 py-4 whitespace-nowrap border-r-2">
              {{ truncateText(exam.exam.title, 20) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap border-r-2">
              {{ exam.total_score }} /100
            </td>
            <td class="px-2 py-4 whitespace-nowrap border-r-2">
              {{ exam.total_question_success }} / 40
            </td>
            <td class="px-2 py-4 whitespace-nowrap border-r-2">
              {{ getFirstTenChars(exam.exam.created_at) }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap border-r-2">
              <button @click="detailExamDoneUser(exam)">
                <i
                  class="fa-regular fa-eye text-yellow-600 hover:text-yellow-700 ml-2"
                ></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="user.role === 2">
      <div
        class="table-1 flex w-[100%] items-center mx-auto my-20 overflow-x-auto max-h-[500px]"
      >
        <div
          v-for="item in listGradeSearch"
          :key="item.id"
          class="relative my-2"
        >
          <select
            v-model="selectedOption"
            class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none"
          >
            <option
              v-for="subject in item.subjects"
              :key="subject.id"
              :value="subject.id"
            >
              {{ subject.name }}
            </option>
            <!-- Thêm các option khác nếu cần -->
          </select>
        </div>
        <table
          class="w-[50%] border-collapse border border-gray-300 rounded-lg"
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
                class="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              ></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(exam, index) in listExam"
              :key="index"
              class="cursor-pointer hover:bg-gray-300"
              :class="{ 'bg-gray-100': index % 2 === 0 }"
            >
              <td
                @click="openTableExamDone(exam.id)"
                class="pl-3 py-4 whitespace-nowrap border-r-2"
              >
                {{ truncateText(exam.title, 20) }}
              </td>
              <td class="pl-2 py-4 whitespace-nowrap border-r-2">
                {{ exam.category?.title }}
              </td>
              <td class="pl-2 py-4 whitespace-nowrap border-r-2">
                {{ getFirstTenChars(exam.created_at) }}/
                {{ getFirstTenChars(exam.updated_at) }}
              </td>
              <td class="pl-2 py-4 whitespace-nowrap border-r-2">
                {{ exam.is_active === 0 ? 'InActive' : 'Active' }}
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
              </td>
            </tr>
          </tbody>
        </table>
        <TableExamDone v-if="openTable" :list-exam-done="examDone" />
      </div>
      <div v-if="user.role === 2">
        <div
          class="table-1 flex w-[100%] items-center mx-auto my-20 overflow-x-auto max-h-[500px]"
        >
          <div
            v-for="item in listGradeSearch"
            :key="item.id"
            class="relative my-2"
          >
            <select
              v-model="selectedOption"
              class="border-b-2 border-gray-300 rounded py-1 px-2 focus:outline-none"
            >
              <option
                v-for="subject in item.subjects"
                :key="subject.id"
                :value="subject.id"
              >
                {{ subject.name }}
              </option>
              <!-- Thêm các option khác nếu cần -->
            </select>
          </div>
          <table
            class="w-[50%] border-collapse border border-gray-300 rounded-lg"
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
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(exercise, index) in listExercise"
                :key="index"
                class="cursor-pointer hover:bg-gray-300"
                :class="{ 'bg-gray-100': index % 2 === 0 }"
              >
                <td
                  @click="openTableExamDone(exam.id)"
                  class="pl-3 py-4 whitespace-nowrap border-r-2"
                >
                  {{ truncateText(exercise.title, 20) }}
                </td>
                <td class="pl-2 py-4 whitespace-nowrap border-r-2">
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
                    <i
                      class="fas fa-edit text-blue-500 hover:text-blue-700"
                    ></i>
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
          </table>
        </div>
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
      openTable: false,
      selectedOption: null,
    }
  },
  computed: {
    ...mapState('users', ['user']),
    ...mapState('exam', ['listHistoryExam']),
    ...mapState('exam', ['listExam']),
    ...mapState('exam', ['listExamDone']),
    ...mapState('exerciseByTeacher', ['listExercise']),

    ...mapState('grade', ['listGrade']),
    listGradeSearch() {
      return this.listGrade.filter((item) => item.id < 2)
    },
  },
  async mounted() {
    await this.getInfoUser()
    if (this.user.role === 1) {
      await this.getListHistoryExamByUser(this.userInfo)
    } else {
      await this.getListExamByTeacher()
      await this.getListExercise()
    }
    this.getGrade()
    // console.log("dd", this.listGrade);
  },
  methods: {
    ...mapActions('users', ['getInfoUser']),
    ...mapActions('exam', ['getListHistoryExamByUser']),
    ...mapActions('exam', ['getListExamByTeacher']),
    ...mapActions('exam', ['getExamByDoneUser']),
    ...mapActions('exerciseByTeacher', ['getListExercise']),

    ...mapActions('grade', ['getGrade']),
    async openTableExamDone(id) {
      this.openTable = true
      await this.getExamByDoneUser(id)
      this.examDone = this.listExamDone
    },
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
    },
    detailExamDoneUser(exam) {
      this.$router.push({
        path: `/exam/result-exam/${exam.exam_id}`,
        query: {
          idExam: exam.exam_id,
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
  },
}
</script>

<style scoped>
@media (min-width: 360px) and (max-width: 899px) {
  /* .containers {
    flex-direction: column;
  } */
  .table-1 {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 10px;
    /* overflow-x: none; */
  }
  .table-1 table {
    width: 90%;
  }
}
</style>
