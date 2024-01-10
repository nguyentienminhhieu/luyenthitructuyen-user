<template>
  <div class="my-8 mx-20 text-[#585858]">
    <SliderHome />
    <HotExam />
    <LastContent />
    <!-- <RankHistory /> -->
    <!-- <TopCategory /> -->
  </div>
</template>

<script>
import SliderHome from '~/components/home/Slider.vue'
import HotExam from '~/components/home/HotExam.vue'
import LastContent from '~/components/home/LastContent.vue'
// import RankHistory from '~/components/home/RankHistory.vue'
// import TopCategory from '~/components/home/TopCategory.vue'

export default {
  name: 'IndexPage',
  components: {
    SliderHome,
    HotExam,
    LastContent,
    // TopCategory,
    // RankHistory,
  },
  computed: {},
  mounted() {
    localStorage.removeItem('answersKey')
    localStorage.removeItem('remainingTime')
    localStorage.removeItem('questionData')
  },
  methods: {},
}
</script>
