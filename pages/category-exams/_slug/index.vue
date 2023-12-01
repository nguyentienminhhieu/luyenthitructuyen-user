<template>
  <div v-if="nameCategory && slugCategory">
    <HeadingCategorySlug
      :name-category="nameCategory"
    />
    <ListExamCategory :slug-category="slugCategory" />
  </div>
</template>
<script>
import HeadingCategorySlug from '~/components/category/CategorySlug/Heading.vue'
import ListExamCategory from '~/components/category/CategorySlug/ListExam.vue'
export default {
  name: 'CategoryExamSlug',
  components: {
    HeadingCategorySlug,
    ListExamCategory,
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
