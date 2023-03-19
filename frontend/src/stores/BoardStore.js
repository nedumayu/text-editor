import {defineStore} from "pinia";
import {ref} from "vue";

export const useBoardStore = defineStore('boardStore', () => {
    const boards = ref([
        {
            id: 0,
            title: 'Sunt aut facere repellat',
            date: new Date(),
            content: 'quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto',
            isActive: false,
            author: {
                id: 1,
                username: 'Alice'
            },
            members: [
                {
                    id: 2,
                    username: 'User'
                }],
        },
        {
            id: 1,
            title: 'Qui est esse',
            date: new Date(),
            content: 'est rerum tempore vitae\\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\\nqui aperiam non debitis possimus qui neque nisi nulla',
            isActive: true,
            author: {
                id: 2,
                username: 'User'
            },
            members: [],
        },
        {
            id: 2,
            title: 'Eum et est occaecati',
            date: new Date(),
            content: 'ullam et saepe reiciendis voluptatem adipisci\\nsit amet autem assumenda provident rerum culpa\\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\\nquis sunt voluptatem rerum illo velit',
            isActive: true,
            author: {
                id: 3,
                username: 'Antonette'
            },
            members: [
                {
                    id: 4,
                    username: 'Bret'
                },
                {
                    id: 1,
                    username: 'Alice'
                },
                {
                    id: 2,
                    username: 'User'
                },],
        },
        {
            id: 3,
            title: 'Nesciunt quas odio',
            date: new Date(),
            content: 'repudiandae veniam quaerat sunt sed\\nalias aut fugiat sit autem sed est\\nvoluptatem omnis possimus esse voluptatibus quis\\nest aut tenetur dolor neque rem tenetur doloremque ipsam iure\\nquis sunt voluptatem rerum illo velit',
            isActive: true,
            author: {
                id: 5,
                username: 'Karianne'
            },
            members: [],
        },
        {
            id: 4,
            title: 'Dolorem eum magni eos',
            date: new Date(),
            content: 'ut aspernatur corporis harum nihil quis provident sequi\\nmollitia nobis aliquid molestiae\\nperspiciatis et ea nemo ab reprehenderit accusantium quas\\nvoluptate dolores velit et doloremque molestiae',
            isActive: true,
            author: {
                id: 1,
                username: 'Alice'
            },
            members: [
                {
                    id: 3,
                    username: 'Antonette'
                },
                {
                    id: 2,
                    username: 'User'
                },
            ],
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
