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
      <div class="text-right mt-4">
        <button
          type="button"
          class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-2"
          @click="closeModal"
        >
          Thoát
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalUploadAvatar',

  props: {
    showModal: Boolean,
  },
  data() {
    return { selectedImage: null }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    changeAvatar() {
      this.$emit('close')
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        // Đọc tệp hình ảnh và hiển thị nó trên giao diện
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedImage = e.target.result
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
