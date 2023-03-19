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
            content: 'quia et suscipit',
        },
        {
            id: 1,
            boardId: 1,
            user: {
                id: 2,
                username: 'User'
            },
            date: new Date(),
            content: 'est rerum tempore vitae',
        },
        {
            id: 2,
            boardId: 2,
            user: {
                id: 3,
                username: 'Antonette'
            },
            date: new Date(),
            content: 'ullam et saepe reiciendis voluptatem adipisci',
        },
        {
            id: 3,
            boardId: 3,
            user: {
                id: 5,
                username: 'Karianne'
            },
            date: new Date(),
            content: 'repudiandae veniam quaerat sunt sed',
        },
        {
            id: 4,
            boardId: 4,
            user: {
                id: 1,
                username: 'Alice'
            },
            date: new Date(),
            content: 'ut aspernatur corporis harum nihil',
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
