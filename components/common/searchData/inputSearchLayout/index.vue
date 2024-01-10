<template>
  <div>
    <div>
      <input
        v-model="searchQuery"
        @input="performSearch"
        type="text"
        placeholder="Search..."
        class="search-input border-b-2 border-gray-300 rounded py-2 px-4 focus:outline-none text-sm w-[400px]"
      />
      <button
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-color-custom hover:text-gray-600 focus:outline-none"
        @click="performSearch"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>

    <div v-if="isSearchVisible" class="search-results max-h-96 overflow-y-auto">
      <ul>
        <li
          v-for="(result, index) in searchResults"
          :key="index"
          @click="handleResultSelect(result)"
          class="bg-white shadow-md p-4 my-4 hover:bg-[#81818122] rounded-xl cursor-pointer"
        >
          <div class="flex container-1">
            <img
              v-if="result.url_img !== null"
              :src="result.url_img"
              alt="result Image"
              class="img-exam w-24 h-20 object-cover rounded-xl transform transition-transform hover:scale-105 cursor-pointer"
            />
            <div class="mx-5">
              <h2 class="text-sm font-semibold mt-2">
                <!-- {{ result.title }} -->
                {{ truncateText(result.title, 60) }}
              </h2>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <span class="italic">{{ result.category?.subject?.name }}</span>
                /
                <span class="italic">{{ result.category?.grade?.name }}</span>
              </div>
              <div class="mt-2">
                <span class="italic text-xs text-gray-500"
                  >Người đăng:
                  {{ result.user_id === null ? 'Admin' : 'Giáo viên' }}</span
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'InputSearchLayout',
  data() {
    return {
      searchQuery: '', // Giá trị nhập vào ô tìm kiếm
      searchResults: [], // Kết quả tìm kiếm
      isSearchVisible: false,
    }
  },
  computed: {
    ...mapState('exam', ['listExamSearch']),
  },
  methods: {
    ...mapActions('exam', ['getListExamsSearch']),
    async performSearch() {
      try {
        const payload = {
          limit: '20',
          category_slug: this.searchQuery,
          title: this.searchQuery,
        }

        await this.getListExamsSearch(payload)

        this.searchResults = this.listExamSearch
        this.isSearchVisible =
          this.searchQuery !== '' && this.searchResults.length > 0
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    handleResultSelect(result) {
      this.$router.push({
        path: '/exam/intructions',
        query: {
          slugExam: result.slug,
        },
      })
    },
    truncateText(text, maxLength) {
      // Kiểm tra xem text có tồn tại không
      if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...'
      } else {
        return text
      }
    },
    truncateText(text, maxLength) {
      // Kiểm tra xem text có tồn tại không
      if (text && text.length > maxLength) {
        return text.substring(0, maxLength) + '...'
      } else {
        return text
      }
    },
    closeModal() {
      this.isSearchVisible = false
    },
  },
}
</script>

<style scoped>
/* Thêm CSS cho dropdown */
.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none;
}

.search-results ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.search-results li {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-results li:hover {
  background-color: #f0f0f0;
}
@media (min-width: 375px) and (max-width: 899px) {
  .search-input {
    width: 250px;
  }
  .search-results {
    max-height: 320px;
  }
}
</style>
