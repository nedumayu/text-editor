<template>
  <div class="card w-[300px] min-h-[280px] flex flex-col mr-5 mb-5 z-1 bg-base-100 shadow-xl text-primary">

    <div class="card-body">
      <div>
        <div
            class="badge float-right"
            :class="{'badge-secondary': board.isActive, 'badge-accent': !board.isActive}">
          {{ board.isActive ? "active" : "finished" }}
        </div>
        <h3 class="text-accent-content font-semibold leading-7 text-xl">
          {{ board.title }}
        </h3>

      </div>
      <div>
        Created by
        <strong>{{ board.author.username }}</strong>
      </div>
      <div class="text-base-300">
        {{ transformDate(board.date) }}
      </div>
      <BoardMembers :members="board.members" v-if="board.members.length > 0"/>
      <div v-else></div>
      <Button class="w-36 btn-primary mt-auto" @click="$router.push(`/boards/${board.id}`)">go to board</Button>
    </div>
  </div>
</template>

<script setup>
import transformDate from "../utils/transformDate.js";
import BoardMembers from "./BoardMembers.vue";
import {useUserStore} from "../stores/UserStore.js";

const userStore = useUserStore()

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

</style>
