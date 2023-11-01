<template>
  <div class="">
    <div class="header-exam hidden sticky" style="top: 0">
      <HeaderExam
        @out-clicked="showOutModal = true"
        @send-clicked="showSendModal = true"
      />
    </div>

    <div class="container-1 bg-[#e5e5e5] w-full flex flex-row py-10">
      <div class="test-exam w-[60%] mx-10">
        <TestExam />
      </div>
      <div class="introduction-exam w-[10%] mr-6">
        <IntroductionExam
          @out-clicked="showOutModal = true"
          @send-clicked="showSendModal = true"
        />
      </div>
    </div>
    <ModalSendExam
      :show-modal="showSendModal"
      @close="closeSendModal"
      @result-clicked="openResultModal"
    />
    <ModalOutExam :show-modal="showOutModal" @close="showOutModal = false" />
    <ModalResultExam
      :show-modal="showResultModal"
      @close="showResultModal = false"
    />
  </div>
</template>
<script>
import IntroductionExam from '~/components/exam/DetailExam/IntroductionExam.vue'
import TestExam from '~/components/exam/DetailExam/TestExam.vue'
import HeaderExam from '~/components/exam/DetailExam/HeaderExam.vue'
import ModalSendExam from '~/components/exam/ModalSendExam/SendExam.vue'
import ModalOutExam from '~/components/exam/ModalOutExam/OutExam.vue'
import ModalResultExam from '~/components/exam/ModalResultExam/ResultExam.vue'
export default {
  name: 'Slug',
  components: {
    IntroductionExam,
    TestExam,
    HeaderExam,
    ModalSendExam,
    ModalOutExam,
    ModalResultExam,
  },
  layout: 'testLayout',
  data() {
    return {
      showSendModal: false,
      showOutModal: false,
      showResultModal: false,
    }
  },
  methods: {
    closeSendModal() {
      this.showSendModal = false
    },
    openResultModal() {
      this.showResultModal = true
      this.closeSendModal() // Đóng modal Send khi mở modal Result
    },
  },
}
</script>
<style scoped>
@media (min-width: 375px) and (max-width: 899px) {
  .container-1 {
    width: 100%;
  }
  .test-exam {
    width: 100%;
    margin: 0 10px;
  }
  .introduction-exam {
    display: none;
  }
  .header-exam {
    display: block;
    /* margin: 10px; */
  }
}
</style>
