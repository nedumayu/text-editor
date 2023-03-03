import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('userStore', () => {
    const users = ref([
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

