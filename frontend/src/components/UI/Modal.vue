<template>
  <div class="modal-background" v-if="show" @click.stop="hideModal">
    <div @click.stop class="modal-content">
      <slot></slot>
    </div>
  </div>
<!--  <div>-->
<!--    <input type="checkbox" id="my-modal" class="modal-toggle" />-->
<!--    <label for="my-modal" class="modal cursor-pointer">-->
<!--      <label class="modal-box relative" for="">-->
<!--        <label for="my-modal" class="btn btn-sm btn-circle absolute right-2 top-2" >✕</label>-->
<!--        <slot></slot>-->
<!--      </label>-->
<!--    </label>-->
<!--  </div>-->
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    hideModal() {
      this.$emit('update:show', false);
    }
  }
}
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 1;
}

.modal-content {
  margin: auto;
  background: white;
  border-radius: 12px;
  min-width: 300px;
  min-height: 50px;
  padding: 30px;
  z-index: 2;
}

</style>
