<template>
  <div
    v-if="listExamDone < 0"
    class="table-1 w-[90%] items-center mx-auto my-20 overflow-x-auto max-h-[600px]"
  >
    <table class="w-[100%] border-collapse border border-gray-300 rounded-lg">
      <thead>
        <tr class="bg-[#3c445c] text-white">
          <th
            class="pl-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Tên người thi
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Điểm Số
          </th>
          <th
            class="px-0 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Số câu hỏi đúng
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <td class="pl-3 py-4 whitespace-nowrap border-r-2">
          {{ examID }}
        </td>
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
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'TableExamDone',
  props: {
    examID: Number,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('exam', ['listExamDone']),
    getlistExamDone() {
      this.listExamDone.length > 0
    },
  },
  mounted() {
    this.getExamByDoneUser(this.examID)
  },
  methods: {
    ...mapActions('exam', ['getExamByDoneUser']),
  },
}
</script>
<style></style>
