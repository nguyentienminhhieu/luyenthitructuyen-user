<template>
  <div
    class="menu absolute top-30 left-0 w-[150px] max-h-[400px] bg-white border border-gray-300 mt-2 rounded shadow-md z-50 overflow-auto"
  >
    <ul class="grid grid-cols-2 gap-2 cursor-pointer">
      <li
        @click="openModalAddExam"
        class="p-4 rounded text-[#5d5d5d] font-bold hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis transition duration-300 ease-in-out"
      >
        Tạo Đề thi
      </li>
      <li
        @click="openModalAddExercise"
        class="p-4 rounded text-[#5d5d5d] font-bold hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis transition duration-300 ease-in-out"
      >
        Tạo Bài tập
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'CreateExamExe',
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    openModalAddExam() {
      this.$emit('open-add-exam')
    },
    openModalAddExercise() {
      this.$emit('open-add-exercise')
    },
  },
}
</script>
<style scoped>
@media (min-width: 900px) {
  .menu ul {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media (min-width: 360px) and (max-width: 899px) {
  .menu {
    width: 150px;
    max-height: 220px;
    /* left: 0; */
  }
  .menu ul {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
