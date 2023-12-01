<template>
  <div
    class="menu absolute top-30 right-0 w-[150px] max-h-[400px] bg-white border border-gray-300 mt-2 rounded shadow-md z-50 overflow-auto"
  >
    <ul class="grid grid-cols-2 gap-2 p-2 cursor-pointer">
      <li
        class="p-2 rounded bg-gray-200 hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis"
      >
        Tạo Đề thi
      </li>
      <li
        class="p-2 rounded bg-gray-200 hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis"
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
  methods: {},
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
