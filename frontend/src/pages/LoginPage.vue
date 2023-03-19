<template>
  <div>
    <form class="register-form">
      <h1>Sign in to TextEditor</h1>
      <Input class="login-input" v-model="email" :type="textType" placeholder="E-mail"/>
      <Input class="login-input" v-model="password" :type="passType" placeholder="Password"/>
      <Button @click="login">Sign in</Button>
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
      router.push('/profile');
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
  margin: 50px auto;
  display: flex;
  flex-direction: column;
}

.register-form h1 {
  margin-bottom: 20px;
  text-align: center;
  font-weight: lighter;
}
</style>
