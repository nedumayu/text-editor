<template>
  <div class="profile">
    <div class="profile-content">
      <div class="profile-menu">
        <Button style="margin-bottom: 10px">Edit info</Button>
        <Button @click="logout">Log out</Button>
      </div>
      <div class="profile-info">
        <div>
          <img src="../../public/profile-Icon.png" class="profile-avatar"/>
        </div>
        <div>Username: {{ userStore.currentUser.username }}</div>
        <div>E-mail: {{ userStore.currentUser.email }}</div>
      </div>
    </div>
    <div v-if="userBoards.length > 0">
      <h2>Доски:</h2>
      <div class="profile-boards">
        <Board
            v-for="board of userBoards"
            :key="board.id"
            :board="board"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from '../stores/UserStore.js'
import {useRouter} from "vue-router";
import Button from "../components/UI/Button.vue";
import Board from "../components/Board.vue";
import {useBoardStore} from "../stores/BoardStore.js";

const userStore = useUserStore();
const boardStore = useBoardStore();

const userBoards = [];
for (let i = 0; i < userStore.currentUser.boards.length; i++) {
  userBoards.push(boardStore.boards.find(board => board.id === userStore.currentUser.boards[i]));
}

console.log(userBoards);
console.log(userStore.currentUser.boards);
console.log(boardStore);
const router = useRouter();

const logout = () => {
  userStore.isAuth = false;
  userStore.currentUser = {};
  router.push('/');
}
</script>

<style scoped>
.profile {
  padding: 20px 40px;
}

.profile-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 50px;
}

.profile-menu {
  display: flex;
  flex-direction: column;
  padding: 0 50px 0 0;
  border-right: 1px solid black;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid black;
  margin-bottom: 10px;
}

.profile-boards {
  display: flex;
}
</style>
