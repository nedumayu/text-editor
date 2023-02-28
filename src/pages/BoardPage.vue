<template>
  <div class="board">
    <Editor :board="board"/>
    <div class="board-info">
      <h1>Доска #{{ board.id }}</h1>
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
        <h3>Участники:</h3>
        <div class="board-members">
          <div class="board-member" v-for="member of board.members" :key="member.id">
            {{ member.username }}
          </div>
        </div>
      </div>
      <div>
        <h3>Изменения:</h3>
        <div v-for="change in changesStore.changes.filter(c => c.boardId === board.id).sort((a, b) => b.date - a.date)" :key="change.id" class="changes-item">
          <strong class="change-user">{{  change.user.username  }}</strong>
          <div class="change-date">
            {{  change.date.getDate()  }}.{{  change.date.getMonth() + 1 }}.{{  change.date.getFullYear()  }}
            {{  change.date.getHours()  }}:{{  change.date.getMinutes()  }}:{{  change.date.getSeconds()  }}
          </div>
          <div class="change-content">{{  change.content  }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useBoardStore} from "../stores/BoardStore.js";
import Editor from "../components/Editor.vue";
import {useRoute} from 'vue-router'
import {useChangesStore} from "../stores/ChangesStore";
import {useUserStore} from "../stores/UserStore";

const boardStore = useBoardStore();
const changesStore = useChangesStore();
const userStore = useUserStore();

const route = useRoute();

const board = boardStore.boards.find(b => b.id === Number(route.params.id));
//const changes = changesStore.changes.filter(c => c.boardId === board.id).sort((a, b) => b.date - a.date);

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
.changes-item {
  display: flex;
}

.change-user, .change-date {
  margin-right: 20px;
}

.change-content {
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
  text-overflow: ellipsis;
}

.change-content:hover {
  overflow: inherit;
  text-overflow: inherit;
  white-space: inherit;
  height: auto;
}
</style>
