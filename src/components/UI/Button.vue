<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button"
}
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  background: none;
  text-transform: uppercase;
  border: 1px solid black;
  cursor: pointer;
}
.btn:hover {
  background: rgba(232, 232, 232, 0.75);
  border-color: #8d8d8d;
}
</style>
