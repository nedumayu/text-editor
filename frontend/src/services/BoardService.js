import api from "./api.js";

export default class BoardService {
    static async addBoard (userData) {
        return api.post('/boards', userData)
    }

    static async getBoardById(id) {
        return api.get(`/boards/${id}`)
    }

    static async updateBoard(id, board) {
        return api.put(`/boards/${id}`, board)
    }

    static async deleteBoard(id) {
        return api.delete(`/boards/${id}`)
    }

    static async addChanges (id, data) {
        return api.post(`/boards/${id}`, data)
    }

    static async checkEdit (id, data) {
        return api.post(`/boards/${id}/edit`, data)
    }

    static async addContent (id, data) {
        return api.post(`/boards/${id}/content`, data)
    }

    static async editContent (id, data) {
        return api.put(`/boards/${id}/content`, data)
    }

    static async deleteContent (id, paragraphId) {
        return api.delete(`/boards/${id}/content/${paragraphId}`)
    }
}