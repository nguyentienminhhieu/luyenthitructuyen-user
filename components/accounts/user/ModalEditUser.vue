<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60"></div>
    <div
      class="container-all w-96 bg-white p-6 rounded-lg shadow-lg z-50 max-w-screen-md max-h-screen-md"
    >
      <h2 class="text-center text-xl font-semibold mb-10">
        Sửa thông tin User
      </h2>
      <form class="container-form" @submit.prevent="submitForm">
        <!-- Username -->
        <div class="my-6 md:mb-0">
          <label for="username" class="block text-color-default"
            >Username</label
          >
          <input
            id="username"
            v-model.trim="ruleForm.username"
            type="text"
            name="username"
            class="w-full border-b-2 focus:outline-none p-1"
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
                  : !$v.ruleForm.username.mustNotSymbol
                  ? 'Vui lòng nhập đúng định dạng tên!'
                  : ''
              }}
            </span>
          </div>
        </div>

        <!-- Email -->
        <!-- <div class="my-6 md:mb-0">
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
        </div> -->

        <!-- Roles (mặc định là Giáo viên và không được sửa) -->
        <!-- <div class="mb-4 md:mb-0">
          <label for="roles" class="block text-color-default">Roles</label>
          <select
            id="roles"
            v-model="ruleForm.roles"
            name="roles"
            class="w-full border-b-2 focus:outline-none p-1"
          >
            <option value="1">Học Sinh</option>
            <option value="2">Giáo Viên</option>
          </select>
        </div> -->
        <div class="my-6 md:mb-0">
          <div v-if="detailUser.role === 1">
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
        </div>
        <!-- Địa chỉ -->
        <div class="my-6 md:mb-0">
          <label for="address" class="block text-color-default">Địa chỉ</label>
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
                !$v.ruleForm.address.required ? 'Vui lòng nhập dữ liệu!' : ''
              }}
            </span>
          </div>
        </div>
        <!-- Trường học -->
        <div class="my-6 md:mb-0">
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
              {{ !$v.ruleForm.school.required ? 'Vui lòng nhập dữ liệu!' : '' }}
            </span>
          </div>
        </div>

        <!-- Footer với nút Thoát và Thêm -->
        <div class="col-span-3 flex justify-between mt-8">
          <button
            type="button"
            class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-2"
            @click="closeModal"
          >
            Thoát
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-[#273c75] hover:bg-[#31447b] text-white rounded-md"
          >
            Sửa
          </button>
        </div>
      </form>
    </div>
    <ToastSuccess v-if="showSuccessToast" :message="successMessage" />
    <ToastError v-if="showErrorToast" :message="errorMessage" />
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { mapState, mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import ToastSuccess from '~/components/common/ToastSuccess.vue'
import ToastError from '~/components/common/ToastError.vue'
import {
  checkStatusClass,
  mustNotSymbol,
  mustPhomeNumber,
} from '~/mixins/ruleValidator'
export default {
  name: 'ModalEditUser',
  mixins: [validationMixin],
  components: {
    ToastSuccess,
    ToastError,
  },
  props: {
    showModal: Boolean,
    detailUser: Object,
  },
  data() {
    return {
      ruleForm: {
        username: '',
        email: '',
        address: '',
        school: '',
        // roles: null,
        phone: '0969',
        class: '',
      },
      showSuccessToast: false,
      showErrorToast: false,
      successMessage: 'Sửa người dùng thành công!.',
      errorMessage: 'Lỗi! Vui long thu lai.',
    }
  },
  computed: {
    ...mapState('users', ['user']),
  },
  mounted() {},
  watch: {
    showModal: {
      immediate: true,
      handler(newShowModal) {
        if (newShowModal && this.detailUser) {
          this.ruleForm.username = this.detailUser.name
          this.ruleForm.email = this.detailUser.email
          this.ruleForm.address = this.detailUser.address
          this.ruleForm.school = this.detailUser.school
          this.ruleForm.class = this.detailUser.grade_id
        }
      },
    },
  },
  validations: {
    ruleForm: {
      username: {
        required,
        mustNotSymbol,
      },
      email: {
        required,
        email,
      },
      school: {
        required,
      },
      address: {
        required,
        // mustNotSymbol,
      },
    },
  },
  methods: {
    ...mapActions('users', ['updateUser']),
    ...mapActions('users', ['getInfoUser']),

    checkStatusClass,
    closeModal() {
      this.$emit('close')
      this.$v.$reset()
    },
    submitForm() {
      const invalid = this.$v.ruleForm.$invalid
      if (invalid) {
        this.$v.ruleForm.$touch()
      } else {
        const payload = {
          name: this.ruleForm.username,
          address: this.ruleForm.address,
          school: this.ruleForm.school,
          phone: this.ruleForm.phone,
          avatar: this.detailUser.avatar,
          grade_id: this.ruleForm.grade_id,
        }
        this.updateUser(payload)
          .then(() => {
            this.showSuccessToast = true
            setTimeout(() => {
              this.showSuccessToast = false
              this.getInfoUser()
            }, 2000)
          })
          .catch(() => {
            this.showErrorToast = true
            setTimeout(() => {
              this.showErrorToast = false
            }, 2000)
          })
      }
    },
  },
}
</script>

<style scoped>
@media (min-width: 375px) and (max-width: 899px) {
  .container-all {
    width: 300px;
    height: 500px;
    overflow-y: auto;
  }
  .container-form {
    display: flex;
    flex-direction: column;
  }
}
</style>
