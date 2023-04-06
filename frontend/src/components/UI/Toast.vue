<template>
  <div class="toast toast-top toast-end" v-if="show">
    <div class="alert alert-info">
      <slot></slot>
    </div>
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

</style>
