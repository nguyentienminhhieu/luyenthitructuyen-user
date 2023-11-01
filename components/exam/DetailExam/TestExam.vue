<template>
  <div class="containers bg-white break-words min-h-screen rounded-md p-4">
    <h1 class="text-2xl font-semibold text-center">Title Đề thi</h1>
    <div class="flex justify-around my-6">
      <p>Môn thi: ...</p>
      <p>Lớp: ...</p>
    </div>
    <form class="">
      <ul>
        <li v-for="(question, index) in questions" :key="index" class="mb-4">
          <div class="flex">
            <h3 class="text-base font-semibold mr-2">
              Câu hỏi {{ question.id }}:
            </h3>
            <p>{{ question.title }}</p>
          </div>
          <div class="mt-2">
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
          </div>
        </li>
      </ul>
    </form>
  </div>
</template>
<script>
export default {
  name: 'TestExam',
  data() {
    return {
      questions: [
        {
          id: '1',
          title: 'Câu hỏi ',
          choices: ['A', 'B', 'C', 'D'],
          selectedChoice: null,
        },
        {
          id: '2',
          title: 'Câu hỏi ',
          choices: ['A', 'B', 'C', 'D'],
          selectedChoice: null,
        },
        {
          id: '3',
          title: 'Câu hỏi ',
          choices: ['A', 'B', 'C', 'D'],
          selectedChoice: null,
        },
        {
          id: '4',
          title: 'Câu hỏi ',
          choices: ['A', 'B', 'C', 'D'],
          selectedChoice: null,
        },
        {
          id: '4',
          title: 'Câu hỏi ',
          choices: ['A', 'B', 'C', 'D'],
          selectedChoice: null,
        },
        {
          id: '4',
          title: 'Câu hỏi ',
          choices: ['A', 'B', 'C', 'D'],
          selectedChoice: null,
        },
        {
          id: '4',
          title: 'Câu hỏi ',
          choices: ['A', 'B', 'C', 'D'],
          selectedChoice: null,
        },
        {
          id: '4',
          title: 'Câu hỏi ',
          choices: ['A', 'B', 'C', 'D'],
          selectedChoice: null,
        },
        {
          id: '4',
          title: 'Câu hỏi ',
          choices: ['A', 'B', 'C', 'D'],
          selectedChoice: null,
        },
        // Thêm các câu hỏi khác ở đây
      ],
    }
  },
  methods: {
    handleChoiceSelected(questionIndex, choiceIndex) {
      // Xác định câu trả lời được chọn và cập nhật vào biến selectedChoice của câu hỏi tương ứng
      this.questions[questionIndex].selectedChoice = choiceIndex
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
<form class="">
//     <ul>
//       <li v-for="(question, index) in questions" :key="index" class="mb-4">
//         <div :class="{ 'bg-[#253d90]': question.selectedChoice !== null, 'bg-white': question.selectedChoice === null }" class="flex">
//           <h3 class="text-base font-semibold mr-2">
//             Câu hỏi {{ question.id }}:
//           </h3>
//           <p>{{ question.title }}</p>
//         </div>
//         <div class="mt-2">
//           <label
//             v-for="(choice, choiceIndex) in question.choices"
//             :key="choiceIndex"
//           >
//             <input
//               type="radio"
//               :name="'question_' + index"
//               :value="choice"
//               @change="handleChoiceSelected(index, choiceIndex)"
//               class="mr-2 cursor-pointer sr-only"
//             />
//             {{ choice }}
//           </label>
//         </div>
//       </li>
//     </ul>
//   </form>
