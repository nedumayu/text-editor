<template>
  <div class="toast" v-if="show">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 70px;
  right: 0;
  width: 200px;
  background: rgba(13, 13, 13, 0.87);
  color: white;
  padding: 20px;
}
</style>
