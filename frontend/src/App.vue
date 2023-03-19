<template>
  <div>
    <Navbar/>
    <div class="main">
      <router-view v-slot=" {Component} ">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";

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
