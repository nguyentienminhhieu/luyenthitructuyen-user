<template>
  <div>
    <HeadingCategorySlug />
    <ListExamCategory />
  </div>
</template>
<script>
import HeadingCategorySlug from '~/components/category/CategorySlug/Heading.vue'
import ListExamCategory from '~/components/category/CategorySlug/ListExam.vue'
export default {
  name: 'CategorySubjectSlug',
  components: {
    HeadingCategorySlug,
    ListExamCategory,
  },
}
</script>
<style></style>
