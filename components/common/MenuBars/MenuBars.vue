<template>
  <div class="">
    <nav
      class="fixed top-5 right-[-15px] shadow-lg w-64 h-screen overflow-y-auto bg-white"
    >
      <ul class="p-0 m-0">
        <li class="group border-b border-gray-200">
          <div
            @click="openDownCreate"
            v-if="user.role === 2"
            class="flex items-center justify-between p-3 rounded transition duration-300 cursor-pointer text-gray-800 hover:bg-gray-300"
          >
            <div>
              <i class="fa-regular fa-calendar-plus mx-1"></i>
              Tạo đề
            </div>
            <i
              class="fas fa-plus cursor-pointer"
              :class="{ 'rotate-45': isMenuOpen.Create }"
            ></i>
          </div>
          <div v-if="isMenuOpen.Create" class="text-gray-800">
            <ul>
              <li
                @click="openModalAddExam"
                class="flex justify-between p-2 cursor-pointer hover:bg-gray-300 shadow-sm"
              >
                Tạo Đề thi
              </li>
              <li
                @click="openModalAddExercise"
                class="flex justify-between p-2 cursor-pointer hover:bg-gray-300 shadow-sm"
              >
                Tạo Bài tập
              </li>
            </ul>
          </div>
        </li>
        <li class="group border-b border-gray-200">
          <div
            class="flex items-center justify-between p-3 rounded transition duration-300 cursor-pointer text-gray-800 hover:bg-gray-300"
          >
            <div>
              <i class="fa-solid fa-pen-clip text-gray-800 mx-1"></i>

              Đề thi
            </div>
          </div>
          <div class="text-gray-800">
            <ul>
              <li
                @click="toggleMenuDT(item)"
                v-for="item in listGrade"
                :key="item.id"
                class="flex justify-between p-2 cursor-pointer hover:bg-gray-300 shadow-sm"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div v-if="isMenuOpen.DT" class="ml-4 text-gray-800">
            <ul>
              <li
                @click="goToCategoryExam(item)"
                v-for="item in listCategory"
                :key="item.id"
                class="block p-2 cursor-pointer hover:bg-gray-300 shadow-sm"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
        </li>
        <li class="border-gray-300">
          <div
            class="flex items-center justify-between p-3 rounded transition duration-300 cursor-pointer text-gray-800 hover:bg-gray-300"
          >
            <div>
              <i class="fa-solid fa-book text-gray-800 mx-1"></i>
              Bài tập
            </div>
          </div>
          <div class="text-gray-800">
            <ul>
              <li
                @click="toggleMenuBT(item)"
                v-for="item in listGrade"
                :key="item.id"
                class="flex justify-between p-2 cursor-pointer hover:bg-gray-300 shadow-sm"
              >
                {{ item.name }}
                <!-- <i
                  class="fas fa-plus cursor-pointer"
                  :class="{ 'rotate-45': isMenuOpen.BT }"
                ></i> -->
              </li>
            </ul>
          </div>
          <div v-if="isMenuOpen.BT" class="ml-4 text-gray-800">
            <ul>
              <li
                @click="goToCategoryExercise(item)"
                v-for="item in listCategory"
                :key="item.id"
                class="block p-2 cursor-pointer hover:bg-gray-300 shadow-sm"
              >
                {{ item.title }}
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
        Create: false,
        DT: false,
        BT: false,
      },
      showDropdownCreate: false,
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

    goToCategoryExam(category) {
      this.$router.push({
        path: `/category-exams/${category.slug}`,
        query: {
          slugCategory: category.slug,
          nameCategory: category.title,
        },
      })
    },
    goToCategoryExercise(category) {
      this.$router.push({
        path: `/category-exercise/${category.slug}`,
        query: {
          slugCategory: category.slug,
          nameCategory: category.title,
        },
      })
    },
    async toggleMenuDT(item) {
      this.isMenuOpen.DT = !this.isMenuOpen.DT
      await this.getCategory(item.slug)
    },
    async toggleMenuBT(item) {
      this.isMenuOpen.BT = !this.isMenuOpen.BT
      await this.getCategory(item.slug)
    },
    openDownCreate() {
      this.isMenuOpen.Create = !this.isMenuOpen.Create
    },
    openModalAddExam() {
      this.$emit('add-exam-click')
    },
    openModalAddExercise() {
      this.$emit('add-exercise-click')
    },
  },
}
</script>
<style scoped>
nav {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}
</style>
