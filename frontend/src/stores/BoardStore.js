import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "axios";
import {API_URL} from "../services/api.js";
import BoardService from "../services/BoardService.js";

export const useBoardStore = defineStore('boardStore', () => {
    const boards = ref([]);
    const currentBoard = ref({})
    const currentBoardId = ref(null)

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
            return response.data
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
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const deleteBoard = async (id) => {
        try {
            const response = await BoardService.deleteBoard(id)
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const addChange = async (id, changeData) => {
        try {
            const response = await BoardService.addChanges(id, changeData)
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const checkEdit = async (id, data) => {
        try {
            const response = await BoardService.checkEdit(id, data)
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const addContent = async (id, data) => {
        try {
            const response = await BoardService.addContent(id, data)
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const editContent = async (id, data) => {
        try {

            const response = await BoardService.editContent(id, data)
            return response.data
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    const deleteContent = async (id, paragraphId) => {
        try {
            const response = await BoardService.deleteContent(id, paragraphId)
            return response.data
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
        addChange,
        checkEdit,
        addContent,
        editContent,
        deleteContent,
        boards,
        currentBoard,
        currentBoardId
    }
})
