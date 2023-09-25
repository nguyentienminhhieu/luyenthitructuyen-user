<template>
  <div class="">
    <header
      class="bg-[#0E514B] py-4 px-14 h-16 flex justify-between items-center sticky top-0"
    >
      <div class="flex items-center space-x-4">
        <nuxt-link to="/" class="logo-color text-2xl font-bold">LOGO</nuxt-link>
      </div>
      <div class="relative">
        <!-- Dropdown -->
        <h1 @click="categoryOpen" class="text-border-default cursor-pointer">
          Chuyên mục
        </h1>
        <CategoryMenu v-if="showDropdown" />
      </div>

      <div class="relative">
        <input
          type="text"
          placeholder="Search..."
          class="search-input border-b-2 border-gray-300 rounded py-2 px-6 focus:outline-none text-sm w-[400px]"
        />
        <button
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-color-custom hover:text-gray-600 focus:outline-none"
        >
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="flex items-center space-x-4">
        <button
          class="text-border-default text-border-default hover:text-color-custom"
        >
          <i class="fas fa-bell"></i>
        </button>
        <div class="text-border-default">
          <div
            class="relative cursor-pointer text-border-default hover:text-border-default"
            @click="toggleAccountMenu"
          >
            <i class="fas fa-user-circle"></i>
          </div>
          <div>
            <AccountMenu v-if="isMenuAccount" />
          </div>
        </div>
      </div>
    </header>
    <!-- Các nội dung khác của trang web nằm ở đây -->
    <nuxt />
    <footer class="text-color-default mt-16 bg-[#f1f2f6]">
      <div class="container mx-auto text-center">
        <div>
          <p>
            <i class="fa-solid fa-phone"></i> 0969 351 130<span> | </span
            ><i class="fa-solid fa-envelope"></i> nguyentienmhieu@gmail.com
          </p>
        </div>
        <p>&copy; 2023 Your Company</p>
      </div>
    </footer>
  </div>
</template>
<script>
import AccountMenu from '~/components/common/AccountMenu'
import CategoryMenu from '~/components/common/CategoryMenu'
export default {
  name: 'default',
  components: {
    AccountMenu,
    CategoryMenu,
  },
  data() {
    return {
      isMenuAccount: false,
      showDropdown: false,
    }
  },
  methods: {
    toggleAccountMenu() {
      this.isMenuAccount = !this.isMenuAccount
    },
    categoryOpen() {
      this.showDropdown = !this.showDropdown
    },
  },
}
</script>
<style scoped>
header {
  z-index: 1000000;
}
@media (min-width: 900px) {
  header .flex.items-center {
    margin-right: 24px;
  }

  header .logo-color {
    font-size: 24px;
  }
}

@media (min-width: 360px) and (max-width: 899px) {
  header {
    padding: 10px 0px;
  }
  header .flex.items-center {
    margin: 0 12px;
  }

  header .logo-color {
    font-size: 18px;
  }
  .auth-text {
    font-size: 14px !important;
  }
  .search-input {
    width: 200px;
  }
}
</style>
