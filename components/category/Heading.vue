<template>
  <div class="flex flex-row items-center space-x-2 m-6">
    <i class="fa-solid fa-arrow-right"></i>
    <nuxt-link to="/" class="text-color-custom hover:text-color-custom"
      >Home</nuxt-link
    >
    <p>//</p>
    <p class="text-color-custom hover:text-color-custom cursor-pointer">
      {{ nameGrade }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'HeadingCategory',
  props: {
    nameGrade: String,
  },
  data() {
    return {
      // nameGrade: '',
    }
  },
  // props: {
  //   nameGrade: String,
  // },
  // created() {
  //   // ...mapState('grade', ['listGrade']),
  //   this.$root.$on('name-grade', (data) => {
  //     this.nameGrade = data
  //   })
  // },
  mounted() {
    // console.log(this.nameGrade)
    // this.nameGrade
    // this.$emit('id-grade', this.nameGrade.id)
  },
  methods: {
    // ...mapActions('grade', ['getGrade']),
  },
}
</script>
<style></style>
