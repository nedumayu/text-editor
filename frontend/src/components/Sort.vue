<template>
    <Select
        v-model="selectedSort"
        :options="sortOptions"
        class="h-10 mb-3"
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

</style>