<template>
  <div class="label">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Label"
}
</script>

<style scoped>
.label {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>