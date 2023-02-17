<template>
  <div class="board">
    <Editor :board="boardStore.boards[$route.params.id-1]"/>
    <div class="board-info">
      <h2>Доска #{{ board.id }}</h2>
      <div>
        Название: {{ board.title }}
      </div>
      <div>
        Дата: {{ board.date }}
      </div>
      <div>
        Автор: {{ board.author }}
      </div>
      <h3>Участнки: </h3>
      <div>
         {{ board.members }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {useBoardStore} from "../stores/BoardStore.js";
import Editor from "../components/Editor.vue";
import {useRoute} from 'vue-router'

const boardStore = useBoardStore();
const route = useRoute();

const board = boardStore.boards[route.params.id-1]
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
