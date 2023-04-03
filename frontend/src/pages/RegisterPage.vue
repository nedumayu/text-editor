<template>
  <div>
    <form class="flex flex-col w-96 my-12 mx-auto space-y-4">
      <h1 class="mb-4 font-thin text-center text-4xl text-primary">Welcome aboard</h1>
      <Input v-model="username" :type="textType" placeholder="Username"/>
      <Input v-model="email" :type="textType" placeholder="E-mail"/>
      <Input v-model="password" :type="passType" placeholder="Password"/>
      <Button @click="createUser">Sign up</Button>
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
