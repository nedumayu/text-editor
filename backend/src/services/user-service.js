import UserModel from "../models/user-model.js"
import BoardModel from "../models/board-model.js";
import ApiError from "../exceptions/api-errors.js";

class UserService {
    async getUsers() {
        const users = await UserModel.find()
        return users
    }

    async getUserById(id) {
        const user = await UserModel.findById(id)
        return user
    }

    async updateUser(userData) {
        const {_id, username, email} = userData
        const user = await UserModel.findByIdAndUpdate(_id, {username, email}, {new: true})
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }
        return user
    }

    async deleteUser(id) {
        const user = await UserModel.findByIdAndDelete(id)
        if (user.boards) {
            for (const boardId of user.boards) {
                const board = await BoardModel.findById(boardId)
                if (board.members.includes(boardId.toString())) {
                    board.members = board.members.filter(idx => idx.toString() !== user.id.toString())
                    board.save()
                }
            }
        }
        return user
    }
}

export default new UserService()