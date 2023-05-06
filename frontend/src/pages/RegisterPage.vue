<template>
  <div class="w-96 mx-auto">
    <h1 class="mb-8 font-thin text-center text-4xl text-primary">Welcome aboard</h1>
    <form class="flex flex-col mx-auto" @keyup.enter="createUser">
      <Input v-model="username" :type="textType" placeholder="Username"/>
      <Input v-model="email" :type="textType" placeholder="E-mail" class="mt-4"/>
      <Input v-model="password" :type="passType" placeholder="Password" class="mt-4"/>
      <Button @click="createUser" class="mt-7">Sign up</Button>
      <p class="text-neutral mt-2">
        Already with [boardStorm]?
        <router-link to="/login" class="text-primary underline underline-offset-4 ml-1 hover:text-secondary-focus">
          Sign in
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
import {ref} from 'vue'
import Toast from "../components/UI/Toast.vue";

const userStore = useUserStore()

const textType = "text";
const passType = "password";

const username = ref('');
const email = ref('');
const password = ref('');
const messageVisible = ref(false);
const message = ref('')

const createUser = async () => {
  const response = await userStore.registration(email.value, password.value, username.value)
  if (response) {
    showMessage("Вы зарегистрированы")
    username.value = '';
    email.value = '';
    password.value = '';
  } else {
    showMessage("Произошла ошибка")
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

</style>
