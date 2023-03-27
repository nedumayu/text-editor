import UserModel from "../models/user-model.js"
import BoardModel from "../models/board-model.js";
import ApiError from "../exceptions/api-errors.js";
import UserDto from "../dtos/user-dto.js";
import UtilService from "./util-service.js";

class UserService {
    async getUsers() {
        const users = await UserModel.find()
        const usersWithoutPass = [];
        users.forEach(user => {
            const userDto = new UserDto(user)
            usersWithoutPass.push(userDto)
        })
        return usersWithoutPass
    }

    async updateUser(userData) {
        const {_id, username, email} = userData
        const user = await UserModel.findByIdAndUpdate(_id, {username, email}, {new: true})
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }
        const currentUser = await UtilService.getCurrentUser(user)
        return currentUser
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