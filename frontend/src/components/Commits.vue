<template>
  <div>
    <div class="flex justify-between">
      <Label class="mb-3">{{ isCommitMode ? `LAST COMMITS:` : `COMMITS:` }}</Label>
      <button
          class="hover:text-accent-focus"
          @click="setCommitMode"
      >{{ isCommitMode ? `See all --> ` : `<-- Go back` }}
      </button>
    </div>


    <div class="flex flex-col space-y-1">

      <div
          v-if="isCommitMode"
          v-for="change in [...changes].reverse().slice(0,4)"
          :key="change.id"
          class="flex bg-secondary-focus rounded-xl px-3 py-1 hover:bg-secondary-focus/70"
          @mouseenter="showTooltip($event, change.id)"
          @mouseleave="hidePopup"
      >

        <strong>
          {{ change.user.username }}
        </strong>
        <div class="w-44 ml-3">
          {{ transformDate(change.date) }}
        </div>
        <div class="whitespace-nowrap	overflow-hidden w-[168px] text-ellipsis">
          {{ change.message }}
        </div>

      </div>
      <div
          v-else
          v-for="change in [...changes].reverse().slice(0,18)"
          :key="change.id"
          class="flex bg-secondary-focus rounded-xl px-3 py-1 relative"
          @mouseenter="showTooltip($event, change.id)"
          @mouseleave="hidePopup"
      >

        <strong>
          {{ change.user.username }}
        </strong>
        <div class="w-44 ml-3">
          {{ transformDate(change.date) }}
        </div>
        <div class="whitespace-nowrap	overflow-hidden w-[168px] text-ellipsis">
          {{ change.message }}
        </div>
      </div>
      <Tooltip
          v-if="isTooltipShow"
          :style="{
            top: tooltipTop + 'px',
            left: tooltipLeft + 'px'
          }"
      >
        <div> <strong>Author:</strong> {{ tooltipContent.user.username }}</div>
        <div> <strong>Date:</strong> {{ transformDate(tooltipContent.date) }}</div>
        <strong>Commit: </strong>{{ tooltipContent.message }}<br>
        <strong v-if="tooltipContent.content">Paragraph:</strong>
        <blockquote class="bg-white p-1 rounded-md" v-if="tooltipContent.content">{{ tooltipContent.content.slice(0,55) }}...</blockquote>
      </Tooltip>
    </div>
  </div>
</template>

<script setup>
import transformDate from "../utils/transformDate.js";
import {ref} from "vue";

const isCommitMode = ref(true)
const isTooltipShow = ref(false)
const tooltipContent = ref(null)

const tooltipLeft = ref(0)
const tooltipTop = ref(0)

const props = defineProps({
  changes: {
    type: Array,
    required: true,
    default: () => {
    }
  }
})

const showTooltip = (e, id) => {
  tooltipContent.value = props.changes.find((change) => change.id === id);
  isTooltipShow.value = true;

  const rect = e.target.getBoundingClientRect();
  tooltipLeft.value = rect.left + rect.width / 2 - 100 ;
  tooltipTop.value = rect.top - rect.height - 170;
}

const hidePopup = () => {
  isTooltipShow.value = false;
  tooltipContent.value = null;
  tooltipLeft.value = 0;
  tooltipTop.value = 0;
}

const emit = defineEmits(['setMode'])

const setCommitMode = () => {
  isCommitMode.value = !isCommitMode.value
  emit('setMode', isCommitMode.value)
}

</script>

<style scoped>

</style>