<template>
  <div class="mt-5">
    <div class="flex items-center flex-wrap space-x-1 ">
      <div
          class="bg-white py-1 px-2 rounded-md cursor-pointer align-middle
          hover:outline hover:outline-1 hover:outline-accent-focus hover:text-accent-focus"
          v-for="member of members"
          :key="member.id"
      >
        {{ member.username }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  members: {
    type: Object,
    required: true,
    default: () => {
    }
  }
})
</script>

<style scoped>

</style>