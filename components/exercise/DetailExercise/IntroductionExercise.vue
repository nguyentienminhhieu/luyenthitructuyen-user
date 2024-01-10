<template>
  <div
    class="container-1 bg-white flex flex-col rounded-lg fixed max-h-[500px] overflow-y-auto pb-4"
  >
    <div class="p-2">
      <div class="flex flex-row flex-wrap">
        <!-- :id="`${question.id}`" -->
        <button
          v-for="question in detailExercise.questions"
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
    <div class="flex justify-center my-6">
      <button
        class="px-6 py-2 bg-[#7e7e7e] hover:bg-[#9d9d9d] text-white rounded-md mr-4"
        @click="handleOut"
      >
        Thoát
        <i class="fa-solid fa-arrow-right-from-bracket px-1"></i>
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Vue from 'vue'
// export const EventBus = new Vue()
export default {
  name: 'IntroductionExercise',
  props: {
    detailExercise: Object,
    selectedAnswers: Object,
  },
  data() {
    return {}
  },
  mounted() {},
  watch: {
    detailExercise: {
      handler(newValue, oldValue) {
        console.log('123', newValue, this.selectedAnswers)
        this.selectedAnswers
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    isQuestionSelected(questionId) {
      // console.log(this.selectedAnswers)
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
    },
    // goToQuestion(index) {
    //   EventBus.$emit('go-to-question', index)
    // },
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
