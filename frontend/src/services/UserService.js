import api from "./api.js";

export default class UserService {
    static fetchUsers() {
        return api.get('/users')
    }
}