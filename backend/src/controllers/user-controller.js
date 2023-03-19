class UserController {
    async getUser(req, res, next) {
        try{
            res.json('123 123')
        } catch (e) {

        }
    }
}

export default new UserController()