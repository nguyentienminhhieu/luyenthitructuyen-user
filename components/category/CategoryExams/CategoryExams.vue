<template>
  <div class="mb-10">
    <HeadingCategory :name-grade="nameGrade" />
    <div class="mx-4 mt-14" v-for="item in listCategory" :key="item.id">
      <div>
        <HeaderDetail
          :name-grade="nameGrade"
          :name-category="item.title"
          :slug-category="item.slug"
        />
        <div class="mx-10">
          <!-- :list-exam="listExam" -->
          <SliderCategoryDetail :slug-category="item.slug" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import HeadingCategory from '~/components/category/Heading.vue'
import HeaderDetail from '~/components/category/HeaderDetail.vue'
import SliderCategoryDetail from '~/components/category/SliderCategory/Slider.vue'
export default {
  name: 'CategoryExams',
  components: {
    HeadingCategory,
    HeaderDetail,
    SliderCategoryDetail,
  },
  props: {
    listCategory: Array,
    nameGrade: String,
  },
  data() {
    return {}
  },
  mounted() {
    // console.log('lllll', this.listCategory)
  },
  computed: {
    // ...mapState('exam', ['listExam']),
    // listCategorySlugs() {
    //   return this.listCategory.map((item) => item.slug)
    // },
  },
  watch: {
    '$route.query': {
      handler: 'reloadPage',
      deep: true,
    },
  },
  // async mounted() {
  //   for (const item of this.listCategory) {
  //     // Gọi action và truyền item.slug như payload
  //     await this.getListExamCategory(item.slug)
  //     console.log('....', item.slug)
  //   }
  // },
  methods: {
    // ...mapActions('exam', ['getListExamCategory']),
    reloadPage() {
      location.reload()
    },
  },
}
</script>
<style></style>
