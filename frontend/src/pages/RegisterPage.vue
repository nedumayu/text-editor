<template>
  <div>
    <form class="register-form">
      <h1>Welcome aboard</h1>
      <Input class="login-input" v-model="username" :type="textType" placeholder="Username"/>
      <Input class="login-input" v-model="email" :type="textType" placeholder="E-mail"/>
      <Input class="login-input" v-model="password" :type="passType" placeholder="Password"/>
      <Button @click="createUser">Sign up</Button>
    </form>
    <Toast :show="messageVisible">
      {{ userStore.message }}
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

const createUser = () => {
  userStore.registration(email.value, password.value, username.value)
  // messageVisible.value = true;
  // setTimeout(() => {
  //   messageVisible.value = false;
  // }, 3000);
  // username.value = '';
  // email.value = '';
  // password.value = '';

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
