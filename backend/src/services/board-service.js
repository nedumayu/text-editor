import BoardModel from "../models/board-model.js";
import UserModel from "../models/user-model.js";
import {ObjectId} from "mongodb";
import ChangeModel from "../models/change-model.js";
import ApiError from "../exceptions/api-errors.js";
import UtilService from "./util-service.js";

class BoardService {
    async getBoardById(id) {
        const board = await BoardModel.findById(id)
        const boardWithUser = await UtilService.getBoardUsers(board)
        const boardChanges = await UtilService.getBoardChanges(id)
        return {...boardWithUser, content: board.content, changes: boardChanges}
    }

    async getBoards() {
        const boards = await BoardModel.find()
        const boardsWithUsers = []
        for (const board of boards) {
            const b = await UtilService.getBoardUsers(board)
            boardsWithUsers.push(b)
        }
        return boardsWithUsers
    }

    async addBoard(title, author, members) {
        const membersIds = members.map(member => new ObjectId(member))
        const board = await BoardModel.create({
            title,
            date: new Date(),
            author: new ObjectId(author),
            members: membersIds,
            content: {},
        })
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
        const newBoard = await UtilService.getBoardUsers(board)
        return newBoard
    }

    async updateBoard(id, title, content, isActive, members) {
        const board = await BoardModel.findById(id)
        if (board.members.toString() !== members.toString()) {
            for (const memberId of board.members) {
                if (members.includes(memberId.toString())) {
                    continue
                } else {
                    const user = await UserModel.findById(memberId)
                    if (user.boards.includes(id)) {
                        user.boards = user.boards.filter(boardId => boardId.toString() !== id)
                        user.save()
                    }
                }
            }
            for (const memberId of members) {
                if (board.members.includes(memberId.toString())) {
                    continue
                } else {
                    const user = await UserModel.findById(memberId)
                    if (!user.boards.includes(id)) {
                        user.boards.push(new ObjectId(id))
                        user.save()
                    }
                }
            }
        }
        const bb = await BoardModel.findByIdAndUpdate(id, {title, date: new Date(), content, isActive, members}, {new: true})
        const newBoard = await UtilService.getBoardUsers(bb)
        const boardChanges = await UtilService.getBoardChanges(id)
        return {...newBoard, changes: boardChanges, content}
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
        await ChangeModel.deleteMany({board: id})
        const deletedBoard = await BoardModel.findByIdAndDelete(id)
        return deletedBoard
    }

    async addChange(board, user, content) {
        const boardData = await BoardModel.findById(board)
        if (boardData.members) {
            for (const member of boardData.members) {
                if (user === member.toString() || user === boardData.author.toString()) {
                    break
                } else {
                    throw ApiError.BadRequest("У пользователя нет доступа к этой доске")
                }
            }
        }
        const change = await ChangeModel.create(
            {
                content,
                date: new Date(),
                user: new ObjectId(user),
                board: new ObjectId(board)
            })
        return change
    }

    async checkEditing(id, isEditing) {
        const board = await BoardModel.findById(id)
        if (isEditing === "true") {
            isEditing = true
        } else if (isEditing === "false") {
            isEditing = false
        }

        if(isEditing && !board.isEditing) {
            board.isEditing = true
            board.save()
            return {message: "Ok to editing"}
        }
        else if (isEditing && board.isEditing) {
            return {message: "Board is already editing"}
        }
        else if (!isEditing && board.isEditing) {
            board.isEditing = false
            board.save()
            return {message: "Free reading and editing"}
        }
        else if (!isEditing && !board.isEditing) {
            return {message: "No situation"}
        } else {
            throw ApiError.BadRequest("Что-то пошло не так")
        }
    }
}

export default new BoardService()