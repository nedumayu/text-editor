<template>
  <div class="grid grid-cols-[1fr_500px] gap-4 mb-5" v-if="!isLoading">
    <Editor :board="boardStore.currentBoard"/>
    <div class="bg-base-100 p-7 rounded-xl text-primary-focus">
      <div class="flex justify-between items-start" v-if="isCommitMode">
        <h3 class="mb-4 text-2xl text-bold" v-if="!isEdit">
          {{ boardStore.currentBoard.title }}
        </h3>
        <div v-else>
          <Label>title</Label>
          <Input v-model="title" v-focus class="mb-5 bg-white"/>
        </div>
        <div class="flex"
            v-if="boardStore.currentBoard.author.id === userStore.currentUser.id"
        >
          <button class="w-7 h-7 text-accent-content border border-current bg-transparent rounded-md p-1 mr-1 cursor-pointer hover:text-base-100 hover:bg-accent-content"
                  @click="isEdit = !isEdit"
                  title="Edit board"
          >
            <svg class="remix w-full h-full fill-current">
              <use :xlink:href="`${remixiconUrl}#ri-pencil-line`"/>
            </svg>
          </button>
          <button class="w-7 h-7 text-accent-content border border-current bg-transparent rounded-md p-1 mr-1 cursor-pointer hover:text-base-100 hover:bg-accent-content"
                  @click="deleteBoard"
                  title="Delete board"
          >
            <svg class="remix w-full h-full fill-current">
              <use :xlink:href="`${remixiconUrl}#ri-delete-bin-line`"/>
            </svg>
          </button>
        </div>
      </div>

      <div v-if="isEdit">
        <Label>status</Label>
        <div class="flex mb-5 space-x-3">
          <div class="grid grid-cols-[1fr_2fr] gap-1 content-center">
            <input type="radio" class="radio radio-primary" id="active" v-model="isActive" :value="true">
            <label for="active">Active</label>
          </div>
          <div class="grid grid-cols-[1fr_2fr] gap-1 content-center">
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

        <div class="flex space-x-4">
          <Button @click="saveEdit">Save</Button>
          <Button @click="cancel">Cancel</Button>
        </div>
      </div>

      <div v-else>
        <div v-if="isCommitMode">
          Author: {{ boardStore.currentBoard.author.username }}
        </div>
        <div class="text-base-300" v-if="isCommitMode">
          {{ transformDate(boardStore.currentBoard.date) }}
        </div>
        <BoardMembers
            :members="boardStore.currentBoard.members"
            v-if="boardStore.currentBoard.members.length > 0 && isCommitMode"
            class="mb-8"
        />
        <Commits
            :changes="boardStore.currentBoard.changes"
            v-if="boardStore.currentBoard.changes.length > 0 "
            @set-mode="setMode"
        />
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
import {onBeforeUnmount, onMounted, ref} from "vue";
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
const isCommitMode = ref(true)

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

const setMode = (mode) => {
  isCommitMode.value = mode
}

const deleteBoard = async () => {
  await boardStore.deleteBoard(route.params.id)
  boardStore.boards = boardStore.boards.filter(board => board.id !== route.params.id)
  userStore.currentUser.boards = userStore.currentUser.boards.filter(board => board.id !== route.params.id)
  await router.push('/profile')
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
  boardMembers.value = boardStore.currentBoard.members
  members.value = userStore.users.filter(member => member.id !== userStore.currentUser.id)
  boardMembers.value.forEach(b => {
    members.value = members.value.filter(member => member.id !== b.id)
  })
  isEdit.value = false;
}

</script>

<style scoped>

</style>
