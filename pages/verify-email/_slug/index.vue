<template>
  <div>
    <VerifyEmailComponent :slug="slug" />
  </div>
</template>
<script>
import VerifyEmailComponent from '~/components/verify-email/index.vue'
export default {
  name: 'VerifyEmail',
  layout: 'authLayout',
  components: {
    VerifyEmailComponent,
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
  },
  mounted() {},
}
</script>
<style></style>
