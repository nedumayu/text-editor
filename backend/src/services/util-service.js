import ChangeModel from "../models/change-model.js";
import UserModel from "../models/user-model.js";
import BoardModel from "../models/board-model.js";

class UtilService {
    async getBoardChanges(id) {
        const changes = await ChangeModel.find({board: id})
        if (changes) {
            const changesWithUser = []
            for(let change of changes) {
                const changeUser = await UserModel.findById(change.user.toString())
                const userId = change.user
                changesWithUser.push({
                    id: change.id,
                    content: change.content,
                    user: {
                        id: userId,
                        username: changeUser.username
                    },
                    date: change.date,
                    board: change.board
                })
            }
            return changesWithUser
        }
        return []
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
            isActive: board.isActive,
            author: {id: authorId, username: author},
            members: boardMembers
        }
    }
}

export default new UtilService()