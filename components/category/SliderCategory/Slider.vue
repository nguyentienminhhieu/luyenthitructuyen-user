<template>
  <div class="slider bg-gray-200 p-4 relative rounded-lg">
    <div class="overflow-hidden">
      <div
        :style="{
          transform: `translateX(-${currentSlide * slideWidth}px)`,
        }"
        class="flex ease-in-out duration-500"
      >
        <div class="flex flex-row">
          <div
            v-for="(exam, index) in examBySlug"
            :key="index"
            class="image-screensmall w-1/5 p-2 mx-2 hover:opacity-100 transform transition-transform hover:scale-105"
          >
            <div v-if="exam.url_img">
              <img
                :src="exam.url_img"
                alt="exam Image"
                class="exam-image rounded-lg mb-2 hover:scale-105 cursor-pointer"
              />
            </div>
            <div class="text-lg font-bold mb-2">
              {{ truncateTitle(exam.title, 40) }}
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="italic">{{ exam.category?.grade?.name }}</span>
              <span class="italic">{{ exam.category?.subject?.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="prev-button absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-400 hover:bg-gray-500 text-white p-2 px-4 rounded-full"
    >
      <i class="fas fa-chevron-left"></i>
    </button>
    <button
      @click="nextSlide"
      class="next-button absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-400 hover:bg-gray-500 text-white p-2 px-4 rounded-full"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SliderCategoryDetail',
  props: {
    slugCategory: String,
  },
  data() {
    return {
      currentSlide: 0,
      slideWidth: 5,
      isSmallScreen: false,
      examBySlug: [],
    }
  },
  computed: {
    ...mapState('exam', ['listExam']),
    totalSlides() {
      return Math.ceil(this.listExam.length / this.slideWidth)
    },
    displayedexams() {
      const totalSlides = this.totalSlides
      const start = this.currentSlide * this.slideWidth
      const end = start + this.slideWidth

      if (this.currentSlide === totalSlides - 1) {
        return this.listExam.slice(start)
      } else {
        return this.listExam.slice(start, end)
      }
    },
  },
  created() {
    this.updateWindowSize()
    window.addEventListener('resize', this.updateWindowSize)
    // console.log('ll: ', this.listExam)
  },
  async mounted() {
    // console.log('ll123: ', this.slugCategory)
    await this.getListExamCategory(this.slugCategory)
    this.examBySlug = this.listExam
    // console.log('ll1111111111111: ', this.listExam)
  },

  methods: {
    ...mapActions('exam', ['getListExamCategory']),

    nextSlide() {
      const totalSlides = this.totalSlides
      const nextIndex = this.currentSlide + 1

      if (nextIndex < totalSlides) {
        this.currentSlide = nextIndex
      } else {
        this.currentSlide = 0
      }
    },
    prevSlide() {
      const totalSlides = this.totalSlides
      const prevIndex = this.currentSlide - 1

      if (prevIndex >= 0) {
        this.currentSlide = prevIndex
      } else {
        this.currentSlide = totalSlides - 1
      }
    },
    updateWindowSize() {
      if (window.innerWidth < 800) {
        this.slideWidth = 2
        this.isSmallScreen = true
      } else {
        this.slideWidth = 5
        this.isSmallScreen = false
      }
    },
    truncateTitle(title, maxLength) {
      if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...'
      }
      return title
    },
    getFirstTenChars(text) {
      return text ? text.slice(0, 20) : ''
    },
  },
}
</script>
<style scoped>
@media (min-width: 375px) and (max-width: 899px) {
  .image-screensmall {
    width: 50%;
  }
}
</style>
