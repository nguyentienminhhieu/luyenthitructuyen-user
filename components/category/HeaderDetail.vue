<template>
  <div class="flex flex-row items-center space-x-2 m-6">
    <i class="fa-solid fa-arrow-right"></i>
    <p
      v-if="isClassesPage"
      @click="goToCategoryClass"
      class="text-color-custom hover:text-color-custom cursor-pointer"
    >
      {{ nameSubject }}
    </p>
    <p
      @click="goToCategorySubject"
      class="text-color-custom hover:text-color-custom cursor-pointer"
    >
      {{ nameGrade }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'HeaderDetail',
  props: {
    nameSubject: String,
    nameGrade: String,
    slugSubject: String,
    slugGrade: String,
  },
  computed: {
    isClassesPage() {
      return this.$nuxt.context.route.path === '/classes'
    },
  },
  methods: {
    goToCategoryClass() {
      this.$router.push(`/classes/${slugGrade}`)
    },
    goToCategorySubject() {
      this.$router.push(`/subjects/${slugSubject}`)
    },
  },
}
</script>
<style></style>
