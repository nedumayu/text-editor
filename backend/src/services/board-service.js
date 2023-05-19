import BoardModel from "../models/board-model.js";
import UserModel from "../models/user-model.js";
import {ObjectId} from "mongodb";
import ChangeModel from "../models/change-model.js";
import UtilService from "./util-service.js";
import uniqid from "uniqid";

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
            content: {
                type: "doc",
                content: [
                    {
                        id: uniqid(),
                        isEditing: false,
                        editorName: "",
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text: " "
                            }
                        ]
                    }
                ]
            },
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

    async updateBoard(id, title, isActive, members) {
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
        const bb = await BoardModel.findByIdAndUpdate(id, {
            title,
            date: new Date(),
            isActive,
            members
        }, {new: true})
        const newBoard = await UtilService.getBoardUsers(bb)
        const boardChanges = await UtilService.getBoardChanges(id)
        return {...newBoard, changes: boardChanges}
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

    async addChange(board, user, content, message) {
        const change = await ChangeModel.create(
            {
                message,
                content,
                date: new Date(),
                user: new ObjectId(user),
                board: new ObjectId(board)
            })
        return change
    }

    async checkEditing(id, editorName, paragraphId) {
        const board = await BoardModel.findById(id)
        const isEditing =  board.content.content.find(el => el.id === paragraphId).isEditing
        if (!isEditing) {
            board.content.content.find(el => el.id === paragraphId).isEditing = true
            board.content.content.find(el => el.id === paragraphId).editorName = editorName
            board.isEditing = true
            board.markModified('content.content')
            board.save()
            return {message: "Ok to editing"}
        } else {
            const name = board.content.content.find(el => el.id === paragraphId).editorName
            return {message: "Board is already editing", editorName: name}
        }
    }

    async addContent(id, paragraphId) {
        if (paragraphId) {
            const board = await BoardModel.findById(id)
            const chunks = board.content.content
            chunks.forEach((chunk, index) => chunk.index = index)
            const index = chunks.find(el => el.id === paragraphId).index
            const newParagraph = {
                id: uniqid(),
                isEditing: false,
                editorName: "",
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        text: " "
                    }
                ]
            }
            board.content.content = [...chunks.slice(0, index + 1), newParagraph, ...chunks.slice(index + 1)]
            board.content.content.forEach(item => delete item.index)
            board.markModified('content.content')
            board.save()
            return {content: board.content, newParagraph, index}
        } else {
            return {message: "Paragraph is not exist. Update the page"}
        }
    }

    async editContent(id, paragraphId, content) {
        const board = await BoardModel.findById(id)
        board.content.content.find(item => item.id === paragraphId).content = content
        board.content.content.find(item => item.id === paragraphId).isEditing = false
        board.content.content.find(item => item.id === paragraphId).editorName = ""
        board.markModified('content.content')
        board.save()
        return board.content
    }

    async deleteContent(id, paragraphId) {
        if (paragraphId) {
            const board = await BoardModel.findById(id)
            board.content.content = board.content.content.filter(item => item.id !== paragraphId)
            board.markModified('content.content')
            board.save()
            return board.content
        } else {
            return {message: "Paragraph is not exist. Update the page"}
        }
    }
}

export default new BoardService()