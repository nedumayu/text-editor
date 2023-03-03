<template>
  <div class="board">
    <h3 class="board-title">
      {{ board.title }}
    </h3>
    <div class="board-author">
      Created by
      <strong>{{ board.author.username }}</strong>
    </div>
    <div class="board-date">
      {{ board.date.getDate() }}.{{ board.date.getMonth() + 1 }}.{{ board.date.getFullYear() }}
      {{ board.date.getHours() }}:{{ board.date.getMinutes() }}
    </div>
    <BoardMembers :members="board.members" v-if="board.members.length > 0"/>
    <div v-else></div>
    <Button class="board-button" @click="$router.push(`/board/${board.id}`)">go to board</Button>
  </div>
</template>

<script setup>
import BoardMembers from "./BoardMembers.vue";

const props = defineProps({
  board: {
    type: Object,
    required: true,
    default: () => {
    }
  }
})
</script>

<style scoped>
.board {
  margin-right: 20px;
  width: 260px;
  height: 260px;
  border: 1px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.board-button {
  width: 150px;
  font-size: 15px;
  margin-top: auto;
}

.board-title {
  margin-bottom: 20px;
}

.board-date {
  color: rgba(0, 0, 0, 0.43);
}
</style>
