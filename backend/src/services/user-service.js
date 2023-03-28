import UserModel from "../models/user-model.js"
import BoardModel from "../models/board-model.js";
import ApiError from "../exceptions/api-errors.js";
import UserDto from "../dtos/user-dto.js";
import UtilService from "./util-service.js";
import ChangeModel from "../models/change-model.js";

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
            await ChangeModel.deleteMany({user: id})
            const boards = await BoardModel.find()
            for (const board of boards) {
                if (board.members.includes(id)) {
                    board.members = board.members.filter(memb => memb.toString() !== id)
                    board.save()
                }
                if (board.author.toString() === id) {
                    if (board.members) {
                        for (const member of board.members) {
                            const user = await UserModel.findById(member)
                            user.boards = user.boards.filter(bd => bd.toString() !== board._id.toString())
                            user.save()
                        }
                    }
                }
            }
            await BoardModel.deleteMany({author: id})
        }
        return user
    }
}

export default new UserService()