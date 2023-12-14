<template>
  <div class="">
    <header
      class="bg-[#273c75] py-4 px-14 h-16 flex justify-between items-center"
    >
      <div class="flex items-center space-x-4">
        <h1 to="/admin" class="logo-color text-2xl font-bold">
          LuyenThiTracNghiem
        </h1>
      </div>
      <div class="flex space-x-4">
        <nuxt-link
          to="/login"
          class="auth-text text-border-default hover:text-border-default"
          >Đăng nhập</nuxt-link
        >
        <nuxt-link
          to="/register"
          class="auth-text text-border-default hover:text-border-default"
          >Đăng ký</nuxt-link
        >
      </div>
    </header>
    <!-- Các nội dung khác của trang web nằm ở đây -->
    <nuxt />
    <footer class="text-color-default mt-16">
      <div class="container mx-auto text-center">
        <div>
          <p>
            <i class="fa-solid fa-phone"></i> 0969 327 480<span> | </span
            ><i class="fa-solid fa-envelope"></i> nguyentienmhieu@gmail.com
          </p>
        </div>
        <p>&copy; 2023 Your Company</p>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'AuthLayout',
}
</script>
<style scoped>
@media (min-width: 900px) {
  header .flex.items-center {
    margin-right: 24px;
  }

  header .logo-color {
    font-size: 24px;
  }
}

@media (min-width: 414px) and (max-width: 899px) {
  header .flex.items-center {
    margin: 0 12px;
  }

  header .logo-color {
    font-size: 18px;
  }
  .auth-text {
    font-size: 14px !important;
  }
}
</style>
