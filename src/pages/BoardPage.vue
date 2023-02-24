<template>
  <div class="board">
    <Editor :board="board"/>
    <div class="board-info">
      <h2>Доска #{{ board.id }}</h2>
      <div>
        Название: {{ board.title }}
      </div>
      <div>
        Дата: {{ board.date.getDate() }}.{{ board.date.getMonth() + 1 }}.{{ board.date.getFullYear() }}
        {{ board.date.getHours() }}:{{ board.date.getMinutes() }}:{{ board.date.getSeconds() }}
      </div>
      <div>
        Автор: {{ board.author.username }}
      </div>
      <div v-if="board.members.length > 0">
        <h4>Участники: </h4>
        <div class="board-members">
          <div class="board-member" v-for="member of board.members" :key="member.id">
            {{ member.username }}
          </div>
        </div>
      </div>
      <div v-else></div>
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

.board-members {
  display: flex;
}

.board-member {
  background: rgba(215, 215, 215, 0.4);
  padding: 5px;
  margin-right: 5px;
  border-radius: 10px;
  cursor: default;
}
</style>
