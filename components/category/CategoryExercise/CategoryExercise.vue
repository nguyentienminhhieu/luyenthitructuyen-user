<template>
  <div class="mb-10">
    <HeadingCategory :name-grade="nameGrade" />
    <div class="mx-4 mt-14" v-for="item in listCategory" :key="item.id">
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
  name: 'CategoryExercise',
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
  computed: {},
  watch: {
    '$route.query': {
      handler: 'reloadPage',
      deep: true,
    },
  },
  methods: {
    reloadPage() {
      location.reload()
    },
    ...mapActions('category', ['getCategory']),
  },
}
</script>
<style></style>
