<template>
    <div class="flex items-center space-x-5 rounded-lg px-5 h-12 bg-base-100 mr-3">
      <div class="grid grid-cols-[1fr_2fr] items-center gap-2">
        <input
            type="checkbox"
            class="checkbox checkbox-primary"
            id="active"
            name="active"
            v-model="activeChecked"
            @change="emit('onChangeFilter', filteredElements)"
        >
        <label for="active">active</label>
      </div>
      <div class="grid grid-cols-[1fr_2fr] items-center">
        <input
            type="checkbox"
            class="checkbox checkbox-primary"
            id="finished"
            name="finished"
            v-model="finishedChecked"
            @change="emit('onChangeFilter', filteredElements)"
        >
        <label for="finished">finished</label>
      </div>
    </div>
</template>

<script setup>
import {useFiltering} from "../hooks/useFiltering.js";

const props = defineProps({
  boards: {
    type: Object
  }
})
const {activeChecked, finishedChecked, filteredElements} = useFiltering(props.boards);
const emit = defineEmits(['onChangeFilter'])

</script>

<style scoped>

</style>