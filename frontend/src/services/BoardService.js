import api from "./api.js";

export default class BoardService {
    static async addBoard (userData) {
        return api.post('/boards', userData)
    }
}