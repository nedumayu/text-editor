import {defineStore} from "pinia";
import {ref} from "vue";

export const useChangesStore = defineStore('changesStore', () => {

    const changes = ref([
        {
            id: 0,
            boardId: 0,
            user: {
                id: 1,
                username: 'Alice'
            },
            date: new Date(),
            content: 'Edit this string',
        },
        {
            id: 1,
            boardId: 1,
            user: {
                id: 2,
                username: 'User'
            },
            date: new Date(),
            content: 'Edit this string with some tools',
        }
    ]);

    const addChange = (change) => {
        changes.value.push(change);
    }

    return {
        changes,
        addChange
    }
})
