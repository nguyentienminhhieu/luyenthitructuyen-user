<template>
  <div>
    <div
      class="menu absolute top-30 left-0 w-[150px] max-h-[400px] bg-white border border-gray-300 mt-2 rounded shadow-md z-50 overflow-auto"
    >
      <ul class="grid grid-cols-2 gap-2 cursor-pointer">
        <li
          @click="goToCategory(item)"
          v-for="item in listGrade"
          :key="item.id"
          class="p-4 rounded text-[#5d5d5d] font-bold hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis transition duration-300 ease-in-out"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div
      v-if="showNewMenu"
      class="new-menu absolute top-30 left-[150px] w-[170px] max-h-[550px] bg-white border border-gray-300 mt-2 rounded shadow-md z-50 overflow-auto"
    >
      <ul class="grid grid-cols-2 gap-2 cursor-pointer">
        <!-- Hiển thị nội dung menu mới -->
        <li
          @click="goToPageCategory(category)"
          v-for="category in listCategory"
          :key="category.id"
          class="p-4 rounded text-[#5d5d5d] font-bold hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis transition duration-300 ease-in-out"
        >
          {{ category.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CategoryExerciseMenu',
  data() {
    return {
      showNewMenu: false,
    }
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

    async goToCategory(item) {
      this.showNewMenu = !this.showNewMenu

      await this.getCategory(item.slug)
    },
    goToPageCategory(category) {
      this.$router.push({
        path: `/category-exercise/${category.slug}`,
        query: {
          slugCategory: category.slug,
          nameCategory: category.title,
        },
      })
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
