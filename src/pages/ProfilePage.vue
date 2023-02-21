<template>
  <div>
    <h1>This is profile here</h1>
    <div class="profile">
      <div>Имя пользователя: {{ userStore.currentUser.username }}</div>
      <div>E-mail: {{ userStore.currentUser.email }}</div>
      <div>Доски: {{ userStore.currentUser.boards }}</div>
    </div>
    <Button @click="logout">Выйти</Button>
  </div>
</template>

<script setup>
import {useUserStore} from '../stores/UserStore.js'
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const logout = () => {
  userStore.isAuth = false;
  userStore.currentUser = {};

  router.push('/');
}
</script>

<style scoped>

</style>
