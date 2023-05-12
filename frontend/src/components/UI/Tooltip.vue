<template>
  <div class="absolute top-0 left-0 z-10 max-w-[250px] bg-secondary rounded-lg p-3 shadow-xl" >
    <slot></slot>
    <div class="absolute w-0 h-0 -ml-2.5 tooltip-arrow"></div>
  </div>
</template>

<script>
export default {
  name: "Tooltip"
}
</script>

<style scoped>
.tooltip-arrow {
  bottom: -10px;
  left: 50%;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid hsl(var(--s));
}
</style>