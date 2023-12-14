<template>
  <div class="flex justify-center items-center mt-10 max-h-screen">
    <div class="flex flex-col items-center">
      <h1 class="text-color-auth text-4xl font-semibold mb-4">Register</h1>
      <form class="login-form mt-8 space-y-6" @submit.prevent="submitForm">
        <!-- Hàng 1: Username và Số điện thoại -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="username" class="block text-color-default"
              >Username</label
            >
            <input
              id="username"
              v-model.trim="ruleForm.username"
              type="text"
              name="username"
              class="w-full border-b-2 focus:outline-none p-1"
              autocomplete="username"
              :class="[
                !$v.ruleForm.username.$dirty
                  ? ''
                  : checkStatusClass($v.ruleForm.username)
                  ? 'border-input-error'
                  : '',
              ]"
              @blur="$v.ruleForm.username.$touch()"
            />
            <div
              v-if="checkStatusClass($v.ruleForm.username)"
              class="text-input-error text-sm"
            >
              <span :style="{ width: '90%' }">
                {{
                  !$v.ruleForm.username.required
                    ? 'Vui lòng nhập dữ liệu!'
                    : !$v.ruleForm.username.mustOnlyNumberAndSymbol
                    ? 'Vui lòng nhập đúng định dạng tên!'
                    : ''
                }}
              </span>
            </div>
          </div>
          <!-- <div>
            <label for="phone" class="block text-color-default"
              >Số điện thoại</label
            >
            <input
              id="phone"
              v-model.trim="ruleForm.phone"
              type="tel"
              name="phone"
              class="w-full border-b-2 focus:outline-none p-1"
              :class="[
                !$v.ruleForm.phone.$dirty
                  ? ''
                  : checkStatusClass($v.ruleForm.phone)
                  ? 'border-input-error'
                  : '',
              ]"
              @blur="$v.ruleForm.phone.$touch()"
            />
            <div
              v-if="checkStatusClass($v.ruleForm.phone)"
              class="text-input-error text-sm"
            >
              <span :style="{ width: '90%' }">
                {{
                  !$v.ruleForm.phone.required
                    ? 'Vui lòng nhập dữ liệu!'
                    : !$v.ruleForm.phone.mustPhomeNumber
                    ? 'Vui lòng nhập đúng định dạng sodienthoai!'
                    : ''
                }}
              </span>
            </div>
          </div> -->

          <div>
            <label for="address" class="block text-color-default"
              >Địa Chỉ</label
            >
            <input
              id="address"
              v-model.trim="ruleForm.address"
              type="text"
              name="address"
              class="w-full border-b-2 focus:outline-none p-1"
              :class="[
                !$v.ruleForm.address.$dirty
                  ? ''
                  : checkStatusClass($v.ruleForm.address)
                  ? 'border-input-error'
                  : '',
              ]"
              @blur="$v.ruleForm.address.$touch()"
            />
            <div
              v-if="checkStatusClass($v.ruleForm.address)"
              class="text-input-error text-sm"
            >
              <span :style="{ width: '90%' }">
                {{
                  !$v.ruleForm.address.required
                    ? 'Vui lòng nhập dữ liệu!'
                    : !$v.ruleForm.address.mustNotSymbol
                    ? 'Vui lòng nhập đúng định dạng!'
                    : ''
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- Hàng 2: Email, Password và Confirm Password -->
        <div class="grid grid-cols-2 gap-3">
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
          <div class="relative">
            <label for="password" class="block text-color-default"
              >Password</label
            >
            <div class="flex items-center">
              <input
                id="password"
                v-model.trim="ruleForm.password"
                type="password"
                name="password"
                class="w-full border-b-2 focus:outline-none p-1"
                autocomplete="new-password"
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
                    : !$v.ruleForm.password.passwordRegex
                    ? 'Sai định dạng mật khẩu!'
                    : ''
                }}
              </span>
            </div>
          </div>
          <!-- <div class="relative">
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
                autocomplete="new-password"
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
          </div> -->
        </div>

        <!-- Hàng 3: roles, Trường, Địa Chỉ -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="roles" class="block text-color-default">Roles</label>
            <!-- <input
              type="text"
              id="roles"
              name="roles"
              class="w-full border-b-2 focus:outline-none p-1"
            /> -->
            <select
              id=""
              v-model="ruleForm.roles"
              name="roles"
              class="w-full border-b-2 focus:outline-none p-1"
              required
            >
              <option value="1">Hoc sinh</option>
              <option value="2">Giáo viên</option>
            </select>
          </div>
          <div v-if="ruleForm.roles === '1'">
            <label for="class" class="block text-color-default">Lớp</label>
            <select
              id="class"
              v-model="ruleForm.class"
              name="class"
              class="w-full border-b-2 focus:outline-none p-1"
              required
            >
              <option value="1">Lớp 6</option>
              <option value="2">Lớp 7</option>
              <option value="3">Lớp 8</option>
              <option value="4">Lớp 9</option>
            </select>
          </div>
          <div>
            <label for="school" class="block text-color-default">Trường</label>
            <input
              id="school"
              v-model.trim="ruleForm.school"
              type="text"
              name="school"
              class="w-full border-b-2 focus:outline-none p-1"
              :class="[
                !$v.ruleForm.school.$dirty
                  ? ''
                  : checkStatusClass($v.ruleForm.school)
                  ? 'border-input-error'
                  : '',
              ]"
              @blur="$v.ruleForm.school.$touch()"
            />
            <div
              v-if="checkStatusClass($v.ruleForm.school)"
              class="text-input-error text-sm"
            >
              <span :style="{ width: '90%' }">
                {{
                  !$v.ruleForm.school.required ? 'Vui lòng nhập dữ liệu!' : ''
                }}
              </span>
            </div>
          </div>
        </div>

        <!-- Nút Sign Up -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="mt-5 w-72 btn-bg-default text-white py-2 px-4 rounded-xl hover:btn-bg-default transition duration-300"
          >
            Đăng ký
          </button>
        </div>
      </form>
      <div class="mt-5">
        <p class="text-sm mt-5 text-color-default">
          Bạn đã có tài khoản?
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
import { mapActions, mapState } from 'vuex'
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'
import { validationMixin } from 'vuelidate'
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs,
} from 'vuelidate/lib/validators'
import {
  checkStatusClass,
  mustNotSymbol,
  mustOnlyNumberAndSymbol,
  passwordRegex,
} from '~/mixins/ruleValidator'
export default {
  name: 'RegisterForm',
  mixins: [validationMixin],
  components: {
    ToastSuccess,
    ToastError,
  },
  layout: 'authLayout',
  //   auth: 'guest',
  data() {
    return {
      ruleForm: {
        username: '',
        // phone: '',
        email: '',
        password: '',
        // confirmpassword: '',
        roles: null,
        school: '',
        address: '',
        class: null,
      },
      isPasswordVisible: false,
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Đăng ký thành công!.',
      errorMessage: 'Lỗi! Sai cái gì đó.',
    }
  },
  validations: {
    ruleForm: {
      username: {
        required,
        mustOnlyNumberAndSymbol,
      },
      // phone: {
      //   required,
      //   mustPhomeNumber,
      // },
      email: {
        required,
        email,
      },
      password: {
        required,
        maxLength: maxLength(20),
        minLength: minLength(6),
        passwordRegex,
      },
      // confirmpassword: {
      //   required,
      //   sameAsPassword: sameAs('password'),
      // },
      school: {
        required,
      },
      address: {
        required,
        mustNotSymbol,
      },
    },
  },
  computed: {
    ...mapState('grade', ['listGrade']),
  },
  mounted() {
    this.getGrade()
  },
  methods: {
    ...mapActions('authen', ['register']),
    ...mapActions('grade', ['getGrade']),
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
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        try {
          const payload = {
            name: this.ruleForm.username,
            email: this.ruleForm.email,
            password: this.ruleForm.password,
            role: this.ruleForm.roles,
            address: this.ruleForm.address,
            school: this.ruleForm.school,
            grade_id: this.ruleForm.class,
          }
          this.reset()
          await this.register(payload)
          this.showSuccessToast = true
          setTimeout(() => {
            this.showSuccessToast = false
          }, 3000)
        } catch (error) {
          this.showErrorToast = true
          setTimeout(() => {
            this.showErrorToast = false
          }, 3000)
          console.log('Submit Failed', error)
        }
      }
    },
    reset() {
      this.ruleForm = ''
    },
  },
}
</script>
<style scope></style>
