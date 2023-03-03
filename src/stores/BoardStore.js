import {defineStore} from "pinia";
import {ref} from "vue";

export const useBoardStore = defineStore('boardStore', () => {
    const boards = ref([
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
                id: 2,
                username: 'User'
            },
            members: [],
        }
    ]);

    const addBoard = (board) => {
        boards.value.push(board);
    }

    return {
        boards,
        addBoard
    }
})
