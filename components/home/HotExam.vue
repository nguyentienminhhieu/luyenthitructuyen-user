<template>
  <div class="my-10 -z-10">
    <h1 class="text-[#0e514b] mb-6 text-2xl font-medium">ĐỀ THI HOT</h1>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <div
        v-for="(exam, index) in exams"
        :key="index"
        class="bg-white p-4 shadow-md rounded-lg transform transition-transform hover:scale-105 cursor-pointer"
        @click="goToDetail"
      >
        <img
          :src="exam.imageUrl"
          alt="exam Image"
          class="w-full h-auto rounded-lg"
        />
        <h2 class="text-base font-medium mt-2">{{ exam.title }}</h2>

        <p class="text-gray-500 text-sm mt-1">
          <i class="fa-regular fa-clock mx-2"></i>{{ exam.publishedAt }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotExam',
  data() {
    return {
      exams: [
        {
          title: 'De thi 1',
          imageUrl: require('~/assets/img/hotExam/210.jpg'),
          publishedAt: '5 giờ trước',
        },
        {
          title: 'De thi 2',
          imageUrl: require('~/assets/img/hotExam/bai-tap-cau-truc-make-use-of.jpg'),
          publishedAt: '1 ngày trước',
        },
        {
          title: 'De thi 2',
          imageUrl: require('~/assets/img/hotExam/giai-phap-cho-sinh-vien-khoa-hoc-moi-truong-2.jpg'),
          publishedAt: '1 ngày trước',
        },
        {
          title: 'De thi 2',
          imageUrl: require('~/assets/img/hotExam/210.jpg'),
          publishedAt: '1 ngày trước',
        },
        {
          title: 'De thi 2',
          imageUrl: require('~/assets/img/hotExam/ky-nang-can-co-cua-pdp_c14dc8b8-569c-45cf-b38a-bb3092f8b44e.jpg'),
          publishedAt: '1 ngày trước',
        },
        {
          title: 'De thi 2',
          imageUrl: require('~/assets/img/hotExam/bai-tap-cau-truc-make-use-of.jpg'),
          publishedAt: '1 ngày trước',
        },
        {
          title: 'De thi 2',
          imageUrl: require('~/assets/img/hotExam/ky-nang-can-co-cua-pdp_c14dc8b8-569c-45cf-b38a-bb3092f8b44e.jpg'),
          publishedAt: '1 ngày trước',
        },
        {
          title: 'De thi 2',
          imageUrl: require('~/assets/img/hotExam/bai-tap-cau-truc-make-use-of.jpg'),
          publishedAt: '1 ngày trước',
        },

        // Thêm sản phẩm khác tại đây
      ],
    }
  },
  methods: {
    goToDetail() {
      this.$router.push('/exam/intructions')
    },
  },
}
</script>

<style scoped>
@media (min-width: 360px) and (max-width: 899px) {
  h1 {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
}
</style>
