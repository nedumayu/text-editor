import {computed, ref} from "vue";

export function useSearching(elements, searchBy) {
    const searchQuery = ref('');
    const searchedElements = computed(() => {
        return elements.value.filter(el => el[searchBy].toLowerCase().includes(searchQuery.value.toLowerCase()))
    })
    return {
        searchQuery,
        searchedElements
    }
}