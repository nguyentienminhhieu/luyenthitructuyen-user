<template>
  <div class="relative group">
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
    >
      <i class="fas fa-chevron-left"></i>
    </button>
    <div class="slider-image -z-10 rounded-lg">
      <img
        :src="currentImg"
        alt="Slider Image"
        class="w-full h-auto object-cover"
      />
    </div>

    <button
      @click="nextSlide"
      class="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 focus:outline-none flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SliderHome',
  data() {
    return {
      images: [
        require('~/assets/img/slider/639bdaa889e66.jpg'),
        require('~/assets/img/slider/pasted image 0.png'),
        require('~/assets/img/slider/EmRSc7DmFfrWqWW8jneiHM44UndrYqaiNZq7EONp.jpg'),
        require('~/assets/img/slider/ngon-ngu-lap-trinh-1-1536x864.jpg'),
      ],
      currentSlide: 0,
    }
  },
  computed: {
    currentImg() {
      return this.images[this.currentSlide]
    },
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.images.length) % this.images.length
    },
    autoSlide() {
      setInterval(() => {
        this.nextSlide()
      }, 3000)
    },
  },
  mounted() {
    this.autoSlide()
  },
  beforeDestroy() {
    clearInterval(this.slideInterval)
  },
}
</script>

<style scoped>
.slider-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 40%;
  overflow: hidden;
}

button {
  opacity: 0;
  pointer-events: none;
}

.group:hover button {
  opacity: 1;
  pointer-events: auto;
}
</style>
