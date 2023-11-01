<template>
  <div class="">
    <header
      class="bg-[#273c75] py-4 px-14 h-16 flex justify-between items-center sticky top-0"
    >
      <div class="flex items-center space-x-4">
        <nuxt-link to="/" class="logo-color text-2xl font-bold">LOGO</nuxt-link>
      </div>
      <div class="flex">
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
            Đề thi
          </h1>
          <CategoryClassMenu v-if="showDropdownClass" />
        </div>
        <div class="menu-class relative m-4">
          <!-- Dropdown -->
          <h1
            @click="categoryOpenSubject"
            class="text-border-default cursor-pointer"
          >
            Bài tập
          </h1>
          <CategorySubjectMenu v-if="showDropdownSubject" />
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
          <div>
            <AccountMenu v-if="isMenuAccount" />
          </div>
        </div>
      </div>
    </header>
    <nuxt />
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
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AccountMenu from '~/components/common/AccountMenu'
import CategoryClassMenu from '~/components/common/CategoryMenu/CategoryClassMenu'
import CategorySubjectMenu from '~/components/common/CategoryMenu/CategorySubjectMenu'
import HeadingCategory from '~/components/category/Heading.vue'

export default {
  name: 'default',
  components: {
    AccountMenu,
    CategoryClassMenu,
    CategorySubjectMenu,
    HeadingCategory,
  },
  data() {
    return {
      isMenuAccount: false,
      showDropdownClass: false,
      showDropdownSubject: false,
    }
  },
  computed: {
    ...mapState('grade', ['listGrade']),
  },
  mounted() {
    this.getGrade()
  },
  methods: {
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
    closeModal() {
      this.showDropdownClass = false
      this.showDropdownSubject = false
    },
    // goToCategory(nameGrade) {
    //   this.$router.push('/classes')
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
