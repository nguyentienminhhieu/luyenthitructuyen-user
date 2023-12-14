<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="fixed inset-0 bg-black opacity-60" @click="closeModal"></div>
    <div
      class="w-[600px] max-h-screen-md bg-white p-6 rounded-lg shadow-lg z-50"
    >
      <h2 class="text-xl font-semibold mb-4">Thay đổi ảnh đại diện</h2>
      <div class="space-y-4">
        <label
          for="avatar"
          class="bg-[#273c75] hover:bg-[#31447b] text-white px-4 py-2 rounded-full font-medium cursor-pointer"
        >
          Tải ảnh đại diện
          <input
            type="file"
            id="avatar"
            accept="image/*"
            @change="handleFileChange"
            class="hidden"
          />
        </label>
        <div class="my-4">
          <button v-if="selectedImage" @click="clearImage">
            <i class="fa-solid fa-x"></i>
          </button>
          <img
            v-if="selectedImage"
            :src="selectedImage"
            alt="Ảnh đại diện"
            class="w-32 h-32 rounded-full mx-auto"
          />
        </div>
      </div>
      <div class="col-span-3 flex justify-between mt-20">
        <button
          type="button"
          class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-2"
          @click="closeModal"
        >
          Thoát
        </button>
        <button
          type="submit"
          @click="submitForm"
          class="px-4 py-2 bg-[#273c75] hover:bg-[#31447b] text-white rounded-md"
        >
          Change
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ModalUploadAvatar',

  props: {
    showModal: Boolean,
    detailUser: Object,
  },
  data() {
    return {
      selectedImage: null,
    }
  },
  computed: {
    ...mapState('upload', ['fileUpload']),
    ...mapState('users', ['user']),
  },
  // watch: {
  //   user: {
  //     handler(newDetailExam) {
  //       if (this.user !== null) {
  //         this.detailUser = JSON.parse(JSON.stringify(this.user))
  //       }
  //     },
  //     deep: true,
  //   },
  // },
  watch: {
    showModal: {
      immediate: true,
      handler(newShowModal) {
        if (newShowModal && this.detailUser) {
          this.selectedImage = this.detailUser.avatar
        }
      },
    },
  },
  mounted() {},
  methods: {
    ...mapActions('upload', ['uploadFile']),
    ...mapActions('users', ['updateUser']),
    ...mapActions('users', ['getInfoUser']),

    closeModal() {
      this.$emit('close')
    },
    changeAvatar() {
      this.$emit('close')
    },
    submitForm() {
      const payload = {
        name: this.detailUser.name,
        address: this.detailUser.address,
        school: this.detailUser.school,
        phone: this.detailUser.phone,
        avatar: this.selectedImage,
        grade_id: this.detailUser.grade_id,
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
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        // Đọc tệp hình ảnh và hiển thị nó trên giao diện
        const reader = new FileReader()

        reader.onload = async (e) => {
          const formData = new FormData()
          formData.append('image', file)
          await this.uploadFile(formData)

          if (this.fileUpload) {
            try {
              const match = /"url":\s*"([^"]+)"/.exec(this.fileUpload)

              if (match && match[1]) {
                const url = match[1]
                // eslint-disable-next-line vue/no-mutating-props
                this.selectedImage = url.replaceAll('\\', '')
                // eslint-disable-next-line vue/no-mutating-props
              } else {
                console.log('Không tìm thấy giá trị URL.')
              }
            } catch (error) {
              console.error('Lỗi khi chuyển đổi dữ liệu JSON:', error)
            }
          } else {
            console.error('FileData không có giá trị.')
          }
        }
        reader.readAsDataURL(file)
      }
    },
    clearImage() {
      this.selectedImage = null
    },
  },
}
</script>
<style scoped>
@media (min-width: 375px) and (max-width: 899px) {
  .container-all {
    width: 400px;
    /* height: 200px; */
    /* overflow-y: auto; */
  }
}
</style>
