import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {API_URL} from "../services/api.js";
import BoardService from "../services/BoardService.js";

export const useBoardStore = defineStore('boardStore', () => {
    const boards = ref([]);
    const loading = ref(false)
    const currentBoard = ref({})

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

    const getBoardById = async (id) => {
        try {
            const response = await BoardService.getBoardById(id)
            currentBoard.value = response.data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const updateBoard = async (id, board) => {
        try {
            const response = await BoardService.updateBoard(id, board)
            currentBoard.value = response.data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const deleteBoard = async (id) => {
        try {
            const response = await BoardService.deleteBoard(id)
            console.log(response)
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    return {
        getBoards,
        addBoard,
        getBoardById,
        updateBoard,
        deleteBoard,
        boards,
        loading,
        currentBoard
    }
})
