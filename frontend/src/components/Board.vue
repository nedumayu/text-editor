<template>
  <div class="card w-96 bg-base-100 shadow-xl text-primary board">
    <div class="card-body">
      <h3 class="card-title text-accent-content">
        {{ board.title }}
      </h3>
      <div class="board-author">
        Created by
        <strong>{{ board.author.username }}</strong>
      </div>
      <div class="board-date">
        {{ transformDate(board.date) }}
      </div>
      <BoardMembers :members="board.members" v-if="board.members.length > 0"/>
      <div v-else></div>
      <Button class="board-button btn-primary" @click="$router.push(`/boards/${board.id}`)">go to board</Button>
    </div>
  </div>
</template>

<script setup>
import transformDate from "../utils/transformDate.js";
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
.card-title {
  font-weight: bold;
  font-size: 23px;
}

.board {
  margin-right: 20px;
  width: 320px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  z-index: 0;
}

.board-button {
  width: 150px;
  font-size: 15px;
  margin-top: auto;
}

.board-date {
  color: rgba(0, 0, 0, 0.43);
}
</style>
