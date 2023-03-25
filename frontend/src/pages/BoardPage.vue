<template>
  <div class="board">
    <!--    <Editor :board="board"/>-->

    <div class="board-info" v-if="!isLoading">
      <div class="board-header">
        <h1>BOARD #{{ boardStore.currentBoard.id }}</h1>
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
            <input type="radio" id="active" v-model="isActive" :value="true">
            <label for="active">Active</label>
          </div>
          <div class="status-item">
            <input type="radio" id="finished" v-model="isActive" :value="false">
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
        <!--        <Commits :board="board" v-if="changesStore.changes.filter(c => c.boardId === board.id).length > 0"/>-->
      </div>
    </div>
  </div>
</template>

<script setup>
import {useBoardStore} from "../stores/BoardStore.js";
import Editor from "../components/Editor.vue";
import {useRoute, useRouter} from 'vue-router'
import {useChangesStore} from "../stores/ChangesStore.js";
import {useUserStore} from "../stores/UserStore.js";
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import {onMounted, ref} from "vue";
import BoardMembers from "../components/BoardMembers.vue";
import Commits from "../components/Commits.vue";
import EditBoardMembers from "../components/EditBoardMembers.vue";
import transformDate from "../utils/transformDate.js";

const boardStore = useBoardStore();
const changesStore = useChangesStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const isEdit = ref(false)
const isLoading = ref(true)

// const board = ref({})
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
  isLoading.value = true
  await boardStore.deleteBoard(route.params.id)
  await userStore.checkAuth()
  router.go(-1);
  isLoading.value = false
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
  await boardStore.updateBoard(route.params.id, updatedBoard)
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
