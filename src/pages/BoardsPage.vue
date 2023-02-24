<template>
  <div>
    <div class="board-header">
      <Input
          v-model="searchQuery"
          class="search-input"
          placeholder="Поиск..."
      />
      <Select
        v-model="selectedSort"
        :options="sortOptions"
      />

      <div class="board-filters">
        <div class="filter-item">
          <input type="checkbox" id="active" name="active" v-model="activeChecked">
          <label for="active">Active</label>
        </div>
        <div class="filter-item">
          <input type="checkbox" id="finished" name="finished" v-model="finishedChecked">
          <label for="finished">Finished</label>
        </div>
      </div>

      <AddBoardModal/>

    </div>

    <div class="board-items">
      <Board
          v-for="board of searchedElements"
          :key="board.id"
          :board="board"
      />
    </div>
  </div>
</template>

<script setup>
import Board from '../components/Board.vue'
import {useBoardStore} from "../stores/BoardStore.js";
import {useUserStore} from "../stores/UserStore";
import {useSorting} from "../hooks/useSorting.js";
import {useFiltering} from "../hooks/useFiltering.js";
import {useSearching} from "../hooks/useSearching.js";
import AddBoardModal from "../components/AddBoardModal.vue";

const boardStore = useBoardStore()
const userStore = useUserStore();

const sortOptions = [
  {value: 'title', name: 'Title'},
  {value: 'dateUp', name: 'New first'},
  {value: 'dateDown', name: 'Old first'},
];

const {selectedSort} = useSorting(boardStore.boards);
const {activeChecked, finishedChecked, filteredElements} = useFiltering(boardStore.boards);
const {searchQuery, searchedElements} = useSearching(filteredElements, 'title');

</script>

<style scoped>
.board-items {
  display: flex;
  flex-wrap: wrap;
}

.board-header {
  display: flex;
  margin-bottom: 20px;
}

.search-input {
  width: 270px;
  margin-right: 20px;
  height: 20px;
}

.board-filters {
  display: flex;
  width: 300px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.filter-item {
  margin-left: 20px;
}
</style>
