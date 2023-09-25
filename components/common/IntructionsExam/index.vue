<template>
  <div class="flex flex-col justify-center items-center mx-5 h-screen">
    <div
      class="text-[#585858] rounded-xl border border-black max-h-[450px] max-w-[600px] p-4"
    >
      <div class="text-center">
        <h2 class="text-xl font-medium">Hướng dẫn làm bài kiểm tra</h2>
      </div>
      <div class="my-4 space-y-2">
        <div class="flex items-center space-x-2">
          <div>
            <i class="fas fa-arrow-pointer"></i>
          </div>
          <div>
            Click (tap) trực tiếp vào đáp án để chọn câu trả lời Bạn cho là đúng
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-[#6B6B6B] rounded-full"></div>
          <div>Câu hỏi chưa làm</div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-[#0B68AD] rounded-full"></div>
          <div>Câu hỏi đã làm</div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-[#0E514B] rounded-full"></div>
          <div>Câu hỏi trả lời đúng</div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-4 h-4 bg-[#D81515] rounded-full"></div>
          <div>Câu hỏi trả lời sai</div>
        </div>
      </div>
      <div class="my-4">
        <div class="font-bold">Lưu ý:</div>
        <ul class="list-disc list-inside">
          <li>
            Những câu <strong>chưa chọn đáp án</strong> sẽ được tính là
            <strong>câu trả lời sai</strong>
          </li>
          <li>
            Nếu bạn <strong>thoát ra</strong> trong lúc chưa hết thời gian làm
            bài thì <strong>kết quả sẽ không được tính</strong>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex justify-center">
      <button
        type="submit"
        class="mt-10 text-sm w-64 btn-bg-default text-white py-3 px-6 rounded-full hover:btn-bg-default transition duration-300"
      >
        <i class="fa-solid fa-arrow-right-long mr-2"></i>
        Bắt đầu làm bài
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InstructionsExam',
}
</script>

<style scoped>
/* Thêm CSS tùy chỉnh cho InstructionsExam nếu cần */
</style>
