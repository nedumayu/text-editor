import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {API_URL} from "../services/api.js";
import BoardService from "../services/BoardService.js";

export const useBoardStore = defineStore('boardStore', () => {
    const boards = ref([]);
    const loading = ref(false)

    const getBoards = async() => {
        try {
            const response = await axios.get(`${API_URL}/boards`)
            boards.value = response.data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const addBoard = async(userData) => {
        try {
            const response = await BoardService.addBoard(userData)
            boards.value = response.data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    return {
        getBoards,
        addBoard,
        boards,
        loading,
    }
})
