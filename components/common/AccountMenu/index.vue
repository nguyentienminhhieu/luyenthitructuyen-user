<template>
  <div
    class="container-all cursor-pointer space-y-2 absolute top-12 right-16 mt-2 bg-white border rounded shadow-md"
  >
    <button
      class="w-full flex p-2 hover:bg-gray-200 text-[#535353] font-medium hover:text-[#273c75] transition duration-300 ease-in-out"
      @click="isLoggin ? profile() : support()"
    >
      <i class="fa-solid fa-address-card mt-1"></i>
      <p class="mx-3">{{ isLoggin ? `Profile` : 'Hỗ Trợ' }}</p>
    </button>
    <button
      class="w-full flex p-2 text-[#535353] font-medium hover:bg-gray-200 hover:text-[#273c75] transition duration-300 ease-in-out"
      @click="isLoggin ? changePassword() : register()"
    >
      <i class="fa-solid fa-key mt-1"></i>
      <p class="mx-3">{{ isLoggin ? 'ChangePassword' : 'Đăng ký' }}</p>
    </button>
    <button
      class="w-full flex p-2 text-[#535353] font-medium hover:bg-gray-200 hover:text-[#273c75] transition duration-300 ease-in-out"
      @click="isLoggin ? handleLogout() : logIn()"
    >
      <i class="fa-solid fa-right-from-bracket mt-1"></i>
      <p class="mx-3">{{ isLoggin ? 'Đăng xuất' : 'Đăng nhập' }}</p>
    </button>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Cookies from '@/services/cookies.service.js'
export default {
  name: 'AccountMenu',
  data() {
    return {
      isLoggin: false,
      //   cookieExists: false,
    }
  },
  computed: {
    ...mapState('users', ['user']),
  },
  created() {},
  mounted() {
    this.getInfoUser()
    if (Cookies.getToken() != null) {
      this.isLoggin = true
    }
  },
  methods: {
    ...mapActions('authen', ['logout']),
    ...mapActions('users', ['getInfoUser']),
    handleLogout() {
      this.logout()
      this.$router.push('/login')
    },
    logIn() {
      this.$router.push('/login')
    },
    register() {
      this.$router.push('/register')
    },
    profile() {
      this.$router.push(`/users/${this.user.name}`)
    },
    support() {
      alert('Chức năng đang được cập nhật')
    },
    changePassword() {
      this.$router.push(`/change-password`)
    },
    getRoleName(role) {
      switch (role) {
        case 1:
          return 'HS'
        case 2:
          return 'Giáo viên'
        // Thêm các vai trò khác ở đây nếu cần
        default:
          return 'Null'
      }
    },
  },
}
</script>
<style scoped>
@media (min-width: 375px) and (max-width: 899px) {
  .container-all {
    right: 1rem;
  }
}
</style>
