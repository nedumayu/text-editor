<template>
  <div class="board-items">
    <Board
        v-for="board of boardStore.boards"
        :key="board.id"
        :board="board"
    />
  </div>
</template>

<script setup>
import Board from '../components/Board.vue'
import {useBoardStore} from "../stores/BoardStore.js";
const boardStore = useBoardStore()
</script>

<style scoped>
.board-items {
  display: flex;
}
</style>
