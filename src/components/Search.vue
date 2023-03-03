<template>
  <Input
      v-model="searchQuery"
      class="search-input"
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
.search-input {
  width: 270px;
  margin-right: 20px;
  height: 40px;
}
</style>