<template>
  <div>
    <div class="boards-container">
      <div class="boards-header">
        <Input
            v-model="searchQuery"
            class="search-input"
            placeholder="Search..."
        />
        <!--      <Search :filteredElements="filteredElements" @setSearch="setSearch"/>-->
        <Sort :boards="boardStore.boards"/>
        <Filter :boards="boardStore.boards" @on-change-filter="setFilteredElements"/>
      </div>
<!--      <AddBoardModal/>-->
    </div>

    <div class="board-items" v-if="!isLoading">
      <Board
          v-for="board of searchedElements"
          :key="board._id"
          :board="board"
      />
    </div>
  </div>
</template>

<script setup>
import Board from '../components/Board.vue'
import {useBoardStore} from "../stores/BoardStore.js";
import {useSearching} from "../hooks/useSearching.js";
import AddBoardModal from "../components/AddBoardModal.vue";
import Sort from "../components/Sort.vue";
import Filter from "../components/Filter.vue";
import {onMounted, ref} from "vue";
import Search from "../components/Search.vue";

const boardStore = useBoardStore()
const isLoading = ref(true)

const filteredElements = ref(boardStore.boards)
const setFilteredElements = (f) => {
  filteredElements.value = f;
}

// const searchedElements = ref(boardStore.boards)
// const setSearch = (s) => {
//   searchedElements.value = s;
// }
const {searchQuery, searchedElements} = useSearching(filteredElements, 'title');

onMounted(async () => {
  await boardStore.getBoards()
  isLoading.value = false
})

</script>

<style scoped>
.board-items {
  display: flex;
  flex-wrap: wrap;
}

.boards-header {
  display: flex;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.search-input {
  width: 270px;
  margin-right: 20px;
  height: 40px;
  margin-bottom: 10px;
}

.boards-container {
  display: flex;
  justify-content: space-between;
}
</style>
