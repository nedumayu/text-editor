<template>
  <input
      :value="modelValue"
      @input="updateInput"
      class="input w-full"
      type={{$attrs.inputType}}
      />
</template>

<script>
export default {
  name: "Input",
  attrs: {
    inputType: {
      type: String,
      required: true,
    }
  },
  props: {
    modelValue: [String],
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
}

</script>

<style scoped>

</style>
