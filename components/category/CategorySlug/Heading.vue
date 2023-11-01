<template>
  <div class="flex flex-row items-center space-x-2 m-6">
    <i class="fa-solid fa-arrow-right"></i>
    <nuxt-link to="/" class="text-color-custom hover:text-color-custom"
      >Home</nuxt-link
    >
    <p>/</p>
    <p class="text-color-custom hover:text-color-custom cursor-pointer">
      Category
    </p>
    <p>/</p>
    <p class="text-color-custom hover:text-color-custom cursor-pointer">
      Lop 6
    </p>
    <p>/</p>
    <p class="text-color-custom hover:text-color-custom cursor-pointer">Toan</p>
  </div>
</template>
<script>
export default {
  name: 'HeadingCategorySlug',
  computed: {
    // ...mapState('subject', ['listSubject']),
  },
  mounted() {
    // this.getSubjects()
  },
  methods: {
    // ...mapActions('subject', ['getSubjects']),
    // goToCategory() {
    //   this.$router.push(`/category`)
    // },
  },
}
</script>
<style></style>
