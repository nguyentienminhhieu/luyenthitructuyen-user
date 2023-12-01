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
              {{ detailExam.title }}
            </p>
          </h1>
        </div>
        <div class="flex text-xl font-medium">
          Desciptions:
          <p class="ml-2 text-lg font-normal">{{ detailExam.description }}</p>
        </div>
        <div class="">
          <div class="flex text-xl font-medium">
            Điểm:
            <h3 class="ml-2 text-lg font-normal">{{ detailExam.max_score }}</h3>
          </div>
        </div>
        <div class="flex text-xl font-medium">
          Thời gian:
          <h3 class="ml-2 text-lg font-normal">
            {{ detailExam.duration }} Phút
          </h3>
        </div>
      </div>
    </div>
    <div class="mt-4 mx-7">
      <ListQuestions :questions-extends="questions" />
      <TableExamDone />
    </div>
    <BtnPushQ @push-array="pushArray" />
    <SaveBtn
      :detail-exam="detailExamDeep"
      :list-questions="questions"
      @send-data="data"
    />
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import HeadingDetailExam from '~/components/ExamByTeacher/DetailExam/Heading.vue'
import ListQuestions from '~/components/ExamByTeacher/DetailExam/List/ListQuestions.vue'
import TableExamDone from '~/components/accounts/user/Detail_personal/TableExamDone.vue'
import ModalEditExam from '~/components/common/ModalEdit/index.vue'
import SaveBtn from '~/components/common/SaveBtn.vue'
import BtnPushQ from '~/components/common/BtnPushQ.vue'

export default {
  name: 'DetailExamByTeacher',
  components: {
    HeadingDetailExam,
    ListQuestions,
    TableExamDone,
    ModalEditExam,
    SaveBtn,
    BtnPushQ,
  },
  data() {
    return {
      saveExam: null,
      questions: [],
      examID: null,
      detailExamDeep: null,
    }
  },
  computed: {
    ...mapState('examByTeacher', ['detailExam']),
  },
  watch: {
    detailExam: {
      handler(newDetailExam) {
        if (this.detailExam !== null) {
          this.detailExamDeep = JSON.parse(JSON.stringify(this.detailExam))
          // console.log(this.detailExamDeep)
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
    if (this.$route.query.examID) {
      this.examID = this.$route.query.examID
    }
    await this.getDetailExam(this.examID)
    this.questions = this.detailExamDeep.questions
  },
  methods: {
    ...mapActions('examByTeacher', ['getDetailExam']),
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
    data(item) {
      this.saveExam = item
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
