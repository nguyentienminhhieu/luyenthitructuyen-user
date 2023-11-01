<template>
  <div class="my-12">
    <h1 class="text-[#273c75] mb-6 text-2xl font-medium">
      CÁC THỂ LOẠI HÀNG ĐẦU
    </h1>

    <div class="flex flex-wrap m-2">
      <div
        v-for="category in categories"
        :key="category.id"
        class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
      >
        <div
          class="bg-[#dcdde1] w-[200px] h-[50px] font-medium rounded-full px-6 m-2 inline-block cursor-pointer hover:bg-[#bfbfc0] transition duration-300 overflow-hidden whitespace-wrap text-ellipsis"
        >
          {{ category.name }}
        </div>
      </div>
    </div>
    <div class="image-final my-6 flex flex-row justify-between">
      <img
        class="max-w-[50%] h-auto m-2 rounded-md"
        src="~/assets/img/hotExam/ky-nang-can-co-cua-pdp_c14dc8b8-569c-45cf-b38a-bb3092f8b44e.jpg"
        alt=""
      />
      <img
        class="max-w-[50%] h-auto m-2 rounded-md"
        src="~/assets/img/hotExam/34_thit7.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopCategory',
  data() {
    return {
      categories: [
        { id: 1, name: 'Category 1111111111111111111111111111111' },
        { id: 2, name: 'Category 22222222222222222222222222222222' },
        { id: 3, name: 'Category 33333333333333333333333333333333' },
        { id: 4, name: 'Category 44444444444444444444444444444' },
        { id: 5, name: 'Category 55555555555555' },
        { id: 6, name: 'Category 6666666666666666' },
        { id: 7, name: 'Category 77777777777777777777' },
        { id: 8, name: 'Category 888888888888888' },
        { id: 9, name: 'Category 888888888888888' },
        { id: 10, name: 'Category 888888888888888' },
      ],
    }
  },
}
</script>
<style scoped>
@media (min-width: 900px) and (max-width: 1024px) {
  .image-final {
    flex-direction: column;
  }
  .image-final img {
    margin-bottom: 10px;
  }
}

@media (min-width: 360px) and (max-width: 899px) {
  h1 {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  .image-final {
    flex-direction: column;
  }
  .image-final img {
    margin-bottom: 10px;
  }
}
</style>
