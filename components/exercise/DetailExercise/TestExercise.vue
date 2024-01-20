<template>
  <div class="container-1 bg-[#e5e5e5] w-full flex flex-row py-10">
    <div class="test-exam w-[60%] mx-10">
      <div class="containers bg-white break-words min-h-screen rounded-md p-4">
        <h1 class="text-2xl font-semibold text-center text-[#5d5d5d]">
          {{ detailExercise.title }}
        </h1>
        <div class="flex justify-around my-6">
          <p class="text-lg border-b-2 text-[#5d5d5d]">
            Môn học: {{ detailExercise.category?.subject?.name }}
          </p>
          <p class="text-lg border-b-2 text-[#5d5d5d]">
            {{ detailExercise.category?.grade?.name }}
          </p>
        </div>
        <form class="">
          <ul>
            <li
              v-for="question in detailExercise.questions"
              :key="question.id"
              :id="`question-${question.index}`"
              class="mb-6"
            >
              <div class="flex flex-col">

                <h3 class="text-base font-medium text-[#5d5d5d]">
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
                      :for="`toggle-${answer.id}`"
                      class="block p-2 border rounded-lg mb-2 cursor-pointer hover:bg-gray-100 transition-colors"
                      :class="{
                        'border-2 border-[#253d90] bg-[#5266b020]': isSelected(
                          question,
                          answer
                        ),
                      }"
                    >
                      <input
                        :id="`toggle-${answer.id}`"
                        @change="isSelected(question, answer)"
                        type="radio"
                        :value="answer.id"
                        v-model="selectedAnswers[question.id]"
                        class="mr-2 cursor-pointer sr-only"
                      />
                      <span v-html="answer.content"></span>
                    </label>
                  </li>
                </ul>
                <div v-for="answer in question.answers" :key="answer.id">
                  <div v-if="answer.explanation !== ''">
                    <div v-if="isQuestionAnswered(question)" class="">
                      <h1
                        @click="openExplan(question)"
                        class="text-[#5d5d5d] font-medium cursor-pointer"
                      >
                        Giải Thích
                        <i
                          class="fa-solid fa-caret-up"
                          :class="{ 'rotate-180': handleExplanation }"
                        ></i>
                      </h1>
                      <p
                        v-if="handleExplanation"
                        class="text-[#50bd5c] font-medium"
                      >
                        {{ answer.explanation }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </form>
        <ToastError v-if="showErrorToast" :message="errorMessage" />
      </div>
    </div>
    <div class="introduction-exam w-[10%] mr-6">
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
                'rounded-full w-8 h-8 m-1  text-black items-center justify-center border-1 border-[#bababa] bg-gray-200 hover:bg-gray-300 hover:text-white':
                  !isQuestionSelected(question.id),
                'rounded-full w-8 h-8 m-1  text-black items-center justify-center border-2 border-[#273c75] bg-[#909bbb] hover:bg-[#35529f] hover:text-white':
                  isQuestionSelected(question.id),
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
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ToastError from '~/components/common/ToastError.vue'

export default {
  name: 'TestExercise',
  props: {
    detailExercise: Object,
  },
  components: {
    ToastError,
  },
  data() {
    return {
      selectedAnswers: {},
      handleExplanation: false,
      openedExplanations: {},
      showErrorToast: false,
      errorMessage: 'Bạn chưa trả lời hết các câu hỏi.',
    }
  },
  computed: {
    allQuestionsAnswered() {
      return (
        Object.keys(this.selectedAnswers).length ===
        this.detailExercise.questions.length
      )
    },
    isQuestionAnswered() {
      return (question) => this.selectedAnswers[question.id] !== undefined
    },
  },
  mounted() {
    const storedAnswers = localStorage.getItem('answersKey')

    if (storedAnswers) {
      this.selectedAnswers = JSON.parse(storedAnswers)
    } else {
      this.selectedAnswers = {}
    }
  },
  methods: {
    ...mapActions('exam', ['submitExam']),
    handleOut() {
      this.$emit('out-clicked')
      localStorage.removeItem('answersKey')
      localStorage.removeItem('remainingTime')
      // this.$router.push('/')
    },
    openExplan() {
      this.handleExplanation = !this.handleExplanation
    },
    handleSend() {
      if (this.allQuestionsAnswered) {
        const payload = this.prepareSubmissionPayload()
        this.$emit('send-payload', payload)
        this.$emit('send-clicked')
      } else {
        this.showErrorToast = true
        setTimeout(() => {
          this.showErrorToast = false
        }, 3000)
      }
    },
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
    isSelected(question, answer) {
      const isSelected = this.selectedAnswers[question.id] === answer.id
      this.$emit('answer-selected', { question, answer, isSelected })
      this.saveAnswersToLocalStorage()
      return isSelected
    },
    saveAnswersToLocalStorage() {
      localStorage.setItem('answersKey', JSON.stringify(this.selectedAnswers))
    },
    isQuestionSelected(questionId) {
      return (
        this.selectedAnswers &&
        this.selectedAnswers.hasOwnProperty(String(questionId))
      )
    },
    goToQuestion(index) {
      this.handleGoToQuestion(index)
    },
  },
}
</script>
<style scoped>
.selected-answer {
  border: 2px solid #253d90;
  background-color: #5266b020;
}
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
