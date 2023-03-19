<template>
    <div class="board-filters" >
      <div class="filter-item">
        <input type="checkbox" id="active" name="active" v-model="activeChecked" @change="emit('onChangeFilter', filteredElements)">
        <label for="active">Active</label>
      </div>
      <div class="filter-item">
        <input type="checkbox" id="finished" name="finished" v-model="finishedChecked" @change="emit('onChangeFilter', filteredElements)">
        <label for="finished">Finished</label>
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
  height: 40px;
  width: 300px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.filter-item {
  margin-left: 20px;
}
</style>