<template>
  <form class="register-form" v-if="!isLogin">
    <h1>Вход в приложение</h1>
    <Input v-model="email" :type="textType" placeholder="E-mail"/>
    <Input v-model="password" :type="passType" placeholder="Пароль"/>
    <Button @click="login">Войти</Button>
    <div class="message">{{ message }}</div>
  </form>
  <h1 v-else style="width: 300px; margin: auto">{{ message }}</h1>
</template>

<script setup>
import {useUserStore} from '../stores/UserStore.js'
import {useRouter} from 'vue-router'

import {ref} from 'vue'

const router = useRouter();

const textType = "text";
const passType = "password";

let email = ref('');
let password = ref('');
let message = ref('');
let isLogin = ref(false);
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
      message.value = 'Вы вошли!';
      isLogin.value = true;
      router.push('/profile');
    } else {
      message.value = "Неверный пароль!";
    }
  } else {
    message.value = 'Неверный E-mail!'

  }


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
