<template>
  <div>
    <div class="board-header">
      <Input
          v-model="searchQuery"
          class="search-input"
          placeholder="Поиск..."
      />
      <Select
        v-model="selectedSort"
        :options="sortOptions"
      />

      <div class="board-filters">
        <div class="filter-item">
          <input type="checkbox" id="active" name="active" v-model="activeChecked">
          <label for="active">Active</label>
        </div>
        <div class="filter-item">
          <input type="checkbox" id="finished" name="finished" v-model="finishedChecked">
          <label for="finished">Finished</label>
        </div>
      </div>

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
          <Input v-model="title" placeholder="Название" v-focus/>

          <h3>Участники:</h3>
          <Input placeholder="Начните вводить имя пользователя..." />
          <Button @click="createBoard">Create</Button>
          <div v-if="messageVisible">{{message}}</div>
        </div>
      </Modal>

    </div>

    <div class="board-items">
      <Board
          v-for="board of searchedBoards"
          :key="board.id"
          :board="board"
      />
    </div>
  </div>
</template>

<script setup>
import Board from '../components/Board.vue'
import {useBoardStore} from "../stores/BoardStore.js";
import {useUserStore} from "../stores/UserStore";
import {computed, ref, watch} from "vue";

const boardStore = useBoardStore()
const userStore = useUserStore();

const title = ref('');

const activeChecked = ref(false);
const finishedChecked = ref(false)

const modalVisible = ref(false);

const message = ref('Доска создана!');
const messageVisible = ref(false)

const searchQuery = ref('');

const sortOptions = [
  {value: 'title', name: 'Title'},
  {value: 'dateUp', name: 'New first'},
  {value: 'dateDown', name: 'Old first'},
];

const selectedSort = ref('');
watch(selectedSort, ( newValue) => {
  if(newValue === 'title') {
    boardStore.boards.sort((a, b) => {
      return a[newValue]?.localeCompare(b[newValue])
    })
  }
  if(newValue === 'dateUp') {
    boardStore.boards.sort((a, b) => {
      return a.date - b.date
    })
  }
  if(newValue === 'dateDown') {
    boardStore.boards.sort((a, b) => {
      return b.date - a.date
    })
  }
})

const filteredBoards = computed(() => {
  if(activeChecked.value) {
    return boardStore.boards.filter(board => board.isActive)
  }
  if(finishedChecked.value) {
    return boardStore.boards.filter(board => !board.isActive)
  }
  return boardStore.boards;
})

const searchedBoards = computed(() => {
  return filteredBoards.value.filter(board => board.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const showModal = () => {
  modalVisible.value = true;
}

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
    members: [],
  }
  boardStore.addBoard(newBoard);

  const user = userStore.users.find(user => user.id === userStore.currentUser.id);
  user.boards = [...user.boards, newBoard.id];
  userStore.currentUser.boards = [...user.boards];
  messageVisible.value = true;
  setTimeout(() => {
    modalVisible.value = false;
  }, 1000);
  title.value = '';
}

</script>

<style scoped>
.board-items {
  display: flex;
  flex-wrap: wrap;
}

.board-header {
  display: flex;
  margin-bottom: 20px;
}

.search-input {
  width: 270px;
  margin-right: 20px;
  height: 20px;
}

.board-filters {
  display: flex;
  width: 300px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.filter-item {
  margin-left: 20px;
}

.new-board-button {
  margin-left: auto;
}

.new-board-form {
  display: flex;
  width: 400px;
  flex-direction: column;
}
</style>
