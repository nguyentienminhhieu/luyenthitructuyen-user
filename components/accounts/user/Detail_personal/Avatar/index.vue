<template>
  <div class="flex items-center justify-start space-x-8 py-10 border-b-2">
    <div class="relative cursor-pointer" @click="changeAvatar">
      <img
        v-if="user.avatar === null"
        src="~/assets/img/add-profile-picture-icon-upload-photo-of-social-media-user-vector.jpg"
        alt="avatar Image"
        class="w-20 h-20 z-10 rounded-full opacity-1 hover:opacity-75"
      />
      <img
        v-else
        :src="user.avatar"
        alt="avatar Image"
        class="w-20 h-20 z-10 rounded-full opacity-1 hover:opacity-75"
      />
      <div
        class="absolute inset-0 rounded-full bg-gray-300 opacity-0 hover:opacity-75 transition-opacity"
      ></div>
    </div>

    <!-- Thông tin người dùng -->
    <div>
      <h1 class="text-2xl font-semibold uppercase">{{ user.name }}</h1>
      <p class="text-base text-gray-500">{{ getRoleName(user.role) }}</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AvatarStudent',
  data() {
    return {}
  },
  computed: {
    ...mapState('users', ['user']),
  },
  mounted() {
    this.getInfoUser()
  },
  methods: {
    ...mapActions('users', ['getInfoUser']),
    changeAvatar() {
      this.$emit('upload-avatar-clicked', this.user)
    },
    getRoleName(role) {
      // Định nghĩa tên vai trò dựa trên giá trị role (1, 2, ...)
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
<style></style>
