<template>
  <Input
      v-model="searchQuery"
      class="w-64 mr-5 h-10"
      placeholder="Search..."
      @input="emit('setSearch', searchedElements)"
  />
</template>

<script setup>
import {useSearching} from "../hooks/useSearching.js";
import {ref} from "vue";

const props = defineProps({
  filteredElements: {
    type: Object
  }
})

const {searchQuery, searchedElements} = useSearching(ref(props.filteredElements), 'title');
const emit = defineEmits(['setSearch'])
</script>

<style scoped>

</style>