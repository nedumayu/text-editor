import {defineStore} from "pinia";


export const useBoardStore = defineStore('boardStore', {
    state: () => ({
        boards: [
            {
                id: 0,
                title: 'First note is here',
                date: new Date(),
                content: 'Edit this string',
                isActive: false,
                author: {
                    id: 1,
                    username: 'Alice'
                },
                members: [{
                    id: 2,
                    username: 'User'
                }],
            },
            {
                id: 1,
                title: 'Second note is here',
                date: new Date(),
                content: 'Edit this string with some tools',
                isActive: true,
                author: {
                    id: 1,
                    username: 'User'
                },
                members: [],
            }
        ]
    }),
    actions: {
        addBoard(board) {
            this.boards.push(board);
        }
    }
})
