<template>
  <div class="flex justify-center items-center h-screen">
    <div class="flex flex-col items-center">
      <h1 class="text-color-auth text-4xl font-semibold mb-4">
        Change-password
      </h1>
      <form class="mt-8 space-y-6" @submit.prevent="submitForm">
        <div class="relative">
          <label for="password" class="block text-color-default"
            >New Password</label
          >
          <div class="flex items-center">
            <input
              id="password"
              v-model.trim="ruleForm.password"
              type="password"
              name="password"
              class="w-full border-b-2 focus:outline-none p-1"
              :class="[
                !$v.ruleForm.password.$dirty
                  ? ''
                  : checkStatusClass($v.ruleForm.password)
                  ? 'border-input-error'
                  : '',
              ]"
              @blur="$v.ruleForm.password.$touch()"
            />
            <span class="cursor-pointer" @click="togglePassword">
              <i
                class="far"
                :class="isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'"
              ></i>
            </span>
          </div>
          <div
            v-if="checkStatusClass($v.ruleForm.password)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.password.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : !$v.ruleForm.password.maxLength
                  ? 'Bạn nhập quá số lượng chữ cho phép!'
                  : !$v.ruleForm.password.minLength
                  ? 'Bạn nhập ít chữ quá!'
                  : ''
              }}
            </span>
          </div>
        </div>
        <div class="relative">
          <label for="confirmPassword" class="block text-color-default"
            >Confirm Password</label
          >
          <div class="flex items-center">
            <input
              id="confirmPassword"
              v-model.trim="ruleForm.confirmpassword"
              type="password"
              name="confirmPassword"
              class="w-full border-b-2 focus:outline-none p-1"
              :class="[
                !$v.ruleForm.confirmpassword.$dirty
                  ? ''
                  : checkStatusClass($v.ruleForm.confirmpassword)
                  ? 'border-input-error'
                  : '',
              ]"
              @blur="$v.ruleForm.confirmpassword.$touch()"
            />
            <span class="cursor-pointer" @click="togglePassword">
              <i
                class="far"
                :class="isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'"
              ></i>
            </span>
          </div>
          <div
            v-if="checkStatusClass($v.ruleForm.confirmpassword)"
            class="text-input-error text-sm"
          >
            <span :style="{ width: '90%' }">
              {{
                !$v.ruleForm.confirmpassword.required
                  ? 'Vui lòng nhập dữ liệu!'
                  : !$v.ruleForm.confirmpassword.sameAsPassword
                  ? 'Bạn nhập chưa đúng mật khẩu!'
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
          Bạn không muốn đổi mật khẩu nữa?
          <nuxt-link to="/" class="text-color-custom hover:text-color-custom"
            >Back</nuxt-link
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
import { mapState, mapActions } from 'vuex'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import sameAs from 'vuelidate/lib/validators/sameAs'
import { checkStatusClass } from '~/mixins/ruleValidator'
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'
export default {
  name: 'ChangePasswordForm',
  mixins: [validationMixin],
  // layout: 'authLayout',
  components: {
    ToastSuccess,
    ToastError,
  },
  data() {
    return {
      ruleForm: {
        password: '',
        confirmpassword: '',
      },
      isPasswordVisible: false,
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Đổi mật khẩu thành công!',
      errorMessage: 'Đổi mật khẩu thất bại!',
    }
  },
  // auth: 'guest',
  validations: {
    ruleForm: {
      password: {
        required,
        maxLength: maxLength(20),
        minLength: minLength(6),
      },
      confirmpassword: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    ...mapActions('authen', ['changePassword']),
    checkStatusClass,
    togglePassword() {
      this.isPasswordVisible = !this.isPasswordVisible
      const passwordInput = document.getElementById('password')
      const confirmPasswordInput = document.getElementById('confirmPassword')
      if (passwordInput) {
        passwordInput.type = this.isPasswordVisible ? 'text' : 'password'
      }
      if (confirmPasswordInput) {
        confirmPasswordInput.type = this.isPasswordVisible ? 'text' : 'password'
      }
    },
    async submitForm() {
      if (this.$v.ruleForm) {
        const invalid = this.$v.ruleForm.$invalid
        if (invalid) {
          this.$v.ruleForm.$touch()
        } else {
          try {
            const payload = {
              password: this.ruleForm.password,
            }
            await this.changePassword(payload)
            this.showSuccessToast = true
            setTimeout(() => {
              this.showSuccessToast = false
            }, 5000)
          } catch (error) {
            this.showErrorToast = true
            setTimeout(() => {
              this.showErrorToast = false
            }, 3000)
          }
        }
      } else {
        console.error('$v.ruleForm is undefined')
      }
    },
  },
}
</script>
<style></style>
