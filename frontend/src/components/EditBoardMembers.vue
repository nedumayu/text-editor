<template>
  <div @mousemove="emit('setMembers', [members, boardMembers])">
    <div class="members-list">
      <div class="members-item" v-for="member of boardMembers" :key="member.id">
        <div style="margin-right: 10px">{{ member.username }}</div>
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
          {{ user.username }}
        </div>
        <div>
          {{ user.email }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useSearching} from "../hooks/useSearching.js";
import {ref} from "vue";
import {useUserStore} from "../stores/UserStore.js";

const userStore = useUserStore();

const props = defineProps(['boardMembers', 'members'])
const members = ref(props.members)
const boardMembers = ref(props.boardMembers)

const addMemberToBoard = (id) => {
  const user = userStore.users.find(user => user.id === id);
  boardMembers.value.push({
    id: user.id,
    username: user.username,
    email: user.email
  });
  members.value = members.value.filter(member => member.id !== id);
}
const {searchQuery, searchedElements} = useSearching(members, 'username');

const deleteMember = (id) => {
  boardMembers.value = boardMembers.value.filter(member => member.id !== id);
  members.value.push({
    id: id,
    username: userStore.users.find(user => user.id === id).username,
    email: userStore.users.find(user => user.id === id).email
  });
}

const emit = defineEmits(['setMembers'])
</script>

<style scoped>
.board-members {
  height: 88px;
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
  flex-wrap: wrap;
}

.members-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  padding: 5px;
  border-radius: 15px;
  margin-right: 5px;
  margin-bottom: 5px;
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

.search-input {
  width: 100%;
}
</style>