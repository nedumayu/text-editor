<template>
  <div class="py-4 px-10 grid grid-cols-[320px_1fr] gap-24">
    <div class="bg-base-100 p-8 flex flex-col rounded-xl">
      <div v-if="isEdit">
        <div class="mb-4">
          <img src="../assets/profile-Icon.png" class="w-full h-full rounded-xl bg-white mx-auto mb-4" alt="Аватар"/>
          <Label>username</Label>
          <Input class="w-full mb-3 bg-white" v-model="username" v-focus/>
          <Label>e-mail</Label>
          <Input class="w-full mb-3 bg-white" v-model="email"/>
        </div>
        <div class="flex flex-col mb-0">
          <Button @click="saveEdit" class="btn-active btn-secondary mb-2">Save</Button>
          <Button @click="isEdit = false">Cancel</Button>
          <Button @click="deleteUser" class="delete-button btn-active btn-accent mt-10">Delete profile</Button>
        </div>
      </div>

      <div v-if="!isEdit && !isLoading">
        <div class="mb-4 h-50">
          <img src="../assets/profile-Icon.png" class="w-full h-full rounded-xl bg-white mx-auto mb-4 opacity-50" alt="Аватар"/>
          <h3 class="mb-2 font-bold text-lg uppercase">{{ userStore.currentUser.username }}</h3>
          <div>{{ userStore.currentUser.email }}</div>
        </div>
        <div class="flex flex-col">
          <Button @click="isEdit = true" class="mb-2">Edit info</Button>
          <Button @click="logout">Log out</Button>
        </div>
      </div>
    </div>
    <div v-if="!isLoading && userStore.currentUser.boards.length > 0">
      <div class="flex justify-between">
        <div class="flex flex-wrap mb-2">
          <Input
              v-model="searchQuery"
              class="w-64 mr-4 mb-2"
              placeholder="Search..."
          />
          <!--      <Search :filteredElements="filteredElements" @setSearch="setSearch"/>-->
          <Sort :boards="userStore.currentUser.boards"/>
          <Filter :boards="userStore.currentUser.boards" @on-change-filter="setFilteredElements"/>
        </div>
        <AddBoardModal/>
      </div>

      <div class="flex flex-wrap">
        <Board
            v-for="board of searchedElements"
            :key="board.id"
            :board="board"
        />
      </div>
    </div>
    <div v-else>
      <div v-if="!isLoading">
        <AddBoardModal/>
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
import {ref} from "vue";
import Sort from "../components/Sort.vue";
import Filter from "../components/Filter.vue";
import AddBoardModal from "../components/AddBoardModal.vue";
import {useSearching} from "../hooks/useSearching.js";

const userStore = useUserStore();
const boardStore = useBoardStore();
const router = useRouter();

const isEdit = ref(false)
const isLoading = ref(false)

const filteredElements = ref(userStore.currentUser.boards)
const setFilteredElements = (f) => {
  filteredElements.value = f
}
const {searchQuery, searchedElements} = useSearching(filteredElements, 'title');

const username = ref(userStore.currentUser.username)
const email = ref(userStore.currentUser.email)

const saveEdit = () => {
  isLoading.value = true
  const newUser = {
    _id: userStore.currentUser.id,
    username: username.value,
    email: email.value
  }
  userStore.updateUser(newUser)
  userStore.currentUser.username = username.value
  userStore.currentUser.email = email.value
  boardStore.boards.forEach(board => {
    if (board.author.id === userStore.currentUser.id) {
      board.author.username = username.value
    }
  })
  isEdit.value = false
  isLoading.value = false
}

const logout = async () => {
  isLoading.value = true
  await userStore.logout()
  userStore.users = []
  boardStore.boards = []
  await router.push('/')
  isLoading.value = false
}

const deleteUser = async () => {
  await userStore.deleteUser(userStore.currentUser.id)
  await logout()
}
</script>

<style scoped>

</style>
