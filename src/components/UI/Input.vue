<template>
  <input
      :value="modelValue"
      @input="updateInput"
      class="input"
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
.input {
  border: 1px solid black;
  padding: 8px 15px;
  font-size: 15px;
}
</style>
