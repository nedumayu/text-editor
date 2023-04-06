<template>
  <div class="grid grid-cols-[1fr_2fr]">
    <h1 class="flex items-center text-[40px] font-mono font-thin"
    >
      [TextEditor] is a multi-user text editor for teamwork
    </h1>
    <lottie-animation
        ref="anim"
        :animationData="animation"
        :loop="true"
        class="max-w-4xl h-[80vh]">
    </lottie-animation>
  </div>
</template>

<script setup>
import {LottieAnimation} from "lottie-web-vue";
import animation from '../assets/animation.json';
</script>

<style scoped>

</style>
