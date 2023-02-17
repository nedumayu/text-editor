import {defineStore} from "pinia";


export const useBoardStore = defineStore('boardStore', {
    state: () => ({
        boards: [
            {
                id: 1,
                title: 'First note is here',
                date: '12.10.2023',
                content: 'Edit this string',
                isActive: true,
                author: 'Alice',
                members: ['Hu Tao'],
            },
            {
                id: 2,
                title: 'Second note is here',
                date: '13.12.2022',
                content: 'Edit this string with some tools',
                isActive: true,
                author: 'Hu Tao',
                members: [],
            }
        ]
    })
})
