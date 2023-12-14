<template>
  <div class="">
    <header
      class="bg-[#273c75] py-4 px-14 h-16 flex justify-between items-center sticky top-0"
    >
      <div class="flex items-center space-x-4">
        <nuxt-link
          to="/"
          @click="reloadHomePage"
          class="logo-color text-2xl font-bold"
          >LuyenThiTracNghiem</nuxt-link
        >
      </div>
      <div class="menu flex">
        <div class="menu-class relative m-4">
          <!-- Dropdown -->
          <!-- <ul class="flex cursor-pointer">
            <li
              v-for="item in listGrade"
              class="text-border-default cursor-pointer mx-4"
              :key="item.id"
              @click="goToCategory(item.name)"
            >
              {{ item.name }}
            </li>
          </ul> -->
          <h1
            @click="categoryOpenClass"
            class="text-border-default cursor-pointer"
          >
            <i class="fa-solid fa-book mx-1"></i>

            ĐỀ THI
          </h1>
          <CategoryExamMenu v-if="showDropdownClass" />
        </div>
        <div class="menu-class relative m-4">
          <!-- Dropdown -->
          <h1
            @click="categoryOpenSubject"
            class="text-border-default cursor-pointer"
          >
            <i class="fa-solid fa-pen-clip mx-1"></i>
            BÀI TẬP
          </h1>
          <CategoryExerciseMenu v-if="showDropdownSubject" />
        </div>
      </div>

      <div class="relative" @click="closeModal">
        <input
          type="text"
          placeholder="Search..."
          class="search-input border-b-2 border-gray-300 rounded py-2 px-6 focus:outline-none text-sm w-[400px]"
        />
        <button
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-color-custom hover:text-gray-600 focus:outline-none"
        >
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div
        @click="openCreateExamEx"
        v-if="user.role === 2"
        class="menu relative m-4"
      >
        <h1 class="text-border-default cursor-pointer">
          <i class="fa-regular fa-calendar-plus mx-1"></i>
          TẠO ĐỀ
        </h1>
        <CreateExamExe
          v-if="showDropdownCreate"
          @open-add-exam="showModalAddExam = true"
          @open-add-exercise="showModalAddExercise = true"
        />
      </div>
      <div class="flex items-center space-x-4">
        <!-- <button
          class="text-border-default text-border-default hover:text-color-custom"
        >
          <i class="fas fa-bell"></i>
        </button> -->

        <div class="text-border-default">
          <div
            class="relative cursor-pointer text-border-default hover:text-border-default"
            @click="toggleAccountMenu"
          >
            <i class="fas fa-user-circle"></i>
          </div>
          <div @click="closeModal">
            <AccountMenu v-if="isMenuAccount" />
          </div>
        </div>
        <div class="menu-responsive hidden text-border-default">
          <div class="w-3" @click="toggleMenu">
            <i :class="showMenu ? 'fa-solid fa-times' : 'fa-solid fa-bars'"></i>
          </div>

          <MenuBars
            @add-exam-click="addExamClick"
            @add-exercise-click="addExerciseClick"
            key="menu-bars"
            class="transform transition-transform ease-out -z-10"
            :class="{
              'translate-x-0': showMenu,
              'translate-x-full': !showMenu,
            }"
            v-show="showMenu"
          />
        </div>
      </div>
    </header>
    <div @click="closeModal">
      <nuxt />
    </div>
    <footer class="text-color-default bg-[#f1f2f6]">
      <div class="container mx-auto text-center">
        <div>
          <p>
            <i class="fa-solid fa-phone"></i> 0969 351 130<span> | </span
            ><i class="fa-solid fa-envelope"></i> nguyentienmhieu@gmail.com
          </p>
        </div>
        <p>&copy; 2023 Your Company</p>
      </div>
    </footer>
    <ModalAddExam
      :showModal="showModalAddExam"
      @close="showModalAddExam = false"
    />
    <ModalAddExercise
      :showModal="showModalAddExercise"
      @close="showModalAddExercise = false"
    />
    <ScrollToTop />
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AccountMenu from '~/components/common/AccountMenu'
import CategoryExamMenu from '~/components/common/CategoryMenu/CategoryExamMenu'
import CategoryExerciseMenu from '~/components/common/CategoryMenu/CategoryExerciseMenu'
import CreateExamExe from '~/components/common/CreateExamExe/CreateExamExe.vue'
import HeadingCategory from '~/components/category/Heading.vue'
import MenuBars from '~/components/common/MenuBars/MenuBars.vue'
import ModalAddExam from '~/components/common/ModalAdd'
import ModalAddExercise from '~/components/ExerciseByTeacher/ModalAdd'
import ScrollToTop from '~/components/common/ScrollToTop.vue'

export default {
  name: 'default',
  components: {
    AccountMenu,
    CategoryExamMenu,
    CategoryExerciseMenu,
    CreateExamExe,
    HeadingCategory,
    MenuBars,
    ModalAddExam,
    ModalAddExercise,
    ScrollToTop,
  },
  data() {
    return {
      isMenuAccount: false,
      showDropdownClass: false,
      showDropdownSubject: false,
      showDropdownCreate: false,
      showDropdown: false,
      showMenu: false,
      showModalAddExam: false,
      showModalAddExercise: false,
    }
  },
  computed: {
    ...mapState('grade', ['listGrade']),
    ...mapState('users', ['user']),
  },
  mounted() {
    this.getInfoUser()
    this.getGrade()
  },
  methods: {
    ...mapActions('users', ['getInfoUser']),
    ...mapActions('grade', ['getGrade']),
    toggleAccountMenu() {
      this.isMenuAccount = !this.isMenuAccount
    },
    categoryOpenClass() {
      this.showDropdownClass = !this.showDropdownClass
    },
    categoryOpenSubject() {
      this.showDropdownSubject = !this.showDropdownSubject
    },
    openCreateExamEx() {
      this.showDropdownCreate = !this.showDropdownCreate
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
    closeModal() {
      this.showDropdownClass = false
      this.showDropdownSubject = false
      this.showDropdownCreate = false
      this.isMenuAccount = false
    },
    addExamClick() {
      this.showModalAddExam = true
      this.showMenu = false
    },
    addExerciseClick() {
      this.showModalAddExercise = true
      this.showMenu = false
    },
    reloadHomePage() {
      // Sử dụng $router.go để reload trang "/"
      this.$router.go(0)
    },
    // goToCategory(nameGrade) {
    //   this.$router.push('/category-exams')
    //   this.$root.$emit('name-grade', nameGrade)
    // },
  },
}
</script>
<style scoped>
header {
  z-index: 1000000;
}
@media (min-width: 900px) {
  header .flex.items-center {
    margin-right: 24px;
  }

  header .logo-color {
    font-size: 24px;
  }
}

@media (min-width: 360px) and (max-width: 899px) {
  header {
    padding: 10px 0px;
  }
  header .flex.items-center {
    margin: 0 12px;
  }

  header .logo-color {
    font-size: 18px;
  }
  .auth-text {
    font-size: 14px !important;
  }
  .search-input {
    width: 200px;
  }
  .menu-responsive {
    display: block;
  }
  .menu {
    display: none;
  }
  /* .menu-class {
    font-size: 14px;
    margin: 5px;
  }
  .menu-class h1 {
    display: block;
  }
  .menu-class ul {
    display: none;
  }
  .menu-class ul li {
    margin: 0 8px;
  } */
}
</style>
