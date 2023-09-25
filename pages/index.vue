<template>
  <div class="my-8 mx-20 text-[#585858]">
    <SliderHome />
    <HotExam />
    <TopCategory />
  </div>
</template>

<script>
import SliderHome from '~/components/home/Slider.vue'
import HotExam from '~/components/home/HotExam.vue'
import TopCategory from '~/components/home/TopCategory.vue'
export default {
  name: 'IndexPage',
  components: {
    SliderHome,
    HotExam,
    TopCategory,
  },
  computed: {},
  methods: {},
}
</script>
