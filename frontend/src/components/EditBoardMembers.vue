<template>
  <div>
    <div class="flex flex-wrap mb-3 space-x-2">
      <div
          class="flex justify-between items-center border border-primary p-1 rounded-xl cursor-pointer"
          v-for="member of boardMembers"
          :key="member.id"
      >
        <div class="mr-2">{{ member.username }}</div>
        <div
            class="w-5 h-5 bg-primary text-white rounded-full flex justify-center items-center pb-0.5 hover:bg-secondary-focus"
            @click="deleteMember(member.id)">
          ×
        </div>
      </div>
    </div>

    <Input
        v-model="searchQuery"
        class="w-full bg-base-200"
        placeholder="Start typing username..."
        v-if="members.length > 0"
    />

    <div
        v-if="members.length > 0"
        class="bg-base-200 h-32 rounded-xl border-t-0 mb-7 overflow-hidden overflow-y-scroll p-1 mt-3 text-primary"
    >
      <div
          class="border-b border-white rounded-md h-10 px-3 py-2 flex justify-between hover:bg-secondary-focus cursor-pointer"
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
    <div v-else class="h-5"></div>

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
const emit = defineEmits(['setMembers'])

const addMemberToBoard = (id) => {
  const user = userStore.users.find(user => user.id === id);
  boardMembers.value.push({
    id: user.id,
    username: user.username,
    email: user.email
  });
  members.value = members.value.filter(member => member.id !== id);
  emit('setMembers', [members.value, boardMembers.value])
}

const deleteMember = (id) => {
  members.value.push({
    id: id,
    username: userStore.users.find(user => user.id === id).username,
    email: userStore.users.find(user => user.id === id).email
  });
  boardMembers.value = boardMembers.value.filter(member => member.id !== id);
  emit('setMembers', [members.value, boardMembers.value])
}

const {searchQuery, searchedElements} = useSearching(members, 'username');

</script>

<style scoped>

</style>