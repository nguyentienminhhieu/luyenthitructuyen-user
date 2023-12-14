<template>
  <div v-if="nameCategory && slugCategory">
    <HeadingCategorySlug :name-category="nameCategory" />
    <ListExerciseCategory :slug-category="slugCategory" />
  </div>
</template>
<script>
import HeadingCategorySlug from '~/components/category/CategorySlug/HeadingExercise.vue'
import ListExerciseCategory from '~/components/category/CategorySlug/ListExercise.vue'
export default {
  name: 'CategoryExerciseSlug',
  components: {
    HeadingCategorySlug,
    ListExerciseCategory,
  },
  data() {
    return {
      nameCategory: '',
      slugCategory: '',
    }
  },
  mounted() {
    if (this.$route.query.nameCategory) {
      this.nameCategory = this.$route.query.nameCategory
    }
    if (this.$route.query.slugCategory) {
      this.slugCategory = this.$route.query.slugCategory
    }
  },
}
</script>
<style></style>
