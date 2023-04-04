<template>
  <div v-if="!isLoading">
    <div class="flex justify-between" >
      <div class="flex flex-wrap mb-2">
        <Input
            v-model="searchQuery"
            class="w-60 mr-4 mb-2"
            placeholder="Search..."
        />
        <!--      <Search :filteredElements="filteredElements" @setSearch="setSearch"/>-->
        <Sort :boards="boardStore.boards"/>
        <Filter :boards="boardStore.boards" @on-change-filter="setFilteredElements"/>
      </div>
      <AddBoardModal/>
    </div>

    <div class="flex flex-wrap" >
      <Board
          v-for="board of searchedElements"
          :key="board.id"
          :board="board"
      />
    </div>
  </div>
  <div v-else>загрузка....</div>
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
import {useUserStore} from "../stores/UserStore.js";

const boardStore = useBoardStore()
const userStore = useUserStore()
const isLoading = ref(false)

const filteredElements = ref(boardStore.boards)
const setFilteredElements = (f) => {
  filteredElements.value = f;
}
const {searchQuery, searchedElements} = useSearching(filteredElements, 'title');

// const searchedElements = ref(boardStore.boards)
// const setSearch = (s) => {
//   searchedElements.value = s;
// }

onMounted(async () => {
  if (boardStore.boards.length === 0) {
    isLoading.value = true
    await boardStore.getBoards()
    filteredElements.value = boardStore.boards
    isLoading.value = false
  }
})

</script>

<style scoped>

</style>
