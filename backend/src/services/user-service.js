import UserModel from "../models/user-model.js"
import BoardModel from "../models/board-model.js";
import ApiError from "../exceptions/api-errors.js";
import UserDto from "../dtos/user-dto.js";

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

    async getCurrentUser(user) {
        const boards = await BoardModel.find()
        const userBoards = []
        for (const userBoard of user.boards) {
            const b = boards.find(board => board._id.toString() === userBoard.toString())
            const bb = await this.getBoardUsers(b)
            userBoards.push(bb)
        }
        return {
            id: user._id,
            email: user.email,
            username: user.username,
            boards: userBoards
        }
    }

    async getBoardUsers(board) {
        const users = await UserModel.find()
        const authorId = board.author
        const author = users.find(user => board.author.toString() === user._id.toString()).username
        const boardMembers = []
        board.members.forEach(member => {
            const memberId = member
            const memberName = users.find(user => member.toString() === user._id.toString()).username
            boardMembers.push({id: memberId, username: memberName})
        })
        return {
            id: board._id,
            title: board.title,
            date: board.date,
            author: {id: authorId, username: author},
            members: boardMembers
        }
    }

    async updateUser(userData) {
        const {_id, username, email} = userData
        const user = await UserModel.findByIdAndUpdate(_id, {username, email}, {new: true})
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }
        const currentUser = await this.getCurrentUser(user)
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