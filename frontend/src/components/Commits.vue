<template>
  <div>
    <div class="flex justify-between">
      <Label class="mb-3">{{isCommitMode ? `LAST COMMITS:` : `COMMITS:`}}</Label>
      <button
          class="hover:text-accent-focus"
          @click="setCommitMode"
      >{{isCommitMode ?  `See all --> ` : `<-- Go back`}}</button>
    </div>
    <div class="flex flex-col space-y-1">
      <div
          v-if="isCommitMode"
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
      <div
          v-else
          v-for="change in [...changes].reverse()"
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
import {ref} from "vue";

const isCommitMode = ref(true)

const props = defineProps({
  changes: {
    type: Array,
    required: true,
    default: () => {
    }
  }
})

const emit = defineEmits(['setMode'])

const setCommitMode = () => {
  isCommitMode.value = !isCommitMode.value
  emit('setMode', isCommitMode.value)
}

</script>

<style scoped>

</style>