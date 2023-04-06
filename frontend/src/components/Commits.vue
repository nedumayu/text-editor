<template>
  <div class="mt-8">
    <h4 class="mb-3">COMMITS:</h4>
    <div class="flex flex-col space-y-1">
      <div
          v-for="change in [...changes].reverse().slice(0,4)"
          :key="change.id"
          class="flex bg-secondary-focus rounded-xl px-3 py-1"
      >
        <strong>
          {{ change.user.username }}
        </strong>
        <div class="w-44 ml-3">
          {{ transformDate(change.date)}}
        </div>
        <div class="whitespace-nowrap	overflow-hidden w-[168px] text-ellipsis" :title="`${change.content}`">{{ change.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import transformDate from "../utils/transformDate.js";

const props = defineProps({
  changes: {
    type: Array,
    required: true,
    default: () => {
    }
  }
})

</script>

<style scoped>

</style>