import {computed, ref} from "vue";

export function useFiltering(elements) {
    const activeChecked = ref(false);
    const finishedChecked = ref(false);
    const filteredElements = computed(() => {
        if(activeChecked.value) {
            return elements.filter(el => el.isActive)
        }
        if(finishedChecked.value) {
            return elements.filter(el => !el.isActive)
        }
        return elements;
    })
    return {
        activeChecked,
        finishedChecked,
        filteredElements
    }
}