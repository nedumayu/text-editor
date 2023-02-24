<template>
  <Button
      v-if="userStore.isAuth"
      @click="showModal"
      class="new-board-button"
  >
    New Board
  </Button>
  <div v-else></div>

  <Modal v-model:show="modalVisible">
    <div class="new-board-form">
      <h1>Create new board!</h1>
      <Input
          v-model="title"
          placeholder="Название"
          v-focus
      />
      <h3>Участники:</h3>

      <div class="members-list">
        <div class="members-item" v-for="member of boardMembers" :key="member.id">
          <div style="margin-right: 10px">{{member.username}}</div>
          <div class="delete-member" @click="deleteMember(member.id)">х</div>
        </div>
      </div>

      <Input v-model="searchQuery"
             class="search-input"
             placeholder="Начните вводить имя пользователя..."
      />
      <div class="board-members">
        <div
            class="board-members-item"
            v-for="user of searchedElements"
            :key="user.id"
            @click="addMemberToBoard(user.id)"
        >
          <div>
            {{user.username}}
          </div>
          <div>
            {{user.email}}
          </div>
        </div>
      </div>
      <Button @click="createBoard">Create</Button>
    </div>
  </Modal>
  <Toast :show="messageVisible">
    Доска создана!
  </Toast>
</template>

<script setup>
import {ref} from "vue";
import {useUserStore} from "../stores/UserStore.js";
import {useBoardStore} from "../stores/BoardStore.js";
import {useSearching} from "../hooks/useSearching.js";

const boardStore = useBoardStore();
const userStore = useUserStore();

const title = ref('');
const boardMembers = ref([]);

const modalVisible = ref(false);
const messageVisible = ref(false);

const showModal = () => {
  modalVisible.value = true;
}

const members = ref(userStore.users.filter(member => member.id !== userStore.currentUser.id));
const addMemberToBoard = (id) => {
  const user = userStore.users.find(user => user.id === id);
  boardMembers.value.push({
    id: user.id,
    username: user.username
  });
  members.value = members.value.filter(member => member.id !== id);
}
const {searchQuery, searchedElements} = useSearching(members, 'username');

const createBoard = () => {
  const newBoard = {
    id: Date.now(),
    title: title.value,
    date: new Date(),
    content: '',
    isActive: true,
    author: {
      id: userStore.currentUser.id,
      username: userStore.currentUser.username,
    },
    members: boardMembers.value,
  }
  boardStore.addBoard(newBoard);

  const currUser = userStore.users.find(user => user.id === userStore.currentUser.id);
  currUser.boards = [...currUser.boards, newBoard.id];
  userStore.currentUser.boards = [...currUser.boards];

  boardMembers.value.forEach(member => {
    const user = userStore.users.find(user => user.id === member.id);
    user.boards = [...user.boards, newBoard.id]
  })

  messageVisible.value = true;
  title.value = '';
  boardMembers.value = [];
  members.value = userStore.users.filter(member => member.id !== userStore.currentUser.id);
  modalVisible.value = false;
  setTimeout(() => {
    messageVisible.value = false;
  }, 2000);
}

const deleteMember = (id) => {
  boardMembers.value = boardMembers.value.filter(member => member.id !== id);
  members.value.push({
    id: id,
    username: userStore.users.find(user => user.id === id).username
  });
}

</script>

<style scoped>
.new-board-button {
  margin-left: auto;
}

.new-board-form {
  display: flex;
  width: 400px;
  flex-direction: column;
}

.board-members {
  height: 70px;
  border: 1px solid black;
  border-top: none;
  margin-bottom: 30px;
  overflow: hidden;
  overflow-y: scroll;
  padding: 3px;
}

.board-members-item {
  border-bottom: 1px solid gray;
  height: 20px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;

}

.board-members-item:hover {
  background: #e5f0ff;
  cursor: pointer;
}

.members-list {
  display: flex;
  margin-bottom: 10px;
}

.members-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  padding: 5px;
  border-radius: 15px;
  margin-right: 5px;
}

.delete-member {
  width: 15px;
  height: 15px;
  border: 1px solid black;
  text-align: center;
  padding: 0 2px 5px 3px;
  border-radius: 50%;
  cursor: pointer;
}

.delete-member:hover {
  color: white;
  background: black;
}
</style>