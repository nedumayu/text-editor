<template>
  <div class="board">
    <Editor :board="boardStore.boards[$route.params.id-1]"/>
    <div class="board-info">
      <h2>Доска #{{ $route.params.id }}</h2>
      <div>
        Название: {{ boardStore.boards[$route.params.id-1].title }}
      </div>
      <div>
        Дата: {{ boardStore.boards[$route.params.id-1].date }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {useBoardStore} from "../stores/BoardStore.js";
import Editor from "../components/Editor.vue";

const boardStore = useBoardStore();

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
