<template>
  <div class="w-96 mx-auto">
    <h1 class="font-thin text-center text-4xl text-primary mb-8">Sign in to <span class="text-secondary-focus">[boardStorm]</span></h1>
    <form class="flex flex-col mx-auto" @keyup.enter="login">
      <Input v-model="email" :type="textType" placeholder="E-mail"/>
      <Input v-model="password" :type="passType" placeholder="Password" class="mt-4"/>
      <Button @click="login" class="mt-7">Sign in</Button>
      <p class="text-neutral mt-2">
        New to [boardStorm]?
        <router-link to="/register" class="text-primary underline underline-offset-4 ml-1 hover:text-secondary-focus">
          Create an account
        </router-link>
      </p>
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

const login = async () => {
  if (email.value === '' || password.value === '') {
    showMessage('Не все поля заполнены')
  } else {
    const response = await userStore.login(email.value, password.value)
    console.log(response)
    if (response.message === "Пользователь не зарегистрирован") {
      showMessage(response.message)
    }
    if (response.message === "Неверный пароль") {
      showMessage(response.message)
    }
    if (response.status === 200) {
      await router.push({path: '/profile'})
    }
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

.login-input {
  margin-bottom: 15px;
}
</style>
