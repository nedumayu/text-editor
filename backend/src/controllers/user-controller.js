import UserService from "../services/user-service.js";

class UserController {
    async getUsers(req, res, next) {
        try{
            const users = await UserService.getUsers()
            return res.json(users)
        } catch (e) {
            next()
        }
    }

    async getUser(req, res, next) {
        try{

        } catch (e) {
            next()
        }
    }

    async updateUser(req, res, next) {
        try{

        } catch (e) {
            next()
        }
    }

    async deleteUser(req, res, next) {
        try{

        } catch (e) {
            next()
        }
    }
}

export default new UserController()