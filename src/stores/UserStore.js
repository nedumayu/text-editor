import {defineStore} from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [
            {
                id: 1,
                username: 'Alice',
                email: 'alice@gmail.com',
                password: '123',
                boards: [1]
            },
            {
                id: 2,
                username: 'Hu Tao',
                email: 'hutao@gmail.com',
                password: '123',
                boards: [1, 2]
            }
        ]
    })
})
