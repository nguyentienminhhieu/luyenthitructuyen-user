<template>
  <div
    class="menu absolute top-30 left-0 w-[150px] max-h-[400px] bg-white border border-gray-300 mt-2 rounded shadow-md z-50 overflow-auto"
  >
    <ul class="grid grid-cols-2 gap-2 cursor-pointer">
      <li
        @click="goToCategory(item.name)"
        v-for="item in listGrade"
        :key="item.id"
        class="p-4 rounded text-[#5d5d5d] font-bold hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis transition duration-300 ease-in-out"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CategoryExerciseMenu',
  data() {
    return {}
  },
  computed: {
    ...mapState('grade', ['listGrade']),
    ...mapState('category', ['listCategory']),
  },
  mounted() {
    this.getGrade()
    this.getCategory()
  },
  methods: {
    ...mapActions('grade', ['getGrade']),
    ...mapActions('category', ['getCategory']),

    async goToCategory(nameGrade) {
      await this.getCategory(nameGrade.slug)
      this.$router.push({
        path: '/category-exercise',
        query: {
          listCategory: JSON.stringify(this.listCategory),
          nameGrade: nameGrade.name,
        },
      })
      console.log('log', this.listCategory)
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
    width: 200px;
    max-height: 200px;
    left: 0;
  }
  .menu ul {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
