<template>
  <div class="">
    <nav
      class="fixed top-5 right-[-15px] shadow-lg w-64 h-screen overflow-y-auto bg-white"
    >
      <ul class="p-0 m-0">
        <li class="group border-b border-gray-200">
          <div
            @click="openModalAddExam"
            v-if="user.role === 2"
            class="flex items-center justify-between p-3 rounded transition duration-300 cursor-pointer text-gray-800 hover:bg-gray-300"
          >
            <div>
              <i class="fa-regular fa-calendar-plus mx-1"></i>
              Tạo đề
            </div>
            <!-- <CreateExamExe v-if="showDropdownCreate" /> -->
          </div>
        </li>
        <li class="group border-b border-gray-200">
          <div
            @click="toggleMenuDT"
            class="flex items-center justify-between p-3 rounded transition duration-300 cursor-pointer text-gray-800 hover:bg-gray-300"
          >
            <div>
              <i class="fa-solid fa-pen-clip text-gray-800 mx-1"></i>

              Đề thi
            </div>
            <i
              class="fas fa-plus cursor-pointer"
              :class="{ 'rotate-45': isMenuOpen.DT }"
            ></i>
          </div>
          <div v-if="isMenuOpen.DT" class="ml-4 text-gray-800">
            <ul>
              <li
                @click="goToCategory(item)"
                v-for="item in listGrade"
                :key="item.id"
                class="block p-2 cursor-pointer hover:bg-gray-300 shadow-sm"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </li>
        <li class="border-gray-300">
          <div
            @click="toggleMenuBT"
            class="flex items-center justify-between p-3 rounded transition duration-300 cursor-pointer text-gray-800 hover:bg-gray-300"
          >
            <div>
              <i class="fa-solid fa-book text-gray-800 mx-1"></i>
              Bài tập
            </div>
            <i
              class="fas fa-plus cursor-pointer"
              :class="{ 'rotate-45': isMenuOpen.BT }"
            ></i>
          </div>
          <div v-if="isMenuOpen.BT" class="ml-4 text-gray-800">
            <ul>
              <li
                @click="goToCategory(item)"
                v-for="item in listGrade"
                :key="item.id"
                class="block p-2 cursor-pointer hover:bg-gray-300 shadow-sm"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'MenuBars',
  data() {
    return {
      isMenuOpen: {
        DT: true,
        BT: true,
      },
    }
  },
  computed: {
    ...mapState('grade', ['listGrade']),
    ...mapState('category', ['listCategory']),
    ...mapState('users', ['user']),
  },
  mounted() {
    this.getGrade()
    this.getCategory()
  },
  methods: {
    ...mapActions('grade', ['getGrade']),
    ...mapActions('category', ['getCategory']),
    ...mapActions('users', ['getInfoUser']),

    async goToCategory(nameGrade) {
      await this.getCategory(nameGrade.slug)
      // this.$router.go(0)
      this.$router.push({
        path: '/category-exams',
        query: {
          listCategory: JSON.stringify(this.listCategory),
          nameGrade: nameGrade.name,
        },
      })
    },
    toggleMenuDT() {
      this.isMenuOpen.DT = !this.isMenuOpen.DT
    },
    toggleMenuBT() {
      this.isMenuOpen.BT = !this.isMenuOpen.BT
    },
    openModalAddExam() {
      this.$emit('add-click')
    },
  },
}
</script>
<style scoped>
nav {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}
</style>
