<template>
  <div class="container mx-auto p-8 border-b-2">
    <div class="flex justify-between my-8">
      <h2 class="text-lg font-semibold text-[#273c75]">Thông tin cá nhân</h2>
      <div>
        <i
          class="fas fa-edit text-gray-500 hover:text-gray-700 cursor-pointer"
          @click="editStudent"
        ></i>
      </div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 space-y-6"
    >
      <div
        v-for="(field, label) in userFields"
        :key="label"
        class="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <label class="font-semibold ml-2">{{ label }}:</label>
        <span>{{ field }}</span>
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
        SDT: this.user.phone,
        Email: this.user.email,
        'Vai trò': this.getRoleName(this.user.role),
        Class: this.isStudent() ? this.user.grade_id : null,
        Trường: this.user.school,
        'Địa chỉ': this.user.address,
      }
    },
  },
  mounted() {
    this.getInfoUser()
  },
  methods: {
    ...mapActions('users', ['getInfoUser']),
    editStudent() {
      this.$emit('edit-clicked')
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
  .info {
    flex-direction: column;
  }
  .info-1 {
    flex-direction: column;
  }
}
</style>
