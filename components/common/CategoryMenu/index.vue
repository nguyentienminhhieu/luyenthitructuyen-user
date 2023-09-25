<template>
  <div
    class="menu absolute top-30 left-0 w-[400px] max-h-[400px] bg-white border border-gray-300 mt-2 rounded shadow-md z-50 overflow-auto"
  >
    <ul class="grid grid-cols-4 gap-2 p-2">
      <li
        v-for="category in categories"
        :key="category.id"
        class="p-2 rounded bg-gray-200 hover:bg-gray-300 overflow-hidden whitespace-wrap text-ellipsis"
      >
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CategoryMenu',
  data() {
    return {
      categories: [
        { id: 1, name: 'Lớp 6 ' },
        { id: 2, name: 'Lớp 7 ' },
        { id: 3, name: 'Lớp 8 ' },
        { id: 4, name: 'Lớp 9 ' },
        { id: 5, name: 'Môn 1 ' },
        { id: 6, name: 'Môn 1 ' },
        { id: 7, name: 'Môn 1 ' },
        { id: 8, name: 'Môn 1 ' },
        { id: 9, name: 'Môn 1 ' },
        { id: 10, name: 'Môn 1' },
        { id: 11, name: 'Môn 1' },
        { id: 12, name: 'Môn 1' },
      ],
    }
  },
}
</script>
<style scoped>
@media (min-width: 900px) {
}

@media (min-width: 360px) and (max-width: 899px) {
  .menu {
    width: 200px;
    max-height: 200px;
  }
  .menu ul {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
