<template>
  <div>
    <div class="my-10 -z-10">
      <h1 class="text-[#273c75] mb-6 text-2xl font-medium">ĐỀ THI HOT</h1>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <div
          v-for="(exam, index) in listExam"
          :key="index"
          class="bg-white p-4 shadow-md rounded-lg transform transition-transform hover:scale-105 cursor-pointer"
          @click="goToDetailExam(exam)"
        >
          <img
            :src="exam.url_img"
            alt="exam Image"
            class="w-full h-auto rounded-lg"
          />
          <h2 class="text-base font-medium mt-2">{{ exam.title }}</h2>

          <p class="text-gray-500 text-sm mt-1">
            <i class="fa-regular fa-clock mx-2"></i
            >{{ getFirstTenChars(exam.created_at) }}
          </p>
        </div>
      </div>
    </div>
    <div class="my-10 -z-10">
      <h1 class="text-[#273c75] mb-6 text-2xl font-medium">BÀI TẬP HOT</h1>
      <div
        class="slider-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4 shadow-xl rounded-md"
      >
        <div
          class="slider-track"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(exercise, index) in listExercise"
            :key="index"
            class="slider-item cursor-pointer"
            @click="goToDetailExercise(exercise)"
          >
            <!-- Your item content here -->
            <img
              :src="exercise.url_img"
              alt="Slider Image"
              class="slider-image"
            />
            <h2 class="text-base font-medium mt-2">{{ exercise.title }}</h2>

            <p class="text-gray-500 text-sm mt-1">
              <i class="fa-regular fa-clock mx-2"></i
              >{{ getFirstTenChars(exercise.created_at) }}
            </p>
          </div>
        </div>

        <button @click="prevSlide" class="slider-btn prev-btn">
          <i class="fa-solid fa-angle-left"></i>
        </button>
        <button @click="nextSlide" class="slider-btn next-btn">
          <i class="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Carousel from 'vue-slick-carousel'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'HotExam',
  components: {
    Carousel,
  },
  data() {
    return {
      currentIndex: 0,
      itemWidth: 0,
    }
  },
  computed: {
    ...mapState('exam', ['listExam']),
    ...mapState('exercise', ['listExercise']),

    itemsToShow() {
      if (window.innerWidth >= 1200) {
        return 5
      } else if (window.innerWidth >= 900) {
        return 4
      } else if (window.innerWidth >= 600) {
        return 3
      } else {
        return 1
      }
    },
  },
  watch: {
    itemsToShow() {
      this.handleResize()
    },
  },
  mounted() {
    this.getListExamHome()
    this.getListExerciseHome()

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions('exam', ['getListExamHome']),
    ...mapActions('exercise', ['getListExerciseHome']),
    goToDetailExam(exam) {
      this.$router.push({
        path: '/exam/intructions',
        query: {
          slugExam: exam.slug,
          idExam: exam.id,
        },
      })
    },
    goToDetailExercise(exercise) {
      this.$router.push({
        path: '/exercise/intructions',
        query: {
          slugExercise: exercise.slug,
        },
      })
    },
    getFirstTenChars(text) {
      return text ? text.slice(0, 10) : ''
    },
    nextSlide() {
      this.currentIndex =
        (this.currentIndex + 1) %
        (this.listExercise.length - this.itemsToShow + 1)
    },

    prevSlide() {
      this.currentIndex =
        (this.currentIndex -
          1 +
          this.listExercise.length -
          this.itemsToShow +
          1) %
        (this.listExercise.length - this.itemsToShow + 1)
    },
    handleResize() {
      this.itemWidth = 100 / this.itemsToShow
    },
  },
}
</script>

<style scoped>
.slider-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slider-item {
  flex: 0 0 100%;
  box-sizing: border-box;
  padding: 16px;
}

.slider-image {
  width: 100%;
  height: auto;
}

.slider-btn {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  font-size: 18px;
  background-color: #273c75;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
}
.slider-btn:hover {
  background: #6f7fad;
}
.prev-btn {
  left: 0;
}

.next-btn {
  right: 0;
}

@media (min-width: 360px) and (max-width: 899px) {
  h1 {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}
</style>
