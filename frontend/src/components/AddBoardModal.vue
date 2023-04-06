<template>
  <Button
      v-if="userStore.isAuth"
      @click="modalVisible = true"
      class="ml-auto btn-primary"
  >
    New Board
  </Button>
<!--  <label for="my-modal" v-if="userStore.isAuth" class="btn new-board-button">New Board</label>-->

  <Modal v-model:show="modalVisible">
    <div class="flex flex-col w-[460px] text-primary">
      <h1 class="mb-5 font-bold text-3xl">Create new board!</h1>
      <Input
          v-model="title"
          placeholder="Title"
          class="mb-5 w-full"
          v-focus
      />
      <Label class="mb-1 text-sm">members:</Label>
      <EditBoardMembers v-if="!isLoading"
          :members="members"
          :board-members="boardMembers"
          @setMembers="setMembers"
      />
      <Button @click="createBoard" class="w-24">Create</Button>
<!--      <div class="modal-action">-->
<!--        <label for="my-modal" class="btn" @click="createBoard">Create</label>-->
<!--      </div>-->
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
  if (userStore.users.length === 0 && userStore.isAuth) {
    isLoading.value = true
    await userStore.getUsers()
    members.value = userStore.users.filter(member => member.id !== userStore.currentUser.id)
    isLoading.value = false
  }
})
</script>

<style scoped>
</style>