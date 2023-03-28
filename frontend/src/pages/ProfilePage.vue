<template>
  <div class="profile">
    <div class="profile-content">
      <div v-if="isEdit">
        <div class="profile-info">
          <div>
            <img src="../assets/profile-Icon.png" class="profile-avatar" alt="Аватар"/>
          </div>
          <Label>username</Label>
          <Input class="edit-input" v-model="username" v-focus/>
          <Label>e-mail</Label>
          <Input class="edit-input" v-model="email"/>
        </div>
        <div class="profile-menu">
          <Button @click="saveEdit" style="margin-bottom: 10px">Save</Button>
          <Button @click="isEdit = false">Cancel</Button>
          <Button @click="deleteUser" class="delete-button">Delete profile</Button>
        </div>
      </div>

      <div v-if="!isEdit && !isLoading">
        <div class="profile-info">
          <div>
            <img src="../assets/profile-Icon.png" class="profile-avatar" alt="Аватар"/>
          </div>
          <h3>{{ userStore.currentUser.username }}</h3>
          <div>{{ userStore.currentUser.email }}</div>
        </div>
        <div class="profile-menu">
          <Button @click="isEdit = true" style="margin-bottom: 10px">Edit info</Button>
          <Button @click="logout">Log out</Button>
        </div>
      </div>
    </div>

    <div v-if="!isLoading && userStore.currentUser.boards.length > 0">
      <div class="boards-container">
        <div class="boards-header">
          <Input
              v-model="searchQuery"
              class="search-input"
              placeholder="Search..."
          />
          <!--      <Search :filteredElements="filteredElements" @setSearch="setSearch"/>-->
          <Sort :boards="userStore.currentUser.boards"/>
          <Filter :boards="userStore.currentUser.boards" @on-change-filter="setFilteredElements"/>
        </div>
        <AddBoardModal/>
      </div>
      <div class="profile-boards">
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
.profile {
  padding: 20px 40px;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 100px;
}

.profile-content {
  display: flex;
  flex-direction: column;
}

.profile-info {
  margin-bottom: 20px;
}

.profile-info h3 {
  margin-bottom: 10px;
}

.profile-menu {
  display: flex;
  flex-direction: column;
}

.profile-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid black;
  margin-bottom: 10px;
}

.profile-boards {
  display: flex;
  flex-wrap: wrap;
}

.edit-input {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 15px;
}

.boards-header {
  display: flex;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.search-input {
  width: 270px;
  margin-right: 20px;
  height: 40px;
  margin-bottom: 10px;
}

.boards-container {
  display: flex;
  justify-content: space-between;
}

.delete-button {
  border-color: red;
  color: red;
  margin-top: 40px;
}
</style>
