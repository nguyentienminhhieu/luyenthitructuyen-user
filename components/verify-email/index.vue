<template>
  <div
    class="h-screen font-sans text-black grid place-content-center overflow-hidden"
  >
    <div class="max-w-520px text-center z-20">
      <p
        class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight"
      >
        Nhấn nút để xác thực tài khoản
      </p>
      <div class="w-full flex items-center justify-center">
        <button
          @click="handleVerifyEmail"
          class="border-2 border-[#273c75] rounded-2xl text-md sm:text-xl hover:bg-gray-100 py-4 px-6 cursor-pointer"
        >
          XÁC THỰC EMAIL
        </button>
      </div>
    </div>
    <ToastSuccess v-if="showSuccessToast" :message="successMessage" />
    <ToastError v-if="showErrorToast" :message="errorMessage" />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'
export default {
  name: 'VerifyEmailComponent',
  components: {
    ToastSuccess,
    ToastError,
  },
  data() {
    return {
      isPasswordVisible: false,
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Xác thực thành công!',
      errorMessage: 'Xác thực thất bại!',
    }
  },
  props: {
    slug: String,
  },
  methods: {
    ...mapActions('authen', ['verifyEmail']),
    async handleVerifyEmail() {
      const payload = {
        token: this.slug,
      }
      await this.verifyEmail(payload)
      this.showSuccessToast = true
      setTimeout(() => {
        this.showSuccessToast = false
      }, 5000)
      // } catch {
      //   this.showErrorToast = true
      //   setTimeout(() => {
      //     this.showErrorToast = false
      //   }, 3000)
      // }
    },
  },
}
</script>
<style></style>
