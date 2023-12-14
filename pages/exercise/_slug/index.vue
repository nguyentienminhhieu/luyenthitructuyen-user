<template>
  <div v-if="detailExercise">
    <div class="header-exam hidden sticky" style="top: 0">
      <HeaderExercise
        :detail-exercise="detailExercise"
        @out-clicked="showOutModal = true"
        @send-clicked="sendClicked"
      />
    </div>

    <div class="container-1 bg-[#e5e5e5] w-full flex flex-row py-10">
      <!-- <div v-if="!ExamQuestionsExtends" class="test-exam w-[60%] mx-10">
      </div> -->
      <div class="test-exam w-[60%] mx-10">
        <!-- <TestExamExtend :detail-exercise="detailExercise" /> -->
        <TestExercise
          :detail-exercise="detailExercise"
          @answer-selected="handleAnswerSelected"
          @out-clicked="showOutModal = true"
        />
      </div>
      <div class="introduction-exam w-[10%] mr-6">
        <IntroductionExercise
          :detail-exercise="detailExercise"
          :selected-answers="selectedAnswers"
          @out-clicked="outClicked"
        />
      </div>
    </div>
    <ModalOutExam :show-modal="showOutModal" @close="showOutModal = false" />
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import IntroductionExercise from '~/components/exercise/DetailExercise/IntroductionExercise.vue'
import TestExercise from '~/components/exercise/DetailExercise/TestExercise.vue'
import HeaderExercise from '~/components/exercise/DetailExercise/HeaderExam.vue'
import ModalOutExam from '~/components/exam/ModalOutExam/OutExam.vue'

export default {
  name: 'Slug',
  components: {
    IntroductionExercise,
    TestExercise,
    HeaderExercise,
    ModalOutExam,
  },
  layout: 'testLayout',
  data() {
    return {
      showSendModal: false,
      showOutModal: false,
      showResultModal: false,
      // detailExercise: null,
      selectedAnswers: {},
      submissionPayload: null,
    }
  },
  computed: {
    ...mapState('exercise', ['detailExercise']),
    ...mapGetters('exercise', ['getDetailExercise']),
  },

  mounted() {
    if (this.$route.query.slugExercise) {
      this.slugExercise = this.$route.query.slugExercise
    }
    this.$nuxt.$on('time-is-up', this.showSendModal === true)
    this.getExerciseBySlug(this.slugExercise)
    this.setDetailExercise(this.detailExercise)
  },
  methods: {
    ...mapActions('exercise', ['getExerciseBySlug', 'setDetailExercise']),
    handleAnswerSelected({ question, answer, isSelected }) {
      this.selectedAnswers[question.id] = { question, answer, isSelected }
    },
    closeSendModal() {
      this.showSendModal = false
    },
    handleSendPayload(payload) {
      this.submissionPayload = payload
    },
    sendClicked() {
      this.showSendModal = true
    },
    outClicked() {
      this.showOutModal = true
    },
    openResultModal() {
      this.showResultModal = true
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
