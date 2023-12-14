<template>
  <div
    class="table-1 w-[90%] ml-5 items-center mx-auto my-20 overflow-x-auto max-h-[600px]"
  >
    <table class="w-[100%] border-collapse border border-gray-300 rounded-lg">
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
          v-for="(exam, index) in listExamDone"
          :key="index"
          class="cursor-pointer hover:bg-gray-300"
          :class="{ 'bg-gray-100': index % 2 === 0 }"
        >
          <td class="pl-3 py-4 whitespace-nowrap border-r-2">
            {{ exam.user_id }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap border-r-2">
            {{ exam.total_score }} / 100
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
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'TableExamDone',
  props: {
    listExamDone: Array,
  },
  data() {
    return {}
  },
  computed: {
    // ...mapState('exam', ['listExamDone']),
    getlistExamDone() {
      this.listExamDone.length > 0
    },
  },
  mounted() {},
  methods: {
    // ...mapActions('exam', ['getExamByDoneUser']),
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
<style></style>
