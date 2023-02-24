<template>
  <div>
    <form class="register-form">
      <h1>Вход в приложение</h1>
      <Input class="login-input" v-model="email" :type="textType" placeholder="E-mail"/>
      <Input class="login-input" v-model="password" :type="passType" placeholder="Пароль"/>
      <Button @click="login">Войти</Button>
    </form>
    <Toast :show="messageVisible">
      {{ message }}
    </Toast>
  </div>
</template>

<script setup>
import {useUserStore} from '../stores/UserStore.js'
import {useRouter} from 'vue-router'

import {ref} from 'vue'

const router = useRouter();

const textType = "text";
const passType = "password";

const email = ref('');
const password = ref('');
const message = ref('');
const messageVisible = ref(false);
const userStore = useUserStore()

const login = () => {
  if (userStore.users.find(user => user.email === email.value)) {
    if (userStore.users.find(user => user.password === password.value)) {
      userStore.currentUser = {
        id: userStore.users.find(user => user.email === email.value).id,
        username: userStore.users.find(user => user.email === email.value).username,
        email: email.value,
        boards: userStore.users.find(user => user.email === email.value).boards,
      }
      userStore.isAuth = true;
      showMessage('Вы вошли!')
      setTimeout(() => {
        router.push('/profile');
      }, 1000);

    } else {
      showMessage('Неверный пароль!')
    }
  } else {
    showMessage('Неверный E-mail!')
  }
}

const showMessage = (msg) => {
  message.value = msg;
  messageVisible.value = true;
  setTimeout(() => {
    messageVisible.value = false;
  }, 2000);
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
