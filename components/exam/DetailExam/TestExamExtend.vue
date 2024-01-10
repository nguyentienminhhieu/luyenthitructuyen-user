<template>
  <!-- v-if="!ExamQuestionsExtends" -->
  <div class="containers bg-white break-words min-h-screen rounded-md p-4">
    <h1 class="text-2xl font-semibold text-center text-[#5d5d5d]">
      {{ detailExam.title }}
    </h1>
    <div class="flex justify-around my-6">
      <p class="text-[#5d5d5d]">Môn thi: ...</p>
      <p class="text-[#5d5d5d]">Lớp: ...</p>
    </div>
    <form class="">
      <ul>
        <li
          v-for="question in detailExam.questions"
          :key="question.id"
          :id="`question-${question.index}`"
          class="mb-6"
        >
          <div>
            <p class="text-base font-medium text-[#5d5d5d]">
              {{ question.content }}
            </p>
          </div>
          <ul>
            <li
              v-for="questionsExtends in question.questions_extends"
              :key="questionsExtends.id"
              class=""
            >
              <div class="flex flex-row">
                <!-- <p class="text-base font-semibold mr-2">
              Câu hỏi {{ question.index }}:
             </p> -->
                <!-- {{ question.index }} -->
                <p class="text-base font-medium text-[#5d5d5d]">
                  {{ questionsExtends.content }}
                </p>
              </div>
              <div class="mt-2">
                <label
                  v-for="answer in questionsExtends.answers"
                  :key="answer.id"
                  :class="{
                    'block p-2 border rounded-lg mb-2 cursor-pointer hover:bg-gray-100 transition-colors': true,
                  }"
                >
                  <input
                    type="radio"
                    :value="answer"
                    @change="handleChoiceSelected(answer.id)"
                    class="mr-2 cursor-pointer sr-only"
                  />
                  {{ answer.content }}
                </label>
              </div>
              <!-- <div class="mt-2">
           < class="mt-2">
            <label
              v-for="(choice, choiceIndex) in question.choices"
              :key="choiceIndex"
              :class="{
                'block p-2 border rounded-lg mb-2 cursor-pointer hover:bg-gray-100 transition-colors': true,
                'border-2 border-[#253d90] bg-[#5266b020]':
                  question.selectedChoice === choiceIndex,
                'border-2 border-blue-400':
                  question.selectedChoice === choiceIndex &&
                  question.selectedChoice === question.correctChoiceIndex,
              }"
            >
              <input
                type="radio"
                :name="'question_' + index"
                :value="choice"
                @change="handleChoiceSelected(index, choiceIndex)"
                class="mr-2 cursor-pointer sr-only"
              />
              {{ choice }}
            </label>
          
          </div> -->
            </li>
          </ul>
        </li>
      </ul>
    </form>
  </div>
</template>
<script>
// import { EventBus } from './IntroductionExam.vue'
export default {
  name: 'TestExamExtend',
  props: {
    detailExam: Object,
  },
  data() {
    return {
      // questions: [
      //   {
      //     id: '1',
      //     title: 'Câu hỏi ',
      //     choices: ['A', 'B', 'C', 'D'],
      //     selectedChoice: null,
      //   },
      //   {
      //     id: '2',
      //     title: 'Câu hỏi ',
      //     choices: ['A', 'B', 'C', 'D'],
      //     selectedChoice: null,
      //   },
      //   {
      //     id: '3',
      //     title: 'Câu hỏi ',
      //     choices: ['A', 'B', 'C', 'D'],
      //     selectedChoice: null,
      //   },
      //   {
      //     id: '4',
      //     title: 'Câu hỏi ',
      //     choices: ['A', 'B', 'C', 'D'],
      //     selectedChoice: null,
      //   },
      //   {
      //     id: '4',
      //     title: 'Câu hỏi ',
      //     choices: ['A', 'B', 'C', 'D'],
      //     selectedChoice: null,
      //   },
      //   {
      //     id: '4',
      //     title: 'Câu hỏi ',
      //     choices: ['A', 'B', 'C', 'D'],
      //     selectedChoice: null,
      //   },
      //   {
      //     id: '4',
      //     title: 'Câu hỏi ',
      //     choices: ['A', 'B', 'C', 'D'],
      //     selectedChoice: null,
      //   },
      //   {
      //     id: '4',
      //     title: 'Câu hỏi ',
      //     choices: ['A', 'B', 'C', 'D'],
      //     selectedChoice: null,
      //   },
      //   {
      //     id: '4',
      //     title: 'Câu hỏi ',
      //     choices: ['A', 'B', 'C', 'D'],
      //     selectedChoice: null,
      //   },
      //   // Thêm các câu hỏi khác ở đây
      // ],
    }
  },
  computed: {
    ExamQuestionsExtends() {
      // Check if this.detailExam is defined before accessing its properties
      return (
        this.detailExam &&
        this.detailExam.questions &&
        this.detailExam.questions.questions_extends.length > 0
      )
    },
  },
  mounted() {
    // console.log('extend')
    // EventBus.$on('go-to-question', this.handleGoToQuestion)
  },
  methods: {
    handleGoToQuestion(index) {
      const questionElement = document.getElementById(`question-${index}`)
      if (questionElement) {
        questionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        })
        console.log(`Điều hướng đến câu hỏi 1111${index}`)
      }
    },
    handleChoiceSelected(questionIndex, choiceIndex) {
      // Xác định câu trả lời được chọn và cập nhật vào biến selectedChoice của câu hỏi tương ứng
      this.detailExam.questions[questionIndex] = choiceIndex
    },
  },
}
</script>
<style scoped>
/* Tùy chỉnh CSS cho phần tử h1 */

@media (min-width: 375px) and (max-width: 899px) {
  /* .containers {
    width: 90%;
    min-width: 600px;
  } */
}
</style>
//
<div class="mt-2">
//             <label
//               v-for="(choice, choiceIndex) in question.choices"
//               :key="choiceIndex"
//               :class="{
//                 'block p-2 border rounded-lg mb-2 cursor-pointer hover:bg-gray-100 transition-colors': true,
//                 'border-2 border-[#253d90] bg-[#5266b020]':
//                   question.selectedChoice === choiceIndex,
//                 'border-2 border-blue-400':
//                   question.selectedChoice === choiceIndex &&
//                   question.selectedChoice === question.correctChoiceIndex,
//               }"
//             >
//               <input
//                 type="radio"
//                 :name="'question_' + index"
//                 :value="choice"
//                 @change="handleChoiceSelected(index, choiceIndex)"
//                 class="mr-2 cursor-pointer sr-only"
//               />
//               {{ choice }}
//             </label>
//           </div>
