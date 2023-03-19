import UserService from "../services/user-service.js";

class AuthController {
    async registration(req, res, next) {
        try{
            const {email, password, username} = req.body
            const userData = await UserService.registration(email, password, username)
            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res, next) {
        try{

        } catch (e) {

        }
    }

    async logout(req, res, next) {
        try{

        } catch (e) {

        }
    }

    async refresh(req, res, next) {
        try{

        } catch (e) {

        }
    }
}

export default new AuthController()