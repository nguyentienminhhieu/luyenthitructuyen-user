<template>
  <div v-if="listGrade && nameGrade" class="mb-10">
    <HeadingCategory :name-grade="nameGrade" />
    <div class="mx-4 mt-14" v-for="item in listGrade" :key="item.id">
      <div>
        <HeaderDetail :name-subject="item.title" :slug-grade="item.slug" />
        <div class="mx-10">
          <SliderCategoryDetail />
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
  name: 'Category',
  components: {
    HeadingCategory,
    HeaderDetail,
    SliderCategoryDetail,
  },
  data() {
    return {
      listGrade: null,
      nameGrade: '',
    }
  },
  computed: {
    // ...mapState('category', ['listCategory']),
  },
  mounted() {
    this.getCategory()
    if (this.$route.query.listGrade) {
      this.listGrade = JSON.parse(this.$route.query.listGrade)
    }
    if (this.$route.query.nameGrade) {
      this.nameGrade = this.$route.query.nameGrade
    }
    console.log('slug', this.nameGrade)
  },
  methods: {
    ...mapActions('category', ['getCategory']),
    // idGrade(id) {
    //   this.idGradeH = id
    // },
  },
}
</script>
<style></style>
