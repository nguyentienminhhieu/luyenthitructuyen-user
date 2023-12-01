<template>
  <!-- v-if="!ExamQuestionsExtends" -->
  <div class="containers bg-white break-words min-h-screen rounded-md p-4">
    <h1 class="text-2xl font-semibold text-center text-[#5d5d5d]">
      {{ detailExam.title }}
    </h1>
    <div class="flex justify-around my-6">
      <p class="text-lg border-b-2 text-[#5d5d5d]">
        Môn thi: {{ detailExam.category?.subject?.name }}
      </p>
      <p class="text-lg border-b-2 text-[#5d5d5d]">
        {{ detailExam.category?.grade?.name }}
      </p>
    </div>
    <form class="">
      <ul>
        <li
          v-for="question in detailExam.questions"
          :key="question.id"
          :id="`question-${question.index}`"
          class="mb-6"
        >
          <div class="flex flex-col">
            <!-- <p class="text-base font-semibold mr-2">
              Câu hỏi {{ question.index }}:
            </p> -->
            <!-- {{ question.index }} -->
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
                  <!-- {{ answer.content }} -->
                  <!-- {{ selectedAnswers }} -->
                  <!-- {{ isSelected(question, answer) }} -->
                </label>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </form>
    <div class="flex justify-center my-6">
      <button
        class="px-6 py-2 bg-[#7e7e7e] hover:bg-[#9d9d9d] text-white rounded-md mr-4"
        @click="handleOut"
      >
        Thoát
        <i class="fa-solid fa-arrow-right-from-bracket px-1"></i>
      </button>
      <button
        class="px-6 py-2 bg-[#273c75] hover:bg-[#395193] text-white rounded-md"
        @click="handleSend"
      >
        Nộp bài
        <i class="fa-regular fa-paper-plane px-1"></i>
      </button>
    </div>
    <ToastError v-if="showErrorToast" :message="errorMessage" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { EventBus } from './IntroductionExam.vue'
import ToastError from '~/components/common/ToastError.vue'

export default {
  name: 'TestExam',
  props: {
    detailExam: Object,
  },
  components: {
    ToastError,
  },
  data() {
    return {
      selectedAnswers: {},
      showErrorToast: false,
      errorMessage: 'Bạn chưa trả lời hết các câu hỏi.',
    }
  },
  computed: {
    allQuestionsAnswered() {
      return (
        Object.keys(this.selectedAnswers).length ===
        this.detailExam.questions.length
      )
    },
  },
  mounted() {
    const storedAnswers = localStorage.getItem('answersKey')

    if (storedAnswers) {
      this.selectedAnswers = JSON.parse(storedAnswers)
    } else {
      this.selectedAnswers = {}
    }
    EventBus.$on('go-to-question', this.handleGoToQuestion)
  },
  methods: {
    ...mapActions('exam', ['submitExam']),
    handleOut() {
      // this.$emit('out-clicked')
      localStorage.removeItem('answersKey')
      localStorage.removeItem('remainingTime')
      this.$router.push('/')
    },
    sendPayload() {
      const payload = this.prepareSubmissionPayload()
      this.$emit('send-payload', payload)
    },
    // async handleSend() {
    handleSend() {
      if (this.allQuestionsAnswered) {
        const payload = this.prepareSubmissionPayload()
        this.$emit('send-payload', payload)
        this.$emit('send-clicked')
      } else {
        // Hiển thị thông báo lỗi, ví dụ:
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
    prepareSubmissionPayload() {
      return {
        slug: this.detailExam.slug,
        take_exam: {
          id: this.detailExam.id,
          questions: this.prepareQuestionsPayload(this.detailExam.questions),
        },
      }
    },
    prepareQuestionsPayload(questions) {
      return questions.map((question) => ({
        id: question.id,
        content: question.content,
        answers: this.prepareAnswersPayload(question.answers, question),
      }))
    },
    prepareAnswersPayload(answers, question) {
      return answers.map((answer) => ({
        id: answer.id,
        content: answer.content,
        checked: this.isSelected(question, answer),
      }))
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
  },
}
</script>
<style scoped>
.selected-answer {
  border: 2px solid #253d90;
  background-color: #5266b020;
}
@media (min-width: 375px) and (max-width: 899px) {
  /* .containers {
    width: 90%;
    min-width: 600px;
  } */
}
</style>
