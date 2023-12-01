<template>
  <div v-if="detailExam">
    <div class="header-exam hidden sticky" style="top: 0">
      <HeaderExam
        :detail-exam="detailExam"
        @out-clicked="showOutModal = true"
        @send-clicked="sendClicked"
      />
    </div>

    <div class="container-1 bg-[#e5e5e5] w-full flex flex-row py-10">
      <!-- <div v-if="!ExamQuestionsExtends" class="test-exam w-[60%] mx-10">
      </div> -->
      <div class="test-exam w-[60%] mx-10">
        <!-- <TestExamExtend :detail-exam="detailExam" /> -->
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
    </div>
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
  },
  layout: 'testLayout',
  data() {
    return {
      showSendModal: false,
      showOutModal: false,
      showResultModal: false,
      // detailExam: null,
      selectedAnswers: {},
      submissionPayload: null,
      takeExams: null,
    }
  },
  computed: {
    ...mapState('exam', ['detailExam']),
    ...mapGetters('exam', ['getDetailExam']),
    //   ExamQuestionsExtends() {
    //     // Check if this.detailExam is defined before accessing its properties
    //     // return (
    //     //   this.detailExam &&
    //     //   this.detailExam.questions &&
    //     //   this.detailExam.questions.questions_extends.length > 0
    //     // )
    //   },
  },

  mounted() {
    // const savedSendModalState = localStorage.getItem('sendModalState')
    // if (savedSendModalState !== null) {
    //   this.showSendModal = savedSendModalState === 'true'
    // }

    // const savedOutModalState = localStorage.getItem('outModalState')
    // if (savedOutModalState !== null) {
    //   this.showOutModal = savedOutModalState === 'true'
    // }
    // const savedResultModalState = localStorage.getItem('resultModalState')
    // if (savedResultModalState !== null) {
    //   this.showResultModal = savedResultModalState === 'true'
    // }
    if (this.$route.query.slugExam) {
      this.slugExam = this.$route.query.slugExam
    }
    this.$nuxt.$on('time-is-up', this.showSendModal === true)
    // console.log('lll', this.detailExam)
    this.getExamBySlug(this.slugExam)
    this.setDetailExam(this.detailExam)
    console.log(this.detailExam)
  },
  methods: {
    ...mapActions('exam', ['getExamBySlug', 'setDetailExam']),
    handleAnswerSelected({ question, answer, isSelected }) {
      this.selectedAnswers[question.id] = { question, answer, isSelected }
    },
    closeSendModal() {
      this.showSendModal = false
    },
    handleSendPayload(payload) {
      this.submissionPayload = payload
      // console.log('...', this.submissionPayload)
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
