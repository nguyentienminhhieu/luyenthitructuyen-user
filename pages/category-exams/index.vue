<template>
  <div v-if="listCategory && nameGrade">
    <CategoryExams :list-category="listCategory" :name-grade="nameGrade" />
  </div>
</template>
<script>
import CategoryExams from '~/components/category/CategoryExams/CategoryExams.vue'
export default {
  name: 'Category',
  components: {
    CategoryExams,
  },
  data() {
    return {
      listCategory: null,
      nameGrade: '',
      nameSlug: '',
    }
  },
  mounted() {
    if (this.$route.query.listCategory) {
      this.listCategory = JSON.parse(this.$route.query.listCategory)
    }
    if (this.$route.query.nameGrade) {
      this.nameGrade = this.$route.query.nameGrade
    }
    // if (this.$route.query.nameSlug) {
    //   this.nameSlug = this.$route.query.nameSlug // Lấy giá trị nameSlug từ URL query
    // }
  },
}
</script>
<style></style>
