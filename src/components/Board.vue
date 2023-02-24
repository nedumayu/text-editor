<template>
  <div class="board">
    <h3 class="board-title">
      {{ board.title }}
    </h3>
    <div class="board-date">
      {{ board.date.getDate() }}.{{ board.date.getMonth() + 1 }}.{{ board.date.getFullYear() }}
      {{ board.date.getHours() }}:{{ board.date.getMinutes() }}:{{ board.date.getSeconds() }}
    </div>
    <div class="board-author">
      Created by {{ board.author.username }}
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
    <Button class="board-button" @click="$router.push(`/board/${board.id}`)">go to board</Button>
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
  margin-bottom: 10px;
}

.board-button {
  width: 150px;
  font-size: 15px;
  margin-top: auto;
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
