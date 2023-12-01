<template>
  <div v-if="listCategory && nameGrade">
    <CategoryExercise :list-category="listCategory" :name-grade="nameGrade" />
  </div>
</template>
<script>
import CategoryExercise from '~/components/category/CategoryExercise/CategoryExercise.vue'
export default {
  name: 'CategoryExercise',
  components: {
    CategoryExercise,
  },
  data() {
    return {
      listCategory: null,
      nameGrade: '',
    }
  },
  mounted() {
    if (this.$route.query.listCategory) {
      this.listCategory = JSON.parse(this.$route.query.listCategory)
    }
    if (this.$route.query.nameGrade) {
      this.nameGrade = this.$route.query.nameGrade
    }
  },
}
</script>
<style></style>
