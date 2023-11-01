<template>
  <div class="my-10">
    <h2 class="text-[#273c75] mb-6 text-2xl font-medium">Bảng Xếp Hạng</h2>
    <div class="containers flex justify-around">
      <div class="table-1 w-[50%]">
        <h3 class="text-lg font-medium mb-2">Lớp 6</h3>
        <div class="overflow-x-auto">
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
      </div>
      <div class="table-1 w-[50%]">
        <h3 class="text-lg font-medium mb-2">Lớp 7</h3>
        <div class="overflow-x-auto">
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
                v-for="(player, index) in rankClass7"
                :key="index"
                :class="{ 'bg-gray-100': index % 2 === 0 }"
              >
                <td class="px-6 py-4 whitespace-nowrap">
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
      </div>
    </div>
    <div class="containers flex justify-around mt-10 mb-20">
      <div class="table-1 w-[50%]">
        <h3 class="text-lg font-medium mb-2">Lớp 8</h3>
        <div class="overflow-x-auto">
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
      </div>
      <div class="table-1 w-[50%]">
        <h3 class="text-lg font-medium mb-2">Lớp 9</h3>
        <div class="overflow-x-auto">
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
                v-for="(player, index) in rankClass7"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RankHistory',
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
      rankClass7: [
        { rank: 1, name: 'Người Thi A', score: 95 },
        { rank: 2, name: 'Người Thi B', score: 92 },
        { rank: 3, name: 'Người Thi C', score: 88 },
        { rank: 4, name: 'Người Thi D', score: 85 },
        { rank: 5, name: 'Người Thi E', score: 80 },
        // Thêm các người Thi khác cho lớp 7 tại đây
      ],
    }
  },
}
</script>
<style scoped>
@media (min-width: 360px) and (max-width: 899px) {
  .containers {
    flex-direction: column;
  }
  .table-1 {
    width: 100%;
  }
  table {
    width: 100%;
  }
}
</style>
