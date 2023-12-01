<template>
  <div
    class="container-1 bg-white flex flex-col rounded-lg fixed max-h-[500px] overflow-y-auto pb-4"
  >
    <div class="p-2">
      <div class="mb-2">
        <h1 class="text-lg font-semibold text-center text-[#5d5d5d]">
          Tổng điểm: {{ totalScore }}
        </h1>
        <p></p>
      </div>
      <div class="flex flex-row flex-wrap">
        <button
          v-for="question in reviewExam.questions"
          :key="question.id"
          @click="goToQuestion(question.index)"
          :class="{
            'rounded-full w-8 h-8 m-1 border-2 border-[#3adf7f] bg-[#aad7b999] text-black items-center justify-center':
              isSuccessDefined(question),
            'rounded-full w-8 h-8 m-1 border-2 border-[#e84c4c] bg-[#d9aaaaac] text-black items-center justify-center':
              !isSuccessDefined(question),
          }"
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
export const EventBus = new Vue()
export default {
  name: 'IntroductionResultExam',
  props: {
    reviewExam: Object,
    totalScore: Number,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    handleOut() {
      this.$router.push('/')
    },
    goToQuestion(index) {
      EventBus.$emit('go-to-question-result', index)
    },
    isSuccessDefined(question) {
      return question.hasOwnProperty('is_success')
    },
    isCorrectQuestion(question) {
      return question.is_success == true
    },
  },
}
</script>
<style scoped>
/* @media (min-width: 375px) and (max-width: 899px) {
  .container-1 {

    display: none;
  }
} */
</style>
