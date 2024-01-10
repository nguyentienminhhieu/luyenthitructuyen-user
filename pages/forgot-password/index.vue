<template>
  <div class="flex justify-center items-center mt-12 max-h-screen">
    <div class="flex flex-col items-center">
      <h1 class="text-color-auth text-4xl font-semibold mb-4">Quên mật khẩu</h1>
      <form class="mt-8 space-y-6" @submit.prevent="submitForm">
        <div>
          <label for="email" class="block text-color-default">Email</label>
          <input
            id="email"
            v-model.trim="ruleForm.email"
            type="email"
            name="email"
            class="w-full border-b-2 focus:outline-none p-1"
            :class="[
              !$v.ruleForm.email.$dirty
                ? ''
                : checkStatusClass($v.ruleForm.email)
                ? 'border-input-error'
                : '',
            ]"
            @blur="$v.ruleForm.email.$touch()"
          />
          <div
            v-if="checkStatusClass($v.ruleForm.email)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.email.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : !$v.ruleForm.email.email
                  ? 'Vui lòng nhập đúng định dạng email!'
                  : ''
              }}
            </span>
          </div>
        </div>

        <!-- Nút Sign Up -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="mt-5 w-72 btn-bg-default text-white py-2 px-4 rounded-xl hover:btn-bg-default transition duration-300"
          >
            Send
          </button>
        </div>
      </form>
      <div class="mt-5">
        <p class="text-sm mt-6 text-color-default">
          Bạn đã nhớ mật khẩu?
          <nuxt-link
            to="/login"
            class="text-color-custom hover:text-color-custom"
            >Đăng nhập</nuxt-link
          >
        </p>
      </div>
    </div>
    <ToastSuccess v-if="showSuccessToast" :message="successMessage" />
    <ToastError v-if="showErrorToast" :message="errorMessage" />
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { checkStatusClass } from '~/mixins/ruleValidator'
import { mapState, mapActions } from 'vuex'
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'
export default {
  name: 'ForgotPasswordForm',
  mixins: [validationMixin],
  layout: 'authLayout',
  // auth: 'guest',
  components: {
    ToastSuccess,
    ToastError,
  },
  data() {
    return {
      ruleForm: {
        email: '',
      },
      isPasswordVisible: false,
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Gửi mail thành công, vào email xác thực!',
      errorMessage: 'Gửi mail thất bại!',
    }
  },
  validations: {
    ruleForm: {
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    ...mapActions('authen', ['forgotPassword']),

    checkStatusClass,
    submitForm() {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        const payload = {
          email: this.ruleForm.email,
        }
        this.forgotPassword(payload)
          .then(() => {
            this.showSuccessToast = true
            setTimeout(() => {
              this.showSuccessToast = false
            }, 2000)
          })
          .catch((error) => {
            // this.showErrorToast = true
            // setTimeout(() => {
            //   this.showErrorToast = false
            // }, 3000)
            alert(error)
            console.error('Lỗi khi cập nhật:', error)
          })
      }
    },
  },
}
</script>
<style></style>
