<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 m-6">
    <div
      v-for="(course, index) in courses"
      :key="index"
      class="bg-white shadow-md p-4 my-4"
    >
      <img
        :src="course.image"
        alt="Course Image"
        class="w-full h-40 object-cover rounded-lg transform transition-transform hover:scale-105 cursor-pointer"
      />
      <h2 class="text-lg font-semibold mt-4">{{ course.title }}</h2>
      <p class="text-gray-500">{{ course.description }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListExamCategory',

  data() {
    return {
      courses: [
        {
          title: 'Khóa học 1',
          description: 'Mô tả khóa học 1',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Khóa học 2',
          description: 'Mô tả khóa học 2',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Khóa học 2',
          description: 'Mô tả khóa học 2',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Khóa học 2',
          description: 'Mô tả khóa học 2',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Khóa học 2',
          description: 'Mô tả khóa học 2',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Khóa học 2',
          description: 'Mô tả khóa học 2',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Khóa học 2',
          description: 'Mô tả khóa học 2',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Khóa học 2',
          description: 'Mô tả khóa học 2',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Khóa học 2',
          description: 'Mô tả khóa học 2',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Khóa học 2',
          description: 'Mô tả khóa học 2',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Khóa học 2',
          description: 'Mô tả khóa học 2',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },
        {
          title: 'Khóa học 2',
          description: 'Mô tả khóa học 2',
          image: require('~/assets/img/hotExam/E3JeIlBkVSbcEMM4Z7HKsrsHZyuGy0Q5uL5f8bxQ.jpg'),
        },

        // Thêm các khóa học khác ở đây
      ],
    }
  },
}
</script>
