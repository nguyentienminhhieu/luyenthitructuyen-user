<template>
  <div
    class="container-all cursor-pointer space-y-2 absolute top-12 right-16 mt-2 bg-white border rounded shadow-md"
  >
    <button
      class="w-full block p-2 hover:bg-gray-200 text-color-custom hover:border-none"
      @click="isLoggin ? profile() : support()"
    >
      {{ isLoggin ? 'Thông tin tài khoản' : 'Hỗ Trợ' }}
    </button>
    <button
      class="w-full block p-2 hover:bg-gray-200 text-color-custom hover:border-none"
      @click="isLoggin ? changePassword() : register()"
    >
      {{ isLoggin ? 'Thay đổi mật khẩu' : 'Đăng ký' }}
    </button>
    <button
      class="w-full block p-2 hover:bg-gray-200 text-color-custom hover:border-none"
      @click="isLoggin ? handleLogout() : logIn()"
    >
      {{ isLoggin ? 'Đăng xuất' : 'Đăng nhập' }}
    </button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
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
    // ...mapGetters('authen', ['getLoggedIn']),
  },
  mounted() {
    if (Cookies.getToken() != null) {
      // this.cookieExists = true;
      this.isLoggin = true
    }
  },
  methods: {
    ...mapActions('authen', ['logout']),
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
      this.$router.push(`/users/${this.$route.params.slug}`)
    },
    support() {
      alert('Chức năng đang được cập nhật')
    },
    changePassword() {
      this.$router.push(`/change-password`)
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
