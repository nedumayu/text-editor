import {defineStore} from "pinia";

export const useChangesStore = defineStore('changesStore', {
    state: () => ({
        changes: [
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
        ]
    }),
    actions: {
        addChange(change) {
            this.changes.push(change);
        }
    }
})
