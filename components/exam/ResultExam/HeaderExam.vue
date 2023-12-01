<template>
  <div>
    <div
      class="container-1 bg-white flex flex-col rounded-lg sticky max-h-[500px] overflow-y-auto pb-4"
    >
      <div class="p-2">
        <div class="flex flex-row flex-wrap">
          <!-- <button
            v-for="index in questions.length"
            :key="index"
            class="rounded-full w-8 h-8 m-1 bg-gray-500 text-white items-center justify-center hover:bg-gray-600 hover:text-white"
            @click="goToQuestion(index)"
          >
            {{ index }}
          </button> -->
        </div>
      </div>
      <div class="flex justify-center my-6">
        <button
          class="px-6 py-2 bg-[#7e7e7e] hover:bg-[#9d9d9d] text-white rounded-md mr-4"
          @click="handleOut"
        >
          Thoát
          <i class="fa-solid fa-arrow-right-from-bracket px-1"></i>
        </button>
        <button
          class="px-6 py-2 bg-[#273c75] hover:bg-[#395193] text-white rounded-md"
          @click="handleSend"
        >
          Nộp bài
          <i class="fa-regular fa-paper-plane px-1"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderResultExam',
  data() {
    return {}
  },
  mounted() {},
  methods: {
    handleSend() {
      this.$emit('send-clicked')
    },
    handleOut() {
      this.$emit('out-clicked')
    },
  },
}
</script>
<style scoped>
@media (min-width: 375px) and (max-width: 899px) {
}
</style>
