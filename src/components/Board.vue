<template>
  <div class="board">
    <h3 class="board-title">
      {{ board.title }}
    </h3>
    <div class="board-date">
      {{board.date.getDate()}}.{{board.date.getMonth()+1}}.{{board.date.getFullYear()}} {{board.date.getHours()}}:{{board.date.getMinutes()}}:{{board.date.getSeconds()}}
    </div>
    <div class="board-author">
      Created by {{board.author.username}}
    </div>
    <h4>Участники: </h4>
    <div class="board-members">
      {{board.members}}
    </div>
    <Button class="board-button" @click="$router.push(`/board/${board.id}`)">Edit this</Button>
  </div>
</template>

<script setup>
const props = defineProps({
  board: {
    type: Object,
    required: true,
    default: () => {}
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
  width: 120px;
  font-size: 15px;
  margin-top: auto;
}
</style>
