<template>
  <div>
    <div class="containers bg-white break-words min-h-screen rounded-md p-4">
      <h1 class="text-2xl font-semibold text-center text-[#5d5d5d]">
        {{ reviewExam.title }}
      </h1>
      <div class="flex justify-around my-6">
        <p class="text-[#5d5d5d]">Môn thi: ...</p>
        <p class="text-[#5d5d5d]">Lớp: ...</p>
      </div>
      <div class="">
        <ul>
          <li
            v-for="question in reviewExam.questions"
            :key="question.id"
            :id="`question-${question.index}`"
            class="mb-6"
          >
            <div class="flex flex-row">
              <div v-if="!question.is_success">
                <i class="fa-solid fa-xmark text-[#D81515]"></i>
              </div>
              <div v-if="question.is_success">
                <i class="fa-solid fa-check text-[#4ccc81]"></i>
              </div>
              <h3 class="text-base font-medium text-[#5d5d5d] ml-1">
                <span v-html="question.content"></span>
              </h3>
              <div
                v-if="question.file"
                class="max-w-[300px] max-h-[200px] mx-auto"
              >
                <img
                  :src="question.file"
                  alt=""
                  class="w-full h-full object-contain"
                />
              </div>
            </div>
            <div class="mt-2">
              <ul>
                <li v-for="answer in question.answers" :key="answer.id">
                  <label
                    class="block p-2 border rounded-lg mb-2 cursor-pointe transition-colors"
                    :class="{
                      'border-2 border-[#51e990] bg-[#dde5ddac]':
                        isCorrect(answer),
                      'border-2 border-[#c94343] bg-[#eee8e8ac]':
                        isNotCorrectQuestion(answer),
                      'border-2 border-[#51e990] bg-[#e4eae699]':
                        isCorrectQuestion(answer),
                    }"
                  >
                    <input
                      type="radio"
                      :value="answer.id"
                      class="mr-2 cursor-pointer sr-only"
                    />
                    <span v-html="answer.content"></span>
                  </label>
                </li>
              </ul>
              <div v-for="answer in question.answers" :key="answer.id">
                <div v-if="answer.explanation !== ''">
                  <h1 class="text-[#5d5d5d] font-medium">
                    Giải Thích: {{ answer.explanation }}
                  </h1>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { EventBus } from './IntroductionExam.vue'
export default {
  name: 'ResultExam',
  props: {
    reviewExam: Object,
  },
  data() {
    return {}
  },
  mounted() {
    EventBus.$on('go-to-question-result', this.handleGoToQuestion)
  },
  methods: {
    isCorrectQuestion(answer) {
      return answer.checked == true && answer.is_correct === 1
    },
    isNotCorrectQuestion(answer) {
      return answer.checked == true && answer.is_correct === 0
    },
    isCorrect(answer) {
      return answer.checked == false && answer.is_correct === 1
    },
    // isNotCorrect(answer) {
    //    answer.is_correct === 0
    // },
    handleGoToQuestion(index) {
      const questionElement = document.getElementById(`question-${index}`)
      if (questionElement) {
        questionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        })
      }
    },
  },
}
</script>
<style></style>
