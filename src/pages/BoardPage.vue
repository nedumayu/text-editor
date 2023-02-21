<template>
  <div class="board">
    <Editor :board="board"/>
    <div class="board-info">
      <h2>Доска #{{ board.id }}</h2>
      <div>
        Название: {{ board.title }}
      </div>
      <div>
        Дата: {{ board.date }}
      </div>
      <div>
        Автор: {{ board.author.username }}
      </div>
      <h3>Участники: </h3>
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

const board = boardStore.boards.find(b => b.id === Number(route.params.id));
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.board-info {
  box-sizing: border-box;
  border: 1px solid black;
  height: 80.5vh;
  padding: 20px;
  border-radius: 0.75rem;
}


</style>
