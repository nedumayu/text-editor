<template>
  <div class="board" v-if="!isLoading">
    <Editor :board="boardStore.currentBoard"/>

    <div class="board-info">
      <div class="board-header">
        <h1>BOARD #{{ boardStore.currentBoard.id.slice(20,25) }}</h1>
        <div
            class="board-buttons"
            v-if="boardStore.currentBoard.author.id === userStore.currentUser.id"
        >
          <button class="menu-item" @click="isEdit = true" title="Edit board">
            <svg class="remix">
              <use :xlink:href="`${remixiconUrl}#ri-pencil-line`"/>
            </svg>
          </button>
          <button class="menu-item" @click="deleteBoard" title="Delete board">
            <svg class="remix">
              <use :xlink:href="`${remixiconUrl}#ri-delete-bin-line`"/>
            </svg>
          </button>
        </div>
      </div>

      <div v-if="isEdit">
        <Label>title</Label>
        <Input v-model="title" v-focus style="margin-bottom: 20px"/>

        <Label>status</Label>
        <div class="edit-status">
          <div class="status-item">
            <input type="radio" class="radio radio-primary" id="active" v-model="isActive" :value="true">
            <label for="active">Active</label>
          </div>
          <div class="status-item">
            <input type="radio" class="radio radio-primary" id="finished" v-model="isActive" :value="false">
            <label for="finished">Finished</label>
          </div>
        </div>

        <Label>members</Label>
        <EditBoardMembers
            :members="members"
            :board-members="boardMembers"
            @setMembers="setMembers"
        />

        <div class="profile-menu">
          <Button @click="saveEdit" style="margin-right: 10px">Save</Button>
          <Button @click="cancel">Cancel</Button>
        </div>
      </div>

      <div v-else>
        <h3 style="margin-bottom: 20px">
          {{ boardStore.currentBoard.title }}
        </h3>
        <div>
          Author: {{ boardStore.currentBoard.author.username }}
        </div>
        <div class="board-date">
          {{ transformDate(boardStore.currentBoard.date) }}
        </div>
        <BoardMembers :members="boardStore.currentBoard.members" v-if="boardStore.currentBoard.members.length > 0"/>
        <Commits :changes="boardStore.currentBoard.changes" v-if="boardStore.currentBoard.changes.length > 0"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useBoardStore} from "../stores/BoardStore.js";
import Editor from "../components/Editor.vue";
import {useRoute, useRouter} from 'vue-router'
import {useUserStore} from "../stores/UserStore.js";
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import {onMounted, ref} from "vue";
import BoardMembers from "../components/BoardMembers.vue";
import Commits from "../components/Commits.vue";
import EditBoardMembers from "../components/EditBoardMembers.vue";
import transformDate from "../utils/transformDate.js";

const boardStore = useBoardStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const isEdit = ref(false)
const isLoading = ref(true)

const boardMembers = ref([])
const members = ref([])

const title = ref("");
const isActive = ref("");

onMounted(async () => {
  await boardStore.getBoardById(route.params.id)
  boardMembers.value = boardStore.currentBoard.members
  members.value = userStore.users.filter(member => member.id !== userStore.currentUser.id)
  boardMembers.value.forEach(b => {
    members.value = members.value.filter(member => member.id !== b.id)
  })
  title.value = boardStore.currentBoard.title
  isActive.value = boardStore.currentBoard.isActive
  isLoading.value = false
})

const setMembers = ([m, b]) => {
  members.value = m;
  boardMembers.value = b;
}

const deleteBoard = async () => {
  await boardStore.deleteBoard(route.params.id)
  boardStore.boards = boardStore.boards.filter(board => board.id !== route.params.id)
  userStore.currentUser.boards = userStore.currentUser.boards.filter(board => board.id !== route.params.id)
  router.go(-1);
}

const saveEdit = async () => {
  isLoading.value = true
  const memberIds = boardMembers.value.map(member => member.id)
  const updatedBoard = {
    title: title.value,
    isActive: isActive.value,
    members: memberIds,
    content: boardStore.currentBoard.content
  }
  const newBoard = await boardStore.updateBoard(route.params.id, updatedBoard)
  boardStore.currentBoard = newBoard
  if(boardStore.boards.length !== 0){
    const board = boardStore.boards.find(bd => bd.id === newBoard.id)
    board.title = newBoard.title
    board.isActive = newBoard.isActive
    board.members = newBoard.members
    board.content = newBoard.content
    board.date = newBoard.date
  }
  const userBoard = userStore.currentUser.boards.find(board => board.id === newBoard.id)
  userBoard.title = newBoard.title
  userBoard.isActive = newBoard.isActive
  userBoard.members = newBoard.members
  userBoard.content = newBoard.content
  userBoard.date = newBoard.date

  isEdit.value = false;
  isLoading.value = false
}

const cancel = () => {
  title.value = boardStore.currentBoard.title;
  isActive.value = boardStore.currentBoard.isActive;
  boardMembers.value = boardStore.currentBoard.members;
  members.value = userStore.users.filter(member => member.id !== userStore.currentUser.id);
  boardMembers.value.forEach(b => {
    members.value = members.value.filter(member => member.id !== b.id)
  })
  isEdit.value = false;
}

</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.board-header h1 {
  margin-bottom: 20px;
  max-width: 300px
}

.board-buttons {
  display: flex;
}

.menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: #0D0D0D;
  border: 1px solid black;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
  cursor: pointer;
}

.menu-item svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.menu-item:hover {
  color: #FFF;
  background-color: #0D0D0D;
}

.board-info {
  box-sizing: border-box;
  border: 1px solid black;
  height: 80.5vh;
  padding: 20px;
  border-radius: 0.75rem;
}

.profile-menu {
  display: flex;
}

.board-date {
  color: rgba(0, 0, 0, 0.43);
}

.edit-status {
  display: flex;
  margin-bottom: 20px;
}

.status-item {
  margin-right: 10px;
}
</style>
