<template>
  <div class="flex flex-row items-center space-x-2 m-6">
    <i class="fa-solid fa-arrow-right"></i>
    <nuxt-link to="/" class="text-color-custom hover:text-color-custom"
      >Home</nuxt-link
    >
    <p>//</p>
    <p class="text-color-custom hover:text-color-custom cursor-pointer">
      {{ nameCategory }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'HeadingCategorySlug',
  props: {
    nameCategory: String,
  },
  computed: {
  },
  mounted() {

  },
  methods: {
  },
}
</script>
<style></style>
