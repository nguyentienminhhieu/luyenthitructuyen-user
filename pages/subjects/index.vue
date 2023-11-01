<template>
  <div class="mb-10">
    <HeadingCategory />
    <div class="mx-4 mt-14" v-for="item in listGrade" :key="item.id">
      <div>
        <HeaderDetail :name-grade="item.name" :slug-grade="item.slug"/>
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
  computed: {
    ...mapState('grade', ['listGrade']),
  },
  mounted() {
    this.getGrade()
  },
  methods: {
    ...mapActions('grade', ['getGrade']),
  },
}
</script>
<style></style>
