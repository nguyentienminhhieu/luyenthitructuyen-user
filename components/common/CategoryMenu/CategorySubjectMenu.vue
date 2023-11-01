<template>
  <div
    class="menu absolute top-30 left-0 w-[300px] max-h-[400px] bg-white border border-gray-300 mt-2 rounded shadow-md z-50 overflow-auto"
  >
    <ul class="grid grid-cols-2 gap-2 p-2 cursor-pointer">
      <li
        @click="goToCategory(item.name)"
        v-for="item in listGrade"
        :key="item.id"
        class="p-2 rounded bg-gray-200 hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CategorySubjectMenu',
  data() {
    return {}
  },
  computed: {
    ...mapState('grade', ['listGrade']),
  },
  mounted() {
    this.getGrade()
  },
  methods: {
    ...mapActions('grade', ['getGrade']),

    goToCategory() {
      this.$router.push({
        path: '/subjects',
        query: { listGrade: JSON.stringify(this.listGrade) },
      })

      this.$root.$emit('name-grade', nameGrade)
    },
  },
}
</script>
<style scoped>
@media (min-width: 900px) {
}

@media (min-width: 360px) and (max-width: 899px) {
  .menu {
    width: 200px;
    max-height: 200px;
    left: 0;
  }
  /* .menu ul {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  } */
}
</style>
