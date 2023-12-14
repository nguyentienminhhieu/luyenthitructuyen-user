<template>
  <div class="p-3">
    <div
      class="text-[#444444] bg-white flex justify-between border-b-2 mx-2 my-4 rounded-md py-3 pl-2 z-10"
    >
      <div class="mx-4 break-words">
        <div class="">
          <h1 class="flex text-xl font-medium">
            Title:
            <p class="ml-2 text-lg font-normal">
              {{ detailExercise.title }}
            </p>
          </h1>
        </div>
        <div class="flex text-xl font-medium">
          Desciptions:
          <p class="ml-2 text-lg font-normal">
            {{ detailExercise.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="mt-4 mx-7">
      <ListQuestions :questions-extends="questions" />
      <TableExamDone />
    </div>
    <BtnPushQ @push-array="pushArray" />
    <SaveBtn
      :detail-exercise="detailExerciseDeep"
      :list-questions="questions"
    />
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import ListQuestions from '~/components/ExerciseByTeacher/DetailExercise/List/ListQuestions.vue'
import TableExamDone from '~/components/accounts/user/Detail_personal/TableExamDone.vue'
import SaveBtn from '~/components/common/SaveBtn.vue'
import BtnPushQ from '~/components/common/BtnPushQ.vue'

export default {
  name: 'DetailExerciseByTeacher',
  components: {
    ListQuestions,
    TableExamDone,
    SaveBtn,
    BtnPushQ,
  },
  data() {
    return {
      questions: [],
      exerciseID: null,
      detailExerciseDeep: null,
    }
  },
  computed: {
    ...mapState('exerciseByTeacher', ['detailExercise']),
  },
  watch: {
    detailExercise: {
      handler(newDetailExercise) {
        if (this.detailExercise !== null) {
          this.detailExerciseDeep = JSON.parse(
            JSON.stringify(this.detailExercise)
          )
          // console.log(this.detailExerciseDeep)
        }
      },
      deep: true,
    },
    questions: {
      handler(newQuestions) {
        this.saveDataToLocalStorage()
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  async mounted() {
    const questionData = localStorage.getItem('questionData')
    if (questionData) {
      try {
        this.questions = JSON.parse(questionData)
      } catch (error) {
        console.error('Lỗi phân tích JSON: ', error)
      }
    } else {
      this.questions = []
    }
    if (this.$route.query.exerciseID) {
      this.exerciseID = this.$route.query.exerciseID
    }
    await this.getDetailExercise(this.exerciseID)
    this.questions = this.detailExerciseDeep.questions
  },
  methods: {
    ...mapActions('exerciseByTeacher', ['getDetailExercise']),
    pushArray() {
      const randomId = Math.floor(Math.random(10) * 100000)
      let newQuestion = {
        random_Id: randomId,
        content: `Câu ${this.questions.length + 1}.`,
        slug: '',
        description: '',
        file: '',
        type: null,
        answers: [],
        questions_extends: [],
      }
      if (this.questions.length > 0) {
        this.questions.forEach((e) => {
          if (e.random_Id === randomId) {
            newQuestion.random_Id = Math.floor(Math.random(10) * 10000)
          }
        })
      } else {
        console.log('mang rong')
      }
      this.questions.push(newQuestion)
      this.saveDataToLocalStorage()
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    },

    saveDataToLocalStorage() {
      const clonedQuestions = JSON.parse(JSON.stringify(this.questions))
      localStorage.setItem('questionData', JSON.stringify(clonedQuestions))
    },
  },
}
</script>
<style>
@media (max-width: 1024px) {
  .flex-colll {
    display: block;
  }
}
</style>
