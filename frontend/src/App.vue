<template>
  <div>
    <div v-if="userStore.loading"></div>
    <div v-else>
      <Navbar/>
      <div class="main">
        <router-view v-slot=" {Component} ">
          <transition name="fade" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import {useUserStore} from "./stores/UserStore.js";
const userStore = useUserStore()
</script>

<style scoped>
.main {
  margin: 0 30px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease-out;
}
.fade-enter-from, .fade-leave-to  {
  opacity: 0;
}
</style>
