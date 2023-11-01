<template>
  <div
    class="bg-white flex flex-col rounded-lg break-words fixed w-[220px] max-h-[500px] overflow-y-auto"
  >
    <div class="p-2">
      <h3>Mon thi: ...........</h3>
      <h3>Lop: ...........</h3>
    </div>
    <div class="p-2">
      <!-- Sử dụng v-for để tạo danh sách các button -->
      <div class="flex flex-row flex-wrap"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TimeExam',
}
</script>
<style scoped>
@media (min-width: 414px) and (max-width: 899px) {
  .container {
    width: 150px;
    max-height: 300px;
    position: sticky;
  }
}
</style>
