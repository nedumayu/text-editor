<template>
    <div class="board-filters bg-base-100" >
      <div class="filter-item">
        <input type="checkbox" class="checkbox checkbox-primary" id="active" name="active" v-model="activeChecked" @change="emit('onChangeFilter', filteredElements)">
        <label for="active">active</label>
      </div>
      <div class="filter-item">
        <input type="checkbox" class="checkbox checkbox-primary" id="finished" name="finished" v-model="finishedChecked" @change="emit('onChangeFilter', filteredElements)">
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
.board-filters {
  display: flex;
  height: 48px;
  padding: 0 20px;
  align-items: center;
  border-radius: 7px;
}

.filter-item {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  margin-right: 20px;
}

.checkbox {
  margin-right: 5px;
}
</style>