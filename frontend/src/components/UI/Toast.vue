<template>
  <div class="toast toast-top toast-end " v-if="show">
    <div class="alert bg-secondary-focus max-w-[300px] shadow-xl">
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
