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
              {{ exam.total_score }}
            </td>
            <td class="px-2 py-4 whitespace-nowrap border-r-2">
              {{ exam.total_question_success }} /
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="user.role === 2"
      class="table-1 flex w-[100%] items-center mx-auto my-20 overflow-x-auto max-h-[500px]"
    >
      <table class="w-[50%] border-collapse border border-gray-300 rounded-lg">
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
              {{
                (exam.update_at = exam.created_at)
                  ? 'Chưa sửa'
                  : getFirstTenChars(exam.update_at)
              }}
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
      <!-- <div v-if="listExamDone !== null">
        <table
          class="w-[50%] mx-2 border-collapse border border-gray-300 rounded-lg"
        >
          <thead>
            <tr class="bg-[#3c445c] text-white">
              <th
                class="pl-3 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Tên người thi
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Điểm Số
              </th>
              <th
                class="px-0 py-3 text-left text-xs font-medium uppercase tracking-wider border-r-2"
              >
                Số câu hỏi đúng
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(exam, index) in listExamDone"
              :key="index"
              class="cursor-pointer hover:bg-gray-300"
              :class="{ 'bg-gray-100': index % 2 === 0 }"
            >
              <td class="pl-3 py-4 whitespace-nowrap border-r-2">
                {{ exam.user_id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-r-2">
                {{ exam.total_score }}
              </td>
              <td class="px-2 py-4 whitespace-nowrap border-r-2">
                {{ exam.total_question_success }} /
              </td>
            </tr>
          </tbody>
        </table>
      </div> -->
      <TableExamDone :exam-id="examID" />
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
      examID: null,
    }
  },
  computed: {
    ...mapState('users', ['user']),
    ...mapState('exam', ['listHistoryExam']),
    ...mapState('exam', ['listExam']),
    ...mapState('exam', ['listExamDone']),
  },
  async mounted() {
    await this.getInfoUser()
    if (this.user.role === 1) {
      await this.getListHistoryExamByUser(this.userInfo)
    } else {
      await this.getListExamByTeacher()
    }
    await this.getExamByDoneUser(this.examID)
  },
  methods: {
    ...mapActions('users', ['getInfoUser']),
    ...mapActions('exam', ['getListHistoryExamByUser']),
    ...mapActions('exam', ['getListExamByTeacher']),
    ...mapActions('exam', ['getExamByDoneUser']),

    async openTableExamDone(id) {
      this.examID = id
      await this.getExamByDoneUser()
      console.log(this.examID)
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
    getFirstTenChars(text) {
      return text ? text.slice(0, 10) : ''
    },
    truncateText(text, maxLength) {
      return text.length > maxLength
        ? text.substring(0, maxLength) + '...'
        : text
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
