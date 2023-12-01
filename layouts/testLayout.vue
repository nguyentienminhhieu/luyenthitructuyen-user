<template>
  <div>
    <header
      class="bg-[#273c75] py-4 px-14 h-16 flex justify-between items-center sticky top-0"
    >
      <div class="flex items-center space-x-4">
        <h1
          @click="goToHome"
          class="cursor-pointer logo-color text-2xl font-bold"
        >
          LOGO
        </h1>
      </div>
    </header>
    <nuxt />

    <footer class="text-color-default bg-[#f1f2f6]">
      <div class="container mx-auto text-center">
        <div>
          <p>
            <i class="fa-solid fa-phone"></i> 0969 351 130<span> | </span
            ><i class="fa-solid fa-envelope"></i> nguyentienmhieu@gmail.com
          </p>
        </div>
        <p>&copy; 2023 Your Company</p>
      </div>
    </footer>
    <ModalOutExam :show-modal="showOutModal" @close="showOutModal = false" />
  </div>
</template>
<script>
import ModalOutExam from '~/components/exam/ModalOutExam/OutExam.vue'

export default {
  name: 'testLayout',
  data() {
    return { showOutModal: false }
  },
  components: {
    ModalOutExam,
  },
  methods: {
    goToHome() {
      this.showOutModal = true
    },
  },
}
</script>
<style scoped>
@media (min-width: 375px) and (max-width: 899px) {
  header {
    /* height: 3rem; */
    display: none;
  }

  .logo-color {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
</style>
