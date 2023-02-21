import {defineStore} from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [
            {
                id: 1,
                username: 'Alice',
                email: '123',
                password: '123',
                boards: [0]
            },
            {
                id: 2,
                username: 'User',
                email: 'user@gmail.com',
                password: '123',
                boards: [0, 1]
            }
        ],
        isAuth: false,
        currentUser: {}
    }),
    actions: {
        addUser(user) {
            this.users.push(user);
        }
    }
})
