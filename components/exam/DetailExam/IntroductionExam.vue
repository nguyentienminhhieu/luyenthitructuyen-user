<template>
  <div
    class="container-1 bg-white flex flex-col rounded-lg fixed max-h-[500px] overflow-y-auto pb-4"
  >
    <div class="p-2">
      <div class="text-center text-xl text-red-600 font-semibold my-2">
        {{ formatTime(remainingTime) }}
      </div>
      <div class="flex flex-row flex-wrap">
        <!-- :id="`${question.id}`" -->
        <button
          v-for="question in detailExam.questions"
          :key="question.id"
          :class="{
            'rounded-full w-8 h-8 m-1 bg-gray-500 text-white items-center justify-center hover:bg-gray-600 hover:text-white':
              isQuestionSelected(question.id),
            'rounded-full w-8 h-8 m-1 bg-[#273c75] text-white items-center justify-center hover:bg-[#35529f] hover:text-white':
              !isQuestionSelected(question.id),
          }"
          @click="goToQuestion(question.index)"
        >
          {{ question.index }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Vue from 'vue'
// export const EventBus = new Vue()
export default {
  name: 'IntroductionExam',
  props: {
    detailExam: Object,
    selectedAnswers: Object,
  },
  data() {
    return {
      totalTime: this.detailExam.duration * 60,
      remainingTime: 0,
    }
  },
  mounted() {
    const storedRemainingTime = localStorage.getItem('remainingTime')
    if (storedRemainingTime) {
      this.remainingTime = parseInt(storedRemainingTime)
    } else {
      this.remainingTime = this.totalTime
    }
    this.startCountdown()
    // console.log(this.selectedAnswers)
  },
  watch: {
    selectedAnswers: {
      handler(newValue) {
        // console.log('hieu2', newValue)
      },
      // deep: true,
      // immediate: true,
    },
  },

  methods: {
    isQuestionSelected(questionId) {
      return (
        this.selectedAnswers &&
        this.selectedAnswers.hasOwnProperty(String(questionId))
      )
    },
    handleSend() {
      this.$emit('send-clicked')
    },
    handleOut() {
      this.$emit('out-clicked')
      // localStorage.removeItem('remainingTime')
      // this.$router.push('/')
    },
    // goToQuestion(index) {
    //   EventBus.$emit('go-to-question', index)
    // },
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime -= 1
          localStorage.setItem('remainingTime', this.remainingTime.toString())
        } else {
          clearInterval(this.countdownInterval)
          this.$nuxt.$emit('time-is-up')
        }
      }, 1000)
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    },
  },
  beforeDestroy() {
    clearInterval(this.countdownInterval)
  },
}
</script>
<style scoped>
/* @media (min-width: 375px) and (max-width: 899px) {

} */
</style>
// 'detailExam.questions': { // handler(newValue) { // console.log('hieu123',
newValue) // this.detailExamStatus = newValue // // newValue.filter((exam) =>
exam.answers) // }, // deep: true, // }, // detailExamStatus: { //
handler(newValue) { // console.log('h', newValue) // }, // deep: true, // },
bg-[#273c75]
bg-[#35529f]
bg-[#b3b3b3]