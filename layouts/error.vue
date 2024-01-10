<template>
  <div
    class="h-screen font-sans text-black grid place-content-center overflow-hidden"
  >
    <div class="max-w-520px text-center z-20">
      <h1 class="text-8xl sm:text-10xl font-medium mb-8">error:</h1>
      <p
        class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight"
      >
        Page not found
      </p>
      <div class="w-full flex items-center justify-center">
        <a
          href="/"
          class="border-2 text-md sm:text-xl hover:bg-gray-100 py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"
          >Go back home</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: false,
  name: 'ErrorLayout',
}
</script>
<style></style>
