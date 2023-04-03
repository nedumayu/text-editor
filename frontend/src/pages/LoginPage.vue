<template>
  <div>
    <form class="flex flex-col w-96 my-12 mx-auto space-y-4">
      <h1 class="mb-4 font-thin text-center text-4xl text-primary">Sign in to [<span class="text-secondary-focus">textEditor</span>]</h1>
      <Input v-model="email" :type="textType" placeholder="E-mail"/>
      <Input v-model="password" :type="passType" placeholder="Password"/>
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

const login = async () => {
  await userStore.login(email.value, password.value)
  await router.push({path: '/profile'})
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
