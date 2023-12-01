<template>
  <div>
    <button
      class="fixed w-14 h-14 bottom-16 right-4 rounded-full bg-[#2743cf] hover:bg-[#1733bd] my-3 text-white z-50"
      @click="Savedata"
    >
      <!-- <i class="fa-regular fa-floppy-disk"></i> -->
      SAVE
    </button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    listQuestions: Array,
    // eslint-disable-next-line vue/require-default-prop
    detailExam: Object,
  },
  data() {
    return {
      saveExam: null,
      isScrolling: false,
    }
  },
  mounted() {},

  methods: {
    ...mapActions('examByTeacher', ['updateExamByTeacher']),
    ...mapActions('examByTeacher', ['getDetailExam']),

    async Savedata() {
      try {
        const payload = {
          id: this.detailExam.id,
          title: this.detailExam.title,
          description: this.detailExam.description,
          slug: this.detailExam.slug,
          category_id: this.detailExam.category_id,
          duration: this.detailExam.duration,
          max_score: this.detailExam.max_score,
          url_img: this.detailExam.url_img,
          question_ids: this.detailExam.question_ids,
          questions: this.detailExam.questions,
        }
        await this.updateExamByTeacher(payload)
        // await this.getDetailExam()
        this.$router.go(0)

        this.saveExam = payload
        this.$emit('send-data', this.detailExam.questions)
      } catch (error) {
        console.log('Error:', error)
      }
    },
    saveDataToLocalStorage() {
      localStorage.setItem('questionData', JSON.stringify(this.questions))
    },
  },
}
</script>
<style></style>
