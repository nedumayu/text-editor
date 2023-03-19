<template>
  <div class="main-container">
    <div class="main-content">
      <h1 class="main-title">[TextEditor] is a multi-user text editor for teamwork</h1>
      <lottie-animation
          ref="anim"
          :animationData="animation"
          :loop="true"
          class="main-animation">
      </lottie-animation>
    </div>
  </div>
</template>

<script setup>
import {LottieAnimation} from "lottie-web-vue";
import animation from '../assets/animation.json';
</script>

<style scoped>
.main-container {
  width: 100%;
  margin: auto 30px;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.main-title {
  display: flex;
  align-items: center;
  max-width: 500px;
  font-weight: lighter;
  font-size: 40px;
  font-family: 'JetBrainsMono', monospace;
}

.main-animation {
  max-width: 900px;
  height: 80vh;
}

</style>
