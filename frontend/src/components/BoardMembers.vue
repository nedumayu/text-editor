<template>
  <div class="members-container">
    <div class="board-members">
      <div class="board-member" v-for="member of members" :key="member.id">
        {{ member.username }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  members: {
    type: Object,
    required: true,
    default: () => {
    }
  }
})
</script>

<style scoped>
.board-members {
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
}

.board-member {
  background: white;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  cursor: default;
}

.board-member:hover {
  outline: 1px solid #b7b7b7;
  background: white;
  color: gray;
}

.members-container {
  margin-top: 20px;
}
</style>