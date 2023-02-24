import {ref, watch} from "vue";

export function useSorting(elements) {
    const selectedSort = ref('');
    watch(selectedSort, ( newValue) => {
        if(newValue === 'title') {
            elements.sort((a, b) => {
                return a[newValue]?.localeCompare(b[newValue])
            })
        }
        if(newValue === 'dateDown') {
            elements.sort((a, b) => {
                return a.date - b.date
            })
        }
        if(newValue === 'dateUp') {
            elements.sort((a, b) => {
                return b.date - a.date
            })
        }
    })
    return {
        selectedSort,
    }
}