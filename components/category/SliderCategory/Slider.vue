<template>
  <div class="slider bg-gray-200 p-4 relative rounded-lg">
    <div class="overflow-hidden">
      <div
        :style="{
          transform: `translateX(-${currentSlide * slideWidth}px)`,
        }"
        class="flex ease-in-out duration-500"
      >
        <div
          v-for="(lesson, index) in displayedLessons"
          :key="index"
          class="image-screensmall w-1/5 p-2 hover:opacity-100 transform transition-transform hover:scale-105"
        >
          <img
            :src="lesson.image"
            alt="Lesson Image"
            class="lesson-image rounded-lg mb-2 hover:scale-105 cursor-pointer"
          />
          <div class="lesson-title text-lg font-bold mb-2">
            {{ lesson.title }}
          </div>
          <div class="lesson-description text-sm">
            {{ lesson.description }}
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
export default {
  name: 'SliderCategoryDetail',
  data() {
    return {
      lessons: [
        {
          title: 'Lesson 1',
          description: 'This is the description for lesson 1.',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Lesson 2',
          description: 'This is the description for lesson 2.',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Lesson 3',
          description: 'This is the description for lesson 3.',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Lesson 4',
          description: 'This is the description for lesson 4.',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Lesson 5',
          description: 'This is the description for lesson 5.',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Lesson 6',
          description: 'This is the description for lesson 6.',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Lesson 7',
          description: 'This is the description for lesson 6.',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Lesson 8',
          description: 'This is the description for lesson 6.',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Lesson 9',
          description: 'This is the description for lesson 6.',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Lesson 10',
          description: 'This is the description for lesson 6.',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
      ],
      currentSlide: 0,
      slideWidth: 5,
      isSmallScreen: false,
    }
  },
  computed: {
    totalSlides() {
      return Math.ceil(this.lessons.length / this.slideWidth)
    },
    displayedLessons() {
      const totalSlides = this.totalSlides
      const start = this.currentSlide * this.slideWidth
      const end = start + this.slideWidth

      if (this.currentSlide === totalSlides - 1) {
        return this.lessons.slice(start)
      } else {
        return this.lessons.slice(start, end)
      }
    },
  },
  methods: {
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
  },
  created() {
    this.updateWindowSize()
    window.addEventListener('resize', this.updateWindowSize)
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
