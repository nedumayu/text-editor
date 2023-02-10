<template>
  <div class="board">
    <div class="editor">
        ayyyy
    </div>
    <div class="board-info">
      <h2>Доска #{{$route.params.id}}</h2>
      <div>
        Название: {{board.title}}
      </div>
      <div>
        Дата: {{board.date}}
      </div>
    </div>
  </div>
</template>

<script setup>
import {useBoardStore} from "../stores/BoardStore.js";
const boardStore = useBoardStore();
const board = boardStore.boards[1];
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}
.editor, .board-info {
  box-sizing: border-box;
  border: 1px solid black;
  height: 300px;
  padding: 20px;
}

</style>
