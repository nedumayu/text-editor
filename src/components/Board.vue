<template>
  <div class="board">
    <div class="board-title">
      {{ board.title }}
    </div>
    <div class="board-date">
      {{ board.date }}
    </div>
    <div class="board-author">
      Created by {{board.author}}
    </div>
    <h3>Участники: </h3>
    <div class="board-members">
      {{board.members}}
    </div>
    <Button class="board-button" @click="$router.push(`/board/${board.id}`);">Edit this</Button>
  </div>
</template>

<script setup>
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
}

.board-button {
  width: 120px;
  font-size: 15px;
  margin-top: auto;
}
</style>
