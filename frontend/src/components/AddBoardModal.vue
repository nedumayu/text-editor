<template>
  <Button
      v-if="userStore.isAuth"
      @click="modalVisible = true"
      class="new-board-button"
  >
    New Board
  </Button>
  <div v-else></div>

  <Modal v-model:show="modalVisible">
    <div class="new-board-form">
      <h1 class="modal-title">Create new board!</h1>
      <Input
          v-model="title"
          placeholder="Название"
          class="search-input"
          v-focus
      />
      <h3>Участники:</h3>
      <EditBoardMembers v-if="!isLoading && members.length > 0"
          :members="members"
          :board-members="boardMembers"
          @setMembers="setMembers"
      />
      <Button @click="createBoard">Create</Button>
    </div>
  </Modal>
  <Toast :show="messageVisible">
    Доска создана!
  </Toast>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useUserStore} from "../stores/UserStore.js";
import {useBoardStore} from "../stores/BoardStore.js";
import EditBoardMembers from "./EditBoardMembers.vue";

const boardStore = useBoardStore();
const userStore = useUserStore();

const title = ref('');

const modalVisible = ref(false);
const messageVisible = ref(false);
const isLoading = ref(false)

const members = ref(userStore.users.filter(member => member.id !== userStore.currentUser.id));
const boardMembers = ref([]);

const setMembers = ([m, b]) => {
  members.value = m;
  boardMembers.value = b;
}

const createBoard = async () => {
  const memberIds = boardMembers.value.map(member => member.id)
  const newBoard = {
    title: title.value,
    author: userStore.currentUser.id,
    members: memberIds
  }
  const bd = await boardStore.addBoard(newBoard);
  if (boardStore.boards.length !== 0) {
    boardStore.boards.push(bd)
  }
  userStore.currentUser.boards.push(bd)
  messageVisible.value = true;
  title.value = '';
  boardMembers.value = [];
  members.value = userStore.users.filter(member => member.id !== userStore.currentUser.id);
  modalVisible.value = false;
  setTimeout(() => {
    messageVisible.value = false;
  }, 2000);
}

onMounted(async() => {
  if (userStore.users.length === 0) {
    isLoading.value = true
    await userStore.getUsers()
    members.value = userStore.users.filter(member => member.id !== userStore.currentUser.id)
    isLoading.value = false
  }
})
</script>

<style scoped>
.new-board-button {
  margin-left: auto;
  min-width: 130px;
  height: 40px;
}

.new-board-form {
  display: flex;
  width: 400px;
  flex-direction: column;
}

.new-board-form h3 {
  margin-bottom: 10px;
}

.modal-title {
  margin-bottom: 20px;
}

.search-input {
  margin-bottom: 20px;
}
</style>