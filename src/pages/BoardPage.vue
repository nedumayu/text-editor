<template>
  <div class="board">
    <Editor :board="board"/>

    <div class="board-info">
      <div class="board-header">
        <h1>BOARD #{{ board.id }}</h1>
        <div
            class="board-buttons"
            v-if="condition"
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
          {{ board.title }}
        </h3>
        <div>
          Author: {{ board.author.username }}
        </div>
        <div class="board-date">
          {{ board.date.getDate() }}.{{ board.date.getMonth() + 1 }}.{{ board.date.getFullYear() }}
          {{ board.date.getHours() }}:{{ board.date.getMinutes() }}:{{ board.date.getSeconds() }}
        </div>
        <BoardMembers :members="board.members" v-if="board.members.length > 0"/>
        <Commits :board="board" v-if="changesStore.changes.filter(c => c.boardId === board.id).length > 0"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useBoardStore} from "../stores/BoardStore.js";
import Editor from "../components/Editor.vue";
import {useRoute, useRouter} from 'vue-router'
import {useChangesStore} from "../stores/ChangesStore";
import {useUserStore} from "../stores/UserStore";
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import {ref} from "vue";
import BoardMembers from "../components/BoardMembers.vue";
import Commits from "../components/Commits.vue";
import EditBoardMembers from "../components/EditBoardMembers.vue";

const boardStore = useBoardStore();
const changesStore = useChangesStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();
const board = boardStore.boards.find(b => b.id === Number(route.params.id));

const isEdit = ref(false);
const condition = !!(board.members.some(member => member.id === userStore.currentUser.id) || board.author.id === userStore.currentUser.id);

const title = ref(board.title);

const boardMembers = ref(board.members);

const members = ref(userStore.users.filter(member => member.id !== userStore.currentUser.id));
boardMembers.value.forEach(b => {
  members.value = members.value.filter(member => member.id !== b.id)
})

const setMembers = ([m, b]) => {
  members.value = m;
  boardMembers.value = b;
}

const deleteBoard = () => {
  boardStore.boards = boardStore.boards.filter(b => b.id !== board.id);
  const user = userStore.users.find(user => user.id === userStore.currentUser.id);
  user.boards =  user.boards.filter(b => b !== board.id);
  userStore.currentUser.boards = userStore.users.find(user => user.id === userStore.currentUser.id).boards;
  router.push('/boards');
}

const saveEdit = () => {
  board.title = title.value;
  board.members = boardMembers.value;
  isEdit.value = false;
}

const cancel = () => {
  boardMembers.value = board.members;
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

</style>
