<template>
  <div class="w-full shadow-lg">
    <div class="navbar mx-auto w-11/12 mb-10 uppercase">
      <div @click="$router.push('/')" class="text-xl mr-4 w-48 cursor-pointer hover:opacity-70 font-[fleuronregular]">
        [ BoardStorm ]
      </div>
      <div class="flex w-full justify-between ">
        <router-link to="/boards">Boards</router-link>
        <router-link to="/profile" v-if="userStore.isAuth">Profile</router-link>
        <div v-else class="space-x-4">
          <router-link to="/register">Sign up</router-link>
          <router-link to="/login">Sign in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from '../stores/UserStore.js'

const userStore = useUserStore();
</script>

<style scoped>
a:hover,
a.router-link-active {
  border-bottom: 1px solid black;
}
</style>
