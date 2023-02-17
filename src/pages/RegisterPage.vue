<template>
  <form v-if="!isRegistered" class="register-form">
      <h1>Регистрация</h1>
      <Input v-model="username" :type="textType" placeholder="Имя пользователя"/>
      <Input v-model="email" :type="textType" placeholder="E-mail"/>
      <Input v-model="password" :type="passType" placeholder="Пароль"/>
      <Button @click="createUser">Зарегистрироваться</Button>
  </form>
  <h1 v-else style="width: 500px; margin: auto">Вы зарегистрированы!</h1>
</template>

<script setup>
import {useUserStore} from '../stores/UserStore.js'
import {ref} from 'vue'

const textType = "text";
const passType = "password";

let username = ref('');
let email = ref('');
let password = ref('');
let isRegistered = ref(false);

const userStore = useUserStore()

const createUser = () => {
  const newUser = {
    id: Date.now(),
    username: username.value,
    email: email.value,
    password: password.value,
    boards: [],
  }
  userStore.addUser(newUser);
  username.value = '';
  email.value = '';
  password.value = '';
  isRegistered.value = true;
}
</script>

<style scoped>
.register-form {
  width: 350px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
</style>
