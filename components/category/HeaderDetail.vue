<template>
  <div class="flex flex-row items-center space-x-2 m-6">
    <i class="fa-solid fa-arrow-right"></i>
    <p
      v-if="isExamPage"
      @click="goToCategoryExams"
      class="text-color-custom hover:text-color-custom cursor-pointer"
    >
      {{ nameCategory }}
    </p>
    <p
      v-if="isExercisePage"
      @click="goToCategoryExercise"
      class="text-color-custom hover:text-color-custom cursor-pointer"
    >
      {{ nameCategory }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'HeaderDetail',
  props: {
    // nameSubject: String,
    nameGrade: String,
    nameCategory: String,
    // slugSubject: String,
    slugCategory: String,
    nameCategory: String,
  },
  computed: {
    isExamPage() {
      return this.$nuxt.context.route.path === '/category-exams'
    },
    isExercisePage() {
      return this.$nuxt.context.route.path === '/category-exercise'
    },
  },
  mounted() {},
  methods: {
    goToCategoryExams() {
      // console.log('log', this.slugGrade)
      this.$router.push({
        path: `/category-exams/${this.nameCategory}`,
        query: {
          nameCategory: this.nameCategory,
          nameGrade: this.nameGrade,
          slugCategory: this.slugCategory,
        },
      })
      this.$router.go(1)
    },
    goToCategoryExercise() {
      this.$router.push(`/category-exercise/${this.nameCategory}`)
    },
  },
}
</script>
<style></style>
