<template>
  <div v-if="slugExam">
    <div class="header-exam hidden sticky" style="top: 0">
      <HeaderExam
        :detail-exam="detailExam"
        @out-clicked="showOutModal = true"
        @send-clicked="sendClicked"
      />
    </div>

    <TestExam
      :detail-exam="detailExam"
      @answer-selected="handleAnswerSelected"
      @out-clicked="showOutModal = true"
      @send-clicked="sendClicked"
      @send-payload="handleSendPayload"
      @timeout-clicked="showTimeOutModal = true"
      @payload-emitted="handlePayload"
    />
    <!-- <div class="container-1 bg-[#e5e5e5] w-full flex flex-row py-10">
      <div class="test-exam w-[60%] mx-10">
        <TestExam
          :detail-exam="detailExam"
          @answer-selected="handleAnswerSelected"
          @out-clicked="showOutModal = true"
          @send-clicked="sendClicked"
          @send-payload="handleSendPayload"
        />
      </div>
      <div class="introduction-exam w-[10%] mr-6">
        <IntroductionExam
          :detail-exam="detailExam"
          :selected-answers="selectedAnswers"
          @out-clicked="outClicked"
          @send-clicked="sendClicked"
        />
      </div>
    </div> -->
    <ModalSendExam
      :show-modal="showSendModal"
      :payload="submissionPayload"
      @close="closeSendModal"
      @result-clicked="openResultModal"
      @take-exams="handleTakeExams"
    />
    <ModalOutExam :show-modal="showOutModal" @close="showOutModal = false" />
    <ModalResultExam
      :show-modal="showResultModal"
      :takeExams="takeExams"
      :detailExam="detailExam"
      @close="showResultModal = false"
    />
    <ModalTimeOut
      :show-modal="showTimeOutModal"
      :payload="submissionPayload"
      @result-clicked="openResultModal"
      @take-exams="handleTakeExams"
      @close="showTimeOutModal = false"
    />
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import IntroductionExam from '~/components/exam/DetailExam/IntroductionExam.vue'
import TestExam from '~/components/exam/DetailExam/TestExam.vue'
import TestExamExtend from '~/components/exam/DetailExam/TestExamExtend.vue'
import HeaderExam from '~/components/exam/DetailExam/HeaderExam.vue'
import ModalSendExam from '~/components/exam/ModalSendExam/SendExam.vue'
import ModalOutExam from '~/components/exam/ModalOutExam/OutExam.vue'
import ModalResultExam from '~/components/exam/ModalResultExam/ResultExam.vue'
import ModalTimeOut from '~/components/exam/ModalTimeOut/index.vue'
export default {
  name: 'Slug',
  components: {
    IntroductionExam,
    TestExam,
    TestExamExtend,
    HeaderExam,
    ModalSendExam,
    ModalOutExam,
    ModalResultExam,
    ModalTimeOut,
  },
  layout: 'testLayout',
  data() {
    return {
      showSendModal: false,
      showOutModal: false,
      showResultModal: false,
      showTimeOutModal: false,
      selectedAnswers: {},
      submissionPayload: null,
      takeExams: null,
      slugExam: '',
    }
  },
  computed: {
    ...mapState('exam', ['detailExam']),
  },

  mounted() {
    if (this.$route.query.slugExam) {
      this.slugExam = this.$route.query.slugExam
      this.getExamBySlug(this.slugExam)
    }
  },

  methods: {
    ...mapActions('exam', ['getExamBySlug']),
    handleAnswerSelected({ question, answer, isSelected }) {
      this.selectedAnswers[question.id] = { question, answer, isSelected }
    },
    closeSendModal() {
      this.showSendModal = false
    },
    handleSendPayload(payload) {
      this.submissionPayload = payload
    },
    handlePayload(payload) {
      this.submissionPayload = payload
    },
    handleTakeExams(data) {
      this.takeExams = data
    },
    sendClicked() {
      this.showSendModal = true
      // localStorage.setItem('sendModalState', this.showSendModal.toString())
    },
    outClicked() {
      this.showOutModal = true
      // localStorage.setItem('outModalState', this.showOutModal.toString())
    },
    openResultModal() {
      this.showResultModal = true
      // localStorage.setItem('resultModalState', this.showResultModal.toString())
      this.closeSendModal()
      this.showTimeOutModal = false
    },
  },
}
</script>
<style scoped></style>
