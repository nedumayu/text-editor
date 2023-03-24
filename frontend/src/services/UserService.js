import api from "./api.js";

export default class UserService {
    static async getUsers() {
        return api.get('/users')
    }

    static async updateUser(userData) {
        return api.put('/profile', userData)
    }
}