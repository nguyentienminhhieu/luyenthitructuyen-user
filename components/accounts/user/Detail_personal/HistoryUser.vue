<template>
  <div class="table-1 w-[50%] mx-10 my-20 overflow-x-auto">
    <table
      class="w-[80%] border-collapse border border-gray-300 rounded-lg overflow-hidden"
    >
      <thead>
        <tr class="bg-[#3c445c] text-white">
          <th
            class="pl-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Xếp Hạng
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Tên Người Thi
          </th>
          <th
            class="px-0 py-3 text-left text-xs font-medium uppercase tracking-wider"
          >
            Điểm Số
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(player, index) in rankClass6"
          :key="index"
          :class="{ 'bg-gray-100': index % 2 === 0 }"
        >
          <td class="pl-3 py-4 whitespace-nowrap">
            {{ player.rank }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ player.name }}
          </td>
          <td class="px-0 py-4 whitespace-nowrap">
            {{ player.score }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HistoryUser',
  data() {
    return {
      rankClass6: [
        { rank: 1, name: 'Người Thi 1', score: 100 },
        { rank: 2, name: 'Người Thi 2', score: 90 },
        { rank: 3, name: 'Người Thi 3', score: 85 },
        { rank: 4, name: 'Người Thi 4', score: 80 },
        { rank: 5, name: 'Người Thi 5', score: 75 },
        // Thêm các người Thi khác cho lớp 6 tại đây
      ],
    }
  },
}
</script>

<style scoped>
@media (min-width: 360px) and (max-width: 899px) {
  /* .containers {
    flex-direction: column;
  } */
  .table-1 {
    width: 100%;
  }
}
</style>
