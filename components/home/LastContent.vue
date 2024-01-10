<template>
  <div class="my-12">
    <!-- <h2 class="text-[#273c75] mb-6 text-2xl font-medium">Bảng Xếp Hạng</h2> -->
    <div class="containers flex justify-around">
      <div class="table-1 w-[50%]">
        <!-- <h3 class="text-lg font-medium mb-2">Lớp 6</h3> -->
        <div class="overflow-x-auto">
          <img src="~/assets/img/img-blog1.4e335516.png" alt="" />
        </div>
      </div>
      <div class="table-1 w-[50%]">
        <!-- <h3 class="text-lg font-medium mb-2">Lớp 7</h3> -->
        <div class="overflow-x-auto">
          <img src="~/assets/img/img-blog2.2905c584.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LastContent',
  data() {
    return {}
  },
}
</script>
<style scoped>
@media (min-width: 360px) and (max-width: 899px) {
  .containers {
    flex-direction: column;
  }
  .table-1 {
    width: 100%;
  }
  table {
    width: 100%;
  }
}
</style>
