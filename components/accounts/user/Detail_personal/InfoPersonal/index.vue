<template>
  <div class="container py-8 border-b-2 w-[100%] mx-auto">
    <div class="flex justify-between my-8">
      <h2 class="text-lg font-semibold text-[#273c75]">Thông tin cá nhân</h2>
    </div>

    <div class="info grid grid-cols-1 gap-3 w-[50%] mx-10">
      <div class="flex justify-end">
        <i
          class="fas fa-edit text-gray-500 hover:text-gray-700 cursor-pointer"
          @click="editStudent(user)"
        ></i>
      </div>
      <div
        v-for="(field, label) in userFields"
        :key="label"
        class="bg-white shadow-md overflow-hidden text-lg p-4"
      >
        <div class="flex items-start">
          <label class="font-semibold mr-4">{{ label }}:</label>
          <span>{{ label === 'Class' ? userClass : field }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Cookies from '@/services/cookies.service.js'

export default {
  name: 'InfoPersonUser',
  computed: {
    ...mapState('users', ['user']),
    userFields() {
      return {
        Username: this.user.name,
        Email: this.user.email,
        'Vai trò': this.getRoleName(this.user.role),
        Class: this.user.grade_id,
        Trường: this.user.school,
        'Địa chỉ': this.user.address,
      }
    },
    userClass() {
      switch (this.user.grade_id) {
        case 1:
          return 'Lớp 6'
        case 2:
          return 'Lớp 7'
        case 3:
          return 'Lớp 8'
        case 4:
          return 'Lớp 9'
        default:
          return 'Không xác định'
      }
    },
  },
  mounted() {
    this.getInfoUser()
  },
  methods: {
    ...mapActions('users', ['getInfoUser']),
    editStudent(user) {
      this.$emit('edit-user-clicked', user)
    },
    isStudent() {
      this.user.role === 1
    },
    getRoleName(role) {
      switch (role) {
        case 1:
          return 'Học Sinh'
        case 2:
          return 'Giáo viên'
        default:
          return 'Null'
      }
    },
  },
}
</script>
<style scoped>
@media (min-width: 375px) and (max-width: 899px) {
  .info {
    width: 100%;
    margin: 0 25px;
  }
  .info-1 {
    flex-direction: column;
  }
}
</style>
