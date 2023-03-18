<template>
  <div class="navbar">
    <div @click="$router.push('/')" class="logo">
      [Text Editor]
    </div>
    <div class="navbar-buttons">
      <router-link to="/boards" class="menu-item">Boards</router-link>
      <router-link to="/profile" class="menu-item" v-if="userStore.isAuth">Profile</router-link>
      <div v-else>
        <router-link to="/register" class="menu-item">Sign up</router-link>
        <router-link to="/login">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from '../stores/UserStore.js'
const userStore = useUserStore();
</script>

<style scoped>
.navbar {
  height: 60px;
  box-shadow: 2px 0 5px 2px #c2c2c2;
  display: flex;
  text-transform: uppercase;
  padding: 0 30px;
  margin-bottom: 30px;
  align-items: center;
}

.navbar-buttons {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.logo {
  font-weight: bold;
  margin-right: 20px;
  width: 130px;
  cursor: pointer;
}

.logo:hover {
  opacity: 0.7;
}

.menu-item {
  margin-right: 20px;
}

a {
  text-decoration: none;
  color: black;
}

a:hover,
a.router-link-active {
  border-bottom: 1px solid black;
}
</style>
