<template>
  <div class="wrapper grid grid-cols-[2fr_3fr] mx-20">
    <div class="flex flex-col justify-center h-[80vh]">
      <h1 class="text-[100px] leading-[105px] mb-5 font-[fleuronregular] text-primary-focus">
<!--        <span class="font-[fleurondingbats]">Q</span>-->
        <span ref="typing"></span> on a <br> virtual board!
      </h1>
      <p class="mb-5 text-xl">
        Collaborate on projects with other people from anywhere in the world! Create, edit and communicate on a
        whiteboard anytime.
      </p>
      <Button class="self-start btn-primary">
        <router-link to="/boards">
          get started
        </router-link>
      </Button>
    </div>
    <div class="w-full h-[80vh] flex justify-center">
      <lottie-animation
          ref="anim"
          :animationData="animation"
          :loop="true"
      >
      </lottie-animation>
    </div>
    <!--    -->
    <div class="icon" v-for="(icon, index) in icons" :key="index"
         :style="{ transform: `translate(${icon.left}px, ${icon.top}px) rotate(${icon.rotation}deg)` }">
      <img alt="icon" :src="icon.src"/>
    </div>
    <!--    -->
  </div>
</template>

<script setup>
import {LottieAnimation} from "lottie-web-vue";
import animation from '../assets/animation.json';
import atom from '../assets/objects/Atom_Tetra_2_0000.png'
import cube from '../assets/objects/Atom_Cube_2_0000.png'
import hex from '../assets/objects/Cone_Hex0003.png'
import capsule from '../assets/objects/Capsule_Laying_2_0001.png'
import torus from '../assets/objects/Torus_Standing_3__L Shadowless.png'
import platonic from '../assets/objects/Platonic_2_-_Dodeca_L Shadowless.png'
import {onMounted, ref} from 'vue';
import Typed from 'typed.js';

const typing = ref(null);

const icons = ref([
  {src: atom, left: 30, top: 30, rotation: 0},
  {src: cube, left: 800, top: 100, rotation: 0},
  {src: hex, left: 300, top: 100, rotation: 0},
  {src: capsule, left: 300, top: 600, rotation: 50},
  {src: torus, left: 1600, top: 600, rotation: 0},
  {src: platonic, left: 1600, top: 50, rotation: 0},
  {src: cube, left: 600, top: 400, rotation: 0},
  {src: atom, left: 1000, top: 600, rotation: 0},
  {src: platonic, left: 0, top: 700, rotation: 0},
]);

const moveIcons = () => {
  icons.value.forEach((icon) => {
    const newLeft = icon.left + Math.floor(Math.random() * 11) - 5;
    const newTop = icon.top + Math.floor(Math.random() * 11) - 5;
    const containerWidth = document.querySelector('.wrapper').offsetWidth;
    const containerHeight = document.querySelector('.wrapper').offsetHeight;
    icon.left = Math.max(0, Math.min(newLeft, containerWidth - 50));
    icon.top = Math.max(0, Math.min(newTop, containerHeight - 50));
    const newRotation = icon.rotation + Math.floor(Math.random() * 31) - 15
    icon.rotation = Math.max(-30, Math.min(newRotation, 30));
  })

  requestAnimationFrame(moveIcons)
}

onMounted(() => {
  moveIcons()
  new Typed(typing.value, {
    strings: ["Chat", "Work", "Collab"],
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 1500,
    loop: true
  });
})
</script>

<style scoped>
.wrapper {
  position: relative;
}

.icon {
  position: absolute;
  width: 100px;
  height: 100px;
  transition: transform  .5s ease-in;
  z-index: -1;
}
</style>
