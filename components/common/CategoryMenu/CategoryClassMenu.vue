<template>
  <div
    class="menu absolute top-30 right-0 w-[300px] max-h-[400px] bg-white border border-gray-300 mt-2 rounded shadow-md z-50 overflow-auto"
  >
    <ul class="grid grid-cols-2 gap-2 p-2 cursor-pointer">
      <li
        @click="goToCategory(item)"
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
import { mapActions, mapState } from 'vuex'
export default {
  name: 'CategoryClassMenu',
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
    // this.$router.go(0)
    // console.log(this.listGrade.slug)
  },
  methods: {
    ...mapActions('grade', ['getGrade']),
    ...mapActions('category', ['getCategory']),

    goToCategory(nameGrade) {
      this.$router.push({
        path: ' ',
        query: {
          listGrade: JSON.stringify(this.listCategory),
          nameGrade: nameGrade.name,
        },
      })
      this.getCategory(nameGrade.slug)

      // console.log('lll', this.nameGrade.slug)
      // this.$root.$emit('name-grade', nameGrade.name)
    },
  },
}
</script>
<style scoped>
@media (min-width: 900px) {
}

@media (min-width: 360px) and (max-width: 899px) {
  .menu {
    width: 150px;
    max-height: 220px;
    left: 0;
  }
  .menu ul {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
