import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('userStore', () => {
    const users = ref([
        {
            id: 1,
            username: 'Alice',
            email: '123',
            password: '123',
            boards: [0, 2, 4]
        },
        {
            id: 2,
            username: 'User',
            email: 'user@gmail.com',
            password: '123',
            boards: [0, 1, 2, 4]
        },
        {
            id: 3,
            username: 'Antonette',
            email: 'anthonetta@gmail.com',
            password: '123',
            boards: [2, 4]
        },
        {
            id: 4,
            username: 'Bret',
            email: 'sincere@april.biz',
            password: '123',
            boards: [2]
        },
        {
            id: 5,
            username: 'Karianne',
            email: 'ulianne.OConner@kory.org',
            password: '123',
            boards: [3]
        }
    ]);

    const isAuth = ref(false);
    const currentUser = ref({});
    const currentUserBoards = ref([]);

    const addUser = (user) => {
        users.value.push(user);
    }

    return {
        users,
        isAuth,
        currentUser,
        currentUserBoards,
        addUser
    }
})

