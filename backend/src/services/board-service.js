import BoardModel from "../models/board-model.js";
import UserModel from "../models/user-model.js";
import {ObjectId} from "mongodb";

class BoardService {
    async getBoardById(id) {
        const board = await BoardModel.findById(id)
        return board
    }

    async getBoards() {
        const boards = await BoardModel.find()
        return boards
    }

    async addBoard (title, content, author, members) {
        const membersIds = members.map(member => new ObjectId(member))
        const board = await BoardModel.create({title, date: new Date(), content, author: new ObjectId(author), members: membersIds})
        const user = await UserModel.findById(author)
        user.boards.push(board._id)
        user.save()
        if (members) {
            for (const memberId of members) {
                const member = await UserModel.findById(memberId)
                member.boards.push(board._id)
                member.save()
            }
        }
        return board
    }

    async updateBoard(id, title, content, isActive, members) {
        const board = await BoardModel.findById(id)
        console.log(board)
        if (board.members.toString() !== members.toString()) {
            for (const memberId of board.members) {
                if (members.includes(memberId.toString())) {
                    continue
                }
                else {
                    console.log('nun')
                    const user = await UserModel.findById(memberId)
                    console.log(user)
                    if (user.boards.includes(id)) {
                        user.boards = user.boards.filter(boardId => boardId.toString() !== id)
                        user.save()
                    }
                }
            }
            for(const memberId of members) {
                if (board.members.includes(memberId.toString())) {
                    continue
                }
                else {
                    const user = await UserModel.findById(memberId)
                    if (!user.boards.includes(id)) {
                        user.boards.push(new ObjectId(id))
                        user.save()
                    }
                }
            }
        }
        const newBoard = await BoardModel.findByIdAndUpdate(id, {title, date: new Date(), content, isActive, members}, {new: true})
        return newBoard
    }

    async deleteBoard(id) {
        const board = await BoardModel.findById(id)
        if (board.members) {
            for (const memberId of board.members) {
                const user = await UserModel.findById(memberId)
                user.boards = user.boards.filter(boardId => boardId.toString() !== id)
                user.save()
            }
        }
        const author = await UserModel.findById(board.author)
        author.boards = author.boards.filter(boardId => boardId.toString() !== id)
        author.save()
        const deletedBoard = await BoardModel.findByIdAndDelete(id)
        return deletedBoard
    }
}

export default new BoardService()