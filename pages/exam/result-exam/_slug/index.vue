<template>
  <div v-if="idExam">
    <div class="header-exam hidden sticky" style="top: 0">
      <HeaderResultExam
        :review-exam="reviewExam"
        :total-score="totalScore"
        :id-exam="idExam"
        :comments-exam="commentsExam"
      />
    </div>
    <div class="container-1 bg-[#e5e5e5] w-full flex flex-row py-10">
      <div class="test-exam w-[60%] mx-10">
        <!-- <TestExamExtend :detail-exam="reviewExam" /> -->
        <ResultExam
          :review-exam="reviewExam"
          :category-exam="categoryResultExam"
        />
      </div>
      <div class="introduction-exam w-[10%] mr-6">
        <IntroductionExam
          :review-exam="reviewExam"
          :total-score="totalScore"
          :id-exam="idExam"
          :comments-exam="commentsExam"
          :success-questions="successQuestions"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import HeaderResultExam from '~/components/exam/ResultExam/HeaderExam.vue'
import ResultExam from '~/components/exam/ResultExam/ResultExam.vue'
import IntroductionExam from '~/components/exam/ResultExam/IntroductionExam.vue'
export default {
  name: 'ResultExamId',
  layout: 'testLayout',
  components: {
    HeaderResultExam,
    ResultExam,
    IntroductionExam,
  },
  data() {
    return {
      idExam: '',
      idReviewExam: '',
      reviewExam: {},
      totalScore: null,
      commentsExam: null,
      categoryResultExam: null,
      successQuestions: null,
    }
  },
  computed: {
    ...mapState('exam', ['detailExam']),
  },
  async mounted() {
    if (this.$route.query.idExam) {
      this.idExam = this.$route.query.idExam
    }
    await this.getReviewExam(this.idExam)
    this.reviewExam = this.detailExam.take_exam
    this.totalScore = this.detailExam.total_score
    this.categoryResultExam = this.detailExam.category
    this.commentsExam = this.detailExam.comments
    this.successQuestions = this.detailExam.total_question_success
  },
  methods: {
    ...mapActions('exam', ['getReviewExam']),
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
