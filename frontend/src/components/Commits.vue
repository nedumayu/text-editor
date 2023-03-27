<template>
  <div class="changes-container">
    <h4 class="changes-title">COMMITS:</h4>
    <div class="changes-list">
      <div
          v-for="change in changes"
          :key="change.id"
          class="changes-item"
      >
        <strong class="change-user">
          {{ change.user.username }}
        </strong>
        <div class="change-date">
          {{ transformDate(change.date)}}
        </div>
        <div class="change-content" :title="`${change.content}`">{{ change.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import transformDate from "../utils/transformDate.js";

const props = defineProps({
  changes: {
    type: Array,
    required: true,
    default: () => {
    }
  }
})

</script>

<style scoped>
.changes-container {
  margin-top: 30px
}

.changes-title {
  margin-bottom: 10px
}

.changes-list {
  display: flex;
  flex-direction: column;
}

.changes-item {
  display: flex;
  background: rgba(215, 215, 215, 0.4);
  /*border: 1px solid black;*/
  border-radius: 20px;
  padding: 5px 10px;
  margin-bottom: 5px;
}

.change-user, .change-date {
  margin-right: 20px;
}

.change-content {
  white-space: nowrap;
  overflow: hidden;
  max-width: 200px;
  text-overflow: ellipsis;
}
</style>