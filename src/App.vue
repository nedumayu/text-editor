<template>
  <div>
    <Navbar />
    <div class="main">
      <router-view></router-view>
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
</style>
