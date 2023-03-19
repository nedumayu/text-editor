<template>
    <Select
        v-model="selectedSort"
        :options="sortOptions"
        class="sorting"
    />
</template>

<script setup>
import {useSorting} from "../hooks/useSorting.js";
import {useBoardStore} from "../stores/BoardStore.js";

const boardStore = useBoardStore()

const props = defineProps({
  boards: {
    type: Object
  }
})

const sortOptions = [
  {value: 'title', name: 'Title'},
  {value: 'dateUp', name: 'New first'},
  {value: 'dateDown', name: 'Old first'},
];

const {selectedSort} = useSorting(props.boards);
</script>

<style scoped>
.sorting {
  height: 40px;
  margin-bottom: 10px;
}
</style>